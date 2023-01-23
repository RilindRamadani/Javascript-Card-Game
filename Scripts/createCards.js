import { chooseCard } from "./cardSelection.js";
import { addCardToGridCell } from "./transformGrid.js";
import { cardObjectDefinitions, cardBackImgPath } from "./variables.js";
import { cardPositions } from "./variables.js";

function createCard(cardItem) {
  //div elements to create a card
  const cardElement = createElement("div");
  const cardInnerElement = createElement("div");
  const cardFrontElement = createElement("div");
  const cardBackElement = createElement("div");

  //front and back images for a card
  const cardFrontImg = createElement("img");
  const cardBackImg = createElement("img");

  //add class and id to card element
  addClassToElement(cardElement, "card");
  addIdToElement(cardElement, cardItem.id);

  //add class to innser card elements
  addClassToElement(cardInnerElement, "card-inner");
  addClassToElement(cardFrontElement, "card-front");
  addClassToElement(cardBackElement, "card-back");

  //add src to image elements
  addSrcToImageElement(cardBackImg, cardBackImgPath);
  addSrcToImageElement(cardFrontImg, cardItem.imagePath);

  //add class to back img and back of card
  addClassToElement(cardBackImg, "card-img");
  addClassToElement(cardFrontImg, "card-img");

  //adding elements to children.
  addChildElement(cardElement, cardInnerElement);

  addChildElement(cardInnerElement, cardFrontElement);
  addChildElement(cardInnerElement, cardBackElement);

  addChildElement(cardFrontElement, cardFrontImg);
  addChildElement(cardBackElement, cardBackImg);

  //add card element as child to grid cell
  addCardToGridCell(cardElement);

  initializeCardPositions(cardElement);

  attatchClickEventHandlerToCard(cardElement);
}

function deleteCards() {
  const cards = document.querySelectorAll("card").forEach((e) => e.remove());
}

function createCards() {
  cardObjectDefinitions.forEach((cardItem) => {
    createCard(cardItem);
  });
}

function initializeCardPositions(card) {
  cardPositions.push(card.id);
}

function attatchClickEventHandlerToCard(card) {
  card.addEventListener("click", () => chooseCard(card));
}

//Reusable elements, export ne different JS

function createElement(elementType) {
  return document.createElement(elementType);
}

//add class to an html element
function addClassToElement(element, className) {
  element.classList.add(className);
}

function addIdToElement(element, id) {
  element.id = id;
}

function addSrcToImageElement(imageElement, src) {
  imageElement.src = src;
}

function addChildElement(parentElement, childElement) {
  parentElement.appendChild(childElement);
}

export { createCards, addChildElement };
