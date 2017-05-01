var container, stats;

var camera, scene, renderer, controls;

var targetRotation = 0;
var oldTargetRotation = targetRotation;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseY = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var width = window.innerWidth;
var height = window.innerHeight;

var TOTALBALLS = 10;
var MULTIPLIER = 10;


// Array for all dates
var dates = [];
var dateArrays = [];
var trees = [];

// divide screen into grid
var buffer = window.innerWidth/10;
var CELLWIDTH = (window.innerWidth)/7;
var CELLHEIGHT = (window.innerHeight)/4; 

// for raycaster
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var labelToggle;

window.addEventListener('load', init);


function init() {

  container = document.createElement( 'div' );
  document.body.appendChild( container );

  var info = document.createElement( 'div' );
  info.style.position = 'absolute';
  info.style.color = '#ffffff';
  info.style.top = '50px';
  info.style.width = '100%';
  info.style.textAlign = 'center';
  info.innerHTML = 'Binary We: A visualition of text messages 03-26-2017 - 04-22-2017';
  container.appendChild( info );

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.set( 0, 0, 1500 );
  //camera.lookAt(0,0,0);
  scene.add( camera );

  var light = new THREE.PointLight( 0xffffff, 0.8 );
  camera.add( light );

  // Create an array of desired dates from 03-26 through 04-22
  for (var i = 0; i < 6; i++) {
    var day = 26 + i;
    var newDate = "03-" + day;
    var newArray = [];
    dates.push(newDate);
    dateArrays.push(newArray);
  }

  for (var i = 0; i < 9; i++) {
    var day = 1 + i;
    var newDate = "04-0" + day;
    var newArray = [];
    dates.push(newDate);
    dateArrays.push(newArray);
  }

  for (var i = 0; i < 13; i++) {
    var day = 10 + i;
    var newDate = "04-" + day;
    var newArray = [];
    dates.push(newDate);
    dateArrays.push(newArray);
  }

  // sort messages by day, and put in separate arrays 
  for (var k = 0; k < messages.length; k++) {
    var msgDate = messages[k].date;

    for (var l = 0; l < dates.length; l++) {
      var date = dates[l];

      if (msgDate.includes(date)) {
        dateArrays[l].push(messages[k]);
        break;
      }

    }

  }


  // create 7 x 4 grid of trees 
  var xCtr = 7; 
  var yCtr = 4;
  var yLabelCtr = 0;

  for (var j = 0; j < dates.length; j++) {
    var msgArray = dateArrays[j];
    var treeX = 0;
    var treeY = 0;
    var labelX = 0;
    var labelY = 0;
    //var xOffset = width/20;
    var yOffset = height/6;

    if (xCtr < 7) {
      treeX = (CELLWIDTH * xCtr) + (CELLWIDTH / 2) - windowHalfX;
      treeY = (CELLHEIGHT * yCtr) - windowHalfY + yOffset;

      labelX = (CELLWIDTH * xCtr);
      labelY = (CELLHEIGHT * yLabelCtr) - yOffset;

      xCtr++;
    } else {
      xCtr = 0; // reset x to 0;
      yCtr--; // move line down;
      yLabelCtr++; // move label down;

      treeX = (CELLWIDTH * xCtr) + ((CELLWIDTH) /2) - windowHalfX;
      treeY = (CELLHEIGHT * yCtr) - windowHalfY  + yOffset;

      labelX = (CELLWIDTH * xCtr);
      labelY = (CELLHEIGHT * yLabelCtr)  - yOffset;
      
      xCtr++; // move x one column over;
    }

    // make a group for each tree to allow rotation 
    var group =  new THREE.Group();
    group.position.x = treeX;
    group.position.y = treeY;

    // make a plane for each to catch raycaster 
    var squareGeometry = new THREE.Geometry(); 
    squareGeometry.vertices.push(new THREE.Vector3(0 - (CELLWIDTH/2), 0, 0.0)); 
    squareGeometry.vertices.push(new THREE.Vector3(CELLWIDTH/2, 0, 0.0)); 
    squareGeometry.vertices.push(new THREE.Vector3(CELLWIDTH/2, -CELLHEIGHT, 0.0)); 
    squareGeometry.vertices.push(new THREE.Vector3(0 - (CELLWIDTH/2), -CELLHEIGHT, 0.0));
    squareGeometry.faces.push(new THREE.Face3(0, 1, 2)); 
    squareGeometry.faces.push(new THREE.Face3(0, 2, 3)); 
       
     // Create a white invisible material and activate the 'doubleSided' attribute. 
    var squareMaterial = new THREE.MeshBasicMaterial({ 
      color:0xFFFFFF, 
      side:THREE.DoubleSide ,
      visible:false
    }); 
       

    var squareMesh = new THREE.Mesh(squareGeometry, squareMaterial); 
    group.add(squareMesh); 


    scene.add(group);

    var tree = new Tree(0, 0, msgArray, group);
    var trav = false;

    if (msgArray.length > 0) {
      trav = true;
      tree.traverse();
    }

    //console.log(j, trav);
    
    trees.push(tree);

    var label = document.createElement( 'div' );
    label.className += 'label';
    label.style.visibility = 'hidden';
    label.style.color = '#ffffff';
    label.style.position = 'absolute';
    label.style.left = labelX + "px";
    label.style.top = labelY + "px";
    label.style.width = CELLWIDTH + "px";
    label.style.textAlign = 'center';
    label.innerHTML = dates[j];
    container.appendChild( label );
    
  }

  // make renderer

  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setClearColor( 0x222222 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  // stats = new Stats();
  // container.appendChild( stats.dom );

  controls = new THREE.TrackballControls( camera, renderer.domElement );

  window.addEventListener( 'resize', onWindowResize, false );
  
  labelToggle = document.getElementById('toggle');
  labelToggle.addEventListener('click', toggleLabels);

  animate();

}

function toggleLabels(event) {
  console.log('hello');

  var labels = document.getElementsByClassName("label");

  if (labels[0].style.visibility == 'hidden') {
    for (var i = 0; i < labels.length; i++) {
      labels[i].style.visibility = 'visible';
    }

    event.srcElement.innerHTML = 'hide labels';

  } else {
    for (var i = 0; i < labels.length; i++) {
       labels[i].style.visibility = 'hidden';
     }
    
    event.srcElement.innerHTML = 'show labels';

  }
     
}


function onWindowResize() {

  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

}



function onMouseMove( event ) {

  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

//

function animate() {

  requestAnimationFrame( animate );

  render();

}

function render() {


  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera( mouse, camera );

  // calculate objects intersecting the picking ray
  var intersects = raycaster.intersectObjects( scene.children, true );


  for ( var i = 0; i < intersects.length; i++ ) {

    intersects[0].object.parent.rotation.y += 0.01;

  }

  //controls.update();
  //console.log(camera.position.z);
    
  renderer.render( scene, camera );

}

window.addEventListener( 'mousemove', onMouseMove, false );




