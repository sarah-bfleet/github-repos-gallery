// ul to display the repos  list
const repoList = document.querySelector(".repo-list");
// div where profile information will appear
const overview = document.querySelector(".overview");
const usernmame = "sarah-bfleet";

// function to fetch information from Github profile 
const profileInfo = async function () {
    const res = await fetch(`https://api.github.com/users/${usernmame}`);
    const data = await res.json();
    
    showUserInfo(data);
};

profileInfo();

// function to display the fetched user information on the page
const showUserInfo = function (data) {
    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("user-info");
    userInfoDiv.innerHTML = `
    <figure>
        <img alt="user avatar" src=${data.avatar_url}/>
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p >
    </div>`
    overview.append(userInfoDiv);
    getRepos();
};

// function to fetch repos 
const getRepos = async function () {
    const response = await fetch(`https://api.github.com/users/${usernmame}/repos?sort=updated&per_page=100`);
    const repoData = await response.json();
    
    displayRepoInfo(repoData);
};



// function to display info about each repo
const displayRepoInfo = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};