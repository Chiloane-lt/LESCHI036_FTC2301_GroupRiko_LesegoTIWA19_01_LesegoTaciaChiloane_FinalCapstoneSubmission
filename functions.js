/**
 * Creates an html fragment given an object.
 * 
 * @param {props} book
 * @returns {HTMLElement} 
 **/
export const createPreview = (props) => {
    const { author, image, title, id } = props;

    const newElement = document.createElement('div');

    newElement.innerHTML =  /* HTML */`
        <img src="${image}">
        <div>
            <h1>${title}</h>
            <h5>${author}<h5>
        </div>        
    `;

    /* Fix prints 2X h5 */

    return newElement;
};