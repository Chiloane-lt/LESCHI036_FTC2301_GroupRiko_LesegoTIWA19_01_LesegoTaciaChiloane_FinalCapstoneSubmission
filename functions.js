import { authors, BOOKS_PER_PAGE } from './data.js'

/**
 * Creates an html fragment given an object.
 * 
 * @param {array} props is an object array with book properties.
 * @returns {HTMLElement} 
 **/
export const createPreview = (props) => {
    const { author, image, title, id } = props;

    const newElement = document.createElement('button');
    newElement.className = 'preview';
    newElement.setAttribute('data-preview', id);

    newElement.innerHTML =  /* HTML */`
        <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${author}</div>
            </div>
        `

    return newElement;
};

export const createGenres = (obj) => {
    let genresHtml = document.createDocumentFragment();
    let element = document.createElement('option');

};


/**
 * Creates a slice of specified length from the database of books.
 * 
 * @param {array} array is an object array of books with properties.
 * @param {number} start is a number denoting where to start slice.
 * @param {number} end is a number denoting where to end slice.
 * @return {HTMLElement} 
 * 
 */
export const createPreviewsFragment  = (array , start, end) => {
    
    const booksSlice = array.slice(start, end);

    let previewFragment = document.createDocumentFragment();

    for (let i = 0; i < booksSlice.length; i++){

        let { author, image, title, id } = booksSlice[i];
        author = authors[author];
    
        const preview = {
            author,
            id,
            image,
            title,
        };
        previewFragment.appendChild(createPreview(preview));
    };
    return previewFragment;
};


/**
 * Determines the number of pages to travese on the app based on the total
 * number of books available in the database.
 * 
 * @param {array} array with total number of books.
 * @param {number} page current page.
 * @returns {number}
 */
export const updateRemaining = (array, page) => {
    let remaining = array.length - (page * BOOKS_PER_PAGE);
    return remaining;
}; 

export const html = {
    view: {
        mainHtml: document.querySelector('[data-list-items]'),
    },    
    scroll: {
        moreButton: document.querySelector('[data-list-button]'),
    },
    preview: {
        summaryList: document.querySelectorAll('[data-preview]'),
        summaryOverlay: document.querySelector('[data-list-active]'),
        summaryBlur: document.querySelector('[data-list-blur]'),
        summaryImage: document.querySelector('[data-list-image]'),
        summaryTitle: document.querySelector('[data-list-title]'),
        summarySubTitle: document.querySelector('[data-list-subtitle]'),
        summaryDescription: document.querySelector('[data-list-description]'),
        summaryClose: document.querySelector('[data-list-close]'),
    },
    display: {
        settingsOverlay: document.querySelector('[data-settings-overlay]'),
        settingButton: document.querySelector('[data-header-settings]'),
        settingsTheme: document.querySelector('[data-settings-theme]'),
        settingsCancel: document.querySelector('[data-settings-cancel]'),
        settingsSubmit: document.querySelector('[data-settings-form]'),
    },
    search: {
        searchCancel: document.querySelector('[data-search-cancel]'),
        searchButton: document.querySelector('[data-header-search]'),
        searchOverlay: document.querySelector('[data-search-overlay]'),
        seacrhTitle: document.querySelector('[data-search-title]'),
        searchSubmit: document.querySelector('[data-search-form]'),
        searchAuthors: document.querySelector('[data-search-authors]'),
        searchAuthors: document.querySelector('[data-search-authors]'),
        searchGenres: document.querySelector('[data-search-genres]'),
    },
}



