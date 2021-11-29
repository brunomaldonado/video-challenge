const searchBox = document.getElementById("searchBox");
const resultsContainer = document.getElementById("results-container");
const popularContainer = document.getElementById("raiting-container");
const body = document.body;
const form = document.getElementById("form");

// const popularCarousel = popularContainer.querySelector(".carousel__container")

// ================================================================= modal

// const images = document.querySelectorAll("img.carousel-item__img");
const images = document.querySelectorAll(".carousel-item img");
const modal = document.querySelector(".modal");
const modalimage = document.querySelector(".modal__image");
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

const API_KEY = '63e02ea91a0ba2b67d4f233c70b47544';

// const API = "https://yts.mx/api/v2/";
// const API = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

this.data = {
  movie: [],
};

function modalFilmDescription(movie) {
  const modal = document.createElement("div");
  modal.setAttribute("id", "modal");
  modal.innerHTML =
    `
    <div class="modal">
      <div class="close"><img src="./assets/close.png" alt=""></div>
      <div class="modal__content">
        <img src="${movie.medium_cover_image}" alt="width: 170" width="256">
        <h2>${movie.title}</h2>
        <p>${movie.synopsis}</p>
      </div>
      <div class="modal__button">
        <button type="button" class="button-close" onclick=hideModal()>Close</button>
      </div>
    </div>
  `;

  return modal;
}

function addLoading(container) {
  const loader = createLoading();
  container.append(loader);
}

const showModal = (id) => {
  const modal = findMovieById(id);
  modal.querySelector("overlay").classList.add("open");
  modal.querySelector(".modal").style.animation = "modalIn .8s forwards";
  body.appendChild(modal);
}

function hideModal() {
  const hideModalBanner = document.querySelector("#modal");
  hideModalBanner.querySelector(".overlay").classList.remove("open");
  HTMLVideoElement.querySelector(".modal").style.animation = "modalOut .8s forwards";
  setTimeout(() => body.removeChild(hideModalBanner), 1000);
}

async function getMovies(){
  try {
    const URL = `https://api.themoviedb.org./3/movie/popular?api_key=${API_KEY}`;
    const response = await fetch(`${URL}`);
    console.log(response);

    if (response.status === 200) {
      const data = await response.json();
      // console.log(data.results);

      let movies = '';
      data.results.forEach(movie => {
        // console.log(movie.title);
        movies +=
          `
        <div class="carousel-item">
        <img class="carousel-item__img" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="">
        <div class="carousel-item__details">
          <div>
            <img class="carousel-item__imgIcon" src="./assets/media-play-16.png" alt="">
            <img class="carousel-item__imgIcon" src="./assets/add-list-16.png" alt="">
          </div>
          <p class="carousel-item__details--title">${movie.title}</p>
          <p class="carousel-item__details--subtitle">${movie.release_date} ${movie.runtime} min</p>
        </div>
      </div>
        `;
        document.getElementById("popular-container").innerHTML = movies;
      })

      document.getElementById("top_rated-container").innerHTML = movies;

    } else if (response.status === 401) {
      console.log("The key not found");
    } else if (response.status === 404) {
      console.log("The movie you are looking for cannot be found");
    } else {
      console.log("There is am error in the search, we are working on it")
    }
  } catch (err) {
    console.log(err);
  }

}

getMovies();