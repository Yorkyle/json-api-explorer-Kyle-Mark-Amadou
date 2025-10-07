let posts = [];

const postList = document.getElementById("postList");
const fetchButton = document.getElementById("fetchButton");
const errorEl = document.getElementById("error");
const form = document.getElementById("postForm");
const titleInput = document.getElementById("titleInput");
const bodyInput = document.getElementById("bodyInput");
const formError = document.getElementById("formError");
const formSuccess = document.getElementById("formSuccess");

function renderPosts() {
  postList.innerHTML = "";
  for (let i = 0; i < posts.length; i++) {
    const newDiv = document.createElement("div");
    
    const content = `<h3>${posts[i].title}</h3>
                            <p>${posts[i].body}</p>`;
    newDiv.innerHTML = content;
    postList.appendChild(newDiv);
  }
}

//Get Request fetch

fetchButton.addEventListener("click", function () {
  postList.innerHTML = "<p>Loading...</p>";
  errorEl.textContent = "";

    fetch("https://jsonplaceholder.typicode.com/posts").then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .then((data) => {
        setTimeout(() => { //timeout for "Loading..."
          console.log(data);
          posts.push(...data);
          renderPosts();
        }, 1000);
      })
      .catch((error) => {
        postList.innerHTML = "";
        errorEl.textContent = "Error leading posts: " + error.message;
      });
  });


form.addEventListener("click", function (event) {
  if (event.target.id === "submit") {
    formError.textContent = "";
    formSuccess.textContent = "";

    const title = titleInput.value.trim();
    const body = bodyInput.value.trim();

    if (!title || !body) {
      formError.textContent = "Please provide input for both Title and Body fields";
      return;
    }

    formSuccess.textContent = "Submitting...";

    const postRequest = {
      method: "POST", // Specify the HTTP method as POST
      headers: {
        "Content-Type": "application/json", // Inform the server that the body is JSON
      },
      body: JSON.stringify({title, body, userId: 1}),
    };


    fetch("https://jsonplaceholder.typicode.com/posts", postRequest).then((response) => {
      if(!response.ok) {
        throw new Error("Failed to submit post");
      }
      return response.json();
    }).then((data) => {
      setTimeout(() => {//timeout for "Submitting..."
      formSuccess.textContent = `Post created (mock): id=${data.id}`;

      posts.unshift({title:data.title, body: data.body});
      renderPosts();

      titleInput.value = "";
      bodyInput.value = "";
      }, 1500);
    })
    .catch((error) => {
      formSuccess.textContent = "";
      formError.textContent = "Error: " + error.message;
    });
  }
});