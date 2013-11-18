define([
    "showdown",
    "extensions/github",
    "extensions/table",
    "less!stylesheets/markdown.less"
], function(Showdown) {
    var _ = codebox.require("underscore");
    var $ = codebox.require("jQuery");
    var hr = codebox.require("hr/hr");
    var Dialogs = codebox.require("utils/dialogs");
    var FilesBaseView = codebox.require("views/files/base");
    var FileSync = codebox.require("utils/filesync");

    var FileMarkdownView = FilesBaseView.extend({
        className: "addon-files-markdownpreviewer",
        templateLoader: "addon.markdownpreviewer.templates",
        template: "markdown.html",
        events: {},

        // Constructor
        initialize: function() {
            FileMarkdownView.__super__.initialize.apply(this, arguments);

            // base content
            this.content = "";

            // Showdown client
            this.converter = new Showdown.converter({ extensions: ['github', 'table'] });

            // Create sync
            this.sync = new FileSync();
            this.sync.on("content", _.debounce(function(content, oldcontent, patches) {
                this.updateContent(content);
            }, 800), this);

            // Active sync
            this.sync.setFile(this.model);

            return this;
        },

        // Update markdown content
        updateContent: function(content) {
            this.content = content || this.content;
            this.$(".markdown-body").html(this.converter.makeHtml(this.content));
        },

        // Finish Rendering
        finish: function() {
            this.updateContent();
            return FileMarkdownView.__super__.finish.apply(this, arguments);
        },
    });

    return FileMarkdownView;
});