import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {scene,sceneHUD,cameraOnPlayer,cameraHUD,cameraOrbit,renderer,balls,controls} from './main.js'
import {useOrb} from './mouseEvent.js'
import {floor5} from './buildTerrain.js'
var look = false;
(function() {
  Math.clamp = function(val, min, max) {
    return Math.min(Math.max(val, min), max);
  }
})();

function onWindowResize() {
  
  var width = window.innerWidth;
  var height = window.innerHeight;
  cameraOnPlayer.aspect = width / height;
  cameraOnPlayer.updateProjectionMatrix();
  renderer.setSize(width, height);
	
}
function render() {
  var WW = window.innerWidth;
  var HH = window.innerHeight;
  if (!useOrb) {
    look = false
    renderer.render(scene, cameraOnPlayer);

  } else {
    if (!look) {
      cameraOrbit.position.copy(cameraOnPlayer.localToWorld(new THREE.Vector3(0,0,0)))
      cameraOrbit.lookAt(balls[0].pos)
      controls.target.copy(balls[0].pos.clone())
      controls.update();

      look = !look;
    }
    renderer.render(scene, cameraOrbit);
  }
    renderer.render(sceneHUD, cameraHUD);
	//floor5.material.uniforms.hole.value.copy (new THREE.Vector3(165,-0.2,-215));
}

export {onWindowResize,render}