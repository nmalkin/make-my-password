/** Returns random integer on [0, upperBound) */
function randInt(upperBound) {
    return Math.floor(Math.random() * upperBound);
}

/** Returns a random value from the array */
function selectRandom(array) {
    return array[randInt(array.length)];
}

/** Returns a random password of given length using characters in CHARS */
function generateRandomPassword(length, chars) {
    var password = '';
    for(var i = 0; i < length; i++) {
        password += selectRandom(chars);
    }

    return password;
}

self.on('click', function(node, data) {
    var preferences = JSON.parse(data);

    // Generate password
    var password = generateRandomPassword(preferences.passwordLength, preferences.passwordChars);

    // Fill the field in with this value.
    node.value = password;

    // Send it back to the main extension for further processing.
    self.postMessage(password);
});
