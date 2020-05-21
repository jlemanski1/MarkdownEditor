window.onload = function () {
    var converter = new showdown.Converter();
    var textArea = this.document.getElementById('textArea');
    var markdownArea = this.document.getElementById('markdown');

    // Convert text area's contents to html to be previewed for the user
    var textToMarkdown = function() {
        var markdownText = textArea.value;
        html = converter.makeHtml(markdownText);
        markdownArea.innerHTML = html;
    };

    textArea.addEventListener('input', textToMarkdown);
    textToMarkdown();
}