(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SWQ"] = factory();
	else
		root["SWQ"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/swq.css"
/*!*************************!*\
  !*** ./src/css/swq.css ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!***********************!*\
  !*** ./src/js/swq.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_swq_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/swq.css */ "./src/css/swq.css");

var swqExport = function (root) {
  'use strict';

  function escapeHTML(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }
  var swq = {
    instances: [],
    init: function (selector, options) {
      options = options || {};
      var elements = document.querySelectorAll(selector);
      var newInstances = [];
      for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        if (!el.swq) {
          var quiz = new Quiz(el, options);
          this.instances.push(quiz);
          newInstances.push(quiz);
        }
      }
      return newInstances;
    }
  };
  function Quiz(element, options) {
    this.element = element;
    this.element.swq = this;
    this.options = options || {};
    this._boundHandleNext = this._handleNext.bind(this);
    this._boundHandlePrevious = this._handlePrevious.bind(this);
    this._boundHandleCheckAnswer = this._handleCheckAnswer.bind(this);
    this._boundHandleSkip = this._handleSkip.bind(this);
    this._boundHandleInputChange = this._handleInputChange.bind(this);
    this._parseConfig();
    this._parseQuestions();
    this._setupUI();
    this.state = {
      currentIndex: -1,
      userAnswers: {},
      isFinished: false,
      startTime: null,
      timerId: null
    };
    this._startQuiz();
  }
  Quiz.prototype._parseConfig = function () {
    var defaults = {
      feedbackMode: 'standard',
      allowSkip: false,
      allowBack: false,
      timer: 0
    };
    var dataAttrs = {};
    for (var key in this.element.dataset) {
      if (this.element.dataset.hasOwnProperty(key) && key.indexOf('swq') === 0) {
        var camelKey = key.charAt(3).toLowerCase() + key.slice(4);
        var value = this.element.dataset[key];
        if (value === 'true') value = true;else if (value === 'false') value = false;else if (!isNaN(parseFloat(value)) && isFinite(value)) value = parseFloat(value);
        dataAttrs[camelKey] = value;
      }
    }
    var settings = this.options && this.options.settings || {};
    this.config = {};
    for (var k in defaults) {
      if (defaults.hasOwnProperty(k)) {
        this.config[k] = k in dataAttrs ? dataAttrs[k] : k in settings ? settings[k] : defaults[k];
      }
    }
    for (var k2 in dataAttrs) {
      if (dataAttrs.hasOwnProperty(k2) && !(k2 in defaults)) {
        this.config[k2] = dataAttrs[k2];
      }
    }
    for (var k3 in settings) {
      if (settings.hasOwnProperty(k3) && !(k3 in defaults) && !(k3 in dataAttrs)) {
        this.config[k3] = settings[k3];
      }
    }
  };
  Quiz.prototype._parseQuestions = function () {
    if (this.options.questions && Array.isArray(this.options.questions)) {
      this.questions = this.options.questions;
    } else {
      this.questions = [];
      var questionElements = this.element.querySelectorAll('[data-swq-question-id]');
      for (var i = 0; i < questionElements.length; i++) {
        var qEl = questionElements[i];
        var typeEl = qEl.querySelector('[data-swq-type]');
        if (!typeEl) {
          console.warn('SWQ: Question ' + qEl.dataset.swqQuestionId + ' is missing data-swq-type attribute');
          continue;
        }
        var questionTextEl = qEl.querySelector('p');
        if (!questionTextEl) {
          console.warn('SWQ: Question ' + qEl.dataset.swqQuestionId + ' is missing question text');
          continue;
        }
        var question = {
          id: qEl.dataset.swqQuestionId,
          text: questionTextEl.innerHTML,
          type: typeEl.dataset.swqType,
          answer: typeEl.dataset.swqAnswer,
          options: []
        };
        if (typeEl.dataset.swqOptions) {
          try {
            question.options = JSON.parse(typeEl.dataset.swqOptions);
          } catch (e) {
            console.warn('SWQ: Invalid JSON in data-swq-options for question ' + question.id);
            question.options = [];
          }
        }
        if (!question.answer && question.type !== 'text') {
          console.warn('SWQ: Question ' + question.id + ' is missing answer attribute');
          continue;
        }
        this.questions.push(question);
      }
    }
  };
  Quiz.prototype._setupUI = function () {
    this.ui = {
      nextBtn: this.element.querySelector('[data-swq-next]'),
      prevBtn: this.element.querySelector('[data-swq-previous]'),
      checkAnswerBtn: this.element.querySelector('[data-swq-check-answer]'),
      skipBtn: this.element.querySelector('[data-swq-skip-question]'),
      timerDisplay: this.element.querySelector('[data-swq-timer]'),
      resultsContainer: this.element.querySelector('[data-swq-results]'),
      questionsContainer: this.element.querySelector('[data-swq-answers]') || this.element
    };
    if (!this.ui.nextBtn && !this.ui.prevBtn && !this.ui.checkAnswerBtn) {
      var controlsContainer = document.createElement('div');
      controlsContainer.className = 'swq-controls-default';
      if (this.config.allowBack) {
        this.ui.prevBtn = document.createElement('button');
        this.ui.prevBtn.textContent = 'Previous';
        this.ui.prevBtn.setAttribute('type', 'button');
        this.ui.prevBtn.setAttribute('data-swq-previous', '');
        controlsContainer.appendChild(this.ui.prevBtn);
      }
      this.ui.nextBtn = document.createElement('button');
      this.ui.nextBtn.textContent = 'Next';
      this.ui.nextBtn.setAttribute('type', 'button');
      this.ui.nextBtn.setAttribute('data-swq-next', '');
      controlsContainer.appendChild(this.ui.nextBtn);
      this.element.appendChild(controlsContainer);
    }
    if (this.config.timer > 0 && !this.ui.timerDisplay) {
      this.ui.timerDisplay = document.createElement('div');
      this.ui.timerDisplay.className = 'swq-timer-default';
      this.ui.timerDisplay.setAttribute('data-swq-timer', '');
      this.element.insertAdjacentElement('afterbegin', this.ui.timerDisplay);
    }
    if (!this.ui.resultsContainer) {
      this.ui.resultsContainer = document.createElement('div');
      this.ui.resultsContainer.className = 'swq-results-default';
      this.ui.resultsContainer.setAttribute('data-swq-results', '');
      this.ui.resultsContainer.classList.add('swq-hidden');
      this.element.appendChild(this.ui.resultsContainer);
    } else {
      this.ui.resultsContainer.classList.add('swq-hidden');
    }
    if (this.ui.prevBtn && !this.config.allowBack) {
      this.ui.prevBtn.classList.add('swq-hidden');
    }
    if (this.ui.skipBtn && !this.config.allowSkip) {
      this.ui.skipBtn.classList.add('swq-hidden');
    }
    if (this.ui.nextBtn) this.ui.nextBtn.addEventListener('click', this._boundHandleNext);
    if (this.ui.prevBtn) this.ui.prevBtn.addEventListener('click', this._boundHandlePrevious);
    if (this.ui.checkAnswerBtn) this.ui.checkAnswerBtn.addEventListener('click', this._boundHandleCheckAnswer);
    if (this.ui.skipBtn) this.ui.skipBtn.addEventListener('click', this._boundHandleSkip);
    this.ui.questionsContainer.addEventListener('change', this._boundHandleInputChange);
    this.ui.questionsContainer.addEventListener('input', this._boundHandleInputChange);
  };
  Quiz.prototype._handleInputChange = function (e) {
    var target = e.target;
    if (target && target.name && target.name.indexOf('swq-q-') === 0) {
      this._updateControls();
    }
  };
  Quiz.prototype._startQuiz = function () {
    if (this.state.isFinished || this.questions.length === 0) return;
    this.state.startTime = Date.now();
    if (this.config.timer > 0) {
      this._updateTimerDisplay();
      var self = this;
      this.state.timerId = setInterval(function () {
        self._updateTimer();
      }, 1000);
    }
    this._renderQuestion(0);
    if (typeof this.config.onStart === 'function') {
      this.config.onStart.call(this);
    }
  };
  Quiz.prototype._endQuiz = function (reason) {
    if (this.state.isFinished) return;
    reason = reason || 'completed';
    this.state.isFinished = true;
    if (this.state.timerId) {
      clearInterval(this.state.timerId);
      this.state.timerId = null;
    }
    if (this.config.feedbackMode === 'standard') {
      for (var i = 0; i < this.questions.length; i++) {
        var question = this.questions[i];
        var qElement = this._getOrCreateQuestionElement(question.id);
        var userAnswerData = this.state.userAnswers[question.id];
        if (userAnswerData) {
          qElement.classList.add(userAnswerData.isCorrect ? 'swq-correct' : 'swq-incorrect');
          this._showFeedback(question, userAnswerData.isCorrect);
        }
      }
    }
    var children = this.ui.questionsContainer.children;
    for (var j = 0; j < children.length; j++) {
      if (children[j].dataset && children[j].dataset.swqQuestionId) {
        children[j].classList.add('swq-hidden');
      }
    }
    if (this.ui.nextBtn) this.ui.nextBtn.classList.add('swq-hidden');
    if (this.ui.prevBtn) this.ui.prevBtn.classList.add('swq-hidden');
    if (this.ui.checkAnswerBtn) this.ui.checkAnswerBtn.classList.add('swq-hidden');
    if (this.ui.skipBtn) this.ui.skipBtn.classList.add('swq-hidden');
    if (this.ui.timerDisplay) this.ui.timerDisplay.classList.add('swq-hidden');
    var score = 0;
    for (var k = 0; k < this.questions.length; k++) {
      var q = this.questions[k];
      var answerData = this.state.userAnswers[q.id];
      if (answerData && answerData.isCorrect) {
        score++;
      }
    }
    var results = {
      score: score,
      total: this.questions.length,
      percentage: this.questions.length > 0 ? Math.round(score / this.questions.length * 100) : 0,
      reason: reason
    };
    this.ui.resultsContainer.innerHTML = '<div class="swq-result-summary">' + '<h3>Quiz Complete!</h3>' + '<p>You scored <strong>' + results.score + ' out of ' + results.total + '</strong> (' + results.percentage + '%).</p>' + (reason === 'time_up' ? '<p>Time ran out!</p>' : '') + '</div>';
    this.ui.resultsContainer.classList.remove('swq-hidden');
    if (typeof this.config.onComplete === 'function') {
      this.config.onComplete.call(this, results);
    }
  };
  Quiz.prototype._renderQuestion = function (index) {
    if (index < 0 || index >= this.questions.length) return;
    this.state.currentIndex = index;
    var question = this.questions[index];
    var questionElement = this._getOrCreateQuestionElement(question.id);
    var children = this.ui.questionsContainer.children;
    for (var i = 0; i < children.length; i++) {
      if (children[i].dataset && children[i].dataset.swqQuestionId) {
        children[i].classList.remove('swq-active');
        children[i].classList.add('swq-hidden');
      }
    }
    var optionsContainer = questionElement.querySelector('.swq-options-container');
    if (!optionsContainer || optionsContainer.children.length === 0) {
      var typeEl = questionElement.querySelector('[data-swq-type]');
      var builtHTML = this._buildQuestionHTML(question, questionElement);
      if (typeEl) {
        typeEl.outerHTML = builtHTML;
      } else if (!questionElement.innerHTML.trim()) {
        questionElement.innerHTML = builtHTML;
      }
    }
    questionElement.classList.remove('swq-hidden');
    questionElement.classList.add('swq-active');
    this._restoreAnswer(question.id);
    this._updateControls();
    if (typeof this.config.onQuestionChange === 'function') {
      this.config.onQuestionChange.call(this, question, index);
    }
  };
  Quiz.prototype._getOrCreateQuestionElement = function (id) {
    var el = this.ui.questionsContainer.querySelector('[data-swq-question-id="' + id + '"]');
    if (!el) {
      el = document.createElement('div');
      el.dataset.swqQuestionId = id;
      el.className = 'swq-question';
      this.ui.questionsContainer.appendChild(el);
    }
    return el;
  };
  Quiz.prototype._buildQuestionHTML = function (question, questionElement) {
    var optionsHTML = '';
    var questionName = 'swq-q-' + question.id;
    var opts;
    switch (question.type) {
      case 'choice':
        opts = question.options;
        for (var c = 0; c < opts.length; c++) {
          optionsHTML += '<label class="swq-option"><input type="radio" name="' + questionName + '" value="' + escapeHTML(opts[c]) + '"><span>' + escapeHTML(opts[c]) + '</span></label>';
        }
        break;
      case 'select-multiple':
        opts = question.options;
        for (var s = 0; s < opts.length; s++) {
          optionsHTML += '<label class="swq-option"><input type="checkbox" name="' + questionName + '" value="' + escapeHTML(opts[s]) + '"><span>' + escapeHTML(opts[s]) + '</span></label>';
        }
        break;
      case 'true/false':
      case 'boolean':
        optionsHTML = '<label class="swq-option"><input type="radio" name="' + questionName + '" value="True"><span>True</span></label>' + '<label class="swq-option"><input type="radio" name="' + questionName + '" value="False"><span>False</span></label>';
        break;
      case 'text':
        optionsHTML = '<input type="text" name="' + questionName + '" class="swq-input">';
        break;
      case 'number':
        optionsHTML = '<input type="number" name="' + questionName + '" class="swq-input">';
        break;
      default:
        console.warn('SWQ: Unknown question type "' + question.type + '" for question ' + question.id);
        optionsHTML = '<p class="swq-error">Unknown question type: ' + escapeHTML(question.type) + '</p>';
    }
    var hasExistingText = questionElement && questionElement.querySelector('p');
    if (hasExistingText) {
      return '<div class="swq-options-container" data-swq-type="' + escapeHTML(question.type) + '">' + optionsHTML + '</div><div class="swq-feedback"></div>';
    } else {
      return '<p class="swq-question-text">' + question.text + '</p><div class="swq-options-container" data-swq-type="' + escapeHTML(question.type) + '">' + optionsHTML + '</div><div class="swq-feedback"></div>';
    }
  };
  Quiz.prototype._updateControls = function () {
    var currentIndex = this.state.currentIndex;
    var totalQuestions = this.questions.length;
    if (currentIndex < 0 || currentIndex >= totalQuestions) return;
    if (this.ui.prevBtn) {
      this.ui.prevBtn.disabled = currentIndex <= 0 || !this.config.allowBack;
    }
    var answer = this._collectAnswer();
    var hasAnswer = Array.isArray(answer) ? answer.length > 0 : answer !== null && answer !== '' && answer !== undefined;
    if (this.ui.checkAnswerBtn) {
      this.ui.checkAnswerBtn.disabled = !hasAnswer;
    }
    if (this.ui.nextBtn) {
      this.ui.nextBtn.disabled = !hasAnswer && !this.config.allowSkip;
    }
  };
  Quiz.prototype._updateTimer = function () {
    var elapsed = Math.floor((Date.now() - this.state.startTime) / 1000);
    var remaining = this.config.timer - elapsed;
    if (remaining <= 0) {
      this._endQuiz('time_up');
    } else {
      this._updateTimerDisplay(remaining);
    }
  };
  Quiz.prototype._updateTimerDisplay = function (seconds) {
    if (!this.ui.timerDisplay) return;
    seconds = seconds !== undefined ? seconds : this.config.timer;
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = seconds % 60;
    this.ui.timerDisplay.textContent = minutes + ':' + (remainingSeconds < 10 ? '0' : '') + remainingSeconds;
  };
  Quiz.prototype._handleNext = function () {
    var question = this.questions[this.state.currentIndex];
    var answer = this._collectAnswer();
    var qElement = this._getOrCreateQuestionElement(question.id);
    qElement.classList.remove('swq-incorrect', 'swq-correct');
    var isCorrect = this._isAnswerCorrect(question, answer);
    this.state.userAnswers[question.id] = {
      answer: answer,
      isCorrect: isCorrect
    };
    if (this.config.feedbackMode === 'immediate') {
      qElement.classList.add(isCorrect ? 'swq-correct' : 'swq-incorrect');
      this._showFeedback(question, isCorrect);
      if (this.state.currentIndex < this.questions.length - 1) {
        this._renderQuestion(this.state.currentIndex + 1);
      } else {
        this._endQuiz();
      }
    } else if (this.config.feedbackMode === 'retry') {
      qElement.classList.add(isCorrect ? 'swq-correct' : 'swq-incorrect');
      this._showFeedback(question, isCorrect);
      if (!isCorrect) {
        this._updateControls();
        return;
      } else {
        if (this.state.currentIndex < this.questions.length - 1) {
          this._renderQuestion(this.state.currentIndex + 1);
        } else {
          this._endQuiz();
        }
      }
    } else {
      if (this.state.currentIndex < this.questions.length - 1) {
        this._renderQuestion(this.state.currentIndex + 1);
      } else {
        this._endQuiz();
      }
    }
  };
  Quiz.prototype._handlePrevious = function () {
    if (this.config.allowBack && this.state.currentIndex > 0) {
      this._renderQuestion(this.state.currentIndex - 1);
    }
  };
  Quiz.prototype._handleCheckAnswer = function () {
    var question = this.questions[this.state.currentIndex];
    var answer = this._collectAnswer();
    var qElement = this._getOrCreateQuestionElement(question.id);
    if (answer === null || answer === '' || Array.isArray(answer) && answer.length === 0) {
      return;
    }
    qElement.classList.remove('swq-incorrect', 'swq-correct');
    var isCorrect = this._isAnswerCorrect(question, answer);
    this.state.userAnswers[question.id] = {
      answer: answer,
      isCorrect: isCorrect
    };
    if (this.config.feedbackMode !== 'standard') {
      qElement.classList.add(isCorrect ? 'swq-correct' : 'swq-incorrect');
      this._showFeedback(question, isCorrect);
    }
    this._updateControls();
  };
  Quiz.prototype._handleSkip = function () {
    if (!this.config.allowSkip) return;
    var question = this.questions[this.state.currentIndex];
    this.state.userAnswers[question.id] = {
      answer: null,
      isCorrect: false,
      skipped: true
    };
    if (this.state.currentIndex < this.questions.length - 1) {
      this._renderQuestion(this.state.currentIndex + 1);
    } else {
      this._endQuiz();
    }
  };
  Quiz.prototype._collectAnswer = function () {
    if (this.state.currentIndex < 0) return null;
    var question = this.questions[this.state.currentIndex];
    var qElement = this._getOrCreateQuestionElement(question.id);
    var name = 'swq-q-' + question.id;
    switch (question.type) {
      case 'choice':
      case 'true/false':
      case 'boolean':
        var checkedRadio = qElement.querySelector('input[name="' + name + '"]:checked');
        return checkedRadio ? checkedRadio.value : null;
      case 'select-multiple':
        var checkedBoxes = qElement.querySelectorAll('input[name="' + name + '"]:checked');
        return Array.prototype.map.call(checkedBoxes, function (cb) {
          return cb.value;
        });
      case 'text':
      case 'number':
        var input = qElement.querySelector('input[name="' + name + '"]');
        return input ? input.value : null;
    }
    return null;
  };
  Quiz.prototype._isAnswerCorrect = function (question, userAnswer) {
    if (userAnswer === null || userAnswer === '' || userAnswer === undefined) return false;
    if (!question.answer) return false;
    var correctAnswer = question.answer.toString();
    switch (question.type) {
      case 'select-multiple':
        var correctAnswers;
        if (correctAnswer.trim().charAt(0) === '[') {
          try {
            correctAnswers = JSON.parse(correctAnswer);
          } catch (e) {
            correctAnswers = correctAnswer.split(',');
          }
        } else {
          correctAnswers = correctAnswer.split(',');
        }
        correctAnswers = correctAnswers.map(function (s) {
          return String(s).trim();
        }).sort();
        var userAnswers = Array.isArray(userAnswer) ? userAnswer.slice().sort() : [];
        return JSON.stringify(correctAnswers) === JSON.stringify(userAnswers);
      case 'text':
        return userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase();
      case 'number':
        return parseFloat(userAnswer) === parseFloat(correctAnswer);
      default:
        return userAnswer.toString() === correctAnswer;
    }
  };
  Quiz.prototype._restoreAnswer = function (questionId) {
    var userAnswerData = this.state.userAnswers[questionId];
    if (!userAnswerData) return;
    var question = null;
    for (var i = 0; i < this.questions.length; i++) {
      if (this.questions[i].id === questionId) {
        question = this.questions[i];
        break;
      }
    }
    if (!question) return;
    var qElement = this._getOrCreateQuestionElement(questionId);
    var name = 'swq-q-' + question.id;
    var answer = userAnswerData.answer;
    switch (question.type) {
      case 'choice':
      case 'true/false':
      case 'boolean':
        var radio = qElement.querySelector('input[name="' + name + '"][value="' + escapeHTML(String(answer)) + '"]');
        if (radio) radio.checked = true;
        break;
      case 'select-multiple':
        if (Array.isArray(answer)) {
          for (var a = 0; a < answer.length; a++) {
            var checkbox = qElement.querySelector('input[name="' + name + '"][value="' + escapeHTML(String(answer[a])) + '"]');
            if (checkbox) checkbox.checked = true;
          }
        }
        break;
      case 'text':
      case 'number':
        var input = qElement.querySelector('input[name="' + name + '"]');
        if (input) input.value = answer;
        break;
    }
  };
  Quiz.prototype._showFeedback = function (question, isCorrect) {
    var qElement = this._getOrCreateQuestionElement(question.id);
    var feedbackEl = qElement.querySelector('.swq-feedback');
    if (!feedbackEl) return;
    if (isCorrect) {
      feedbackEl.textContent = 'Correct!';
    } else {
      if (this.config.feedbackMode === 'retry') {
        feedbackEl.textContent = 'Incorrect. Please try again.';
      } else {
        feedbackEl.textContent = 'Incorrect. The correct answer is: ' + question.answer;
      }
    }

    // Disable inputs in immediate mode
    if (this.config.feedbackMode === 'immediate') {
      var inputs = qElement.querySelectorAll('input');
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
      }
    }
  };
  Quiz.prototype.destroy = function () {
    if (this.state.timerId) {
      clearInterval(this.state.timerId);
    }
    if (this.ui.nextBtn) this.ui.nextBtn.removeEventListener('click', this._boundHandleNext);
    if (this.ui.prevBtn) this.ui.prevBtn.removeEventListener('click', this._boundHandlePrevious);
    if (this.ui.checkAnswerBtn) this.ui.checkAnswerBtn.removeEventListener('click', this._boundHandleCheckAnswer);
    if (this.ui.skipBtn) this.ui.skipBtn.removeEventListener('click', this._boundHandleSkip);
    this.ui.questionsContainer.removeEventListener('change', this._boundHandleInputChange);
    this.ui.questionsContainer.removeEventListener('input', this._boundHandleInputChange);
    var idx = swq.instances.indexOf(this);
    if (idx > -1) swq.instances.splice(idx, 1);
    delete this.element.swq;
  };
  Quiz.prototype.reset = function () {
    if (this.state.timerId) {
      clearInterval(this.state.timerId);
    }
    this.state = {
      currentIndex: -1,
      userAnswers: {},
      isFinished: false,
      startTime: null,
      timerId: null
    };
    for (var i = 0; i < this.questions.length; i++) {
      var q = this.questions[i];
      var el = this._getOrCreateQuestionElement(q.id);
      el.classList.remove('swq-correct', 'swq-incorrect', 'swq-active', 'swq-hidden');
      var fb = el.querySelector('.swq-feedback');
      if (fb) {
        fb.textContent = '';
      }
      var inputs = el.querySelectorAll('input');
      for (var j = 0; j < inputs.length; j++) {
        inputs[j].disabled = false;
        inputs[j].checked = false;
        if (inputs[j].type !== 'checkbox' && inputs[j].type !== 'radio') {
          inputs[j].value = '';
        }
      }
    }
    if (this.ui.nextBtn) this.ui.nextBtn.classList.remove('swq-hidden');
    if (this.ui.prevBtn) {
      this.ui.prevBtn.classList.toggle('swq-hidden', !this.config.allowBack);
    }
    if (this.ui.checkAnswerBtn) this.ui.checkAnswerBtn.classList.remove('swq-hidden');
    if (this.ui.skipBtn) {
      this.ui.skipBtn.classList.toggle('swq-hidden', !this.config.allowSkip);
    }
    if (this.ui.timerDisplay) this.ui.timerDisplay.classList.remove('swq-hidden');
    if (this.ui.resultsContainer) {
      this.ui.resultsContainer.innerHTML = '';
      this.ui.resultsContainer.classList.add('swq-hidden');
    }
    this._startQuiz();
  };
  function autoInit() {
    swq.init('[data-swq-quiz]');
  }
  if (document.readyState !== 'loading') {
    autoInit();
  } else {
    document.addEventListener('DOMContentLoaded', autoInit);
  }
  if (typeof root !== 'undefined') {
    root.SWQ = root.swq = swq;
  }
  return swq;
}(typeof window !== 'undefined' ? window : undefined);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (swqExport);
})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=swq.js.map