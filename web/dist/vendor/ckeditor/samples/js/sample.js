CKEDITOR.env.ie&&CKEDITOR.env.version<9&&CKEDITOR.tools.enableHtml5Elements(document),CKEDITOR.config.height=150,CKEDITOR.config.width="auto";var initSample=function(){var e="%REV%"==CKEDITOR.revision||!!CKEDITOR.plugins.get("wysiwygarea"),t=!!CKEDITOR.plugins.get("bbcode");return function(){var n=CKEDITOR.document.getById("editor");t&&n.setHtml("Hello world!\n\nI'm an instance of [url=https://ckeditor.com]CKEditor[/url]."),e?CKEDITOR.replace("editor"):(n.setAttribute("contenteditable","true"),CKEDITOR.inline("editor"))}}();