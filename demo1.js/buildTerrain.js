import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {ParametricGeometry} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/geometries/ParametricGeometry.js';
import {FinitePlane,Wall} from './terrain.js'
import {scene,ballR,renderer} from './main.js'
var table,floor4;

var walls = [],holes = [],cylinders = [],planes = [],curveds = [],spheres = [];

function buildTerrain(){
	buildPlane();
	buildWalls();
	buildholes();
	buildCylinder();
	buildSphere();
	//buildCurveds();
}
function buildPlane(){
  let plane;
  table = new THREE.Group();
  scene.add(table);
  table.updateMatrixWorld()
  
  /*
   var loader2 = new THREE.TextureLoader();
  loader2.setCrossOrigin('');
  var texture2 = loader2.load('https://i.imgur.com/AwpdGoQ.jpg');
  texture2.wrapS = THREE.RepeatWrapping;
  texture2.wrapT = THREE.RepeatWrapping;


  var floor = new THREE.Mesh(new THREE.PlaneGeometry(52, 52), new THREE.ShaderMaterial({
    uniforms: {
      tex: {
        type: 't',
        value: texture2
      },
    },
	side: THREE.DoubleSide,
    vertexShader:[
    "varying vec2 vUv;",
    "varying vec4 wpos;",
    "void main() {",
		"wpos = modelMatrix * vec4(position,1.0);",
        "vec4 epos = viewMatrix * wpos;",
        "gl_Position = projectionMatrix * epos; " ,     
    "}"
	].join("\n"),
    fragmentShader:[
	"uniform sampler2D tex;",
    "varying vec2 vUv;",
    "varying vec4 wpos;",
    "void main(){",
    "    vec2 vUv = vec2(wpos.z, wpos.x);",
    "    vUv = vUv*0.05;",
    "     vec4 rgb = texture2D (tex, vUv);",
    "     gl_FragColor = rgb;",
    "}"
	].join("\n")
  }));
  
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0.02;
  floor.position.z = -5;
  floor.receiveShadow = true;

  plane = new FinitePlane(new THREE.Vector3(0, 0, ballR), new THREE.Vector3(0, 0, 1), floor, 50 * 1.5, table);
  plane.update()
  planes.push(plane);
  */
  var loader2 = new THREE.TextureLoader();
  loader2.setCrossOrigin ('');
  var texture2 = loader2.load ('https://i.imgur.com/AwpdGoQ.jpg');
  var floor = new THREE.Mesh(new THREE.PlaneGeometry(50,50),new THREE.MeshPhongMaterial({map: texture2,side:THREE.DoubleSide}));
  floor.rotation.x = -Math.PI / 2;
  floor.rotation.z = -Math.PI / 2;
  floor.position.y = 0;
  floor.position.z = -5;
  floor.material.map.repeat.set( 3, 3 );
  floor.material.map.wrapS = THREE.RepeatWrapping;
  floor.material.map.wrapT = THREE.RepeatWrapping;
  floor.receiveShadow = true;
  
  plane = new FinitePlane(new THREE.Vector3(0, 0, ballR), new THREE.Vector3(0, 0, 1), floor, 50 * 1.5, table);
  plane.update()
  planes.push(plane);
  
  var color = new THREE.Color();
  color.setHSL(1,0,0.8);
  var circle1 = new THREE.Mesh(new THREE.CircleGeometry(1,32),new THREE.MeshPhongMaterial());
  circle1.position.set(-15,0.05,0);
  circle1.rotation.x = -Math.PI / 2;
  circle1.material.color.copy(color)
  circle1.receiveShadow = true;
  
  var circle2 = new THREE.Mesh(new THREE.CircleGeometry(1,32),new THREE.MeshPhongMaterial());
  circle2.position.set(15,0.05,0);
  circle2.rotation.x = -Math.PI / 2;
  circle2.material.color.copy(color)
  circle2.receiveShadow = true;
  
  var color2 = new THREE.Color();
  color2.setHSL(1,0,0.8);
  
  var circle3 = new THREE.Mesh(new THREE.BoxGeometry(20,0.01,20),new THREE.MeshPhongMaterial({transparent: true,opacity:0.1}));
  circle3.position.set(0,0.05,10);
  //circle3.rotation.x = -Math.PI / 2;
  circle3.material.color.copy(color2)
  circle3.receiveShadow = true;
  
  
  
  scene.add(circle1,circle2,circle3);
  
  let meshMaterial = new THREE.ShaderMaterial({
    uniforms: {
      tex: {
        type: 't',
        value: texture2
      },
      radius: {
        type: 'f',
        value: 2.576
      },
      hole: {
          type: 'v3',
        value: new THREE.Vector3() // default hole at (0,0,0)
      }
    },
    vertexShader:[
	  "varying vec4 wpos;",
	  "varying vec2 vUv;",
	  "void main() {",
		"vUv = uv;",
		"wpos = modelMatrix * vec4(position,1.0);",
			"vec4 epos = viewMatrix * wpos;",
			"gl_Position = projectionMatrix * epos; ",       
	  "}"
	].join("\n"),
    fragmentShader:[
	  "varying vec4 wpos;",
	  "varying vec2 vUv;",
	  "uniform vec3 hole;",
	  "uniform float radius;",
	  "uniform sampler2D tex;",
	  "void main() {",
			"vec2 vUv = vec2(wpos.z, wpos.x);",
			"vUv = vUv*0.05;",
			" vec4 rgb = texture2D (tex, vUv);",
		 "if (distance (hole,wpos.xyz) < radius)",
			"discard;",
		 "else",
			 "gl_FragColor = rgb;",
	 "}"
	].join("\n")
  });
  floor4 = new THREE.Mesh(new THREE.PlaneGeometry(50, 50),meshMaterial);
  floor4.rotation.x = -Math.PI / 2;
  floor4.position.set(0,0,-55)
  floor4.receiveShadow = true;
  
  plane = new FinitePlane(new THREE.Vector3(0, 0, ballR), new THREE.Vector3(0, 0, 1),floor4, 50 * 1.5, table);
  plane.update()
  planes.push(plane);

}
function buildWalls(){
  for (var i = 0; i < 4; i++) {
    if (i < 2) {
      let x = new Wall(100, new THREE.Vector3(0, 0, -1));
      x.update();
      walls.push(x);
    }
	else {
      let x = new Wall(50, new THREE.Vector3(0, 0, -1));
      x.update();
      walls.push(x);
    }
  }
  
  walls[0].mesh.rotation.y = -Math.PI / 2;
  walls[1].mesh.rotation.y = Math.PI / 2;
  //walls[2].mesh.rotation.y = Math.PI / 2;
  walls[3].mesh.rotation.y = Math.PI;

  walls[0].mesh.position.set(-25, 2.5, -30)
  walls[1].mesh.position.set(25, 2.5, -30)
  walls[2].mesh.position.set(0, 2.5, 20)
  walls[3].mesh.position.set(0, 2.5, -80)

}
function buildholes(){
	
	var meshFunc2 = function(u0,v0,pos){
	const radius = 2.52
	const tube = 1
	const degree = Math.PI * 2;
	const tune = 1;
	
	var x = (radius - tube * Math.cos(v0 * degree /tune)) * Math.cos(u0 * degree);
	var y = (radius - tube * Math.cos(v0 * degree /tune)) * Math.sin(u0 * degree);
	var z = tube * Math.sin(v0 * degree /tune)
	
	pos.set(x,y,z);
    }
  
	var geometry2 = new ParametricGeometry(meshFunc2, 64, 64);
    var material = new THREE.MeshNormalMaterial({
    wireframe: false,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5
    });
	var inMeshFunc2 = function(pos){
	const R = 2.52;
	const r = 1;
	var x = pos.x;
	var y = pos.y;
	var z = pos.z;
	return (x * x + y * y + z * z + R * R - r * r) * (x * x + y * y + z * z + R * R - r * r) - 4 * R * R * (x * x + y * y)
    }
	var meshDifFunc2 = function(pos){
  	const R = 2.52;
	const r = 1;
	var x = pos.x;
	var y = pos.y;
	var z = pos.z;
	var dx = 4 * x * (x * x + y * y + z * z - R * R - r * r);
	var dy = 4 * y * (x * x + y * y + z * z - R * R - r * r);
	var dz = 4 * z * (x * x + y * y + z * z + R * R - r * r);
	return new THREE.Vector3(dx,dz,-dy);
  }
	let mesh2 = new THREE.Mesh(geometry2, material);
	scene.add(mesh2);
	mesh2.meshFunc = meshFunc2;
    mesh2.inMeshFunc = inMeshFunc2;
    mesh2.meshDifFunc = meshDifFunc2;
    mesh2.rotation.x = -Math.PI/2
    mesh2.position.set(10,-0.2,-60);
    mesh2.ID = "hole";
	mesh2.visible = false
	holes.push(mesh2)

	var ballhole = new THREE.Group();
	const geometry4 = new THREE.CylinderGeometry( 2.576, 2.576, 6, 32,1,true);
	var material = new THREE.MeshPhongMaterial( {color: 0x888888,side:THREE.DoubleSide}); 
	var cylinder = new THREE.Mesh( geometry4, material );
	cylinder.castShadow = true;
	cylinder.receiveShadow = true;
	cylinder.position.y = -3;
	ballhole.add(cylinder);
	const geometry = new THREE.CylinderGeometry( 2.576, 2.576, 0, 32 );
	var material2 = new THREE.MeshPhongMaterial( {color: 0x000000,side:THREE.DoubleSide}); 
	const block = new THREE.Mesh( geometry, material2);
	ballhole.add(block);
	block.position.y=-6;
	scene.add(ballhole);
	ballhole.position.set(10,0,-60);
    
}
function buildCylinder(){
	
	renderer.autoClear = false;
	const localPlane = new THREE.Plane(new THREE.Vector3(0, 1 ,0), 0.0);
	/*
	var cylinder = new THREE.Mesh(new THREE.CylinderGeometry(20,20,50,64),new THREE.MeshPhongMaterial({color:0x9D9D9D,clippingPlanes: [localPlane]}));
	cylinder.R = 20;
	cylinder.height = 50;
	cylinder.rotation.x = Math.PI/2;
	cylinder.rotation.z = Math.PI/2;
	cylinder.position.z = -20;
	cylinder.position.y = -17;
	cylinder.ID = "floor"
	scene.add(cylinder)
	cylinders.push(cylinder);
	*/
	
	var cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	cylinder2.R = 1.5;
	cylinder2.height = 6
	cylinder2.position.set(25,3,20);
	cylinder2.ID = "wall"
	cylinder2.castShadow = true;
	scene.add(cylinder2)
	cylinders.push(cylinder2)

	var cylinder3 = new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	cylinder3.R = 1.5;
	cylinder3.height = 6
	cylinder3.position.set(-25,3,20);
	cylinder3.ID = "wall"
	cylinder3.castShadow = true;
	scene.add(cylinder3)
	cylinders.push(cylinder3)
	
	var cylinder4 = new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	cylinder4.R = 1.5;
	cylinder4.height = 6
	cylinder4.position.set(-25,3,-80);
	cylinder4.ID = "wall"
	cylinder4.castShadow = true;
	scene.add(cylinder4)
	cylinders.push(cylinder4)

	var cylinder5 = new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	cylinder5.R = 1.5;
	cylinder5.height = 6
	cylinder5.position.set(25,3,-80);
	cylinder5.ID = "wall"
	cylinder5.castShadow = true;
	scene.add(cylinder5)
	cylinders.push(cylinder5)
}
function buildSphere(){
	renderer.autoClear = false;
	const localPlane = new THREE.Plane(new THREE.Vector3(0, 1 ,0), 0.0);
	/*
	var sphere = new THREE.Mesh(new THREE.SphereGeometry(30,64),new THREE.MeshPhongMaterial({color:0x9D9D9D,clippingPlanes: [localPlane]}))
	sphere.R = 30
	sphere.position.set(0,-26,-55)
	sphere.ID = "floor"
	scene.add(sphere)
	spheres.push(sphere)
	
  var sphere2 = new THREE.Mesh(new THREE.SphereGeometry(30,64),new THREE.MeshPhongMaterial({color:0x9D9D9D,clippingPlanes: [localPlane]}))
	sphere2.R = 30
	sphere2.position.set(80,-26,-70)
	sphere2.ID = "floor"
	scene.add(sphere2)
	spheres.push(sphere2)
	*/
	
}
function buildCurveds(){
	var meshFunc = function(u0, v0, pos) {
    let x = u0 * 30
    let z = v0 * 30
    let y = Math.sin(Math.PI * u0) * 5
    pos.set(x, y, z)

  };
  var geometry = new ParametricGeometry(meshFunc, 128, 128);
  var material = new THREE.MeshNormalMaterial({
    wireframe: false,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5
  });
  var inMeshFunc = function(x, z) {
    var u0 = x / 30;
    var v0 = z / 30;

    var ans = [u0, v0]
    return ans;
  }
  let mesh = new THREE.Mesh(geometry, material);

  //mesh.rotation.y = Math.PI /2
  mesh.position.set(25, 0, -80);
  scene.add(mesh);
  mesh.squareSize = 10;
  mesh.meshFunc = meshFunc;
  mesh.inMeshFunc = inMeshFunc;
  curveds.push(mesh)
}
export {buildTerrain,table,planes,walls,cylinders,holes,curveds,spheres,floor4}