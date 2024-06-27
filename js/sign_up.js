"use strict"

//input fields
const nameInput = document.getElementById('name');
const userNameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmpassword');

//button
const signupButton = document.getElementById('signup');

document.addEventListener('DOMContentLoaded', () => {

    signupButton.addEventListener('click', () => {
        addNewUser()
    });

});

function addNewUser(){

    const name = nameInput.value
    const userName = userNameInput.value
    const password = passwordInput.value
    const confirmedPassword = confirmPasswordInput.value
    
    localStorage.setItem("username", userName)

    if(password !== confirmedPassword){
        alert('Passwords do not match.')
    }

    else if(!name){
        alert('Please enter your name.')
    }

    else if(!userName){
        alert('Please enter a userName.')
    }

    else if(!password){
        alert('Please enter a Password.')
    }
    
    else{
        const myHeaders = new Headers();
        myHeaders.append("accept", "application/json");
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify({
          "username": userName,
          "fullName": name,
          "password": password
        });
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        
        fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/users', requestOptions)
          .then((response) => response.json())
          .then((data) => window.location.href = 'posts.html')
          .catch((error) => console.error(error));
    }
}
