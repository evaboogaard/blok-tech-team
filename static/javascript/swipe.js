const likeForm = document.getElementById(`like`);
const dislikeForm = document.getElementById(`dislike`);
const card = document.querySelector(`.card`);

likeForm.addEventListener(`submit`, (event) => {
  event.preventDefault();
  card.classList.add(`like`);

  card.addEventListener(`animationend`, () => {
    likeForm.submit();
  });
});

dislikeForm.addEventListener(`submit`, (event) => {
  event.preventDefault();
  card.classList.add(`dislike`);

  card.addEventListener(`animationend`, () => {
    dislikeForm.submit();
  });
});
