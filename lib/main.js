var clipboard = require('clipboard');
var contextMenu = require('context-menu');
var preferences = require('simple-prefs');
var self = require('self');
var timers = require('timers');

/**
 * Preference fields related to passwords
 * (They will need to be sent over to the content script,
 * where the password is genereated.)
 */
var PASSWORD_PREFS = ['passwordLength', 'passwordChars'];

/** Returns an object with the preferences relevant to password generation */
function getPasswordPreferences() {
    var prefs = {};

    PASSWORD_PREFS.forEach(function(preference) {
        prefs[preference] = preferences.prefs[preference];
    });

    return JSON.stringify(prefs);
}

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

/** Called when a new password is generated */
function newPassword(password) {
    setClipboardContents(password);
}

// Set up the context menu item that triggers password creation
var menuItem = contextMenu.Item({
    label: "Create Password",
    context: contextMenu.SelectorContext('input[type="password"]'),
    contentScriptFile: self.data.url('menu_action.js'),
    data: getPasswordPreferences(),
    onMessage: newPassword
});

/**
 * Update the menu item's data field to communicate changed preferences to the
 * context script.
 */
function updatePreferences() {
    menuItem.data = getPasswordPreferences();
}

// Make sure the client has access to the latest preferences, when they change
PASSWORD_PREFS.forEach(function(preference) {
    preferences.on(preference, updatePreferences);
});
