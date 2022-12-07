function mediaFactory (data, allLikes) {
  const { image, video, title, likes, photographerId } = data

  function getAllLikesDom () {
    const p = document.createElement('p')
    p.innerHTML = `
        ${allLikes} <i class="all-likes-icon fa-solid fa-heart"></i>
      `
    p.className = 'photograph-all-likes'
    return p
  }

  const routes = `./assets/media/photograph-id-${photographerId}/`
  function getMediaItemDOM () {
    const article = document.createElement('article')
    article.className = 'media-item'
    if (video) {
      article.innerHTML = `
      <a href="#" class="media-link" aria-label="${title}, closeup view">
        <video alt="" class="media-img">
          <source src='${routes + video}' type="video/mp4"
        </video>
      </a>
      <div class="media-text-container">
        <h2 class="media-name">${title}</h2>
        <p class="media-like" aria-label="likes" tabindex="0">
          ${likes}
          <i class="media-like-icon fa-solid fa-heart"></i>
        </p>
      </div>
        `
    }

    if (image) {
      article.innerHTML = `
        <a href="#" class="media-link" aria-label="${title}, closeup view">
          <img src="${routes + image}" alt="" class="media-img">
        </a>
        <div class="media-text-container">
          <h2 class="media-name">${title}</h2>
          <p class="media-like" aria-label="likes" tabindex="0">
            ${likes}
            <i class="media-like-icon fa-solid fa-heart" ></i>
          </p>
        </div>
        `
    }
    return article
  }

  function getMediaInLightboxDOM () {
    const article = document.createElement('article')
    article.className = 'lightbox-article'
    if (video) {
      article.innerHTML = `
      <video alt='${title}' controls autoplay class="lightbox-media">
        <source src='${routes + video}' type="video/mp4">
      </video>
      <h2 class="lightbox-title"> ${title}</h2>
      `
    }
    if (image) {
      article.innerHTML = `
      <img src="${routes + image}" alt="${title}" class="lightbox-media">
      <h2 class="lightbox-title"> ${title}</h2>
      `
    }
    return article
  }

  return { getMediaItemDOM, getAllLikesDom, getMediaInLightboxDOM }
}
