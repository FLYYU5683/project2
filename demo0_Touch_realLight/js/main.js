import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {buildTerrain,table1,table2,table3,planes,walls} from './buildTerrain.js';
import {class1Rotate,class2Rotate,class3Rotate} from './buildTerrain.js';
import {obstacle1,obstacle2,obstacle3,car,car2} from './buildTerrain.js';
import {Particle} from './Particle.js'
import {buildCamAndSen,render,scene,sceneMap,start} from './render.js'
import {Steve} from './Steve.js'
import {touchStart,touchMove,touchEnd,touchEvent} from "./touchEvent.js"
import {setPos} from "./touchEvent.js"
//import {setPortal} from "./portal.js"

import {BufferLoader,loadSounds,context} from "./soundTest.js"

var steve,balls = [];
var clock = new THREE.Clock();
var backgroundMusic,hitSound;
var wallchange=true;
var wallchange2=true;
var car1MoveSign = 1,car2MoveSign = -1;
var inholeSound;
var sceneDatas = []

var soundSource;
var RhythmSample = function () {
    loadSounds(this, {
        hit: './sound/hit.mp3',
        inHole: './sound/inhole.wav',
    });
};
function init() {
  //camera && sence
  soundSource = new RhythmSample();
  
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
  backgroundMusic.muted = false;

  hitSound = document.getElementById('hit')
  hitSound.muted = false;
  inholeSound = document.getElementById('inhole')
  inholeSound.muted  = false;
  backgroundMusic.volume = 0.2;
  hitSound.volume = 1;
  balls[0].hitSound = hitSound;
  balls[0].inholeSound = inholeSound;
  //set portal
  //setPortal();
  //////
  setPos();
  /////
}
function animate() {
  //backgroundMusic.play();
  playSound2(soundSource.hit)

  var dt = clock.getDelta();
  class1Rotate.rotation.y += Math.PI / 160/2 ;
  class2Rotate.rotation.y += Math.PI / 160/2 ;
  class3Rotate.rotation.y += Math.PI / 160/2 ;


  table1.updateMatrixWorld();
  table2.updateMatrixWorld();
  table3.updateMatrixWorld();
  
  steve.update(dt);
  if(!start)
  {
   balls[0].mesh.visible=false;
  }
  else{
	touchEvent();
    balls[0].mesh.visible=true;
  }
  balls[0].update();
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
  /*
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
  */
  /*
  let light2 = new THREE.DirectionalLight(0xffffff);
  light2.position.set(50, 50, -100);
  light2.castShadow = true;
  light2.intensity=0.2;
  
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
  */
  //scene.add ( dlshelper );
  
  //class1 light
  
  const Pointlight = new THREE.PointLight( 0xFF8000,3,100);
  Pointlight.position.set( 22, 5, -20 );
  //Pointlight.castShadow = true;
  //scene.add( Pointlight);
  
  const Pointlight2 = new THREE.PointLight( 0xFF8000,3,100);
  Pointlight2.position.set( -22, 5, -20 );
  //scene.add( Pointlight2);
  
  //class2 light
  
  const Pointlight3 = new THREE.PointLight( 0xFF8000,1,300);
  Pointlight3.position.set( 22, 200, -200 );
  Pointlight3.power = 50
  let box = new THREE.Mesh(new THREE.BoxGeometry(1,1,1))
  box.position.set(22,-10,-200)
  Pointlight3.target = box
  
  Pointlight3.castShadow = true;
  
  Pointlight3.shadow.camera.left = -200;
  Pointlight3.shadow.camera.right = 200;
  Pointlight3.shadow.camera.top = -100;
  Pointlight3.shadow.camera.bottom = 100;
  Pointlight3.shadow.camera.near = 1;
  Pointlight3.shadow.camera.far = 300;
  Pointlight3.shadow.mapSize.width = Pointlight3.shadow.mapSize.height = 1024;
  //Pointlight3.shadow.bias = -0.007
  
  var dlshelper = new THREE.CameraHelper (Pointlight3.shadow.camera) 
  scene.add ( dlshelper );
  
  scene.add( Pointlight3,box );
  
  
  /*
  const Pointlight4 = new THREE.PointLight( 0xFF8000,3,100);
  Pointlight4.position.set( -22, 5, -200 );
  scene.add( Pointlight4 );
  
  
  const Pointlight5 = new THREE.PointLight( 0xFF8000,3,100);
  Pointlight5.position.set( 100, 5, -278 );
  scene.add( Pointlight5 );
  
  const Pointlight6 = new THREE.PointLight( 0xFF8000,3,100);
  Pointlight6.position.set( 100, 5, -322 );
  scene.add( Pointlight6 );
  
  const Pointlight7 = new THREE.PointLight( 0xFF8000,3,100);
  Pointlight7.position.set( -20, 5, -320 );
  scene.add( Pointlight7 );*/
  
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
function writeObstaclePos(){
	var temp = []
	temp.push(obstacle1.position.clone(),obstacle2.position.clone(),obstacle3.position.clone(),car.position.clone(),car2.position.clone(),wallchange,wallchange2,car1MoveSign,car2MoveSign)
	sceneDatas.push(temp);
}
function setObstaclePos(index){
	obstacle1.position.copy(sceneDatas[index][0])
	obstacle2.position.copy(sceneDatas[index][1])
	obstacle3.position.copy(sceneDatas[index][2])
	car.position.copy(sceneDatas[index][3])
	car2.position.copy(sceneDatas[index][4])
	wallchange = sceneDatas[index][5]
	wallchange2 = sceneDatas[index][6]
	car1MoveSign = sceneDatas[index][7]
	car2MoveSign = sceneDatas[index][8]
}
function playSound2(buffer) {
    var gainNode = context.createGain();
    var source = context.createBufferSource();
    source.buffer = buffer;

    // Connect source to a gain node
    source.connect(gainNode);
    // Connect gain node to destination
    gainNode.connect(context.destination);

    var gainval = 1;
    gainNode.gain.value = gainval;

    source[source.start ? 'start' : 'noteOn']();
	//source.start()
    
    /////////////////////////////////
    // source.start (when, in seconds) 
    // The 'when' parameter defines when the play will start. 
    // If 'when' represents a time in the past, the play will start immediately.
    // https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/start
}
export {init,animate,steve,balls,writeObstaclePos,setObstaclePos,soundSource}