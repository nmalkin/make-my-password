var CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'
var NEW_PASSWORD_LENGTH = 32;

/** Returns random integer on [0, upperBound) */
function randInt(upperBound) {
    return Math.floor(Math.random() * upperBound);
}

/** Returns a random value from the array */
function selectRandom(array) {
    return array[randInt(array.length)];
}

/** Returns a random password of given length using characters in CHARS */
function generateRandomPassword(length) {
    var password = '';
    for(var i = 0; i < length; i++) {
        password += selectRandom(CHARS);
    }

    return password;
}

self.on('click', function(node) {
    // Generate password
    var password = generateRandomPassword(NEW_PASSWORD_LENGTH);

    // Fill the field in with this value.
    node.value = password;

    // Send it back to the main extension for further processing.
    self.postMessage(password);
});
