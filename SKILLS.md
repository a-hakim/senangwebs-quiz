---
name: senangwebs-quiz
description: Interactive quizzes with 5 question types, 3 feedback modes, timers, navigation, and auto-generated UI from data attributes.
version: 1.0.2
package: senangwebs-quiz
---

# SenangWebs Quiz (SWQ)

## Quick Reference

- **Purpose**: Declarative quiz engine with multiple question types and feedback modes
- **Entry**: `dist/swq.min.js`
- **Dependencies**: none
- **Scripts**: `npm run test`, `npm run build`, `npm run dev`

## Workflow

Start in `C:\wamp64\www\sw-libraries\senangwebs-quiz`. Read `README.md`, `package.json`, and touched source files. Match existing patterns, CSS prefix `swq-`.

## HTML Data Attributes

### Quiz container
| Attribute | Values |
|---|---|
| `data-swq-quiz` | flag (required) |
| `data-swq-feedback-mode` | `"standard"` (at end), `"immediate"` (after each), `"retry"` (until correct) |
| `data-swq-allow-back` | `true` / `false` |
| `data-swq-allow-skip` | `true` / `false` |
| `data-swq-timer` | seconds (optional countdown) |

### Question
| Attribute | Values |
|---|---|
| `data-swq-question-id` | unique identifier |
| `data-swq-type` | `"choice"`, `"select-multiple"`, `"true/false"` / `"boolean"`, `"text"`, `"number"` |
| `data-swq-answer` | correct answer |
| `data-swq-options` | JSON array of options (for choice/select-multiple) |

## JavaScript API

```js
const quizzes = SWQ.init('[data-swq-quiz]', options)
const quiz = quizzes[0]
quiz.reset()             // restart quiz
quiz.destroy()           // cleanup
```

### Callbacks
`onStart`, `onQuestionChange`, `onComplete`

## Focus Areas

- 5 question types: choice (single select), multiple select, true/false, text input, number input
- 3 feedback modes: standard (score at end), immediate (correct/incorrect after each), retry (must answer correctly to proceed)
- Auto-generated UI from data attributes (CSP compatible — no inline handlers)
- Optional countdown timer per quiz
- Back/skip navigation with configurable permissions
- Scoring calculation per feedback mode
- CSS classes: `swq-question`, `swq-option`, `swq-correct`, `swq-incorrect`

## Implementation Guidance

- Preserve backward compatibility for all attributes and CSS classes
- CSP safety: use `addEventListener`, never inline `onclick`
- Form safety: generated buttons must use `type="button"`
- Validate data attributes at init: warn on missing required fields
- Test all 5 question types with each feedback mode combination
- Timer behavior: pause on question change? continue? per-quiz or per-question?

## Validation

```bash
npm run build
npm test        # build + Node regression tests
npm run dev     # for browser verification
```
