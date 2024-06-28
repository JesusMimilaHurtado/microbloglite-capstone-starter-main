/* Posts Page JavaScript */

"use strict";

//profile image
const imgSrc = localStorage.getItem("profileImg");

//new post button
const newPostButton = document.getElementById("addPost");

//stored values
const token = localStorage.getItem("token");

//posts container
const posts = document.getElementById('posts')

document.addEventListener("DOMContentLoaded", () => {
  img.src = imgSrc;
  newPostButton.addEventListener("click", createNewPosts);
  displayPost();
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
    "http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=30&offset=0",
    requestOptions
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      data.forEach(post => {
        posts.innerHTML += `
        <div class="row mb-4 justify-content-center">
            <div class="col-sm-11 col-md-8 col-lg-8 col-xl-4 mt-3">
              <div class="card">
                <div class="card-body pt-0"
                  <h4 class="mountain-desc card-text">${post.username} </h4>
                  <hr class="w-100">
                  <strong class="card-text">${post.text}</strong>
                </div>
              </div>
            </div>
          </div>
            `;
      });
    })
    .catch((error) => console.error(error));
}

function createNewPosts() {
  const newPost = document.getElementById("new_post");

  const myHeaders = new Headers();
  myHeaders.append("accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    'text' : newPost,
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
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}
