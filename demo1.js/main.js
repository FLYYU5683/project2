import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import {buildTerrain,table,planes,walls} from './buildTerrain.js';
import {Particle} from './Particle.js'
import {onWindowResize,render} from './render.js'
import {Steve} from './Steve.js'
import {leftMouseDown,leftMouseUp,middleMouseDown,rightMouseDown,rightMouseUp,mouseMove,mouseEvent,mouseWheel} from "./mouseEvent.js"

var cameraOnPlayer,cameraForMouse,cameraHUD,cameraOrbit,scene,sceneHUD,renderer;
var steve,balls = [];
var clock = new THREE.Clock();
var start = false;
var level = 1;
var backgroundMusic,hitSound;
var controls;
var pickables = [];
var startButton;
var textureHUD;
var inholeSound;
function init() {
	
  scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2( 0x21384f, 0.0050,1000);
  scene.background = new THREE.Color( 0x21384f );
  sceneHUD = new THREE.Scene();

  var amblight = new THREE.AmbientLight(0x255483); // soft white light
  scene.add(amblight);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x21384f , 0);
  document.body.appendChild(renderer.domElement);
  
  cameraOnPlayer = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  cameraOnPlayer.position.set(0, 40, 70);
  cameraOnPlayer.lookAt(0, 5.68, 10);
  
  cameraForMouse = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  cameraForMouse.position.set(0, 40, 70);
  cameraForMouse.lookAt(0, 5.68, 10);

  cameraHUD = new THREE.OrthographicCamera(-10, 10, 10, -10, -10, 1600);
  cameraHUD.position.z = 1580;
  
  cameraOrbit = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  cameraOrbit.position.set(0, 40, 70);
  cameraOrbit.lookAt(0,1,10);
  
  controls = new OrbitControls(cameraOrbit, renderer.domElement);
  


  
  ////////////////////////////////////////////////////////////////
  var gridXZ = new THREE.GridHelper(400, 40, 'red', 'white');
  //gridXZ.position.set(75,1,-80);
  gridXZ.position.y = 1
  //scene.add(gridXZ);
  
  //steve
  steve=new Steve(4,12);
  steve.buildsteve();
  steve.buildFootPrint();
  
  //light
  let light2 = new THREE.DirectionalLight(0xffffff);
  light2.position.set(50, 70, 50);
  light2.castShadow = true;
  
  light2.shadow.camera.left = -50;
  light2.shadow.camera.right = 100;
  light2.shadow.camera.top = -100;
  light2.shadow.camera.bottom = 100;
  light2.shadow.camera.near = 1;
  light2.shadow.camera.far = 200;
  light2.shadow.mapSize.width = light2.shadow.mapSize.height = 1024;
  light2.shadow.bias = -0.007
  
  scene.add(light2);
  var dlshelper = new THREE.CameraHelper (light2.shadow.camera) 
  //scene.add ( dlshelper );

  //balls
  var ballMaterial = new THREE.MeshPhongMaterial({
    map: new THREE.TextureLoader().load(
      'https://i.imgur.com/GjnQxsb.jpg'
    )
  });
  
  var ballGeometry = new THREE.SphereGeometry(1, 64);
  var ballMesh = new THREE.Mesh(ballGeometry, ballMaterial);
  var ball = new Particle(ballMesh,0.016,"player");
  balls.push(ball);
  
		
  var ballGeometry2 = new THREE.SphereGeometry(1, 64);
  var ballMesh2 = new THREE.Mesh(ballGeometry2, ballMaterial);
  ballMesh2.visible = false;
  var ball2 = new Particle(ballMesh2,0.054,"predict")
  balls.push(ball2);
  //
  
  buildTerrain()
  renderer.autoClear = false;
  
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  window.addEventListener('resize', onWindowResize, false);
  
  document.addEventListener('mousedown', leftMouseDown, false);
  document.addEventListener('mouseup', leftMouseUp, false);
  document.addEventListener('mousedown', middleMouseDown, false);
  document.addEventListener('mousedown', rightMouseDown, false);
  document.addEventListener('mouseup', rightMouseUp, false);
  document.addEventListener('mousemove', mouseMove, false);
  document.addEventListener('mousedown', pressStart, false);
  document.addEventListener( 'mousewheel', mouseWheel, false );

  backgroundMusic = document.getElementById('backgroundMusic')
  hitSound = document.getElementById('hit')
  inholeSound = document.getElementById('inhole')
  backgroundMusic.volume = 0.2;
  hitSound.volume = 1;
  balls[0].hitSound = hitSound;
  let loader3 = new THREE.TextureLoader();
  var texture4 = loader3.load("https://i.imgur.com/PegGW4D.png")
  var startButtonMaterial = new THREE.MeshBasicMaterial({
    opacity: 1,
	alphaTest:0.5,
    transparent: true,
	depthTest: false,
    depthWrite: false,
    map: texture4});
  startButton = new THREE.Mesh(new THREE.PlaneGeometry(6, 8), startButtonMaterial);
   startButton.position.set(0, 0, 0);
   pickables.push(startButton)
   sceneHUD.add(startButton)
  HUDtexture()
}
function animate() {
  //backgroundMusic.play();
  var dt = clock.getDelta();

  balls.forEach(function(b) {
    b.update()
  });
  table.updateMatrixWorld();
  steve.update(dt);
  if(!start)
  {
   balls[0].mesh.visible=false;
  }
  else{
	mouseEvent();
    balls[0].mesh.visible=true;
  }
  planes.forEach(function(b) {
    b.update()
  });

  walls.forEach(function(b) {
    b.update()
  });
  
  render();
  requestAnimationFrame(animate);
	
}
function levelPlus(){
	level++;
}
function levelRestart(){
	level = 1;
}
function pressStart(){
	event.preventDefault();
	if(!start){
	var mouse = new THREE.Vector2()
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	var raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(mouse, cameraHUD);
    var intersects = raycaster.intersectObjects(pickables, true);
      if (intersects.length > 0) {
		balls[0].start();
		balls[1].start();
		steve.start();
		start = true;
		startButton.visible = false
      }
	}
}
function HUDtexture(){
        var loader = new THREE.TextureLoader();
        // load a resource
        textureHUD = loader.load(
        // URL ...
        'https://i.imgur.com/MNTptLL.jpg',
        // onLoad ...
        function(textureHUD) {
        // do something with the texture
        // Plane with default texture coordinates [0,1]x[0,1]
        },
            undefined, // onProgress
        // onError ...
        function(xhr) {
          console.log('An error happened');
        }
        );
        var texMat = new THREE.MeshBasicMaterial({
             opacity: 0.7,
             transparent: true,
             depthTest: false,
             depthWrite: false,
             map: textureHUD
        });
        
        
        var frame = new THREE.Mesh(new THREE.PlaneGeometry(6, 2), texMat);
        textureHUD.wrapS = THREE.RepeatWrapping;
        textureHUD.wrapT = THREE.RepeatWrapping;
        textureHUD.repeat.set (1,1/3);
		textureHUD.offset.x = 0;
		textureHUD.offset.y = 2/3;
        
        var score = frame.clone();
        score.position.set(-7, 9, 0);
        sceneHUD.add(score);

}
export {init,animate}
export {scene,sceneHUD,cameraOnPlayer,cameraHUD,cameraOrbit,renderer,cameraForMouse}
export {steve,balls,start,level,levelPlus,levelRestart,controls,hitSound,inholeSound,textureHUD}