//  alert("hello wolrd!!!!!");

const images = document.querySelectorAll("img.carousel-item__img");
const modal = document.querySelector(".modal");
const modalimage = document.querySelector(".modal__image");
// const modaltext = document.querySelector(".modal__text");
const modalclose = document.querySelector(".close");

images.forEach((image) => {
  image.addEventListener('click', () => {
    modal.classList.add('open');

    modalimage.src = image.src;

    modalclose.addEventListener('click', (e) => {
      console.log(e);
      modal.classList.remove('open');
    })
  });
});

