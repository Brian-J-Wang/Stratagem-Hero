const arrowTemplate = document.querySelector("#arrowTemplate");
//Json directions are stored in wasd format
const directions = JSON.parse(await GetDirectionJson());
async function getStratagemJson() {
    const response = await fetch("https://brian-j-wang.github.io/Stratagem-Hero/data/directions.json");
    return await response.json();
}

export class Arrow {
    //arrow classes that are either in front of or behind the class
    //null values indicate first or last arrow
    next;
    backward;

    //direction are passed by wasd
    constructor(direction) {
        this._direction = direction;
        this._element = arrowTemplate.content.cloneNode(true);
        this._element.classList.add(directions[this._direction]);
    }

    getElement() {
        return this._element;
    }

    addCorrectState() {
        this._element.classList.add(".arrow__state_correct");
    }

    removeCorrectState() {
        this._element.classList.remove(".arrow__state_correct");
    }
}