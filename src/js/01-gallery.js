import { galleryItems } from './gallery-items.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryRef = document.querySelector('.gallery');

const createImgCards = galleryItems
  .map(({ preview, original, description }) => {
    return `<a class="gallery__item" rel="noopener noreferrer" href= "${original}">
    <img
      class="gallery__image"
      src="${preview}"
      href="${original}"
      alt = "${description}"
     "
    />
  </a>`;
  })
  .join('');

galleryRef.insertAdjacentHTML('afterbegin', createImgCards);

const gallery = new SimpleLightbox('.gallery a', {
  // captionsData: 'alt',
  // widthRatio: 0.5,
  // captionsDelay: 5000,
});
