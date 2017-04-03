// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Evolution EcoSystem

// The World we live in
// Has bloops and food

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
  }

  // Make a new creature
  this.born(x, y) {
    var lx = x;
    var ly = y;
    var dna = new DNA();
    bloops.push(new Bloop(lx, ly, dna));
  }

  // Run the world
  this.run() {
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