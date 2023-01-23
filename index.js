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
let shufflingInProgress = false;
let cardsRevealed = false;
let cardPositions = [];

const currentGameStatusElem = document.querySelector(".current-status");
const scoreContainerElem = document.querySelector(".header-score-container");
const scoreElem = document.querySelector(".score");
const roundContainerElem = document.querySelector(".header-round-container");
const roundElem = document.querySelector(".round");

const winColor = "green";
const loseColor = "red";
const primaryColor = "";

let roundNum = 0;
let maxRounds = 4;
let score = 0;
let gameInProgress = true;
const aceId = 4;

loadGame();

function gameOver() {
  updateStatusElement(scoreContainerElem, "none");
  updateStatusElement(roundContainerElem, "none");

  const gameOverMessage = `Game Over! Final Score - <span class = 'badge'>${score}</span> Click 'Play Game' button to play again`;

  updateStatusElement(
    currentGameStatusElem,
    "block",
    primaryColor,
    gameOverMessage
  );

  gameInProgress = false;
  playGameButtonElement.disabled = false;
}
function loadGame() {
  createCards();

  cards = document.querySelectorAll(".card");

  playGameButtonElement.addEventListener("click", () => startGame());
}

function startGame() {
  initialiseNewGame();
  startRound();
  collectCards();
}

function initialiseNewGame() {}

function startRound() {
  initializeNewRound();
  collectCards();
  flipCards(true);
  shuffleCards();
}

function initializeNewRound() {
  roundNum++;
  playGameButtonElement.disabled = true;

  gameInProgress = true;
  shufflingInProgress = true;
  cardsRevealed = false;

  updateStatusElement(
    currentGameStatusElem,
    "block",
    primaryColor,
    "Shuffling..."
  );

  updateStatusElement(
    roundElem,
    "block",
    primaryColor,
    `Round <span class='badge'>${roundNum}</span>`
  );
}

function chooseCard(card) {
  if (canChooseCard()) {
    evaluateCardChoice(card);
    // saveGameObjectToLocalStorage(score, roundNum);
    flipCard(card, false);
    console.log("On inspect it does not flip, but otherwise it does");

    setTimeout(() => {
      flipCards(false);
      updateStatusElement(
        currentGameStatusElem,
        "block",
        primaryColor,
        "Card positions revealed"
      );

      endRound();
    }, 3000);
    cardsRevealed = true;
  }
}

function calculateScoreToAdd(roundNum) {
  if (roundNum == 1) {
    return 100;
  } else if (roundNum == 2) {
    return 50;
  } else if (roundNum == 3) {
    return 25;
  } else {
    return 10;
  }
}

function calculateScore() {
  const scoreToAdd = calculateScoreToAdd(roundNum);
  score = score + scoreToAdd;
}

function updateScore() {
  calculateScore();
  updateStatusElement(
    scoreElem,
    "block",
    primaryColor,
    `Score <span class='badge'>${score}</span>`
  );
}

function updateStatusElement(elem, display, color, innerHTML) {
  elem.style.display = display;

  if (arguments.length > 2) {
    elem.style.color = color;
    elem.innerHTML = innerHTML;
  }
}

function outputChoiceFeedBack(hit) {
  if (hit) {
    updateStatusElement(
      currentGameStatusElem,
      "block",
      winColor,
      "Hit!! - Well Done!! :)"
    );
  } else {
    updateStatusElement(
      currentGameStatusElem,
      "block",
      loseColor,
      "Missed!! :("
    );
  }
}

function evaluateCardChoice(card) {
  if (card.id == aceId) {
    updateScore();
    outputChoiceFeedBack(true);
  } else {
    outputChoiceFeedBack(false);
  }
}

function canChooseCard() {
  return gameInProgress == true && !shufflingInProgress && !cardsRevealed;
}

function endRound() {
  setTimeout(() => {
    if (roundNum == maxRounds) {
      gameOver();
      return;
    } else {
      startRound();
    }
  }, 3000);
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
  shufflingInProgress = true;
  const id = setInterval(shuffle, 10);

  let shuffleCount = 0;

  function shuffle() {
    randomizeCardPositions();
    if (shuffleCount == 100) {
      clearInterval(id);
      updateStatusElement(
        currentGameStatusElem,
        "block",
        "black",
        "Pick a card"
      );
      dealCards();
      shufflingInProgress = false;
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

  attatchClickEventHandlerToCard(cardElement);
}

function attatchClickEventHandlerToCard(card) {
  card.addEventListener("click", () => chooseCard(card));
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
