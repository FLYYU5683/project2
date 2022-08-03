import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {scene,sceneHUD,sceneStroke,camera,camera2,cameraM,cameraHUD,cameraStroke,renderer,stroke,balls,steve} from './main.js'
import {follow,move} from './Steve.js'
import {keyboard} from './keyPressed.js'
import {floor4} from './buildTerrain.js'
var switchCamera = true;

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


	if(balls[0].pos.clone().sub(steve.direct.position).length() <= 30||follow){	
	
	renderer.setViewport(0, 0, WW , HH );
	renderer.clear();
    renderer.render(scene, camera);
	
  } else {
  	var temp = new THREE.Vector3(balls[0].pos.x,camera.position.y,balls[0].pos.z)
	temp.sub(steve.direct.position).normalize().multiplyScalar(100)
	camera2.position.copy(steve.direct.position.clone().add(temp))
	camera2.lookAt(balls[0].pos)
	renderer.render(scene, camera2);
	renderer.setViewport(0, 0, WW , HH );
	renderer.clear();
    renderer.render(scene, camera2);
  }

    if (keyboard.pressed("M")) {
        renderer.setScissorTest(true);
        renderer.setScissor(WW/4, HH/4, WW / 2, HH / 2);

        renderer.setViewport(WW/4, HH/4, WW / 2, HH / 2);
        renderer.clear();  // important!
        renderer.render(scene, cameraM);
        renderer.setScissorTest(false);
    }

    renderer.setScissorTest(true);
    renderer.setScissor(0, HH/4, WW / 2, HH / 3);

    renderer.setViewport(0, HH/4, WW / 2, HH / 3);
    //renderer.clear();  // important!
    renderer.render(sceneHUD, cameraHUD);
	floor4.material.uniforms.hole.value.copy (new THREE.Vector3(79.9,-0.2,-129.8));
    renderer.setScissorTest(false);

}
export {textureAnimate,onWindowResize,render}