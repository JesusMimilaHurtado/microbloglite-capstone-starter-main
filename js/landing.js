/* Landing Page JavaScript */

"use strict";

const googleButton = document.getElementById('google');

document.addEventListener('DOMContentLoaded', () => {

    googleButton.addEventListener('click', () => {
        window.location.href = 'https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?disallow_webview=true&response_type=code&redirect_uri=https%3A%2F%2Fbalsamiq.cloud%2F&scope=profile%20email&state=%7B%22authNonce%22%3A%22MC5kOTB5MDNlajJ0NQ%3D%3D%22%2C%22next%22%3Anull%2C%22auth_provider%22%3A%22google%22%7D&client_id=4720648203-v1g732u6b7rlr5j1tceik3mbhf8aupos.apps.googleusercontent.com&service=lso&o2v=2&ddm=0&flowName=GeneralOAuthFlow';
    })
})

const loginForm = document.querySelector("#login");

loginForm.onsubmit = function (event) {
    // Prevent the form from refreshing the page,
    // as it will do by default when the Submit event is triggered:
    event.preventDefault();

    // We can use loginForm.username (for example) to access
    // the input element in the form which has the ID of "username".
    const loginData = {
        username: loginForm.username.value,
        password: loginForm.password.value,
    }
    
    // Time to actually process the login using the function from auth.js!
    login(loginData);
};
