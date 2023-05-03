import { authors, BOOKS_PER_PAGE } from './data.js'

/**
 * Creates an html fragment given an object.
 * 
 * @param {array} props is an object array with book properties.
 * @returns {HTMLElement} 
 **/
export const createPreview = (props) => {
    const { author, image, title } = props;

    const newElement = document.createElement('div');
    newElement.className = 'preview';

    newElement.innerHTML =  /* HTML */`
        <img src="${image}" class="preview__image">
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <p class="preview__author">${author}</p>
        </div>`

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