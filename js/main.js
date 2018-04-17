
var scene = new THREE.Scene();

var box = getBox( 1, 1, 1 );
var plane = getPlane( 10 );

box.position.y = box.geometry.parameters.height / 2;
plane.rotation.x = Math.PI / 2;

scene.add(box);
scene.add(plane);

// Three.js Perspective Camera
var camera = new THREE.PerspectiveCamera(
	45, // field of view
	window.innerWidth / window.innerHeight, // aspect ratio
	1, // near clipping plane
	1000  // far clipping plane
);

// WEbGL Rendering
var renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
// document.getElementById('webgl').appendChild(renderer.domElement);
document.body.appendChild( renderer.domElement );

function getBox( width, height, depth ) {
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial(
		{
			color: 0x5599ff
		}
	);

	var cube = new THREE.Mesh(
		geometry,
		material
	);

	return cube;
}

function getPlane( size ) {
	var geometry = new THREE.PlaneGeometry( size, size );
	var material = new THREE.MeshBasicMaterial(
		{
			color: 0x666666,
			side: THREE.DoubleSide
		}
	);

	var mesh = new THREE.Mesh(
		geometry,
		material
	);

	return mesh;
}

camera.position.z = 5;
camera.position.x = 0;
camera.position.y = 2;

camera.lookAt(new THREE.Vector3( 0, 0, 0 ));

var animate = function () {
	requestAnimationFrame( animate );

	box.rotation.x += 0.0;
	box.rotation.y += 0.0;

	renderer.render( scene, camera );
};

animate();