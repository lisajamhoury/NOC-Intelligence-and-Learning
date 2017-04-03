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


  this.run() {
    this.update();
    this.borders();
    this.display();
  }.bind(this);

  // A bloop can find food and eat it
  this.eat(f) {
    var food = f.getFood();
    // Are we touching any food objects?
    for (var i = food.size()-1; i >= 0; i--) {
      var foodposition = food[i];
      var d = dist(positionX, positionY, foodposition.x, foodposition.y;

      //var d = PVector.dist(position, foodposition);
      // If we are, juice up our strength!
      if (d < r/2) {
        health += 100; 
        food.pop(i);
      }
    }
  }

  // At any moment there is a teeny, tiny chance a bloop will reproduce
  this.reproduce() {
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
  this.update() {
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
  this.borders() {
    if (positionX < -r) positionX = width+r;
    if (positionY < -r) positionY = height+r;
    if (positionX > width+r) positionX = -r;
    if (positionY > height+r) positionY = -r;
  }

  // Method to display
  this.display() {
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
  this.dead() {
    if (health < 0.0) {
      return true;
    } 
    else {
      return false;
    }
  }
}