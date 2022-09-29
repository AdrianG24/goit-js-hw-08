import { galleryItems } from '../gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');

createGallery();

gallery.addEventListener('click', event => {
  event.preventDefault();
});

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function createGallery() {
  let markup = galleryItems
    .map(
      ({ preview, original, description }) => `
    <a class="gallery__item" href="${original}">
        <img class="gallery__image" src="${preview}" alt="${description}" />
    </a>`
    )
    .join('\n');

  gallery.insertAdjacentHTML('beforeend', markup);
}
// console.log(galleryItems);
