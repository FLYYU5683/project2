import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import {buildTerrain,table,planes,walls,cylinders,holes} from './buildTerrain.js';
import {BuildBlock,BuildPowerBar,BuildFlag,matLine2,matLine3} from './buildThing.js';
import {Particle} from './Particle.js'
import {textureAnimate,onWindowResize,render} from './render.js'
import {Steve,matLine} from './Steve.js'
import {keyPressed} from './keyPressed.js'

var camera,camera2,cameraM,cameraHUD,cameraStroke, scene,sceneHUD,sceneStroke, renderer;
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
  let controls = new OrbitControls(camera2, renderer.domElement);
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

  var loader = new THREE.TextureLoader();
  loader.setCrossOrigin('');
  texture = loader.load('http://i.imgur.com/dSQ0A9W.png');
  ////////////////////////////////////////////////////////////////
  var gridXZ = new THREE.GridHelper(200, 20, 'red', 'white');
  gridXZ.position.x = 75
  gridXZ.position.y = 1
  gridXZ.position.z = -80
  //scene.add(gridXZ);
  
  steve=new Steve(4,12);
  steve.buildsteve();
  
  //light
  let light2 = new THREE.DirectionalLight(0xffffff);
  light2.position.set(-80, 200, 80);
  light2.castShadow = true;
  light2.shadow.camera.left = -250;
  light2.shadow.camera.top = -250;
  light2.shadow.camera.right = 250;
  light2.shadow.camera.bottom = 250;
  light2.shadow.camera.near = 1;
  light2.shadow.camera.far = 300;
  //light2.target = puck;
  light2.shadow.mapSize.width = light2.shadow.mapSize.height = 1024;
  scene.add(light2);
  light2.shadow.bias = -.01



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
  
  balls.push(ball);
  balls[0].pos.set(10, 2, -2);
  
  light = new THREE.PointLight(0xffffff, 1, 1000);
  buildTerrain()
  renderer.autoClear = false;
		
	var ballGeometry2 = new THREE.SphereGeometry(ballR, 64);
    var ballMesh2 = new THREE.Mesh(ballGeometry2, ballMaterial);
	ballMesh2.visible = false;
	var ball2 = new Particle(ballMesh2)
	balls.push(ball2);

	
	flag = BuildFlag();
	scene.add(flag);
	flag.position.set(79.9,0,-129.8);
	
  var loaderStorke = new THREE.TextureLoader();

  // load a resource
  loaderStorke.load(
    // resource URL
    'https://i.imgur.com/T42Iin3.png',
    // Function when resource is loaded
    function(texture) {
      // do something with the texture
      // Plane with default texture coordinates [0,1]x[0,1]
      var texMat = new THREE.MeshBasicMaterial({
        map: texture,
		alphaTest:0.5
      });
      stroke = new THREE.Mesh(buildGeometry(), texMat);
      sceneStroke.add(stroke);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
    },
		undefined,
    // Function called when download errors
    function(xhr) {
      console.log('An error happened');
    }
  );
  
  window.addEventListener('resize', onWindowResize, false);
}
function animate() {
	flyFlag()
  keyPressed();
  var dt = clock.getDelta();
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
			flag.position.y += 0.1;
	}
	else{
		if(flag.position.y >= 0)
			flag.position.y -= 0.1;
	}
}
function startGame(){
	start = true;
}
export {init,animate,startGame}
export {scene,sceneHUD,sceneStroke,camera,camera2,cameraM,cameraHUD,cameraStroke,renderer}
export {steve,stroke,PowerBar,block,ballR,light,texture,balls,start}