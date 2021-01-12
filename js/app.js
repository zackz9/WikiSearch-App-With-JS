import {setSearchFocus, showClearTextButton, clearSearchText, clearPushListener} from "./searchBoxx.js";
import {deleteSearchResults,buildSearchResults, clearStatsLine, setStatsLine} from "./searchResults.js";
import {getSearchTerm} from "./dataFunct.js";
import {retrieveSearchResults} from "./dataFunct.js";


document.addEventListener('readystatechange', (event) => {
    if (event.target.readyState === "complete") {
        initApp();
    }
});

const initApp = () => {

    //Set focus on the textInput

    setSearchFocus();

    

    const search = document.getElementById('search');
    search.addEventListener('input', showClearTextButton);

    const clear = document.getElementById('clear');
    clear.addEventListener('click', clearSearchText);

    clear.addEventListener('keydown', clearPushListener);

    const form = document.getElementById('searchBox');
    form.addEventListener('submit', submitSearch);


};

//Procedural WorkFlow Function 

const submitSearch = (event) => {
    event.preventDefault();

    //Deleting Search results
    deleteSearchResults();
    //Process to the search
    processSearch();
    //Set the focus into input
    setSearchFocus();
};

//Procedural funct
const processSearch = async() => {

    clearStatsLine();

    //Clearing the stats line

    const SearchTerm = getSearchTerm();

    if(SearchTerm === '') return;
    const resultArray = await retrieveSearchResults(SearchTerm);

    //Build a search results if arr returned
    if (resultArray.length) buildSearchResults(resultArray);

    //Set a stats line
    setStatsLine(resultArray.length);

};