import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {Line2} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/Line2.js';
import {LineMaterial} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/LineMaterial.js';
import {LineGeometry} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/lines/LineGeometry.js';

var matLine2,matLine3;

function BuildBlock(){
  var positions = [];
  let len = 2;
  let div = 400;
  for (let i = 0; i < div; i++) {
    let x = 0 + i * len / div;  // x in [-50,50]
    let y = 0;
    positions.push(x, y, 0);
  }
  var obsgeometry = new LineGeometry();
  obsgeometry.setPositions(positions);
  
  matLine3 = new LineMaterial({
    color: 0x888888,
    linewidth: 200, // in pixels
    vertexColors: THREE.VertexColors,
    //resolution:  // to be set by renderer, eventually
    dashed: true
  });
  var obstacle = new Line2(obsgeometry,matLine3);
  obstacle.position.x = 0;
  let obs = new THREE.Group();
  obs.add(obstacle);
  obs.position.set(1.03, 18.67, 31);
  obs.rotation.x = -Math.PI/3;
  obs.rotation.y =Math.PI;	
  obs.visible = false;
  
  return obs;
}
function BuildPowerBar() {
  var positions = [];
  var colors = [];
  var color = new THREE.Color();

  let len = 3;
  let div = 400;
  for (let i = 0; i < div; i++) {
    let x = 0 + i * len / div;  // x in [-50,50]
    let y = 0;
    positions.push(x, y, 0);

    color.setHSL(i / div/7, 1.0, 0.5);
    colors.push(color.r, color.g, color.b);
  }

  var bargeometry = new LineGeometry();
  bargeometry.setPositions(positions);
  bargeometry.setColors(colors);

  matLine2 = new LineMaterial({
    color: 0xffffff,
    linewidth: 200, // in pixels
    vertexColors: THREE.VertexColors,
    //resolution:  // to be set by renderer, eventually
    dashed: true
  });

  var bar = new Line2(bargeometry,matLine2);
  //bar.rotation.y=Math.PI;  
  bar.position.x = 0;
  let Barscale = new THREE.Group();
  Barscale.add(bar);
  Barscale.position.set(1.53, 18, 30.5)
  Barscale.rotation.x = -Math.PI/3;
  Barscale.rotation.y =Math.PI;
  Barscale.visible = false;

  return Barscale;
}
function BuildFlag(){
  var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.2,30,64),new THREE.MeshNormalMaterial());
 var  plane= new THREE.Mesh(new THREE.PlaneGeometry( 3, 2 ),new THREE.MeshBasicMaterial({color:'red', side: THREE.DoubleSide}));
 var flag =new THREE.Group();
 cylinder.position.y = 15;
 flag.add(cylinder);
 flag.add(plane);
 plane.position.set(1.5,29,0);

   return flag;
}

export {BuildBlock,BuildPowerBar,BuildFlag,matLine2,matLine3}