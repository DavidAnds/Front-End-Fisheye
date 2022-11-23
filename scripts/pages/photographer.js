// Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerById (id) {
  try {
    // On récupere les données
    const response = await fetch('../../data/photographers.json')
    const { photographers } = await response.json()
    const photographer = photographers.filter(photographer => photographer.id === Number(id))

    // On retourne les données de ce photographe
    return ({ photographer: photographer[0] })
  } catch (error) {
    console.log(error)
  }
}

async function getMedia (id) {
  try {
    // On récupere les données
    const response = await fetch('../../data/photographers.json')
    const { media } = await response.json()
    const medias = media.filter(media => media.photographerId === Number(id))

    // On retourne tous les médias
    return ({ medias })
  } catch (error) {
    console.log(error)
  }
}

// Fonction qui va ajouter à notre DOM 1 div intro et 1div img avec les datas provenant de notre photograph
async function displayHeader (photographer) {
  const photographHeader = document.querySelector('.photograph-header')
  const photographModel = photographerFactory(photographer)
  const photographIntro = photographModel.getPhotographIntroDOM()
  const photographPic = photographModel.getPhotographPictureDOM()
  photographHeader.appendChild(photographIntro)
  photographHeader.appendChild(photographPic)
}

// function qui met en place les media dans le DOM
async function displayMedia (medias) {
  const photographMedias = document.querySelector('.photograph-medias')
  medias.forEach(media => {
    const mediaModel = mediaFactory(media)
    const mediaItemDom = mediaModel.getMediaItemDOM()
    photographMedias.appendChild(mediaItemDom)
  })
}
async function init () {
  // On recupérre l'id du photographe dans l'url
  const url = (new URL(document.location)).searchParams
  const id = url.get('id')
  const { photographer } = await getPhotographerById(id)
  const { medias } = await getMedia(id)
  displayHeader(photographer)
  displayMedia(medias)
}

init()
