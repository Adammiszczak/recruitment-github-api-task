let queryForm = document.querySelector("form");
let queryField = document.querySelector("form input#username");
let querySubmit = document.querySelector("form [type=submit]");
let formError = document.querySelector("div.error-message");
let queryUrl, githubUser, githubWebsite, githubAvatar, githubRepos, githubLanguage;
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
            spans[2].innerHTML = githubRepos;
            spans[3].innerHTML = githubRepos;
            logoImg.src = githubAvatar;
        }).catch(error => console.error(error));

});