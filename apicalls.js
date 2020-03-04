let queryForm = document.querySelector("form");
let queryField = document.querySelector("form input#username");
let querySubmit = document.querySelector("form [type=submit]");
let formError = document.querySelector("div.error-message");
let queryUrl, githubUser, githubWebsite, githubAvatar, githubRepos, githubLanguage, githubRepoName, githubRepoLang, githubRepoDesc;
let spans = document.querySelectorAll("span");
let logoImg = document.querySelector("img#githubAvatar");
queryForm.addEventListener("click", (event) => {
    event.preventDefault()
});

queryField.addEventListener("input", (event) => {
    queryUrl = `https://api.github.com/users/${(event.target.value).toLowerCase()}`;
})

querySubmit.addEventListener("click", (event) => {

    fetch(queryUrl)
        .then(response => console.log(response));

    fetch(queryUrl)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                formError.innerHTML = "formError";
                return;
            }})
        .then(data => {
            console.log(data)
            githubUser = data['login'];
            githubWebsite = data['blog'] || "Data doesn't exist";
            githubAvatar = data['avatar_url'] || "Data doesn't exist";
            githubRepos = data['repos_url'] || "Data doesn't exist";
            githubLanguages = data['repos_url'];
            spans[0].innerHTML = githubUser;
            spans[1].innerHTML = githubWebsite;
            logoImg.src = githubAvatar;
            return fetch(githubRepos);
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return;
            }
        }).then(data => {
            console.log(data[0]);
            data.forEach(singleData => {
                console.log(`Repo Name ${singleData['name']}\n ${singleData['description']}\n ${singleData['language']}`);
                githubRepoName = singleData['name'];
                githubRepoDesc = singleData['description'] || "\n\tNo description";
                githubRepoLang = singleData['language'] || "Data doesn't exist";
                spans[2].innerHTML = `${githubRepoName}\n${githubRepoDesc} `;
                spans[3].innerHTML = `${githubRepoLang}`;
            })


        })

});

