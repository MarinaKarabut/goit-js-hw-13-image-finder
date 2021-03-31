import './styles.css';
import ApiService from './scripts/apiService.js'
import cardPhotoTpl from './templates/cardPhoto.hbs'
import * as basicLightbox from 'basiclightbox'
import 'basiclightbox/dist/basicLightbox.min.css';
import { alert, error } from'@pnotify/core';
import"@pnotify/core/dist/BrightTheme.css"
import"@pnotify/core/dist/PNotify.css";


var debounce = require('lodash.debounce');

const gallery = document.querySelector('.gallery')
const searchField = document.querySelector('.search-field')
const LoadMoreBtn = document.querySelector('.button')



const apiService = new ApiService()
searchField.addEventListener('input', debounce(onSearchImg,1000))
LoadMoreBtn.addEventListener('click', onLoadMore)
gallery.addEventListener('click', function (e) {
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    const largeImageURL = e.target.dataset.source
  if (largeImageURL) {
    const instance = basicLightbox.create(`
      <img src="${largeImageURL}" width="1200" height="800">
  `)
      instance.show()
  }
}
)


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
    const clientHeight = document.documentElement.clientHeight
    window.scrollTo({
    left: 0,
    top: clientHeight,
    behavior: 'smooth'
});
}


function renderMarkupPhotoCard(hits) {
    const markup = cardPhotoTpl(hits)
    gallery.insertAdjacentHTML('beforeend', markup)

}

function clearMarkupPhotoCard() {
    gallery.innerHTML = ''
}















// import { alert, error } from'@pnotify/core';
// import"@pnotify/core/dist/BrightTheme.css"
// import"@pnotify/core/dist/PNotify.css";



