
"use strict";

//button
const editButton = document.getElementById("edit_profile");

//text box
const bioInfo = document.getElementById("bio");

//input fields
const userNameInput = document.getElementById("userName");
const fullnameInput = document.getElementById("fullname");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

//stored Items
const todoSelect = document.getElementById("todo");
const deadlineSelect = document.getElementById("deadline");

document.addEventListener("DOMContentLoaded", () => {
    editButton.addEventListener("click", updateData);
});

function getLoginData() {
    const loginJSON = window.localStorage.getItem("login-data");
    return JSON.parse(loginJSON) || {};
}

//will edit the data on the api
function updateData() {

    const loginData = getLoginData();

    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Authorization", loginData.token);
    myHeaders.append("Content-Type", "application/json");
    
    const raw = JSON.stringify({
      "password": passwordInput.value,
      "bio": bioInfo.value,
      "fullName": fullnameInput.value
    });
    
    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/${loginData.username}`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}