const welcomeLogo = document.querySelector(`.welcome img`);
const welcomeButton = document.querySelector(`.welcome button`);
const gettingStarted = document.querySelector(`.gettingstarted`);

// PE: if JS is on, the transition still works but it's not clickable
const ifJavascript = () => {
  welcomeLogo.classList.remove(`delay`, `hide`);
  welcomeButton.classList.remove(`delay`, `hide`);
  gettingStarted.classList.remove(`show`, `opacitydelay`);
};
ifJavascript();

// now it is clickable

welcomeButton.addEventListener(`click`, () => {
  welcomeLogo.classList.add(`hide`);
  welcomeButton.classList.add(`hide`);
  gettingStarted.classList.add(`show`);
});
