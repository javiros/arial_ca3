/**
 * Created by Paul on 13/04/14.
 */

UserApp.initialize({ appId: "5349161769376" });


function signup() {
    UserApp.User.save({
        login: document.getElementById("email").value,
        first_name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("signup_password").value
    }, function(error, user) {
        if (error) {
            alert("Error: " + error.message);
        } else {
            alert("Thanks for signing up!");
        }
    });

    return false;
}


function login() {
    UserApp.User.login({
        login: document.getElementById("username").value,
        password: document.getElementById("login_password").value
    }, function(error, result) {
        if (error) {
            alert("Error: " + error.message);
        } else {
            // The user is logged in. Now get the user...
            UserApp.User.get({ user_id: "self" }, function(error, user) {
                if (error) {
                    alert("Error: " + error.message);
                } else {
                    alert("Welcome back, " + user[0].first_name + "!");
                    $("#login_fadeout").hide();
                }
            });
        }
    });

    return false;
}

