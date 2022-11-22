async function getPhotographers () {
  try {
    // Penser à remplacer par les données récupérées dans le json
    const response = await fetch('../../data/photographers.json')
    const { photographers } = await response.json()

    // et bien retourner le tableau photographers seulement une fois
    return ({ photographers })
  } catch (error) {
    console.log(error)
  }
}

async function displayData (photographers) {
  const photographersSection = document.querySelector('.photographer_section')

  // Pour chacun des photographe on crée un article que on va inséré dans photographers_section
  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
};

async function init () {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers()
  displayData(photographers)
};

init()
