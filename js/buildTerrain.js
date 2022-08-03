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
   var loader2 = new THREE.TextureLoader();
  loader2.setCrossOrigin('');
  var texture2 = loader2.load('http://i.imgur.com/SPnvFvY.jpg');
  texture2.wrapS = THREE.RepeatWrapping;
  texture2.wrapT = THREE.RepeatWrapping;

  let plane;
  table = new THREE.Group();
  scene.add(table);
  table.updateMatrixWorld()

  var floor = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), new THREE.ShaderMaterial({
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

  plane = new FinitePlane(new THREE.Vector3(0, 0, ballR), new THREE.Vector3(0, 0, 1), floor, 50 * 1.5, table);
  plane.update()
  planes.push(plane);

  var floor2 = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), new THREE.ShaderMaterial({
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
        "gl_Position = projectionMatrix * epos;",     
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
  floor2.rotation.x = -Math.PI / 2;
  floor2.position.y = -0.02
  floor2.position.z = -55;

  plane = new FinitePlane(new THREE.Vector3(0, 0, ballR), new THREE.Vector3(0, 0, 1), floor2, 50 * 1.5, table);
  plane.update()
  planes.push(plane);

  var floor3 = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), new THREE.ShaderMaterial({
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
        "gl_Position = projectionMatrix * epos;  " ,     
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
  floor3.rotation.x = -Math.PI / 2;
  floor3.position.x = 80;
  floor3.position.y = 0.02;
  floor3.position.z = -75;

  plane = new FinitePlane(new THREE.Vector3(0, 0, ballR), new THREE.Vector3(0, 0, 1), floor3, 50 * 1.5, table);
  plane.update()
  planes.push(plane);


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
        "gl_Position = projectionMatrix * epos;",    
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
		"vec4 rgb = texture2D (tex, vUv);",
		 "if (distance (hole,wpos.xyz) < radius)",
			"discard;",
		" else",
			"gl_FragColor = rgb;",
	 "}"
 ].join("\n")
  });
    floor4 = new THREE.Mesh(new THREE.PlaneGeometry(50, 50),meshMaterial);
  floor4.rotation.x = -Math.PI / 2;
  floor4.position.x = 80;
  floor4.position.y = -0.02
  floor4.position.z = -125;
  plane = new FinitePlane(new THREE.Vector3(0, 0, ballR), new THREE.Vector3(0, 0, 1),floor4, 50 * 1.5, table);
  plane.update()
  planes.push(plane);
	var floor5 = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), new THREE.ShaderMaterial({
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
        "gl_Position = projectionMatrix * epos;  " ,     
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
  floor5.rotation.x = -Math.PI / 2;
  floor5.position.x = 40;
  floor5.position.y = 0.01;
  floor5.position.z = -65;

  plane = new FinitePlane(new THREE.Vector3(0, 0, ballR), new THREE.Vector3(0, 0, 1), floor5, 30 * 1.5, table);
  plane.update()
  planes.push(plane);  

  let loader3 = new THREE.TextureLoader();
  loader3.crossOrigin = '';
  let alpha = loader3.load('http://i.imgur.com/OHYewsU.png');

  var hole = new THREE.Mesh(new THREE.PlaneGeometry(2.576, 2.576),
    new THREE.MeshPhongMaterial({
      map: texture2,
      side: THREE.DoubleSide,
      alphaMap: alpha,
      alphaTest: 0.5,
    }));
  hole.rotation.x = -Math.PI / 2;
  hole.position.z = -51.28;
  hole.position.x = 10;
  scene.add(hole);
  plane.receiveShadow = true;
}
function buildWalls(){
  for (var i = 0; i < 8; i++) {
    if (i < 2) {
      let x = new Wall(100, new THREE.Vector3(0, 0, -1));
      x.update();
      walls.push(x);
    } else if (i >= 2 && i < 4) {
      let x = new Wall(70, new THREE.Vector3(0, 0, -1));
      x.update();
      walls.push(x);

    } else if (i >= 4 && i < 6) {
      let x = new Wall(80, new THREE.Vector3(0, 0, -1));
      x.update();
      walls.push(x);
    } else {
      let x = new Wall(50, new THREE.Vector3(0, 0, -1));
      x.update();
      walls.push(x);

    }
  }
  walls[0].mesh.rotation.y = -Math.PI / 2;
  walls[1].mesh.rotation.y = Math.PI / 2;
  walls[2].mesh.rotation.y = Math.PI / 2;
  walls[3].mesh.rotation.y = -Math.PI / 2;

  walls[4].mesh.rotation.y = Math.PI;

  walls[6].mesh.rotation.y = Math.PI;

  walls[0].mesh.position.set(-25, 2.5, -30)
  walls[1].mesh.position.set(105, 2.5, -100)
  walls[2].mesh.position.set(25, 2.5, -15)
  walls[3].mesh.position.set(55, 2.5, -115)
  walls[4].mesh.position.set(15, 2.5, -80)
  walls[5].mesh.position.set(65, 2.5, -50)
  walls[6].mesh.position.set(80, 2.5, -150)
  walls[7].mesh.position.set(0, 2.5, 20)
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
    mesh2.position.set(79.9,-0.2,-129.8);
    mesh2.ID = "hole";
	mesh2.visible = false
	holes.push(mesh2)
}
function buildCylinder(){
	
	renderer.autoClear = false;
	const localPlane = new THREE.Plane(new THREE.Vector3(0, 1 ,0), 0.0);
	
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
	
	var cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	cylinder2.R = 1.5;
	cylinder2.height = 6
	cylinder2.position.set(25,3,-50);
	cylinder2.ID = "wall"
	scene.add(cylinder2)
	cylinders.push(cylinder2)

	var cylinder3 = new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	cylinder3.R = 1.5;
	cylinder3.height = 6
	cylinder3.position.set(55,3,-80);
	cylinder3.ID = "wall"
	scene.add(cylinder3)
	cylinders.push(cylinder3)
}
function buildSphere(){
	renderer.autoClear = false;
	const localPlane = new THREE.Plane(new THREE.Vector3(0, 1 ,0), 0.0);
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