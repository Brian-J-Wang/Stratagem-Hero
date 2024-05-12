//logic for handling the cards is done in this class.
const htmlContainer = document.querySelector("game-view__content");

export default class StratagemContainer {
    stratagems = [];

    constructor(config, cardContructor) {
        this._container = config.container;
        this._maxLength = config.maxLength;
        this._stratagems = config.stratagems;

        
    }

    
}