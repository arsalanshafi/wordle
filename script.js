
class Wordle {
    constructor(count, word) {
        this.count = count;
        this.word = word;
    }
    boxes = [...document.querySelectorAll(".box")];
    green = [];
    yellow = [];

    putLetter(char) {
        if (myWordle.count === 24) return;
        if (myWordle.count % 5 === 0 && myWordle.count !== 0) return;
        myWordle.boxes[myWordle.count].value = char;
        myWordle.count++;
    }

    rmLetter() {
        if (myWordle.count === 0) return;
        myWordle.count--;
        myWordle.boxes[myWordle.count].value = "";
    }

    check() {
        if (myWordle.count % 5 !== 0 || myWordle.count === 0) return;

        for (let i = myWordle.count - 5; i < myWordle.count; i++) {
            let char = myWordle.boxes[i].value;

            if (myWordle.word.indexOf(char) !== -1) {
                if(myWordle.word.indexOf(char) === i) {
                    myWordle.green.push(i)
                }
                myWordle.yellow.push(i);
            }
        }
        
    }

    changeColor() {
        myWordle.yellow.forEach(a => {
            myWordle.boxes[a].classList.add("yellow");
            myWordle.boxes[a].classList.add("animate");
        })
        myWordle.green.forEach(a => {
            myWordle.boxes[a].classList.add("green");
            myWordle.boxes[a].classList.add("animate");
        })
        myWordle.yellow.splice(0,5);
        myWordle.green.splice(0,5);
        myWordle.boxes.splice(0,5);
        myWordle.count = 0;
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

