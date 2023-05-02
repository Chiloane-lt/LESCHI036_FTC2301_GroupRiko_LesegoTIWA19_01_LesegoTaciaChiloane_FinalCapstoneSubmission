/**
 * Creates an html fragment given an object.
 * 
 * @param {props} book
 * @returns {HTMLElement} 
 **/
export const createPreview = (props) => {
    const { author, image, title, id } = props;

    const newElement = document.createElement('div');
    newElement.className = 'preview';

    newElement.innerHTML =  /* HTML */`
        <img src="${image}" class="preview__image">
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <p class="preview__author">${author}</p>
        </div>`

    /* Fix prints 2X h5 */

    return newElement;
};

export const createGenres = (obj) => {
    let genresHtml = document.createDocumentFragment();
    let element = document.createElement('option');

};