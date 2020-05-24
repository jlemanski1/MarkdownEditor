window.onload = function () {
    var converter = new showdown.Converter();
    var textArea = this.document.getElementById('textArea');
    var markdownArea = this.document.getElementById('markdown');

    var previousMarkdownValue;

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
    textToMarkdown();

};