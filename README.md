# SenangWebs Quiz (SWQ)

Lightweight JavaScript library that lets you create interactive quizzes with various question types and feedback modes.

## Features

- **Simple Integration:** Add a few data attributes to your HTML, and SWQ handles the rest.
- **Multiple Question Types:** Support for multiple choice, multiple select, true/false, text input, and number input questions.
- **Flexible Feedback Modes:** Choose from standard (feedback at end), immediate (feedback after each question), or retry (allow corrections) modes.
- **Built-in Timer:** Optional countdown timer with automatic quiz completion when time expires.
- **Navigation Controls:** Allow users to go back to previous questions and skip questions (configurable).
- **Automatic UI Generation:** Generates question interfaces automatically or works with custom HTML structures.
- **Modern Styling:** Clean, responsive design with Tailwind CSS-compatible classes.
- Efficient performance and automatic initialization on `DOMContentLoaded`.
- Comprehensive scoring and results display.
- Works on all modern browsers.

## Examples / Demo

After running `npm run build` or `npm run dev`, you can open the example files in the `examples/` directory to see SenangWebs Quiz in action:

- [`examples/custom-ui.html`](examples/custom-ui.html) - Complete demo showcasing all question types and features
- [`examples/minimal.html`](examples/minimal.html) - Basic implementation with automatic UI generation

## Installation

SenangWebs Quiz is built using Webpack. The library's core files are located in the `src/` directory, and the distributable, production-ready files are generated in the `dist/` directory.

### Using npm (Recommended for Development)

1.  **Clone the Repository** (if you haven't already):
    ```bash
    git clone <repository-url> # Replace <repository-url> with the actual URL
    cd senangwebs-quiz
    ```

2.  **Install Dependencies**:
    Make sure you have Node.js and npm installed. Then, install the project dependencies:
    ```bash
    npm install
    ```

3.  **Build the Library**:
    *   For a production build (minified JS and CSS):
        ```bash
        npm run build
        ```
    *   For a development build (with source maps and unminified files) and to watch for changes:
        ```bash
        npm run dev
        ```
    This will generate `swq.js` and `swq.css` in the `dist/` folder.

### Using Pre-built Distributable Files (CDN-like or Direct Include)

1.  **Include the CSS**:
    Link the `swq.css` file in the `<head>` of your HTML:
    ```html
    <!-- If using local dist files -->
    <link rel="stylesheet" href="path/to/dist/swq.css">

    <!-- Or if using a CDN (replace with actual CDN link if available) -->
    <link rel="stylesheet" href="https://unpkg.com/senangwebs-quiz@latest/dist/swq.css">
    ```

2.  **Include the JavaScript**:
    Add the `swq.js` script to your HTML file, preferably at the end of the `<body>` tag:
    ```html
    <!-- If using local dist files -->
    <script src="path/to/dist/swq.js"></script>

    <!-- Or if using a CDN (replace with actual CDN link if available) -->
    <script src="https://unpkg.com/senangwebs-quiz@latest/dist/swq.js"></script>
    ```
    The library initializes itself automatically on `DOMContentLoaded`.

## Usage

### Basic Setup

1.  Ensure the SWQ CSS and JavaScript files are included in your HTML as described in the Installation section.

2.  Create a quiz container with the `data-swq-quiz` attribute and configure it with optional settings:

```html
<div 
    data-swq-quiz
    data-swq-feedback-mode="immediate"
    data-swq-allow-back="true"
    data-swq-allow-skip="true"
    data-swq-timer="300">
    
    <!-- Questions go here -->
    
</div>
```

### Quiz Configuration Options

Configure your quiz behavior using data attributes on the quiz container:

- `data-swq-feedback-mode`: 
  - `"standard"` - Show feedback only at the end (default)
  - `"immediate"` - Show feedback after each question
  - `"retry"` - Allow users to retry incorrect answers
- `data-swq-allow-back="true"` - Enable previous question navigation
- `data-swq-allow-skip="true"` - Allow users to skip questions
- `data-swq-timer="300"` - Set timer in seconds (0 = no timer)

### Question Types

#### 1. Multiple Choice
```html
<div data-swq-question-id="q1">
    <p>Which planet is known as the Red Planet?</p>
    <div 
        data-swq-type="choice"
        data-swq-answer="Mars"
        data-swq-options='["Earth", "Mars", "Jupiter", "Venus"]'>
    </div>
</div>
```

#### 2. Multiple Select
```html
<div data-swq-question-id="q2">
    <p>Select all programming languages:</p>
    <div 
        data-swq-type="select-multiple"
        data-swq-answer="JavaScript,Python,Java"
        data-swq-options='["JavaScript", "HTML", "Python", "CSS", "Java"]'>
    </div>
</div>
```

#### 3. True/False
```html
<div data-swq-question-id="q3">
    <p>The chemical symbol for water is H2O.</p>
    <div data-swq-type="true/false" data-swq-answer="True"></div>
</div>
```

#### 4. Text Input
```html
<div data-swq-question-id="q4">
    <p>What is the capital of France?</p>
    <div data-swq-type="text" data-swq-answer="Paris"></div>
</div>
```

#### 5. Number Input
```html
<div data-swq-question-id="q5">
    <p>How many sides does a hexagon have?</p>
    <div data-swq-type="number" data-swq-answer="6"></div>
</div>
```

### Custom Control Buttons

You can add custom control buttons for enhanced user interaction:

```html
<!-- Custom control buttons -->
<button data-swq-check-answer>Submit Answer</button>
<button data-swq-skip-question>Skip Question</button>
<button data-swq-previous>Previous</button>
<button data-swq-next>Next</button>

<!-- Timer display -->
<div data-swq-timer>5:00</div>

<!-- Results container -->
<div data-swq-results></div>
```

### Complete Example

```html
<!DOCTYPE html>
<html>
<head>
    <title>My Quiz</title>
    <link rel="stylesheet" href="path/to/dist/swq.css">
</head>
<body>
    <div 
        data-swq-quiz
        data-swq-feedback-mode="immediate"
        data-swq-timer="180">
        
        <div data-swq-question-id="q1">
            <p>1. What is 2 + 2?</p>
            <div 
                data-swq-type="choice"
                data-swq-answer="4"
                data-swq-options='["2", "3", "4", "5"]'>
            </div>
        </div>
        
        <div data-swq-question-id="q2">
            <p>2. Is JavaScript a programming language?</p>
            <div data-swq-type="true/false" data-swq-answer="True"></div>
        </div>
        
        <!-- Timer and results will be auto-generated -->
        
    </div>
    
    <script src="path/to/dist/swq.js"></script>
</body>
</html>
```

## Styling and Customization

The library uses CSS classes defined in [`src/css/swq.css`](src/css/swq.css) for styling. Key classes include:

- **Quiz Container**: `.swq-quiz-container`
- **Questions**: `.swq-question`, `.swq-question-text`
- **Options**: `.swq-option`, `.swq-options-container`
- **Inputs**: `.swq-input`
- **Feedback**: `.swq-feedback`, `.swq-correct`, `.swq-incorrect`
- **Controls**: `[data-swq-next]`, `[data-swq-previous]`, `[data-swq-check-answer]`
- **Results**: `.swq-results-default`, `.swq-result-summary`

You can customize the appearance by overriding these classes in your own CSS or by modifying the source files and rebuilding.

## API and Events

### Programmatic Usage

```javascript
// Initialize quiz manually
const quiz = SWQ.init('#my-quiz', {
    settings: {
        feedbackMode: 'retry',
        allowBack: true,
        timer: 300
    }
});

// Or pass questions directly
const quiz = SWQ.init('#my-quiz', {
    questions: [
        {
            id: 'q1',
            text: 'What is 2+2?',
            type: 'choice',
            answer: '4',
            options: ['2', '3', '4', '5']
        }
    ]
});
```

### Callback Events

```javascript
SWQ.init('#my-quiz', {
    settings: {
        onStart: function() {
            console.log('Quiz started!');
        },
        onQuestionChange: function(question, index) {
            console.log('Question changed:', question.text);
        },
        onComplete: function(results) {
            console.log('Quiz completed:', results);
            // results = { score, total, percentage, reason }
        }
    }
});
```

## Browser Support

SenangWebs Quiz works on all modern browsers that support:

- ES6 classes and arrow functions
- `dataset` API for data attributes
- `addEventListener` and modern DOM methods
- CSS Flexbox for layout

The library automatically handles:
- **Question Generation**: Creates appropriate input elements based on question type
- **Answer Validation**: Handles different answer formats (single choice, multiple select, text comparison)
- **State Management**: Tracks user progress and answers
- **Timer Management**: Automatic countdown with quiz completion
- **Results Calculation**: Score computation and display

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Inspired by the need for a simple, effective quiz creation solution.
- Built with modern web standards for maximum compatibility.
- Thanks to all contributors who have helped to improve this library.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.