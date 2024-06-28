
"use strict";

//button
const editButton = document.getElementById("edit_profile");

//text box
const bioInfo = document.getElementById("bio");

//input fields
const fullnameInput = document.getElementById("fullname");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");

//profile image
const img = document.querySelector('img');

//stored values
const username = localStorage.getItem('username');
const token = localStorage.getItem('token');

document.addEventListener("DOMContentLoaded", () => {
    editButton.addEventListener('click', updateData);
    img.src = 'https://cataas.com/cat?position=center&width=400&height=400'
    getUserData()
});

function getUserData(){
    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/${username}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => displayUserInfo(data))
      .catch((error) => console.error(error));
}

function displayUserInfo(_data){
    bioInfo.value = _data.bio;
    fullnameInput.value = _data.fullName;
}

//will edit the data on the api
function updateData() {

    const password = passwordInput.value;
    const confirmedPassword = confirmPasswordInput.value

    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");


    let raw = {};

    if (bioInfo.value) {
        raw.bio = bioInfo.value;
    }

    if (fullnameInput.value) {
        raw.fullName = fullnameInput.value;
    }

    if (password && password === confirmedPassword) {
        raw.password = passwordInput.value;
    }

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(raw), // Convert raw object to JSON string
        redirect: "follow"
    };
    
    fetch(`http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/${username}`, requestOptions)
      .then((response) => response.json())
      .then((data) => window.location.assign("/posts.html"))
      .catch((error) => console.error(error));
}