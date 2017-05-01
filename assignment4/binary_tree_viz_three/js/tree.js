// Daniel Shiffman
// Nature of Code: Intelligence and Learning
// https://github.com/shiffman/NOC-S17-2-Intelligence-Learning

// Tree object
function Tree(posX, posY, iMsgs, group) {
  // Just store the root
  this.root = null;
  this.rootX = posX;
  this.rootY = posY;
  this.msgs = iMsgs;
  this.group = group;
  // this.group.position.x = 500;
  // this.group.position.y = 200;
  // this.group.position.z = 0;
  //group.applyMatrix( new THREE.Matrix4().makeTranslation(posX, posY, 0) );

  this.initTree();
}

Tree.prototype.initTree = function() {
 for (var i = 0; i < this.msgs.length; i++) {
   //var value = Math.floor((Math.random() * MULTIPLIER));
    var value = this.msgs[i].words; // size is amount of words 
    var person = this.msgs[i].person;
    this.addValue(value, person);
 } 
}

// Start by visiting the root
Tree.prototype.traverse = function() {
  this.root.visit(this.root);
}

// Start by searching the root
Tree.prototype.search = function(val) {
  var found = this.root.search(val);
  return found;
}

// Add a new value to the tree
Tree.prototype.addValue = function(val, person) {
  var n = new Node(val, person, this.group);
  if (this.root == null) {
    this.root = n;
    // An initial position for the root node
    this.root.x = this.rootX;
    this.root.y = this.rootY;
  } else {
    this.root.addNode(n);
  }
}


