// Evolution EcoSystem
// Daniel Shiffman <http://www.shiffman.net>

// Class to describe DNA
// Has more features for two parent mating (not used in this example)

function DNA(newgenes) {

  // The genetic sequence
  var genes = [];
  
  // Constructor (makes a random DNA)
    // DNA is random floating point values between 0 and 1 (!!)
    //genes = new float[1];
    for (var i = 0; i < genes.length; i++) {
      genes[i] = random(0,1);
    }
  
  
  
  genes = newgenes;
  
  
  this.copy() {
    var newgenes = [];
    //arraycopy(genes,newgenes);
    // JS mode not supporting arraycopy
    for (var i = 0; i < newgenes.length; i++) {
      newgenes[i] = genes[i];
    }
    
    return DNA(newgenes);
  }
  
  // Based on a mutation probability, picks a new random character in array spots
  this.mutate(m) {
    for (var i = 0; i < genes.length; i++) {
      if (random(1) < m) {
         genes[i] = random(0,1);
      }
    }
  }
}