const arrowTemplate = document.querySelector("#arrowTemplate");
//Json directions are stored in wasd format
const directions = {
    w: "arrow__direction_up",
    a: "arrow__direction_left",
    s: "arrow__direction_down",
    d: "arrow__direction_right"
}

export default class Arrow {
    next;

    //direction are passed by wasd
    constructor(direction) {
        this.next = null;
        this._element = arrowTemplate.content.cloneNode(true);
        this._arrowElement = this._element.querySelector('.arrow');
        this._arrowElement.classList.add(directions[direction]);
    }

    getElement() {
        return this._element;
    }

    addCorrectState() {
        this._element.classList.add("arrow__state_correct");
    }

    removeCorrectState() {
        this._element.classList.remove("arrow__state_correct");
    }

    setNext(nextArrow) {
        this.next = nextArrow;
    }
}