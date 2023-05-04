
/* 1 - Code is not commented. Functions must have comments describing 
 *      parameters and logic to improve code readeability.
 *
 * 2 - Functions must be declared using const or let keywords.
 * 
 * 3 - Some code, for instance code creating dropdown menu options,
 *      could be better created using a function. This was done with functions to create HTML fragments.
 *      This had the benefit of being reusable.
 * 
 * 4 - Code is randomly arranged with code for functions that work together placed far from each other.
 *      To improve readability, code has been rearranged and broken up into sections based on function.
 * 
 * 5 - The dark/light mode icon is measleading. It looks more like a login button.
 */

// Import data.
import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js"
import { createPreview } from "./functions.js";
import { createPreviewsFragment, updateRemaining } from "./functions.js"

const range = [0, 36]
const matches = books; // Try to convert matches to an indepenedent copy.
let page = 1;

/* Checks if books is not empty/undefined, and if it is an array.
 * Changed && to || because both are invalid. 
 */
if (!books || !Array.isArray(books)) throw new Error('Source required');

/* range is an array to check if range is within 0 - 36.
 * Change "< 2" to "=== 2" to avoid future errors.
 */
if (!range && range.length === 2) throw new Error('Range must be an array with two numbers');

const day = {
    dark: '10, 10, 20',
    light: '255, 255, 255',
};

const night = {
    dark: '255, 255, 255',
    light: '10, 10, 20',
};

let fragment = createPreviewsFragment(matches, 0, 36)

let mainHtml = document.querySelector('[data-list-items]');
mainHtml.appendChild(fragment);

/* ------------------------SEARCH FUNCTIONS-------------------------*/

/* Genres */

const genresHtml = document.createDocumentFragment();
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

const searchGenres = document.querySelector('[data-search-genres]');
searchGenres.appendChild(genresHtml);


/* Authors */

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

const searchAuthors = document.querySelector('[data-search-authors]');
searchAuthors.appendChild(authorsHtml);

/* Search Overlay */ 

const searchCancel = document.querySelector('[data-search-cancel]');
const searchButton = document.querySelector('[data-header-search]');
const searchOverlay = document.querySelector('[data-search-overlay]');
const seacrhTitle = document.querySelector('[data-search-title]');
const searchSubmit = document.querySelector('[data-search-form]');

 searchCancel.addEventListener('click', () => {
     searchOverlay.close();
     searchSubmit.reset();
 });

 searchButton.addEventListener('click', () => {
    searchOverlay.showModal();
    seacrhTitle.focus();                // Might be reduntant.
 }); 

searchSubmit.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = Object.entries(filters); 

    let searchResult = [];
    let titleMatch = null;
    let authorMatch = null;
    let genreMatch = null;

    for (let x = 0; x < books.length; x++) {

        // Needs testing for title search
        if ((filters.title.trim()) && (books[x].title.toLowerCase().includes(filters.title.toLowerCase()))) {
            titleMatch = books[x];
            searchResult.push(titleMatch);
        }; 
        
        if (filters.author !== 'All Authors' && books[x].author.includes(filters.author)) {
            authorMatch = books[x];
            searchResult.push(authorMatch);
        };

        if (filters.genre !== 'All Genres' && books[x].genres.includes(filters.genre)) {
            genreMatch = books[x];   
            searchResult.push(genreMatch);            
        };

        if (!(filters.title.trim()) && (authorMatch === 'All Authors') && (genreMatch === 'All Genres')) {
            console.log("You searched nothing!")
            console.log(searchResult)

        };
    }

    // const searchHtml = createPreviewsFragment(searchResult);
    // mainHtml.appendChild(searchHtml )

    searchOverlay.close();

    // Appends search results to html.
    // mainHtml.appendChild(createPreviewsFragment(searchResult));

    //move to top of page after scrolling.
    window.scrollTo({ top: 0, behavior: 'smooth' });

    searchSubmit.reset();
});

/* -------------------------------DISPLAY SETTINGS--------------------------- */ 

// Check darkmode/lightmode settings of user's system and assign them to the websites settings.
document.querySelector('[data-settings-theme]').value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';

let v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' : 'day';

// documentElement.style.setProperty('--color-dark', css[v]);
// documentElement.style.setProperty('--color-light', css[v]);

const settingButton = document.querySelector('[data-header-settings]');
const settingsCancel = document.querySelector('[data-settings-cancel]');
const settingsSubmit = document.querySelector('[data-settings-form]');

settingButton.addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').showModal();
});

settingsCancel.addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').close();
    settingsSubmit.reset();
});

const css = {
    day : ['255, 255, 255', '10, 10, 20'],
    night: ['10, 10, 20','255, 255, 255']
};

settingsSubmit.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const selected = Object.fromEntries(formData);

    if (selected.theme === 'night') {
        document.documentElement.style.setProperty('--color-light', css[selected.theme][0]);
        document.documentElement.style.setProperty('--color-dark', css[selected.theme][1]);        
    } else if (selected.theme === 'day') {
        document.documentElement.style.setProperty('--color-light', css[selected.theme][0]);
        document.documentElement.style.setProperty('--color-dark', css[selected.theme][1]);
    };

    document.querySelector('[data-settings-overlay]').close();
});


/* -----------------------------PAGE SCROLL--------------------------------- */  /* COMPLETED */

const moreButton = document.querySelector('[data-list-button]');

let pagesRemaining = matches.length - (page * BOOKS_PER_PAGE);

moreButton.innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining"> (${pagesRemaining > 0 ? pagesRemaining : 0})</span>
`;

moreButton.addEventListener('click', () => {
if (pagesRemaining <= 0) {
    moreButton.disabled;
}else {
    document.querySelector('[data-list-items]').appendChild(createPreviewsFragment(matches, (page * BOOKS_PER_PAGE), (page + 1) * BOOKS_PER_PAGE));
    page = page + 1;
    pagesRemaining = updateRemaining(matches, page);

    moreButton.innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining"> (${pagesRemaining > 0 ? pagesRemaining : 0})</span>
    `
    }
});


/* -------------------------------------PREVIEW OVERLAY--------------------------------*/ /* COMPLETED */


const summaryList = document.querySelectorAll('[data-preview]');
const summaryOverlay = document.querySelector('[data-list-active]');
const summaryBlur = document.querySelector('[data-list-blur]');
const summaryImage = document.querySelector('[data-list-image]');
const summaryTitle = document.querySelector('[data-list-title]');
const summarySubTitle = document.querySelector('[data-list-subtitle]');
const summaryDescription = document.querySelector('[data-list-description]');
const summaryClose = document.querySelector('[data-list-close]');

[...summaryList].forEach(function(buttons) {
    let summaryButton = buttons;
    summaryButton.addEventListener('click', () => {

    let summaryId = summaryButton.getAttribute('data-preview');
    let searchBooks = books.find((book) => book.id === summaryId);
    const { author, image, title, description, published } = searchBooks;

    let year = new Date(published).getFullYear();

    summaryBlur.src = `${image}`;
    summaryImage.src = `${image}`;
    summaryTitle.innerHTML = `${title}`;
    summarySubTitle.innerHTML = `${authors[author]} (${year})`;
    summaryDescription.innerHTML = `${description}`;
    
    summaryOverlay.showModal();    
    });
});



summaryClose.addEventListener('click', () => {
    summaryOverlay.close();
});


//     if display.length < 1 
//     data-list-message.class.add('list__message_show')
//     else data-list-message.class.remove('list__message_show')
    

    

    // 
