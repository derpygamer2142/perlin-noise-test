export default class Input {
    constructor() {

        this.w = false;
        this.a = false;
        this.s = false;
        this.d = false;
        this.r = false;
        this["="] = false;
        this["-"] = false;
        this.ArrowUp = false;
        this.ArrowDown = false;
        this.initInput();
    }

    initInput() {
        document.addEventListener("keydown", e => {
            this[e.key] = true;
        });
        
        document.addEventListener("keyup", e => {
            this[e.key] = false;
        });


    }
}