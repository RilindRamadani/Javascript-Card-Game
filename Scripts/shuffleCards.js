import { updateStatusElement } from "./score.js";
import { randomizeCardPositions } from "./transformGrid.js";
import { numCards } from "./variables.js";
import { currentGameStatusElem } from "./variables.js";
import { dealCards } from "./dealCards.js";

function animateShuffle(shuffleCount) {
  const random1 = Math.floor(Math.random() * numCards) + 1;
  const random2 = Math.floor(Math.random() * numCards) + 1;

  let card1 = document.getElementById(random1);
  let card2 = document.getElementById(random2);

  if (shuffleCount % 4 == 0) {
    card1.classList.toggle("shuffle-left");
    card1.style.zIndex = 100;
  }
  if (shuffleCount % 10 == 0) {
    card2.classList.toggle("shuffle-right");
    card2.style.zIndex = 200;
  }
}

function removeShuffleClasses() {
  cards.forEach((card) => {
    card.classList.remove("shuffle-left");
    card.classList.remove("shuffle-right");
  });
}

function shuffleCards() {
  shufflingInProgress = true;
  const id = setInterval(shuffle, 10);

  let shuffleCount = 0;

  function shuffle() {
    randomizeCardPositions();
    animateShuffle(shuffleCount);
    if (shuffleCount == 300) {
      clearInterval(id);
      updateStatusElement(
        currentGameStatusElem,
        "block",
        "black",
        "Pick a card"
      );
      removeShuffleClasses();
      dealCards();
      shufflingInProgress = false;
    } else {
      shuffleCount++;
    }
  }
}

export { removeShuffleClasses, shuffleCards };
