import { fetchImages } from './js/pixabay-api.js';
import { displayImages } from './js/render-functions.js';

const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const imageResults = document.getElementById('image-results');
const loadMoreButton = document.getElementById('load-more');
const loader = document.getElementById('loader');

let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    currentQuery = searchInput.value.trim();
    currentPage = 1;

    const regex = /^[a-zA-Z0-9\s]+$/;
    if (!currentQuery || !regex.test(currentQuery)) {
        iziToast.error({
            title: 'Error',
            message: 'Invalid search query. Please enter a valid search term.',
        });
        return;
    }

    imageResults.innerHTML = ''; // очистити попередні результати
    loadMoreButton.style.display = 'none'; // сховати кнопку догрузки
    loader.style.display = 'block'; // показати індикатор завантаження

    try {
        const data = await fetchImages(currentQuery, currentPage);

        if (data.hits.length === 0) {
            iziToast.error({
                title: 'Sorry',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                backgroundColor: 'red',
                position: 'center',
                timeout: 5000,
            });
            loader.style.display = 'none'; // приховати індикатор завантаження
            return;
        }

        displayImages(data.hits, imageResults);
        loadMoreButton.style.display = 'block'; // показати кнопку догрузки

        const lightbox = new SimpleLightbox('.image-item a', {
            captions: true,
            captionsData: 'alt',
            captionDelay: 250,
        });

        lightbox.refresh();
        loader.style.display = 'none'; // приховати індикатор завантаження
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: `An error occurred: ${error.message}`,
        });
        loader.style.display = 'none'; // приховати індикатор завантаження
    }
});

loadMoreButton.addEventListener('click', async () => {
    currentPage += 1;
    loader.style.display = 'block'; // показати індикатор завантаження

    try {
        const data = await fetchImages(currentQuery, currentPage);

        if (data.hits.length === 0) {
            iziToast.error({
                title: 'End of results',
                message: 'No more images to load.',
                backgroundColor: 'yellow',
                position: 'center',
                timeout: 5000,
            });
            loadMoreButton.style.display = 'none'; // сховати кнопку догрузки
            loader.style.display = 'none'; // приховати індикатор завантаження
            return;
        }

        displayImages(data.hits, imageResults, true); // додати нові зображення

        const lightbox = new SimpleLightbox('.image-item a', {
            captions: true,
            captionsData: 'alt',
            captionDelay: 250,
        });

        lightbox.refresh();

        loader.style.display = 'none'; // приховати індикатор завантаження

        // Скрол до нових зображень
        window.scrollBy({
            top: document.documentElement.clientHeight,
            behavior: 'smooth'
        });
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: `An error occurred: ${error.message}`,
        });
        loader.style.display = 'none'; // приховати індикатор завантаження
    }
});
