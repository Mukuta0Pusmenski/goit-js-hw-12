import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { displayImages } from './js/render-functions.js';

const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const imageResults = document.getElementById('image-results');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = searchInput.value.trim();
    const regex = /^[a-zA-Z0-9\s]+$/;
    if (!query || !regex.test(query)) {
        iziToast.error({
            title: 'Error',
            message: 'Invalid search query. Please enter a valid search term.',
        });
        return;
    }

    try {
        const data = await fetchImages(query);

        if (data.hits.length === 0) {
            iziToast.error({
                title: 'Sorry',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                backgroundColor: 'red',
                position: 'center',
                timeout: 5000,
            });
            return;
        }

        displayImages(data.hits, imageResults);
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: `An error occurred: ${error.message}`,
        });
    }
});
