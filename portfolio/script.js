const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-wrapper');
const overlay = document.querySelector('.overlay');

const toggleBurger = () => {
    burger.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
}

const closeBurger = (event) => {
    if (event.target.classList.contains('list-item-link') || (event.target.classList.contains('overlay'))) {
        burger.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
    }
}

burger.addEventListener('click', toggleBurger);
nav.addEventListener('click', closeBurger);
overlay.addEventListener('click', closeBurger);