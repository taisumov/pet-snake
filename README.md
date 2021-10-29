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
