import {
  addCardsToAppropriateCell,
  transformGridArea,
  returnGridAreasMappedToCardPos,
} from "./transformGrid.js";

import { cards } from "./variables.js";

function flipCard(card, flipToBack) {
  const innerCardElem = card.firstChild;
  console.log(card + "hihi");
  console.log(innerCardElem);

  if (flipToBack && !innerCardElem.classList.contains("flip-it")) {
    innerCardElem.classList.add("flip-it");
  } else if (innerCardElem.classList.contains("flip-it")) {
    innerCardElem.classList.remove("flip-it");
  }
}

function flipCards(flipToBack) {
  window.cards.forEach((card, index) => {
    setTimeout(() => {
      flipCard(card, flipToBack);
    }, index * 100);
  });
}

function dealCards() {
  addCardsToAppropriateCell();
  const areasTemplate = returnGridAreasMappedToCardPos();

  transformGridArea(areasTemplate);
}

export { flipCard, flipCards, dealCards };
