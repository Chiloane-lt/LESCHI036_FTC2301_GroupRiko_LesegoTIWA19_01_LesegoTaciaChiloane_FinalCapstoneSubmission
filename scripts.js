// Imports from other files.

import { 
    BOOKS_PER_PAGE,
    authors,
    genres,
    books,
} from "./data.js"

import { 
    html,
    showPreview,
    createPreviewsFragment,
    updateRemaining,
    searchAll,
    searchAuthor,
    searchGenre,
    searchNothing,
    searchTitle,
} from "./functions.js";

/* -----------------------------------------------PAGE LOAD------------------------------------------*/

/**
 * Selects and displays the first 36 books from the books array.
 * Sets page number to 0 on page load.
 * Checks if books exists as the books array.
 */

/**
 * Array of range start and end. This range is the range of books to select from the books array on page load.
 * @type {Array}
 */
const range = [0, 36];

/**
 * Stores current page number.
 * @type {number}
 */
let page = 1;

/* Checks if books is not empty/undefined, and if it is an array.
 * Changed && to || because both are invalid. 
 */
if (!books || !Array.isArray(books)) throw new Error('Source required');

/* range is an array to check if range is within 0 - 36.
 * Change "< 2" to "=== 2" to avoid future errors.
 */
if (!range && range.length === 2) throw new Error('Range must be an array with two numbers');

/**
 * Blank document fragment which will be appended to the 
 * div with list items denoted by the 'data-list-items' attribute.
 * @type {HTMLElement}
 */
let fragment = createPreviewsFragment(books, 0, 36)

html.view.mainHtml.appendChild(fragment);

window.scrollTo({ top: 0, behavior: 'smooth' }); ///scroll to top on reload.

/* ------------------------SEARCH FUNCTIONS-------------------------*/

/* Genres */

/**
 * Html fragment with genre names inside 'options' tags. Used
 * to create the search form genre options.
 * 
 * @type {HTMLFrangment}
 */
const genresHtml = document.createDocumentFragment();

/**
 * Html 'option' element to form the options for genre & author. This will be
 * appended to the html and replaced to rom the next option. 
 * @type {HTMLElement}
 */
let element = document.createElement('option');
element.value = 'any'
element.innerText = 'All Genres';
genresHtml.appendChild(element);


for (const [id, name] of Object.entries(genres)) {     
    element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    genresHtml.appendChild(element);
};

html.search.searchGenres.appendChild(genresHtml);


/**
 * Html fragment with author names inside 'options' tags. Used
 * to create the search form author options.
 * 
 * @type {HTMLFrangment}
 */
const authorsHtml = document.createDocumentFragment();

element = document.createElement('option');
element.value = 'any';
element.innerText = 'All Authors';
authorsHtml.appendChild(element);

for (const [id, name] of Object.entries(authors)) {
    element = document.createElement('option');
    element.value = id;
    element.innerText = name;
    authorsHtml.appendChild(element);
};

html.search.searchAuthors.appendChild(authorsHtml);

/* Search Overlay */ 

/**
 * Listens for the click event on the search overlay close button. Closes the overlay
 * and resets the search form when clicked.
 */
 html.search.searchCancel.addEventListener('click', () => {
    html.search.searchOverlay.close();
    html.search.searchSubmit.reset();
 });


 /**
  * Listens for the click event on the search button. Opens the search overlay when clicked.
  */
html.search.searchButton.addEventListener('click', () => {
html.search.searchOverlay.showModal();
}); 

/**
 * Creates an empty array to store search results.
 * Extracts the search form data and saves it in an object.
 * Determines if a search is strict or not. A strict search is when all search parameters
 * have been specifies on the search form. i.e. author, genre and title.
 * Iterates through the books array to find matching book objects and pushes these to the
 * search storage array.
 * Creates an html fragment from the search results for the list book buttons and view more
 * button and appends them to the list html.
 * If no results are found, displays the list message which is set as hidden on page load.
 * To show the message, the hidden div is copied and the enyirety of the html list replaced with
 * the copy.
 * Closes the overlay, resets the search form and scrolls to top on submit. *  
 */
html.search.searchSubmit.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = Object.entries(filters);

    /**
     * Stores search results as book objects from the books array.
     * @type {Array}
     */
    let searchResult = [];

    /**
     * Stores search type status.
     * @type {Boolean}
     */
    const strictSearch = ((filters.title.trim() !== '') && (filters.author !== 'any') && (filters.genre !== 'any')) ? true : false;
    
    for (let x = 0; x < books.length; x++) {

        if ((filters.title.trim() !== '') && (filters.author !== 'any') && (filters.genre !== 'any')) {
            searchAll(filters, x, searchResult);
        } else {
            searchTitle(filters.title, x, searchResult);
        
            searchAuthor(filters.author, x, searchResult)

            searchGenre(filters.genre, x, searchResult)

            searchNothing(filters.title, filters.author, filters.genre);
        };
    };

    if (searchResult.length > 0) {

        /**
         * Fragment of results to be appended to html list. Results appear as buttons on the
         * html.
         * @type {HTMLElement}
         */
        let resultFragment = createPreviewsFragment(searchResult);
                
        html.view.mainHtml.replaceChildren(resultFragment);
        html.scroll.moreButton.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (0)</span>
        `;
        html.scroll.moreButton.disabled = true;
        showPreview();        
    };
    
    if (searchResult.length === 0 && strictSearch) {
        html.search.seachMessage.setAttribute('class', 'list__message_show');

        /**
         * Stores html fragment with contents of the div with the search message. Message appears
         * when no results are found for a search.
         * @type {HTMLElement}
         */
        const firstElementChild = html.search.seachMessage;
        
        html.view.mainHtml.innerHTML = '';
        html.view.mainHtml.replaceChildren(firstElementChild);
        html.search.seachMessage.style.display = 'block';
        
        /**
         * Updates the button to view more books and disables it for search results.
         * */
        html.scroll.moreButton.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (0)</span>
        `;
        html.scroll.moreButton.disabled = true;
    };

    html.search.searchOverlay.close();
    html.search.seachMessage.setAttribute('class', 'list__message');
    html.search.searchSubmit.reset();

    window.scrollTo({ top: 0, behavior: 'smooth' });    
});

/* -------------------------------DISPLAY SETTINGS--------------------------- */ /* COMPLETED */

/**
 * The following sets display settings using the display settings button & overlay.
 * On page load, user system settings are checked and applied to webpage.
 * Creates an event to check if the display settings button is clicked. If clicked,
 * the display settings overlay is opened.
 * User settings are stored and applied to the css using the setProperty() method.
 * If the cancel button is closed, the overlay is closed and the form reset. 
 */


// Check darkmode/lightmode settings of user's system and assign them to the websites settings.
html.display.settingsTheme.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';

/**
 * Saves color values for day and night settings.
 * @type {object} css
 */
const css = {
    day : ['255, 255, 255', '10, 10, 20'],
    night: ['10, 10, 20','255, 255, 255']
};

html.display.settingButton.addEventListener('click', () => {
    html.display.settingsOverlay.showModal();
});

html.display.settingsCancel.addEventListener('click', () => {
    html.display.settingsOverlay.close();
    html.display.settingsSubmit.reset();
});

html.display.settingsSubmit.addEventListener('submit', (event) => {
    event.preventDefault();
    /**
     * Collects settings form selection.
     * @type {object}
     */
    const formData = new FormData(event.target);
    
    /**
     * Stores entries from formData.
     * @type {object}
     */
    const selected = Object.fromEntries(formData);

    if (selected.theme === 'night') {
        document.documentElement.style.setProperty('--color-light', css[selected.theme][0]);
        document.documentElement.style.setProperty('--color-dark', css[selected.theme][1]);        
    } else if (selected.theme === 'day') {
        document.documentElement.style.setProperty('--color-light', css[selected.theme][0]);
        document.documentElement.style.setProperty('--color-dark', css[selected.theme][1]);
    };

    html.display.settingsOverlay.close();
});


/* -----------------------------PAGE SCROLL--------------------------------- */  /* COMPLETED */

/**
 * The following allows scrolling down the list of books using a button to show more.
 * On page load, 36 pages are shown. 
 * Listens for an event on the show more button. If the event is fired, selects the next 36 books from
 * the books array and appends them as html fragments.
 * Updates the show more button to show the remaining books that have not been viewed.
 */

/**
 * Number of books remaining calculated using the page number.
 * @type {number}
 */
let pagesRemaining = books.length - (page * BOOKS_PER_PAGE);

html.scroll.moreButton.innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining"> (${pagesRemaining > 0 ? pagesRemaining : 0})</span>
`;

html.scroll.moreButton.addEventListener('click', () => {
if (pagesRemaining <= 0) {
    html.scroll.moreButton.disabled;
}else {
    html.view.mainHtml.appendChild(createPreviewsFragment(books, (page * BOOKS_PER_PAGE), (page + 1) * BOOKS_PER_PAGE));
    page = page + 1;
    pagesRemaining = updateRemaining(books, page);

    html.scroll.moreButton.innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining"> (${pagesRemaining > 0 ? pagesRemaining : 0})</span>
    `
    }
});


/* -------------------------------------PREVIEW OVERLAY--------------------------------*/ /* COMPLETED */

/**
 * Opens books summary overlay.
 */
showPreview();