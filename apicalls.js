let queryForm = document.querySelector("form");
let queryField = document.querySelector("form input#username");
let querySubmit = document.querySelector("form [type=submit]");
let formError = document.querySelector("div.error-message");
let spans = document.querySelectorAll("span");
let logoImg = document.querySelector("img#githubAvatar");
let repostList = document.querySelector("span#githubRepos ul");
let queryUrl, githubUser, githubWebsite, githubAvatar, githubRepos, githubLanguage, githubRepoName, githubRepoLang, githubRepoDesc,emptyForm;

// Events start

queryForm.addEventListener("click", (event) => {
    event.preventDefault()
});


queryField.addEventListener("input", (event) => {

    queryUrl = `https://api.github.com/users/${(event.target.value).toLowerCase()}`;
})

// Events end

// fetching on submit

querySubmit.addEventListener("click", (event) => {
    repostList.innerHTML = null;
    spans[0].innerHTML = null;
    spans[1].innerHTML = null;
    spans[2].innerHTML = null;
    formError.innerHTML = null;

    // check if form is empty

    queryField.value.length < 1 ? emptyForm = true : emptyForm = false;

    if (emptyForm) {
        formError.innerHTML = "The input can't be empty!";
        return;
    } else {

        // First Fetch  

        fetch(queryUrl)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    formError.innerHTML = "This user doesn't exist, check another!";
                    return;
                }
            })
            .then(data => {
                githubUser = data['login'];
                githubWebsite = data['blog'] || "Data doesn't exist";
                githubAvatar = data['avatar_url'] || "Data doesn't exist";
                githubRepos = data['repos_url'] || "Data doesn't exist";
                githubLanguages = data['repos_url'];
                spans[0].innerHTML = githubUser;
                spans[1].innerHTML = githubWebsite;
                logoImg.src = githubAvatar;

                // Second Fetch if possible          

                return fetch(githubRepos);
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    return;
                }
            })
            .then(data => {
                let languages = [];

                data.forEach(singleData => {


                    githubRepoName = singleData['name'];
                    githubRepoDesc = singleData['description'] || "No description for this repo";
                    githubRepoLang = singleData['language'] || "Language isn't specified";
                    languages.push(githubRepoLang);

                    // Appending repositories data                

                    let repoLi = document.createElement("li");
                    let repoSpan1 = document.createElement("span");
                    repoSpan1.style.fontWeight = "bold";
                    let repoSpan2 = document.createElement("span");

                    repoLi.append(repoSpan1, repoSpan2);
                    repoSpan1.appendChild(document.createTextNode(`${githubRepoName}\n`));
                    repoSpan2.appendChild(document.createTextNode(`${githubRepoDesc}`));
                    repostList.appendChild(repoLi);

                })

                //  Count % of used languages at all projects           

                languageNumbers = languages.length;
                var result = {};
                languages.forEach(function (x) {
                    result[x] = (result[x] || 0) + 1;
                });


                function percentage(occurences, total) {
                    return ((occurences / total) * 100).toFixed(2);
                }

                for (let property in result) {
                    spans[2].appendChild(document.createTextNode(`${property} ${percentage(result[property], languageNumbers)}% | `));
                }
            })
    }
}); 