const gameview = document.querySelector(".game-view");

let stratagemCode = "";
const stratCode = gameview.querySelector(".game-view__stratagem-code");
const stratInput = gameview.querySelector(".game-view__input");

const arrowTemplate = document.querySelector("#arrowTemplate");

let arrowList;                                                              //all arrow elements are here. Access them here to change their state.


const minStratagemLength = 3;
const maxStratagemLength = 8;
const validCodes = ["w", "a", "s", "d"];
function CalculateNewCode() {
    stratagemCode = "";
    while (stratCode.firstChild) {
        stratCode.removeChild(stratCode.lastChild);
    }

    stratCode.querySelectorAll(".arrow").forEach(element => {
        stratCode.remove(element);
    });
    arrowList = [];

    const newStratagemLength = Math.floor(Math.random() * ((maxStratagemLength + 1) - minStratagemLength) + minStratagemLength);

    for (let i = 0; i < newStratagemLength; i++) {
        const index = Math.floor(Math.random() * 4);
        const direction = validCodes[index];
        stratagemCode = stratagemCode.concat(direction);

        const arrow = CreateArrow(direction);
        stratCode.append(arrow);
    }

    arrowList = stratCode.querySelectorAll(".arrow");
}

function CreateArrow(direction) {
    const arrowCopy = arrowTemplate.content.cloneNode(true);
    const arrow = arrowCopy.querySelector(".arrow")
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

    return arrowCopy;
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
    console.log(stratInput.value);

    const keystroke = evt.key.toLowerCase();
    if (keystroke != 'w' && keystroke != 'a' && keystroke != 's' && keystroke != 'd') {
        evt.preventDefault();
    }

    const inputLength = stratInput.value.length;
    const codeLength = stratagemCode.length;
    if (inputLength >= codeLength) {
        evt.preventDefault();
    }

    if (keystroke === stratagemCode.charAt(currentArrow)) {
        arrowList[currentArrow].classList.add("arrow__state_correct");
        currentArrow++;
    } else {
        ResetStratagemInput();
    }

    if (currentArrow === stratagemCode.length) {
        ResetStratagemInput();
        CalculateNewCode();
    }
});

stratCode.addEventListener('click', function (evt) {
    stratInput.focus();
})


//game initialization
CalculateNewCode()