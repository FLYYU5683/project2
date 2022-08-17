//<script src="https://jyunming-chen.github.io/tutsplus/js/KeyboardState.js"></script>
import {Line2} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/Line2.js';
import {LineMaterial} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/LineMaterial.js';
import {LineGeometry} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/LineGeometry.js';
import {KeyboardState} from './KeyboardState.js'
import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {PowerBar,block,steve,balls,scene,cameraOnBall} from './main.js'
import {swingTrue,swing,stand,stop,stopTrue,walkFin,walkFinFalse} from './Steve.js'
import {textureAnimate} from './render.js'
var beforeHit = true;
var spaceEffect=false;
var keyboard = new KeyboardState();
var pressedSpace = false;
var Power = 0,sign = 1.0,temp =0.9,theta = 0.5;
var lineList = [];
var matLine4;
var positions = [];
var colors = []
var predict = false;
var ballMove = false;
var cameraMove  = false
var cameraMoveFin = false;

(function() {
  Math.clamp = function(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }
})();

function keyPressed() {
    keyboard.update();
	var EPS = 0.7
	if (beforeHit && balls[0].vel.length() <= EPS / 5) {
		steve.arrow.visible = true;
		for(var i = 0; i < 9; i++)
			steve.arrow.children[i].visible = true;
		
		var check = Math.floor(Power * 10) / 10;
		switch (check){
			case 0:
				for(var i = 9; i < 9; i++)
					steve.arrow.children[i].visible = true;
				for(var i = steve.arrow.children.length - 1; i >= 9; i--)
					steve.arrow.children[i].visible = false;
				break;
			case 0.1 :
				for(var i = 9; i < 10; i++)
					steve.arrow.children[i].visible = true;
				for(var i = steve.arrow.children.length - 1; i >= 10; i--)
					steve.arrow.children[i].visible = false;
				break;
			case 0.2 :
				for(var i = 9; i < 11; i++)
					steve.arrow.children[i].visible = true;
				for(var i = steve.arrow.children.length - 1; i >= 11; i--)
					steve.arrow.children[i].visible = false;
				break;
			case 0.3 :
				for(var i = 9; i < 12; i++)
					steve.arrow.children[i].visible = true;
				for(var i = steve.arrow.children.length - 1; i >= 12; i--)
					steve.arrow.children[i].visible = false;
				break;			
			case 0.4 :
				for(var i = 9; i < 13; i++)
					steve.arrow.children[i].visible = true;
				for(var i = steve.arrow.children.length - 1; i >= 13; i--)
					steve.arrow.children[i].visible = false;
				break;			
			case 0.5 :
				for(var i = 9; i < 14; i++)
					steve.arrow.children[i].visible = true;
				for(var i = steve.arrow.children.length - 1; i >= 14; i--)
					steve.arrow.children[i].visible = false;
				break;			
			case 0.6 :
				for(var i = 9; i < 15; i++)
					steve.arrow.children[i].visible = true;
				for(var i = steve.arrow.children.length - 1; i >= 15; i--)
					steve.arrow.children[i].visible = false;
				break;			
			case 0.7 :
				for(var i = 9; i < 16; i++)
					steve.arrow.children[i].visible = true;
				for(var i = steve.arrow.children.length - 1; i >= 16; i--)
					steve.arrow.children[i].visible = false;
				break;			
			case 0.8 :
				for(var i = 9; i < 17; i++)
					steve.arrow.children[i].visible = true;
				for(var i = steve.arrow.children.length - 1; i >= 17; i--)
					steve.arrow.children[i].visible = false;
				break;			
			case 0.9 :
				for(var i = 9; i < 18; i++)
					steve.arrow.children[i].visible = true;
				for(var i = steve.arrow.children.length - 1; i >= 18; i--)
					steve.arrow.children[i].visible = false;
				break;			
			case 1 :
				for(var i = 9; i < 19; i++)
					steve.arrow.children[i].visible = true;
				for(var i = steve.arrow.children.length - 1; i >= 19; i--)
					steve.arrow.children[i].visible = false;
				break;			
		}
		if(balls[1].vel.length() <= EPS && !predict){
			//predictLine.visible = false;
			let temp = new THREE.Vector3(0, 0, 0);
			var vel = new THREE.Vector3(0, 0, 0);

			temp.copy(balls[0].pos.clone().sub(steve.direct.children[3].localToWorld(new THREE.Vector3(0, 0, 0))));
			vel.copy(new THREE.Vector3(temp.x, 0, temp.z)).normalize();
			vel.multiplyScalar(steve.power*90);
			balls[1].vel.copy(vel);
			predict = true;			
		}
		else if(balls[1].vel.length() >= EPS && !predict){
			balls[1].pos.copy(balls[0].pos);
			balls[1].vel.copy(new THREE.Vector3(0,0,0))
		}
		else if(balls[1].vel.length() >= EPS && predict){
			positions.push(balls[1].pos.x,balls[1].pos.y,balls[1].pos.z);
			colors.push(255, 0, 0)
		}
		else if(balls[1].vel.length() <= EPS && predict){
			for(var i = lineList.length; i > 0;i--){
				scene.remove(lineList[i-1])
			}
			
			positions.push(balls[1].pos.x,balls[1].pos.y,balls[1].pos.z);
			colors.push(255, 0, 0)

			predict = false;

			var geometry = new LineGeometry();
			geometry.setPositions(positions);
			geometry.setColors(colors);
			matLine4 = new LineMaterial({
				color: 0xffffff,
				linewidth: 5, 
				vertexColors: THREE.VertexColors,
				dashed: true,
				dashScale: 1,
				gapSize: 3,
				dashSize: 3
			});
			var predictLine = new Line2(geometry, matLine4);
			predictLine.computeLineDistances();
			
			scene.add(predictLine);
			
			matLine4.resolution.set(window.innerWidth, window.innerHeight); 
				 
			for(var i = positions.length;i > 0;i--){
				positions.pop();
				colors.pop();
			}
			
			lineList.push(predictLine)
			
	 		balls[1].pos.copy(balls[0].pos);
			balls[1].vel.copy(new THREE.Vector3(0,0,0))
		}
		else{
			balls[1].pos.copy(balls[0].pos);
			balls[1].vel.copy(new THREE.Vector3(0,0,0))
			steve.arrow.visible = false;
		}
		if(balls[1].pos.y <= -20){
			for(var i = lineList.length; i > 0;i--){
				scene.remove(lineList[i-1])
			}
			
			positions.push(balls[1].pos.x,balls[1].pos.y,balls[1].pos.z);
			colors.push(255, 0, 0)

			predict = false;

			var geometry = new LineGeometry();
			geometry.setPositions(positions);
			geometry.setColors(colors);
			matLine4 = new LineMaterial({
				color: 0xffffff,
				linewidth: 5, 
				vertexColors: THREE.VertexColors,
				dashed: true,
				dashScale: 1,
				gapSize: 3,
				dashSize: 3
			});
			var predictLine = new Line2(geometry, matLine4);
			predictLine.computeLineDistances();
			
			scene.add(predictLine);
			
			matLine4.resolution.set(window.innerWidth, window.innerHeight); 
				 
			for(var i = positions.length;i > 0;i--){
				positions.pop();
				colors.pop();
			}
			
			lineList.push(predictLine)
			
	 		balls[1].pos.copy(balls[0].pos);
			balls[1].vel.copy(new THREE.Vector3(0,0,0))
		}
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
    	if(keyboard.pressed("up")){
			Power += sign * 0.01
			temp -= sign *0.01;
			Power = Math.clamp(Power, 0.0, 1);
			temp = Math.clamp(temp, 0.0, 1);
			block.scale.x=temp;
			theta = Power / 2.5;
			steve.power=Power;
		}
		else if (keyboard.pressed("down")){
			Power -= sign * 0.01
			temp += sign *0.01;
			Power = Math.clamp(Power, 0.0, 1);
			temp = Math.clamp(temp, 0.0, 1);
			block.scale.x=temp;
			theta = Power / 2.5;
			steve.power=Power;	
		}
	}
    if (keyboard.pressed("space") && beforeHit) {
		beforeHit = false;
		steve.puttPos.copy(steve.direct.children[3].localToWorld(new THREE.Vector3(0, 0, 0)))
  }
  if(steve.putt.worldToLocal(balls[0].pos.clone()).length() <= (0.5 + 0.5) && !beforeHit)
  {
	  cameraOnBall.position.copy(steve.direct.children[4].position);
	  for(var i = lineList.length; i > 0;i--)
		scene.remove(lineList[i-1])
	  let temp = new THREE.Vector3(0, 0, 0);
	  var vel = new THREE.Vector3(0, 0, 0);
      temp.copy(balls[0].pos.clone().sub(steve.puttPos));
      vel.copy(new THREE.Vector3(temp.x, 0, temp.z)).normalize();
      vel.multiplyScalar(steve.power*90);
      balls[0].vel.copy(vel)
      ballMove = true;
	  Power = 0;
	  steve.power = 0;
	  beforeHit = true;
	  steve.arrow.visible = false
	  cameraMove = true;
  }
  if(ballMove == true && balls[0].vel.length() <= EPS / 5){
	cameraMove = false
	cameraMoveFin = true;
	ballMove = false
	steve.body.visible = false;
	steve.goal.copy(balls[0].pos)
	steve.begin.copy(steve.direct.position)
	steve.footPath.position.copy(steve.direct.position)
	stopTrue(); 
	
  }
  if(cameraMove == true){
	cameraOnBall.position.copy(balls[0].mesh.localToWorld(new THREE.Vector3(0,25,40)))
	cameraOnBall.lookAt(balls[0].pos);
  }
  /*
  if(cameraMoveFin == true){
	
	let middlePoint = new THREE.Vector3(0,0,0);
	let dirToBall = new THREE.Vector3(0,0,0);
	
	dirToBall.copy(balls[0].pos.clone().sub(steve.direct.position));
	
	let lengthBetDB = dirToBall.length() / 2;
	dirToBall.normalize();
	middlePoint.copy(steve.direct.position.clone().add(dirToBall.multiplyScalar(lengthBetDB)))
	middlePoint.y += lengthBetDB / 3 * 4;
	
	let camToMidP = new THREE.Vector3(0,0,0);
	
	camToMidP.copy(middlePoint.clone().sub(cameraOnBall.position))
	let lengthBetCM = camToMidP.length();
	camToMidP.normalize();
	if(cameraOnBall.position.distanceTo(middlePoint) >= 2){
		cameraOnBall.position.add(camToMidP.multiplyScalar(0.064))
		cameraOnBall.lookAt(balls[0].mesh.localToWorld(new THREE.Vector3(0,10,0)))
	}
	else{
		cameraMoveFin = false
		cameraOnBall.lookAt(middlePoint.x,middlePoint.y - lengthBetDB / 3 * 4,middlePoint.z)
		steve.goal.copy(balls[0].pos)
		steve.begin.copy(steve.direct.position)
		steve.footPath.position.copy(steve.direct.position)
		stopTrue(); 
		ballMove = false
	}
  }
  if(walkFin){
	  cameraOnBall.lookAt(balls[0].mesh.localToWorld(new THREE.Vector3(0,10,0)))
	let camTocamOnB = new THREE.Vector3(0,0,0)
	camTocamOnB.copy(steve.direct.children[4].position.clone().sub(cameraOnBall.position))
	if(steve.direct.children[4].position.distanceTo(cameraOnBall.position) >= 2){
		cameraOnBall.position.add(camTocamOnB.multiplyScalar(0.064))
		cameraOnBall.lookAt(balls[0].mesh.localToWorld(new THREE.Vector3(0,10,0)))
	}
	else{
		cameraOnBall.position.copy(steve.direct.children[4].position);
		walkFinFalse();
	}
  }
  */
}
function resetTheta(){
	theta = 0;
}
function preInHole(){
	for(var i = lineList.length; i > 0;i--){
				scene.remove(lineList[i-1])
			}
			
			positions.push(balls[1].pos.x,balls[1].pos.y,balls[1].pos.z);
			colors.push(255, 0, 0)

			predict = false;

			var geometry = new LineGeometry();
			geometry.setPositions(positions);
			geometry.setColors(colors);
			matLine4 = new LineMaterial({
				color: 0xffffff,
				linewidth: 5, 
				vertexColors: THREE.VertexColors,
				dashed: true,
				dashScale: 1,
				gapSize: 3,
				dashSize: 3
			});
			var predictLine = new Line2(geometry, matLine4);
			predictLine.computeLineDistances();
			
			scene.add(predictLine);
			
			matLine4.resolution.set(window.innerWidth, window.innerHeight); 
				 
			for(var i = positions.length;i > 0;i--){
				positions.pop();
				colors.pop();
			}			
			lineList.push(predictLine)
			
	 		balls[1].pos.copy(balls[0].pos);
			balls[1].vel.copy(new THREE.Vector3(0,0,0))
}
export {keyPressed,resetTheta,theta,spaceEffect,keyboard,Power,beforeHit,ballMove,preInHole,cameraMove,cameraMoveFin}