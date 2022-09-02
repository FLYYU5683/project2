import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {buildTerrain,table,planes,walls} from './buildTerrain.js';
import {Particle} from './Particle.js'
import {buildCamAndSen,render,pressStart,scene,start} from './render.js'
import {Steve} from './Steve.js'
import {mouseDown,mouseUp,mouseMove,mouseEvent,mouseWheel} from "./mouseEvent.js"

var steve,balls = [];
var clock = new THREE.Clock();
var backgroundMusic,hitSound;

var inholeSound;

function init() {
  //camera && sence
  buildCamAndSen()
  //light
  buildLight()
  //grid
  /*
  var gridXZ = new THREE.GridHelper(400, 40, 'red', 'white');
  gridXZ.position.set(75,1,-80);
  gridXZ.position.y = 1
  */
  //steve
  steve=new Steve(4,12);
  steve.buildsteve();
  steve.buildFootPrint();
  //balls
  buildBalls()
  //terrain
  buildTerrain()
  //set mouseEvent
  document.addEventListener('mousedown', mouseDown, false);
  document.addEventListener('mouseup', mouseUp, false);
  document.addEventListener('mousemove', mouseMove, false);
  document.addEventListener('mousewheel', mouseWheel, false );
  //set sound
  backgroundMusic = document.getElementById('backgroundMusic')
  hitSound = document.getElementById('hit')
  inholeSound = document.getElementById('inhole')
  backgroundMusic.volume = 0.2;
  hitSound.volume = 1;
  balls[0].hitSound = hitSound;
  balls[0].inholeSound = inholeSound;
  
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
function buildLight(){
  
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
  
}
function buildBalls(){
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
  
}
export {init,animate,steve,balls}