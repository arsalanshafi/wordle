
class Wordle {
    constructor(count, word) {
        this.count = count;
        this.word = word;
    }
    boxes = [...document.querySelectorAll(".box")];
    green = [];
    yellow = [];

    putLetter(char) {
        if (this.count === 24) return;
        if (this.count % 5 === 0 && this.count !== 0) return;
        this.boxes[this.count].value = char;
        this.count++;
    }

    rmLetter() {
        if (this.count === 0) return;
        this.count--;
        this.boxes[this.count].value = "";
    }

    check() {
        if (this.count % 5 !== 0 || this.count === 0) return;

        let temp = this.word;
        for (let i = this.count - 5; i < this.count; i++) {
            let char = this.boxes[i].value;

            if (this.word.indexOf(char) !== -1) {
                if (temp.indexOf(char) === i) {
                    this.green.push(i)
                }
                this.yellow.push(i);
            }
        }

    }

    changeColor() {
        this.yellow.forEach(a => {
            this.boxes[a].classList.add("yellow");
            this.boxes[a].classList.add("animate");
        })
        this.green.forEach(a => {
            this.boxes[a].classList.add("green");
            this.boxes[a].classList.add("animate");
        })
        if (this.green.length === 5) this.gameDone("won");
        this.yellow.splice(0, 5);
        this.green.splice(0, 5);
        this.boxes.splice(0, 5);
        this.count = 0;
    }
    gameDone(result) {
        let display = document.querySelector(".dis");
        switch (result) {
            case ("won"):
                display.textContent = "You Won";
                display.classList.add("show");
                break;
            case ("lost"):
                display.textContent = "You Won";
                display.classList.remove("show");
                break;
            default:
                break;
        }
    }

}

const myWordle = new Wordle(0, "print");

window.addEventListener("keydown", e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        myWordle.putLetter(e.key);
    }
    switch (e.key) {
        case ("Backspace"):
            myWordle.rmLetter();
            break;
        case ("Enter"):
            myWordle.check();
            myWordle.changeColor();
            break;
        default:
            break

    }
})

