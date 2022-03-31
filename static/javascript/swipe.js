console.log("swipes");

const likeButton = document.getElementById("likebutton");
// const dislikeButton = document.getElementById("dislikebutton");
const card = document.querySelector(".card");

likeButton.addEventListener("click", () => {
    card.classList.add("swipe")
  });