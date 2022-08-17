import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {scene,sceneHUD,sceneStroke,camera,cameraOnBall,camera2,cameraM,cameraHUD,cameraStroke,cameraOrbit,switchCamera,renderer,stroke,balls,steve} from './main.js'
import {follow,walkFin} from './Steve.js'
import {keyboard,cameraMove,cameraMoveFin} from './keyPressed.js'
import {floor4,floor5} from './buildTerrain.js'

(function() {
  Math.clamp = function(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }
})();

function textureAnimate() {
  textureAnimate.count = (textureAnimate.count === undefined) ? 1 : textureAnimate.count;

	if (stroke) {
    var texture = stroke.material.map;
    texture.offset.x += 0.25;
 		if (textureAnimate.count % 4 === 0) {
    	texture.offset.y += 0.5;
    }
    textureAnimate.count++;
  }
}
function onWindowResize() {
  
  var width = window.innerWidth;
  var height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
	
}
function render() {
var WW = window.innerWidth;
var HH = window.innerHeight;

	if(switchCamera){
		renderer.setViewport(0, 0, WW , HH );
		renderer.clear();
		renderer.render(scene, camera);
		/*
		if(cameraMove || cameraMoveFin ||walkFin){	
		
		renderer.setViewport(0, 0, WW , HH );
		renderer.clear();
		renderer.render(scene, cameraOnBall);
		
	  } 
	  else {
		renderer.setViewport(0, 0, WW , HH );
		renderer.clear();
		renderer.render(scene, camera);
	  }
	  */
	}
	else{
		renderer.setViewport(0, 0, WW , HH );
		renderer.clear();
		renderer.render(scene,cameraOrbit)
	}
    //renderer.clear();  // important!
	
    renderer.render(sceneHUD, cameraHUD);
	floor4.material.uniforms.hole.value.copy (new THREE.Vector3(10,-0.2,-60));
	floor5.material.uniforms.hole.value.copy (new THREE.Vector3(165,-0.2,-215));
    renderer.setScissorTest(false);
	
	

}
export {textureAnimate,onWindowResize,render}