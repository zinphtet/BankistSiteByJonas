'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////
///
//
//Select Elements

//nav
const nav = document.querySelector('.nav');
const navItems = nav.querySelectorAll('.nav__item');

//operation Tab
const operation = document.querySelector('.operations');
const tab = document.querySelectorAll('.operations__tab');
const content = document.querySelectorAll('.operations__content');

//Slider
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const leftArr = document.querySelector('.slider__btn--left');
const rigthArr = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');

///EventListener
nav.addEventListener('mouseover', e => {
  let currItem = e.target.closest('.nav__item');
  if (!currItem) return;
  [...navItems].forEach(item => {
    item != currItem && (item.style.opacity = '0.5');
  });
});

nav.addEventListener('mouseout', e => {
  [...navItems].forEach(item => {
    item.style.opacity = '1';
  });
});

/// Tabbed Compoment
operation.addEventListener('click', e => {
  let currTab = e.target.closest('.operations__tab');
  if (!currTab) return;
  [...tab].forEach(tab => {
    tab.classList.remove('operations__tab--active');
  });
  currTab.classList.add('operations__tab--active');
  content.forEach(con => {
    con.classList.remove('operations__content--active');
  });
  document
    .querySelector(`.operations__content--${currTab.dataset.tab}`)
    .classList.add('operations__content--active');
});

//SLider
// slider.style.transform = 'scale(0.5)';
// slider.style.overflow = 'visible';

let curr = 0;
let currDot = 0;
for (let i = 0; i < [...slides].length; i++) {
  let dot = document.createElement('div');
  dot.className = 'dots__dot';
  dot.setAttribute('dot_num', i);
  dotContainer.append(dot);
}

const dots = document.querySelectorAll('.dots__dot');
const dotActive = curr => {
  [...dots].forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });
  [...dots][curr].classList.add('dots__dot--active');
};

const init = () => {
  [...slides].forEach((slide, i) => {
    slide.style.transform = `translateX(${i * 100}%)`;
  });
  dotActive(0);
};

const slideRight = function () {
  curr++;
  curr == [...slides].length && (curr = 0);
  [...slides].forEach((slide, i) => {
    slide.style.transform = `translateX(${i * 100 - curr * 100}%)`;
  });
  dotActive(curr);
};
const slideLeft = function () {
  curr--;
  curr == -1 && (curr = [...slides].length - 1);
  [...slides].forEach((slide, i) => {
    slide.style.transform = `translateX(${i * 100 - curr * 100}%)`;
  });
  dotActive(curr);
};

init();
rigthArr.addEventListener('click', slideRight);

leftArr.addEventListener('click', slideLeft);

dotContainer.addEventListener('click', e => {
  let curDot = e.target.closest('.dots__dot');
  if (!curDot) return;
  let num = Number.parseInt(curDot.getAttribute('dot_num'));
  curr = num;
  [...slides].forEach((slide, i) => {
    slide.style.transform = `translateX(${i * 100 - curr * 100}%)`;
  });

  dotActive(num);
});

////////////////

//Stiky Navigation
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  !entry.isIntersecting
    ? nav.classList.add('sticky')
    : nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

///Section Observers

const sections = document.querySelectorAll('.section');
const revalSection = (entries, observer) => {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revalSection, {
  root: null,
  threshold: 0.15,
});
sections.forEach(sect => {
  sect.classList.add('section--hidden');
  sectionObserver.observe(sect);
});

/////Image Lazy

const imgs = document.querySelectorAll('.features img');
// console.log([...imgs]);

const lazyImg = (entries, observer) => {
  const [entry] = entries;

  console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.setAttribute('src', entry.target.dataset.src);
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(lazyImg, {
  root: null,
  threshold: 0.6,
});

[...imgs].forEach(img => imgObserver.observe(img));

///Learn More Button

const scrollBtn = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

scrollBtn.addEventListener('click', () => {
  section1.scrollIntoView({ behavior: 'smooth' });
});

///Amazing Work JS
