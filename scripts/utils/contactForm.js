const firstInput = document.getElementById('first')
const lastInput = document.getElementById('last')
const emailInput = document.getElementById('email')
const messageInput = document.getElementById('message')
const form = document.querySelector('form')

function displayModal () {
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'block'
}

function closeModal () {
  const modal = document.getElementById('contact_modal')
  modal.style.display = 'none'
}

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

function handleSubmit (e) {
  e.preventDefault()

  if (firstInput.value.length >= 3 &&
    lastInput.value.length >= 3 &&
    emailRegex.test(emailInput.value) &&
    messageInput.value.length >= 3) {
    closeModal()
    console.log(firstInput.value, lastInput.value, emailInput.value, messageInput.value)
    form.reset()
  } else {
    alert('vous devez remplir chacunes des entrées!')
  }
}

form.addEventListener('submit', handleSubmit)
