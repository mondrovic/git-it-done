var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#username');
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term')

// create first ** edit to make sure 200 request and network status is okay
var getUserRepos = function(user){
    //format the github api url
    var apiUrl = 'https://api.github.com/users/' + user + '/repos';

    //make request to url
    fetch(apiUrl).then(function(response){
      // request was successful
        if (response.ok){
            response.json().then(function(data){
                displayRepos(data, user);
            });
        } else{
            alert("Error: " + response.statusText);
        }
    })
    // add catch to check if there's a network issue. Goes after the .then method
    .catch(function(error){
        alert("Unable to connect to GitHub");
    });
};

// create third
var formSubmitHandler = function(){
    event.preventDefault();
   
    // get value from the input element
    var username = nameInputEl.value.trim();

    if (username){
        getUserRepos(username)
        nameInputEl.value = '';
    }else{
        alert('Please enter a GitHub username');
    }
}

//create fourth ** edit to check if any repos
var displayRepos = function(repos, searchTerm){
    // checks if api returned any repos and stops execution with return variable
    if (repos.length === 0){
        repoContainerEl.textContent = 'No repositories found.';
        return;
    };

    // empties out any previous text and adds username to header
    repoContainerEl.textContent = '';
    repoSearchTerm.textContent = searchTerm;

    // loops through all repos then displays repos on html. github repos start at 0
    for (var i = 0; i < repos.length; i++){
        // format repo name
        var repoName = repos[i].owner.login + '/' + repos[i].name;

        // create container for each repo
        var repoEl = document.createElement('div');
        repoEl.classList = 'list-item flex-row justify-space-between align-center';

        //create span element to hold repo name
        var titleEl = document.createElement('span');
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl)

        // create a status element
        var statusEl = document.createElement('span');
        statusEl.classList = 'flex-row align-center';

        //check if current repo has issues or not;
        if (repos[i].open_issues_count > 0){
            // uses fontawesome to display and list issue count
            statusEl.innerHTML = 
                '<i class = "fas fa-check-square status-icon icon-danger"></i>' + repos[i].open_issues_count + 'issues';
        } else{
            statusEl.innerHTML = '<i class = "fas fa-check-square status-icon icon-succses"></i>'
        }

        // append statuses to container
        repoEl.appendChild(statusEl);

        // append container to DOM
        repoContainerEl.appendChild(repoEl);
    }
}

//create second
userFormEl.addEventListener('submit', formSubmitHandler)