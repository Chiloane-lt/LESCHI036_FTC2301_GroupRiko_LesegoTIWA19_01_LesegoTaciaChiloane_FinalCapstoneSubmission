
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
import { html, ting } from "./functions.js";
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

html.view.mainHtml.appendChild(fragment);

window.scrollTo({ top: 0, behavior: 'smooth' }); ///scroll to top on reload.

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

html.search.searchGenres.appendChild(genresHtml);


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

html.search.searchAuthors.appendChild(authorsHtml);

/* Search Overlay */ 

 html.search.searchCancel.addEventListener('click', () => {
    html.search.searchOverlay.close();
    html.search.searchSubmit.reset();
 });

html.search.searchButton.addEventListener('click', () => {
html.search.searchOverlay.showModal();
html.search.seacrhTitle.focus();                // Might be reduntant.
}); 

html.search.searchSubmit.addEventListener('submit', (event) => {
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
        };

    }

    if (searchResult.length > 0) {
        let resultFragment = createPreviewsFragment(searchResult);
        html.view.mainHtml.replaceChildren(resultFragment); 

        html.scroll.moreButton.innerHTML = /* html */ `
        <span>Show more</span>
        <span class="list__remaining"> (0)</span>
        `;
        html.scroll.moreButton.disabled = true;
        showPreview();        
    };

    html.search.searchOverlay.close();

    window.scrollTo({ top: 0, behavior: 'smooth' });

    html.search.searchSubmit.reset();
});

//     if display.length < 1 
//     data-list-message.class.add('list__message_show')
//     else data-list-message.class.remove('list__message_show')

/* -------------------------------DISPLAY SETTINGS--------------------------- */ /* COMPLETED */

// Check darkmode/lightmode settings of user's system and assign them to the websites settings.
html.display.settingsTheme.value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day';

let v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' : 'day';

html.display.settingButton.addEventListener('click', () => {
    html.display.settingsOverlay.showModal();
});

html.display.settingsCancel.addEventListener('click', () => {
    html.display.settingsOverlay.close();
    html.display.settingsSubmit.reset();
});

const css = {
    day : ['255, 255, 255', '10, 10, 20'],
    night: ['10, 10, 20','255, 255, 255']
};

html.display.settingsSubmit.addEventListener('submit', (event) => {
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

    html.display.settingsOverlay.close();
});


/* -----------------------------PAGE SCROLL--------------------------------- */  /* COMPLETED */

let pagesRemaining = matches.length - (page * BOOKS_PER_PAGE);

html.scroll.moreButton.innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining"> (${pagesRemaining > 0 ? pagesRemaining : 0})</span>
`;

html.scroll.moreButton.addEventListener('click', () => {
if (pagesRemaining <= 0) {
    html.scroll.moreButton.disabled;
}else {
    html.view.mainHtml.appendChild(createPreviewsFragment(matches, (page * BOOKS_PER_PAGE), (page + 1) * BOOKS_PER_PAGE));
    page = page + 1;
    pagesRemaining = updateRemaining(matches, page);

    html.scroll.moreButton.innerHTML = /* html */ `
    <span>Show more</span>
    <span class="list__remaining"> (${pagesRemaining > 0 ? pagesRemaining : 0})</span>
    `
    }
});


/* -------------------------------------PREVIEW OVERLAY--------------------------------*/ /* COMPLETED */

ting();