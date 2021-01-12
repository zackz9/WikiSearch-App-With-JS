export const getSearchTerm = () => {

    const rawSearchTerm = document.getElementById('search').value.trim();
    
    //Set the regex express for the search term
    const regex = /[ ]{2,}/gi;
    const searchTerm = rawSearchTerm.replaceAll(regex, " ");

    return searchTerm;
};



export const retrieveSearchResults = async (searchTerm) => {

    const wikiSearchString = getTheWikiSearchString(searchTerm);

    const wikiSearchResult = await requestData(wikiSearchString);

    let resultArray =  [];

    if (wikiSearchResult.hasOwnProperty("query")) {
        resultArray = processWikiResults(wikiSearchResult.query.pages);
    }

    return resultArray;

};

const getTheWikiSearchString = (searchTerm) => {

    const maxCharac = getTheMaxOfChars();

    
    const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxCharac}&exintro&explaintext&exlimit=max&format=json&origin=*`;


    const searchString = encodeURI(rawSearchString);

    return searchString;



};

const getTheMaxOfChars = () => {
    const width = window.innerWidth || document.body.clientWidth ;

    let maxCharac;

    if(width < 414) maxCharac = 65;
    if(width >= 414 && width < 1400) maxCharac = 100;
    if(width >= 1400) maxCharac = 130;

    return maxCharac;
};

const requestData = async (searchString) => {

    try {

        const response = await fetch(searchString);
        const data = await response.json();

        return data
    } catch (err) {
        console.error(err);
    }
};


const processWikiResults = (results) => {

    const resultArray = [];

    Object.keys(results).forEach(key => {
        const id = key;
        const title = results[key].title;
        const text = results[key].extract;
        const img = results[key].hasOwnProperty('thumbnail') ? results[key].thumbnail.source : null;
        const item = {
            id:id,
            title:title,
            img:img,
            text:text
        };

        resultArray.push(item);

    });

    return resultArray;
};