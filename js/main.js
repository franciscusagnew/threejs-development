function init() {
	var scene = new THREE.Scene();
	var enableFog = true;

	if (enableFog) {
		scene.fog = new THREE.FogExp2( '#fff', 0.2 );
	}

	var cube = getBox( 1, 1, 1 );
	var plane = getPlane( 20 );

  cube.name = 'cube-1';
	plane.name = 'plane-1';

	cube.position.y = cube.geometry.parameters.height / 2;
	plane.rotation.x = Math.PI / 2;

	scene.add(cube);
	scene.add(plane);

	// Three.js Perspective Camera
	var camera = new THREE.PerspectiveCamera(
		45, // field of view
		window.innerWidth / window.innerHeight, // aspect ratio
		1, // near clipping plane
		1000  // far clipping plane
	);

	camera.position.z = 5;
	camera.position.x = 0;
	camera.position.y = 2;

	camera.lookAt(new THREE.Vector3( 0, 0, 0 ));

	// WEbGL Rendering
	var renderer = new THREE.WebGLRenderer();

	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor('#ffffff');
	// document.getElementById('webgl').appendChild(renderer.domElement);
	document.body.appendChild( renderer.domElement );
	update( renderer, scene, camera );

	return scene;
}

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

	var plane = new THREE.Mesh(
		geometry,
		material
	);

	return plane;
}

function update( renderer, scene, camera ) {
	renderer.render(
		scene,
		camera
	);

	var cube = scene.getObjectByName('cube-1');
	cube.rotation.y += 0.05;

	requestAnimationFrame( function() {
		update( renderer, scene, camera );
	});
}

var scene = init();