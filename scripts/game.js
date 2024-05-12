import StratagemCard from "./stratagem-card.js";

const gameview = document.querySelector(".game-view");
const stratagemCards = document.querySelector(".game-view__content");
const arrowTemplate = document.querySelector("#arrowTemplate");
const stratagemTemplate = document.querySelector("#stratagemTemplate");
const stratCode = gameview.querySelector(".game-view__stratagem-code");
const stratInput = gameview.querySelector(".game-view__input");
const gamestate = document.querySelector(".game-view__state");

const stratJson = await getStratagemJson();
async function getStratagemJson() {
    const response = await fetch("https://brian-j-wang.github.io/Stratagem-Hero/data/stratagems.json");
    const json = await response.json();
    return json;
}

const stratagemArray = [];
const stratagemDisplayLength = 6;
function createInitialStratagems() {
    for (let i = 0; i < stratagemDisplayLength; i++) {
        const stratagem = RandomStratagem();
        const stratagemCard = new StratagemCard(stratagem.svg, stratagem.code);
        stratagemArray.push(stratagemCard);
    }

    for (let i = 0; i < stratagemArray.length; i++) {
        const cardCopy = createStratagemCard(stratagemArray[i]);

        if (i != 0) {
            const card = cardCopy.querySelector(".stratagem-card");
            card.classList.add("stratagem-card__position_not-first");
        }

        stratagemCards.append(cardCopy);
    }
}

const stratagemIcon = gameview.querySelector(".game-view__stratagem-icon");
const stratagemImagePath = "https://brian-j-wang.github.io/Stratagem-Hero/images/stratagems/";
const stratagemName = gameview.querySelector(".game-view__stratagem-name");
function RandomStratagem() {
    const stratagemID = Math.floor(Math.random() * stratJson.stratagems.length);
    return stratJson.stratagems[stratagemID];
}

function getStratagemImage(imageName) {
    let path;

    if (imageName === "") {
        path = "https://brian-j-wang.github.io/Stratagem-Hero/images/stratagems/stratagem-random.svg"
    } else {
        path = stratagemImagePath.concat(imageName);
    }

    return path;
}

let correctInput = "";
let arrowList = "";
function updateGameState() {
    correctInput = stratagemArray[0].code;
    const card = stratagemCards.querySelector(".stratagem-card");
    arrowList = card.querySelectorAll(".arrow");
    console.log(arrowList);
}

function nextCard() {
    const firstCard = stratagemCards.querySelector(".stratagem-card");
    firstCard.remove();
    stratagemArray.shift();

    correctInput = stratagemArray[0].code;
    const secondCard = stratagemCards.querySelector(".stratagem-card");
    secondCard.classList.remove("stratagem-card__position_not-first");
    arrowList = secondCard.querySelectorAll(".arrow");

    const stratagem = RandomStratagem()
    const newCard = createStratagemCard(stratagem);
    newCard.querySelector(".stratagem-card").classList.add("stratagem-card__position_not-first");
    stratagemCards.append(newCard);
    stratagemArray.push(stratagem);
}

function ResetStratagemInput() {
    currentArrow = 0;
    stratInput.value = "";
    arrowList.forEach(element => {
        element.classList.remove("arrow__state_correct");
    });
}

let currentArrow = 0;
//keyState is used to prevent keys being held down being inputted multiple times
const keyState = {
    'w': false,
    'a': false,
    's': false,
    'd': false
};
stratInput.addEventListener('keydown', function (evt) {
    const wasd = evt.key.toLowerCase();
    if (keyState[wasd]) {
        evt.preventDefault();
        return;
    } else { 
        keyState[wasd] = true;
    }
    
    if (wasd != 'w' && wasd != 'a' && wasd != 's' && wasd != 'd') {
        evt.preventDefault();
    }

    if (wasd === correctInput.charAt(currentArrow)) {
        arrowList[currentArrow].classList.add("arrow__state_correct");
        currentArrow++;
    } else {
        ResetStratagemInput();
    }

    if (currentArrow === correctInput.length) {
        ResetStratagemInput();
        nextCard();
    }
});

stratInput.addEventListener('keyup', function (evt) {
    const wasd = evt.key.toLowerCase();
    if (wasd != 'w' && wasd != 'a' && wasd != 's' && wasd != 'd') {
        return;
    }

    keyState[wasd] = false;
});

createInitialStratagems();

gamestate.addEventListener("click", function () {
    gamestate.classList.add("game-view__state_active");
    stratInput.focus();
    updateGameState();
});