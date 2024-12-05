export function displayImages(images, container) {
    container.innerHTML = images.map(image => `
        <div class="image-item">
            <img src="${image.webformatURL}" alt="${image.tags}">
            <div class="image-stats">
                <p>Likes: ${image.likes}</p>
                <p>Views: ${image.views}</p>
                <p>Comments: ${image.comments}</p>
                <p>Downloads: ${image.downloads}</p>
            </div>
        </div>
    `).join('');
}
