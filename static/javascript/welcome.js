console.log("radiohead >>");

const welcomeLogo = document.querySelector(".welcome img");
const welcomeButton = document.querySelector(".welcome button");
const gettingStarted = document.querySelector(".gettingstarted");

welcomeButton.addEventListener("click", () => {
  welcomeLogo.classList.add("hide");
  welcomeButton.classList.add("hide");
  gettingStarted.classList.add("show");
});
