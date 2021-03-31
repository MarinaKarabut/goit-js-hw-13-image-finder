import './styles.css';
import ApiService from './scripts/apiService.js'
import cardPhotoTpl from './templates/cardPhoto.hbs'
// import { alert, error } from'@pnotify/core';
// import"@pnotify/core/dist/BrightTheme.css"
// import"@pnotify/core/dist/PNotify.css";

const gallery = document.querySelector('.gallery')
const searchField = document.querySelector('.search-field')
const LoadMoreBtn = document.querySelector('.button')
var debounce = require('lodash.debounce');

const apiService = new ApiService()
searchField.addEventListener('input', debounce(onSearchImg,1000))
LoadMoreBtn.addEventListener('click', onLoadMore)

function onSearchImg(e) {
    e.preventDefault()
    apiService.query = e.target.value

    apiService.resetPage()
    apiService.fetchArticles().then(hits => {
        clearMarkupPhotoCard()
        renderMarkupPhotoCard(hits)
    })
    


}

function onLoadMore() {
 apiService.fetchArticles().then(renderMarkupPhotoCard)

}


function renderMarkupPhotoCard(hits) {
    const markup = cardPhotoTpl(hits)
    gallery.insertAdjacentHTML('beforeend', markup)

}

function clearMarkupPhotoCard() {
    gallery.innerHTML = ''
}


