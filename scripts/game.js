const gameview = document.querySelector(".game-view");

let correctInput = "";
const stratCode = gameview.querySelector(".game-view__stratagem-code");
const stratInput = gameview.querySelector(".game-view__input");

const arrowTemplate = document.querySelector("#arrowTemplate");

const stratJson = await getStratagemJson();
async function getStratagemJson() {
    const response = await fetch("https://brian-j-wang.github.io/Stratagem-Hero/data/stratagems.json");
    const json = await response.json();
    return json;
}

let arrowList;                                                              //all arrow elements are here. Access them here to change their state.
const stratagemIcon = gameview.querySelector(".game-view__stratagem-icon");
const stratagemImagePath = "https://brian-j-wang.github.io/Stratagem-Hero/images/stratagems/";
getRandomStratagemFromJson();
function getRandomStratagemFromJson() {
    correctInput = "";
    const stratagemID = Math.floor(Math.random() * stratJson.stratagems.length);
    const stratagem = stratJson.stratagems[stratagemID];
    const stratagemImage = getStratagemImage(stratagem.svg);
    stratagemIcon.setAttribute("src", stratagemImage);
    newCodeSequence(stratagem.code);

    correctInput = stratagem.code;
}


function getStratagemImage(imageName) {
    const path = stratagemImagePath.concat(imageName);
    return path;
}

const minStratagemLength = 3;
const maxStratagemLength = 8;
const validCodes = ["w", "a", "s", "d"];
function CalculateRandomCode() {
    correctInput = "";
    stratCode.querySelectorAll(".arrow").forEach(element => {
        stratCode.remove(element);
    });
    arrowList = [];

    const newStratagemLength = Math.floor(Math.random() * ((maxStratagemLength + 1) - minStratagemLength) + minStratagemLength);

    for (let i = 0; i < newStratagemLength; i++) {
        const index = Math.floor(Math.random() * 4);
        const direction = validCodes[index];
        correctInput = correctInput.concat(direction);
    }

    newCodeSequence(correctInput);  
}

function newCodeSequence(code) {
    while (stratCode.firstChild) {
        stratCode.removeChild(stratCode.lastChild);
    }

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
        stratCode.append(arrow);
    }

    arrowList = stratCode.querySelectorAll(".arrow");
}

function ResetStratagemInput() {
    currentArrow = 0;
    stratInput.value = "";
    arrowList.forEach(element => {
        element.classList.remove("arrow__state_correct");
    });
}

let currentArrow = 0;
stratInput.addEventListener('keyup', function (evt) {

    const keystroke = evt.key.toLowerCase();
    if (keystroke != 'w' && keystroke != 'a' && keystroke != 's' && keystroke != 'd') {
        evt.preventDefault();
    }

    const inputLength = stratInput.value.length;
    const codeLength = correctInput.length;
    if (inputLength >= codeLength) {
        evt.preventDefault();
    }

    if (keystroke === correctInput.charAt(currentArrow)) {
        arrowList[currentArrow].classList.add("arrow__state_correct");
        currentArrow++;
    } else {
        ResetStratagemInput();
    }

    if (currentArrow === correctInput.length) {
        ResetStratagemInput();
        getRandomStratagemFromJson();
    }
});

stratCode.addEventListener('click', function (evt) {
    stratInput.focus();
});