const basket = document.getElementById("basket");
const fallingObject = document.getElementById("falling-object");
const scoreDisplay = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

let score = 0;
let basketPosition = 160;
let objectPositionY = 0;
let objectPositionX = Math.random() * 350;
let fallingSpeed = 3;
let gameRunning = true;
let isBlackBall = false;

// Increase apple speed every 15 seconds
setInterval(() => {
    if (gameRunning) {
        fallingSpeed += 1;
    }
}, 15000);

// Move basket left & right
document.addEventListener("keydown", (event) => {
    if (gameRunning) {
        if (event.key === "ArrowLeft" && basketPosition > 0) {
            basketPosition -= 20;
        } else if (event.key === "ArrowRight" && basketPosition < 320) {
            basketPosition += 20;
        }
        basket.style.left = basketPosition + "px";
    }
});

function dropObject() {
    if (!gameRunning) return;

    objectPositionY += fallingSpeed;
    fallingObject.style.top = objectPositionY + "px";
    fallingObject.style.left = objectPositionX + "px";

    // Check if object reaches the basket
    if (objectPositionY >= 460 && objectPositionX > basketPosition - 10 && objectPositionX < basketPosition + 80) {
        if (isBlackBall) {
            gameOver("Game Over! You caught a BLACK BALL ⚫!");
            return;
        } else {
            score++;
            scoreDisplay.textContent = score;
            resetObject();
        }
    }

    // Apple (🍎) falls to the bottom → Game Over
    if (objectPositionY > 500 && !isBlackBall) {
        gameOver("Game Over! You missed the apple.");
        return;
    }

    // Black ball (⚫) falls to the bottom → Continue game
    if (objectPositionY > 500 && isBlackBall) {
        resetObject(); // Black ball is ignored
    }

    requestAnimationFrame(dropObject);
}

function resetObject() {
    objectPositionY = 0;
    objectPositionX = Math.random() * 350;
    
    // 20% chance of being a black ball
    isBlackBall = Math.random() < 0.2;
    fallingObject.style.backgroundColor = isBlackBall ? "black" : "red";
}

// End game and show restart button
function gameOver(message) {
    gameRunning = false;
    alert(message + " Your score: " + score);
    restartBtn.style.display = "block";
}

// Restart the game
function restartGame() {
    score = 0;
    scoreDisplay.textContent = score;
    basketPosition = 160;
    basket.style.left = basketPosition + "px";
    objectPositionY = 0;
    objectPositionX = Math.random() * 350;
    fallingSpeed = 3;
    gameRunning = true;
    restartBtn.style.display = "none";
    resetObject();
    dropObject();
}

// Start the game
resetObject();
dropObject();