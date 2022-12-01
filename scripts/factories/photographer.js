function photographerFactory (data) {
  const { name, portrait, city, country, tagline, price, id } = data

  const picture = `assets/photographers/${portrait}`

  function getModalTitleText () {
    const text = `Contactez-moi <br> ${name}`

    return text
  }
  // Creation de un paragraph price dans le dom
  function getPriceParagraphDOM () {
    const p = document.createElement('p')
    p.innerText = `${price}/Jour`
    p.className = 'photograph-price'
    return p
  }

  // Création de 1 carte photograph-item avec img h2 et p
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

  // Création d'une div photograph-intro qui comprend 1 titre et 2 p
  function getPhotographIntroDOM () {
    const div = document.createElement('div')
    div.innerHTML = `
    <h1 class="photograph-name">
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

  // Création d'une img avec la class photograph-pic
  function getPhotographPictureDOM () {
    const img = document.createElement('img')
    img.setAttribute('src', picture)
    img.className = 'photograph-pic'
    return img
  }

  return { name, picture, getUserCardDOM, getPhotographIntroDOM, getPhotographPictureDOM, getPriceParagraphDOM, getModalTitleText }
}
