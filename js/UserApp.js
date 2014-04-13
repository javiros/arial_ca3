/**
 * Created by Paul on 13/04/14.
 */

UserApp.initialize({ appId: "5349161769376" });

function signup() {
    UserApp.User.save({
        login: document.getElementById("email").value,
        first_name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    }, function(error, user) {
        if (error) {
            alert("Error: " + error.message);
        } else {
            alert("Thanks for signing up!");
        }
    });

    return false;
}