const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('path');
const { JSDOM } = require('jsdom');

const BUNDLE = path.resolve(__dirname, '../dist/swq.min.js');

async function createDom(bodyHtml) {
    const dom = new JSDOM('<!DOCTYPE html><html><body>' + bodyHtml + '</body></html>');
    const doc = dom.window.document;
    if (doc.readyState === 'loading') {
        await new Promise((resolve) => doc.addEventListener('DOMContentLoaded', resolve));
    }
    global.window = dom.window;
    global.document = doc;
    delete require.cache[require.resolve(BUNDLE)];
    const SWQ = require(BUNDLE);
    return { dom, SWQ };
}

test.afterEach(() => {
    delete global.window;
    delete global.document;
});

const DECLARATIVE_QUESTION =
    '<div data-swq-question-id="q1"><p>What is 2 + 2?</p>' +
    '<div data-swq-type="choice" data-swq-answer="4" data-swq-options=\'["2", "3", "4", "5"]\'></div></div>';

test('generated navigation buttons do not submit a parent form', async () => {
    const { SWQ } = await createDom('<div id="quiz"></div>');
    const instances = SWQ.init('#quiz', {
        questions: [],
        settings: { allowBack: true }
    });

    assert.equal(instances.length, 1);

    const controls = document.querySelector('#quiz .swq-controls-default');
    assert.ok(controls);
    assert.equal(controls.querySelectorAll('button').length, 2);
    const buttons = controls.querySelectorAll('button');
    assert.equal(buttons[0].getAttribute('type'), 'button');
    assert.equal(buttons[1].getAttribute('type'), 'button');

    instances[0].destroy();
});

test('F01: programmatic question text is rendered as plain text, not HTML', async () => {
    const { SWQ } = await createDom('<div id="quiz"></div>');
    const hostile = '<img src=x onerror="alert(1)"><em>marker</em>';
    const quiz = SWQ.init('#quiz', {
        questions: [{ id: 'q1', text: hostile, type: 'choice', answer: 'A', options: ['A', 'B'] }]
    })[0];

    const el = quiz.questions[0].element;
    assert.equal(el.querySelectorAll('img').length, 0);
    assert.equal(el.querySelectorAll('em').length, 0);
    assert.equal(el.querySelector('.swq-question-text').textContent, hostile);
});

test('F02: duplicate ids are rejected and quote-containing ids are safe', async () => {
    const { SWQ } = await createDom('<div id="quiz"></div>');
    const quiz = SWQ.init('#quiz', {
        questions: [
            { id: 'dup', text: 'First', type: 'choice', answer: 'A', options: ['A', 'B'] },
            { id: 'dup', text: 'Second', type: 'choice', answer: 'B', options: ['A', 'B'] },
            { id: 'a"b\\c', text: 'Weird id', type: 'choice', answer: 'A', options: ['A', 'B'] }
        ]
    })[0];

    assert.equal(quiz.questions.length, 2);
    assert.equal(quiz.questions[0].id, 'dup');
    assert.equal(quiz.questions[1].id, 'a"b\\c');

    quiz.state.currentIndex = 1;
    quiz._renderQuestion(1);
    const radio = quiz.questions[1].element.querySelector('input[type="radio"]');
    radio.checked = true;
    quiz._handleNext();
    assert.equal(quiz.state.userAnswers.get(1).isCorrect, true);
});

test('F03: two quizzes sharing question ids use independent radio groups', async () => {
    const { SWQ } = await createDom(
        '<div id="quiz1" data-swq-quiz>' + DECLARATIVE_QUESTION + '</div>' +
        '<div id="quiz2" data-swq-quiz>' + DECLARATIVE_QUESTION + '</div>'
    );

    const quiz1 = document.querySelector('#quiz1').swq;
    const quiz2 = document.querySelector('#quiz2').swq;

    assert.ok(quiz1 && quiz2);
    assert.notEqual(quiz1.questions[0].name, quiz2.questions[0].name);

    const radio1 = quiz1.questions[0].element.querySelector('input[value="4"]');
    const radio2 = quiz2.questions[0].element.querySelector('input[value="4"]');
    radio1.checked = true;
    assert.equal(radio2.checked, false);

    radio2.checked = true;
    assert.equal(radio1.checked, true);
});

test('F04: supplying only a custom Check Answer button still yields a completion path', async () => {
    const { SWQ } = await createDom(
        '<div id="quiz" data-swq-quiz data-swq-allow-skip="true">' +
        DECLARATIVE_QUESTION +
        '<button type="button" data-swq-check-answer>Check</button>' +
        '</div>'
    );

    const quiz = document.querySelector('#quiz').swq;
    assert.ok(quiz.ui.nextBtn, 'Next is generated even when Check Answer is provided');
    assert.ok(quiz.ui.skipBtn, 'Skip is generated when allow-skip is set and no skip button exists');
    assert.equal(quiz.ui.checkAnswerBtn.textContent, 'Check');
    assert.equal(quiz.ui.prevBtn, null);

    quiz.ui.skipBtn.click();
    assert.equal(quiz.state.isFinished, true);
});

test('F05: destroy restores original markup and the container can be reinitialized', async () => {
    const { SWQ } = await createDom(
        '<div id="quiz" data-swq-quiz>' +
        DECLARATIVE_QUESTION +
        '<div data-swq-question-id="q2"><p>Capital of France?</p>' +
        '<div data-swq-type="text" data-swq-answer="Paris"></div></div>' +
        '</div>'
    );

    let quiz = document.querySelector('#quiz').swq;
    const radio = quiz.questions[0].element.querySelector('input[value="4"]');
    radio.checked = true;
    quiz._handleNext();
    quiz.destroy();

    assert.equal(document.querySelector('#quiz').swq, undefined);

    const typeEl = document.querySelector('[data-swq-question-id="q1"] [data-swq-type]');
    assert.equal(typeEl.dataset.swqAnswer, '4', 'original answer attribute is restored');

    quiz = SWQ.init('#quiz')[0];
    assert.equal(quiz.questions.length, 2);
    assert.equal(quiz.questions[0].id, 'q1');
    assert.equal(quiz.questions[1].id, 'q2');
    assert.equal(quiz.questions[0].answer, '4');
});

test('F07: zero, trimmed text, arrays with commas, and native booleans grade correctly', async () => {
    const { SWQ } = await createDom('<div id="quiz"></div>');
    const quiz = SWQ.init('#quiz', {
        questions: [
            { id: 'n', text: 'Zero?', type: 'number', answer: 0 },
            { id: 't', text: 'Capital?', type: 'text', answer: ' Paris ' },
            { id: 'm', text: 'Cities?', type: 'select-multiple', answer: ['Washington, D.C.', 'Paris'], options: ['Washington, D.C.', 'Paris', 'London'] },
            { id: 'b', text: 'Sky is blue?', type: 'boolean', answer: false }
        ]
    })[0];

    quiz.questions[0].element.querySelector('input[type="number"]').value = '0';
    quiz._handleNext();

    quiz.questions[1].element.querySelector('input[type="text"]').value = ' paris ';
    quiz._handleNext();

    const checks = quiz.questions[2].element.querySelectorAll('input[type="checkbox"]');
    checks[0].checked = true;
    checks[1].checked = true;
    quiz._handleNext();

    const falseRadio = quiz.questions[3].element.querySelector('input[value="False"]');
    falseRadio.checked = true;
    quiz._handleNext();

    for (let i = 0; i < 4; i++) {
        assert.equal(quiz.state.userAnswers.get(i).isCorrect, true, 'question ' + i + ' graded correct');
    }
    assert.equal(quiz.state.isFinished, true);
});

test('F07: malformed numbers and wrong multiple selections grade as incorrect', async () => {
    const { SWQ } = await createDom('<div id="quiz"></div>');
    const quiz = SWQ.init('#quiz', {
        questions: [
            { id: 'n', text: 'Ten?', type: 'number', answer: '10' },
            { id: 'm', text: 'Cities?', type: 'select-multiple', answer: '["A", "B"]', options: ['A', 'B', 'C'] }
        ]
    })[0];

    assert.equal(quiz._isAnswerCorrect(quiz.questions[0], '10abc'), false);
    assert.equal(quiz._isAnswerCorrect(quiz.questions[0], '10'), true);

    quiz._renderQuestion(1);
    const checks = quiz.questions[1].element.querySelectorAll('input[type="checkbox"]');
    checks[0].checked = true;
    quiz._handleNext();
    assert.equal(quiz.state.userAnswers.get(1).isCorrect, false);
});

test('F06: immediate mode shows readable feedback and requires an explicit Continue', async () => {
    const { SWQ } = await createDom('<div id="quiz"></div>');
    const quiz = SWQ.init('#quiz', {
        questions: [
            { id: 'q1', text: '2 + 2?', type: 'choice', answer: '4', options: ['3', '4'] },
            { id: 'q2', text: '2 + 3?', type: 'choice', answer: '5', options: ['4', '5'] }
        ],
        settings: { feedbackMode: 'immediate' }
    })[0];

    const el = quiz.questions[0].element;
    el.querySelector('input[value="4"]').checked = true;
    quiz._handleNext();

    assert.equal(el.querySelector('.swq-feedback').textContent, 'Correct!');
    assert.equal(el.querySelector('input').disabled, true);
    assert.equal(quiz.ui.nextBtn.textContent, 'Continue');
    assert.equal(quiz.state.currentIndex, 0, 'quiz waits for the user to continue');

    quiz._handleNext();
    assert.equal(quiz.state.currentIndex, 1);
});

test('F06: standard mode ends with a per-question answer review', async () => {
    const { SWQ } = await createDom('<div id="quiz"></div>');
    const quiz = SWQ.init('#quiz', {
        questions: [
            { id: 'q1', text: '2 + 2?', type: 'choice', answer: '4', options: ['3', '4'] },
            { id: 'q2', text: '2 + 3?', type: 'choice', answer: '5', options: ['4', '5'] }
        ]
    })[0];

    quiz.questions[0].element.querySelector('input[value="4"]').checked = true;
    quiz._handleNext();
    quiz.questions[1].element.querySelector('input[value="4"]').checked = true;
    quiz._handleNext();

    assert.equal(quiz.state.isFinished, true);
    const reviewItems = quiz.ui.resultsContainer.querySelectorAll('.swq-review-item');
    assert.equal(reviewItems.length, 2);
    assert.ok(quiz.ui.resultsContainer.textContent.indexOf('Your answer: 4') !== -1);
    assert.ok(quiz.ui.resultsContainer.textContent.indexOf('Correct answer: 5') !== -1);
    assert.ok(quiz.ui.nextBtn.classList.contains('swq-hidden'));
});

test('F08: drafts survive back-navigation and are restored instead of stale selections', async () => {
    const { SWQ } = await createDom('<div id="quiz"></div>');
    const quiz = SWQ.init('#quiz', {
        questions: [
            { id: 'q1', text: '2 + 2?', type: 'choice', answer: '4', options: ['3', '4'] },
            { id: 'q2', text: '2 + 3?', type: 'choice', answer: '5', options: ['4', '5'] }
        ],
        settings: { allowBack: true }
    })[0];

    quiz.questions[0].element.querySelector('input[value="3"]').checked = true;
    quiz._handleNext();

    quiz._handlePrevious();
    const savedRadio = quiz.questions[0].element.querySelector('input[value="3"]');
    assert.equal(savedRadio.checked, true, 'draft answer is restored when navigating back');

    savedRadio.checked = false;
    quiz.questions[0].element.querySelector('input[value="4"]').checked = true;
    quiz._handleNext();
    assert.equal(quiz.state.userAnswers.get(0).isCorrect, true, 'edited answer replaces the draft');
});

test('F10: a malformed declarative quiz does not prevent other quizzes from initializing', async () => {
    const { SWQ } = await createDom(
        '<div id="bad" data-swq-quiz>' + DECLARATIVE_QUESTION.replace('\'["2", "3", "4", "5"]\'', 'not-json') + '</div>' +
        '<div id="good" data-swq-quiz>' + DECLARATIVE_QUESTION + '</div>'
    );

    const bad = document.querySelector('#bad').swq;
    const good = document.querySelector('#good').swq;
    assert.ok(bad && good, 'both containers receive an instance');
    assert.equal(bad.questions.length, 0);
    assert.equal(good.questions.length, 1);
    assert.ok(bad.ui.resultsContainer.textContent.indexOf('No valid questions') !== -1);
});

test('F11: submitting after the deadline ends the quiz with reason time_up', async () => {
    const { SWQ } = await createDom('<div id="quiz"></div>');
    let completion = null;
    const quiz = SWQ.init('#quiz', {
        questions: [{ id: 'q1', text: '2 + 2?', type: 'choice', answer: '4', options: ['3', '4'] }],
        settings: {
            timer: 60,
            onComplete: function(results) { completion = results; }
        }
    })[0];

    quiz.state.deadline = Date.now() - 1000;
    quiz.questions[0].element.querySelector('input[value="4"]').checked = true;
    quiz._handleNext();

    assert.equal(quiz.state.isFinished, true);
    assert.ok(completion);
    assert.equal(completion.reason, 'time_up');
    assert.equal(Object.isFrozen(completion), true);
});

test('F12: generated inputs carry accessible names and feedback is a live region', async () => {
    const { SWQ } = await createDom('<div id="quiz"></div>');
    const quiz = SWQ.init('#quiz', {
        questions: [
            { id: 'q1', text: 'Favorite color?', type: 'choice', answer: 'Blue', options: ['Blue', 'Red'] },
            { id: 'q2', text: 'Your name?', type: 'text', answer: 'Ali' }
        ]
    })[0];

    const group = quiz.questions[0].element.querySelector('.swq-options-container');
    assert.equal(group.getAttribute('role'), 'radiogroup');
    assert.equal(group.getAttribute('aria-label'), 'Favorite color?');

    quiz._renderQuestion(1);
    const textInput = quiz.questions[1].element.querySelector('input[type="text"]');
    assert.equal(textInput.getAttribute('aria-label'), 'Your name?');

    const feedback = quiz.questions[0].element.querySelector('.swq-feedback');
    assert.equal(feedback.getAttribute('role'), 'status');
    assert.equal(feedback.getAttribute('aria-live'), 'polite');
});

test('declarative quiz renders and completes end to end', async () => {
    const { SWQ } = await createDom(
        '<div id="quiz" data-swq-quiz data-swq-feedback-mode="immediate">' + DECLARATIVE_QUESTION + '</div>'
    );

    const quiz = document.querySelector('#quiz').swq;
    assert.equal(quiz.questions.length, 1);
    assert.equal(quiz.questions[0].type, 'choice');
    assert.equal(quiz.questions[0].options.length, 4);

    quiz.questions[0].element.querySelector('input[value="4"]').checked = true;
    quiz._handleNext();
    assert.equal(quiz.state.currentIndex, 0, 'immediate mode waits for Continue');
    quiz._handleNext();
    assert.equal(quiz.state.isFinished, true);
    assert.equal(quiz.state.userAnswers.get(0).isCorrect, true);
});
