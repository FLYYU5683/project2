//<script src="https://jyunming-chen.github.io/tutsplus/js/KeyboardState.js"></script>
import {Line2} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/Line2.js';
import {LineMaterial} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/LineMaterial.js';
import {LineGeometry} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/LineGeometry.js';
import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {cameraOnPlayer,cameraForMouse,renderer,textureAnimate,start,scene,HUDPress} from './render.js'
import {steve,balls} from './main.js'
import {stop,stopTrue} from './Steve.js'
import {pickables} from './buildTerrain.js'

var beforeHit = true;
var countSwing = 1;
var power = 0,sign = 1.0,theta = 0.5;
var lineList = [];
var matLine4;
var positions = [];
var colors = []
var ballMove = false;
var useOrb = false;

var touch = new THREE.Vector2();
var rotateX = 0,rotateY = 0;
var cancelCharge = false;
var cancelMove = false;
var firstTouch = false;
var startMove = false;
var fingerNum = 0;
var touchHUD = false;
var countAngle = 0;
var cameraMove = false;
function predictLine(){
	if(!cancelCharge){
		var EPS = 0.7
		do{
			let dt = 0.05;
			let thisPos = new THREE.Vector3();
			balls[1].update(dt)
			
			thisPos.copy(balls[1].pos);
			
			positions.push(thisPos.x,thisPos.y,thisPos.z);
			colors.push(255,0,0)
			if(balls[1].testRunInHole == true)
				break;
		}while(balls[1].vel.length() > EPS && balls[1].pos.y >= -10);
		
		for(var i = lineList.length; i > 0;i--){
			scene.remove(lineList[i-1])
		}
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
					 
		for(var i = positions.length;i > 0;i--){
			positions.pop();
			colors.pop();
		}
				
		lineList.push(predictLine)
				
		balls[1].pos.copy(balls[0].pos);
		balls[1].vel.copy(new THREE.Vector3(0,0,0))	
		
	}
}
function touchStart(event){
	event.preventDefault();
	touchHUD = HUDPress();
	if(start && !touchHUD){
		touch.x = (event.touches[0].pageX / window.innerWidth) * 2 - 1;
		touch.y = -(event.touches[0].pageY / window.innerHeight) * 2 + 1;
		if(fingerNum == 1 && event.touches.length != fingerNum){
			cancelCharge = true;
			for(var i = positions.length;i > 0;i--){
				positions.pop();
				colors.pop();
			}
			for(var i = lineList.length; i > 0;i--){
				scene.remove(lineList[i-1])
			}
			balls[1].pos.copy(balls[0].pos)
			theta = 0;
			power = 0;
			steve.arrow.visible = false;
			steve.camera.rotation.y = rotateY
		}
	}

}
function touchMove(event){
	event.preventDefault();
	if(firstTouch && !touchHUD){
		if(!startMove){
			fingerNum = event.touches.length;
			startMove = true;
		}
		if(startMove && fingerNum != event.touches.length){
			cancelMove = true;
		}
		if(!cancelMove){
			if(fingerNum == 1){
				balls[1].testRunInHole = false;
				steve.arrow.visible = true;
				var x = (event.touches[0].pageX / window.innerWidth) * 2 - 1;
				var y = -(event.touches[0].pageY / window.innerHeight) * 2 + 1;
				var vector = new THREE.Vector3(touch.x - x,0,touch.y - y)
				power = Math.floor(clamp(vector.length() * 12,0,10));
				steve.power = power;
				theta = power / 10 / 2.5;
				var angle = new THREE.Vector3(1,0,0).angleTo(vector)
				
				steve.camera.rotation.y = angle - Math.PI / 2 + rotateY;
				steve.direct.rotation.y = angle - Math.PI / 2 + rotateY;
				
				for(var i = 0; i < steve.arrow.children.length; i++)
					steve.arrow.children[i].visible = false;
				for(var i = 0;i < 9 + power; i++)
					steve.arrow.children[i].visible = true;
				
				let temp = new THREE.Vector3(0, 0, 0);
				var vel = new THREE.Vector3(0, 0, 0);

				temp.copy(balls[0].pos.clone().sub(steve.direct.children[3].localToWorld(new THREE.Vector3(0, 0, 0))));
				vel.copy(new THREE.Vector3(temp.x, 0, temp.z)).normalize();
				vel.multiplyScalar(steve.power*8);
				balls[1].vel.copy(vel);
				predictLine()
			}
			if(fingerNum == 2){
				
				var x = (event.touches[0].pageX / window.innerWidth) * 2 - 1;
				var y = -(event.touches[0].pageY / window.innerHeight) * 2 + 1;
				var xy = new THREE.Vector2(x,y)

				if(Math.abs(xy.x) > Math.abs(touch.x)){
					steve.camera.children[0].fov -= xy.length()
					steve.direct.children[3].fov -= xy.length()
				}
				else if(Math.abs(xy.x) < Math.abs(touch.x)){
					steve.camera.children[0].fov += xy.length()
					steve.direct.children[3].fov += xy.length()
				}
				
				steve.camera.children[0].updateProjectionMatrix();
				steve.direct.children[3].updateProjectionMatrix();
				touch.x = (event.touches[0].pageX / window.innerWidth) * 2 - 1;
				touch.y = -(event.touches[0].pageY / window.innerHeight) * 2 + 1;
			}
			if(fingerNum == 3){
				var x = (event.touches[0].pageX / window.innerWidth) * 2 - 1;
				var y = -(event.touches[0].pageY / window.innerHeight) * 2 + 1;
				x -= touch.x;
				y -= touch.y;
				rotateX += y
				rotateY -= x
				touch.x = (event.touches[0].pageX / window.innerWidth) * 2 - 1;
				touch.y = -(event.touches[0].pageY / window.innerHeight) * 2 + 1;
				
				steve.camera.rotation.order = 'YXZ';
				steve.camera.rotation.y -= x;
				steve.camera.rotation.x += y;
				steve.direct.rotation.y -= x;
			}
		}
	}
}
function touchEnd(event){
	event.preventDefault();
	if(firstTouch && !touchHUD && event.touches.length == 0){
		if(fingerNum == 1){
			if(!cancelCharge)
			{
				beforeHit = false;
				steve.puttPos.copy(steve.direct.children[3].localToWorld(new THREE.Vector3(0, 0, 0)))
			}
			else{
				cancelCharge = false;

			}
		}
		startMove = false;
		cancelMove = false;
	}
	else{
		firstTouch = true;
		touchHUD = false;
	}
}
function touchEvent(){
   textureAnimate()
  if(steve.putt.worldToLocal(balls[0].pos.clone()).length() <= (0.5 + 0.5) && !beforeHit)
  {
	  for(var i = lineList.length; i > 0;i--){
		scene.remove(lineList[i-1])
	  }
	  for(var i = positions.length;i > 0;i--){
		positions.pop();
		colors.pop();
	  }
	  steve.lastPos.copy(balls[0].pos);
	  for(var i = lineList.length; i > 0;i--)
		scene.remove(lineList[i-1])
	  let temp = new THREE.Vector3(0, 0, 0);
	  var vel = new THREE.Vector3(0, 0, 0);
      temp.copy(balls[0].pos.clone().sub(steve.puttPos));
      vel.copy(new THREE.Vector3(temp.x, 0, temp.z)).normalize();
      vel.multiplyScalar(steve.power*8);
      balls[0].vel.copy(vel)
      ballMove = true;
	  power = 0;
	  steve.power = 0;
	  beforeHit = true;
	  steve.arrow.visible = false
	  cameraMove = true;
  }
  if(ballMove == true && balls[0].vel.length() <= 0.7 / 5 && !cameraMove){
	countSwing++;
	ballMove = false
	steve.body.visible = false;
	steve.goal.copy(balls[0].pos)
	steve.begin.copy(steve.lastPos)
	steve.footPath.position.copy(steve.lastPos)
	stopTrue(); 
  }
  if(cameraMove){
	steve.camera.rotation.y += Math.PI/90;
	countAngle += Math.PI / 90;
	rotateY += Math.PI/90;
	if(Math.abs(countAngle - Math.PI/6*5) <= Math.PI/90){
		cameraMove = false;
	}	
  }
  if(steve.moveFin && !ballMove){
	console.log(countAngle)
	steve.camera.rotation.y -= Math.PI/90;
	countAngle -= Math.PI / 90;
	rotateY -= Math.PI/90;
	if(Math.abs(countAngle - 0) <= Math.PI/90){
		countAngle = 0
		steve.moveFin = false
		//steve.direct.rotation.y = rotateY
	}
  }
}
function countSwingReset(){
	countSwing = 0;
}
function clamp(val, min, max){
	return Math.min(Math.max(val, min), max);
}

export {theta,beforeHit,useOrb,countSwingReset,countSwing}
export {touchStart,touchMove,touchEnd,touchEvent}