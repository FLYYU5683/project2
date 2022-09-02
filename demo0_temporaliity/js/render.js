import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import {balls,steve} from './main.js'
import {useOrb,countSwing} from './mouseEvent.js'
import {floor5} from './buildTerrain.js'
var look = false;
var cameraOnPlayer,cameraForMouse,cameraHUD,cameraOrbit,scene,sceneHUD,renderer;
var controls;
var pickables = [];
var textureHUD;
var startButton;
var start = false;
(function() {
  Math.clamp = function(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }
})();

function render() {
  var WW = window.innerWidth;
  var HH = window.innerHeight;
  if (!useOrb) {
    look = false
    renderer.render(scene, cameraOnPlayer);

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
  startButton = new THREE.Mesh(new THREE.PlaneGeometry(6, 8), startButtonMaterial);
  startButton.position.set(0, 0, 0);
  pickables.push(startButton)
  sceneHUD.add(startButton)
  HUDtexture()
    
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
        
        
        var frame = new THREE.Mesh(new THREE.PlaneGeometry(6, 2), texMat);
        textureHUD.wrapS = THREE.RepeatWrapping;
        textureHUD.wrapT = THREE.RepeatWrapping;
        textureHUD.repeat.set (1,1/12);
		textureHUD.offset.x = 0;
		textureHUD.offset.y = 11/12;
        
        var score = frame.clone();
        score.position.set(-7, 9, 0);
        sceneHUD.add(score);

}
function pressStart(){
	event.preventDefault();
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
function textureAnimate() {
        if (textureHUD!== undefined){
			textureHUD.offset.y = (12-countSwing)/12;
        }
    }
export {render,renderer,buildCamAndSen,cameraOnPlayer,cameraForMouse,scene,textureAnimate,pressStart,start}