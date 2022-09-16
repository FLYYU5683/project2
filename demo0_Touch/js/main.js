import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {buildTerrain,table,planes,walls,class1Rotate} from './buildTerrain.js';
import {obstacle1,obstacle2,obstacle3,car,car2} from './buildTerrain.js';
import {Particle} from './Particle.js'
import {buildCamAndSen,render,scene,sceneMap,start} from './render.js'
import {Steve} from './Steve.js'
import {touchStart,touchMove,touchEnd,touchEvent} from "./touchEvent.js"

var steve,balls = [];
var clock = new THREE.Clock();
var backgroundMusic,hitSound;
var wallchange=true;
var wallchange2=true;
var car1MoveSign = 1,car2MoveSign = -1;
var inholeSound;
function init() {
  //camera && sence
  buildCamAndSen()
  //light
  buildLight()
  //grid
  
  var gridXZ = new THREE.GridHelper(600, 60, 'red', 'white');
  //gridXZ.position.set(75,1,-80);
  gridXZ.position.y = 1
  //scene.add(gridXZ);
  
  //steve
  steve=new Steve(4,12);
  steve.buildsteve();
  steve.buildFootPrint();
  //balls
  buildBalls()
  //terrain
  buildTerrain()
  //set touchEvent
  document.addEventListener('touchstart', touchStart, false );
  document.addEventListener('touchmove', touchMove, false );
  document.addEventListener('touchend', touchEnd, false );
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
  class1Rotate.rotation.y += Math.PI / 80;
  balls[0].update();

  table.updateMatrixWorld();
  steve.update(dt);
  if(!start)
  {
   balls[0].mesh.visible=false;
  }
  else{
	touchEvent();
    balls[0].mesh.visible=true;
  }
  planes.forEach(function(b) {
    b.update()
  });

  walls.forEach(function(b) {
    b.update()
  });
  wallMove()
  carMove()
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
  sceneMap.add(light2.clone());
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
function wallMove(){
  if(obstacle1.position.y>-15&&wallchange==true){
    obstacle1.position.y-=0.1;
  }
  if(obstacle1.position.y<=-15&&wallchange==true){
	obstacle1.position.y=-15;
	wallchange=false;
  }
  if(obstacle1.position.y<3&&wallchange==false){
    obstacle1.position.y+=0.1;
  } 
  if(obstacle1.position.y>=3&&wallchange==false)
  { 
    obstacle1.position.y=3;
	wallchange=true;  
  }
  
  if(obstacle2.position.y>3&&wallchange2==true){
  obstacle2.position.y-=0.1;
  obstacle3.position.y-=0.1;
  }
  if(obstacle2.position.y<=3&&wallchange2==true){
	obstacle2.position.y=3;
	obstacle3.position.y=3;
	wallchange2=false;
  }
  if(obstacle2.position.y<21&&wallchange2==false){
    obstacle2.position.y+=0.1;
	obstacle3.position.y+=0.1;
  } 
  if(obstacle2.position.y>=21&&wallchange2==false)
  { 
    obstacle2.position.y=21;
	obstacle3.position.y=21;
	wallchange2=true;  
  }
  
}
function carMove(){
  if(car.position.z < -350 || car.position.z > -250)
	  car1MoveSign *= -1;
  car.position.z += car1MoveSign * 0.5;
  if(car2.position.z > -250 || car2.position.z <-350)
	  car2MoveSign *= -1;
  car2.position.z += car2MoveSign * 0.6;   
}
export {init,animate,steve,balls}