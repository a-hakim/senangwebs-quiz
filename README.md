# SenangWebs Quiz (SWQ)

A lightweight, flexible JavaScript library for creating interactive quizzes with multiple question types, configurable feedback modes, and built-in UI generation.

## Features

- **Zero Dependencies:** Pure JavaScript implementation with no external dependencies
- **Multiple Question Types:** Choice (single select), multiple select, true/false, text input, and number input
- **Three Feedback Modes:** 
  - **Standard** - Show all feedback at quiz completion
  - **Immediate** - Show feedback after each question with automatic progression
  - **Retry** - Allow users to retry incorrect answers until they get them right
- **Built-in Timer:** Optional countdown timer with automatic quiz termination
- **Navigation Controls:** Configurable back/previous navigation and question skipping
- **Automatic UI Generation:** Creates complete question interfaces from simple data attributes
- **Fallback Controls:** Automatically generates navigation buttons, timer display, and results container when not provided
- **Flexible Integration:** Works with existing HTML structures or generates everything automatically
- **Modern Styling:** Clean, responsive CSS with customizable classes
- **Smart Answer Validation:** Case-insensitive text matching, exact numeric comparison, and flexible multiple choice handling
- **Comprehensive Results:** Detailed scoring with percentage calculation and completion reason tracking

## Quick Start

1. **Include the files:**
```html
<link rel="stylesheet" href="dist/swq.css">
<script src="dist/swq.js"></script>
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

### Development Setup

```bash
# Clone and install dependencies
git clone <repository-url>
cd senangwebs-quiz
npm install

# Development build with watch mode
npm run dev

# Production build (minified)
npm run build
```

This generates `swq.js` and `swq.css` in the `dist/` directory.

### Direct Usage

Include the built files in your HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="path/to/dist/swq.css">
</head>
<body>
    <!-- Your quiz HTML here -->
    <script src="path/to/dist/swq.js"></script>
</body>
</html>
```

## Quiz Configuration

Configure quiz behavior using data attributes on the main container:

| Attribute | Values | Default | Description |
|-----------|--------|---------|-------------|
| `data-swq-quiz` | - | required | Marks the quiz container |
| `data-swq-feedback-mode` | `standard`, `immediate`, `retry` | `standard` | When to show feedback |
| `data-swq-allow-back` | `true`, `false` | `false` | Enable previous question navigation |
| `data-swq-allow-skip` | `true`, `false` | `false` | Allow skipping questions |
| `data-swq-timer` | number (seconds) | `0` | Quiz time limit (0 = no timer) |

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
```html
<div data-swq-question-id="colors">
    <p>Select all primary colors:</p>
    <div data-swq-type="select-multiple" 
         data-swq-answer="Red,Blue,Yellow"
         data-swq-options='["Red", "Green", "Blue", "Yellow", "Purple"]'></div>
</div>
```

### 3. True/False
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
- No feedback shown during quiz
- All results displayed at completion
- Questions marked as correct/incorrect at the end

### Immediate Mode
- Feedback shown after each answer submission
- Automatic progression to next question
- Inputs disabled after answering

### Retry Mode
- Feedback shown immediately
- Incorrect answers can be retried
- Must get correct answer to proceed

## Custom UI Elements

SWQ automatically generates missing UI elements, but you can provide custom ones:

```html
<div data-swq-quiz>
    <!-- Custom timer display -->
    <div data-swq-timer class="my-timer">5:00</div>
    
    <!-- Questions here -->
    
    <!-- Custom controls -->
    <button data-swq-previous>← Back</button>
    <button data-swq-check-answer>Submit</button>
    <button data-swq-skip-question>Skip</button>
    <button data-swq-next>Next →</button>
    
    <!-- Custom results container -->
    <div data-swq-results class="my-results"></div>
</div>
```

## JavaScript API

### Programmatic Initialization

```javascript
// Basic initialization (auto-finds [data-swq-quiz] elements)
const quizzes = SWQ.init('[data-swq-quiz]');

// With custom options
const quiz = SWQ.init('#my-quiz', {
    settings: {
        feedbackMode: 'immediate',
        allowBack: true,
        timer: 180,
        onStart: function() {
            console.log('Quiz started!');
        },
        onQuestionChange: function(question, index) {
            console.log(`Question ${index + 1}: ${question.text}`);
        },
        onComplete: function(results) {
            console.log(`Score: ${results.score}/${results.total} (${results.percentage}%)`);
        }
    }
});

// Pass questions programmatically
const quiz = SWQ.init('#container', {
    questions: [
        {
            id: 'q1',
            text: 'What is 2+2?',
            type: 'choice',
            answer: '4',
            options: ['2', '3', '4', '5']
        },
        {
            id: 'q2', 
            text: 'Enter your name:',
            type: 'text',
            answer: 'Expected Answer'
        }
    ]
});
```

### Event Callbacks

| Callback | Parameters | Description |
|----------|------------|-------------|
| `onStart` | - | Called when quiz begins |
| `onQuestionChange` | `question`, `index` | Called when question changes |
| `onComplete` | `results` | Called when quiz ends |

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

| Class | Description |
|-------|-------------|
| `.swq-question` | Individual question container |
| `.swq-question-text` | Question text styling |
| `.swq-options-container` | Container for answer options |
| `.swq-option` | Individual option (radio/checkbox) |
| `.swq-input` | Text/number input fields |
| `.swq-feedback` | Feedback message area |
| `.swq-correct` | Applied to correct answers |
| `.swq-incorrect` | Applied to incorrect answers |
| `.swq-controls-default` | Default button container |
| `.swq-results-default` | Default results display |

### Custom Styling Example

```css
/* Override default styles */
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

## Examples

Check the `examples/` directory for complete implementations:

- **`examples/minimal.html`** - Basic quiz with automatic UI generation
- **`examples/custom-ui.html`** - Advanced quiz with custom styling and all question types

## Browser Support

Works in all modern browsers supporting:
- ES6 Classes and Arrow Functions
- Dataset API for data attributes  
- Modern DOM methods (`querySelector`, `addEventListener`)
- CSS Flexbox

## Advanced Features

### Answer Validation Logic
- **Text answers:** Case-insensitive matching with whitespace trimming
- **Multiple select:** Order-independent array comparison
- **Numbers:** Exact numeric matching
- **Choice/True-False:** String comparison

### State Management
- Tracks user answers with correctness status
- Maintains current question index
- Handles timer state and progression
- Preserves answers when navigating between questions

### Automatic UI Generation
- Creates appropriate input elements based on question type
- Generates default navigation buttons when not provided
- Automatically creates timer display and results container
- Handles responsive layout and accessibility

## License

MIT License - see LICENSE file for details.

## Contributing

Contributions welcome! Please ensure any changes maintain backward compatibility and include