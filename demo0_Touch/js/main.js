import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {buildTerrain,table1,table2,table3,planes,walls,boxg/*,fang*/} from './buildTerrain.js';
import {class1Rotate,class2Rotate,class3Rotate} from './buildTerrain.js';
import {obstacle1,obstacle2,obstacle3,car,car2,redhorse2G,steveg,wall49} from './buildTerrain.js';
import {Particle} from './Particle.js'
import {buildCamAndSen,render,scene,sceneMap,start} from './render.js'
import {Steve} from './Steve.js'
import {touchStart,touchMove,touchEnd,touchEvent} from "./touchEvent.js"
import {setPos} from "./touchEvent.js"

var steve,balls = [];
var clock = new THREE.Clock();
var backgroundMusic,hitSound;
var wallchange=true;
var wallchange2=true;
var chesschange=false;
var chesschange2=false;
var car1MoveSign = 1,car2MoveSign = -1;
var inholeSound;
var sceneDatas = []
var goalkeeper,goalkeeper2,goalkeeper3,goalkeeper4,connect1,handle1,handle2;
var timeclass=new THREE.Group();
var class2g=new THREE.Group();
var handleg=new THREE.Group();

var hitSound = "https://flyyu5683.github.io/project2/demo0_Touch/sound/hit.mp3", inHoleSound = "https://flyyu5683.github.io/project2/demo0_Touch/sound/inhole.wav";
var hitSoundBuffer,inholeSoundBuffer;
const context = new AudioContext();

function init() {
  window.ontouchstart = function (e){ e.preventDefault()};
  //camera && sence
  buildCamAndSen()
  //light
  buildLight()
  //grid
  
  var gridXZ = new THREE.GridHelper(600, 60, 'red', 'white');
  //gridXZ.position.set(75,1,-80);
  gridXZ.position.y = 0
  scene.add(gridXZ);
  
  //steve
  steve=new Steve(4,12);
  goalkeeper=new Steve(3,9);
  goalkeeper2=new Steve(3,9);
  goalkeeper3=new Steve(3,9);
  goalkeeper4=new Steve(3,9);
  steve.buildsteve();
  goalkeeper.buildsteve();
  goalkeeper2.buildsteve();
  goalkeeper3.buildsteve();
  goalkeeper4.buildsteve();
  steve.buildFootPrint();
  //balls
  buildBalls()
  //class 2
  buildtimeclass();
  //terrain
  buildTerrain() 
  //set touchEvent
  document.addEventListener('touchstart', touchStart, false );
  document.addEventListener('touchmove', touchMove, false );
  document.addEventListener('touchend', touchEnd, false );
  //setSound
  window.fetch(hitSound)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      hitSoundBuffer = audioBuffer;
  });
  window.fetch(inHoleSound)
    .then(response => response.arrayBuffer())
    .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
    .then(audioBuffer => {
      inholeSoundBuffer = audioBuffer;
  });
  //////
  setPos();
  /////
}
function animate() {
  //backgroundMusic.play();
  boxg.rotation.z+=0.05;
  //fang.rotation.z+=0.05;
  var dt = clock.getDelta();
  class1Rotate.rotation.y += Math.PI / 160/2 ;
  class2Rotate.rotation.y += Math.PI / 160/2 ;
  class3Rotate.rotation.y += Math.PI / 160/2 ;


  table1.updateMatrixWorld();
  table2.updateMatrixWorld();
  //table3.updateMatrixWorld();
  
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
    b.forEach(function(c){c.update()})
  });
  wallMove()
  //carMove()
  render();
  //chessMove();
  goalkeeperMove();
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
function chessMove(){
	let times = 2;
	if(redhorse2G.position.y < 31.6 && chesschange == false)
	{
		redhorse2G.position.y+= 0.5 * times;
	}
	else if(redhorse2G.position.y >= 31.6 && chesschange==false)
	{
	 if(redhorse2G.position.x > 27 && chesschange2 == false)
	 {
	  chesschange = true;
	  redhorse2G.position.x=27;
      redhorse2G.position.z=-13;	  
	 }
	 else if(redhorse2G.position.x>-23&&chesschange2==true)
	 {			 
	  redhorse2G.position.x-=0.4 * times;
      redhorse2G.position.z+=0.2 * times;
	  redhorse2G.position.y= 31.6;
	 }
	 else if(redhorse2G.position.x<=-23&&chesschange2==true)
	 {
	  redhorse2G.position.x=-23;
      redhorse2G.position.z=12;
	  chesschange = true;
	  chesschange2 = false;
	 }
	 else if(redhorse2G.position.x<=27&&chesschange==false)
	 {
	 redhorse2G.position.x+=0.4 * times;
	 redhorse2G.position.z-=0.2 * times;
     redhorse2G.position.y= 31.6;	 
	 }
    }
    else if(chesschange==true)
	{
     if(redhorse2G.position.y <= 3.7 && redhorse2G.position.x == 27)
	 {
		redhorse2G.position.y=3.6;
		setTimeout(function(){chesschange=false;chesschange2=true;},1000);
		/*
		chesschange=false;
		chesschange2=true;
		*/
	 }
	 else if(redhorse2G.position.y<= 3.7 && redhorse2G.position.x == -23)
	 {
		redhorse2G.position.y = 3.6;
		setTimeout(function(){chesschange=false},1000);
		//chesschange=false;
	 }
     else if (redhorse2G.position.y > 3.7){
	  redhorse2G.position.y -= 1 * times;
	 }    
	}		
	
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
function buildtimeclass(){
  goalkeeper.direct.rotation.y=-Math.PI/2
  goalkeeper.direct.rotation.x=-Math.PI
  goalkeeper2.direct.rotation.y=-Math.PI/2
  goalkeeper3.direct.rotation.y=-Math.PI/2
  goalkeeper4.direct.rotation.y=Math.PI
  goalkeeper.direct.position.set(0, 20,0 );
  goalkeeper2.direct.position.set(17, -20,0 );
  goalkeeper3.direct.position.set(-17, -20,0);
  goalkeeper4.direct.position.set(125,0,-300);
  connect1=new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,60, 32,1),new THREE.MeshPhongMaterial( {color: 0xffffff,side:THREE.DoubleSide})
)
  connect1.rotation.x=Math.PI/2;
  connect1.rotation.z=-Math.PI/2;
  connect1.position.set(0,20,-225);
  handle1=new THREE.Mesh(new THREE.CylinderGeometry(2,2,10, 32,1),new THREE.MeshPhongMaterial( {color: 0x000000,side:THREE.DoubleSide})
)
  handle1.rotation.x=Math.PI/2;
  handle1.rotation.z=-Math.PI/2;
  handle1.position.set(35,20,-225);
  handle2=new THREE.Mesh(new THREE.CylinderGeometry(2,2,10, 32,1),new THREE.MeshPhongMaterial( {color: 0x000000,side:THREE.DoubleSide})
)
  handle2.rotation.x=Math.PI/2;
  handle2.rotation.z=-Math.PI/2;
  handle2.position.set(-35,20,-225);
  timeclass.add(goalkeeper.direct,goalkeeper2.direct,goalkeeper3.direct)
  timeclass.position.set(0,20,-225);
  let connect2=new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,60, 32,1),new THREE.MeshPhongMaterial( {color: 0xffffff,side:THREE.DoubleSide})
)
  connect2.rotation.x=Math.PI/2;
  connect2.position.set(0,0,0);
  let handle3=new THREE.Mesh(new THREE.CylinderGeometry(2,2,10, 32,1),new THREE.MeshPhongMaterial( {color: 0x000000,side:THREE.DoubleSide})
)
  handle3.rotation.x=Math.PI/2;
  handle3.position.set(0,0,35);
  let handle4=new THREE.Mesh(new THREE.CylinderGeometry(2,2,10, 32,1),new THREE.MeshPhongMaterial( {color: 0x000000,side:THREE.DoubleSide})
)
  handle4.rotation.x=Math.PI/2;
  handle4.position.set(0,0,-35);
  handleg.add(connect2,handle3,handle4)
  handleg.position.set(125,20,-300);
  class2g.add(handleg,connect1,handle2,handle1,timeclass,goalkeeper4.direct);
  scene.add(class2g);
}
function goalkeeperMove(){
	handle1.rotation.x+=0.1;
	handle2.rotation.x+=0.1;
	connect1.rotation.x+=0.1;	
	timeclass.rotation.x-=0.05;
	steveg.rotation.x-=0.05;
	if(goalkeeper4.direct.position.z > -285 || goalkeeper4.direct.position.z <-315)
	  car2MoveSign *= -1;
  goalkeeper4.direct.position.z += car2MoveSign * 0.5;
  wall49.mesh.position.z += car2MoveSign * 0.5;  
  handleg.position.z+=car2MoveSign * 0.5;
}

export {init,animate,steve,balls,writeObstaclePos,setObstaclePos}
export {hitSoundBuffer,inholeSoundBuffer,context,class2g}