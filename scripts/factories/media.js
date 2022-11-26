function mediaFactory (data) {
  const { image, video, title, likes, photographerId } = data

  const routes = `./assets/media/photograph-id-${photographerId}/`

  function getMediaItemDOM () {
    const article = document.createElement('article')
    article.className = 'media-item'
    if (video) {
      article.innerHTML = `
      <video src="${routes + video}" alt="" class="media-img">
      </video>
      <div class="media-text-container">
        <h2 class="media-name">${title}</h2>
        <p class="media-like">
          ${likes}
          <i class="media-like-btn fa-solid fa-heart" aria-label="likes"></i>
        </p>
      </div>
        `
    }

    if (image) {
      article.innerHTML = `
        <a href="#" class="media-img-link" aria-label="${title}, closeup view">
          <img src="${routes + image}" alt="" class="media-img">
        </a>
        <div class="media-text-container">
          <h2 class="media-name">${title}</h2>
          <p class="media-like">
            ${likes}
            <i class="media-like-btn fa-solid fa-heart" aria-label="likes"></i>
          </p>
        </div>
        `
    }
    return article
  }
  return { getMediaItemDOM }
}
