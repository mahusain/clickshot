
let state = 'title';
let cnv;
let canvasClicked;
let starterlevel;
let points = 0;
let lives = 3;
let w = 300;
let h = 600;
let player;
let coins = [];
let fakes = [];
let click = [];
let titleImg
let playerImg;
let coinImg;
let fakeImg;
let clickImg;

function preload(){
  titleImg = loadImage('assets/titlescreenLQ.png')
  backgroundImg = loadImage('assets/background.png')
  playerImg = loadImage('assets/CursorSpace.png')
  coinImg = loadImage('assets/article1.png', 'assets/article2.png')
  fakeImg = loadImage('assets/fakearticle1.png')
  clickImg = loadImage('assets/clicker.png')
}
function setup() {
  cnv = createCanvas(w, h);
  textFont('monospace');

  imageMode(CENTER);
  rectMode(CENTER);
  player = new Player();
  coins.push(new Coins());
  fakes.push(new Fakes());
  click.push(new Click());
}

function draw() {

  switch (state){
    case 'title':
      title();
      cnv.mouseClicked(titleClicked);
      break;
      case 'starterlevel':
      level1();
      //cnv.mouseClicked(starterlevelclicked);
      break;
      case 'boost complete':
      boostComplete();
      cnv.mouseClicked(boostCompleteClicked);
      break
      case 'data corrupted':
      dataCorrupted();
      cnv.mouseClicked(dataCorruptedClicked);
      break
      default:
      break;
  }

  if (state === 'title') {
  title();
  cnv.mouseClicked(titleClicked);
  } else if (state === 'starterlevel' && points > 50) {
  level1();
  //cnv.mouseClicked(starterlevelclicked);

}
}

function keyPressed(){
  if (keyCode == LEFT_ARROW){
    player.direction = 'left'
  } else if (keyCode == RIGHT_ARROW){
    player.direction = 'right'
  } else if (keyCode == UP_ARROW){
    player.direction = 'up'
  } else if (keyCode == DOWN_ARROW){
    player.direction = 'down'
  } else if (key == ' '){
    player.direction = 'still';
  } else if (keyCode == ENTER){
    click.push(new Click());
  }
}

function keyReleased(){

  let numberKeysPressed = 0;

  if (keyIsDown(LEFT_ARROW)){
    numberKeysPressed++;
  }

  if (keyIsDown(UP_ARROW)){
    numberKeysPressed++;
  }

  if (keyIsDown(DOWN_ARROW)){
    numberKeysPressed++;
  }

  if (keyIsDown(RIGHT_ARROW)){
    numberKeysPressed++;
  }

  player.direction = 'still';
}

function title(){
  background(0, 200, 200);
  image(titleImg, w/2, h/2);
  textAlign(CENTER);
  textSize(20);
  text('click to start', w/2 , h/2);
}
function titleClicked(){
  console.log('canvas is clicked');
  state = 'starterlevel';
}

function level1(){
  image(backgroundImg, 100, 500);
  if (random(1) <= 0.03){
    coins.push(new Coins());
  }
  if (random(1) <= 0.02){
    fakes.push(new Fakes())
  }
  player.display();
  player.move();


  for (let i = 0; i < coins.length; i++){
  coins[i].display();
  coins[i].move();
  }

  for (let i = 0; i < fakes.length; i++){
  fakes[i].display();
  fakes[i].move();
  }

  for (let i = 0; i < click.length; i++){
  click[i].display();
  click[i].move();
  }

for (let i = click.length - 1; i >= 0; i--){

  for (let j = coins.length - 1; j > 0; j--){
  if (click[i] && dist(click[i].x, click[i].y, coins[j].x, coins[j].y) <= (click[i].r + coins[j].r) / 2){
    points++;
    console.log(points);
    coins.splice(j, 1);
  } else if (coins[j].y > h){
    coins.splice(j, 1);
    click.splice(i, 1);
    console.log("page no longer found");
  }
    for (let j = fakes.length - 1; j > 0; j--){
  if (click[i] && dist(click[i].x, click[i].y, fakes[j].x, fakes[j].y) <= (click[i].r + fakes[j].r) / 2){
    points--;
    console.log(points);
    fakes.splice(j, 1);
  } else if (fakes[j].y > h){
    fakes.splice(j, 1);
    click.splice(i, 1);
    console.log("fake dodged");
  }
  }
  }
}

    if(points >= 10){
    state = 'boost complete';
    }

    if(points <= -1){
    state = 'data corrupted';
    }


text('points: ' + points, w/2, h - 30);
}
//function starterlevelclicked() {
  //console.log('boost = ' + points);
  //points++;

  //if(points >= 10){
    //state = 'boost complete';
  //}
  //}
function boostComplete(){
  background(0, 200, 200);
  textSize(20);
  text('Nice browsing!', w/2, h/3);

  textSize(20);
  text('Click to go again!', w/2, h/2);
}
function boostCompleteClicked(){
  state = 'starterlevel';
  points = 0;

  fakes = [];
  click = [];
}
function dataCorrupted(){

  if (lives >= 0){
  background(200, 0, 0);
  textSize(20);
  text('Your PC detected a virus', w/2, h/3);

  textSize(15);
  text(lives + ' chances left. Be careful.', w/2, h/2);
  } else {
  background(200, 0, 0);
  textSize(10);
  text('Your files were infected!', w/2, h/3);

  textSize(10);
  text('You have to start over', w/2, h/2);
  }


}
function dataCorruptedClicked(){
  if (lives >= -1){
  state = 'starterlevel';
  lives--;
  } else {
  state = 'title'
  }
  fakes = [];
  click = [];
  points = 0;
}
