// Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerById () {
  try {
    // On récupere les données
    const response = await fetch('../../data/photographers.json')
    const { photographers } = await response.json()
    // On recupérre l'id du photographe dans l'url
    const url = (new URL(document.location)).searchParams
    const id = url.get('id')
    // On garde uniquement les données du photographe avec l'id de l'URL
    const photographer = photographers.filter(photographer => photographer.id === Number(id))

    // On retourne les données de ce photographe
    return ({ photographer: photographer[0] })
  } catch (error) {
    console.log(error)
  }
}

// Fonction qui va ajouter à notre DOM 1 div intro et 1div img avec les datas provenant de notre photograph
async function displayHeader(photographer) {
  const photographHeader = document.querySelector('.photograph-header')
  const photographModel = photographerFactory(photographer)
  const photographIntro = photographModel.getPhotographIntroDOM()
  const photographPic = photographModel.getPhotographPictureDOM()
  photographHeader.appendChild(photographIntro)
  photographHeader.appendChild(photographPic)
}

async function init () {
  const { photographer } = await getPhotographerById()
  displayHeader(photographer)
}

init()
