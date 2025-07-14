(function(window) {
    'use strict';

    // Main library object
    const swq = {
        instances: [],
        init: function(selector, options = {}) {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                // Prevent re-initialization
                if (!el.swq) {
                    this.instances.push(new Quiz(el, options));
                }
            });
            return this.instances;
        }
    };

    /**
     * The Core Quiz Class
     */
    class Quiz {
        constructor(element, options = {}) {
            this.element = element;
            this.element.swq = this; // Mark as initialized
            this.options = options;
            
            this._parseConfig();
            this._parseQuestions();
            this._setupUI();
            
            this.state = {
                currentIndex: -1,
                userAnswers: {}, // { qId: { answer, isCorrect } }
                isFinished: false,
                startTime: null,
                timerId: null
            };

            this._startQuiz();
        }

        // --- Private Methods: Setup & Parsing ---

        _parseConfig() {
            const defaults = {
                feedbackMode: 'standard', // standard, immediate, retry
                allowSkip: false,
                allowBack: false,
                timer: 0, // in seconds
                onStart: () => {},
                onComplete: () => {},
                onQuestionChange: () => {}
            };

            const dataAttrs = {};
            for (const key in this.element.dataset) {
                if (key.startsWith('swq')) {
                    let camelCaseKey = key.substring(3).replace(/-(\w)/g, (match, letter) => letter.toUpperCase());
                    camelCaseKey = camelCaseKey.charAt(0).toLowerCase() + camelCaseKey.slice(1);
                    let value = this.element.dataset[key];
                    if (value === 'true') value = true;
                    if (value === 'false') value = false;
                    if (!isNaN(parseFloat(value)) && isFinite(value)) value = parseFloat(value);
                    dataAttrs[camelCaseKey] = value;
                }
            }
            
            this.config = { ...defaults, ...dataAttrs, ...(this.options.settings || {}) };
        }

        _parseQuestions() {
            if (this.options.questions && Array.isArray(this.options.questions)) {
                this.questions = this.options.questions;
            } else {
                this.questions = [];
                const questionElements = this.element.querySelectorAll('[data-swq-question-id]');
                questionElements.forEach(qEl => {
                    const typeEl = qEl.querySelector('[data-swq-type]');
                    if (!typeEl) return;

                    const question = {
                        id: qEl.dataset.swqQuestionId,
                        text: qEl.querySelector('p').innerHTML,
                        type: typeEl.dataset.swqType,
                        answer: typeEl.dataset.swqAnswer,
                        options: typeEl.dataset.swqOptions ? JSON.parse(typeEl.dataset.swqOptions) : []
                    };
                    this.questions.push(question);
                });
            }
        }
        
        _setupUI() {
            this.ui = {
                nextBtn: this.element.querySelector('[data-swq-next]'),
                prevBtn: this.element.querySelector('[data-swq-previous]'),
                timerDisplay: this.element.querySelector('[data-swq-timer]'),
                resultsContainer: this.element.querySelector('[data-swq-results]'),
                questionsContainer: this.element.querySelector('[data-swq-answers]') || this.element
            };

            // Fallback: Create default controls if not provided
            if (!this.ui.nextBtn && !this.ui.prevBtn) {
                const controlsContainer = document.createElement('div');
                controlsContainer.className = 'swq-controls-default';
                
                if (this.config.allowBack) {
                    this.ui.prevBtn = document.createElement('button');
                    this.ui.prevBtn.textContent = 'Previous';
                    this.ui.prevBtn.setAttribute('data-swq-previous', '');
                    controlsContainer.appendChild(this.ui.prevBtn);
                }

                this.ui.nextBtn = document.createElement('button');
                this.ui.nextBtn.textContent = 'Next';
                this.ui.nextBtn.setAttribute('data-swq-next', '');
                controlsContainer.appendChild(this.ui.nextBtn);

                this.element.appendChild(controlsContainer);
            }

            // Fallback: Create default timer if needed and not provided
            if (this.config.timer > 0 && !this.ui.timerDisplay) {
                this.ui.timerDisplay = document.createElement('div');
                this.ui.timerDisplay.className = 'swq-timer-default';
                this.ui.timerDisplay.setAttribute('data-swq-timer', '');
                this.element.insertBefore(this.ui.timerDisplay, this.ui.questionsContainer);
            }
            
            // Fallback: Create default results container if not provided
            if (!this.ui.resultsContainer) {
                this.ui.resultsContainer = document.createElement('div');
                this.ui.resultsContainer.className = 'swq-results-default';
                this.ui.resultsContainer.setAttribute('data-swq-results', '');
                this.element.appendChild(this.ui.resultsContainer);
            }

            // Add event listeners
            if (this.ui.nextBtn) this.ui.nextBtn.addEventListener('click', () => this._handleNext());
            if (this.ui.prevBtn) this.ui.prevBtn.addEventListener('click', () => this._handlePrevious());
        }

        // --- Public Methods & Core Logic ---

        _startQuiz() {
            if (this.state.isFinished || this.questions.length === 0) return;
            this.state.startTime = Date.now();
            
            if (this.config.timer > 0) {
                this._updateTimerDisplay();
                this.state.timerId = setInterval(() => this._updateTimer(), 1000);
            }
            
            this._renderQuestion(0);
            if (typeof this.config.onStart === 'function') {
                this.config.onStart.call(this);
            }
        }

        _endQuiz(reason = 'completed') {
            if (this.state.isFinished) return;
            this.state.isFinished = true;
            clearInterval(this.state.timerId);

            // In standard mode, show all feedback now
            if (this.config.feedbackMode === 'standard') {
                this.questions.forEach(question => {
                    const qElement = this._getOrCreateQuestionElement(question.id);
                    const userAnswerData = this.state.userAnswers[question.id];
                    if (userAnswerData) {
                        qElement.classList.add(userAnswerData.isCorrect ? 'swq-correct' : 'swq-incorrect');
                        this._showFeedback(question, userAnswerData.isCorrect);
                    }
                });
            }

            // Hide quiz questions but not the entire container
            Array.from(this.ui.questionsContainer.children).forEach(child => {
                if (child.dataset.swqQuestionId) {
                    child.style.display = 'none';
                }
            });
            
            // Hide controls and timer, but keep the container visible
            if (this.ui.nextBtn) this.ui.nextBtn.style.display = 'none';
            if (this.ui.prevBtn) this.ui.prevBtn.style.display = 'none';
            if (this.ui.timerDisplay) this.ui.timerDisplay.style.display = 'none';

            // Calculate score
            let score = 0;
            this.questions.forEach(q => {
                const userAnswerData = this.state.userAnswers[q.id];
                if (userAnswerData && userAnswerData.isCorrect) {
                    score++;
                }
            });

            const results = {
                score: score,
                total: this.questions.length,
                percentage: this.questions.length > 0 ? Math.round((score / this.questions.length) * 100) : 0,
                reason: reason // 'completed' or 'time_up'
            };

            // Display results
            this.ui.resultsContainer.innerHTML = `
                <div class="swq-result-summary">
                    <h3>Quiz Complete!</h3>
                    <p>You scored <strong>${results.score} out of ${results.total}</strong> (${results.percentage}%).</p>
                    ${reason === 'time_up' ? '<p>Time ran out!</p>' : ''}
                </div>
            `;
            this.ui.resultsContainer.style.display = 'block';

            if (typeof this.config.onComplete === 'function') {
                this.config.onComplete.call(this, results);
            }
        }
        
        // --- UI Rendering & State Management ---

        _renderQuestion(index) {
            if (index < 0 || index >= this.questions.length) return;
            
            this.state.currentIndex = index;
            const question = this.questions[index];
            const questionElement = this._getOrCreateQuestionElement(question.id);
            
            // Hide all other questions
            Array.from(this.ui.questionsContainer.children).forEach(child => {
                 if(child.dataset.swqQuestionId) child.style.display = 'none';
            });

            // Check if the question needs to be built (look for options container instead of just innerHTML)
            const optionsContainer = questionElement.querySelector('.swq-options-container');
            if (!optionsContainer || optionsContainer.children.length === 0) {
                // Find the existing div with data-swq-type and replace it with built HTML
                const typeEl = questionElement.querySelector('[data-swq-type]');
                if (typeEl) {
                    typeEl.outerHTML = this._buildQuestionHTML(question);
                } else if (!questionElement.innerHTML.trim()) {
                    questionElement.innerHTML = this._buildQuestionHTML(question);
                }
            }
            
            questionElement.style.display = 'block';
            questionElement.classList.add('swq-active');
            
            this._restoreAnswer(question.id);
            this._updateControls();
            
            if (typeof this.config.onQuestionChange === 'function') {
                this.config.onQuestionChange.call(this, question, index);
            }
        }
        
        _getOrCreateQuestionElement(id) {
            let el = this.ui.questionsContainer.querySelector(`[data-swq-question-id="${id}"]`);
            if (!el) {
                el = document.createElement('div');
                el.dataset.swqQuestionId = id;
                el.className = 'swq-question';
                this.ui.questionsContainer.appendChild(el);
            }
            return el;
        }

        _buildQuestionHTML(question) {
            let optionsHTML = '';
            const questionName = `swq-q-${question.id}`;

            switch (question.type) {
                case 'choice':
                case 'true/false':
                    const options = question.type === 'true/false' ? ['True', 'False'] : question.options;
                    optionsHTML = options.map(opt => `
                        <label class="swq-option">
                            <input type="radio" name="${questionName}" value="${opt}" onchange="this.closest('[data-swq-quiz]').swq._updateControls()">
                            <span>${opt}</span>
                        </label>
                    `).join('');
                    break;
                case 'select-multiple':
                    optionsHTML = question.options.map(opt => `
                        <label class="swq-option">
                            <input type="checkbox" name="${questionName}" value="${opt}" onchange="this.closest('[data-swq-quiz]').swq._updateControls()">
                            <span>${opt}</span>
                        </label>
                    `).join('');
                    break;
                case 'text':
                    optionsHTML = `<input type="text" name="${questionName}" class="swq-input" oninput="this.closest('[data-swq-quiz]').swq._updateControls()">`;
                    break;
                case 'number':
                    optionsHTML = `<input type="number" name="${questionName}" class="swq-input" oninput="this.closest('[data-swq-quiz]').swq._updateControls()">`;
                    break;
            }

            // Check if we're building a complete question or just replacing options
            const callingElement = this.ui.questionsContainer.querySelector(`[data-swq-question-id="${question.id}"]`);
            const hasExistingText = callingElement && callingElement.querySelector('p');
            
            if (hasExistingText) {
                // Just return the options container for replacement
                return `
                    <div class="swq-options-container" data-swq-type="${question.type}">${optionsHTML}</div>
                    <div class="swq-feedback"></div>
                `;
            } else {
                // Return complete question HTML
                return `
                    <p class="swq-question-text">${question.text}</p>
                    <div class="swq-options-container" data-swq-type="${question.type}">${optionsHTML}</div>
                    <div class="swq-feedback"></div>
                `;
            }
        }
        
        _updateControls() {
            const { currentIndex } = this.state;
            const totalQuestions = this.questions.length;
            const currentQuestionEl = this._getOrCreateQuestionElement(this.questions[currentIndex]?.id);

            // Previous button
            if (this.ui.prevBtn) {
                this.ui.prevBtn.disabled = (currentIndex <= 0) || !this.config.allowBack;
            }

            // Next button text and state
            if (this.ui.nextBtn) {
                const isLastQuestion = currentIndex === totalQuestions - 1;
                
                // Determine button text based on feedback mode and current state
                if (this.config.feedbackMode === 'retry' && currentQuestionEl.classList.contains('swq-incorrect')) {
                    this.ui.nextBtn.textContent = 'Try Again';
                } else if (this.config.feedbackMode === 'immediate') {
                    this.ui.nextBtn.textContent = isLastQuestion ? 'Finish Quiz' : 'Next Question';
                } else {
                    this.ui.nextBtn.textContent = isLastQuestion ? 'Finish Quiz' : 'Next';
                }
                
                // Check if user has provided an answer
                const answer = this._collectAnswer();
                const hasAnswer = Array.isArray(answer) ? answer.length > 0 : (answer !== null && answer !== '' && answer !== undefined);
                
                // Only disable next button if no answer is given AND skipping is not allowed
                this.ui.nextBtn.disabled = !hasAnswer && !this.config.allowSkip;
            }
        }
        
        _updateTimer() {
            const elapsed = Math.floor((Date.now() - this.state.startTime) / 1000);
            const remaining = this.config.timer - elapsed;

            if (remaining <= 0) {
                this._endQuiz('time_up');
            } else {
                this._updateTimerDisplay(remaining);
            }
        }

        _updateTimerDisplay(seconds = this.config.timer) {
            if (!this.ui.timerDisplay) return;
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            this.ui.timerDisplay.textContent = `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
        }
        
        // --- Answer Handling ---
        
        _handleNext() {
            const question = this.questions[this.state.currentIndex];
            const answer = this._collectAnswer();
            const qElement = this._getOrCreateQuestionElement(question.id);
            qElement.classList.remove('swq-incorrect', 'swq-correct');
            
            const isCorrect = this._isAnswerCorrect(question, answer);
            
            this.state.userAnswers[question.id] = { answer, isCorrect };

            // Handle feedback modes
            if (this.config.feedbackMode === 'immediate') {
                // Show feedback immediately and disable inputs
                qElement.classList.add(isCorrect ? 'swq-correct' : 'swq-incorrect');
                this._showFeedback(question, isCorrect);
                qElement.querySelectorAll('input').forEach(input => input.disabled = true);
                
                // Always advance to next question in immediate mode
                if (this.state.currentIndex < this.questions.length - 1) {
                    this._renderQuestion(this.state.currentIndex + 1);
                } else {
                    this._endQuiz();
                }
            } else if (this.config.feedbackMode === 'retry') {
                // Show feedback but allow retry if wrong
                qElement.classList.add(isCorrect ? 'swq-correct' : 'swq-incorrect');
                this._showFeedback(question, isCorrect);
                
                if (!isCorrect) {
                    // Don't advance, allow user to try again
                    this._updateControls(); // Update button to say "Check Answer"
                    return;
                } else {
                    // Correct answer, advance
                    if (this.state.currentIndex < this.questions.length - 1) {
                        this._renderQuestion(this.state.currentIndex + 1);
                    } else {
                        this._endQuiz();
                    }
                }
            } else {
                // Standard mode - no feedback until end, just advance
                if (this.state.currentIndex < this.questions.length - 1) {
                    this._renderQuestion(this.state.currentIndex + 1);
                } else {
                    this._endQuiz();
                }
            }
        }
        
        _handlePrevious() {
            if (this.config.allowBack && this.state.currentIndex > 0) {
                this._renderQuestion(this.state.currentIndex - 1);
            }
        }

        _collectAnswer() {
            const question = this.questions[this.state.currentIndex];
            const qElement = this._getOrCreateQuestionElement(question.id);
            const name = `swq-q-${question.id}`;

            switch (question.type) {
                case 'choice':
                case 'true/false':
                    const checkedRadio = qElement.querySelector(`input[name="${name}"]:checked`);
                    return checkedRadio ? checkedRadio.value : null;
                case 'select-multiple':
                    const checkedBoxes = Array.from(qElement.querySelectorAll(`input[name="${name}"]:checked`));
                    return checkedBoxes.map(cb => cb.value);
                case 'text':
                case 'number':
                    const input = qElement.querySelector(`input[name="${name}"]`);
                    return input ? input.value : null;
            }
            return null;
        }

        _isAnswerCorrect(question, userAnswer) {
            if (userAnswer === null || userAnswer === '') return false;

            const correctAnswer = question.answer.toString();
            switch (question.type) {
                case 'select-multiple':
                    const correctAnswers = correctAnswer.split(',').map(s => s.trim()).sort();
                    const userAnswers = Array.isArray(userAnswer) ? userAnswer.sort() : [];
                    return JSON.stringify(correctAnswers) === JSON.stringify(userAnswers);
                case 'text':
                    return userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
                default: // choice, true/false, number
                    return userAnswer.toString() === correctAnswer;
            }
        }
        
        _restoreAnswer(questionId) {
            const userAnswerData = this.state.userAnswers[questionId];
            if (!userAnswerData) return;

            const question = this.questions.find(q => q.id === questionId);
            const qElement = this._getOrCreateQuestionElement(questionId);
            const name = `swq-q-${question.id}`;
            const answer = userAnswerData.answer;

            switch (question.type) {
                case 'choice':
                case 'true/false':
                    const radio = qElement.querySelector(`input[name="${name}"][value="${answer}"]`);
                    if (radio) radio.checked = true;
                    break;
                case 'select-multiple':
                    answer.forEach(val => {
                        const checkbox = qElement.querySelector(`input[name="${name}"][value="${val}"]`);
                        if (checkbox) checkbox.checked = true;
                    });
                    break;
                case 'text':
                case 'number':
                    const input = qElement.querySelector(`input[name="${name}"]`);
                    if (input) input.value = answer;
                    break;
            }
        }
        
        _showFeedback(question, isCorrect) {
            const qElement = this._getOrCreateQuestionElement(question.id);
            const feedbackEl = qElement.querySelector('.swq-feedback');
            if (!feedbackEl) return;
            
            if (isCorrect) {
                feedbackEl.textContent = "Correct!";
                feedbackEl.className = 'swq-feedback swq-feedback-correct';
            } else {
                if (this.config.feedbackMode === 'retry') {
                    feedbackEl.textContent = "Incorrect. Please try again.";
                } else {
                    feedbackEl.textContent = `Incorrect. The correct answer is: ${question.answer}`;
                }
                feedbackEl.className = 'swq-feedback swq-feedback-incorrect';
            }
            
            // Only disable inputs in immediate mode, not in retry mode
            if (this.config.feedbackMode === 'immediate') {
                qElement.querySelectorAll('input').forEach(input => input.disabled = true);
            }
        }
    }

    // Auto-initialize on DOM load
    document.addEventListener('DOMContentLoaded', () => {
        swq.init('[data-swq-quiz]');
    });

    // Expose to the global window object
    window.SWQ = window.swq = swq;

})(window);

// // Make SWQ available globally for browser use
// if (typeof window !== 'undefined') {
//   window.SWQ = SWQ;
// }

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SWQ;
}