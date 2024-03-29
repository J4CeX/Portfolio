import {slides} from '../data/slides.js';

let hidden = true;
let sideMenu = false;

showNumber();
scrollToTheTop();
welcomeImageAnimation();
renderSlides();
slider();
menuButton();

function showNumber(){
    const phoneContainer = document.querySelector('.number-request')
    const number = document.querySelector('.number');
    
    phoneContainer.addEventListener('click', () => {
        if(hidden){
            number.classList.remove('hidden');
            number.classList.add('shown');
            hidden = false;
        } else{
            number.classList.remove('shown');
            number.classList.add('hidden');
            hidden = true;
        }
    });
}

function welcomeImageAnimation(){
    const welcomeImage = document.querySelector('.welcome-image');

    setTimeout(() => {
        welcomeImage.classList.add('welcome-image-show');
    }, 1000);
}

function renderSlides(){
    let slidesHTML = '';

    const slider = document.querySelector('.carousel');
    
    slides.forEach((slide) => {
        slidesHTML += `
            <li class="card">
                <a href="${slide.link}" target="_blank"> 
                    <div class="image"><img src="images/${slide.image}" draggable="false"></div>
                    <div class="card-text">${slide.text}</div>
                </a>
            </li>
        `;
    });

    slider.innerHTML = slidesHTML;
}

function slider(){
    let isDragging = false;
    let startX;
    let startScrollLeft;

    const carousel = document.querySelector(".carousel");
    const arrowLeft = document.querySelector(".scroll-left");
    const arrowRight = document.querySelector(".scroll-right");
    const firstCardWidth = carousel.querySelector(".card").offsetWidth;
    const carouselChildrens = [...carousel.children];

    let cardPerView = Math.round(carousel.offsetWidth  / firstCardWidth);

    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    arrowLeft.addEventListener("click", () => {
        carousel.scrollLeft += arrowLeft.className === "scroll-left" ? -firstCardWidth : firstCardWidth;
    })

    arrowRight.addEventListener("click", () => {
        carousel.scrollLeft += arrowLeft.className === "scroll-right" ? -firstCardWidth : firstCardWidth;
    })

    carousel.addEventListener("mousedown", (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener("mousemove", (e) => {
        if(!isDragging){
            return;
        }
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    });

    carousel.addEventListener("scroll", () => {
        if(carousel.scrollLeft === 0){
            carousel.classList.remove("transition");
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
            carousel.classList.add("transition");
        } else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
            carousel.classList.remove("transition");
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
            carousel.classList.add("transition");
        }
    });
}

function scrollToTheTop(){
    const logo = document.querySelector('.header-logo');
    logo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behaviour: 'smooth'
        });
    });
}

function menuButton(){
  const sideNavigation = document.querySelector('.side-navigation');
  const menuButton = document.querySelector('.menu-img');
  menuButton.addEventListener('click', () => {
    if(sideMenu === false){
      sideNavigation.innerHTML = `
        <li class="nav-link">
        <a href="#about-me-link">O mnie</a>
        </li>
        <li class="nav-link">
        <a href="#my-skills-link">Moje umiejętności</a>
        </li>
        <li class="nav-link">
        <a href="#projects-link">Projekty</a>
        </li>
        <li class="nav-link">
        <a href="#contact-link">Kontakt</a>
        </li>
      `;
      sideNavigation.classList.remove('hidden');
      sideNavigation.classList.add('shown');
      sideMenu = true;
    } else{
      sideNavigation.innerHTML = '';
      sideMenu = false;
      sideNavigation.classList.remove('shown')
      sideNavigation.classList.add('hidden');
    }
    
  });
}