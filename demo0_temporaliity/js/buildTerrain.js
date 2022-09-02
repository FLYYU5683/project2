import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {ParametricGeometry} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/geometries/ParametricGeometry.js';
import {FinitePlane,Wall} from './terrain.js'
import {scene,renderer} from './render.js'
var table,floor5;

var pickables = [];
var walls = [],holes = [],cylinders = [],planes = [],floors = [];
var obstacle1=new THREE.Group();
var obstacle2=new THREE.Group();
var obstacle3=new THREE.Group();

function buildTerrain(){
	buildPlane();
	buildWalls();
	buildholes();
	buildCylinder();
	buildfloors();
}
function buildPlane(){
  let plane;
  table = new THREE.Group();
  scene.add(table);
  table.updateMatrixWorld()
  
  
  var loader2 = new THREE.TextureLoader();
  loader2.setCrossOrigin('');
  var texture = loader2.load('https://i.imgur.com/AwpdGoQ.jpg');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
 
  var floor = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), new THREE.MeshPhongMaterial({map: texture,side:THREE.DoubleSide}));
  floor.material.map.repeat.set( 3, 3 );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0.02;
  floor.position.z = -5;
  floor.receiveShadow = true;

  plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), floor, 50 * 1.5, table);
  plane.update()
  planes.push(plane);
  
  var color2 = new THREE.Color();
  color2.setHSL(1,0,0.8);
  
  var box1 = new THREE.Mesh(new THREE.BoxGeometry(5,0.01,5),new THREE.MeshPhongMaterial({transparent: true,opacity:0.1}));
  box1.position.set(0,0.2,10);
  box1.material.color.copy(color2)
  box1.receiveShadow = true;

  var box2 = new THREE.Mesh(new THREE.BoxGeometry(10,0.01,10),new THREE.MeshPhongMaterial({transparent: true,opacity:0.1}));
  box2.position.set(80,0.3,-125);
  box2.material.color.copy(color2)
  box2.receiveShadow = true;

  
  
  scene.add(box1,box2);

	var texture2 = loader2.load('https://i.imgur.com/AwpdGoQ.jpg');
	texture2.wrapS = THREE.RepeatWrapping;
	texture2.wrapT = THREE.RepeatWrapping;
      
	let loader3 = new THREE.TextureLoader();
	loader3.crossOrigin = '';
	var alpha = loader3.load('https://i.imgur.com/2Wwb27p.png');

	var hole= new THREE.Mesh(new THREE.PlaneGeometry(50,50),new THREE.MeshPhongMaterial({map: texture2,side:THREE.DoubleSide,alphaMap:alpha,alphaTest: 0.1,}));
	hole.rotation.x=-Math.PI/2;  
	hole.position.set(0,0,-55);
	hole.rotation.z = Math.PI ;
	hole.material.map.repeat.set(3, 3);
	hole.receiveShadow = true;

  plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1),hole, 50 * 1.5, table);
  plane.update()
  planes.push(plane);
  pickables.push(box1,box2,floor,hole)
  
  
  
}
function buildWalls(){
  for (var i = 0; i < 4; i++) {
    if (i < 2) {
      let x = new Wall(100,5, new THREE.Vector3(0, 0, -1));
      x.update();
      walls.push(x);
    }
	else {
      let x = new Wall(50,5, new THREE.Vector3(0, 0, -1));
      x.update();
      walls.push(x);
    }
  }
  
  walls[0].mesh.rotation.y = -Math.PI / 2;
  walls[1].mesh.rotation.y = Math.PI / 2;
  walls[3].mesh.rotation.y = Math.PI;

  walls[0].mesh.position.set(-25, 2.5, -30)
  walls[1].mesh.position.set(25, 2.5, -30)
  walls[2].mesh.position.set(0, 2.5, 20)
  walls[3].mesh.position.set(0, 2.5, -80)
  walls[2].mesh.visible = false;
  
  for(var i = 0; i < 8; i++){
	  if(i < 6){
		let x = new Wall(50,5,new THREE.Vector3(0,0,-1));
		x.update();
		walls.push(x)
	  }
	  else{
		let x = new Wall(50,10,new THREE.Vector3(0,0,-1));
		x.update();
		walls.push(x)		  
	  }
  }
  walls[4].mesh.rotation.y = -Math.PI / 2;
  walls[5].mesh.rotation.y = -Math.PI / 2;
  walls[6].mesh.rotation.y = Math.PI / 2;
  walls[7].mesh.rotation.y = Math.PI;
  walls[8].mesh.rotation.y = Math.PI;
  
  walls[4].mesh.position.set(60,2.5,-125)
  walls[5].mesh.position.set(140,2.5,-205)
  walls[6].mesh.position.set(190,2.5,-205)
  walls[7].mesh.position.set(85,2.5,-100)
  walls[8].mesh.position.set(85,2.5,-150)
  walls[9].mesh.position.set(165,2.5,-230)

  walls[10].mesh.rotation.y = Math.PI / 2;
  walls[10].mesh.position.set(190,5,-125);
  walls[11].mesh.position.set(165,5,-100);
  for(var i = 0; i < 4; i++){
	  let x = new Wall(32,4,new THREE.Vector3(0,0,-1))
	  x.update();
	  x.mesh.visible = false;
	  walls.push(x);	  
  }
  walls[12].mesh.rotation.z = Math.PI/20;
  walls[13].mesh.rotation.z = -Math.PI/20;
  walls[14].mesh.rotation.z = -Math.PI/20;
  walls[15].mesh.rotation.z = Math.PI/20;
  
  walls[13].mesh.rotation.y = Math.PI;
  walls[14].mesh.rotation.y = Math.PI / 2;
  walls[15].mesh.rotation.y = -Math.PI / 2;
  
  walls[12].mesh.position.set(125,5.5,-100);
  walls[13].mesh.position.set(125,5.5,-150);
  walls[14].mesh.position.set(140,5.5,-165);
  walls[15].mesh.position.set(190,5.5,-165);
  
  //時間性關卡:抬升牆壁
  for(var i = 0; i < 3; i++){
	  if(i < 1){
		let x = new Wall(20,15,new THREE.Vector3(0,0,1));
		x.update();
		walls.push(x)
	  }
	  else{
	  let x = new Wall(13,15,new THREE.Vector3(0,0,1))
	  x.update();
	  walls.push(x);
	  }	  
  }
   //walls[16].mesh.rotation.y = -Math.PI / 2;
   //walls[17].mesh.rotation.y = -Math.PI / 2;
   //walls[18].mesh.rotation.y = -Math.PI / 2;
   walls[16].mesh.position.set(0, 3, -30)
   walls[17].mesh.position.set(16.5, -15, -30)
   walls[18].mesh.position.set(-16.5, -15, -30)
   
     
   for(var i = 0; i < 3; i++){
	  if(i ==0){
		let x = new Wall(20,2.5,new THREE.Vector3(0,0,1),1);
		x.update();
		walls.push(x)
	  }
      else{
        let x = new Wall(2.5,15,new THREE.Vector3(0,0,1),1);
		x.update();
		walls.push(x)
      }	   
  }
  walls[19].mesh.position.set(0, 10.5, -30)
  walls[19].mesh.rotation.x = -Math.PI / 2; 
  walls[20].mesh.position.set(10, 3, -30)
  walls[20].mesh.rotation.y = Math.PI / 2;
  walls[21].mesh.position.set(-10, 3, -30)
  walls[21].mesh.rotation.y = -Math.PI / 2;
  obstacle1.add(walls[16].mesh,walls[19].mesh,walls[20].mesh,walls[21].mesh); 
  scene.add(obstacle1);
  
  for(var i = 0; i < 6; i++){
	  if(i <2){
		let x = new Wall(13,2.5,new THREE.Vector3(0,0,1),1);
		x.update();
		walls.push(x)
	  }
      else{
        let x = new Wall(2.5,15,new THREE.Vector3(0,0,1),1);
		x.update();
		walls.push(x)
      }	   
  }
  walls[22].mesh.position.set(16.5, -7.5, -30)
  walls[22].mesh.rotation.x = -Math.PI / 2;
  walls[24].mesh.position.set(22.5, -15, -30)
  walls[24].mesh.rotation.y = Math.PI / 2;
  walls[25].mesh.position.set(10, -15, -30)
  walls[25].mesh.rotation.y = -Math.PI / 2;
  obstacle2.add(walls[17].mesh,walls[22].mesh,walls[24].mesh,walls[25].mesh); 
  scene.add(obstacle2);
  walls[23].mesh.position.set(-16.5, -7.5, -30)
  walls[23].mesh.rotation.x = -Math.PI / 2;
  walls[26].mesh.position.set(-10, -15, -30)
  walls[26].mesh.rotation.y = Math.PI / 2;
  walls[27].mesh.position.set(-22.5, -15, -30)
  walls[27].mesh.rotation.y = -Math.PI / 2;  
  obstacle3.add(walls[18].mesh,walls[23].mesh,walls[26].mesh,walls[27].mesh); 
  scene.add(obstacle3);
  
   
  
  

  const shape = new THREE.Shape();
  shape.moveTo( 0, 0 );
  shape.lineTo( 0, 5 );
  shape.lineTo( 30, 10 );
  shape.lineTo( 30, 0 );
  shape.lineTo( 0, 0 );
  
  const extrudeSettings = {
	steps: 10,
	depth: 2.4,
	bevelEnabled: true,
	bevelThickness: 0.2,
	bevelSize: 0,
	bevelOffset: 0,
	bevelSegments: 3
  };

	const lineGeometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
	const lineMaterial = new THREE.MeshPhongMaterial({
		  color: 0xA23400,
		  shininess: 200,
		  transparent: true,
		  opacity: 1
		});
		
	const lineMesh = new THREE.Mesh( lineGeometry, lineMaterial ) ;
	lineMesh.position.set(110,0,-101.25)
	
	const lineGeometry2 = new THREE.ExtrudeGeometry( shape, extrudeSettings );
	const lineMesh2 = new THREE.Mesh( lineGeometry2, lineMaterial ) ;
	lineMesh2.position.set(110,0,-151.25)

	const lineGeometry3 = new THREE.ExtrudeGeometry( shape, extrudeSettings );
	const lineMesh3 = new THREE.Mesh( lineGeometry3, lineMaterial ) ;
	lineMesh3.rotation.y = -Math.PI / 2;
	lineMesh3.position.set(141.25,0,-180)
	
	const lineGeometry4 = new THREE.ExtrudeGeometry( shape, extrudeSettings );
	const lineMesh4 = new THREE.Mesh( lineGeometry4, lineMaterial );
	lineMesh4.rotation.y = -Math.PI / 2;
	lineMesh4.position.set(191.25,0,-180)

	scene.add( lineMesh,lineMesh2,lineMesh3,lineMesh4); 
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
    mesh2.position.set(0,-0.205,0);
    mesh2.ID = "hole";
	mesh2.level = 1
	mesh2.visible = false
	var ballhole = new THREE.Group();
	ballhole.add(mesh2);
	holes.push(mesh2)

	const geometry4 = new THREE.CylinderGeometry( 2.576, 2.576, 6, 32,1,true);
	var material = new THREE.MeshPhongMaterial( {color: 0x888888,side:THREE.DoubleSide}); 
	var cylinder = new THREE.Mesh( geometry4, material );
	cylinder.castShadow = true;
	cylinder.receiveShadow = true;
	cylinder.position.y = -3;
	cylinder.ID = "wall";
	cylinder.r = 2.576;
	cylinder.height = 6;
	holes.push(cylinder);
	
	ballhole.add(cylinder);
	
	const geometry = new THREE.CylinderGeometry( 2.576, 2.576, 0.01, 32 );
	var material2 = new THREE.MeshPhongMaterial( {color: 0x000000,side:THREE.DoubleSide}); 
	const block = new THREE.Mesh( geometry, material2);
	
	block.position.y=-6;
	block.ID = "bottom";
	block.r = 2.576
	block.normal = new THREE.Vector3(0,1,0);
	holes.push(block)
	ballhole.add(block)
	scene.add(ballhole);
	ballhole.position.set(11.6,0,-66.3);

	let mesh3 = new THREE.Mesh(geometry2, material);
	scene.add(mesh3);
	mesh3.meshFunc = meshFunc2;
    mesh3.inMeshFunc = inMeshFunc2;
    mesh3.meshDifFunc = meshDifFunc2;
    mesh3.rotation.x = -Math.PI/2
    mesh3.position.set(165,-0.205,-215);
    mesh3.ID = "hole";
	mesh3.level = 2;
	mesh3.visible = false
	holes.push(mesh3)

	var ballhole2 = new THREE.Group();

	var cylinder2 = new THREE.Mesh( geometry4, material );
	cylinder2.castShadow = true;
	cylinder2.receiveShadow = true;
	cylinder2.position.y = -3;
	cylinder2.ID = "wall";
	cylinder2.r = 2.576;
	cylinder2.height = 6;
	holes.push(cylinder2);
	
	ballhole2.add(cylinder2);
	
	const block2 = new THREE.Mesh( geometry, material2);
	
	block2.position.y=-6;
	block2.ID = "bottom";
	block2.r = 2.576
	block2.normal = new THREE.Vector3(0,1,0);
	holes.push(block2)
	ballhole2.add(block2)
	scene.add(ballhole2);
	ballhole2.position.set(165,0,-215);    
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
	
	var class11 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class11.R = 2;
	class11.height = 6
	class11.position.set(25,3,20);
	class11.ID = "wall"
	class11.castShadow = true;
	scene.add(class11)
	cylinders.push(class11)

	var class12 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class12.R = 2;
	class12.height = 6
	class12.position.set(-25,3,20);
	class12.ID = "wall"
	class12.castShadow = true;
	scene.add(class12)
	cylinders.push(class12)
	
	var class13 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class13.R = 2;
	class13.height = 6
	class13.position.set(-25,3,-80);
	class13.ID = "wall"
	class13.castShadow = true;
	scene.add(class13)
	cylinders.push(class13)
	
	var class14 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class14.R = 2;
	class14.height = 6
	class14.position.set(25,3,-80);
	class14.ID = "wall"
	class14.castShadow = true;
	scene.add(class14)
	cylinders.push(class14)
	
	var class21 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class21.R = 2;
	class21.height = 6
	class21.position.set(60,3,-150);
	class21.ID = "wall"
	class21.castShadow = true;
	scene.add(class21)
	cylinders.push(class21)
	
	var class22 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class22.R = 2;
	class22.height = 6
	class22.position.set(60,3,-100);
	class22.ID = "wall"
	class22.castShadow = true;
	scene.add(class22)
	cylinders.push(class22)
	
	var class23 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class23.R = 2;
	class23.height = 6
	class23.position.set(140,3,-230);
	class23.ID = "wall"
	class23.castShadow = true;
	scene.add(class23)
	cylinders.push(class23)
	
	var class24 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class24.R = 2;
	class24.height = 6
	class24.position.set(190,3,-230);
	class24.ID = "wall"
	class24.castShadow = true;
	scene.add(class24)
	cylinders.push(class24)
	
	var class25 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,11,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class25.R = 2;
	class25.height = 11
	class25.position.set(140,5.5,-150);
	class25.ID = "wall"
	class25.castShadow = true;
	scene.add(class25)
	cylinders.push(class25)
	
	var class26 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,11,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class26.R = 2;
	class26.height = 11
	class26.position.set(190,5.5,-100);
	class26.ID = "wall"
	class26.castShadow = true;
	scene.add(class26)
	cylinders.push(class26)

	var class27 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,7,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class27.R = 2;
	class27.height = 7
	class27.position.set(110,3.5,-100)
	class27.ID = "wall"
	class27.castShadow = true;
	scene.add(class27)
	cylinders.push(class27)

	var class28 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,7,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class28.R = 2;
	class28.height = 7
	class28.position.set(110,3.5,-150)
	class28.ID = "wall"
	class28.castShadow = true;
	scene.add(class28)
	cylinders.push(class28)

	var class29 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,7,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class29.R = 2;
	class29.height = 7
	class29.position.set(140,3.5,-180)
	class29.ID = "wall"
	class29.castShadow = true;
	scene.add(class29)
	cylinders.push(class29)

	var class211 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,7,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class211.R = 2;
	class211.height = 7
	class211.position.set(190,3.5,-180)
	class211.ID = "wall"
	class211.castShadow = true;
	scene.add(class211)
	cylinders.push(class211)

	var class212 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,11,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class212.R = 2;
	class212.height = 11
	class212.position.set(140,5.5,-100);
	class212.ID = "wall"
	class212.castShadow = true;
	scene.add(class212)
	cylinders.push(class212)

	var class213 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,11,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class213.R = 2;
	class213.height = 8
	class213.position.set(190,5.5,-150);
	class213.ID = "wall"
	class213.castShadow = true;
	scene.add(class213)
	cylinders.push(class213)
	
}
function buildfloors(){
	var heightFunc = function(x,z) {
	  let K = 5;
	  let a = 165;
	  let aa = 190;
	  let aaa = 140;
	  let b = -125;
	  let bb = -100;
	  let bbb = -150;
	  let w = 30;
	  return 1 * Math.exp(
		-(x - a) * (x - a) / w / w - (z - b) * (z - b) / w / w)
			+ K * Math.exp(
		-(x - aa) * (x - aa) / w / w - (z - bb) * (z - bb) / w / w)
		    +  K * Math.exp(
		-(x - aaa) * (x - aaa) / w / w - (z - bbb) * (z - bbb) / w / w)
		+  K * Math.exp(
		-(x - aaa) * (x - aaa) / w / w - (z - bb) * (z - bb) / w / w)
		+  K * Math.exp(
		-(x - aa) * (x - aa) / w / w - (z - bbb) * (z - bbb) / w / w)
	}
	var inHeightFunc = function(x,z){
		let K = 5;
		let a = 165;
		let aa = 190;
		let aaa = 140;
		let b = -125;
		let bb = -100;
		let bbb = -150;
		let w = 30;
		return [- 1 * Math.exp(
		-(x - a) * (x - a) / w / w - (z - b) * (z - b) / w / w) * (-2 * ((x - a) / w) / w ) + - K * Math.exp(
		-(x - aa) * (x - aa) / w / w - (z - bb) * (z - bb) / w / w) * (-2 * ((x - aa) / w) / w ) + - K * Math.exp(
		-(x - aaa) * (x - aaa) / w / w - (z - bbb) * (z - bbb) / w / w) * (-2 * ((x - aaa) / w) / w ) + - K * Math.exp(
		-(x - aaa) * (x - aaa) / w / w - (z - bb) * (z - bb) / w / w) * (-2 * ((x - aaa) / w) / w ) + - K * Math.exp(
		-(x - aa) * (x - aa) / w / w - (z - bbb) * (z - bbb) / w / w) * (-2 * ((x - aa) / w) / w ) ,-K * Math.exp(
		-(x - a) * (x - a) / w / w - (z - b) * (z - b) / w / w) * (-2 * ((z - b) / w) / w ) + - K * Math.exp(
		-(x - aa) * (x - aa) / w / w - (z - bb) * (z - bb) / w / w) * (-2 * ((z - bb) / w) / w ) + - K * Math.exp(
		-(x - aaa) * (x - aaa) / w / w - (z - bbb) * (z - bbb) / w / w) * (-2 * ((z - bbb) / w) / w )+ - K * Math.exp(
		-(x - aaa) * (x - aaa) / w / w - (z - bb) * (z - bb) / w / w) * (-2 * ((z - bb) / w) / w )+ - K * Math.exp(
		-(x - aa) * (x - aa) / w / w - (z - bbb) * (z - bbb) / w / w) * (-2 * ((z - bbb) / w) / w ) ]
	}
	
	var geometry = new ParametricGeometry(function(u0, v0, pos) {
		let x = 60 + 130 * u0;
		let z = -150 + 50 * v0;
		pos.set(x, heightFunc(x, z), z);
	}, 40, 40);
	
	var loader2 = new THREE.TextureLoader();
	loader2.setCrossOrigin('');
	var texture = loader2.load('https://i.imgur.com/AwpdGoQ.jpg');
	
	texture.wrapS = THREE.RepeatWrapping;
	texture.wrapT = THREE.RepeatWrapping;
	
	var texture2 = loader2.load('https://i.imgur.com/AwpdGoQ.jpg');
	
	texture2.wrapS = THREE.RepeatWrapping;
	texture2.wrapT = THREE.RepeatWrapping;
	
	var material = new THREE.MeshPhongMaterial({map: texture,side:THREE.DoubleSide});

	var convertUV = function(x,z){
		return [(x - 60) / 130,(z + 150) / 50]
	}
	
	var mesh = new THREE.Mesh(geometry, material);
	mesh.y = -20
	mesh.heightFunc = heightFunc;
	mesh.inHeightFunc = inHeightFunc;
	mesh.convertUV = convertUV;
	mesh.material.map.repeat.set( 4, 4 );
	mesh.receiveShadow = true;
	
	
	var geometry2 = new ParametricGeometry(function(u0, v0, pos) {
		let x = 140 + 50 * u0;
		let z = -230 + 80 * v0;
		pos.set(x, heightFunc(x, z), z);
	}, 40, 40);
	var convertUV2 = function(x,z){
		return [(x - 140) / 50,(z + 230) / 80]
	}

	var texture2 = loader2.load('https://i.imgur.com/AwpdGoQ.jpg');
	texture2.wrapS = THREE.RepeatWrapping;
	texture2.wrapT = THREE.RepeatWrapping;
	
	floor5 = new THREE.Mesh(geometry2, new THREE.MeshPhongMaterial({map: texture2,side:THREE.DoubleSide}));
	
	floor5.material.map.repeat.set( 4, 4 );
	floor5.receiveShadow = true;
	floor5.y = 0;
	floor5.heightFunc = heightFunc;
	floor5.inHeightFunc = inHeightFunc;
	floor5.convertUV = convertUV2;
	
	floors.push(mesh,floor5)
	scene.add(mesh,floor5)
}
export {buildTerrain,table,planes,walls,cylinders,holes,floor5,floors,pickables,obstacle1,obstacle2,obstacle3}