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
  trump = loadImage("assetts/trump.png");  
  angela = loadImage("assetts/angela.png");
  trudeau = loadImage("assetts/trudeau.png");
  putin = loadImage("assetts/putin.png");
  kimjong = loadImage("assetts/kimjong.png");
  torch = loadImage("assetts/torch.png");
  
}

function setup() {
  createCanvas(1200, 800);
  // World starts with 20 creatures
  // and 20 pieces of food
  world = new World(20);

  smooth();
}

function draw() {
  background(255);
  world.run();
}

// // We can add a creature manually if we so desire
// function mousePressed() {
//   world.born(mohttps://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&ved=0ahUKEwjGuYO9vYjTAhVm44MKHU3_CKUQFggiMAE&url=https%3A%2F%2Fforum.processing.org%2Ftwo%2Fdiscussion%2F15777%2Ferror-when-using-an-if-statement-in-draw&usg=AFQjCNFK5M02eJc1nGx0zcWHDN9P4msemA&sig2=fSDRihI1mTWj3Ce3MG-p3QuseX,mouseY); 
// }

// function mouseDragged() {
//   world.born(mouseX,mouseY); 
// }

function World(num) {

  var bloops = [];    // An arraylist for all the creatures
  var food;

  // Constructor
    // Start with initial food and creatures
    food = new Food(num);
    //bloops = new ArrayList<Bloop>();              // Initialize the arraylist
    for (var i = 0; i < num; i++) {
      var lx = random(width);
      var ly = random(height);
      var dna = new DNA();
      bloops.push( new Bloop(lx, ly, dna));
    }
  

  // Make a new creature
  this.born = function(x, y) {
    var lx = x;
    var ly = y;
    var dna = new DNA();
    bloops.push(new Bloop(lx, ly, dna));
  }

  // Run the world
  this.run = function() {
    // Deal with food
    food.run();
    
    // Cycle through the ArrayList backwards b/c we are deleting
    for (var i = bloops.length-1; i >= 0; i--) {
      // All bloops run and eat
      var b = bloops[i];
      b.run();
      b.eat(food);
      // If it's dead, kill it and make food
      if (b.dead()) {
        bloops.remove(i);
        food.add(b.position);
      }
      // Perhaps this bloop would like to make a baby?
      var child = b.reproduce();
      if (child != null) bloops.push(child);
    }
  }
}


// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Evolution EcoSystem

// Creature class

function Bloop(lx, ly, dna_) {
  var positionX; // position
  var positionY;
  var dna;          // DNA
  var health;     // Life timer
  var xoff;       // For perlin noise
  var yoff;
  // DNA will determine size and maxspeed
  var r;
  var maxspeed;

  // Create a "bloop" creature

  positionX = lx;
  positionY = ly;
  health = 200;
  xoff = random(1000);
  yoff = random(1000);
  dna = dna_;
  // Gene 0 determines maxspeed and r
  // The bigger the bloop, the slower it is
  maxspeed = map(dna.genes[0], 0, 1, 15, 0);
  r = map(dna.genes[0], 0, 1, 0, 50);


  this.run = function() {
    this.update();
    this.borders();
    this.display();
  }.bind(this);

  // A bloop can find food and eat it
  this.eat = function(f) {
    var food = f.getFood();
    // Are we touching any food objects?
    for (var i = food.size()-1; i >= 0; i--) {
      var foodposition = food[i];
      var d = dist(positionX, positionY, foodposition.x, foodposition.y);

      //var d = PVector.dist(position, foodposition);
      // If we are, juice up our strength!
      if (d < r/2) {
        health += 100; 
        food.pop(i);
      }
    }
  }

  // At any moment there is a teeny, tiny chance a bloop will reproduce
  this.reproduce = function() {
    // asexual reproduction
    if (random(1) < 0.0005) {
      // Child is exact copy of single parent
      var childDNA = dna.copy();
      // Child DNA can mutate
      childDNA.mutate(0.01);
      return Bloop(positionX, positionY, childDNA);
    } 
    else {
      return null;
    }
  }

  // Method to update position
  this.update = function() {
    // Simple movement based on perlin noise
    var vx = map(noise(xoff),0,1,-maxspeed,maxspeed);
    var vy = map(noise(yoff),0,1,-maxspeed,maxspeed);
    var velocity = {x:vx, y:vy};
    xoff += 0.01;
    yoff += 0.01;

    positionX += velocity.x;
    positionY += velocity.y;
    //position.add(velocity);
    // Death always looming
    health -= 0.2;
  }

  // Wraparound
  this.borders = function() {
    if (positionX < -r) positionX = width+r;
    if (positionY < -r) positionY = height+r;
    if (positionX > width+r) positionX = -r;
    if (positionY > height+r) positionY = -r;
  }

  // Method to display
  this.display = function() {
    ellipseMode(CENTER);
    if (r >= 40) {
      image(trump, positionX, positionY, trump.width/2, trump.height/2);
    } else if (r < 40 && r >= 30) {
      image(angela, positionX, positionY, angela.width/2, angela.height/2);
    } else if (r < 30 && r >= 20) {
      image(putin, positionX, positionY, putin.width/2, putin.height/2);
    } else if (r < 20 && r >= 10) {
      image(kimjong, positionX, positionY, kimjong.width/2, kimjong.height/2);
    } else if (r < 10 && r >= 0) {
      image(trudeau, positionX, positionY, trudeau.width/2, trudeau.height/2);
    }
    
  }

  // Death
  this.dead = function() {
    if (health < 0.0) {
      return true;
    } 
    else {
      return false;
    }
  }
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Evolution EcoSystem

// A collection of food in the world

function Food(num) {
  var food = [];
 
    // Start with some food
    //food = new ArrayList();
    for (var i = 0; i < num; i++) {
       food.push(random(width),random(height)); 
    }
   
  
  // Add some food at a position
  this.add = function(lx, ly) {
    var f = {x:lx, y:ly};
    food.push(f); 
    
  }
  
  // Display the food
  this.run = function() {
    for (var j = 0; j < food.length; j++) {
      image(torch, food[j].x, food[j].y, torch.width, torch.height);
    }
  
       
      // There's a small chance food will appear randomly
    if (random(1) < 0.001) {
       food.add(random(width),random(height)); 
    }
  }
  
  // Return the list of food
  this.getFood = function() {
    return food; 
  }
}

// Evolution EcoSystem
// Daniel Shiffman <http://www.shiffman.net>

// Class to describe DNA
// Has more features for two parent mating (not used in this example)

function DNA(newgenes) {

  // The genetic sequence
  this.genes = [];
  
  // Constructor (makes a random DNA)
    // DNA is random floating point values between 0 and 1 (!!)
    //genes = new float[1];
    for (var i = 0; i < this.genes.length; i++) {
      this.genes[i] = random(0,1);
    }
  
  
  
  this.genes = newgenes;
  
  
  this.copy = function() {
    var newgenes = [];
    //arraycopy(genes,newgenes);
    // JS mode not supporting arraycopy
    for (var i = 0; i < newgenes.length; i++) {
      newgenes[i] = this.genes[i];
    }
    
    return DNA(newgenes);
  }
  
  // Based on a mutation probability, picks a new random character in array spots
  this.mutate = function(m) {
    for (var i = 0; i < this.genes.length; i++) {
      if (random(1) < m) {
         this.genes[i] = random(0,1);
      }
    }
  }
}