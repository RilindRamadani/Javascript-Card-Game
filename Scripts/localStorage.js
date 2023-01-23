import { localStorageGameKey, maxRounds } from "./variables.js";

function saveGameObjectToLocalStorage(score, round) {
  console.log(score);
  console.log(round);
  updateGameObject(score, round);
  updateLocalStorageItem(
    localStorageGameKey,
    getSerializedObjectAsJSOn(window.gameObj)
  );
}

function checkForIncompleteGame() {
  const serializedGameObj = getLocalStorageItemValue(localStorageGameKey);

  if (serializedGameObj) {
    window.gameObj = getObjectFromJson(serializedGameObj);

    if (window.gameObj.round >= maxRounds) {
      removeLocalStorageItem(localStorageGameKey);
    } else {
      if (confirm("Would you like to continue with your last game")) {
        score = window.gameObj.score;
        round = window.gameObj.round;
      }
    }
  }
}

function getSerializedObjectAsJSOn(obj) {
  return JSON.stringify(obj);
}

function getObjectFromJson(json) {
  return JSON.parse(json);
}

//Ne localstorage we save a JSON file and we retrieve that later on
function updateLocalStorageItem(key, value) {
  localStorage.setItem(key, value);
}

function removeLocalStorageItem(key) {
  localStorage.removeItem(key);
}

function getLocalStorageItemValue(key) {
  return localStorage.getItem(key);
}
function updateGameObject(score, round) {
  window.gameObj.score = score;
  window.gameObj.round = round;
}

export { saveGameObjectToLocalStorage, checkForIncompleteGame };
