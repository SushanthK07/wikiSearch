let searchInputEl = document.getElementById('searchInput');
let searchResultsEl = document.getElementById('searchResults');
let spinner = document.getElementById('spinner');
searchInputEl.addEventListener('keydown', searchWikipedia);

function createAndAppendSearchResult(result) {
    // Creating Result Item 
    let resultItemEl = document.createElement('div');
    resultItemEl.classList.add('result-item');
    searchResultsEl.appendChild(resultItemEl);

    let {
        link,
        title,
        description
    } = result;

    // Creating Title Element
    let titleEl = document.createElement('a');
    titleEl.href = link;
    titleEl.target = "_blank";
    titleEl.textContent = title;
    titleEl.classList.add('result-title');
    resultItemEl.appendChild(titleEl);

    // Creating Break Element
    let titleBreakEl = document.createElement('br');
    resultItemEl.appendChild(titleBreakEl);

    // Creating URL Element
    let urlEl = document.createElement('a');
    urlEl.classList.add('result-url');
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    // Creating Break Element
    let linkBreakEl = document.createElement('br');
    resultItemEl.appendChild(linkBreakEl);

    // Creating Description Element
    let descriptionEl = document.createElement('p');
    descriptionEl.classList.add('link-description');
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);
}

function displayResults(searchResults) {
    // to hide spinner when we got data from server
    spinner.classList.toggle('d-none');

    // let result = searchResults[0];
    for (let result of searchResults) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === 'Enter') {
        // to display spinner while fetching data from server
        spinner.classList.toggle('d-none');

        // to clear previous search results
        searchResultsEl.textContent = "";

        let searchInput = searchInputEl.value;
        // console.log(searchInput);

        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET",
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                // console.log(jsonData);
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}