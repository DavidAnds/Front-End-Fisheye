// Pour récuperrez l'URL dans params page
const url = (new URL(document.location)).searchParams
const id = url.get('id')

// *********************************************************
// ********************** Récupérration des données
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
async function displayPhotographer (photographer) {
  const photographHeader = document.querySelector('.photograph-header')
  const photographModel = photographerFactory(photographer)
  const photographPriceBox = document.querySelector('.photograph-price-box')
  const contact = document.querySelector('#contact_modal')
  const modalTitle = document.querySelector('.modal_title')
  const photographIntro = photographModel.getPhotographIntroDOM()
  const photographPic = photographModel.getPhotographPictureDOM()
  const photographPrice = photographModel.getPriceParagraphDOM()
  const modalText = photographModel.getModalTitleText()
  const modalAria = photographModel.getModalAriaLabel()
  photographHeader.appendChild(photographIntro)
  photographHeader.appendChild(photographPic)
  photographPriceBox.appendChild(photographPrice)
  contact.setAttribute('aria-label', modalAria)
  modalTitle.innerHTML = modalText
}

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

function displayMediaInLightbox (media) {
  const lightbox = document.querySelector('.lightbox-item')
  const mediaModel = mediaFactory(media)
  const mediaLight = mediaModel.getMediaInLightboxDOM()

  if (lightbox.hasChildNodes) {
    lightbox.innerHTML = ''
  }

  lightbox.appendChild(mediaLight)
}

// **********************************************
// ******************  Filter
const popularFilter = document.querySelector('.filter-btn_popular')
const dateFilter = document.querySelector('.filter-btn_date')
const titleFilter = document.querySelector('.filter-btn_title')
const dropdownFilter = document.querySelector('.filter-btn_dropdown')

// Ouvre le dropdown qui fais apparaitre tous les boutons du filtre
let dropdown = false
dropdownFilter.addEventListener('click', () => {
  dropdownFilter.classList.toggle('filter-btn_dropdown-show')
  if (!dropdown) {
    dropdown = true
    dropdownFilter.setAttribute('aria-expanded', dropdown)
  } else {
    dropdown = false
    dropdownFilter.setAttribute('aria-expanded', dropdown)
  }
})

// Quand on clique sur un bouton du filtre, il y a rechargement de toutes les medias trié en fonction du filtre
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

// ****************************************************
// *************************** LIGHTBOX
const prevBtn = document.querySelector('.lightbox-arrow_prev')
const nextBtn = document.querySelector('.lightbox-arrow_next')
const closeLightboxBtn = document.querySelector('.lightbox-close')
const lightboxBg = document.querySelector('.lightbox-bg')

closeLightboxBtn.addEventListener('click', () => {
  lightboxBg.style.display = 'none'
})

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

  let lightboxIndex = 0
  // Comportement quand on click sur l'image d'un média
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
      lightboxIndex += 1
    } else {
      lightboxIndex = 0
    }
    displayMediaInLightbox(mediasSort[lightboxIndex])
  })

  document.addEventListener('keyup', function (event) {
    if (event.code === 'ArrowLeft') {
      if (lightboxIndex > 0) {
        lightboxIndex -= 1
      } else {
        lightboxIndex = mediasSort.length - 1
      }
      displayMediaInLightbox(mediasSort[lightboxIndex])
    }

    if (event.code === 'ArrowRight') {
      if (lightboxIndex < mediasSort.length - 1) {
        lightboxIndex += 1
      } else {
        lightboxIndex = 0
      }
      displayMediaInLightbox(mediasSort[lightboxIndex])
    }
  })
}

async function initPhotograph () {
  const { photographer } = await getPhotographerById(id)
  displayPhotographer(photographer)
}

initMedia()
initPhotograph()
