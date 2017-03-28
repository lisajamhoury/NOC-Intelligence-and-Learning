var container, stats;

var camera, scene, renderer;

var group;

var targetRotation = 0;
var oldTargetRotation = targetRotation;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseY = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var width = 800;
var height = 600;

var TOTALBALLS = 50;
var MULTIPLIER = 50;

// Binary tree
var tree;


init();
animate();

function init() {

	container = document.createElement( 'div' );
	document.body.appendChild( container );

	var info = document.createElement( 'div' );
	info.style.position = 'absolute';
	info.style.top = '10px';
	info.style.width = '100%';
	info.style.textAlign = 'center';
	container.appendChild( info );

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 1000 );
	camera.position.set( 0, 0, 1000 );
	scene.add( camera );

	var light = new THREE.PointLight( 0xffffff, 0.8 );
	camera.add( light );

	group = new THREE.Group();
	group.position.y = 200;
	group.position.z = 100;
	//group.position.x = 
	scene.add( group );

	var loader = new THREE.TextureLoader();
	var texture = loader.load( "../shared/textures/UV_Grid_Sm.jpg" );

	// it's necessary to apply these settings in order to correctly display the texture on a shape geometry

	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.repeat.set( 0.008, 0.008 );

			// New tree
	tree = new Tree();

	// Add ten random values
  for (var i = 0; i < TOTALBALLS; i++) {
  	var value = Math.floor((Math.random() * MULTIPLIER));
    tree.addValue(value);
  }
  
  tree.traverse();

  // var result = tree.search(10);
  // if (result == null) {
  //   console.log('not found');
  // } else {
  //   console.log(result);
  // }


	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setClearColor( 0xffffff );
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	stats = new Stats();
	container.appendChild( stats.dom );

	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );

	//

	window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

	windowHalfX = window.innerWidth / 2;
	windowHalfY = window.innerHeight / 2;

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

//

function onDocumentMouseDown( event ) {

	event.preventDefault();

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mouseout', onDocumentMouseOut, false );

	// mouseXOnMouseDown = event.clientX - windowHalfX;
	// targetRotationOnMouseDown = targetRotation;

	mouseYOnMouseDown = event.clientY - windowHalfY;
	targetRotationOnMouseDown = targetRotation;

}

function onDocumentMouseMove( event ) {

	//mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;

	//targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
	targetRotation = targetRotationOnMouseDown + ( mouseY - mouseXOnMouseDown ) * 0.02;

}

function onDocumentMouseUp( event ) {

	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentMouseOut( event ) {

	document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

// Not updated for vertical
function onDocumentTouchStart( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

		mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
		targetRotationOnMouseDown = targetRotation;

	}

}

function onDocumentTouchMove( event ) {

	if ( event.touches.length == 1 ) {

		event.preventDefault();

		mouseX = event.touches[ 0 ].pageX - windowHalfX;
		targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

	}

}

//

function animate() {

	requestAnimationFrame( animate );

	render();
	stats.update();

}

function render() {

	if (targetRotation !== oldTargetRotation) {
		group.rotation.y += ( targetRotation - group.rotation.y ) * 0.05;
		oldTargetRotation = targetRotation; 
	} else {
		group.rotation.y += 0.001;
	}
		
	renderer.render( scene, camera );

}
