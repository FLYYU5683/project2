//<script src="https://jyunming-chen.github.io/tutsplus/js/KeyboardState.js"></script>
import {Line2} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/Line2.js';
import {LineMaterial} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/LineMaterial.js';
import {LineGeometry} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/LineGeometry.js';
import {KeyboardState} from './KeyboardState.js'
import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {PowerBar,block,steve,balls,scene} from './main.js'
import {swingTrue,moveTrue,move,swing,stand} from './Steve.js'
import {textureAnimate} from './render.js'
var spaceEffect=false;
var keyboard = new KeyboardState();
var pressedSpace = false;
var Power = 0.1,sign = 1.0,temp =0.9,theta = 0.5;
var lineList = [];
var matLine4;
var positions = [];
var colors = []
var predict = false;

(function() {
  Math.clamp = function(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }
})();

function keyPressed() {
  
  keyboard.update();
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
	if (pressedSpace) {
		steve.arrow.visible = true;
		/*
    Power += sign * 0.01;
	  temp -= sign *0.01;
    if (Power > 1 || Power <0) {
      sign *= -1;
    }
    Power = Math.clamp(Power, 0.0, 1);
	  temp = Math.clamp(temp, 0.0, 1);
    //PowerBar.scale.x = Power;
	block.scale.x=temp;
    theta = Power / 2.5;
    //adjLine(Power, sign);
	steve.power=Power;
	*/
		if(keyboard.pressed("P") && balls[1].vel.length() <= 0.001){
			for(var i = lineList.length; i > 0;i--)
				scene.remove(lineList[i-1])
			//predictLine.visible = false;
      let temp = new THREE.Vector3(0, 0, 0);
	    var vel = new THREE.Vector3(0, 0, 0);

      temp.copy(balls[0].pos.clone().sub(steve.direct.children[3].localToWorld(new THREE.Vector3(0, 0, 0))));
      vel.copy(new THREE.Vector3(temp.x, 0, temp.z)).normalize();
      vel.multiplyScalar(steve.power*90);
			balls[1].vel.copy(vel);
			predict = true;
		}
	 else if(balls[1].vel.length() <= 0.001){
	 		balls[1].pos.copy(balls[0].pos);
			balls[1].vel.copy(new THREE.Vector3(0,0,0))
	 }
  }
	else{
		balls[1].pos.copy(balls[0].pos);
		balls[1].vel.copy(new THREE.Vector3(0,0,0))
		steve.arrow.visible = false;
	}
	/*
	if(balls[1].vel.length() <= 0.001){
		balls[1].pos.copy(balls[0].pos);
		balls[1].vel.copy(new THREE.Vector3(0,0,0))
    steve.line.visible = false;
		
    Power = 0.1;
	  temp = 0.9;
    sign = 1.0;
		
  }
	*/
  if (move == false) {
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
  }
  if (keyboard.pressed("space")) {
    if (move == false) {
      if (stand == false) {
        PowerBar.visible = true;
		block.visible = true;
        pressedSpace = true;
      }
    }
  } else {
    if (move == false && pressedSpace == true && stand == false) {
	  spaceEffect=true;
	  textureAnimate();
      PowerBar.visible = false;
	  block.visible = false;
	  swingTrue();
	  steve.puttPos.copy(steve.direct.children[3].localToWorld(new THREE.Vector3(0, 0, 0)));
    }
    pressedSpace = false;
  }
  if(spaceEffect)
  {
    if(steve.putt.worldToLocal(balls[0].pos.clone()).length() <= (0.5 + 0.5))
	{
			for(var i = lineList.length; i > 0;i--)
				scene.remove(lineList[i-1])
      let temp = new THREE.Vector3(0, 0, 0);
	    var vel = new THREE.Vector3(0, 0, 0);

      temp.copy(balls[0].pos.clone().sub(steve.puttPos));
      vel.copy(new THREE.Vector3(temp.x, 0, temp.z)).normalize();
      vel.multiplyScalar(steve.power*90);
      balls[0].vel.copy(vel)
      moveTrue();
	    spaceEffect=false;
	  }
  }
  if(balls[1].vel.length() >= 0.001 && predict){
			positions.push(balls[1].pos.x,balls[1].pos.y,balls[1].pos.z);
			colors.push(255, 0, 0)
	}
	else if(predict){
		predict = false;
		/*
		positions.push(balls[1].pos.x,balls[1].pos.y,balls[1].pos.z);
		colors.push(255, 0, 0)
		*/
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
	}
	
}
function resetTheta(){
	theta = 0;
}

export {keyPressed,resetTheta,theta,spaceEffect,keyboard}