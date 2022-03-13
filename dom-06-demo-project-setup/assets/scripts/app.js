const addMovieModel = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector(" header button");
const backdrop = document.getElementById("backdrop");
const cancelAddMovieButton = document.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModel.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById("delete-modal");
const movies = [];
const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};
const closeMovieDeleteModal = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove("visible");
};
const deleteMovie = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1);
  const listRoot = document.getElementById("movie-list");
  listRoot.children[movieIndex].remove();
  closeMovieDeleteModal();
  updateUI();
};

const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();
  const cancelDeleteButton = deleteMovieModal.querySelector(".btn--passive");
  let confirmDeleteButton = deleteMovieModal.querySelector(".btn--danger");
  confirmDeleteButton.replaceWith(confirmDeleteButton.cloneNode(true));
  confirmDeleteButton = deleteMovieModal.querySelector(".btn--danger");
  cancelDeleteButton.addEventListener("click", closeMovieDeleteModal);
  confirmDeleteButton.addEventListener(
    "click",
    deleteMovie.bind(null, movieId)
  );
};
const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
  <div class="movie-element__image" >
  <img src="${imageUrl}" alt="${title}">
  </div>
  <div class="movie-element__info" >
  <h2>${title}</h2>
  <p>${rating}/5 stars</p>
  </div>`;
  newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
  const listRoot = document.getElementById("movie-list");
  listRoot.append(newMovieElement);
};

const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};
const closeMovieModal = () => {
  addMovieModel.classList.remove("visible");
  toggleBackdrop();
};
const showMovieModal = () => {
  addMovieModel.classList.add("visible");
  toggleBackdrop();
};
const clearUserInput = () => {
  for (const usrInput of userInputs) {
    usrInput.value = "";
  }
};
const cancelAddMovieHandler = () => {
  closeMovieModal();
  clearUserInput();
};
const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;
  if (
    titleValue.trim === "" ||
    imageUrlValue.trim === "" ||
    ratingValue.trim === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("please enter valid values ( number should be between 1 and 5 !)");
    return;
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };
  movies.push(newMovie);
  console.log(movies);
  closeMovieModal();
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  clearUserInput();
  updateUI();
};
const backdropHandler = () => {
  closeMovieModal();
  closeMovieDeleteModal();
  toggleBackdrop();
};
startAddMovieButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
