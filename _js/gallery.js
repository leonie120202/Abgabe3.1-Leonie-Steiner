"use strict";

/**
 * Selects a random full image at the start and displays it.
 */
function showRandomImageAtStart() {
    const thumbnailLinks = document.querySelectorAll('card-link');
    const randomLink = thumbnailLinks[getRandomInt(0, links.length)];
    const imageUrl = randomLink.href;
    const randomIndex = getRandomInt(0, thumbnailLinks.length);
    const imageDescription = randomLink.getAttribute('img').alt;
    switchFullImage(imageDescription, imageUrl);
    const randomCardElement = randomLink.nextElementSibling;
    randomCardElement.classList.add('bg-dark');
    randomCardElement.classList.add('text-white');
}

function prepareLinks() {
    const thumbnailLinks = document.getElementById('thumb');
    const links = thumbnailLinks.querySelectorAll('a');
    links.forEach(function (linked) {
        linked.addEventListener('click', function(event) {
            event.preventDefault();
            links.forEach(function (linkedSecond) {
                linkedSecond.nextElementSibling.classList.remove('bg-dark', 'text-white');
                
            });
            now.nextElementSibling.classList.add('bg-dark', 'text-white');
            switchFullImage(now.href, now.firstElementChild.alt);
            loadNotes(now.href);
            storeNotes(now.href);
        });

    });
}     
        
        
function storeNotes() {
    const notesField = document.getElementById('notes');
    notesField.addEventListener('blur', function() {
    const key = document.querySelector('img').src;
    const notes = notesField.innerHTML;
    if (notes =='') {
        localStorage.removeItem(key);
    } else {
        localStorage.setItem(key, notes);
    }
    });
}

/**
 * Switches the full image in the <figure> element to the one specified in the parameter. Also updates the image's alt
 * attribute and the figure's caption.
 * @param {string} imageUrl The URL to the new image (the image's src attribute value).
 * @param {string} imageDescription The image's description (used for the alt attribute and the figure's caption).
 */
function switchFullImage(imageUrl, imageDescription) {
    const fullImage= document.querySelector('img');
    fullImage.src = imageUrl;
    fullImage.alt = imageDescription;
    const caption = document.querySelector('figcaption');
    caption.textContent = imageDescription;
}
/**
 * Loads the notes from local storage for a given key and sets the contents in the notes field with the ID notes.
 * @param {string} key The key in local storage where the entry is found.
 */
function loadNotes(key) {
    const notesField = document.getElementById('notes');
    const notes = localStorage.getItem(key);
    if (localStorage.getItem(key)=== null) {
        notesField.innerHtml = defaultText;
    } else {
        notesField.innerHTML = savedNotes;
    }
} 

/**
 * Returns a random integer value between min (included) and max (excluded).
 * @param {number} min The minimum value (included).
 * @param {number} max The maximum value (excluded).
 * @returns {number} A random integer value between min (included) and max (excluded).
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Gets the whole thing started.
 */
showRandomImageAtStart();
prepareLinks();
storeNotes();
