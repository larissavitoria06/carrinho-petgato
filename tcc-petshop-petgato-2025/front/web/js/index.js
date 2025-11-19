const imgs = document.querySelectorAll('.carousel img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const indicatorsContainer = document.querySelector('.carousel-indicators');

let index = 0;
let autoSlide; 

imgs.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active-dot'); 
    dot.addEventListener('click', () => {
        index = i;
        updateCarousel();
        resetAuto();
    });
    indicatorsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateCarousel() {
    imgs.forEach((img, i) => {
        img.classList.remove('active', 'left', 'right', 'hidden');

        if (i === index) {
            img.classList.add('active'); 
        } else if (i === (index - 1 + imgs.length) % imgs.length) {
            img.classList.add('left'); 
        } else if (i === (index + 1) % imgs.length) {
            img.classList.add('right'); 
        } else {
            img.classList.add('hidden'); 
        }
    });
    dots.forEach((dot, i) => {
        dot.classList.toggle('active-dot', i === index);
    });
}

function next() {
    index = (index + 1) % imgs.length;
    updateCarousel();
}

function prev() {
    index = (index - 1 + imgs.length) % imgs.length;
    updateCarousel();
}

function resetAuto() {
    clearInterval(autoSlide);
    autoSlide = setInterval(next, 4000);
}

nextBtn.addEventListener('click', () => {
    next();
    resetAuto();
});
prevBtn.addEventListener('click', () => {
    prev();
    resetAuto();
});

autoSlide = setInterval(next, 4000);
updateCarousel();

const texts = document.querySelectorAll('.banner-text');
let currentIndex = 0;

function changeText() {
    texts.forEach((text) => {
        text.classList.remove('active');
        text.style.color = '#f7f7f7ff';
    });
    texts[currentIndex].classList.add('active');
    texts[currentIndex].style.color = getRandomColor();
    currentIndex = (currentIndex + 1) % texts.length;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

changeText();
setInterval(changeText, 3000);
const banner = document.querySelector(".banner");
const bannerTexts = document.querySelectorAll(".banner-text");
let bannerIndex = 0;

function showNextText() {
    bannerTexts.forEach(text => text.classList.remove("active"));
    bannerTexts[bannerIndex].classList.add("active");
    if (bannerIndex === 0) banner.style.backgroundColor = "#00a6f3f6";
    else if (bannerIndex === 1) banner.style.backgroundColor = "#0303fffb";
    else if (bannerIndex === 2) banner.style.backgroundColor = "#eeff00ff";

    bannerIndex = (bannerIndex + 1) % bannerTexts.length;
}

setInterval(showNextText, 3000);
const btnPrev = document.getElementById('btn-prev');
const btnNext = document.getElementById('btn-next');
const produtosContainer = document.getElementById('produtos-container');

let currentPage = 0;
const cardsPerPage = 4;

function updateView() {
  const totalCards = produtosContainer.children.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  if (currentPage < 0) currentPage = 0;
  if (currentPage >= totalPages) currentPage = totalPages - 1;

  const card = produtosContainer.querySelector('.card');
  if (!card) return;

  const cardWidth = card.offsetWidth;
  const gap = 10;
  const offset = currentPage * (cardWidth + gap) * cardsPerPage;

  produtosContainer.style.transform = `translateX(-${offset}px)`;

  btnPrev.disabled = currentPage === 0;
  btnNext.disabled = currentPage === totalPages - 1;
}

btnPrev.addEventListener('click', () => {
  currentPage--;
  updateView();
});

btnNext.addEventListener('click', () => {
  currentPage++;
  updateView();
});