/* Posts Page JavaScript */

"use strict";
const imgSrc = localStorage.getItem('profileImg')

document.addEventListener('DOMContentLoaded', () => {
    img.src = imgSrc
}) 

function getLoginData() {
  const loginJSON = window.localStorage.getItem("login-data");
  return JSON.parse(loginJSON) || {};
}

function displayPost() {

    const userData = getLoginData();

    const myHeaders = new Headers();
    myHeaders.append("accept", "application/json");
    myHeaders.append("Authorization", userData.token);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
    };

    fetch(
        "http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=100&offset=0",
        requestOptions
    )
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}