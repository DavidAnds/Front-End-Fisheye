function photographerFactory (data) {
  const { name, portrait, city, country, tagline, price, id } = data

  const picture = `assets/photographers/${portrait}`

  function getModalTitleText () {
    const text = `Contactez-moi <br> ${name}`
    return text
  }

  function getModalAriaLabel () {
    const text = `Contactez-moi ${name}`
    return text
  }

  function getPriceParagraphDOM () {
    const p = document.createElement('p')
    p.innerText = `${price}/Jour`
    p.className = 'photograph-price'
    return p
  }

  function getUserCardDOM () {
    const article = document.createElement('article')
    article.innerHTML = `
    <a href="./photographer.html?id=${id}" aria-label="${name}">
      <img src="${picture}" alt="" class="photographer_img">
      <h2 class="photographer_name">${name}</h2>
    </a>
    <p class="photographer_location">${city}, ${country}</p>
    <p class="photographer_tagline">${tagline}</p>
    <p class="photographer_price">${price}€/jour</p>
    `
    article.className = 'photographer_item'
    return article
  }

  function getPhotographIntroDOM () {
    const div = document.createElement('div')
    div.innerHTML = `
    <h1 class="photograph-name" id="name">
      ${name}
    </h1>
    <p class="photograph-location">
      ${city}, ${country}
    </p>
    <p class="photograph-tagline">
      ${tagline}
    </p>
    `
    div.className = 'photograph-intro'
    return div
  }

  function getPhotographPictureDOM () {
    const img = document.createElement('img')
    img.setAttribute('src', picture)
    img.setAttribute('alt', name)
    img.className = 'photograph-pic'
    return img
  }

  return { name, picture, getUserCardDOM, getPhotographIntroDOM, getPhotographPictureDOM, getPriceParagraphDOM, getModalTitleText, getModalAriaLabel }
}
