let myGamePiece;

const startGame = () => {
    myGamePiece = new component(30, 30, "brown", window.innerWidth/2, 120);
    myGameArea.start();
}

let myGameArea = {
    canvas: document.createElement("canvas"),
    start() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight * 0.4;
        this.canvas.backgroundColor = "#87ceeb"
        this.context = this.canvas.getContext("2d");
        this.context.fillStyle = "#87ceeb";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        document.body.append(this.canvas);
        this.interval = setInterval(updateGameArea, 20);
        },

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.fillStyle = "#87ceeb";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },

    checkWin() {
        if (myGamePiece.x >= this.canvas.width - myGamePiece.width) {
            const playerOneScore = document.querySelector(".player-one-score span");
            playerOneScore.innerText = parseInt(playerOneScore.innerText) + 1;
            return true;
        } else if (myGamePiece.x < myGamePiece.width) {
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

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.x = x;
    this.y = y;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
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

startGame();