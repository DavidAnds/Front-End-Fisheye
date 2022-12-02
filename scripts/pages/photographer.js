// Pour récuperrez l'URL dans params page
const url = (new URL(document.location)).searchParams
const id = url.get('id')

// *********************************************************
// ********************** Récupérration des données
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

// *************************************************************
// ***************************** Display
// Fonction qui met en place le profil du photographe dans le DOM
async function displayPhotographer (photographer) {
  const photographHeader = document.querySelector('.photograph-header')
  const photographModel = photographerFactory(photographer)
  const photographPriceBox = document.querySelector('.photograph-price-box')
  const modalTitle = document.querySelector('.modal_title')
  const photographIntro = photographModel.getPhotographIntroDOM()
  const photographPic = photographModel.getPhotographPictureDOM()
  const photographPrice = photographModel.getPriceParagraphDOM()
  const modalText = photographModel.getModalTitleText()
  photographHeader.appendChild(photographIntro)
  photographHeader.appendChild(photographPic)
  photographPriceBox.appendChild(photographPrice)
  modalTitle.innerHTML = modalText
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

// **********************************************
// ******************  Filter
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
    default: mediasSort = medias.sort((a, b) => b.likes - a.likes)
  }

  return mediasSort
}

// ****************************************************
// *************************** LIKE
// Comportement lorsque que on like un des medias
function handleMediaLike (btn, media) {
  // Quand le media est deja liker: on le dislike
  if (media.liked) {
    media.likes -= 1
    media.liked = false
    refreshLike(btn, media)
  } else {
    // Sinon on le like
    media.likes += 1
    media.liked = true
    refreshLike(btn, media)
  }
}

// Rafrachis la valeur like du media sur le DOM
function refreshLike (btn, media) {
  btn.innerHTML = `<p class="media-like"> 
    ${media.likes}
    <i 
     class="media-like-icon ${media.liked ? 'icon_liked' : ''} fa-solid fa-heart"
     aria-label="likes
    ">
    </i>
  </p>`
}

// Fonction qui afffiche le nombre like au chargement de la page
function displayAllLikes (medias) {
  let allLikes = 0
  const allLikesBox = document.querySelector('.photograph-likes-box')
  medias.forEach(media => { allLikes += media.likes })
  if (allLikesBox.hasChildNodes()) {
    allLikesBox.innerHTML = ''
  }
  const mediaModel = mediaFactory('', allLikes)
  const allLikesParagraph = mediaModel.getAllLikesDom()
  allLikesBox.appendChild(allLikesParagraph)
}

// ****************************************************
// *************************** LIGHTBOX
const prevBtn = document.querySelector('.lightbox-arrow_prev')
const nextBtn = document.querySelector('.lightbox-arrow_next')
const closeLightboxBtn = document.querySelector('.lightbox-close')
const lightboxBg = document.querySelector('.lightbox-bg')

closeLightboxBtn.addEventListener('click', () => {
  lightboxBg.style.display = 'none'
})

function displayMediaInLightbox (media) {
  const lightbox = document.querySelector('.lightbox-item')
  const mediaModel = mediaFactory(media)
  const mediaLight = mediaModel.getMediaInLightboxDOM()

  if (lightbox.hasChildNodes) {
    lightbox.innerHTML = ''
  }

  lightbox.appendChild(mediaLight)
}

// *****************************************************
// ********************** INITIALISATION
async function initMedia (filter) {
  const { medias } = await getMedia(id)
  const mediasSort = sortMedias(medias, filter)
  displayMedia(mediasSort)
  displayAllLikes(mediasSort)

  // Comportement lorsque on appuie sur le bouton like
  const likeBtns = document.querySelectorAll('.media-like')
  likeBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      handleMediaLike(btn, mediasSort[index])
      displayAllLikes(mediasSort)
    })
  })

  // LightBox
  let lightboxIndex = 0

  // Comportement quand on click sur les mediaLinks
  const mediaLinks = document.querySelectorAll('.media-link')
  mediaLinks.forEach((link, index) => {
    link.addEventListener('click', () => {
      lightboxIndex = index
      displayMediaInLightbox(mediasSort[lightboxIndex])
      lightboxBg.style.display = 'block'
    })
  })

  // Au click on fais apparaitre le media précendent
  prevBtn.addEventListener('click', () => {
    if (lightboxIndex > 0) {
      lightboxIndex -= 1
    } else {
      lightboxIndex = mediasSort.length - 1
    }
    displayMediaInLightbox(mediasSort[lightboxIndex])
  })

  // Au click on fais apparaitre le media suivant
  nextBtn.addEventListener('click', () => {
    if (lightboxIndex < mediasSort.length - 1) {
      lightboxIndex -= 1
    } else {
      lightboxIndex = 0
    }
    displayMediaInLightbox(mediasSort[lightboxIndex])
  })
}

// Récupere les données du photographe et les affiche dans le DOM
async function initPhotograph () {
  const { photographer } = await getPhotographerById(id)
  displayPhotographer(photographer)
}

initMedia()
initPhotograph()
