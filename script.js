// main variables
let theInput = document.querySelector(".get-repos input"),
  getButton = document.querySelector(".get-button"),
  reposData = document.querySelector(".show-data");
getButton.onclick = () => getRepos();
// get repos function
function getRepos() {
  if (theInput.value == "") {
    reposData.innerHTML = "<span>Please Write Github Username</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((response) => response.json())
      .then((repositories) => {
        // empty the container
        reposData.innerHTML = "";
        // loop on repositories
        repositories.forEach((repo) => {
          // create the main div element
          let mainDiv = document.createElement("div");
          // create repo name text
          let repoName = document.createTextNode(repo.name + " ");
          // append the text to main div
          mainDiv.appendChild(repoName);
          // create repo URL link
          let theURL = document.createElement("a");
          // create repo URL text
          let theURLText = document.createTextNode("visit");
          // append the repo URL text to anchor tag
          theURL.appendChild(theURLText);
          // add the hyper text ref
          theURL.href = `https://github.com/${theInput.value}/${repo.name}`;
          // set attribute blank
          theURL.setAttribute("target", "_blank");
          // append URL anchor to main div
          mainDiv.appendChild(theURL);
          // create starts count span
          let starsSpan = document.createElement("span");
          // create the stars count text
          let starsText = document.createTextNode(
            ` stars ${repo.stargazers_count}`
          );
          // add stars count text to stars span
          starsSpan.appendChild(starsText);
          // append stars count span to main div
          mainDiv.appendChild(starsSpan);
          // add class on main div
          mainDiv.className = "repo-box";
          // append the main div to container
          reposData.appendChild(mainDiv);
        });
      });
  }
}
