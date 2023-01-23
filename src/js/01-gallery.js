import { galleryItems } from './gallery-items.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryRef = document.querySelector('.gallery');

function createImgCards(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<a class="gallery__item" rel="noopener noreferrer" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt = "${description}"
     "
    />
  </a>`;
    })
    .join('');
}

const cardsMakeup = createImgCards(galleryItems);
galleryRef.innerHTML = cardsMakeup;

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 500,
});
