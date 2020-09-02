//reference for containers
var issueContainerEl = document.querySelector('#issues-container');

// pulls the information from github
var getReposIssues = function(repo){
    //create a variable to hold the search query
    var apiUrl = 'https://api.github.com/repos/' + repo + '/issues?direction=asc';

    fetch(apiUrl).then(function(response){
        //request success
        if (response.ok){
            response.json().then(function(data){
                // data is the issues piped into displayIssues
                displayIssues(data);
            });
        } else{
            alert('There was a problem with your request!');
        }
    });
};

//variable to display issues -- pipes issues into function call
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

getReposIssues('mondrovic/git-it-done');