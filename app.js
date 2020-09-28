let myGamePiece;

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
        ctx.fill();
    }
    this.newPos = function() {
        this.x += this.speedX;
    }
}

const startGame = () => {
    myGameArea.start();
    myGamePiece = new component(10, 10, myGameArea.context.pattern, window.innerWidth/2, myGameArea.context.lineHeight);
    
    
}

const myGameArea = {
    canvas: document.createElement("canvas"),

    background: document.querySelector(".background"),
    rope: document.querySelector(".rope"),
    start() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight * 0.8;
        this.context = this.canvas.getContext("2d");
        this.context.pattern = this.context.createPattern(this.rope, "repeat");
        this.context.lineHeight = this.canvas.height * 0.9;
        this.context.drawImage(this.background, 0, 0, this.canvas.width, this.canvas.height);
        this.context.moveTo(0, this.canvas.height);
        this.context.lineWidth = 10;
        this.context.lineTo(this.canvas.width, this.canvas.height);
        this.context.strokeStyle = this.context.pattern;
        this.context.stroke();
        document.body.append(this.canvas);
        this.interval = setInterval(updateGameArea, 20);
        },

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.drawImage(document.querySelector(".background"), 0, 0, this.canvas.width, this.canvas.height);
        this.context.beginPath();
        this.context.moveTo(0, this.context.lineHeight);
        this.context.lineTo(this.canvas.width, this.context.lineHeight);
        this.context.strokeStyle = this.context.pattern;
        this.context.stroke();
    },

    checkWin() {
        if (myGamePiece.x < myGamePiece.width) {
            const playerOneScore = document.querySelector(".player-one-score span");
            playerOneScore.innerText = parseInt(playerOneScore.innerText) + 1;
            return true;
        } else if (myGamePiece.x >= this.canvas.width - myGamePiece.width) {
            const playerTwoScore = document.querySelector(".player-two-score span");
            playerTwoScore.innerText = parseInt(playerTwoScore.innerText) + 1;
            return true;
        }
    },

    reset() {
        clearInterval(this.start.interval);
        startGame();
    }
}

const updateGameArea = () => {
    if (myGameArea.checkWin()) {
        myGameArea.reset();
    } else {
    myGameArea.clear();
    myGamePiece.newPos();    
    myGamePiece.update();
    }
}

const moveLeft = () => {
    myGamePiece.x -= 20; 
}

const moveRight = () => {
    myGamePiece.x += 20; 
}

document.addEventListener("keydown", (e) => {
    if (e.key === "a") {
        moveLeft();
    }
    if (e.key === "ArrowRight") {
        moveRight();
    }    
});

document.addEventListener("keyup", (e) => {
    if (e.key === "a") {
        moveLeft();
    }
    if (e.key === "ArrowRight") {
        moveRight();
    }    
});

document.querySelector("button").addEventListener("click", () => {
    const playerOneScore = document.querySelector(".player-one-score span");
    const playerTwoScore = document.querySelector(".player-two-score span");
    playerOneScore.innerText = 0;
    playerTwoScore.innerText = 0;
    startGame();
});

window.onload = startGame();

window.addEventListener("resize", () => {
    startGame();
});