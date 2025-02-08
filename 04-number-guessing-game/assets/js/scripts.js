class GuessingGame {
    static CONTROLS = {
        startGame: "startGame",
        resetGame: "resetGame",
        playRound: "playRound",
        levelSection: "levelSection",
        fightSection: "fightSection",
        messageAlert: "messageAlert",
    };

    static DIFFICULT_LEVELS = [
        {
            name: "Easy",
            changes: 10,
        },
        {
            name: "Medium",
            changes: 5,
        },
        {
            name: "Hard",
            changes: 3,
        },
    ];

    constructor() {
        this.levelDifficult = {};
        this.correctNumber = -1;
        this.guessNumber = -1;
        this.gameStatus = false;

        this.gameAttribute = {
            status: false,
            changes: 0,
            correctNumber: -1,
            guessNumber: -1,
        };

        this.levelSection = document.getElementById(GuessingGame.CONTROLS.levelSection);
        this.fightSection = document.getElementById(GuessingGame.CONTROLS.fightSection);
        this.msgAlert = document.getElementById(GuessingGame.CONTROLS.messageAlert);
        this.btnReset = document.getElementById(GuessingGame.CONTROLS.resetGame);

        this.btnStart = document.getElementById(GuessingGame.CONTROLS.startGame);

        this.btnStart.addEventListener("click", (event) => {
            event.preventDefault();

            if (!this.gameStatus) {
                this.createDifficultOptionsSection();
                event.target.setAttribute("disabled", "");
            } else {
                this.msgAlert.innerHTML =
                    "Your are playing game! If you want to start again, please click reset game button!";
            }
        });

        this.btnReset.addEventListener("click", (event) => {
            event.preventDefault();
            event.target.setAttribute("disabled", "");

            this.resetGame();
        });
    }

    createDifficultOptionsSection() {
        const totalOptions = GuessingGame.DIFFICULT_LEVELS.length;
        const options = GuessingGame.DIFFICULT_LEVELS;
        let selectOption = document.createElement("select");
        let titleOption = document.createElement("p");
        let titleNode = document.createTextNode("Please select level");
        titleOption.appendChild(titleNode);

        let firstOption = document.createElement("option");
        let textFirstOption = document.createTextNode("Select difficult levels");
        firstOption.appendChild(textFirstOption);
        firstOption.value = -1;
        selectOption.appendChild(firstOption);

        for (let i = 0; i < totalOptions; i++) {
            let option = document.createElement("option");
            let textOption = document.createTextNode(options[i].name);
            option.value = i;
            option.appendChild(textOption);
            selectOption.appendChild(option);
        }

        selectOption.addEventListener("change", (event) => {
            const level = GuessingGame.DIFFICULT_LEVELS[event.target.value];
            this.levelDifficult = level;
            this.btnReset.removeAttribute("disabled");
            this.messageSelectedLevel(level);
            this.initialGame();
        });

        this.levelSection.innerHTML = "";
        this.levelSection.appendChild(titleOption);
        this.levelSection.appendChild(selectOption);
    }
    createFightSection() {
        let inputEle = document.createElement("input");
        let btnEle = document.createElement("button");
        let btnText = document.createTextNode("Fight");
        // const wrapSection = document.getElementById("fightSection");

        inputEle.name = "guessValue";
        inputEle.type = "text";
        inputEle.id = "guessValue";

        btnEle.appendChild(btnText);
        btnEle.addEventListener("click", () => {
            // this.levelDifficult.changes--;
            if (this.gameStatus) {
                this.startRound();
            }
            // console.log(this.levelDifficult);
        });

        this.fightSection.appendChild(inputEle);
        this.fightSection.appendChild(btnEle);
    }

    initialGame() {
        // set the game are playing
        this.gameStatus = true;
        // initial random number
        this.correctNumber = Math.floor(Math.random() * 100);

        // create fight section
        this.createFightSection();
    }

    resetGame() {
        this.levelDifficult = {};
        this.correctNumber = -1;
        this.guessNumber = -1;
        this.gameStatus = false;

        this.btnStart.removeAttribute("disabled");
        this.msgAlert.innerHTML = "";
        this.levelSection.innerHTML = "";
        this.fightSection.innerHTML = "";
    }

    messageSelectedLevel(level) {
        this.levelSection.innerHTML = `Ok, you have selected ${level.name}. You have ${level.changes} changes for fighting with me!`;
        // this.initialGame();
    }

    startRound() {
        // execute round

        if (this.levelDifficult.changes === 0) {
            this.msgAlert.innerHTML = "You lost!!!";
            this.gameStatus = false;
        } else {
            this.msgAlert.innerHTML = "Fightinggg!!";

            this.guessNumber = document.getElementById("guessValue").value;
            // this.levelDifficult.changes--;

            if (parseInt(this.guessNumber) > this.correctNumber) {
                this.msgAlert.innerHTML = `Incorrect! The number less than ${this.guessNumber}`;
                this.levelDifficult.changes--;
            } else if (parseInt(this.guessNumber) < this.correctNumber) {
                this.msgAlert.innerHTML = `Incorrect! The number greater than ${this.guessNumber}`;
                this.levelDifficult.changes--;
            } else if (parseInt(this.guessNumber) === this.correctNumber && this.levelDifficult.changes > 0) {
                this.msgAlert.innerHTML = `Congrat! You win`;
                this.gameStatus = false;
            }
        }

        this.messageSelectedLevel(this.levelDifficult);
    }
}

const guessingGame = new GuessingGame();
