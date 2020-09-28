let myGamePiece;
const playerOneScore = document.querySelector(".player-one-score span");
const playerTwoScore = document.querySelector(".player-two-score span");
const playerOneHealth = document.querySelector(".player-one.health");
const playerTwoHealth = document.querySelector(".player-two.health");

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.x = x;
    this.y = y;
    this.moveLeft = function() {
        playerOneHealth.value -= 5
        if (playerOneHealth.value > 40) {
            myGamePiece.x -= 20;
        } else if (playerOneHealth.value > 20) {
            myGamePiece.x -= 15;
        } else if (playerOneHealth.value > 0) {
            myGamePiece.x -= 10;
        }
        else {
            myGamePiece.x -= 5
        }
    }
    this.moveRight = function () {
        playerTwoHealth.value -= 5;
        if (playerTwoHealth.value > 40) {
            myGamePiece.x += 20;
        } else if (playerTwoHealth.value > 20) {
            myGamePiece.x += 15;
        } else if (playerTwoHealth.value > 0) {
            myGamePiece.x += 10;
        } else {
            myGamePiece.x += 5
        }
    }
    this.update = function() {
        ctx = myGameArea.ctx;
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
        ctx.fill();
    }
    this.newPos = function() {
        this.x += this.speedX;
    }
}

const myGameArea = {
    canvas: document.createElement("canvas"),

    background: document.querySelector(".background"),
    rope: document.querySelector(".rope"),
    start() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight * 0.7;
        this.ctx = this.canvas.getContext("2d");
        this.ctx.pattern = this.ctx.createPattern(this.rope, "repeat");
        this.ctx.lineHeight = this.canvas.height * 0.9;
        this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.moveTo(0, this.canvas.height);
        this.ctx.lineWidth = 10;
        this.ctx.lineTo(this.canvas.width, this.canvas.height);
        this.ctx.strokeStyle = this.ctx.pattern;
        this.ctx.stroke();
        document.body.append(this.canvas);
        },
    
    updateGameArea() {
        if (myGameArea.checkWin()) {
            myGameArea.reset();
        } else {
        document.querySelectorAll(".health").forEach(meter => meter.value += 0.8);
        myGameArea.clear();
        myGamePiece.newPos();    
        myGamePiece.update();
        }
    },

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.ctx.lineHeight);
        this.ctx.lineTo(this.canvas.width, this.ctx.lineHeight);
        this.ctx.strokeStyle = this.ctx.pattern;
        this.ctx.stroke();
    },

    checkWin() {
        if (myGamePiece.x < myGamePiece.width) {
            playerOneScore.innerText = parseInt(playerOneScore.innerText) + 1;
            return true;
        } else if (myGamePiece.x >= this.canvas.width - myGamePiece.width) {
            playerTwoScore.innerText = parseInt(playerTwoScore.innerText) + 1;
            return true;
        }
    },

    reset() {
        clearInterval(interval);
        startGame();
        interval = setInterval(this.updateGameArea, 20);
    }
}

const startGame = () => {
    myGameArea.start();
    myGamePiece = new component(10, 10, myGameArea.ctx.pattern, window.innerWidth/2, myGameArea.ctx.lineHeight);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "a") {
        myGamePiece.moveLeft();
    }
    if (e.key === "ArrowRight") {
        myGamePiece.moveRight();
    }    
});

document.addEventListener("keyup", (e) => {
    if (e.key === "a") {
        myGamePiece.moveLeft();
    }
    if (e.key === "ArrowRight") {
        myGamePiece.moveRight();
    }    
});

document.querySelector("button").addEventListener("click", () => {
    playerOneScore.innerText = 0;
    playerTwoScore.innerText = 0;
    startGame();
});

window.addEventListener("resize", () => {
    startGame();
});

window.onload = startGame();
let interval = setInterval(myGameArea.updateGameArea, 20);