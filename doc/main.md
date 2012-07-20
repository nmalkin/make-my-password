The add-on is organized as follows:

lib/main.js initializes the context menu. When the appropriate context menu item
is clicked, a context script generates the new password and enters it into the
password box.

The new password is then sent over to the main script, where it is copied to
the user's clipboard for a period of time, after which the clipboard is reset
to its original value.

The preferences for the new password (length, characters to use) are sent over
to the context script through the data field in the context menu.
The field is updated when preferences change.

This somewhat awkward structure (client-side password generation, preference
communication) is motivated by the fact that a context menu allows only one-way
communication.

See:
https://groups.google.com/forum/?fromgroups#!topic/mozilla-labs-jetpack/AZ8YuxLacF0
https://bugzilla.mozilla.org/show_bug.cgi?id=753696

