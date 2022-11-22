// Mettre le code JavaScript lié à la page photographer.html
async function getPhotographerById () {
  try {
    // On récupere les données
    const response = await fetch('../../data/photographers.json')
    const { photographers } = await response.json()
    // On garde recupérre l'id du photographe dans l'url
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

async function init () {
// On récuperre l'id à partir de l'url
  const { photographer } = await getPhotographerById()
  console.log(photographer)
}

init()
