// ul to display the repos  list
const repoList = document.querySelector(".repo-list");
// div where profile information will appear
const overview = document.querySelector(".overview");
const usernmame = "sarah-bfleet";
// section with a class of repos where all your repo info appears 
const repoSection = document.querySelector(".repos");
// section where the individual repo data will appear 
const singleRepo = document.querySelector(".repo-data");
const backBtn = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

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

    displayRepos(repoData);
};



// function to display info about each repo
const displayRepos = function (repos) {
    filterInput.classList.remove("hide");
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);

    }
});

const getRepoInfo = async function (repoName) {
    const fetchInfo = await fetch(`https://api.github.com/repos/${usernmame}/${repoName}`);
    const repoInfo = await fetchInfo.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    }

    displayRepoInfo(repoInfo, languages);
};

// function to display specific repo info
const displayRepoInfo = function (repoInfo, languages) {
    backBtn.classList.remove("hide");
    singleRepo.innerHTML = "";
    singleRepo.classList.remove("hide");
    repoSection.classList.add("hide");
    const newDiv = document.createElement("div");
    newDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;

    singleRepo.append(newDiv);
};

backBtn.addEventListener("click", function () {
    repoSection.classList.remove("hide");
    singleRepo.classList.add("hide");
    backBtn.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
    const searchText = e.target.value;
    const repos = document.querySelectorAll(".repo");
    const searchLowerText = searchText.toLowerCase();

    for (const repo of repos) {
        const repoLowerCase = repo.innerText.toLowerCase();
        if (repoLowerCase.includes(searchLowerText)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});