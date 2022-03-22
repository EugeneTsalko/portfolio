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

// Videoplayer

function changeClassPaused(event) {
    if (
      event.target.classList.contains("video__screen") ||
      event.target.classList.contains("video__play-button") ||
      event.target.classList.contains("video__controls-play") ||
      event.target.classList.contains("video__controls-play-button")
    ) {
      thumbnail.classList.toggle("paused");
    }
  }
  
  function changeClassMute(event) {
    if (event.target.classList.contains("video__controls-speaker-icon")) {
      if (currentVolume != 0) {
        volumeButton.classList.toggle("mute");
        changeVolume();
      }
    }
    if (event.target.classList.contains("video__controls-volume")) {
      if (video.volume === 0) {
        volumeButton.classList.add("mute");
      } else {
        volumeButton.classList.remove("mute");
      }
    }
  }
  
  function changeVolume() {
    if (volumeButton.classList.contains("mute")) {
      video.volume = 0;
    } else {
      video.volume = currentVolume;
    }
    volume.value = video.volume;
    volume.style.background = `linear-gradient(to right, #BDAE82 0%, #BDAE82 ${
      volume.value * 100
    }%, #C8C8C8 ${volume.value * 100}%, #C8C8C8 100%)`;
  }
  
  function currentTime() {
    let currentMinutes = Math.floor(video.currentTime / 60);
    let currentSeconds = Math.floor(video.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(video.duration / 60);
    let durationSeconds = Math.floor(video.duration - durationMinutes * 60);
  
    currentTimeElement.innerHTML = `${currentMinutes}:${
      currentSeconds < 10 ? "0" + currentSeconds : currentSeconds
    }`;
    durationTimeElement.innerHTML = `${durationMinutes}:${
      durationSeconds < 10 ? "0" + durationSeconds : durationSeconds
    }`;
  }
  
  function playPauseVideo() {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
  
  function scrub(event) {
    video.currentTime =
      (event.offsetX / progressBar.offsetWidth) * video.duration;
    progressBar.style.background = `linear-gradient(to right, #BDAE82 0%, #BDAE82 ${
      (event.offsetX / progressBar.offsetWidth) * 100
    }%, #C8C8C8 ${
      (event.offsetX / progressBar.offsetWidth) * 100
    }%, #C8C8C8 100%)`;
  }
  
  const thumbnail = document.querySelector(".video__thumbnail");
  const video = thumbnail.querySelector(".video__screen");
  const controls = thumbnail.querySelector(".video__controls");
  const playIcon = thumbnail.querySelector(".video__play-button");
  const playButton = thumbnail.querySelector(".video__controls-play");
  const progressBar = thumbnail.querySelector(".video__controls-progress");
  const volumeButton = thumbnail.querySelector(".video__controls-speaker");
  const volume = thumbnail.querySelector(".video__controls-volume");
  const currentTimeElement = thumbnail.querySelector(
    ".video__controls-time-current"
  );
  const durationTimeElement = thumbnail.querySelector(
    ".video__controls-time-duration"
  );
  const fullScreen = thumbnail.querySelector(".video__controls-fullscreen");
  let currentVolume = 0.5;
  let mousedown = false;
  
  playButton.addEventListener("click", (event) => {
    changeClassPaused(event);
    playPauseVideo();
  });
  
  playIcon.addEventListener("click", (event) => {
    if (controls.classList.contains("unused")) {
      controls.classList.remove("unused");
    }
    changeClassPaused(event);
    playPauseVideo();
  });
  
  video.addEventListener("click", (event) => {
    if (!controls.classList.contains("unused")) {
      changeClassPaused(event);
      playPauseVideo();
    }
  });
  
  video.addEventListener("timeupdate", () => {
    progressBar.value = video.currentTime / video.duration;
    const value = progressBar.value * 100;
    progressBar.style.background = `linear-gradient(to right, #BDAE82 0%, #BDAE82 ${value}%, #C8C8C8 ${value}%, #C8C8C8 100%)`;
  });
  
  video.addEventListener("ended", () => {
    thumbnail.classList.add("paused");
  });
  
  video.addEventListener("play", () => {
    thumbnail.classList.remove("paused");
  });
  
  progressBar.addEventListener("input", (event) => {
    video.currentTime = event.target.value * video.duration;
  });
  
  progressBar.addEventListener("mousedown", () => {
    mousedown = true;
    video.pause();
  });
  
  progressBar.addEventListener("mouseup", () => {
    mousedown = false;
    video.play();
  });
  
  progressBar.addEventListener("mousemove", (event) => {
    mousedown && scrub(event);
  });
  
  volumeButton.addEventListener("click", (event) => {
    changeClassMute(event);
  });
  
  volume.addEventListener("mousemove", (event) => {
    video.volume = event.target.value;
    currentVolume = video.volume;
    volume.style.background = `linear-gradient(to right, #BDAE82 0%, #BDAE82 ${
      currentVolume * 100
    }%, #C8C8C8 ${currentVolume * 100}%, #C8C8C8 100%)`;
    changeClassMute(event);
  });
  
  volume.addEventListener("change", (event) => {
    video.volume = event.target.value;
    currentVolume = video.volume;
    volume.style.background = `linear-gradient(to right, #BDAE82 0%, #BDAE82 ${
      currentVolume * 100
    }%, #C8C8C8 ${currentVolume * 100}%, #C8C8C8 100%)`;
    changeClassMute(event);
  });
  
  video.addEventListener("timeupdate", currentTime);
  
  fullScreen.addEventListener("click", (event) => {
    if (event.target.classList.contains("video__controls-fullscreen-icon")) {
      video.requestFullscreen();
    }
  });

