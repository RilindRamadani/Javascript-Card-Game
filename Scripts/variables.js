const cardObjectDefinitions = [
  { id: 1, imagePath: "/images/card-KingHearts.png" },
  { id: 2, imagePath: "/images/card-JackClubs.png" },
  { id: 3, imagePath: "/images/card-QueenDiamonds.png" },
  { id: 4, imagePath: "/images/AceSpades.png" },
];

const cardBackImgPath = "images/card-back-Blue.png";
const cardContainerElement = document.querySelector(".card-container");
const playGameButtonElement = document.getElementById("playGame");

const collapseGridAreaTemplate = " 'a a' 'a a'";
const cardCollectionCellClass = ".card-pos-a";

const numCards = cardObjectDefinitions.length;

const currentGameStatusElem = document.querySelector(".current-status");
const scoreContainerElem = document.querySelector(".header-score-container");
const scoreElem = document.querySelector(".score");
const roundContainerElem = document.querySelector(".header-round-container");
const roundElem = document.querySelector(".round");

const winColor = "green";
const loseColor = "red";
const primaryColor = "";
const localStorageGameKey = "HTA";
const aceId = 4;

var roundNum = 0;
var score = 0;
var gameInProgress = true;
var gameObj = {};
var maxRounds = 5;
var cards = [];
var shufflingInProgress = false;
var cardsRevealed = false;
var cardPositions = [];

// export * from "./constants.js";

export {
  roundNum,
  score,
  gameInProgress,
  gameObj,
  maxRounds,
  cards,
  shufflingInProgress,
  cardsRevealed,
  cardPositions,
};
export {
  cardObjectDefinitions,
  cardBackImgPath,
  cardContainerElement,
  playGameButtonElement,
  collapseGridAreaTemplate,
  cardCollectionCellClass,
  numCards,
  currentGameStatusElem,
  scoreContainerElem,
  scoreElem,
  roundContainerElem,
  roundElem,
  winColor,
  loseColor,
  primaryColor,
  localStorageGameKey,
  aceId,
};

//check weidest shit me cardPositions
