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

    static MAP = {
        cols: 8,
        rows: 8,
        tsize: 12,
        tiles: [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ],
        getTiles(col, row) {
            return this.tiles[row * GuessingGame.MAP.cols + col];
        },
    };

    constructor() {
        this.levelDifficult = {};
        this.correctNumber = -1;
        this.guessNumber = -1;
        this.gameStatus = false;

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

        this.renderMap();
    }

    // render section for select option level difficult
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
            // copy object to global variable to avoid affecting origin data
            this.levelDifficult = { ...GuessingGame.DIFFICULT_LEVELS[event.target.value] };
            this.btnReset.removeAttribute("disabled");
            this.messageSelectedLevel(this.levelDifficult);
            this.initialGame();
        });

        this.levelSection.innerHTML = "";
        this.levelSection.appendChild(titleOption);
        this.levelSection.appendChild(selectOption);
    }
    // render section for fighting game
    createFightSection() {
        let inputEle = document.createElement("input");
        let btnEle = document.createElement("button");
        let btnText = document.createTextNode("Fight");

        inputEle.name = "guessValue";
        inputEle.type = "text";
        inputEle.id = "guessValue";

        btnEle.appendChild(btnText);
        btnEle.addEventListener("click", () => {
            if (this.gameStatus) {
                this.playRound();
            }
        });

        this.fightSection.appendChild(inputEle);
        this.fightSection.appendChild(btnEle);
    }

    // intial the game when click start
    initialGame() {
        // set the game are playing
        this.gameStatus = true;
        // initial random number
        this.correctNumber = Math.floor(Math.random() * 100);

        // create fight section
        this.createFightSection();
    }

    // reset game
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

    // show message for level difficult selected
    messageSelectedLevel(level) {
        this.levelSection.innerHTML = `Ok, you have selected ${level.name}. You have ${level.changes} changes for fighting with me!`;
    }

    playRound() {
        // execute the round of game
        if (this.levelDifficult.changes > 0) {
            this.guessNumber = document.getElementById("guessValue").value;

            let lessOrGreate = parseInt(this.guessNumber) > this.correctNumber ? "less" : "greate";
            this.levelDifficult.changes--;

            if (parseInt(this.guessNumber) !== this.correctNumber) {
                this.msgAlert.innerHTML = `Incorrect! The number ${lessOrGreate} than ${this.guessNumber}`;
            } else {
                this.msgAlert.innerHTML = "Congrat! You win";

                // IDEAS: think will save the score for user here...

                this.gameStatus = false;
            }

            if (this.levelDifficult.changes === 0 && parseInt(this.guessNumber) !== this.correctNumber) {
                this.msgAlert.innerHTML = "You lost the game!!!";
                this.gameStatus = false;
            }
        } else {
            this.msgAlert.innerHTML = "You are out of changes!!!";
            this.gameStatus = false;
        }

        this.messageSelectedLevel(this.levelDifficult);
    }

    // extend ideas for save score
    renderMap() {
        const mapContainer = document.getElementById("mapTile");
        let canvasMap = document.createElement("canvas");

        canvasMap.width = 256;
        canvasMap.height = 256;
        let context = canvasMap.getContext("2d");
        // context.clearRect(0, 0, 256, 256);

        for (let c = 0; c < GuessingGame.MAP.cols; c++) {
            for (let r = 0; r < GuessingGame.MAP.rows; r++) {
                const tile = GuessingGame.MAP.getTiles(c, r);
                var x = c * GuessingGame.MAP.tsize;
                var y = r * GuessingGame.MAP.tsize;
                if (tile == 0) {
                    context.fillStyle = "#d3d3d3";
                    context.beginPath();
                    context.arc(x + 6, y + 6, 6, 0, 2 * Math.PI);
                    context.fill();
                }

                console.log(tile + 1);
            }
        }

        mapContainer.appendChild(canvasMap);
    }
}

const guessingGame = new GuessingGame();
