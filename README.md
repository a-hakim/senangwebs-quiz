# SenangWebs Quiz (SWQ)

A lightweight, flexible JavaScript library for creating interactive quizzes with multiple question types, configurable feedback modes, and built-in UI generation.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

![SenangWebs Quiz Preview](https://raw.githubusercontent.com/a-hakim/senangwebs-quiz/master/swq_preview.png)

## Features

- **Multiple Question Types:** Choice (single select), multiple select, true/false (or `boolean`), text input, and number input
- **Three Feedback Modes:**
  - **Standard** - Show all feedback at quiz completion, with a per-question answer review
  - **Immediate** - Show feedback after each question, then continue with an explicit **Continue** step
  - **Retry** - Allow users to retry incorrect answers until they get them right
- **Built-in Timer:** Optional countdown timer with automatic quiz termination; submissions after the deadline are rejected
- **Navigation Controls:** Configurable back/previous navigation and question skipping; unsent drafts are preserved when navigating back
- **Automatic UI Generation:** Creates complete question interfaces from simple data attributes
- **Fallback Controls:** Automatically generates each missing control independently (Next, Previous, Skip) so every configuration has a completion path
- **Flexible Integration:** Works with existing HTML structures or generates everything automatically
- **Modern Styling:** Clean, responsive CSS with customizable classes
- **Smart Answer Validation:** Case-insensitive text matching with both sides trimmed, strict numeric comparison, native `true`/`false` answers, and array answers for multiple select
- **Comprehensive Results:** Detailed scoring with percentage calculation, completion reason tracking, and an end-of-quiz answer review
- **Quiz Lifecycle:** `reset()` to retake a quiz; `destroy()` restores the original markup so the container can be reinitialized
- **CSP Compatible:** No inline event handlers - works under Content Security Policy (note: question data is rendered as plain text, which also avoids Trusted Types violations)
- **Accessible by Default:** Labels and group semantics for generated inputs, live regions for feedback and results, and focus moved on question changes

## Quick Start

1. **Include the files:**

```html
<!-- Unminified (development) -->
<link rel="stylesheet" href="dist/swq.css">
<script src="dist/swq.js"></script>

<!-- Minified (production) -->
<link rel="stylesheet" href="dist/swq.min.css">
<script src="dist/swq.min.js"></script>
```

2. **Create a minimal quiz:**

```html
<div data-swq-quiz data-swq-feedback-mode="immediate">
    <div data-swq-question-id="q1">
        <p>What is 2 + 2?</p>
        <div data-swq-type="choice" data-swq-answer="4"
             data-swq-options='["2", "3", "4", "5"]'></div>
    </div>
</div>
```

The library automatically initializes on page load and generates all necessary UI elements.

## Installation & Build

### Using CDN (Quickest Start)

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Quiz</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/senangwebs-quiz@1.0.3/dist/swq.min.css">
</head>
<body>
    <div data-swq-quiz data-swq-feedback-mode="immediate" data-swq-timer="120">
        <div data-swq-question-id="q1">
            <p>What is the capital of France?</p>
            <div data-swq-type="text" data-swq-answer="Paris"></div>
        </div>

        <div data-swq-question-id="q2">
            <p>Which planet is known as the Red Planet?</p>
            <div data-swq-type="choice"
                 data-swq-answer="Mars"
                 data-swq-options='["Earth", "Mars", "Jupiter", "Venus"]'></div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/senangwebs-quiz@1.0.3/dist/swq.min.js"></script>
</body>
</html>
```

Pin a concrete version in production pages so deployed pages never receive a
different version without an application release.

**Alternative CDNs:**

```html
<!-- unpkg CDN -->
<link rel="stylesheet" href="https://unpkg.com/senangwebs-quiz@1.0.3/dist/swq.min.css">
<script src="https://unpkg.com/senangwebs-quiz@1.0.3/dist/swq.min.js"></script>
```

### Local Build

```bash
npm install
npm run build
npm test
```

Outputs all four files to `dist/`:
- `swq.js` / `swq.css` -- unminified with source maps (development)
- `swq.min.js` / `swq.min.css` -- minified (production)

## Quiz Configuration

Configure quiz behavior using data attributes on the main container:

| Attribute                | Values                           | Default    | Description                         |
| ------------------------ | -------------------------------- | ---------- | ----------------------------------- |
| `data-swq-quiz`          | --                               | required   | Marks the quiz container            |
| `data-swq-feedback-mode` | `standard`, `immediate`, `retry` | `standard` | When to show feedback               |
| `data-swq-allow-back`    | `true`, `false`                  | `false`    | Enable previous question navigation |
| `data-swq-allow-skip`    | `true`, `false`                  | `false`    | Allow skipping questions            |
| `data-swq-timer`         | number (seconds)                 | `0`        | Quiz time limit (0 = no timer)      |

```html
<div data-swq-quiz
     data-swq-feedback-mode="retry"
     data-swq-allow-back="true"
     data-swq-allow-skip="true"
     data-swq-timer="300">
    <!-- Questions here -->
</div>
```

## Question Types

### 1. Multiple Choice (Single Answer)

```html
<div data-swq-question-id="unique-id">
    <p>Which planet is closest to the Sun?</p>
    <div data-swq-type="choice"
         data-swq-answer="Mercury"
         data-swq-options='["Mercury", "Venus", "Earth", "Mars"]'></div>
</div>
```

### 2. Multiple Select (Multiple Answers)

Answer can be comma-separated or a JSON array:

```html
<div data-swq-question-id="colors">
    <p>Select all primary colors:</p>
    <div data-swq-type="select-multiple"
         data-swq-answer='["Red","Blue","Yellow"]'
         data-swq-options='["Red", "Green", "Blue", "Yellow", "Purple"]'></div>
</div>
```

### 3. True/False

Use `true/false` or the `boolean` alias:

```html
<div data-swq-question-id="boolean">
    <p>JavaScript is a compiled language.</p>
    <div data-swq-type="true/false" data-swq-answer="False"></div>
</div>
```

### 4. Text Input (Case-Insensitive)

```html
<div data-swq-question-id="capital">
    <p>What is the capital of Japan?</p>
    <div data-swq-type="text" data-swq-answer="Tokyo"></div>
</div>
```

### 5. Number Input

```html
<div data-swq-question-id="math">
    <p>What is 12 × 8?</p>
    <div data-swq-type="number" data-swq-answer="96"></div>
</div>
```

## Feedback Modes Explained

### Standard Mode (Default)

- No feedback shown during the quiz
- All results displayed at completion, including a per-question answer review (your answer, correct answer, skipped)
- Questions marked as correct/incorrect at the end

### Drafts and Submitted Answers

Typed or selected answers are kept as drafts when you navigate back, and are
separate from submitted answers until the question is submitted. A skipped
question records no answer.

### Security Boundary

This is a client-side quiz engine: correct answers and scoring state are
visible in the browser. That is fine for casual learning and self-assessment.
If results determine certificates, payments, access, or authoritative exam
outcomes, deliver questions, enforce deadlines, and grade on a server; never
trust a client-reported score.

### Immediate Mode

- Feedback shown after each answer submission
- The primary button becomes **Continue**; the next question appears only after it is clicked
- Inputs disabled after answering

### Retry Mode

- Feedback shown immediately
- Incorrect answers can be retried
- Must get correct answer to proceed

## Custom UI Elements

SWQ generates each missing control independently, so any subset of custom
controls keeps a completion path:

- If `Next` is missing, it is always generated.
- If `Previous` is missing and `data-swq-allow-back` is set, it is generated.
- If `Skip` is missing and `data-swq-allow-skip` is set, it is generated.
- A custom Check Answer button checks the current answer without advancing.

```html
<div data-swq-quiz>
    <!-- Custom timer display -->
    <div data-swq-timer class="my-timer">5:00</div>

    <!-- Questions here -->

    <!-- Custom controls -->
    <button type="button" data-swq-previous>Back</button>
    <button type="button" data-swq-check-answer>Submit</button>
    <button type="button" data-swq-skip-question>Skip</button>
    <button type="button" data-swq-next>Next</button>

    <!-- Custom results container (hidden by default via .swq-hidden) -->
    <div data-swq-results class="my-results"></div>
</div>
```

Generated controls use `type="button"`, so a quiz can be embedded inside a
form without navigation clicks submitting the form. Use the same type for
custom controls.

## JavaScript API

### Programmatic Initialization

```javascript
// Basic initialization (auto-finds [data-swq-quiz] elements)
// Returns array of newly created instances (elements already initialized are skipped)
var quizzes = SWQ.init('[data-swq-quiz]');

// With custom options; callbacks must be nested under settings
var quiz = SWQ.init('#my-quiz', {
    settings: {
        feedbackMode: 'immediate',
        allowBack: true,
        timer: 180,
        onStart: function() {
            console.log('Quiz started!');
        },
        onQuestionChange: function(question, index) {
            console.log('Question ' + (index + 1) + ': ' + question.text);
        },
        onComplete: function(results) {
            console.log('Score: ' + results.score + '/' + results.total + ' (' + results.percentage + '%)');
        }
    }
})[0];
```

### Programmatic Questions

```javascript
var quiz = SWQ.init('#container', {
    questions: [
        {
            id: 'q1',        // required, must be unique
            text: 'What is 2+2?', // required, rendered as plain text (no HTML)
            type: 'choice',  // choice | select-multiple | true/false | boolean | text | number
            answer: '4',
            options: ['2', '3', '4', '5']
        },
        {
            id: 'q2',
            text: 'Enter your name:',
            type: 'text',
            answer: 'Expected Answer'
        },
        {
            id: 'q3',
            text: 'Select all capitals:',
            type: 'select-multiple',
            answer: ['Paris', 'Tokyo'],   // arrays are preserved (commas inside options are safe)
            options: ['Paris', 'Tokyo', 'London']
        },
        {
            id: 'q4',
            text: 'The sky is blue.',
            type: 'boolean',
            answer: true                  // native booleans are accepted
        },
        {
            id: 'q5',
            text: 'How many?',
            type: 'number',
            answer: 0                     // zero is a valid answer
        }
    ]
})[0];
```

Invalid questions (missing id/text/type/answer, unknown type, duplicate ids)
are skipped with a console warning; a quiz with no valid questions shows an
error message instead of failing.

### Instance Methods

```javascript
// Access a quiz instance
var quiz = document.querySelector('#my-quiz').swq;

// Reset and retake the quiz
quiz.reset();

// Clean up: remove listeners, clear timer, and restore the original markup.
// The container can then be reinitialized with SWQ.init().
quiz.destroy();
```

### Event Callbacks

| Callback           | Parameters          | Description                  |
| ------------------ | ------------------- | ---------------------------- |
| `onStart`          | --                  | Called when quiz begins      |
| `onQuestionChange` | `question`, `index` | Called when question changes |
| `onComplete`       | `results`           | Called when quiz ends        |

Results object structure:

```javascript
{
    score: 8,           // Number of correct answers
    total: 10,          // Total questions
    percentage: 80,     // Score percentage
    reason: 'completed' // 'completed' or 'time_up'
}
```

## Styling & Customization

### Key CSS Classes

| Class                    | Description                        |
| ------------------------ | ---------------------------------- |
| `.swq-quiz-container`    | Optional container for scoped styling |
| `.swq-question`          | Individual question container      |
| `.swq-question-text`     | Question text styling              |
| `.swq-options-container` | Container for answer options       |
| `.swq-option`            | Individual option (radio/checkbox) |
| `.swq-input`             | Text/number input fields           |
| `.swq-feedback`          | Feedback message area              |
| `.swq-correct`           | Applied to correct answers         |
| `.swq-incorrect`         | Applied to incorrect answers       |
| `.swq-active`            | Currently visible question         |
| `.swq-hidden`            | Hides an element (`display: none`) |
| `.swq-controls-default`  | Default button container           |
| `.swq-results-default`   | Default results display            |
| `.swq-result-summary`    | Results summary card               |

### Custom Styling Example

```css
.swq-question {
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 20px;
}

.swq-option:hover {
    background-color: #f7fafc;
    border-color: #4299e1;
}

.swq-correct {
    border-color: #48bb78;
    background-color: #f0fff4;
}

.swq-incorrect {
    border-color: #f56565;
    background-color: #fff5f5;
}
```

## Answer Validation Logic

| Type            | Validation                                              |
| --------------- | ------------------------------------------------------- |
| **choice**      | Exact string match on selected value                    |
| **true/false**  | Case-insensitive match (`"True"`, `"true"`, `true`, `1` are equivalent) |
| **boolean**     | Alias for `true/false`; native booleans accepted        |
| **select-multiple** | Order-independent comparison; answers may be a JSON array, a native array, or comma-separated; both sides are trimmed |
| **text**        | Case-insensitive match; whitespace trimmed on **both** the submitted and expected answers |
| **number**      | Strict numeric comparison (`"10"` = `"10.0"` = `10`; malformed values such as `"10abc"` never match); `0` is a valid answer |

Unanswered questions can never be marked correct.

## Examples

Check the `examples/` directory for complete implementations:

| File | Mode | Features Showcased |
| ---- | ---- | ------------------ |
| `minimal.html` | Retry + Timer | Bare-minimum setup, auto-generated UI |
| `custom-ui.html` | Retry | All question types, Tailwind CSS, custom buttons |
| `timed-quiz.html` | Standard + Timer | Countdown pressure, skip allowed, Malaysia trivia |
| `js-api.html` | Immediate | Full JavaScript API, event callbacks, live event log, `boolean` type, JSON array answers |
| `education-quiz.html` | Standard + Timer | Exam simulation (no back/skip), SPM Sejarah questions |
| `food-culture.html` | Retry + Back + Skip | `reset()` &amp; `destroy()` demo, `boolean` type, custom styled |

## Browser Support

| Browser | Support |
| ------- | ------- |
| Chrome / Edge | Last 2 major versions |
| Firefox | Last 2 major versions |
| Safari | Last 2 major versions (macOS and iOS) |

The bundle is not transpiled to ES5; if you need to support legacy browsers,
add your own transpilation pipeline. Build tooling requires Node.js 18 or
newer (`engines` field in `package.json`).

For TypeScript consumers, type declarations are shipped at `types/swq.d.ts`:

```typescript
import SWQ = require('senangwebs-quiz');

const quiz = SWQ.init('#my-quiz', {
    questions: [{ id: 'q1', text: '2 + 2?', type: 'choice', answer: '4', options: ['3', '4'] }],
    settings: { feedbackMode: 'immediate' }
})[0];
```

The library is browser-only: importing the npm entry in Node/SSR without a DOM
will not auto-initialize (the DOM reference is guarded), but `SWQ.init` requires
a real `document`. Treat browser usage as the supported contract.

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
