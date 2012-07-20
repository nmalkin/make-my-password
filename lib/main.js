var clipboard = require('clipboard');
var contextMenu = require('context-menu');
var preferences = require('simple-prefs');
var self = require('self');
var timers = require('timers');

/**
 * Copies given contents to clipboard; then restores current clipboard contents
 * after the amount of time specified in the preferences.
 */
function setClipboardContents(contents) {
    var currentClipboardContents = clipboard.get();

    clipboard.set(contents);

    timers.setTimeout(function() {
        clipboard.set(currentClipboardContents);
    }, preferences.prefs.copyDuration * 1000);
}

function newPassword(password) {
    setClipboardContents(password);
}

var menuItem = contextMenu.Item({
    label: "Create Password",
    context: contextMenu.SelectorContext('input[type="password"]'),
    contentScriptFile: self.data.url('menu_action.js'),
    onMessage: newPassword
});
