export function displayImages(images, container, append = false) {
    const markup = images.map(image => `
        <div class="image-item">
            <a href="${image.largeImageURL}" data-lightbox="image-gallery" data-title="Likes: ${image.likes}, Views: ${image.views}, Comments: ${image.comments}, Downloads: ${image.downloads}">
                <img src="${image.webformatURL}" alt="${image.tags}">
            </a>
            <div class="image-stats">
                <p>Likes: ${image.likes}</p>
                <p>Views: ${image.views}</p>
                <p>Comments: ${image.comments}</p>
                <p>Downloads: ${image.downloads}</p>
            </div>
        </div>
    `).join('');

    if (append) {
        container.innerHTML += markup;
    } else {
        container.innerHTML = markup;
    }
}
