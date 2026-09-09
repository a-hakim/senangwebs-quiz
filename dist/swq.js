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

  var instanceCounter = 0;
  var KNOWN_TYPES = ['choice', 'select-multiple', 'true/false', 'boolean', 'text', 'number'];
  var FEEDBACK_MODES = ['standard', 'immediate', 'retry'];
  function warn(message) {
    console.warn('SWQ: ' + message);
  }
  function safeCall(context, fn, args) {
    try {
      return fn.apply(context, args);
    } catch (err) {
      warn('A callback threw an error: ' + (err && err.message ? err.message : err));
    }
  }
  function isBlank(value) {
    return value === undefined || value === null || typeof value === 'string' && value.trim() === '';
  }
  function isScalar(value) {
    var t = typeof value;
    return t === 'string' || t === 'number' || t === 'boolean';
  }
  function normalizeBooleanFlag(value) {
    return value === true || value === 'true' || value === 1 || value === '1';
  }
  function normalizeBooleanAnswer(value) {
    var s = String(value).trim().toLowerCase();
    if (s === 'true' || s === '1') return 'True';
    if (s === 'false' || s === '0') return 'False';
    return String(value).trim();
  }
  function isEmptyAnswer(answer) {
    return answer === null || answer === undefined || answer === '' || Array.isArray(answer) && answer.length === 0;
  }
  function formatAnswer(value) {
    if (value === null || value === undefined || value === '') return 'Skipped';
    if (Array.isArray(value)) return value.length ? value.map(String).join(', ') : 'Skipped';
    return String(value);
  }
  function parseMultiAnswer(value) {
    if (Array.isArray(value)) return value.slice();
    var s = String(value).trim();
    if (s.charAt(0) === '[') {
      try {
        var parsed = JSON.parse(s);
        if (Array.isArray(parsed)) return parsed.map(String);
      } catch (e) {
        warn('Invalid JSON in multiple-select answer; falling back to comma-separated parsing.');
      }
    }
    return s.split(',').map(function (part) {
      return part.trim();
    });
  }
  var swq = {
    instances: [],
    init: function (selector, options) {
      options = options || {};
      var elements = document.querySelectorAll(selector);
      var newInstances = [];
      for (var i = 0; i < elements.length; i++) {
        var el = elements[i];
        if (el.swq) continue;
        try {
          var quiz = new Quiz(el, options);
          this.instances.push(quiz);
          newInstances.push(quiz);
        } catch (err) {
          warn('Failed to initialize a quiz: ' + (err && err.message ? err.message : err));
        }
      }
      return newInstances;
    }
  };
  function Quiz(element, options) {
    if (!element || element.nodeType !== undefined && element.nodeType !== 1) {
      throw new Error('Quiz requires a valid DOM element.');
    }
    this.element = element;
    this._uid = ++instanceCounter;
    this.options = options || {};
    this._destroyed = false;
    if (typeof element.classList !== 'undefined' && typeof element.classList.add === 'function') {
      element.classList.add('swq-initialized');
    }
    this._originalNodes = [];
    var existingNodes = element.childNodes || [];
    for (var n = 0; n < existingNodes.length; n++) {
      var child = existingNodes[n];
      if (typeof child.cloneNode === 'function') {
        this._originalNodes.push(child.cloneNode(true));
      }
    }
    this._generated = {};
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
      userAnswers: new Map(),
      drafts: new Map(),
      isFinished: false,
      startTime: null,
      deadline: null,
      timerId: null
    };
    this.element.swq = this;
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
    if (FEEDBACK_MODES.indexOf(this.config.feedbackMode) === -1) {
      warn('Unknown feedbackMode "' + this.config.feedbackMode + '"; falling back to "standard".');
      this.config.feedbackMode = 'standard';
    }
    this.config.allowSkip = normalizeBooleanFlag(this.config.allowSkip);
    this.config.allowBack = normalizeBooleanFlag(this.config.allowBack);
    var timer = Number(this.config.timer);
    if (!isFinite(timer) || timer < 0) {
      warn('Invalid timer value "' + this.config.timer + '"; timer disabled.');
      timer = 0;
    }
    this.config.timer = timer;
  };
  Quiz.prototype._isOwned = function (el) {
    if (!el || el.nodeType !== 1) return false;
    if (typeof el.closest !== 'function') return true;
    return el.closest('[data-swq-quiz]') === this.element;
  };
  Quiz.prototype._findOwned = function (selector) {
    var els = this.element.querySelectorAll(selector);
    for (var i = 0; i < els.length; i++) {
      if (this._isOwned(els[i])) return els[i];
    }
    return null;
  };
  Quiz.prototype._rejectQuestion = function (el, message) {
    warn(message);
    if (el && el.nodeType === 1 && this._isOwned(el)) {
      if (!this._excludedElements) this._excludedElements = [];
      this._excludedElements.push(el);
    }
  };
  Quiz.prototype._validateQuestion = function (raw, source) {
    var label = source || 'question';
    if (!raw || typeof raw !== 'object') {
      this._rejectQuestion(null, 'Skipping invalid ' + label + ' (not an object).');
      return null;
    }
    var id = isBlank(raw.id) ? null : String(raw.id).trim();
    if (!id) {
      this._rejectQuestion(raw.element, 'Skipping ' + label + ' with missing or empty id.');
      return null;
    }
    if (Object.prototype.hasOwnProperty.call(this._seenIds, id)) {
      this._rejectQuestion(raw.element, 'Skipping ' + label + ' with duplicate id "' + id + '".');
      return null;
    }
    var text = isBlank(raw.text) ? null : String(raw.text).trim();
    if (!text) {
      this._rejectQuestion(raw.element, 'Skipping question "' + id + '" with missing text.');
      return null;
    }
    var type = String(raw.type || '').trim();
    if (KNOWN_TYPES.indexOf(type) === -1) {
      this._rejectQuestion(raw.element, 'Skipping question "' + id + '" with unknown type "' + raw.type + '".');
      return null;
    }
    var options = [];
    if (type === 'choice' || type === 'select-multiple') {
      if (!Array.isArray(raw.options) || raw.options.length === 0) {
        this._rejectQuestion(raw.element, 'Skipping question "' + id + '" because it has no options.');
        return null;
      }
      for (var i = 0; i < raw.options.length; i++) {
        if (!isScalar(raw.options[i])) {
          this._rejectQuestion(raw.element, 'Skipping question "' + id + '" because an option is not a scalar value.');
          return null;
        }
        options.push(String(raw.options[i]));
      }
    }
    var answer = raw.answer;
    if (isBlank(answer) && !(Array.isArray(answer) && answer.length)) {
      if (type === 'text') {
        warn('Question "' + id + '" has no answer key; it can never be marked correct.');
      } else {
        this._rejectQuestion(raw.element, 'Skipping question "' + id + '" because it has no answer.');
        return null;
      }
    }
    if ((type === 'true/false' || type === 'boolean') && !isBlank(answer)) {
      answer = normalizeBooleanAnswer(answer);
    }
    this._seenIds[id] = true;
    return {
      id: id,
      text: text,
      type: type,
      answer: answer,
      options: options,
      element: raw.element || null,
      hasOwnText: !!raw.element,
      name: null
    };
  };
  Quiz.prototype._parseQuestions = function () {
    this.questions = [];
    this._seenIds = Object.create(null);
    this._excludedElements = [];
    if (this.options.questions && Array.isArray(this.options.questions)) {
      for (var i = 0; i < this.options.questions.length; i++) {
        var question = this._validateQuestion(this.options.questions[i], 'programmatic question');
        if (question) this.questions.push(question);
      }
    } else {
      var questionElements = this.element.querySelectorAll('[data-swq-question-id]');
      for (var j = 0; j < questionElements.length; j++) {
        var qEl = questionElements[j];
        if (typeof qEl.closest === 'function' && qEl.closest('[data-swq-quiz]') !== this.element) {
          continue;
        }
        var raw = {
          id: qEl.dataset.swqQuestionId,
          element: qEl
        };
        var typeEl = qEl.querySelector('[data-swq-type]');
        if (!typeEl) {
          this._rejectQuestion(qEl, 'Question "' + qEl.dataset.swqQuestionId + '" is missing data-swq-type attribute.');
          continue;
        }
        raw.type = typeEl.dataset.swqType;
        var textEl = qEl.querySelector('p');
        if (!textEl) {
          this._rejectQuestion(qEl, 'Question "' + qEl.dataset.swqQuestionId + '" is missing question text.');
          continue;
        }
        raw.text = textEl.textContent;
        raw.answer = typeEl.dataset.swqAnswer;
        if (typeEl.dataset.swqOptions) {
          try {
            raw.options = JSON.parse(typeEl.dataset.swqOptions);
          } catch (e) {
            this._rejectQuestion(qEl, 'Invalid JSON in data-swq-options for question "' + qEl.dataset.swqQuestionId + '".');
            continue;
          }
        }
        var parsed = this._validateQuestion(raw, 'question');
        if (parsed) this.questions.push(parsed);
      }
    }
    for (var n = 0; n < this.questions.length; n++) {
      this.questions[n].name = 'swq-' + this._uid + '-q' + n;
    }
  };
  Quiz.prototype._createButton = function (label, attr) {
    var btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    btn.setAttribute(attr, '');
    btn.textContent = label;
    return btn;
  };
  Quiz.prototype._setupUI = function () {
    this.ui = {
      nextBtn: this._findOwned('[data-swq-next]'),
      prevBtn: this._findOwned('[data-swq-previous]'),
      checkAnswerBtn: this._findOwned('[data-swq-check-answer]'),
      skipBtn: this._findOwned('[data-swq-skip-question]'),
      timerDisplay: this._findOwned('[data-swq-timer]'),
      resultsContainer: this._findOwned('[data-swq-results]'),
      questionsContainer: this._findOwned('[data-swq-answers]') || this.element
    };
    var needsControls = !this.ui.nextBtn || this.config.allowBack && !this.ui.prevBtn || this.config.allowSkip && !this.ui.skipBtn;
    if (needsControls) {
      var controlsContainer = document.createElement('div');
      controlsContainer.className = 'swq-controls-default';
      if (!this.ui.prevBtn && this.config.allowBack) {
        this.ui.prevBtn = this._createButton('Previous', 'data-swq-previous');
        this._generated.prev = true;
        controlsContainer.appendChild(this.ui.prevBtn);
      }
      if (!this.ui.skipBtn && this.config.allowSkip) {
        this.ui.skipBtn = this._createButton('Skip', 'data-swq-skip-question');
        this._generated.skip = true;
        controlsContainer.appendChild(this.ui.skipBtn);
      }
      if (!this.ui.nextBtn) {
        this.ui.nextBtn = this._createButton('Next', 'data-swq-next');
        this._generated.next = true;
        controlsContainer.appendChild(this.ui.nextBtn);
      }
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
      this.element.appendChild(this.ui.resultsContainer);
    }
    this.ui.resultsContainer.setAttribute('aria-live', 'polite');
    this.ui.resultsContainer.classList.add('swq-hidden');
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
    if (target && target.name && typeof target.name === 'string' && target.name.indexOf('swq-') === 0 && target.name.indexOf('-q') !== -1) {
      this._updateControls();
    }
  };
  Quiz.prototype._startQuiz = function () {
    if (this._destroyed || this.state.isFinished) return;
    if (!this.questions.length) {
      warn('No valid questions were found; quiz will not start.');
      this._showEmptyState();
      return;
    }
    this.state.startTime = Date.now();
    if (this.config.timer > 0) {
      this.state.deadline = this.state.startTime + this.config.timer * 1000;
      this._updateTimerDisplay();
      var self = this;
      this.state.timerId = setInterval(function () {
        self._updateTimer();
      }, 1000);
    }
    for (var i = 0; i < this._excludedElements.length; i++) {
      this._excludedElements[i].classList.add('swq-hidden');
    }
    this._renderQuestion(0);
    if (typeof this.config.onStart === 'function') {
      safeCall(this, this.config.onStart, []);
    }
  };
  Quiz.prototype._showEmptyState = function () {
    if (this.ui.nextBtn) this.ui.nextBtn.disabled = true;
    if (this.ui.prevBtn) this.ui.prevBtn.disabled = true;
    if (this.ui.checkAnswerBtn) this.ui.checkAnswerBtn.disabled = true;
    if (this.ui.skipBtn) this.ui.skipBtn.disabled = true;
    for (var i = 0; i < this._excludedElements.length; i++) {
      this._excludedElements[i].classList.add('swq-hidden');
    }
    this.ui.resultsContainer.textContent = '';
    var msg = document.createElement('p');
    msg.className = 'swq-error';
    msg.textContent = 'No valid questions were found for this quiz.';
    this.ui.resultsContainer.appendChild(msg);
    this.ui.resultsContainer.classList.remove('swq-hidden');
  };
  Quiz.prototype._endQuiz = function (reason) {
    if (this.state.isFinished || this._destroyed) return;
    reason = reason || 'completed';
    this.state.isFinished = true;
    if (this.state.timerId) {
      clearInterval(this.state.timerId);
      this.state.timerId = null;
    }
    if (this.config.feedbackMode === 'standard') {
      for (var i = 0; i < this.questions.length; i++) {
        var answerData = this.state.userAnswers.get(i);
        if (answerData) {
          var qElement = this._getQuestionElement(i);
          qElement.classList.add(answerData.isCorrect ? 'swq-correct' : 'swq-incorrect');
          this._showFeedback(this.questions[i], answerData.isCorrect);
        }
      }
    }
    for (var j = 0; j < this.questions.length; j++) {
      var el = this._getQuestionElement(j);
      el.classList.remove('swq-active');
      el.classList.add('swq-hidden');
    }
    if (this.ui.nextBtn) this.ui.nextBtn.classList.add('swq-hidden');
    if (this.ui.prevBtn) this.ui.prevBtn.classList.add('swq-hidden');
    if (this.ui.checkAnswerBtn) this.ui.checkAnswerBtn.classList.add('swq-hidden');
    if (this.ui.skipBtn) this.ui.skipBtn.classList.add('swq-hidden');
    if (this.ui.timerDisplay) this.ui.timerDisplay.classList.add('swq-hidden');
    var score = 0;
    for (var k = 0; k < this.questions.length; k++) {
      var data = this.state.userAnswers.get(k);
      if (data && data.isCorrect) {
        score++;
      }
    }
    var results = Object.freeze({
      score: score,
      total: this.questions.length,
      percentage: this.questions.length > 0 ? Math.round(score / this.questions.length * 100) : 0,
      reason: reason
    });
    this._renderResults(results);
    if (typeof this.config.onComplete === 'function') {
      safeCall(this, this.config.onComplete, [results]);
    }
  };
  Quiz.prototype._renderResults = function (results) {
    var container = this.ui.resultsContainer;
    container.textContent = '';
    var summary = document.createElement('div');
    summary.className = 'swq-result-summary';
    var heading = document.createElement('h3');
    heading.textContent = 'Quiz Complete!';
    summary.appendChild(heading);
    var scoreLine = document.createElement('p');
    scoreLine.appendChild(document.createTextNode('You scored '));
    var strong = document.createElement('strong');
    strong.textContent = results.score + ' out of ' + results.total;
    scoreLine.appendChild(strong);
    scoreLine.appendChild(document.createTextNode(' (' + results.percentage + '%).'));
    summary.appendChild(scoreLine);
    if (results.reason === 'time_up') {
      var timeLine = document.createElement('p');
      timeLine.textContent = 'Time ran out!';
      summary.appendChild(timeLine);
    }
    container.appendChild(summary);
    var review = document.createElement('div');
    review.className = 'swq-review';
    for (var i = 0; i < this.questions.length; i++) {
      var question = this.questions[i];
      var answerData = this.state.userAnswers.get(i);
      var item = document.createElement('div');
      item.className = 'swq-review-item ' + (answerData && answerData.isCorrect ? 'swq-review-correct' : 'swq-review-incorrect');
      var title = document.createElement('p');
      title.className = 'swq-review-question';
      title.textContent = 'Q' + (i + 1) + '. ' + question.text;
      item.appendChild(title);
      var yourAnswer = document.createElement('p');
      yourAnswer.className = 'swq-review-answer';
      yourAnswer.textContent = answerData && answerData.skipped || !answerData ? 'Your answer: Skipped' : 'Your answer: ' + formatAnswer(answerData.answer);
      item.appendChild(yourAnswer);
      var correctAnswer = document.createElement('p');
      correctAnswer.className = 'swq-review-correct-answer';
      correctAnswer.textContent = 'Correct answer: ' + formatAnswer(question.answer);
      item.appendChild(correctAnswer);
      review.appendChild(item);
    }
    container.appendChild(review);
    container.classList.remove('swq-hidden');
  };
  Quiz.prototype._getQuestionElement = function (index) {
    var question = this.questions[index];
    if (!question.element) {
      var el = document.createElement('div');
      el.dataset.swqQuestionId = question.id;
      el.className = 'swq-question';
      el.setAttribute('tabindex', '-1');
      this.ui.questionsContainer.appendChild(el);
      question.element = el;
    }
    if (!question.element.getAttribute('tabindex')) {
      question.element.setAttribute('tabindex', '-1');
    }
    return question.element;
  };
  Quiz.prototype._buildOptionsContainer = function (question) {
    var container = document.createElement('div');
    container.className = 'swq-options-container';
    container.setAttribute('data-swq-type', question.type);
    if (question.type === 'select-multiple') {
      container.setAttribute('role', 'group');
    } else {
      container.setAttribute('role', 'radiogroup');
    }
    container.setAttribute('aria-label', question.text);
    var isMultiple = question.type === 'select-multiple';
    var inputType = isMultiple ? 'checkbox' : 'radio';
    if (question.type === 'choice' || question.type === 'select-multiple') {
      for (var i = 0; i < question.options.length; i++) {
        var value = question.options[i];
        var label = document.createElement('label');
        label.className = 'swq-option';
        var input = document.createElement('input');
        input.type = inputType;
        input.name = question.name;
        input.value = value;
        var span = document.createElement('span');
        span.textContent = value;
        label.appendChild(input);
        label.appendChild(span);
        container.appendChild(label);
      }
    } else if (question.type === 'true/false' || question.type === 'boolean') {
      var boolValues = ['True', 'False'];
      for (var b = 0; b < boolValues.length; b++) {
        var boolLabel = document.createElement('label');
        boolLabel.className = 'swq-option';
        var boolInput = document.createElement('input');
        boolInput.type = 'radio';
        boolInput.name = question.name;
        boolInput.value = boolValues[b];
        var boolSpan = document.createElement('span');
        boolSpan.textContent = boolValues[b];
        boolLabel.appendChild(boolInput);
        boolLabel.appendChild(boolSpan);
        container.appendChild(boolLabel);
      }
    } else {
      var input = document.createElement('input');
      input.type = question.type;
      input.name = question.name;
      input.className = 'swq-input';
      input.setAttribute('aria-label', question.text);
      container.appendChild(input);
    }
    return container;
  };
  Quiz.prototype._ensureInputUI = function (index) {
    var question = this.questions[index];
    var el = question.element;
    if (el.querySelector('.swq-feedback')) return;
    if (!question.hasOwnText) {
      var textP = document.createElement('p');
      textP.className = 'swq-question-text';
      textP.textContent = question.text;
      el.appendChild(textP);
    }
    var typeEl = el.querySelector('[data-swq-type]');
    var container = this._buildOptionsContainer(question);
    if (typeEl) {
      typeEl.replaceWith(container);
    } else {
      el.appendChild(container);
    }
    var feedback = document.createElement('div');
    feedback.className = 'swq-feedback';
    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    el.appendChild(feedback);
  };
  Quiz.prototype._renderQuestion = function (index, focusQuestion) {
    if (index < 0 || index >= this.questions.length) return;
    this.state.currentIndex = index;
    var question = this.questions[index];
    var questionElement = this._getQuestionElement(index);
    for (var i = 0; i < this.questions.length; i++) {
      if (i === index) continue;
      var other = this.questions[i].element;
      if (!other) continue;
      other.classList.remove('swq-active');
      other.classList.add('swq-hidden');
    }
    questionElement.classList.remove('swq-hidden');
    questionElement.classList.add('swq-active');
    this._ensureInputUI(index);
    this._restoreAnswer(index);
    this._updateControls();
    if (focusQuestion && typeof questionElement.focus === 'function') {
      questionElement.focus();
    }
    if (typeof this.config.onQuestionChange === 'function') {
      safeCall(this, this.config.onQuestionChange, [question, index]);
    }
  };
  Quiz.prototype._questionInputs = function (question) {
    if (!question.element) return [];
    var inputs = question.element.querySelectorAll('input');
    var matching = [];
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].name === question.name) matching.push(inputs[i]);
    }
    return matching;
  };
  Quiz.prototype._collectAnswer = function () {
    if (this.state.currentIndex < 0) return null;
    var question = this.questions[this.state.currentIndex];
    if (!question) return null;
    var inputs = this._questionInputs(question);
    switch (question.type) {
      case 'choice':
      case 'true/false':
      case 'boolean':
        for (var r = 0; r < inputs.length; r++) {
          if (inputs[r].checked) return inputs[r].value;
        }
        return null;
      case 'select-multiple':
        var values = [];
        for (var c = 0; c < inputs.length; c++) {
          if (inputs[c].checked) values.push(inputs[c].value);
        }
        return values;
      case 'text':
      case 'number':
        return inputs.length ? inputs[0].value : null;
    }
    return null;
  };
  Quiz.prototype._applyAnswerToInputs = function (question, value) {
    var inputs = this._questionInputs(question);
    for (var i = 0; i < inputs.length; i++) {
      var input = inputs[i];
      if (input.type === 'checkbox') {
        input.checked = Array.isArray(value) && value.indexOf(input.value) !== -1;
      } else if (input.type === 'radio') {
        input.checked = value !== null && value !== undefined && input.value === String(value);
      } else {
        input.value = value === null || value === undefined ? '' : String(value);
      }
    }
  };
  Quiz.prototype._clearInputs = function (question) {
    this._applyAnswerToInputs(question, null);
  };
  Quiz.prototype._saveDraft = function () {
    var index = this.state.currentIndex;
    if (index < 0 || index >= this.questions.length || this.state.isFinished) return;
    if (this.state.userAnswers.has(index)) return;
    this.state.drafts.set(index, this._collectAnswer());
  };
  Quiz.prototype._restoreAnswer = function (index) {
    var question = this.questions[index];
    if (!question) return;
    this._clearInputs(question);
    var value;
    if (this.state.drafts.has(index)) {
      value = this.state.drafts.get(index);
    } else if (this.state.userAnswers.has(index)) {
      value = this.state.userAnswers.get(index).answer;
    } else {
      return;
    }
    if (isEmptyAnswer(value)) return;
    this._applyAnswerToInputs(question, value);
  };
  Quiz.prototype._isAnswerCorrect = function (question, userAnswer) {
    if (isEmptyAnswer(userAnswer)) return false;
    if (question.answer === undefined || question.answer === null || question.answer === '') return false;
    switch (question.type) {
      case 'select-multiple':
        {
          var expected = parseMultiAnswer(question.answer).map(function (s) {
            return String(s).trim();
          }).sort();
          var submitted = (Array.isArray(userAnswer) ? userAnswer.slice() : [userAnswer]).map(function (s) {
            return String(s).trim();
          }).sort();
          return JSON.stringify(expected) === JSON.stringify(submitted);
        }
      case 'text':
        return String(userAnswer).trim().toLowerCase() === String(question.answer).trim().toLowerCase();
      case 'number':
        {
          var submittedNum = Number(String(userAnswer).trim());
          var expectedNum = Number(String(question.answer).trim());
          return isFinite(submittedNum) && isFinite(expectedNum) && submittedNum === expectedNum;
        }
      case 'true/false':
      case 'boolean':
        return normalizeBooleanAnswer(userAnswer) === normalizeBooleanAnswer(question.answer);
      default:
        return String(userAnswer) === String(question.answer);
    }
  };
  Quiz.prototype._showFeedback = function (question, isCorrect) {
    var feedbackEl = question.element.querySelector('.swq-feedback');
    if (!feedbackEl) return;
    if (isCorrect) {
      feedbackEl.textContent = 'Correct!';
    } else if (this.config.feedbackMode === 'retry') {
      feedbackEl.textContent = 'Incorrect. Please try again.';
    } else {
      feedbackEl.textContent = 'Incorrect. The correct answer is: ' + formatAnswer(question.answer);
    }
    if (this.config.feedbackMode === 'immediate') {
      var inputs = this._questionInputs(question);
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = true;
      }
    }
  };
  Quiz.prototype._updateControls = function () {
    var index = this.state.currentIndex;
    if (index < 0 || index >= this.questions.length) return;
    var question = this.questions[index];
    var answer = this._collectAnswer();
    var hasAnswer = !isEmptyAnswer(answer);
    var alreadyGraded = this.config.feedbackMode === 'immediate' && this.state.userAnswers.has(index);
    if (this.ui.prevBtn) {
      this.ui.prevBtn.disabled = index <= 0 || !this.config.allowBack;
    }
    if (this.ui.checkAnswerBtn) {
      this.ui.checkAnswerBtn.disabled = !hasAnswer;
    }
    if (this.ui.nextBtn) {
      this.ui.nextBtn.disabled = !hasAnswer && !this.config.allowSkip && !alreadyGraded;
      if (this._generated.next) {
        this.ui.nextBtn.textContent = alreadyGraded ? 'Continue' : index === this.questions.length - 1 ? 'Finish' : 'Next';
      }
    }
  };
  Quiz.prototype._isInteractive = function () {
    if (this._destroyed) return false;
    if (this.state.isFinished) return false;
    if (this.config.timer > 0 && this.state.deadline !== null && Date.now() >= this.state.deadline) {
      this._endQuiz('time_up');
      return false;
    }
    return true;
  };
  Quiz.prototype._advance = function () {
    if (this.state.currentIndex < this.questions.length - 1) {
      this._renderQuestion(this.state.currentIndex + 1, true);
    } else {
      this._endQuiz();
    }
  };
  Quiz.prototype._handleNext = function () {
    if (!this._isInteractive()) return;
    var index = this.state.currentIndex;
    var question = this.questions[index];
    if (!question) return;
    if (this.config.feedbackMode === 'immediate' && this.state.userAnswers.has(index)) {
      this._advance();
      return;
    }
    var answer = this._collectAnswer();
    if (isEmptyAnswer(answer) && !this.config.allowSkip) {
      this._updateControls();
      return;
    }
    question.element.classList.remove('swq-incorrect', 'swq-correct');
    var isCorrect = this._isAnswerCorrect(question, answer);
    this.state.drafts.delete(index);
    this.state.userAnswers.set(index, {
      answer: answer,
      isCorrect: isCorrect
    });
    if (this.config.feedbackMode === 'immediate') {
      question.element.classList.add(isCorrect ? 'swq-correct' : 'swq-incorrect');
      this._showFeedback(question, isCorrect);
      this._updateControls();
      if (this.ui.nextBtn && typeof this.ui.nextBtn.focus === 'function') {
        this.ui.nextBtn.focus();
      }
    } else if (this.config.feedbackMode === 'retry') {
      question.element.classList.add(isCorrect ? 'swq-correct' : 'swq-incorrect');
      this._showFeedback(question, isCorrect);
      if (!isCorrect) {
        this._updateControls();
        return;
      }
      this._advance();
    } else {
      this._advance();
    }
  };
  Quiz.prototype._handlePrevious = function () {
    if (!this._isInteractive()) return;
    if (this.config.allowBack && this.state.currentIndex > 0) {
      this._saveDraft();
      this._renderQuestion(this.state.currentIndex - 1, true);
    }
  };
  Quiz.prototype._handleCheckAnswer = function () {
    if (!this._isInteractive()) return;
    var index = this.state.currentIndex;
    var question = this.questions[index];
    if (!question) return;
    var answer = this._collectAnswer();
    if (isEmptyAnswer(answer)) return;
    question.element.classList.remove('swq-incorrect', 'swq-correct');
    var isCorrect = this._isAnswerCorrect(question, answer);
    this.state.drafts.delete(index);
    this.state.userAnswers.set(index, {
      answer: answer,
      isCorrect: isCorrect
    });
    if (this.config.feedbackMode !== 'standard') {
      question.element.classList.add(isCorrect ? 'swq-correct' : 'swq-incorrect');
      this._showFeedback(question, isCorrect);
    }
    this._updateControls();
  };
  Quiz.prototype._handleSkip = function () {
    if (!this._isInteractive()) return;
    if (!this.config.allowSkip) return;
    var index = this.state.currentIndex;
    var question = this.questions[index];
    if (!question) return;
    this.state.drafts.delete(index);
    this.state.userAnswers.set(index, {
      answer: null,
      isCorrect: false,
      skipped: true
    });
    this._advance();
  };
  Quiz.prototype._updateTimer = function () {
    var remaining = Math.round((this.state.deadline - Date.now()) / 1000);
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
  Quiz.prototype.destroy = function () {
    if (this._destroyed) return;
    this._destroyed = true;
    if (this.state.timerId) {
      clearInterval(this.state.timerId);
      this.state.timerId = null;
    }
    if (this.ui.nextBtn) this.ui.nextBtn.removeEventListener('click', this._boundHandleNext);
    if (this.ui.prevBtn) this.ui.prevBtn.removeEventListener('click', this._boundHandlePrevious);
    if (this.ui.checkAnswerBtn) this.ui.checkAnswerBtn.removeEventListener('click', this._boundHandleCheckAnswer);
    if (this.ui.skipBtn) this.ui.skipBtn.removeEventListener('click', this._boundHandleSkip);
    this.ui.questionsContainer.removeEventListener('change', this._boundHandleInputChange);
    this.ui.questionsContainer.removeEventListener('input', this._boundHandleInputChange);
    var idx = swq.instances.indexOf(this);
    if (idx > -1) swq.instances.splice(idx, 1);
    if (this._originalNodes.length) {
      this.element.textContent = '';
      for (var c = 0; c < this._originalNodes.length; c++) {
        this.element.appendChild(this._originalNodes[c]);
      }
    }
    delete this.element.swq;
  };
  Quiz.prototype.reset = function () {
    if (this._destroyed) {
      warn('Cannot reset a destroyed quiz instance.');
      return;
    }
    if (this.state.timerId) {
      clearInterval(this.state.timerId);
    }
    this.state = {
      currentIndex: -1,
      userAnswers: new Map(),
      drafts: new Map(),
      isFinished: false,
      startTime: null,
      deadline: null,
      timerId: null
    };
    for (var i = 0; i < this.questions.length; i++) {
      var question = this.questions[i];
      var el = this._getQuestionElement(i);
      el.classList.remove('swq-correct', 'swq-incorrect', 'swq-active', 'swq-hidden');
      var fb = el.querySelector('.swq-feedback');
      if (fb) {
        fb.textContent = '';
      }
      var inputs = this._questionInputs(question);
      for (var j = 0; j < inputs.length; j++) {
        inputs[j].disabled = false;
        inputs[j].checked = false;
        if (inputs[j].type !== 'checkbox' && inputs[j].type !== 'radio') {
          inputs[j].value = '';
        }
      }
    }
    if (this.ui.nextBtn) {
      this.ui.nextBtn.classList.remove('swq-hidden');
      this.ui.nextBtn.disabled = false;
    }
    if (this.ui.prevBtn) {
      this.ui.prevBtn.classList.remove('swq-hidden');
      this.ui.prevBtn.disabled = false;
      this.ui.prevBtn.classList.toggle('swq-hidden', !this.config.allowBack);
    }
    if (this.ui.checkAnswerBtn) {
      this.ui.checkAnswerBtn.classList.remove('swq-hidden');
      this.ui.checkAnswerBtn.disabled = false;
    }
    if (this.ui.skipBtn) {
      this.ui.skipBtn.classList.remove('swq-hidden');
      this.ui.skipBtn.disabled = false;
      this.ui.skipBtn.classList.toggle('swq-hidden', !this.config.allowSkip);
    }
    if (this.ui.timerDisplay) this.ui.timerDisplay.classList.remove('swq-hidden');
    if (this.ui.resultsContainer) {
      this.ui.resultsContainer.textContent = '';
      this.ui.resultsContainer.classList.add('swq-hidden');
    }
    this._startQuiz();
  };
  function autoInit() {
    swq.init('[data-swq-quiz]');
  }
  if (typeof document !== 'undefined') {
    if (document.readyState !== 'loading') {
      autoInit();
    } else {
      document.addEventListener('DOMContentLoaded', autoInit);
    }
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