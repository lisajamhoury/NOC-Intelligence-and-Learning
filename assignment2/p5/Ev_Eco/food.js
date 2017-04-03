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
  } 
  
  // Add some food at a position
  this.add(lx, ly) {
    var f = {x:lx, y:ly};
    food.push(f); 
    }
  }
  
  // Display the food
  this.run() {
    for (var j = 0; j < food.length; j++) {
      image(torch, food[j].x, food[j].y, torch.width, torch.height);
  
    }
    
//       rectMode(CENTER);
       
//       stroke(0);
//       fill(175);
//       rect(f.x,f.y,8,8);
    } 
    
    // There's a small chance food will appear randomly
    if (random(1) < 0.001) {
       food.add(random(width),random(height)); 
    }
  }
  
  // Return the list of food
  this.getFood() {
    return food; 
  }
}