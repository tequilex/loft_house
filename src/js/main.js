import mask from "./libs/phoneMask/mask"
import './libs/youtubeLightbox/youtubeLightbox.js'


const navBtn = document.querySelector('.nav-icon-btn')
const iconBtn = document.querySelector('.nav-icon')
const nav = document.querySelector('.header__top-row')

navBtn.onclick = () => {
  iconBtn.classList.toggle('nav-icon--active');
  nav.classList.toggle('header__top-row--mobile');
  document.body.classList.toggle('no-scroll')
}

mask('[data-tel-input]')

const phoneInputs = document.querySelectorAll('[data-tel-input]')

phoneInputs.forEach((input) => {
  input.addEventListener('input', () => {
    if (input.value == '+') input.value = ''
  })
  input.addEventListener('blur', () => {
    if (input.value == '+') input.value = ''
  })
})
