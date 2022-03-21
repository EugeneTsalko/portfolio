// translate, theme and localStorage

import i18Obj from './translate.js';

const langEn = document.querySelector('.lang-en');
const langRu = document.querySelector('.lang-ru');
let lang = localStorage.getItem('lang') || 'en';

const lightThemeList = document.querySelectorAll('body,.hero-wrapper,.header-logo-link,.nav-wrapper,.list-item-link,.burger,.line,.lang,.theme-switch,.hero-title,.hero-text,.button,.section,.section-title,.skills-list-item,.portfolio-buttons-item,.price-item-title,.price-item-price,.price-item-description-text,.contacts-wrapper,.contacts-info-title,.contacts-form-input,.contacts-form-textarea,.footer-list-item,.footer-list-item-link,.socials-item-link');
const switchTheme = document.querySelector('.theme-switch');
let theme = localStorage.getItem('theme') || 'dark-theme';

const setLocalStorage = () => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('lang', lang);
}

window.addEventListener('beforeunload', setLocalStorage);

const getLocalStorage = () => {
    if (localStorage.getItem('theme') === 'light-theme') {
        lightThemeList.forEach((el) => el.classList.add('light-theme'));
    }
    if (localStorage.getItem('lang') === 'ru') {
        langRu.classList.add('active');
        langEn.classList.remove('active');
        getTranslate(lang);
    }
}

const themeClickHandler = () => {
    theme === 'dark' ? theme = 'light-theme' : theme = 'dark';
    lightThemeList.forEach((el) => el.classList.toggle('light-theme'));
}

window.addEventListener('load', getLocalStorage);

const toggleSwitchLang = (event) => {
    if (event.target.classList.contains('active') || event.target.classList.contains('lang-border')) {
        return;
    }
    if (event.target.classList.contains('lang-ru')) {
        langEn.classList.remove('active');
        langRu.classList.add('active');
    } else {
        langRu.classList.remove('active');
        langEn.classList.add('active');
    }
    lang === 'en' ? lang = 'ru' : lang = 'en'
    getTranslate(lang);
}

const getTranslate = (lang) => {
    let dataList = document.querySelectorAll('[data-i18]');
    dataList.forEach((el) => {
        el.textContent = i18Obj[lang][el.dataset.i18];
        if (el.placeholder) {
            el.placeholder = i18Obj[lang][el.dataset.i18]
            el.textContent = '';
        }
    });
}

langEn.addEventListener('click', toggleSwitchLang);
langRu.addEventListener('click', toggleSwitchLang);
switchTheme.addEventListener('click', themeClickHandler);

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