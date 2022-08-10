import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import {buildTerrain,table,planes,walls,cylinders,holes} from './buildTerrain.js';
import {BuildBlock,BuildPowerBar,BuildFlag,matLine2,matLine3} from './buildThing.js';
import {Particle} from './Particle.js'
import {textureAnimate,onWindowResize,render} from './render.js'
import {Steve,matLine} from './Steve.js'
import {keyPressed} from './keyPressed.js'

var camera,camera2,cameraM,cameraHUD,cameraStroke,cameraOrbit, scene,sceneHUD,sceneStroke, renderer, switchCamera;
var steve,balls = [];
var texture;
var clock = new THREE.Clock();
var stroke;
var PowerBar,block;
var ballR = 1;
var light;
var start = false;
var flag;

function init() {
  switchCamera = true;
  scene = new THREE.Scene();
  sceneHUD = new THREE.Scene();
  sceneStroke = new THREE.Scene();

  var amblight = new THREE.AmbientLight(0x222222); // soft white light
  scene.add(amblight);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x8080C0);
  document.body.appendChild(renderer.domElement);
 renderer.localClippingEnabled = true;
  camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 25, 40);
  camera.lookAt(new THREE.Vector3(0, 10, 0));
  
  camera2 = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  camera2.lookAt(new THREE.Vector3(0, 0, 0));
	
  cameraM = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 1, 1000);
  cameraM.position.set(40, 120,-60 );
  cameraM.lookAt(40, 0,-60);
  
  
  cameraHUD = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  cameraHUD.position.set(0, 20, 32);
  cameraHUD.lookAt(0, 0, 0);
  
  cameraStroke = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  cameraStroke.position.set(0, 0, 24);
  cameraStroke.lookAt(0, 0, 0);
  
  cameraOrbit = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  cameraOrbit.position.set(0,50,70);
  cameraOrbit.lookAt(0,0,0);
  let controls = new OrbitControls(cameraOrbit, renderer.domElement);
  

  var loader = new THREE.TextureLoader();
  loader.setCrossOrigin('');
  texture = loader.load('http://i.imgur.com/dSQ0A9W.png');
  ////////////////////////////////////////////////////////////////
  var gridXZ = new THREE.GridHelper(200, 20, 'red', 'white');
  //gridXZ.position.set(75,1,-80);
  //scene.add(gridXZ);
  
  steve=new Steve(4,12);
  steve.buildsteve();
  
  //light
  let light2 = new THREE.DirectionalLight(0xffffff);
  light2.position.set(50, 70, 50);
  light2.castShadow = true;
  
  light2.shadow.camera.left = -50;
  light2.shadow.camera.right = 50;
  light2.shadow.camera.top = -50;
  light2.shadow.camera.bottom = 50;
  light2.shadow.camera.near = 1;
  light2.shadow.camera.far = 200;
  //light2.target = puck;
  light2.shadow.mapSize.width = light2.shadow.mapSize.height = 1024;
  light2.shadow.bias = -0.007
  
  scene.add(light2);
  var dlshelper = new THREE.CameraHelper (light2.shadow.camera) 
  //scene.add ( dlshelper );

  PowerBar = BuildPowerBar();
  sceneHUD.add(PowerBar);
  block=BuildBlock();
  sceneHUD.add(block);

  var ballMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load(
      'https://i.imgur.com/TYIPjD9.jpg'
    )
  });
  var ballGeometry = new THREE.SphereGeometry(ballR, 64);
  var ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
  var ball = new Particle(ballMesh);
  ball.dtt =  0.016;
  
  balls.push(ball);
  balls[0].pos.set(10, 2, -2);
  
  light = new THREE.DirectionalLight(0xffffff);
  //scene.add(light);
  buildTerrain()
  renderer.autoClear = false;
		
	var ballGeometry2 = new THREE.SphereGeometry(ballR, 64);
    var ballMesh2 = new THREE.Mesh(ballGeometry2, ballMaterial);
	ballMesh2.visible = false;
	var ball2 = new Particle(ballMesh2)
	ball2.dtt = 0.096
	balls.push(ball2);

	
	flag = BuildFlag();
	scene.add(flag);
	flag.position.set(10,-6,-60);
	
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  window.addEventListener('resize', onWindowResize, false);
}
function animate() {
	flyFlag()
  var dt = clock.getDelta();
  keyPressed();
  balls.forEach(function(b) {
    b.update(dt)
  });
  table.updateMatrixWorld();
  steve.update(dt);
  if(!start)
  {
   balls[0].mesh.visible=false;
  }
  else{
    balls[0].mesh.visible=true;
  }
  planes.forEach(function(b) {
    b.update()
  });

  walls.forEach(function(b) {
    b.update()
  });

  matLine.resolution.set(window.innerWidth, window.innerHeight);
  matLine2.resolution.set(window.innerWidth, window.innerHeight); 
  matLine3.resolution.set(window.innerWidth, window.innerHeight); 

  render();
  requestAnimationFrame(animate);
	
}
function flyFlag(){
	if(flag.position.clone().sub(balls[0].pos).length() <= 30){
		if(flag.position.y <= 5)
			flag.position.y += 0.2;
	}
	else{
		if(flag.position.y >= -6)
			flag.position.y -= 0.2;
	}
}
function startGame(){
	start = true;
}
function camSwitch(){
	switchCamera = !switchCamera;
}
export {init,animate,startGame}
export {scene,sceneHUD,sceneStroke,camera,camera2,cameraM,cameraHUD,cameraStroke,cameraOrbit,renderer,switchCamera,camSwitch}
export {steve,stroke,PowerBar,block,ballR,light,texture,balls,start}