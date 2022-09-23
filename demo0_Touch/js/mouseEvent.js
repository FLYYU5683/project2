//<script src="https://jyunming-chen.github.io/tutsplus/js/KeyboardState.js"></script>
import {Line2} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/Line2.js';
import {LineMaterial} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/LineMaterial.js';
import {LineGeometry} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/LineGeometry.js';
import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {cameraOnPlayer,cameraForMouse,renderer,textureAnimate,start,scene,pressStart} from './render.js'
import {steve,balls} from './main.js'
import {stop,stopTrue} from './Steve.js'
import {pickables} from './buildTerrain.js'

(function() {
  Math.clamp = function(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }
})();

var beforeHit = true;
var countSwing = 1;
var power = 0,sign = 1.0,theta = 0.5;
var lineList = [];
var matLine4;
var positions = [];
var colors = []
var pHead;
var predict = false;
var ballMove = false;

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var leftMousePress = false, rightMousePress = false, cancel = false;
var useOrb = false;
function mouseDown(event){
  if(event.button == 0){
	  if (start) {
		if (!useOrb) {
		  steve.arrow.visible = true;
		  renderer.render(scene, cameraForMouse)
		  event.preventDefault();
		  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

		  raycaster.setFromCamera(mouse, cameraForMouse);
		  var intersects = raycaster.intersectObjects(pickables, true);
		  if (beforeHit == true) {
			if (intersects.length > 0) {
			  pHead = intersects[0].point;
			  cancel = false;
			  leftMousePress = true;
			}
		  }
		}
	  }
	  if(!start){
		pressStart();
	  }
	}
  if (event.button == 1)
    useOrb = !useOrb
  if (event.button == 2) {
    if (!useOrb) {
      if (leftMousePress) {
		for(var i = positions.length;i > 0;i--){
			positions.pop();
			colors.pop();
		}
		for(var i = lineList.length; i > 0;i--){
			scene.remove(lineList[i-1])
		}
		balls[1].pos.copy(balls[0].pos)
        leftMousePress = false;
        cancel = true;
        //head.rotation.y = Math.PI / 2;
        theta = 0;
		power = 0;
		
        steve.arrow.visible = false;
      } else {
        event.preventDefault();
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        rightMousePress = true
      }
    }
  }	
}
function mouseUp(event){
  if(event.button == 0){
	  if (start) {
		if (!cancel) {
		  if (!useOrb) {
			event.preventDefault();
			mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

			leftMousePress = false;
			steve.arrow.visible = false;

			raycaster.setFromCamera(mouse, cameraForMouse);
			var intersects = raycaster.intersectObjects(pickables, true);
			if (beforeHit == true && intersects.length > 0) {
				beforeHit = false;
				steve.puttPos.copy(steve.direct.children[3].localToWorld(new THREE.Vector3(0, 0, 0)))
			}
		  }
		} else {
		  cancel = false;
		}
	  }
  }
  if (event.button == 2 && rightMousePress) {
    if (!useOrb) {
	  cameraOnPlayer.lookAt(balls[0].pos)
      cameraForMouse.position.copy(cameraOnPlayer.localToWorld(new THREE.Vector3(0,0,0)))
      cameraForMouse.lookAt(balls[0].pos)
      renderer.render(scene, cameraForMouse)
      rightMousePress = false;
    }
  }
}
function mouseMove(event) {
  if (!useOrb) {
    if (leftMousePress) {
      event.preventDefault();
      raycaster.setFromCamera(mouse, cameraForMouse);
      var intersects = raycaster.intersectObjects(pickables, true);
      if (intersects.length > 0) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
	    let nowLength = pHead.distanceTo(intersects[0].point);
	    power = Math.floor(Math.clamp(nowLength, 0, 10));
	    steve.power = power;
	    theta = power / 10 / 2.5;
      }

    }
  }
}
function mouseWheel(event){
	cameraOnPlayer.fov += event.deltaY / 100
	cameraOnPlayer.updateProjectionMatrix();
}
function moveCamera(){
	if(!ballMove){
		steve.direct.rotation.y += mouse.x / 50;
		steve.camera.rotation.y += mouse.x / 50;
	}
	else{
		steve.camera.rotation.y += mouse.x / 50;
	}
	
}
function mouseEvent(){
   predictLine()
  if(rightMousePress)
	moveCamera()
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
  }
  if(ballMove == true && balls[0].vel.length() <= 0.7 / 5){
	countSwing++;
	ballMove = false
	steve.body.visible = false;
	steve.goal.copy(balls[0].pos)
	steve.begin.copy(steve.lastPos)
	steve.footPath.position.copy(steve.lastPos)
	stopTrue(); 
  }
	
}
function predictLine(){
	if(leftMousePress){
		var EPS = 0.7
		if (beforeHit && balls[0].vel.length() <= EPS / 5) {
			for(var i = 0; i < steve.arrow.children.length; i++)
				steve.arrow.children[i].visible = false;
			for(var i = 0;i < 9 + power; i++)
				steve.arrow.children[i].visible = true;
			
			if(balls[1].vel.length() <= EPS && !predict){
				let temp = new THREE.Vector3(0, 0, 0);
				var vel = new THREE.Vector3(0, 0, 0);

				temp.copy(balls[0].pos.clone().sub(steve.direct.children[3].localToWorld(new THREE.Vector3(0, 0, 0))));
				vel.copy(new THREE.Vector3(temp.x, 0, temp.z)).normalize();
				vel.multiplyScalar(steve.power*8);
				balls[1].vel.copy(vel);
				predict = true;			
			}
			else if(balls[1].vel.length() >= EPS && !predict){
				balls[1].pos.copy(balls[0].pos);
				balls[1].vel.copy(new THREE.Vector3(0,0,0))
			}
			else if(balls[1].vel.length() >= EPS && predict){
				positions.push(balls[1].pos.x,balls[1].pos.y,balls[1].pos.z);
				colors.push(255, 255, 0)
			}
			else if(balls[1].vel.length() <= EPS && predict){
				for(var i = lineList.length; i > 0;i--){
					scene.remove(lineList[i-1])
				}
				
				positions.push(balls[1].pos.x,balls[1].pos.y,balls[1].pos.z);
				colors.push(255, 255, 0)

				predict = false;

				var geometry = new LineGeometry();
				geometry.setPositions(positions);
				geometry.setColors(colors);
				matLine4 = new LineMaterial({
					color: 0xffffff,
					linewidth: 3, 
					vertexColors: THREE.VertexColors,
					/*
					dashed: true,
					dashScale: 1,
					gapSize: 3,
					dashSize: 3
					*/
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
				colors.push(255, 255, 0)

				predict = false;

				var geometry = new LineGeometry();
				geometry.setPositions(positions);
				geometry.setColors(colors);
				matLine4 = new LineMaterial({
					color: 0xffffff,
					linewidth: 3, 
					vertexColors: THREE.VertexColors,
					/*
					dashed: true,
					dashScale: 1,
					gapSize: 3,
					dashSize: 3
					*/
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
	}		
}
function preInHole(){
	for(var i = lineList.length; i > 0;i--){
				scene.remove(lineList[i-1])
			}
			
			positions.push(balls[1].pos.x,balls[1].pos.y,balls[1].pos.z);
			colors.push(255, 255, 0)

			predict = false;

			var geometry = new LineGeometry();
			geometry.setPositions(positions);
			geometry.setColors(colors);
			matLine4 = new LineMaterial({
				color: 0xffffff,
				linewidth: 3, 
				vertexColors: THREE.VertexColors,
				/*
				dashed: true,
				dashScale: 1,
				gapSize: 3,
				dashSize: 3
				*/
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
function countSwingReset(){
	countSwing = 0;
}
export {theta,beforeHit,ballMove,preInHole,useOrb,countSwingReset,countSwing}
export{mouseDown,mouseMove,mouseUp,mouseWheel,mouseEvent}