const gameview = document.querySelector(".game-view");
const stratagemCards = document.querySelector(".game-view__content");
const arrowTemplate = document.querySelector("#arrowTemplate");
const stratagemTemplate = document.querySelector("#stratagemTemplate");
const stratCode = gameview.querySelector(".game-view__stratagem-code");
const stratInput = gameview.querySelector(".game-view__input");
const gamestate = document.querySelector(".game-view__state");

const stratJson = await getStratagemJson();
console.log(stratJson);
async function getStratagemJson() {
    const response = await fetch("https://brian-j-wang.github.io/Stratagem-Hero/data/stratagems.json");
    const json = await response.json();
    return json;
}

const stratagemArray = [];
const stratagemDisplayLength = 6;
function createInitialStratagems() {
    for (let i = 0; i < stratagemDisplayLength; i++) {
        const stratagem = getRandomStratagemFromJson();

        stratagemArray.push(stratagem);
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

function createStratagemCard(stratagemData) {
    const copy = stratagemTemplate.content.cloneNode(true);
    
    const stratagemIcon = copy.querySelector(".stratagem-card__icon");
    stratagemIcon.setAttribute("src", getStratagemImage(stratagemData.svg));

    const stratagemName = copy.querySelector(".stratagem-card__name");
    stratagemName.innerText = stratagemData.name;

    const stratagemInputCode = copy.querySelector(".stratagem-card__code");
    createCodeSequence(stratagemInputCode, stratagemData.code);

    return copy;
}
                                                             //all arrow elements are here. Access them here to change their state.

const stratagemIcon = gameview.querySelector(".game-view__stratagem-icon");
const stratagemImagePath = "https://brian-j-wang.github.io/Stratagem-Hero/images/stratagems/";
const stratagemName = gameview.querySelector(".game-view__stratagem-name");
function getRandomStratagemFromJson() {
    const stratagemID = Math.floor(Math.random() * stratJson.stratagems.length);
    return stratJson.stratagems[stratagemID];
}

function getStratagemImage(imageName) {
    let path;
    if (imageName === "") {
        path = "../images/stratagems/stratagem-random.svg"
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

    const stratagem = getRandomStratagemFromJson()
    const newCard = createStratagemCard(stratagem);
    newCard.querySelector(".stratagem-card").classList.add("stratagem-card__position_not-first");
    stratagemCards.append(newCard);
    stratagemArray.push(stratagem);
}

function createCodeSequence(parent, code) {
    for (let i = 0; i < code.length; i++) {
        const arrowCopy = arrowTemplate.content.cloneNode(true);
        const arrow = arrowCopy.querySelector(".arrow");

        const direction = code.charAt(i);
        if (direction === "w") {
            arrow.classList.add("arrow__direction_up");
        }
        if (direction === "a") {
            arrow.classList.add("arrow__direction_left");
        }
        if (direction === "s") {
            arrow.classList.add("arrow__direction_down");
        }
        if (direction === "d") {
            arrow.classList.add("arrow__direction_right");
        }
        parent.append(arrow);
    }
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