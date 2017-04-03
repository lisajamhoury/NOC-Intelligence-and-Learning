// Evolution EcoSystem
// Daniel Shiffman <http://www.shiffman.net>
// The Nature of Code

// A World of creatures that eat food
// The more they eat, the longer they survive
// The longer they survive, the more likely they are to reproduce
// The bigger they are, the easier it is to land on food
// The bigger they are, the slower they are to find food
// When the creatures die, food is left behind


var world;

var trump;
var angela;
var trudeau;
var putin;
var kimjong;
var torch;

function preload() {
  world = new World(20);
  trump = loadImage("assetts/trump.png");  
  angela = loadImage("assetts/angela.png");
  trudeau = loadImage("assetts/trudeau.png");
  putin = loadImage("assetts/putin.png");
  kimjong = loadImage("assetts/kimjong.png");
  torch = loadImage("assetts/torch.png");
  

}

function setup() {
  createCanvas(1300, 700);
  // World starts with 20 creatures
  // and 20 pieces of food
  world = new World(20);
}

function draw() {
  background(255,224,189);
  world.run();
}

// We can add a creature manually if we so desire
function mousePressed() {
  world.born(mouseX,mouseY); 
}

function mouseDragged() {
  world.born(mouseX,mouseY); 
}


