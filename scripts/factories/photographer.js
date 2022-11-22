function photographerFactory (data) {
  const { name, portrait, city, country, tagline, price } = data

  const picture = `assets/photographers/${portrait}`

  function getUserCardDOM () {
    const article = document.createElement('article')
    article.innerHTML = `
    <img src="${picture}" alt="picture of ${name}" class="photographer_img">
    <h2 class="photographer_name">${name}</h2>
    <p class="photographer_location">${city}, ${country}</p>
    <p class="photographer_tagline">${tagline}</p>
    <p class="photographer_price">${price}€/jour</p>
    `
    article.className = 'photographer_item'
    return article
  }
  return { name, picture, getUserCardDOM }
}
