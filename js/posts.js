/* Posts Page JavaScript */

"use strict";

//new post button
const newPostButton = document.getElementById("addPost");

//stored values
const token = localStorage.getItem("token");
const username = localStorage.getItem("username");

//posts container
const posts = document.getElementById("posts");

document.addEventListener("DOMContentLoaded", () => {
  newPostButton.addEventListener("click", createNewPosts);
  displayPost();
  user();
});

function displayPost() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=10&offset=0",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((post) => {
        posts.innerHTML += `
        <div class="row justify-content-center">
            <div class="col-12 mt-3">
              <div class="card">
                <div class="card-body"
                  <strong><h3 class="card-text">${post.username} </h3></strong>
                  <hr class="w-100">
                  <strong class="card-text"><p>${post.text}</p></strong>
                </div>
                <div class="card-footer">
                    <p><span style="color:black;">Time:</span> ${post.createdAt.slice(11,19)} <span style="color:black;">Day:</span> ${post.createdAt.slice(0,10)}</p>
                </div>
              </div>
            </div>
        <div>
            `;
      });
    })
    .catch((error) => console.error(error));
}

function createNewPosts() {
  let newPost = document.getElementById("new_posts");

  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  if (!newPost) {
    console.error("Error: Text input cannot be empty");
    return;
  }

  const raw = JSON.stringify({
    text: newPost.value,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    "http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      newPost.value = " ";
      displayPost();
    })
    .catch((error) => console.error(error));
}

function user() {
  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "http://microbloglite.us-east-2.elasticbeanstalk.com/api/users/" + username,
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      profile.innerHTML += `
    <div class="card col-8">
    <div class="card-body">
        <img src="https://cataas.com/cat?position=center&width=400&height=400" alt="cat image" id=#img>
        <h4 class="card-title">${data.fullName}</h4>
      <h6 class="card-title">@${data.username}</h6>
      <p class="card-text">${data.bio}</p>
    </div>
  </div>
  `;
    })
    .catch((error) => console.error(error));
}
