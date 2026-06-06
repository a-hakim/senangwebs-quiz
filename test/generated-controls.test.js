const test = require('node:test');
const assert = require('node:assert/strict');

class FakeClassList {
    add() {}
    remove() {}
}

class FakeElement {
    constructor(tagName) {
        this.tagName = tagName;
        this.children = [];
        this.dataset = {};
        this.attributes = {};
        this.classList = new FakeClassList();
        this.swq = null;
    }

    querySelector() {
        return null;
    }

    querySelectorAll() {
        return [];
    }

    appendChild(child) {
        this.children.push(child);
        return child;
    }

    insertAdjacentElement(position, child) {
        this.children.unshift(child);
        return child;
    }

    setAttribute(name, value) {
        this.attributes[name] = value;
    }

    getAttribute(name) {
        return this.attributes[name];
    }

    addEventListener() {}
    removeEventListener() {}
}

test('generated navigation buttons do not submit a parent form', () => {
    const quizElement = new FakeElement('div');

    global.document = {
        readyState: 'loading',
        querySelectorAll: () => [quizElement],
        createElement: (tagName) => new FakeElement(tagName),
        addEventListener() {}
    };

    delete require.cache[require.resolve('../dist/swq.min.js')];
    const SWQ = require('../dist/swq.min.js');
    const instances = SWQ.init('[data-swq-quiz]', {
        questions: [],
        settings: { allowBack: true }
    });

    assert.equal(instances.length, 1);

    const controls = quizElement.children.find((child) => child.className === 'swq-controls-default');
    assert.ok(controls);
    assert.equal(controls.children.length, 2);
    assert.equal(controls.children[0].getAttribute('type'), 'button');
    assert.equal(controls.children[1].getAttribute('type'), 'button');

    instances[0].destroy();
    delete global.document;
});
