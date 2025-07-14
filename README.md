# SenangWebs Jot (SWJ)

Lightweight JavaScript tool that lets you copy text from HTML elements with a single click.

## Features

- **Simple Integration:** Add a few data attributes to your HTML, and SWJ handles the rest.
- **Flexible Source Elements:** Copy text from `<textarea>`, `<input>`, `<div>`, `<span>`, `<p>`, `<code>`, and more.
- **User Feedback:** Buttons provide clear visual feedback for "Copy", "Copied!", and "Failed!" states using Tailwind CSS.
- **Modern & Fallback Copy:** Uses `navigator.clipboard.writeText()` with a fallback to `document.execCommand('copy')`.
- **Error Handling:** Gracefully handles missing targets or unsupported browser features, logging warnings to the console.
- Efficient performance and automatic initialization on `DOMContentLoaded`.
- Global configuration options for button text and styling.
- Responsive and works on all modern browsers.

## Examples / Demo

After running `npm run build` or `npm run dev`, an `index.html` file will be generated in the `dist/` directory. Open this `dist/index.html` in your browser to see SenangWebs Jot in action. This demo is based on the `examples/index.html` source file and showcases various use cases.

## Installation

SenangWebs Jot is built using Webpack. The library's core files are located in the `src/` directory, and the distributable, production-ready files are generated in the `dist/` directory.

### Using npm (Recommended for Development)

1.  **Clone the Repository** (if you haven't already):
    ```bash
    git clone <repository-url> # Replace <repository-url> with the actual URL
    cd senangwebs-jot
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
    This will generate `swj.js`, `swj.css` (for production) or `swj.js`, `swj.css` (for development) in the `dist/` folder.

### Using Pre-built Distributable Files (CDN-like or Direct Include)

1.  **Include the CSS**:
    Link the `swj.css` (or `swj.css` for development) file in the `<head>` of your HTML:
    ```html
    <!-- If using local dist files -->
    <link rel="stylesheet" href="path/to/dist/swj.css">

    <!-- Or if using a CDN (replace with actual CDN link if available) -->
    <link rel="stylesheet" href="https://unpkg.com/senangwebs-jot@latest/dist/swj.css">
    ```

2.  **Include the JavaScript**:
    Add the `swj.js` (or `swj.js` for development) script to your HTML file, preferably at the end of the `<body>` tag:
    ```html
    <!-- If using local dist files -->
    <script src="path/to/dist/swj.js"></script>

    <!-- Or if using a CDN (replace with actual CDN link if available) -->
    <script src="https://unpkg.com/senangwebs-jot@latest/dist/swj.js"></script>
    ```
    The library initializes itself automatically on `DOMContentLoaded`.

## Usage

1.  Ensure the SWJ CSS and JavaScript files are included in your HTML as described in the Installation section.

2.  The library initializes automatically. No manual initialization call is needed for basic functionality.

3.  Add data attributes to the HTML elements:
    *   `data-swj-id="your-unique-id"`: Add this to the HTML element whose content you want to copy (e.g., a `<div>`, `<p>`, `<textarea>`, `<code>`).
    *   `data-swj-value`: This attribute **must** be present on the source element. For `<input>` and `<textarea>` elements, their `.value` will be copied. For other elements, their `.textContent` will be copied.
    *   `data-swj-copy="your-unique-id"`: Add this to the button element that will trigger the copy action. The value of this attribute must match the `data-swj-id` of the source element.

4.  Example:
    ```html
    <!-- Source Element: A textarea -->
    <textarea data-swj-id="mySecretCode" data-swj-value>console.log('Hello from SWJ!');</textarea>

    <!-- Copy Button: Linked to the textarea above -->
    <button type="button" data-swj-copy="mySecretCode">Copy Code Snippet</button>


    <!-- Source Element: A div -->
    <div data-swj-id="shareableLink" data-swj-value>https://mysite.com/awesome-page</div>

    <!-- Copy Button: Linked to the div above -->
    <button type="button" data-swj-copy="shareableLink">Copy Link</button>
    ```

### Button Styling and Text

The library uses CSS classes defined in `src/swj.css` (and bundled into `dist/swj.css` or `dist/swj.css`) to style the copy buttons according to their state. These classes are:

-   **Base Button Class**: `swj-button`
-   **Default State**: `swj-button-default`
    -   Text: "Copy" (or the button's original text if `data-swj-original-text` is set).
-   **Copied State** (shown for 2.5 seconds): `swj-button-copied`
    -   Text: "Copied!"
-   **Error State** (shown for 2.5 seconds): `swj-button-error`
    -   Text: "No ID", "No Src", "Empty", or "Failed!" depending on the error.

The default styling provides a look similar to Tailwind CSS buttons. You can customize these styles by modifying `src/swj.css` and rebuilding the library, or by overriding these classes in your own stylesheet.

The attribute `data-swj-original-text` can be pre-set on a button if you want its default text to be something other than "Copy". If not set, the library will use the button's existing text content as the original text.

## Browser Support

SenangWebs Jot works on all modern browsers.

-   **Clipboard API Access:** The `navigator.clipboard.writeText()` API requires a secure context (HTTPS) in many browsers, or it might require user permission. When testing locally via `file://` protocol, it might not work as expected in some browsers due to security restrictions. The fallback `document.execCommand('copy')` is less secure and has some limitations but is provided for broader compatibility.
-   **Styling:** The default styling is provided by Tailwind CSS utility classes. If you are not using Tailwind CSS or want to customize the appearance, you will need to modify the class names directly in the `swj.js` file within the `setDefaultButtonState`, `setCopiedButtonState`, and `setErrorButtonState` methods.
-   **DOM Readiness:** SWJ initializes on the `DOMContentLoaded` event. Ensure your elements with `data-swj-*` attributes are present in the DOM when this event fires.

For older browsers, ensure they support the necessary Clipboard APIs or that the fallback mechanism is sufficient for your needs.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. <!-- (Create a LICENSE.md file if it doesn't exist and this is the correct license) -->

## Acknowledgments

- Inspired by the need for a simple, effective copy-to-clipboard solution.
- Thanks to all contributors who have helped to improve this library.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.