import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import {balls,steve} from './main.js'
import {useOrb,countSwing} from './touchEvent.js'
import {floor5} from './buildTerrain.js'
var look = false;
var cameraOnPlayer,cameraForMouse,cameraHUD,cameraOrbit,cameraOnBall,scene,sceneHUD,renderer;
var controls;
var pickables = [];
var textureHUD;
var startButton;
var start = false;
var switchCameraButton;
var switchCamera = 0;
function render() {
  var WW = window.innerWidth;
  var HH = window.innerHeight;
  if (!useOrb) {
    look = false
	if(switchCamera == 0)
		renderer.render(scene, cameraOnPlayer);
	else if(switchCamera == 1){
		cameraOnBall.lookAt(balls[0].pos)
		renderer.render(scene, cameraOnBall);
	}
  } else {
    if (!look) {
      cameraOrbit.position.copy(cameraOnPlayer.localToWorld(new THREE.Vector3(0,0,0)))
      cameraOrbit.lookAt(balls[0].pos)
      controls.target.copy(balls[0].pos.clone())
      controls.update();
      look = !look;
    }
    renderer.render(scene, cameraOrbit);
  }
    renderer.render(sceneHUD, cameraHUD);
	//floor5.material.uniforms.hole.value.copy (new THREE.Vector3(165,-0.2,-215));
}
function buildCamAndSen(){
		
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
  
  cameraOnBall = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  cameraOnBall.position.set(0, 40, 70);
  cameraOnBall.lookAt(0,1,10);
  
  controls = new OrbitControls(cameraOrbit, renderer.domElement);
    
  renderer.autoClear = false;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  let loader3 = new THREE.TextureLoader();
  var texture4 = loader3.load("https://i.imgur.com/PegGW4D.png")
  var startButtonMaterial = new THREE.MeshBasicMaterial({
	  opacity: 1,
	  alphaTest:0.5,
	  transparent: true,
	  depthTest: false,
	  depthWrite: false,
	  map: texture4});
  startButton = new THREE.Mesh(new THREE.PlaneGeometry(12, 8), startButtonMaterial);
  startButton.position.set(0, 0, 0);
  //startButton.visible = false////////////////////////////////////////////////////////////////////////////////////////////////////////
  pickables.push(startButton)
  sceneHUD.add(startButton)
  HUDtexture()
  let loader4 = new THREE.TextureLoader();
  var texture5 = loader4.load("https://i.imgur.com/IfNDrN0.png")
  var switchCameraButtonMaterial = new THREE.MeshBasicMaterial({
	  opacity: 1,
	  alphaTest:0.5,
	  transparent: true,
	  depthTest: false,
	  depthWrite: false,
	  map: texture5});

  switchCameraButton = new THREE.Mesh(new THREE.PlaneGeometry(4, 2),switchCameraButtonMaterial)
  switchCameraButton.position.set(8,9,0);
  sceneHUD.add(switchCameraButton)
  
}
function HUDtexture(){
        var loader = new THREE.TextureLoader();
        // load a resource
        textureHUD = loader.load(
        // URL ...
        'https://i.imgur.com/uNITtN7.jpg',
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
        
        
        var frame = new THREE.Mesh(new THREE.PlaneGeometry(10, 2), texMat);
        textureHUD.wrapS = THREE.RepeatWrapping;
        textureHUD.wrapT = THREE.RepeatWrapping;
        textureHUD.repeat.set (1,1/12);
		textureHUD.offset.x = 0;
		textureHUD.offset.y = 11/12;
        
        var score = frame.clone();
        score.position.set(-5, 9, 0);
        sceneHUD.add(score);

}
function HUDPress(){
	event.preventDefault();
	var touch = new THREE.Vector2();
	touch.x = (event.touches[0].pageX / window.innerWidth) * 2 - 1;
    touch.y = -(event.touches[0].pageY / window.innerHeight) * 2 + 1;
	if(Math.abs(touch.x) <= 0.4 && Math.abs(touch.y) <= 0.4){
	    if(start == false){
			balls[0].start();
			balls[1].start();
			steve.start();
			start = true;
			startButton.visible = false
		}
	}
	if(touch.x >= 0.6 && touch.y >= 0.8){
		switchCamera++;
		if(switchCamera == 2)
			switchCamera = 0;
		var touched = true;
		return touched;
	}
}
function textureAnimate() {
        if (textureHUD!== undefined){
			textureHUD.offset.y = (12-countSwing)/12;
        }
    }
export {render,renderer,buildCamAndSen,cameraOnPlayer,cameraForMouse,cameraOnBall,scene,textureAnimate,HUDPress,start}