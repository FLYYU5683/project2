import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {scene} from './main.js'
class FinitePlane {
  constructor(localPointOnPlane, localNormal, mesh, length, group) {
    this.localPtOnPl = localPointOnPlane.clone();
    this.localNormal = localNormal.clone();
    this.mesh = mesh;
    if (group === undefined)
      scene.add(mesh)
    else
      group.add(mesh)
    this.length = length || 1e10;
  }
  update() {
    this.mesh.updateMatrixWorld();
    this.ptOnPl = this.mesh.localToWorld(this.localPtOnPl.clone());
    let normalMat = new THREE.Matrix3().getNormalMatrix(this.mesh.matrixWorld);
    this.normal = this.localNormal.clone().applyMatrix3(normalMat).normalize()
  }
}

class Wall {
  constructor(len, localN) {
    var geometry = new THREE.BoxGeometry(len, 5, 2.5);
    var material = new THREE.MeshPhongMaterial({
      color: 0xA23400,
      shininess: 200,
      transparent: true,
      opacity: 1
    })
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    this.mesh = mesh;
	mesh.castShadow = true;
	mesh.receiveShadow = true;
    this.len = len
    this.localN = localN.clone();
  }
  update() {
    this.mesh.updateMatrixWorld();
    let normalMat = new THREE.Matrix3().getNormalMatrix(this.mesh.matrixWorld);
    this.normal = this.localN.clone().applyMatrix3(normalMat).normalize()
  }

}
export {Wall,FinitePlane}