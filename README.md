# Классическая игра "Змейка" на Javascript
Это первый pet-проект, который я выкладываю на github.

Очевидно, не обошлось без плохого кода и некоторых ошибок, но не будем о грустном.

Под капотом у игры не такой уж и оригинальный "движок" - каждые `speed` мс обновляется холст, на котором отрисовываются элементы игры:

``` javascript
  game = setInterval(drawFrame, speed);
```
1. Сначала задаются начальные параметры игры:

``` javascript
'use strict'

document.body.style.overflowY='hidden';

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//Картинка для головы змеи
const snakeHeadImg = new Image();
snakeHeadImg.src = "img/snakehead.png";

//Игровые переменные
let scoring = document.getElementById("score");
let sizeBox = 35;
let score = 0;
let speed = 200;
let sizeOfBackgroud = 12;
let button = "r";

//Переменные для отслеживания состояния игры
let game = null;
let onLose = null;
let onPause = true;
```
Здесь мы подгружаем изображение с головой змейки и создаем переменные, необходимые для подсчёта очков, определения направления движения, скорости обновления кадров и др.

2. Объект еды, который змейка должна будет съесть (содержит координаты своего местоположения на холсте):
``` javascript
let food = {
    x: Math.round(Math.random()*(sizeOfBackgroud-1))*sizeBox,
    y: Math.round(Math.random()*(sizeOfBackgroud-1))*sizeBox,
    parity: true, //переменная для анимации еды
}
```
3. Объект класса "Элемент змейки" (также содержит координаты своего местоположения):
``` javascript
class SnakeItem {
    constructor(x, y) {
        this.x = x * sizeBox;
        this.y = y * sizeBox;
    }
}

let snake = [new SnakeItem(7, 7), new SnakeItem(6, 7), new SnakeItem(5, 7)];
```
4. Методы для обновления направления движения в зависимости от того, какую клавишу нажмёт пользователь:
``` javascript
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
```
