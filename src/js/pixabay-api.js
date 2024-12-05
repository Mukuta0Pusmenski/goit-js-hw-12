const API_KEY = '47345734-08f76e4fa789f0ddb3136f311'; // Замініть на ваш унікальний ключ

export async function fetchImages(query) {
    const response = await fetch(`https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true`);
    if (!response.ok) {
        throw new Error('Failed to fetch images');
    }
    return response.json();
}
