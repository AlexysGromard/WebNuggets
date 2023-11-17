const carousel = document.querySelector('.carousel');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const imagesBox = document.querySelector('.carousel-images');
const images = document.querySelectorAll('.carousel-images img');

let counter = 0;

// Click on the buttons
prevButton.addEventListener('click', () => {
  counter--;
  if (counter < 0) {
    counter = images.length - 1;
  }
  carousel.querySelector('.carousel-images').style.transform = `translateX(-${counter * 100}%)`;
});
nextButton.addEventListener('click', () => {
  counter++;
  if (counter >= images.length) {
    counter = 0;
  }
  carousel.querySelector('.carousel-images').style.transform = `translateX(-${counter * 100}%)`;
});

// Move with touch and mouse
imagesBox.addEventListener('mousedown', startTouch);
imagesBox.addEventListener('mouseup', endTouch);
imagesBox.addEventListener('mousemove', moveTouch);
imagesBox.addEventListener('mouseleave', endTouch);

imagesBox.addEventListener('touchstart', startTouch);
imagesBox.addEventListener('touchend', endTouch);
imagesBox.addEventListener('touchmove', moveTouch);


let isDragging = false;
let initialX;

function startTouch(e) {
  initialX = e.touches ? e.touches[0].clientX : e.clientX;
  isDragging = true;
}

function moveTouch(e) {
  // if imageBox is clicked
  if (isDragging){
    currentX = e.touches ? e.touches[0].clientX : e.clientX;
    // Mettre à jour position de l'image en fonction de la position de la souris
    for (let i = 0; i < images.length; i++) {
      carousel.querySelector('.carousel-images').style.transform = `translateX(-${counter * 100 + (initialX - currentX) / 10}%)`;
    }
  }
}

function endTouch(e) {
  if (currentX && isDragging) {
    if (initialX > currentX) {
      nextButton.click();
    } else {
      prevButton.click();
    }
  }
  isDragging = false;
}

// Removal of drag and drop for image buttons
function preventImageDrag(event) {
    event.preventDefault();
}
carousel.addEventListener('dragstart', preventImageDrag);

// Rotate the carousel automatically
if (!isDragging) {
  setInterval(() => {
    nextButton.click();
  }, 10000);  
}