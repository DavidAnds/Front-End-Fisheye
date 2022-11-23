function mediaFactory (data) {
  const { image, video, title, likes, photographerId } = data

  const routes = `./assets/media/photograph-id-${photographerId}/`

  function getMediaItemDOM () {
    const article = document.createElement('article')
    article.className = 'media-item'
    if (video) {
      article.innerHTML = `
      <img src="${routes + video}" alt="" class="media-img">
      <div class="media-text-container">
        <h2 class="media-name">${title}</h2>
        <p class="media-like">
          ${likes}
          <i class="fa-solid fa-heart"></i>
        </p>
      </div>
        `
    }

    if (image) {
      article.innerHTML = `
        <img src="${routes + image}" alt="" class="media-img">
        <div class="media-text-container">
          <h2 class="media-name">${title}</h2>
          <p class="media-like">
            ${likes}
            <i class="fa-solid fa-heart"></i>
          </p>
        </div>
        `
    }
    return article
  }
  return { getMediaItemDOM }
}
