
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
 */

// Import data.
import { BOOKS_PER_PAGE, authors, genres, books } from "./data.js"
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

let genresHtml = document.createDocumentFragment();
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

let searchGenres = document.querySelector('[data-search-genres]');
searchGenres.appendChild(genresHtml);

let authorsHtml = document.createDocumentFragment();
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

let searchAuthors = document.querySelector('[data-search-authors]');
searchAuthors.appendChild(authorsHtml);


/* ------------------------SEARCH FUNCTIONS-------------------------*/

 let searchCancel = document.querySelector('[data-search-cancel]');
 searchCancel.addEventListener('click', () => {
     document.querySelector('[data-search-overlay]').open = false;
 });

// data-header-search.click() {
//     data-search-overlay.open === true ;
//     data-search-title.focus();
// }

// data-search-form.click(filters) {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const filters = Object.fromEntries(formData)
//     result = []

//     for (book; booksList; i++) {
//         titleMatch = filters.title.trim() = '' && book.title.toLowerCase().includes[filters.title.toLowerCase()]
//         authorMatch = filters.author = 'any' || book.author === filters.author

//         {
//             genreMatch = filters.genre = 'any'
//             for (genre; book.genres; i++) { if singleGenre = filters.genre { genreMatch === true }}}
//         }

//         if titleMatch && authorMatch && genreMatch => result.push(book)
//     }


/* -------------------------------DISPLAY SETTINGS--------------------------- */

document.querySelector('[data-settings-theme]').value = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'
let v = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches? 'night' : 'day';

// documentElement.style.setProperty('--color-dark', css[v].dark);
// documentElement.style.setProperty('--color-light', css[v].light);

let settingsCancel = document.querySelector('[data-settings-cancel]');
settingsCancel.addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = false;
});


// let settingsSubmit = document.querySelector('[data-settings-form]')
// settingsSubmit.addEventListener()
// data-settings-form.submit() { actions.settings.submit }
//Above needs work.


/* -----------------------------PAGE SCROLL--------------------------------- */  /* COMPLETED */

let moreButton = document.querySelector('[data-list-button]');

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


// This check might need to run everytime the button is clicked.








let listClose = document.querySelector('[data-list-close]');
listClose.addEventListener('click', () => {
    document.querySelector('[data-list-active]').open = false;
});

//     if display.length < 1 
//     data-list-message.class.add('list__message_show')
//     else data-list-message.class.remove('list__message_show')
    

//     data-list-items.innerHTML = ''
//     const fragment = document.createDocumentFragment()
//     const extracted = source.slice(range[0], range[1])

//     for ({ author, image, title, id }; extracted; i++) {
//         const { author: authorId, id, image, title } = props

//         element = document.createElement('button')
//         element.classList = 'preview'
//         element.setAttribute('data-preview', id)

//         element.innerHTML = /* html */ `
//             <img
//                 class="preview__image"
//                 src="${image}"
//             />
            
//             <div class="preview__info">
//                 <h3 class="preview__title">${title}</h3>
//                 <div class="preview__author">${authors[authorId]}</div>
//             </div>
//         `

//         fragment.appendChild(element)
//     }
    
//     data-list-items.appendChild(fragments)
//     initial === matches.length - [page * BOOKS_PER_PAGE]
//     remaining === hasRemaining ? initial : 0
//     data-list-button.disabled = initial > 0

//     data-list-button.innerHTML = /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (${remaining})</span>
//     `

//     window.scrollTo({ top: 0, behavior: 'smooth' });
//     data-search-overlay.open = false
// }

// data-settings-overlay.submit; {
//     preventDefault()
//     const formData = new FormData(event.target)
//     const result = Object.fromEntries(formData)
//     document.documentElement.style.setProperty('--color-dark', css[result.theme].dark);
//     document.documentElement.style.setProperty('--color-light', css[result.theme].light);
//     data-settings-overlay).open === false
// }

// data-list-items.click() {
//     pathArray = Array.from(event.path || event.composedPath())
//     active;

//     for (node; pathArray; i++) {
//         if active break;
//         const previewId = node?.dataset?.preview
    
//         for (const singleBook of books) {
//             if (singleBook.id === id) active = singleBook
//         } 
//     }
    
//     if !active return
//     data-list-active.open === true
//     data-list-blur + data-list-image === active.image
//     data-list-title === active.title
    
//     data-list-subtitle === '${authors[active.author]} (${Date(active.published).year})'
//     data-list-description === active.description
// }