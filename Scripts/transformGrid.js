import { addChildElement } from "./createCards.js";
import {
  collapseGridAreaTemplate,
  cardCollectionCellClass,
  cardContainerElement,
  numCards,
  cardPositions,
} from "./variables.js";
function collectCards() {
  transformGridArea(collapseGridAreaTemplate);
  addCardsToGridAreaCell(cardCollectionCellClass);
}

function transformGridArea(areas) {
  cardContainerElement.style.gridTemplateAreas = areas;
}
function addCardsToGridAreaCell(cellPositionClassName) {
  const cellPositionElem = document.querySelector(cellPositionClassName);

  cards.forEach((card, index) => {
    addChildElement(cellPositionElem, card);
  });
}

function returnGridAreasMappedToCardPos() {
  let firstPart = "";
  let secondPart = "";
  let areas = "";

  console.log(cardPositions);
  window.cards.forEach((card, index) => {
    if (cardPositions[index] == 1) {
      areas = areas + "a ";
    } else if (cardPositions[index] == 2) {
      areas = areas + "b ";
    } else if (cardPositions[index] == 3) {
      areas = areas + "c ";
    } else if (cardPositions[index] == 4) {
      areas = areas + "d ";
    }
    if (index == 1) {
      firstPart = areas.substring(0, areas.length - 1);
      areas = "";
    } else if (index == 3) {
      secondPart = areas.substring(0, areas.length - 1);
    }
  });

  return `"${firstPart}" "${secondPart}"`;
}
function addCardsToAppropriateCell() {
  cards.forEach((card) => {
    addCardToGridCell(card);
  });
}
function addCardToGridCell(card) {
  const cardPositionClassName = mapCardIdToGridCell(card);
  const cardPositionElement = document.querySelector(cardPositionClassName);

  addChildElement(cardPositionElement, card);
}

function randomizeCardPositions() {
  const random1 = Math.floor(Math.random() * numCards) + 1;
  const random2 = Math.floor(Math.random() * numCards) + 1;

  const temp = cardPositions[random1 - 1];

  cardPositions[random1 - 1] = cardPositions[random2 - 1];
  cardPositions[random2 - 1] = temp;
}

function mapCardIdToGridCell(card) {
  if (card.id == 1) {
    return ".card-pos-a";
  } else if (card.id == 2) {
    return ".card-pos-b";
  } else if (card.id == 3) {
    return ".card-pos-c";
  } else if (card.id == 4) {
    return ".card-pos-d";
  }
}

export {
  addCardToGridCell,
  addCardsToAppropriateCell,
  randomizeCardPositions,
  returnGridAreasMappedToCardPos,
  transformGridArea,
  collectCards,
};
