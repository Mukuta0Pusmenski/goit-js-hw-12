import axios from 'axios';

const API_KEY = '47345734-08f76e4fa789f0ddb3136f311'; // Замініть на ваш унікальний ключ
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, per_page = 15) {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: page,
                per_page: per_page
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch images');
    }
}
