var clipboard = require('clipboard');
var contextMenu = require('context-menu');
var self = require('self');

var lastPassword = null;

function newPassword(password) {
    // Remember this as the last generated password.
    lastPassword = password;

    // Copy the new password to the clipboard.
    clipboard.set(password);
}


var menuItem = contextMenu.Item({
    label: "Create Password",
    context: contextMenu.SelectorContext('input[type="password"]'),
    contentScriptFile: self.data.url('menu_action.js'),
    onMessage: newPassword
});
