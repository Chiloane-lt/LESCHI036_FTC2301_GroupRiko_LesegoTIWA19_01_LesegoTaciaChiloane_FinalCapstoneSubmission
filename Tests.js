import {books} from './data.js'
import {createPreviewsFragment} from './functions.js'
import { html } from './functions.js'

export const searchTitle = (title, index, searchResult) => {
    let titleMatch;
    if ((title.trim()) && (books[index].title.toLowerCase().includes(title.toLowerCase()))) {
        titleMatch = books[index];
        searchResult.push(titleMatch);
        return 'success';
    };
    return 'fail';
};

export const searchAuthor = (author, index, searchResult) => {
    let authorMatch;
    if (author !== 'any' && books[index].author.includes(author)) {
        authorMatch = books[index];
        searchResult.push(authorMatch);
        return 'success';           
    };
    return 'fail';
};

export const searchGenre = (genre, index, searchResult) => {
    let genreMatch;
    if (genre !== 'any' && books[index].genres.includes(genre)) {
        genreMatch = books[index];   
        searchResult.push(genreMatch);      
    };
};

export const searchNothing = (title, author, genre) => {
    if (!title.trim() && (author === 'any') && (genre === 'any')) {
        html.search.searchOverlay.close();
        html.search.searchSubmit.reset();
    };
};

export const searchAll = (filters, index, searchResult) => {
    let allMatch = [];

    let titleState = (filters.title.trim()) && (books[index].title.toLowerCase().includes(filters.title.toLowerCase()));
    let authorState = filters.author !== 'any' && books[index].author.includes(filters.author);
    let genreState = filters.genre !== 'any' && books[index].genres.includes(filters.genre);

    if (titleState != true) {
        return 
    }
    if (authorState != true) {
        return
    }
    if(genreState != true ) {
        return 
    }
    
    allMatch = books[index];

    searchResult.push(allMatch);    
};



// const showMessage = () => {
//     html.search.seachMessage.setAttribute('class', 'list__message_show');

//         const firstElementChild = html.search.seachMessage;
//         html.view.mainHtml.innerHTML = '';
//         html.view.mainHtml.append(firstElementChild);

//         html.scroll.moreButton.innerHTML = /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (0)</span>
//         `;
//         html.scroll.moreButton.disabled = true;
// };

// const showResults = () => {
//     let resultFragment = createPreviewsFragment(searchResult);
//         html.view.mainHtml.replaceChildren(resultFragment); 

//         html.scroll.moreButton.innerHTML = /* html */ `
//         <span>Show more</span>
//         <span class="list__remaining"> (0)</span>
//         `;
//         html.scroll.moreButton.disabled = true;
//         showPreview(); 
// };

