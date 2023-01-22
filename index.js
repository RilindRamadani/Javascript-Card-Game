const cardObjectDefinitions = [
  { id: 1, imagePath: "/images/card-KingHearts.png" },
  { id: 2, imagePath: "/images/card-JackClubs.png" },
  { id: 3, imagePath: "/images/card-QueenDiamonds.png" },
  { id: 4, imagePath: "/images/AceSpades.png" },
];

let cards = [];
const cardBackImgPath = "images/card-back-Blue.png";
const cardContainerElement = document.querySelector(".card-container");
const playGameButtonElement = document.getElementById("playGame");

const collapseGridAreaTemplate = " 'a a' 'a a'";
const cardCollectionCellClass = ".card-pos-a";

const numCards = cardObjectDefinitions.length;
let cardPositions = [];
loadGame();

function loadGame() {
  createCards();

  cards = document.querySelectorAll(".card");

  playGameButtonElement.addEventListener("click", () => startGame());

  console.log(cards);
}

function startGame() {
  initialiseNewGame();
  startRound();
  collectCards();
}

function initialiseNewGame() {}

function startRound() {
  initialiseNewRound();
  collectCards();
  flipCards(true);
  shuffleCards();
}

function initialiseNewRound() {}


function chooseCard(){

}

function canChooseCard(){
    return gameInProgress == true &&


    
}
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

function flipCard(card, flipToBack) {
  const innerCardElem = card.firstChild;

  if (flipToBack && !innerCardElem.classList.contains("flip-it")) {
    innerCardElem.classList.add("flip-it");
  } else if (innerCardElem.classList.contains("flip-it")) {
    innerCardElem.classList.remove("flip-it");
  }
}

function flipCards(flipToBack) {
  cards.forEach((card, index) => {
    setTimeout(() => {
      flipCard(card, flipToBack);
    }, index * 100);
  });
}

function shuffleCards() {
  const id = setInterval(shuffle, 12);
  let shuffleCount = 0;

  function shuffle() {
    randomizeCardPositions();
    if (shuffleCount == 500) {
      clearInterval(id);
      dealCards();
    } else {
      shuffleCount++;
    }
  }
}

function dealCards() {
  addCardsToAppropriateCell();
  const areasTemplate = returnGridAreasMappedToCardPos();

  transformGridArea(areasTemplate);
}

function returnGridAreasMappedToCardPos() {
  let firstPart = "";
  let secondPart = "";
  let areas = "";

  cards.forEach((card, index) => {
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

function randomizeCardPositions() {
  const random1 = Math.floor(Math.random() * numCards) + 1;
  const random2 = Math.floor(Math.random() * numCards) + 1;

  const temp = cardPositions[random1 - 1];

  cardPositions[random1 - 1] = cardPositions[random2 - 1];
  cardPositions[random2 - 1] = temp;
}
function createCards() {
  cardObjectDefinitions.forEach((cardItem) => {
    createCard(cardItem);
  });
}

function initializeCardPositions(card) {
  cardPositions.push(card.id);
}

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
}

function addCardToGridCell(card) {
  const cardPositionClassName = mapCardIdToGridCell(card);
  const cardPositionElement = document.querySelector(cardPositionClassName);

  addChildElement(cardPositionElement, card);
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
