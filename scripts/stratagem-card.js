import Arrow from "./arrow.js";

const stratagemTemplate = document.querySelector("#stratagemTemplate");
const stratagemImagePath = "https://brian-j-wang.github.io/Stratagem-Hero/images/stratagems/";

export default class StratagemCard {
    //icon is a relative path svg, code is represented with wasd.
    constructor( icon = "stratagem-random.svg", code ) {
        this._icon = icon;
        this._code = code;

        this._cardElement = stratagemTemplate.content.cloneNode(true);
        this._cardIcon = this._cardElement.querySelector(".stratagem-card__icon");
        this._cardCode = this._cardElement.querySelector(".stratagem-card__code");
        this._constructStratagem();
    }

    _constructStratagem() {
        const imagePath = stratagemImagePath.concat(this._icon);
        this._cardIcon.setAttribute('src', imagePath);

        this.rootArrow = new Arrow(this._code[0]);

        let currentArrow = this.rootArrow;
        this._cardCode.append(currentArrow.getElement());
        for (let i = 1; i < this._code.length; i++) {
            const newArrow = new Arrow(this._code[i]);
            this._cardCode.append(currentArrow.getElement());

            currentArrow.setNext(newArrow);
            currentArrow = newArrow;
        }
    }

    getElement() {
        return this._cardElement;
    }

    resetArrowState() {
        let currentArrow = this.rootArrow;
        while (currentArrow.next != null) {
            currentArrow.removeCorrectState();
            currentArrow = currentArrow.next;
        }
    }
}