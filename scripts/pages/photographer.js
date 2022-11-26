// Pour récuperrez la page
const url = (new URL(document.location)).searchParams
const id = url.get('id')

// Filter
const popularFilter = document.querySelector('.filter-btn_popular')
const dateFilter = document.querySelector('.filter-btn_date')
const titleFilter = document.querySelector('.filter-btn_title')
const dropdownFilter = document.querySelector('.filter-btn_dropdown')

// Ouvre le dropdown qui fais apparaitre tous les boutons du filtre
dropdownFilter.addEventListener('click', () => {
  dropdownFilter.classList.toggle('filter-btn_dropdown-show')
})

// Quand on clique sur un bouton du filtre, il y a rechargement de toutes les medias trié en fonction du  filtre
popularFilter.addEventListener('click', () => {
  initMedia('popular')
  dropdownFilter.innerHTML = 'Popularité <i class="filter-chevron fa-solid fa-chevron-down"></i>'
})
dateFilter.addEventListener('click', () => {
  initMedia('date')
  dropdownFilter.innerHTML = 'Date <i class="filter-chevron fa-solid fa-chevron-down"></i>'
})
titleFilter.addEventListener('click', () => {
  initMedia('title')
  dropdownFilter.innerHTML = 'Titre <i class="filter-chevron fa-solid fa-chevron-down"></i>'
})

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

// Fonction qui met en place le profil du photographe dans le DOM
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

  if (photographMedias.hasChildNodes()) {
    photographMedias.innerHTML = ''
  }

  medias.forEach(media => {
    const mediaModel = mediaFactory(media)
    const mediaItemDom = mediaModel.getMediaItemDOM()
    photographMedias.appendChild(mediaItemDom)
  })
}

// Récupere les données du photographe et les mets dans le DOM
async function initPhotograph () {
  const { photographer } = await getPhotographerById(id)

  displayHeader(photographer)
}

// function qui trie les medias
function sortMedias (medias, filter) {
  let mediasSort = medias
  switch (filter) {
    case 'date':
      mediasSort = medias.sort((a, b) => new Date(b.date) - new Date(a.date))
      break
    case 'popular':
      mediasSort = medias.sort((a, b) => b.likes - a.likes)
      break
    case 'title':
      mediasSort = medias.sort((a, b) => a.title.localeCompare(b.title))
      break
    default: mediasSort = medias
  }

  return mediasSort
}

async function initMedia (filter) {
  const { medias } = await getMedia(id)
  const mediasSort = sortMedias(medias, filter)
  displayMedia(mediasSort)
}

initMedia('popular')
initPhotograph()
