window.onload = function () {
    var converter = new showdown.Converter();
    var textArea = this.document.getElementById('textArea');
    var markdownArea = this.document.getElementById('markdown');

    var previousMarkdownValue;

    // Make Tab key act normally and not kill focus
    textArea.addEventListener('keydown', funcion(e) {
        // Tab was pressed
        if (e.keyCode === 9) {
            var start = this.selectionStart;
            var end = this.selectionEnd;

            var target = e.target;
            var value = target.value;

            // Set to text before caret + tab + text after
            target.value = value.substring(0, start) + "\t" + value.substring(end);

            this.selectionStart = this.selectionEnd = start + 1;

            // Prevent focus loss
            e.preventDefault();
        }
    });

    // Convert text area's contents to html to be previewed for the user
    var textToMarkdown = function() {
        var markdownText = textArea.value;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };

    // Returns true if the text area has changed
    var changeOccurred = function() {
        if (previousMarkdownValue != textArea.value) {
            return true;
        }
        return false;
    }

    this.setInterval(function() {
        if (changeOccurred()) {
            textToMarkdown();
        }
    }, 1000);

    // Convert text area on input change
    textArea.addEventListener('input', textToMarkdown);
    
    // ignore on home page
    if (document.location.pathname.length > 1) {
        var documentName = document.location.pathname.substring(1);
        // Open sharejs connection to keep everyone's text area in sync
        sharejs.open(documentName, 'text', function(error, doc) {
            doc.attach_textarea(textArea);
            textToMarkdown();
        });
    }

    // Convert text area on page load
    textToMarkdown();

};