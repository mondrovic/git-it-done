//reference for containers
var issueContainerEl = document.querySelector('#issues-container');
var limitWarningEl = document.querySelector('#limit-warning');
var repoNameEl = document.querySelector('#repo-name')

/*
pulls the repo location by utilizing document.location.search and splits location from url
issues a callback to getRepoIssues using the newly split string and updates the HTML
*/
var getRepoName = function(){
    var queryString = document.location.search;
    var repoName = queryString.split('=')[1];
    if (repoName){
        getReposIssues(repoName);
        repoNameEl.textContent = repoName;
    } else{
        document.location.replace('./index.html')
    }
}

// pulls the information from github and acts as main handler
var getReposIssues = function(repo){
    //create a variable to hold the search query

    var apiUrl = 'https://api.github.com/repos/' + repo + '/issues?direction=asc';

    fetch(apiUrl).then(function(response){
        //request success
        if (response.ok){
            response.json().then(function(data){
                // data is the issues piped into displayIssues
                displayIssues(data);

                // check if page has paginated issues
                if (response.headers.get('Link')){
                    displayWarning(repo);
                }
            });
        } else{
            document.location.replace('./index.html');
        }
    });
};

//variable to display issues -- pipes issues from function call
var displayIssues = function(issues){
    //checks if no issues
    if (issues.length === 0){
        issueContainerEl.textContent = 'This repo has no open issues';
        return
    };

    for (i = 0; i < issues.length; i++){
        //creates clickable links for all issues found
        var issueEl = document.createElement('a');
        issueEl.classList = 'list-item flex-row justify-space-between align-center';
        issueEl.setAttribute = ('href', issues[i].html_url);
        issueEl.setAttribute = ('target', '_blank');

        /* Displays issues to html
        creates span to nest the text in created element */
        var titleEl = document.createElement('span');
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);
        
        // create a type element
        var typeEl = document.createElement('span');

        if (issues[i].pull_request){
            typeEl.textContent = '(Pull request)';
        } else{
            typeEl.textContent = '(Issue)';0
        }

        // append to container
        issueEl.appendChild(typeEl);

        // outputs to html
        issueContainerEl.appendChild(issueEl);
    }
}

//warns user if there are more than 30 issues then provides with link to github
var displayWarning = function(repo){
    limitWarningEl.textContent = 'To see more than 30 issues, visit ';

    var linkEl = document.createElement('a');
    linkEl.textContent = 'See More Issues on Github.com';
    linkEl.setAttribute('href', 'https://github.com/' + repo + '/issues');
    linkEl.setAttribute('target', '_blank');

    //append warning to container
    limitWarningEl.appendChild(linkEl);
}

getRepoName();