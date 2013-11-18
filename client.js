define([
    "views/markdown"
], function(FileMarkdownView) {
    var _ = codebox.require("underscore");
    var files = codebox.require("core/files");

    var imageExts = [
        ".md"
    ];

    files.addHandler("markdownviewer", {
        name: "Markdown Viewer",
        View: FileMarkdownView,
        valid: function(file) {
            return (!file.isDirectory() && _.contains(imageExts, file.extension()));
        }
    });
});