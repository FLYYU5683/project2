import {Line2} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/Line2.js';
import {LineMaterial} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/LineMaterial.js';
import {LineGeometry} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/LineGeometry.js';
import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {cameraOnPlayer,renderer,textureAnimate,start,scene,HUDPress,cameraButtons,cameraSlider,sliderGroup,level,isOver,HUDForInHole,vec,SteveShow} from './render.js'
import {steve,balls,writeSteves,setSteves,pressed,context,putSoundBuffer} from './main.js'
import {stop,stopTrue} from './Steve.js'

var beforeHit = true;
var countSwing = 1;
var power = 0,sign = 1.0,theta = 0.5;
var lineList = [];
var matLine4;

var ballMove = false;
var useOrb = false;

var mouse = new THREE.Vector2();
var rotateX = 0,rotateY = 0;
var cancelCharge = false;
var cancelMove = false;
var firstTouch = false;
var startMove = false;
var rightMousePressed = false;
var leftMousePressed = false;

var touchHUD = false;
var cameraMove = false;
var cameraStartMove = false;
var aimMode = 0;
var isCharge = false;

var fovVal = 40,fovX = 0;
var fovBass = [0,20,0];
var openMap = false;
var hitting = false;
var turned = false;
function predictLineRough(){
	if(!cancelCharge){
		let rollingWS = new THREE.Vector3();
		let g = new THREE.Vector3(0,-10,0);
		let n = new THREE.Vector3(0,1,0);
		rollingWS.copy(balls[1].vel.clone().normalize().multiplyScalar(-g.dot(n)).multiplyScalar(16 * 0.082 * 0.064))
		var positions = [];
		var colors = []
		var EPS = 0.1
		balls[1].pos.copy(balls[0].pos);
		//balls[1].runInHole = false;
		let thisPos = new THREE.Vector3();
		thisPos.copy(balls[1].pos);
		positions.push(thisPos.x,thisPos.y,thisPos.z);
		do{
			let thisPos = new THREE.Vector3();
			balls[1].vel.sub(rollingWS)
			balls[1].pos.add(balls[1].vel.clone().multiplyScalar(0.064))
			thisPos.copy(balls[1].pos);
			positions.push(thisPos.x,thisPos.y,thisPos.z);
			colors.push(255,0,255)
		}while(balls[1].vel.dot(rollingWS) > 0 && balls[1].pos.y >= -10);

		for(var i = lineList.length; i > 0;i--){
			scene.remove(lineList[i-1])
		}
		lineList = []
		var geometry = new LineGeometry();
		geometry.setPositions(positions);
		geometry.setColors(colors);
		matLine4 = new LineMaterial({
			color: 0xffffff,
			linewidth: 3, 
			vertexColors: THREE.VertexColors,
		});
		var predictLine = new Line2(geometry, matLine4);
		predictLine.computeLineDistances();
				
		scene.add(predictLine);
				
		matLine4.resolution.set(window.innerWidth, window.innerHeight); 
		
		lineList.push(predictLine)
				
		balls[1].pos.copy(balls[0].pos);
		balls[1].vel.copy(new THREE.Vector3(0,0,0))	
		
	}
}
function predictLineExact(){
	if(!cancelCharge){
		
		var positions = [];
		var colors = []
		var EPS = 0.1
		balls[1].pos.copy(balls[0].pos);
		balls[1].runInHole = false;
		let thisPos = new THREE.Vector3();
		thisPos.copy(balls[1].pos);
			
		positions.push(thisPos.x,thisPos.y,thisPos.z);
		do{
			let dt = 0.016;
			balls[1].update(dt)
			
			thisPos.copy(balls[1].pos);
			
			positions.push(thisPos.x,thisPos.y,thisPos.z);
			colors.push(255,0,0)
			if(balls[1].runInHole === true)
				break;
			if(positions.length >=500)
				break
		}while(balls[1].vel.length() > EPS && balls[1].pos.y >= -10);

		for(var i = lineList.length; i > 0;i--){
			scene.remove(lineList[i-1])
		}
		lineList = []
		var geometry = new LineGeometry();
		geometry.setPositions(positions);
		geometry.setColors(colors);
		matLine4 = new LineMaterial({
			color: 0xffffff,
			linewidth: 3, 
			vertexColors: THREE.VertexColors
		});
		var predictLine = new Line2(geometry, matLine4);
		predictLine.computeLineDistances();
				
		scene.add(predictLine);
				
		matLine4.resolution.set(window.innerWidth, window.innerHeight); 
		
		lineList.push(predictLine)
				
		balls[1].pos.copy(balls[0].pos);
		balls[1].vel.copy(new THREE.Vector3(0,0,0))	
		
	}
}
function mouseDown(event){
	event.preventDefault();
	touchHUD = HUDPress();
	
	if(start && touchHUD === 0){
		if(event.button === 2){
			rightMousePressed = true;
		}
		if(event.button === 0){
			leftMousePressed = true;
		}
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

	}
	

}
function mouseMove(event){

	event.preventDefault();
	if(firstTouch && touchHUD === 0 && !ballMove && !steve.moveFin){
		if(leftMousePressed){
			isCharge = true;
				
			balls[1].runInHole = false;
			steve.direct.position.copy(balls[0].pos)
			steve.arrow.visible = true;
			var x = (event.clientX / window.innerWidth) * 2 - 1;
			var y = -(event.clientY / window.innerHeight) * 2 + 1;
			var vector = new THREE.Vector3(mouse.x - x,0,mouse.y - y)
			power = clamp(vector.length() * 12,2,10);
			steve.power = power;
			//console.log(steve.power)
			power = Math.floor(power)
			theta = power / 10 / 2.5;
			for(var i = 0; i < steve.arrow.children.length; i++)
				steve.arrow.children[i].visible = false;
			if(power != 0)
			for(var i = 0;i < 9 + power; i++)
				steve.arrow.children[i].visible = true;

		}
		if(rightMousePressed){
			
			var x = (event.clientX / window.innerWidth) * 2 - 1;
			var y = -(event.clientY / window.innerHeight) * 2 + 1;
			x -= mouse.x;
			y -= mouse.y;
			mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
				
			rotateY -= x

				
			steve.camera.rotation.order = 'YXZ';
			steve.camera.rotation.y -= x;
			steve.direct.rotation.y -= x;
				
			rotateX += y
			steve.camera.rotation.x += y;
			steve.direct.children[3].rotation.x += y;
				
			if(steve.camera.rotation.x < -1){
				rotateX = -1;
				steve.camera.rotation.x = -1;
			}
			else if (steve.camera.rotation.x > 0.53){
				rotateX = 0.53;
				steve.camera.rotation.x = 0.53;
			}
				
			if(steve.direct.children[3].rotation.x < -1){
				rotateX = -1;
				steve.direct.children[3].rotation.x = -1;
			}
			else if (steve.direct.children[3].rotation.x > 0.53){
				rotateX = 0.53;
				steve.direct.children[3].rotation.x = 0.53;
			}
			
		}
	}
	if(touchHUD === 1){
		fovX = ((event.clientX / window.innerWidth) * 2 - 1) * 10;
		fovX = clamp(fovX,-7.5,7.5)
		cameraSlider.position.x = fovX ;
		
		steve.camera.children[0].fov = fovVal + fovX * 2 + fovBass[level - 1];
		steve.direct.children[3].children[0].fov = fovVal + fovX * 2 + fovBass[level - 1];
		
		steve.camera.children[0].updateProjectionMatrix();
		steve.direct.children[3].children[0].updateProjectionMatrix();
	}
}
function mouseUp(event){
	event.preventDefault();
	if(firstTouch){
		if(touchHUD === 4){
			if(!cancelCharge && steve.power != 0){		
				steve.puttPos.copy(steve.direct.children[3].children[0].localToWorld(new THREE.Vector3(0, 0, 0)))
				
				beforeHit = false;
				isCharge = false;
				steve.direct.position.copy(balls[0].pos.clone());
				playDatas[level].power.push(steve.power)
				//console.log(steve.power)
				playDatas[level].rotation.push(steve.direct.rotation.y)
				playDatas[level].ballPos.push(balls[0].pos.clone())
				playDatas[level].putt.push(steve.puttPos.clone())
				playDatas[level].theta.push(theta)
				if(level === 2)
					writeSteves();
				
			}
			else{
				cancelCharge = false;
			}
		}
		else if (touchHUD === 5 && playDatas[level].power.length != 0){
			inReplay = true;
			mode = 0
		}
		else if (touchHUD === 6 && playDatas[level].power.length != 0){
			inReplay = true;
			mode = 1;
		}
		if(event.button === 2 && rightMousePressed){
			rightMousePressed = false;
		}
	}
	else{
		firstTouch = true;
	}
	touchHUD = -1;
}
function mouseEvent(){

	if(steve.direct.rotation.y <= -Math.PI * 2)
		steve.direct.rotation.y += Math.PI * 2
	if(steve.direct.rotation.y >= Math.PI * 2)
		steve.direct.rotation.y -= Math.PI * 2
	steve.camera.children[0].updateProjectionMatrix();
	if(inReplay && !ballMove && !swing && repalyEnd){
	  console.log("abc");
	  repalyEnd = false;
	  replay()
	}
	
	checkBallZ(balls[0].pos.z)
	
    textureAnimate()
    sliderMove()
   	if(touchHUD === 2){
		turnLeft();
	}
	if(touchHUD === 3){
		turnRight();
	}
	if(touchHUD === 7){
		balls[0].pos.add(vec);
		steve.direct.position.add(vec);
		steve.camera.position.add(vec);
	}
   if(balls[1].vel != 0 && isCharge && power != 0){
		let temp = new THREE.Vector3(0, 0, 0);
		var vel = new THREE.Vector3(0, 0, 0);

		temp.copy(balls[0].pos.clone().sub(steve.direct.children[3].children[0].localToWorld(new THREE.Vector3(0, 0, 0))));
		vel.copy(new THREE.Vector3(temp.x, 0, temp.z)).normalize();
		vel.multiplyScalar(steve.power*8);
		balls[1].vel.copy(vel);
		if(aimMode === 1 )
			predictLineExact()
		else
			predictLineRough()
	
   }
   if(power === 0){
	   	for(var i = lineList.length; i > 0;i--){
			scene.remove(lineList[i-1])
		}
		lineList = []
   }
  if(steve.putt.worldToLocal(balls[0].pos.clone()).length() <= (0.5 + 0.5) && !beforeHit){
	  for(var i = lineList.length; i > 0;i--){
		scene.remove(lineList[i-1])
	  }
	  steve.lastPos.copy(balls[0].pos);
	  for(var i = lineList.length; i > 0;i--)
		scene.remove(lineList[i-1])
	  let temp = new THREE.Vector3(0, 0, 0);
	  var vel = new THREE.Vector3(0, 0, 0);
      temp.copy(balls[0].pos.clone().sub(steve.puttPos));
	  
      vel.copy(new THREE.Vector3(temp.x, 0, temp.z)).normalize();
	  
      vel.multiplyScalar(steve.power*8);
	  //console.log(vel)
      balls[0].vel.copy(vel)
	  
	  const source = context.createBufferSource();
	  source.buffer = putSoundBuffer;
	  source.connect(context.destination);
	  source.start();
	  
	  setTimeout(function(){
			if(balls[0].vel.length() >= 0.7 / 3) 
				cameraStartMove = true;
	  },1000);
	  
      ballMove = true;
	  power = 0;
	  steve.power = 0;
	  beforeHit = true;
	  steve.arrow.visible = false
	  if(!inReplay)
		cameraMove = true;
	  swing = false;
  }
  if(ballMove === true && balls[0].vel.length() <= 0.7 / 3 && !cameraMove){
	if(!inReplay)
	  countSwing++;
	ballMove = false
	
	
	///////////////////////////////////////////////////////////////////////////steve visible
	//steve.body.visible = false;
	if(balls[0].runInHole !== true && !inReplay)
	{
		openMap = true;
		hitting = true;
		/*
		steve.goal.copy(balls[0].pos)//關
		steve.begin.copy(steve.lastPos)//關
		steve.footPath.position.copy(steve.lastPos)//關
		stopTrue(); //關
		*/

	}
	else{
		balls[0].runInHole = false;
	}
	
  }
  
  if(steve.camera.rotation.y > Math.PI * 2)
	steve.camera.rotation.y -= Math.PI * 2;
  if(steve.camera.rotation.y < -Math.PI * 2)
	steve.camera.rotation.y += Math.PI * 2;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////截圖修改/*

  if(cameraStartMove){
	  //console.log("in1")
	  turned = false;
	  let temp = levelTrack[level-1][index].angle - steve.camera.rotation.y;
	  
	  if(fovVal <= 60)
		fovVal += 1
	  steve.camera.children[0].fov = fovVal + fovX * 2 + fovBass[level - 1]
	  steve.direct.children[3].children[0].fov = fovVal + fovX * 2 + fovBass[level - 1];
	  steve.camera.children[0].updateProjectionMatrix();
	  steve.direct.children[3].children[0].updateProjectionMatrix();
	  
	  if(Math.abs(temp) <= Math.PI / 90){
		cameraMove = false;
	  }
	  else if(temp > 0){
		  steve.camera.rotation.y += Math.PI/90;
	  }
	  else if (temp < 0){
		  steve.camera.rotation.y -= Math.PI/90;
	  }
	  //console.log(levelTrack[level-1][index].angle * temp < 0)
  }
  if(steve.moveFin && !ballMove && !turned){
	
	cameraStartMove = false;
	//let temp = (levelTrack[level-1][index].angle < 0 ? levelTrack[level-1][index].angle + Math.PI / 2 : levelTrack[level-1][index].angle - Math.PI/2) - steve.camera.rotation.y;
		let temp = levelTrack[level-1][index].angleBack - steve.camera.rotation.y;
		if(fovVal >= 40)
			fovVal -= 1
		steve.camera.children[0].fov = fovVal + fovX * 2 + fovBass[level - 1]
		steve.direct.children[3].children[0].fov = fovVal + fovX * 2 + fovBass[level - 1];
		steve.camera.children[0].updateProjectionMatrix();
		steve.direct.children[3].children[0].updateProjectionMatrix();
		
		  if(Math.abs(temp) <= Math.PI / 90){
				steve.direct.rotation.y = steve.camera.rotation.y;
				turned = true;
				if(SteveShow)
					steve.body.visible = true
				steve.direct.position.copy(balls[0].pos)
		  }	  
		  if(temp > 0){
			  steve.camera.rotation.y += Math.PI/90;
		  }
		  else if (temp < 0){
			  steve.camera.rotation.y -= Math.PI/90;
		  }	
  }
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////截圖修改*/steve moveFin改成turned
  /*
  if(balls[0].runInHole === true){
	cameraMove = false;
	cameraStartMove = false;
	steve.moveFin = false
	ballMove = false;
  }
  */
}
function countSwingReset(){
	countSwing = 1;
}
function sliderMove(){
	if(sliderGroup.onTop === true){
		if(sliderGroup.position.y < -8.5){
			sliderGroup.position.y += 0.2;
		}
		else{
			sliderGroup.children[2].rotation.x = Math.PI;
			sliderGroup.position.y = -8.5
		}
	}
	else{
		if(sliderGroup.position.y > -11.5){
			sliderGroup.position.y -= 0.2;
		}
		else{
			sliderGroup.children[2].rotation.x = 0;			
			sliderGroup.position.y = -11.5
		}
	}
}
function turnLeft(){
	steve.camera.rotation.y += Math.PI / 720
	steve.direct.rotation.y += Math.PI / 720
}
function turnRight(){
	steve.camera.rotation.y -= Math.PI / 720
	steve.direct.rotation.y -= Math.PI / 720
}
function setCameraMove(){
	cameraMove = true;
}
function clamp(val, min, max){
	return Math.min(Math.max(val, min), max);
}
function ballMoveFalse(){
	ballMove = false;
}
var playData1 = {power: [],rotation : [], ballPos: [], putt : [],theta : []};
var playData2 = {power: [],rotation : [], ballPos: [], putt : [],theta : []};
var playData3 = {power: [],rotation : [], ballPos: [], putt : [],theta : []};
var playDatas = [playData1,playData2,playData3]
var inReplay = false,swing = false;
var replayCount = 0;
var mode = -1;
var repalyEnd = true;
function replay(){
	if(mode === 1){
		replayCount = playDatas[level].power.length - 1;
		mode = -1
	}
	if(replayCount < playDatas[level].power.length){

		for(var i = lineList.length; i > 0;i--)
			scene.remove(lineList[i-1])
		sliderGroup.children[5].visible = false;
		steve.arrow.visible = false;
		steve.power = playDatas[level].power[replayCount]
		balls[0].pos.copy(playDatas[level].ballPos[replayCount])
		steve.direct.position.copy(balls[0].pos)
		steve.direct.rotation.y = playDatas[level].rotation[replayCount]
		steve.puttPos.copy(playDatas[level].putt[replayCount])
		theta = playDatas[level].theta[replayCount];
		if(level === 2)
			setSteves(replayCount)
		beforeHit = false;
		swing = true;
		isCharge = false;
		replayCount++;
		repalyEnd = true;
		}
	else {
		sliderGroup.children[5].visible = true;
		//steve.arrow.visible = true;
		steve.power = power;
		steve.theta = theta;
		inReplay = false;
		replayCount = 0;
		if(mode === 2)
			repalyEnd = true;
	}
}
function resetPlayData(level){
	playDatas[level] = {power: [],rotation : [], ballPos: [], putt : [],theta : []}
}

var levelTrack = []
var index = 0

function setPos(){
	
	{
		let pos = []
		let temp = {pos : new THREE.Vector3(25,30, 10),angle : -Math.PI/2,angleBack:0}
		let temp1 = {pos : new THREE.Vector3(25,30, -40),angle : -Math.PI,angleBack:-Math.PI / 2}
		
		let temp2 = {pos : new THREE.Vector3(50,30, 85),angle : 0,angleBack: 0}
		let temp3 = {pos : new THREE.Vector3(50,30, 10),angle : -Math.PI/2*3,angleBack: -Math.PI}
		let temp4 = {pos : new THREE.Vector3(50,30, -40),angle : -Math.PI,angleBack: -Math.PI}
		//let temp5 = {pos : new THREE.Vector3(50,30, -275),angle : 0,angleBack:0}
		pos.push(temp,temp1,temp2,temp3,temp4/*,temp5*/);
		levelTrack.push(pos)
	}
	{
		let pos = [];
		let temp = {pos : new THREE.Vector3(150,30,-120),angle : -Math.PI/2,angleBack:0}
		let temp1 = {pos : new THREE.Vector3(0,30, -425),angle : -Math.PI,angleBack: -Math.PI}
		pos.push(temp,temp1);
		levelTrack.push(pos)
	}
	{
		let pos = [];
		let temp = {pos : new THREE.Vector3(300,30, -230),angle : -Math.PI/2*3,angleBack: -Math.PI}
		let temp1 = {pos : new THREE.Vector3(300,30, -200),angle : -Math.PI/2*3,angleBack: -Math.PI/2*3}
		
		let temp2 = {pos : new THREE.Vector3(450,30, -245),angle : Math.PI,  angleBack: Math.PI/2}
		
		let temp3 = {pos : new THREE.Vector3(450,30,-230),angle : Math.PI/2*3,  angleBack: Math.PI}
		
		let temp4 = {pos : new THREE.Vector3(415,30,-230),angle : Math.PI,  angleBack: Math.PI}
		
		let temp5 = {pos : new THREE.Vector3(285,30,-230),angle : 0, angleBack: -Math.PI/2}
		
		pos.push(temp,temp1,temp2,temp3,temp4,temp5);
		levelTrack.push(pos)
	}
	
}
function checkBallZ(ballZ){
	var temp;
	if(level === 1 && balls[0].pos.x > 25){
		temp = 2
		for(var i = temp; i < levelTrack[level - 1].length; i++){
			if(ballZ >= levelTrack[level - 1][i].pos.z){
				index = i;
				return;
			}
		}
	}
	else if(level === 1 && balls[0].pos.x < 25){
		temp = 0
		for(var i = temp; i < levelTrack[level - 1].length; i++){
			if(ballZ >= levelTrack[level - 1][i].pos.z){
				index = i;
				return;
			}
		}
	}
	if(level === 2){
		for(var i = 0; i < levelTrack[level - 1].length; i++){
			if(balls[0].pos.z <= levelTrack[level - 1][i].pos.z){
				index = i;
				return;
			}
		}
	}
	if(level === 3 && pressed !== true){
		for(var i = 0; i < levelTrack[level - 1].length; i++){
			if(balls[0].pos.z <= levelTrack[level - 1][i].pos.z){
				index = i;
				return;
			}
		}
	}
	else if(level === 3 && pressed === true){
		for(var i = 2; i < levelTrack[level - 1].length; i++){
			if(balls[0].pos.z < -245){
				if(balls[0].pos.x < 315){
					index = 3
					return;
				}
				index = 2
				return;
			}
			if(balls[0].pos.x >= levelTrack[level - 1][i].pos.x){
				index = i;
				return;
			}
		}			
	}
	
		
}
function replayAll(){
	inReplay = true;
	mode = 2
	repalyEnd = true;
	steve.camera.rotation.y = levelTrack[level - 1][0].angleBack;
}
function resetCameraAngle(){
	steve.camera.rotation.y = levelTrack[level - 1][0].angleBack;
	steve.direct.rotation.y = steve.camera.rotation.y
}
function inHoleBreak(){
	fovVal = 40;
	stopTrue();
}
var signAndVector = []
var sign;
function moveMode(vec,inSign){
	sign = inSign;
	vector.copy(vec);
	//console.log(vector)
	//signAndVector.push(vec,sign)
}
function aimModeChange(){
	if(aimMode === 0)
		aimMode = 1;
	else
		aimMode = 0;
	
}
function setOther(){
	cameraMove = false;
	cameraStartMove = false;
	steve.moveFin = false
	ballMove = false;	
}
function openMapFalse(){
	openMap = false;
}
function hittingFalse(){
	hitting = false;
}


/*截圖用
var keyboard = new KeyboardState();
var pressedSpace = false;

function keyPressed() {
  
  keyboard.update();
	if(keyboard.pressed("shift")){
		if (keyboard.pressed("left")) {
		  steve.direct.rotation.y += Math.PI / 270;
		}
		if (keyboard.pressed("right")) {
		  steve.direct.rotation.y += -Math.PI / 270;
		}
	}
	else{
		if (keyboard.pressed("left")) {
		  steve.direct.rotation.y += Math.PI / 270/10;
		}
		if (keyboard.pressed("right")) {
		  steve.direct.rotation.y += -Math.PI / 270/10;
		}
	}
  if (keyboard.pressed("up")) {
			power += 1
			power = clamp(power,0,10);
			steve.power = power;
			power = Math.floor(power)
			theta = power / 10 / 2.5;
			for(var i = 0; i < steve.arrow.children.length; i++)
				steve.arrow.children[i].visible = false;
			
			
			for(var i = 0;i < 9 + power; i++)
				steve.arrow.children[i].visible = true;
			
  }
  else if (keyboard.pressed("down")) {
			power -= 1
			power = clamp(power,0,10);
			steve.power = power;
			power = Math.floor(power)
			theta = power / 10 / 2.5;
			for(var i = 0; i < steve.arrow.children.length; i++)
				steve.arrow.children[i].visible = false;
			for(var i = 0;i < 9 + power; i++)
				steve.arrow.children[i].visible = true;	  
  }
}

*/

export {theta,beforeHit,useOrb,countSwingReset,countSwing}
export {mouseDown,mouseMove,mouseUp,mouseEvent}
export {resetPlayData,setPos,replayAll,resetCameraAngle,inHoleBreak}
export {fovX,moveMode,aimModeChange,setOther,openMap,openMapFalse,hitting,hittingFalse,ballMoveFalse}