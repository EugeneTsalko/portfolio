// burger menu code

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

// portfolio buttons code

const portfolioBtn = document.querySelectorAll('.portfolio-buttons-item');
const portfolioAllBtns = document.querySelector('.portfolio-buttons');
const portfolioImages = document.querySelectorAll('.portfolio-images-item');

const togglePortfolioSeasons = (event) => {
    if (event.target.classList.contains('portfolio-buttons-item')) {
        if (event.target.classList.contains('active')) {
            return;
        }
        portfolioBtn.forEach((btn) => btn.classList.remove('active'));
        event.target.classList.add('active');
        portfolioImages.forEach((img, idx) => {
            img.style.backgroundImage = `url(./assets/img/jpg/${event.target.id}/${idx + 1}.jpg)`;
        });
    }
}

portfolioAllBtns.addEventListener('click', togglePortfolioSeasons);

// 