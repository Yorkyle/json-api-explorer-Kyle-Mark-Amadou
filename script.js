let posts = [];

const postList = document.getElementById("postList");

function renderPosts() {
  for (let i = 0; i < posts.length; i++) {
    const newDiv = document.createElement("div");
    // generate html element, because we know what we are doing...
    const content = `<h3>${posts[i].title}</h3>
                            <p>${posts[i].body}</p>`;
    newDiv.innerHTML = content;
    postList.appendChild(newDiv);
  }
}

document.addEventListener("click", function (event) {
  if (event.target.id === "fetchButton") {
    fetch("https://jsonplaceholder.typicode.com/posts").then((response) => {
      response.json().then((data) => {
        console.log(data);
        posts.push(...data);
        renderPosts();
      });
    });
  }
});

document.addEventListener("click", function (event) {
  if (event.target.id === "submit") {
    const postRequest = {
      method: "POST", // Specify the HTTP method as POST
      headers: {
        "Content-Type": "application/json", // Inform the server that the body is JSON
      },
    };
    fetch("https://jsonplaceholder.typicode.com/posts").then((response) => {
      response.json(postRequest);
    });
  }
});

// const options = {
//     method: 'POST', // Specify the HTTP method as POST
//     headers: {
//         'Content-Type': 'application/json' // Inform the server that the body is JSON
//     },
// };

// if (event.target.id === 'cat-button') {

// 		fetch('https://api.thecatapi.com/v1/images/search?limit=10').then(response => {
// 			response.json().then(data => {
// 				console.log(data);
// 				result.innerHTML = '';
// 				for (let obj of data) {
// 					result.innerHTML = `<img src="${obj.url}" width=300px />`
// 				}
// 			});
// 		})
