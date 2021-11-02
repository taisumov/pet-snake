'use strict'

document.body.style.overflowY='hidden';

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/playround.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

const snakeHeadImg = new Image();
snakeHeadImg.src = "img/snakehead.png";

let scoring = document.getElementById("score");
let sizeBox = 35;
let score = 0;
let speed = 200;
let sizeOfBackgroud = 12;

let button = "r";
let game = null;

let onLose = null;
let onPause = true;

let food = {
    x: Math.round(Math.random()*(sizeOfBackgroud-1))*sizeBox,
    y: Math.round(Math.random()*(sizeOfBackgroud-1))*sizeBox,
    parity: true,
}

class SnakeItem {
    constructor(x, y) {
        this.x = x * sizeBox;
        this.y = y * sizeBox;
    }
}

let snake = [new SnakeItem(7, 7), new SnakeItem(6, 7), new SnakeItem(5, 7)];

function setMoving() {
    if (event.code == 'KeyS' && button != "u") {
      button = "d";
    }
    if (event.code == 'KeyA' && button != "r") {
        button = "l";
    }
    if (event.code == 'KeyW' && button != "d") {
        button = "u"
    }
    if (event.code == 'KeyD' && button != "l") {
        button = "r";
    }
}

let moving = () => {
    
        for (let i = snake.length-1; i >= 1; i--) {
            snake[i].x = snake[i-1].x;
            snake[i].y = snake[i-1].y;
        }
    
        if (button == "u"){
            snake[0].y -= sizeBox;
        }
        if (button == "l"){
            snake[0].x -= sizeBox;
        }
        if (button == "r"){
            snake[0].x += sizeBox;
        }
        if (button == "d"){
            snake[0].y += sizeBox;
        }
}

let checkLose = () => {

    if((snake[0].x >= sizeBox*sizeOfBackgroud) || (snake[0].x < 0) || (snake[0].y >= sizeBox*sizeOfBackgroud) || (snake[0].y < 0)){
                onLose = true;
                clearTimeout(game);
                //btnStart.innerHTML = "Restart";
    } else {
        for (let i = 1; i < snake.length; i++) {
            if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
                onLose = true;
                clearTimeout(game);
            }
        }
    }

}

let renderBackground = () => {
    
    canvas.width = sizeBox*sizeOfBackgroud;
    canvas.height = sizeBox*sizeOfBackgroud;

    for (let i = 0; i < sizeOfBackgroud; i++){
        for(let j = 0; j < sizeOfBackgroud; j++){
            ctx.fillStyle = "#08080F";
            ctx.fillRect(i*sizeBox+2, j*sizeBox+2, sizeBox-4, sizeBox-4);
        }
    }
}

let drawFrame = () => {

    checkLose();

    renderBackground();

    ctx.fillStyle = "#E72929";
    if (food.parity) {
        ctx.fillRect(food.x + 2, food.y + 2, sizeBox - 4, sizeBox - 4);    
    } else {
        ctx.fillRect(food.x + 4, food.y + 4, sizeBox - 8, sizeBox - 8);
    }
	
    food.parity = !food.parity;

    moving();
	
    ctx.drawImage(snakeHeadImg, snake[0].x + 2, snake[0].y + 2, sizeBox - 4, sizeBox - 4);
    for (let i = 1; i < snake.length; i++) {
        ctx.fillStyle = "#29E75E";
		ctx.fillRect(snake[i].x + 2, snake[i].y + 2, sizeBox - 4, sizeBox - 4);
    }

    if (snake[0].x == food.x && snake[0].y == food.y)
    {
        score++;
        scoring.innerHTML = score;

        let scoreSound = new Audio("audio/score.mp3");
        scoreSound.volume = 0.2;
        scoreSound.play();

        for(let i = 0; i < snake.length; i++) {
            while (food.x == snake[i].x && food.y == snake[i].y){
                food.x = Math.round(Math.random()*(sizeOfBackgroud-1))*sizeBox;
                food.y = Math.round(Math.random()*(sizeOfBackgroud-1))*sizeBox;
            }
        }

        let new_snake = new SnakeItem(0, 0);

        if (snake[snake.length-1].x != snake[snake.length-2].x) {
            new_snake.x = snake[snake.length-1].x > snake[snake.length-2].x ? snake[snake.length-1].x + 1 : snake[snake.length-1].x - 1; 
        }

        if (snake[snake.length-1].y != snake[snake.length-2].y) {
            new_snake.y = snake[snake.length-1].y > snake[snake.length-2].y ? snake[snake.length-1].y + 1 : snake[snake.length-1].y - 1; 
        }

        snake.push(new_snake);
    }

    
}

let start = () => {

    if(onPause) {
        onPause = false;
    } else {
        button = "r";
        snake = [new SnakeItem(7, 7), new SnakeItem(6, 7), new SnakeItem(5, 7)];
        score = 0;
        scoring.innerHTML = score;

        if(onLose) {
            onLose = false;
        }

    }

    clearTimeout(game);
    game = setInterval(drawFrame, speed);
}

let pause = () => {
    onPause = true;
    clearTimeout(game);
}

document.addEventListener('keydown', function(event) {
    if (event.code == "Space") {
        if(onLose){
            start();
        } else {
            if (!onPause) {
                pause();
            } else {
                start();
            }
        }

    } else {
        setMoving();
    }
}
);

renderBackground();
