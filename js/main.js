function init() {
	var scene = new THREE.Scene();

	var gui = new dat.GUI();

	var enableFog = false;
	if (enableFog) {
		scene.fog = new THREE.FogExp2( '#fff', 0.2 );
	}

	var cube = getBox( 1, 1, 1 );
	cube.name = 'cube-1';
	cube.castShadow = true;
	cube.position.x = cube.geometry.parameters.height / 2;
	cube.position.y = cube.geometry.parameters.width / 2;
	gui.add( cube.position, 'x', -10, 10 );
	gui.add( cube.position, 'y', .5, 10 );
	gui.add( cube.position, 'z', -10, 10 );

	var plane = getPlane( 20 );
	plane.name = 'plane-1';
	plane.receiveShadow = true;
	plane.rotation.x = Math.PI / 2;

	var pointLight = getPointLight( '#fff', 2 );
	pointLight.name = 'pointlight-1';
	//pointLight.position.x = 0;
	//pointLight.position.y = 2;
	//pointLight.position.z = 0;
	//pointLight.castShadow = true;
	//gui.add( pointLight, 'intensity', 0, 10 );
	//gui.add( pointLight.position, 'x', -20, 20 );
	//gui.add( pointLight.position, 'y', 0, 5 );
	//gui.add( pointLight.position, 'z', -20, 20 );

	var sphere = getSphere( 0.05 );
	sphere.name = 'sphere-1';

	scene.add(cube);
	scene.add(plane);
	pointLight.add(sphere);
	scene.add(pointLight);
	
	// Three.js Perspective Camera
	var camera = new THREE.PerspectiveCamera(
		45, // field of view
		window.innerWidth / window.innerHeight, // aspect ratio
		1, // near clipping plane
		1000  // far clipping plane
	);

	camera.name = 'camera-1';
	camera.position.x = 0;
	camera.position.y = 2;
	camera.position.z = 5;
	gui.add( camera.position, 'z', -12, 12 );
	gui.add( camera.position, 'x', -6, 6 );
	gui.add( camera.position, 'y', 0, 10 );
	camera.lookAt(new THREE.Vector3( 0, 0, 0 ));

	// WEbGL Rendering
	var renderer = new THREE.WebGLRenderer();

	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setClearColor('#000', 1.0 );
	renderer.shadowMap.enabled = true;
	document.body.appendChild( renderer.domElement );
	update( renderer, scene, camera );

	return scene;
}

function getBox( width, height, depth ) {
	var geometry = new THREE.CubeGeometry( 1, 1, 1 );
	var material = new THREE.MeshPhongMaterial(
		{
			color: 'rgb( 120, 120, 120 )'
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
	var material = new THREE.MeshPhongMaterial(
		{
			color: 'rgb( 120, 120, 120 )',
			side: THREE.DoubleSide
		}
	);

	var plane = new THREE.Mesh(
		geometry,
		material
	);

	return plane;
}

function getPointLight( color, intensity ) {
	var light = new THREE.PointLight( color, intensity );

	return light;
}

function getSphere( size ) {
	var geometry = new THREE.SphereGeometry( size, 24, 24 );
	var material = new THREE.MeshBasicMaterial(
		{
			color: 'rgb( 255, 255, 255 )'
		}
	);

	var sphere = new THREE.Mesh(
		geometry,
		material
	);

	return sphere;
}

var control_1 = new function() {
	this.intensity = 2;
	this.x = 0;
	this.y = 2;
	this.z = 0; 
	this.castShadow = true; 
}

addControlGui_1( control_1 );

function addControlGui_1( controlObj ) {
	var gui = new dat.GUI();
	gui.add( controlObj, 'intensity', 0, 10 );
	gui.add( controlObj, 'x', -20, 20 );
	gui.add( controlObj, 'y', 0, 20 );
	gui.add( controlObj, 'z', -20, 20 );
	gui.add( controlObj, 'castShadow', true, false );
}

/** Camera controls 
var control_2 = new function() {
	this.x = 0;
	this.y = 2;
	this.z = 5;
	this.lookAt = true; 
}

addControlGui_2( control_2 );

function addControlGui_2( controlObj ) {
	var gui = new dat.GUI();
	gui.add( controlObj, 'x', -100, 100 );
	gui.add( controlObj, 'y', -100, 100 );
	gui.add( controlObj, 'z', -100, 100 );
}
**/

function update( renderer, scene, camera ) {
	renderer.render(
		scene,
		camera
	);

	var cube = scene.getObjectByName('cube-1');
	cube.rotation.y += 0.05;

	var pointLight = scene.getObjectByName('pointlight-1');
	pointLight.intensity = control_1.intensity;
	pointLight.position.x = control_1.x;
	pointLight.position.y = control_1.y;
	pointLight.position.z = control_1.z;
	pointLight.castShadow = control_1.castShadow;

	/** Camera controls **
	var camera = camera.getObjectByName('camera-1');
	camera.position.x = control_2.x;
	camera.position.y = control_2.y;
	camera.position.z = control_2.z;
	**/

	requestAnimationFrame( function() {
		update( renderer, scene, camera );
	});
}

var scene = init();