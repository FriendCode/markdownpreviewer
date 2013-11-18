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

    var FileMarkdownView = FilesBaseView.extend({
        className: "addon-files-markdownpreviewer",
        templateLoader: "addon.markdownpreviewer.templates",
        template: "markdown.html",
        events: {},

        // Constructor
        initialize: function() {
            FileMarkdownView.__super__.initialize.apply(this, arguments);
            this.converter = new Showdown.converter({ extensions: ['github', 'table'] });
            return this;
        },

        // Finish Rendering
        finish: function() {
            var that = this;
            this.model.getCache().then(function(content) {
                that.$(".markdown-body").html(that.converter.makeHtml(content));
            });
            
            return FileMarkdownView.__super__.finish.apply(this, arguments);
        },
    });

    return FileMarkdownView;
});