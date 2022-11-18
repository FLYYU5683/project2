import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {createMultiMaterialObject} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/utils/SceneUtils.js';
import {ParametricGeometry} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/geometries/ParametricGeometry.js';
import {FinitePlane,Wall} from './terrain.js'
import {scene,sceneMap,renderer} from './render.js'
import {class2g} from './main.js'
var bigTable = new THREE.Group(),table1,table2,table3;

var walls = [],holes = [],cylinders = [],planes = [],floors = [],arcWalls = [];

var level1Walls = [] , level2Walls = [] ,level3Walls = []

var class1 = new THREE.Group(),class1Rotate = new THREE.Group();
var class2 = new THREE.Group(),class2Rotate = new THREE.Group();
var class3 = new THREE.Group(),class3Rotate = new THREE.Group();

var obstacle1=new THREE.Group();
var obstacle2=new THREE.Group();
var obstacle3=new THREE.Group();
var car,car2,redhorse2G;
var boxg = new THREE.Group()
var fang = new THREE.Group()
var steveg= new THREE.Group();
var wall49;

var quad_uvs =
[
0.4, 0.0,
1.0, 0.0,
1.0, 1.0,
0.0, 1.0
];

let arcWallGroup3;
function buildTerrain(){
	buildPlane();
	buildWalls();
	buildholes();
	buildPillar();
	buildfloors();
	buildStoneWall();
	buildArcWalls();
	
	buildGoal()
	
	bulidMiniWorld()
	
	walls.push(level1Walls,level2Walls,level3Walls)
	
	class1.position.z = 30;
	class1Rotate.add(class1.clone())
	class1.add(bigTable)
	scene.add(class1)
	class1.position.z = 90;
	cylinders.class1Pos = new THREE.Vector3(0,0,90)
	cylinders.y1 = 0;
	
	class2.position.z = 300;
	class2Rotate.add(class2.clone())
	class2.add(bigTable)
	scene.add(class2)
	class2Rotate.scale.set(0.9,0.9,0.9)
	class2.position.z = 0;
	cylinders.class2Pos = new THREE.Vector3(0,0,0)
	cylinders.y2 = 0;
	
	//class3.position.set(0,-50,0);
	class3.rotation.x = Math.PI/180 * 10;
	class3Rotate.add(class3.clone())
	class3.rotation.x =0;

	class3.add(bigTable)
	scene.add(class3);
	class3.position.set(300,0,-300);
	
	cylinders.class3Pos = new THREE.Vector3(400,0,-200)
	cylinders.y31 = 0;
	cylinders.y32 = 200;
	
	sceneMap.add(class1Rotate,class2Rotate,class3Rotate)
	
	class2Rotate.visible = false;
	class3Rotate.visible = false;
}
function buildStoneWall(){
	var stoneGeometry = new THREE.BoxGeometry(50,5,2.5);
	var stoneGeometry2 = new THREE.BoxGeometry(100,5,2.5);
	var loader = new THREE.TextureLoader();
	var texture = loader.load('https://i.imgur.com/euhOAfo.jpg');
	/*
	var stoneMaterial = new THREE.MeshPhongMaterial({
      map: texture,side:THREE.DoubleSide})
	*/
	var stoneMaterial = new THREE.MeshPhongMaterial({
      color: 0x8c8f8d,side:THREE.DoubleSide})
	var stoneWall1 = new THREE.Mesh(stoneGeometry2,stoneMaterial);
	stoneWall1.position.set(-25,-2.51,-30);
	stoneWall1.rotation.y = -Math.PI / 2;
	
	var stoneWall2 = new THREE.Mesh(stoneGeometry2,stoneMaterial);
	stoneWall2.position.set(75,-2.51,-30);
	stoneWall2.rotation.y = -Math.PI / 2;
	
	var stoneWall3 = new THREE.Mesh(stoneGeometry,stoneMaterial);
	stoneWall3.position.set(0,-2.51,20);
	
	var stoneWall4 = new THREE.Mesh(stoneGeometry,stoneMaterial);
	stoneWall4.position.set(50,-2.51,20);
	
	var arcStoneWall1 = new THREE.Mesh(new THREE.CylinderGeometry(51.25,51.25,5,32,32,true,Math.PI/2,Math.PI),stoneMaterial)
	arcStoneWall1.position.set(25,-2.5,-80)
	
	var arcStoneWall2 = new THREE.Mesh(new THREE.CylinderGeometry(48.75,48.75,5,32,32,true,Math.PI/2,Math.PI),stoneMaterial)
	arcStoneWall2.position.set(25,-2.5,-80)
	
	let mesh = new THREE.Mesh(new THREE.RingGeometry( 48.75, 51.25, 32,1,0,Math.PI),stoneMaterial);
	mesh.rotation.x = -Math.PI /2;
	mesh.position.set(25,0,-80)
	
	
	class1.add(stoneWall1,stoneWall2,stoneWall3,stoneWall4,arcStoneWall1,arcStoneWall2,mesh)
	//class2
	
	var stoneWall5 = new THREE.Mesh(stoneGeometry,stoneMaterial);
	scene.add(stoneWall5);
	stoneWall5.position.set(0,-2.51,-125);
	
	var stoneWall6 = new THREE.Mesh(stoneGeometry2,stoneMaterial);
	scene.add(stoneWall6);
	stoneWall6.position.set(-25,-2.51,-175);
	stoneWall6.rotation.y = -Math.PI / 2;
	
	var stoneWall7 = new THREE.Mesh(stoneGeometry2,stoneMaterial);
	scene.add(stoneWall7);
	stoneWall7.position.set(-25,-2.51,-275);
	stoneWall7.rotation.y = -Math.PI / 2;
	
	var stoneWall8 = new THREE.Mesh(stoneGeometry2,stoneMaterial);
	scene.add(stoneWall8);
	stoneWall8.position.set(25,-2.51,-175);
	stoneWall8.rotation.y = -Math.PI / 2;
	
	var stoneWall9 = new THREE.Mesh(stoneGeometry,stoneMaterial);
	scene.add(stoneWall9);
	stoneWall9.position.set(25,-2.51,-250);
	stoneWall9.rotation.y = -Math.PI / 2;
	
	var stoneWall10 = new THREE.Mesh(stoneGeometry2,stoneMaterial);
	scene.add(stoneWall10);
	stoneWall10.position.set(25,-2.51,-325);
	
	var stoneWall11 = new THREE.Mesh(stoneGeometry2,stoneMaterial);
	scene.add(stoneWall11);
	stoneWall11.position.set(125,-2.51,-325);
	
	var stoneWall12 = new THREE.Mesh(stoneGeometry2,stoneMaterial);
	scene.add(stoneWall12);
	stoneWall12.position.set(75,-2.51,-275);
	
	var stoneWall13 = new THREE.Mesh(stoneGeometry,stoneMaterial);
	scene.add(stoneWall13);
	stoneWall13.position.set(150,-2.51,-275);
	
	var stoneWall14 = new THREE.Mesh(stoneGeometry,stoneMaterial);
	scene.add(stoneWall14);
	stoneWall14.position.set(175,-2.51,-300);
	stoneWall14.rotation.y = -Math.PI / 2;
	
	class2.add(stoneWall5,stoneWall6,stoneWall7,stoneWall8,stoneWall9)
	class2.add(stoneWall10,stoneWall11,stoneWall12,stoneWall13,stoneWall14)
	
}
function buildPlane(){
  let plane;
  table1 = new THREE.Group();
  scene.add(table1);
  table1.updateMatrixWorld()
  
  
  var loader2 = new THREE.TextureLoader();
  loader2.setCrossOrigin('');
  //test light map
  
  //var textureTest1 = loader2.load('https://i.imgur.com/tuIeXbi.png');  
  //var textureTest1 = loader2.load('https://i.imgur.com/PnIgpqe.png'); 漸層 
  //var textureTest1 = loader2.load('https://i.imgur.com/D2mGAc6.png');  漸層黑底
  //var textureTest1 = loader2.load('https://i.imgur.com/L55ESsM.png');  //漸層透明黑底
  var textureTest1 = loader2.load('https://i.imgur.com/FTs5YQj.png');  //漸層透明黑底縮寬度
  
  
  let material1 = new THREE.MeshBasicMaterial({
        map: textureTest1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
  });
  let material2 = new THREE.MeshBasicMaterial({
        color: 0x006000,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1
  });
  let ground = new THREE.PlaneGeometry(50, 50)
  
  let floor = createMultiMaterialObject(ground, [material2, material1]);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0.02;
  floor.position.z = -5;
  floor.receiveShadow = true;

  plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), floor, 50 * 1.5, table1);
  plane.update()
  planes.push(plane); 
  
  var rloader = new THREE.TextureLoader();
  rloader.setCrossOrigin('');
  var rtexture = rloader.load('https://i.imgur.com/JRZtHnr.png');
  
  let rmaterial = new THREE.MeshBasicMaterial({
        map: rtexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
  });
  
  
  let floor2 = createMultiMaterialObject(ground, [material2, rmaterial]);
  
  floor2.rotation.x = -Math.PI / 2;
  floor2.position.set(0,0.02,-55)
  floor2.receiveShadow = true;

  plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), floor2, 50 * 1.5, table1);
  plane.update()
  planes.push(plane);
  
  var lloader = new THREE.TextureLoader();
  lloader.setCrossOrigin('');
  var ltexture = lloader.load('https://i.imgur.com/jpMeea3.png');
  
  let lmaterial = new THREE.MeshBasicMaterial({
        map: ltexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
  });

  
  let floor3 = createMultiMaterialObject(ground, [material2, lmaterial]);
  floor3.rotation.x = -Math.PI / 2;
  floor3.position.set(50,0.02,-55)
  floor3.receiveShadow = true;

  plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), floor3, 50 * 1.5, table1);
  plane.update()
  planes.push(plane);
  
  
  var cloader = new THREE.TextureLoader();
  cloader.setCrossOrigin('');
  //var ctexture = cloader.load('https://i.imgur.com/bPPAwPt.png'); 
  var ctexture = cloader.load('https://i.imgur.com/zIWgsTi.png');
  
  let cmaterial = new THREE.MeshBasicMaterial({
        map: ctexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
  });
  
  let circle = new THREE.CircleGeometry(50,32,0,Math.PI);
  let circleFloor = createMultiMaterialObject(circle, [material2, cmaterial]);
  circleFloor.rotation.x = -Math.PI / 2;
  circleFloor.position.set(25,0.01,-80);
  circleFloor.receiveShadow = true;

  plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), circleFloor, 100 , table1);
  plane.update()
  planes.push(plane);
  
  
  var color2 = new THREE.Color();
  color2.setHSL(1,0,0.8);
  
  var box1 = new THREE.Mesh(new THREE.BoxGeometry(5,0.01,5),new THREE.MeshPhongMaterial({transparent: true,opacity:0.1}));
  box1.position.set(0,0.2,10);
  box1.material.color.copy(color2)
  box1.receiveShadow = true;
  
	var texture2 = loader2.load('https://i.imgur.com/AwpdGoQ.jpg');
	texture2.wrapS = THREE.RepeatWrapping;
	texture2.wrapT = THREE.RepeatWrapping;
      
	let loader3 = new THREE.TextureLoader();
	loader3.crossOrigin = '';
	var alpha = loader2.load('https://i.imgur.com/d8LnKPK.png');
	var alphaFirst = loader2.load('https://i.imgur.com/4wunOkl.png');
	let materialForFirstHole = new THREE.MeshBasicMaterial({color: 0x006000,side:THREE.DoubleSide,alphaMap:alphaFirst,alphaTest: 0.5,})
	

	let materialForHole = new THREE.MeshBasicMaterial({color: 0x006000,side:THREE.DoubleSide,alphaMap:alpha,alphaTest: 0.5,})
    let hole = createMultiMaterialObject(ground, [materialForHole, material1]);
	//let hole = new THREE.Mesh(ground,materialForHole)
	hole.rotation.x=-Math.PI/2;  
	hole.rotation.z=-Math.PI;  
	hole.position.set(50,0,-5);
	hole.receiveShadow = true;

	plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1),hole, 50 * 1.5, table1);
	plane.update()
	planes.push(plane);
	 
	class1.add(table1,box1)
	
	//class2
	table2 = new THREE.Group();
	scene.add(table2);
	table2.updateMatrixWorld()
	
	var box2 = new THREE.Mesh(new THREE.BoxGeometry(5,0.01,5),new THREE.MeshBasicMaterial({transparent: true,opacity:0.1}));
	box2.position.set(0,0.2,-135);
	box2.material.color.copy(color2)
	box2.receiveShadow = true;
	scene.add(box2);

	//let hole2 = createMultiMaterialObject(ground, [materialForHole, material1]);
	let hole2 = new THREE.Mesh(ground,materialForHole)
    //var hole2= new THREE.Mesh(new THREE.PlaneGeometry(50,50),new THREE.MeshPhongMaterial({map: texture2,side:THREE.DoubleSide,alphaMap:alpha,alphaTest: 0.1,}));
	hole2.rotation.x=-Math.PI/2;  
	hole2.position.set(150,0,-300);
	hole2.rotation.z = Math.PI/2;
	hole2.receiveShadow = true;

	plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1),hole2, 50 * 1.5, table2);
	plane.update()
	planes.push(plane);
	
	class2.add(table2,box2)
	
	//class3
	/*
	table3 = new THREE.Group();
	scene.add(table3);
	table3.updateMatrixWorld()	
	
	let groundCircle = new THREE.CircleGeometry(22.5, 32,0,Math.PI/2)
	  
	let floor31 = new THREE.Mesh(groundCircle,material2);
	floor31.rotation.x = -Math.PI / 2;
	floor31.position.set(325,79.9,-223.75)
	floor31.receiveShadow = true;

	plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), floor31, 20, table3);
	plane.update()
	planes.push(plane);	
		
	let floor32 = new THREE.Mesh(new THREE.CircleGeometry(22.5,32,Math.PI/2,Math.PI/2),material2);
	floor32.rotation.x = -Math.PI / 2;
	floor32.rotation.z = Math.PI;
	floor32.position.set(325,79.9,-326.25)
	floor32.receiveShadow = true;

	plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), floor32, 20, table3);
	plane.update()
	planes.push(plane);	
		
	class3.add(table3);
	*/
	
	//big floor
	var loader2 = new THREE.TextureLoader();
    loader2.setCrossOrigin('');
    var textureFloor = loader2.load('https://i.imgur.com/AwpdGoQ.jpg');
    textureFloor.wrapS = THREE.RepeatWrapping;
    textureFloor.wrapT = THREE.RepeatWrapping;
	
	var bigfloor = new THREE.Mesh(new THREE.PlaneGeometry(5000,5000), new THREE.MeshPhongMaterial({map: textureFloor,side:THREE.DoubleSide}));
	bigfloor.material.map.repeat.set( 500, 500 );
	bigfloor.rotation.x = -Math.PI / 2;
	bigfloor.position.y = -5.5;
	bigfloor.receiveShadow = true;
	  
	plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), bigfloor, 150 * 1.5, bigTable);
	plane.update()
	planes.push(plane);
	
}
function buildWalls(){
  for (var i = 0; i < 4; i++) {
    if (i < 3) {
      let x = new Wall(100,5, new THREE.Vector3(0, 0, -1));
      x.update();
      level1Walls.push(x);
    }
	else {
      let x = new Wall(50,5, new THREE.Vector3(0, 0, -1));
      x.update();
      level1Walls.push(x);
    }
  }
  
  level1Walls[0].mesh.rotation.y = -Math.PI / 2;
  level1Walls[1].mesh.rotation.y = Math.PI / 2;
  level1Walls[2].mesh.rotation.y = -Math.PI / 2;
  level1Walls[3].mesh.rotation.y = Math.PI;

  level1Walls[0].mesh.position.set(-25, 2.5, -30)
  level1Walls[1].mesh.position.set(25, 2.5, -30)
  level1Walls[2].mesh.position.set(75, 2.5, -30)
  level1Walls[3].mesh.position.set(50, 2.5, 20)
  for(var i = 0; i < 4; i++)
	class1.add(level1Walls[i].mesh)

  //第二關
  
   for (var i = 0; i < 3; i++) {
    if (i < 2) {
      let x = new Wall(50,5, new THREE.Vector3(0, 0, -1));
      x.update();
      level2Walls.push(x);
    }
	else {
      let x = new Wall(200,5, new THREE.Vector3(0, 0, -1));
      x.update();
      level2Walls.push(x);
    }
  }
  level2Walls[1].mesh.rotation.y = -Math.PI / 2;
  level2Walls[2].mesh.rotation.y = -Math.PI / 2;

  level2Walls[0].mesh.position.set(0, 2.5, -125)
  level2Walls[1].mesh.position.set(175, 2.5, -300)
  level2Walls[2].mesh.position.set(-25, 2.5, -225)
  
  level2Walls[0].mesh.visible = false;
  
  
  let x = new Wall(200,5, new THREE.Vector3(0, 0, -1));
      x.update();
      level2Walls.push(x);
  level2Walls[3].mesh.position.set(75, 2.5, -325)
  
  
  x = new Wall(150,5, new THREE.Vector3(0, 0, -1));
  x.update();
  level2Walls.push(x);
  level2Walls[4].mesh.rotation.y = -Math.PI / 2;
  level2Walls[4].mesh.position.set(25, 2.5, -200)
  
  x = new Wall(150,5, new THREE.Vector3(0, 0, -1));
  x.update();
  level2Walls.push(x);
  level2Walls[5].mesh.position.set(100, 2.5, -275)
  

  //class2.add(obstacle1.clone(),obstacle2.clone(),obstacle3.clone(),car.clone(),car2.clone())
  for (var i = 0; i <= 5; i++)
	class2.add(level2Walls[i].mesh);

}
function buildClass3Wall(){
	let class3wall = [];
	
	for(var i=0;i<3;i++)
   {
      let x = new Wall(100,5, new THREE.Vector3(0, 0, -1));
      x.update();
      class3wall.push(x);
   }
   class3wall[0].mesh.rotation.y = -Math.PI / 2;
   
   class3wall[0].mesh.position.set(225, 82.5, -275);
   class3wall[1].mesh.position.set(275,82.5,-325);
   class3wall[2].mesh.position.set(275,82.5,-225);
   
   for(var i=0;i<6;i++)
   {
      let x = new Wall(200,5, new THREE.Vector3(0, 0, -1));
      x.update();
      class3wall.push(x);
   }
   
   class3wall[3].mesh.position.set(425, 82.5, -250);
   class3wall[4].mesh.position.set(425,82.5,-300);
   class3wall[5].mesh.position.set(425, 42.5, -250);
   class3wall[6].mesh.position.set(425,42.5,-200);
   class3wall[7].mesh.position.set(425, 42.5, -300);
   class3wall[8].mesh.position.set(425,42.5,-350);
   
	for(var i = 0; i <=8; i++)
	  class3.add(class3wall[i].mesh);
  
   return class3wall;
	
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
	
	let mesh = new THREE.Mesh(geometry2, material);
	scene.add(mesh);
	mesh.meshFunc = meshFunc2;
    mesh.inMeshFunc = inMeshFunc2;
    mesh.meshDifFunc = meshDifFunc2;
    mesh.rotation.x = -Math.PI/2
    mesh.position.set(0,-0.205,0);
    mesh.ID = "hole";
	mesh.level = 1
	mesh.visible = false
	var ballhole = new THREE.Group();
	ballhole.add(mesh);
	holes.push(mesh)

	const geometry4 = new THREE.CylinderGeometry( 2.576, 2.576, 4.4, 32,1,true);
	var material = new THREE.MeshPhongMaterial( {color: 0x888888,side:THREE.DoubleSide}); 
	var cylinder = new THREE.Mesh( geometry4, material );
	cylinder.castShadow = true;
	cylinder.receiveShadow = true;
	cylinder.position.y = -2.2;
	cylinder.ID = "wall";
	cylinder.r = 2.576;
	cylinder.height = 4.4;
	holes.push(cylinder);
	
	ballhole.add(cylinder);
	
	const geometry = new THREE.CylinderGeometry( 2.576, 2.576, 0.01, 32 );
	var material2 = new THREE.MeshPhongMaterial( {color: 0x000000,side:THREE.DoubleSide}); 
	const block = new THREE.Mesh( geometry, material2);
	
	block.position.y=-4.4;
	block.ID = "bottom";
	block.r = 2.576
	block.normal = new THREE.Vector3(0,1,0);
	holes.push(block)
	ballhole.add(block)
	//ballhole.position.set(39.5,0,5);
	ballhole.position.set(50,0,-4.5);
	
	class1.add(ballhole)
/*   
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
*/
	//class 2
	let mesh2 = new THREE.Mesh(geometry2, material);
	scene.add(mesh2);
	mesh2.meshFunc = meshFunc2;
    mesh2.inMeshFunc = inMeshFunc2;
    mesh2.meshDifFunc = meshDifFunc2;
    mesh2.rotation.x = -Math.PI/2
    mesh2.position.set(0,-0.205,0);
    mesh2.ID = "hole";
	mesh2.level = 2;
	mesh2.visible = false
	holes.push(mesh2)

	var ballhole2 = new THREE.Group();

	var cylinder2 = new THREE.Mesh( geometry4, material );
	cylinder2.castShadow = true;
	cylinder2.receiveShadow = true;
	cylinder2.position.y = -2.2;
	cylinder2.ID = "wall";
	cylinder2.r = 2.576;
	cylinder2.height = 4.4;
	holes.push(cylinder2);
	
	ballhole2.add(mesh2,cylinder2);
	
	const block2 = new THREE.Mesh( geometry, material2);
	
	block2.position.y=-4.4;
	block2.ID = "bottom";
	block2.r = 2.576
	block2.normal = new THREE.Vector3(0,1,0);
	holes.push(block2)
	ballhole2.add(block2)
	scene.add(ballhole2);
	ballhole2.position.set(149.6,0,-300);
	
	class2.add(ballhole2)
	//class3

	
	
}
function buildPillar(){
	
	renderer.autoClear = false;
	const localPlane = new THREE.Plane(new THREE.Vector3(0, 1 ,0), 0.0);

	var pillarC11 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC11.R = 2;
	pillarC11.height = 6
	pillarC11.position.set(25,3,20);
	pillarC11.ID = "wall"
	pillarC11.castShadow = true;
	cylinders.push(pillarC11)

	var pillarC12 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC12.R = 2;
	pillarC12.height = 6
	pillarC12.position.set(-25,3,20);
	pillarC12.ID = "wall"
	pillarC12.castShadow = true;
	cylinders.push(pillarC12)
	
	var pillarC13 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC13.R = 2;
	pillarC13.height = 6
	pillarC13.position.set(-25,3,-80);
	pillarC13.ID = "wall"
	pillarC13.castShadow = true;
	cylinders.push(pillarC13)
	
	var pillarC14 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC14.R = 2;
	pillarC14.height = 6
	pillarC14.position.set(25,3,-80);
	pillarC14.ID = "wall"
	pillarC14.castShadow = true;
	cylinders.push(pillarC14)
	
	var pillarC15 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC15.R = 2;
	pillarC15.height = 6
	pillarC15.position.set(75,3,20);
	pillarC15.ID = "wall"
	pillarC15.castShadow = true;
	cylinders.push(pillarC15)
	
	var pillarC16 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC16.R = 2;
	pillarC16.height = 6
	pillarC16.position.set(75,3,-80);
	pillarC16.ID = "wall"
	pillarC16.castShadow = true;
	cylinders.push(pillarC16)
	
	class1.add(pillarC11,pillarC12,pillarC13,pillarC14,pillarC15,pillarC16)
	/*
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
	*/
	//第二關柱子
	var pillarC21 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC21.R = 2;
	pillarC21.height = 6
	pillarC21.position.set(25,3,-125);
	pillarC21.ID = "wall"
	pillarC21.castShadow = true;
	scene.add(pillarC21)
	cylinders.push(pillarC21)
	
	var pillarC22 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC22.R = 2;
	pillarC22.height = 6
	pillarC22.position.set(-25,3,-125);
	pillarC22.ID = "wall"
	pillarC22.castShadow = true;
	scene.add(pillarC22)
	cylinders.push(pillarC22)
	
	var pillarC23 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC23.R = 2;
	pillarC23.height = 6
	pillarC23.position.set(25,3,-275);
	pillarC23.ID = "wall"
	pillarC23.castShadow = true;
	scene.add(pillarC23)
	cylinders.push(pillarC23)
	
	var pillarC24 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC24.R = 2;
	pillarC24.height = 6
	pillarC24.position.set(-25,3,-325);
	pillarC24.ID = "wall"
	pillarC24.castShadow = true;
	scene.add(pillarC24)
	cylinders.push(pillarC24)
	
	var pillarC25 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC25.R = 2;
	pillarC25.height = 6
	pillarC25.position.set(175,3,-275);
	pillarC25.ID = "wall"
	pillarC25.castShadow = true;
	scene.add(pillarC25)
	cylinders.push(pillarC25)
	
	var pillarC26 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillarC26.R = 2;
	pillarC26.height = 6
	pillarC26.position.set(175,3,-325);
	pillarC26.ID = "wall"
	pillarC26.castShadow = true;
	scene.add(pillarC26)
	cylinders.push(pillarC26)
	
	class2.add(pillarC21.clone(),pillarC22.clone(),pillarC23.clone(),pillarC24.clone(),pillarC25.clone(),pillarC26.clone())
}
function buildfloors(){
	
	//class2
	
	var heightFunc = function(x,z) {
	  let K1 = 5,p1x = -20,p1z = -260,w1 = 15;
	  let K2 = 5, p2x = 15, p2z = -260, w2 = 15;
	  let K3 = 5, p3x = 50, p3z = -280, w3 = 15;
	  let K4 = 5, p4x = 50, p4z = -320, w4 = 15;
	  let K5 = 2, p5x = 20, p5z = -290, w5 = 10;
	  let K6 = 2, p6x = 20, p6z = -310, w6 = 10;
	  let K7 = 2, p7x = -20, p7z = -290, w7 = 10;
	  let K8 = 2, p8x = -20, p8z = -310, w8 = 10;
	  
	  return K1 * Math.exp(
		-(x - p1x) * (x - p1x) / w1 / w1 - (z - p1z) * (z - p1z) / w1 / w1) + K2 * Math.exp(
		-(x - p2x) * (x - p2x) / w2 / w2 - (z - p2z) * (z - p2z) / w2 / w2) + K3 * Math.exp(
		-(x - p3x) * (x - p3x) / w3 / w3 - (z - p3z) * (z - p3z) / w3 / w3) + K4 * Math.exp(
		-(x - p4x) * (x - p4x) / w4 / w4 - (z - p4z) * (z - p4z) / w4 / w4) - K5 * Math.exp(
		-(x - p5x) * (x - p5x) / w5 / w5 - (z - p5z) * (z - p5z) / w5 / w5) - K6 * Math.exp(
		-(x - p6x) * (x - p6x) / w6 / w6 - (z - p6z) * (z - p6z) / w6 / w6) - K7 * Math.exp(
		-(x - p7x) * (x - p7x) / w7 / w7 - (z - p7z) * (z - p7z) / w7 / w7) - K8 * Math.exp(
		-(x - p8x) * (x - p8x) / w8 / w8 - (z - p8z) * (z - p8z) / w8 / w8)
	}
	var inHeightFunc = function(x,z){
	  let K1 = 5,p1x = -20,p1z = -260,w1 = 15;
	  let K2 = 5, p2x = 15, p2z = -260, w2 = 15;
	  let K3 = 5, p3x = 50, p3z = -280, w3 = 15;
	  let K4 = 5, p4x = 50, p4z = -320, w4 = 15;
	  let K5 = 2, p5x = 20, p5z = -290, w5 = 10;
	  let K6 = 2, p6x = 20, p6z = -310, w6 = 10;
	  let K7 = 2, p7x = -20, p7z = -290, w7 = 10;
	  let K8 = 2, p8x = -20, p8z = -310, w8 = 10;
		return [- K1 * Math.exp(
		-(x - p1x) * (x - p1x) / w1 / w1 - (z - p1z) * (z - p1z) / w1 / w1) * (-2 * ((x - p1x) / w1) / w1 ) - K2 * Math.exp(
		-(x - p2x) * (x - p2x) / w2 / w2 - (z - p2z) * (z - p2z) / w2 / w2) * (-2 * ((x - p2x) / w2) / w2 ) - K3 * Math.exp(
		-(x - p3x) * (x - p3x) / w3 / w3 - (z - p3z) * (z - p3z) / w3 / w3) * (-2 * ((x - p3x) / w3) / w3 ) - K4 * Math.exp(
		-(x - p4x) * (x - p4x) / w4 / w4 - (z - p4z) * (z - p4z) / w4 / w4) * (-2 * ((x - p4x) / w4) / w4 ) + K5 * Math.exp(
		-(x - p5x) * (x - p5x) / w5 / w5 - (z - p5z) * (z - p5z) / w5 / w5) * (-2 * ((x - p5x) / w5) / w5 ) + K6 * Math.exp(
		-(x - p6x) * (x - p6x) / w6 / w6 - (z - p6z) * (z - p6z) / w6 / w6) * (-2 * ((x - p6x) / w6) / w6 ) + K7 * Math.exp(
		-(x - p7x) * (x - p7x) / w7 / w7 - (z - p7z) * (z - p7z) / w7 / w7) * (-2 * ((x - p7x) / w7) / w7 ) + K8 * Math.exp(
		-(x - p8x) * (x - p8x) / w8 / w8 - (z - p8z) * (z - p8z) / w8 / w8) * (-2 * ((x - p8x) / w8) / w8 ) ,-K1 * Math.exp(
		-(x - p1x) * (x - p1x) / w1 / w1 - (z - p1z) * (z - p1z) / w1 / w1) * (-2 * ((z - p1z) / w1) / w1 ) - K2 * Math.exp(
		-(x - p2x) * (x - p2x) / w2 / w2 - (z - p2z) * (z - p2z) / w2 / w2) * (-2 * ((z - p2z) / w2) / w2 ) - K3 * Math.exp(
		-(x - p3x) * (x - p3x) / w3 / w3 - (z - p3z) * (z - p3z) / w3 / w3) * (-2 * ((z - p3z) / w3) / w3 ) - K4 * Math.exp(
		-(x - p4x) * (x - p4x) / w4 / w4 - (z - p4z) * (z - p4z) / w4 / w4) * (-2 * ((z - p4z) / w4) / w4 ) + K5 * Math.exp(
		-(x - p5x) * (x - p5x) / w5 / w5 - (z - p5z) * (z - p5z) / w5 / w5) * (-2 * ((z - p5z) / w5) / w5 ) + K6 * Math.exp(
		-(x - p6x) * (x - p6x) / w6 / w6 - (z - p6z) * (z - p6z) / w6 / w6) * (-2 * ((z - p6z) / w6) / w6 ) + K7 * Math.exp(
		-(x - p7x) * (x - p7x) / w7 / w7 - (z - p7z) * (z - p7z) / w7 / w7) * (-2 * ((z - p7z) / w7) / w7 ) + K8 * Math.exp(
		-(x - p8x) * (x - p8x) / w8 / w8 - (z - p8z) * (z - p8z) / w8 / w8) * (-2 * ((z - p8z) / w8) / w8 )]
	}
	
	var geometry = new ParametricGeometry(function(u0, v0, pos) {
		let x = -25 + 50 * u0;
		let z = -325 + 200 * v0;
		pos.set(x, heightFunc(x, z), z);
	}, 40, 40);
	
	var loader2 = new THREE.TextureLoader();
	loader2.setCrossOrigin('');

	var textureTest1 = loader2.load('https://i.imgur.com/ktNrXbh.png');  
	
	let materialLight1 = new THREE.MeshBasicMaterial({
        map: textureTest1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
	});
	
    let materialGround = new THREE.MeshBasicMaterial({
        color: 0x006000,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1
    });	
	
	var convertUV = function(x,z){
		return [(x + 25) / 50,(z + 325) / 200]
	}
	
	//let mesh = createMultiMaterialObject(geometry, [materialGround, materialLight1]);
	let mesh = new THREE.Mesh(geometry, materialGround);
	mesh.y = 0
	mesh.heightFunc = heightFunc;
	mesh.inHeightFunc = inHeightFunc;
	mesh.convertUV = convertUV;
	mesh.receiveShadow = true;
	
	
	var geometry2 = new ParametricGeometry(function(u0, v0, pos) {
		let x = 25 + 100 * u0;
		let z = -325 + 50 * v0;
		pos.set(x, heightFunc(x, z), z);
	}, 40, 40);
	var convertUV2 = function(x,z){
		return [(x - 25) / 100,(z + 325) / 50]
	}
	var textureTest2 = loader2.load('https://i.imgur.com/5IvClX4.png');  
	
	let materialLight2 = new THREE.MeshBasicMaterial({
        map: textureTest2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
	});
	
	//let floor5 = createMultiMaterialObject(geometry2, [materialGround, materialLight2]);
	let floor5 = new THREE.Mesh(geometry2,materialGround);
	
	//floor5 = new THREE.Mesh(geometry2, new THREE.MeshPhongMaterial({map: texture2,side:THREE.DoubleSide}));
	
	floor5.receiveShadow = true;
	floor5.y = 0;
	floor5.heightFunc = heightFunc;
	floor5.inHeightFunc = inHeightFunc;
	floor5.convertUV = convertUV2;
	
	floors.push(mesh,floor5)
	scene.add(mesh,floor5)
	class2.add(mesh,floor5)
	
}
function buildArcWalls(){
	
	let group = new THREE.Group();
	let material = new THREE.MeshPhongMaterial({color:0xA23400,side:THREE.DoubleSide,transparent: true,opacity: 1})
	var arcWallC11 = new THREE.Mesh(new THREE.CylinderGeometry(48.75,48.75,5,32,32,true,Math.PI/2,Math.PI),material);
	arcWallC11.R = 48.75;
	arcWallC11.height = 5
	arcWallC11.position.set(25,2.5,-80);
	arcWallC11.castShadow = true;
	arcWallC11.thetaStart = Math.PI/2;
	arcWallC11.thetaLength = Math.PI;
	
	var arcWallC12 = new THREE.Mesh(new THREE.CylinderGeometry(51.25,51.25,5,32,32,true,Math.PI/2,Math.PI),material);
	arcWallC12.position.set(25,2.5,-80);
	arcWallC12.castShadow = true;
	
	let mesh11 = new THREE.Mesh(new THREE.RingGeometry( 48.75, 51.25, 32,1,0,Math.PI), material );
	mesh11.rotation.x = -Math.PI /2;
	mesh11.position.set(25,5,-80)

	let mesh12 = new THREE.Mesh(new THREE.RingGeometry( 48.75, 51.25, 32,1,0,Math.PI), material );
	mesh12.rotation.x = -Math.PI /2;
	mesh12.position.set(25,0,-80)
	
	group.add(arcWallC11,arcWallC12,mesh11,mesh12)
	arcWalls.push(group);
	class1.add(group)
	
}
function setClassVisible(level){
	
		class1Rotate.visible = false;
		class2Rotate.visible = false;
		class3Rotate.visible = false;		
	if(level === 1) {
		class1Rotate.visible = true;
	}
	else if(level === 2)
		class2Rotate.visible = true;
	else if(level === 3)
		class3Rotate.visible = true;
}
function bulidMiniWorld(){
	if(true){//floor
		let tempx = 300,tempz = -300;
		var heightFunc = function(x,z) {
			  let K1 = 5,p1x = 1000,p1z = 20,w1 = 15;
			  return K1 * Math.exp(
				-(x - p1x) * (x - p1x) / w1 / w1 - (z - p1z) * (z - p1z) / w1 / w1)
			}
		var inHeightFunc = function(x,z){
			  let K1 = 5,p1x = 1000,p1z = 20,w1 = 15;
				return [- K1 * Math.exp(
				-(x - p1x) * (x - p1x) / w1 / w1 - (z - p1z) * (z - p1z) / w1 / w1) * (-2 * ((x - p1x) / w1) / w1 ),-K1 * Math.exp(
				-(x - p1x) * (x - p1x) / w1 / w1 - (z - p1z) * (z - p1z) / w1 / w1) * (-2 * ((z - p1z) / w1) / w1 )]
			}
		
		let materialGround = new THREE.MeshBasicMaterial({
			//color: 0x006000,
			map: new THREE.TextureLoader().load("https://i.imgur.com/139mBUS.png"),
			side: THREE.DoubleSide,
			transparent: true,
			opacity: 1
		});	
			
		var groundGeometry = new ParametricGeometry(function(u0, v0, pos) {
			let x = 175 + tempx - 165 * u0;
			let z = -5  + tempz + 80 * v0;
			pos.set(x, heightFunc(x, z) + 0, z);
		}, 40, 40);
			
		var convertUVGround = function(x,z){
			return [ -(x - 175 - tempx) / 165,(z + 5 - tempz) / 80]
		}
			
		let ground = new THREE.Mesh(groundGeometry, materialGround);
		ground.y = 0
		ground.heightFunc = heightFunc;
		ground.inHeightFunc = inHeightFunc;
		ground.convertUV = convertUVGround;
		ground.receiveShadow = true;
		
		floors.push(ground);

		var groundFakeGeometry = new ParametricGeometry(function(u0, v0, pos) {
			let x = 175 - 165 * u0;
			let z = -5 + 80 * v0;
			pos.set(x, heightFunc(x, z) + 0, z);
		}, 40, 40);
			
		let groundFake = new THREE.Mesh(groundFakeGeometry, materialGround);
		groundFake.receiveShadow = true;
		
		class3.add(groundFake)
		
		var geometry1 = new ParametricGeometry(function(u0, v0, pos) {
			let x = -15 + tempx + 30 * u0;
			let z = 0 + tempz+ 100 * v0;
			pos.set(x, heightFunc(x, z) + 15, z);
		}, 40, 40);
			
		var convertUV1 = function(x,z){
			return [ (x + 15 - tempx) / 30,(z + 0 - tempz) / 100]
		}
			
		let mesh1 = new THREE.Mesh(geometry1, materialGround);
		mesh1.y = 15
		mesh1.heightFunc = heightFunc;
		mesh1.inHeightFunc = inHeightFunc;
		mesh1.convertUV = convertUV1;
		mesh1.receiveShadow = true;
		
		floors.push(mesh1);
		
		var geometry2 = new ParametricGeometry(function(u0, v0, pos) {
			let x = 15 + tempx + 50 * u0;
			let z = 70 + tempz + 30 * v0;
			pos.set(x, heightFunc(x, z) + 15, z);
		}, 40, 40);
			
		var convertUV2 = function(x,z){
			return [ (x - 15 - tempx) / 50,(z - 70 - tempz) / 30]
		}
			
		let mesh2 = new THREE.Mesh(geometry2, materialGround);
		mesh2.y = 15
		mesh2.heightFunc = heightFunc;
		mesh2.inHeightFunc = inHeightFunc;
		mesh2.convertUV = convertUV2;
		mesh2.receiveShadow = true;
		
		floors.push(mesh2);
		
		var geometry3 = new ParametricGeometry(function(u0, v0, pos) {
			let x = 65 + tempx + 50 * u0;
			let z = 55 + tempz + 60 * v0;
			pos.set(x, heightFunc(x, z) + 10, z);
		}, 40, 40);
			
		var convertUV3 = function(x,z){
			return [ (x - 65 - tempx) / 50,(z - 55 - tempz) / 60]
		}
			
		let mesh3 = new THREE.Mesh(geometry3, materialGround);
		mesh3.y = 10
		mesh3.heightFunc = heightFunc;
		mesh3.inHeightFunc = inHeightFunc;
		mesh3.convertUV = convertUV3;
		mesh3.receiveShadow = true;
		
		floors.push(mesh3);
		
		var geometry4 = new ParametricGeometry(function(u0, v0, pos) {
			let x = 40 + tempx + 40 * u0;
			let z = 79 + tempz + 12 * v0;
			pos.set(x, heightFunc(x, z) + 15, z);
		}, 40, 40);
			
		var convertUV4 = function(x,z){
			return [ (x - 40 - tempx) / 40,(z - 79 - tempz) / 12]
		}
			
		let mesh4 = new THREE.Mesh(geometry4, materialGround);
		mesh4.y = 15
		mesh4.heightFunc = heightFunc;
		mesh4.inHeightFunc = inHeightFunc;
		mesh4.convertUV = convertUV4;
		mesh4.receiveShadow = true;		
		
		floors.push(mesh4);


		var geometry5 = new ParametricGeometry(function(u0, v0, pos) {
			let x = 82.25 + tempx + 7.5 * u0;
			let z = 66.25 + tempz + 37.5 * v0;
			pos.set(x, heightFunc(x, z) + 15, z);
		}, 40, 40);
			
		var convertUV5 = function(x,z){
			return [ (x - 82.25 - tempx) / 7.5,(z - 66.25 - tempz) / 37.5]
		}
			
		let mesh5 = new THREE.Mesh(geometry5, materialGround);
		mesh5.y = 15
		mesh5.heightFunc = heightFunc;
		mesh5.inHeightFunc = inHeightFunc;
		mesh5.convertUV = convertUV5;
		mesh5.receiveShadow = true;		
		
		floors.push(mesh5);
		
		if(true){//book
			let book1 = buildBook();
			let book2 = buildBook();
			book1.position.set(0,5,0);
			book2.position.set(0,5,50);

			let book3 = buildBook();
			book3.rotation.y = Math.PI/2;
			book3.position.set(15,5,85);
			class3.add(book1.clone(),book2.clone(),book3.clone())
			book1.position.set(0,10,0);
			book2.position.set(0,10,50);
			book3.position.set(15,10,85);
			class3.add(book1.clone(),book2.clone(),book3.clone())
			book1.position.set(0,15,0);
			book2.position.set(0,15,50);
			book3.position.set(15,15,85);		
			class3.add(book1,book2,book3)
			let book4 = buildBook();
			let book5 = buildBook();
			
			book4.rotation.y = Math.PI/2;
			book5.rotation.y = -Math.PI/2;
			
			book4.position.set(65,5,70);
			book5.position.set(115,5,100);

			class3.add(book4.clone(),book5.clone())		
			
			book4.position.set(65,10,70);
			book5.position.set(115,10,100);
			
			class3.add(book4,book5)
			
			let book6 = book4.clone();
			book6.position.set(115,8,85);
			book6.rotation.x = -Math.PI / 180 * 10;
			class3.add(book6)
			
			let book7 = buildBook();
			book7.rotation.x = -Math.PI / 2;
			book7.rotation.y = -Math.PI / 2;
			book7.position.set(165,15,100.5)
			class3.add(book7);
			
			let book8 = buildBook();	
			book8.rotation.z = Math.PI / 2;
			book8.position.set(165,15,55)
			class3.add(book8)
			
			
		}
		if(true){//ruler
			let ruler1 = buildRuler();
			ruler1.position.set(60,15,81.90);
			
			let ruler2 = buildRuler();
			ruler2.position.set(60,15,88.10);
			ruler2.rotation.y = Math.PI
			
			class3.add(ruler1,ruler2);
		}
	}
	if(true){//wall
		if(true){//鉛筆
			let pencil1 = buildPencil();
			let pencil2 = buildPencil();
			pencil1.position.set(-13.5,15,0)
			pencil2.position.set(13.5,15,0)
			
			let pencil3 = buildPencil();
			let pencil4 = buildPencil();
			pencil3.rotation.y = Math.PI / 2
			pencil4.rotation.y = Math.PI / 2
			pencil3.position.set(15,15,71.5)
			pencil4.position.set(15,15,98.5)
			
			class3.add(pencil1,pencil2,pencil3,pencil4)
			
			let pencil5 = pencil3.clone();
			let pencil6 = pencil4.clone();
			pencil5.position.set(65,10,56.5)
			pencil6.position.set(65,10,113.5)
			class3.add(pencil5,pencil6)
		}
		if(true){//橡皮
			let eraser1 = buildEraser();
			let eraser2 = buildEraser();
			eraser1.rotation.x = -Math.PI/2;
			eraser2.rotation.x = -Math.PI/2;
			
			eraser1.position.set(-6,18.25,3.25)
			eraser2.position.set(6,18.25,3.25)
			let eraser3 = eraser1.clone();
			let eraser4 = eraser2.clone();
			
			eraser3.rotation.z = -Math.PI / 2;
			eraser4.rotation.z = -Math.PI / 2;
			eraser3.position.set(15-3.25,18.25,56)
			eraser4.position.set(-15,18.25,56)
			
			let eraser5 = eraser3.clone();
			let eraser6 = eraser4.clone();
			
			eraser5.position.set(15-3.25,18.25,68)
			eraser6.position.set(-15,18.25,68)

			let eraser7 = buildEraser()
			let eraser8 = buildEraser();
			eraser7.rotation.x = -Math.PI/2;
			eraser8.rotation.x = -Math.PI/2;	
			
			eraser7.rotation.z = -Math.PI / 2;
			eraser8.rotation.z = -Math.PI / 2;
			
			eraser7.position.set(65,13.25,64)
			eraser8.position.set(115-3,13.25,64)	
			
			let eraser9 =  eraser7.clone();
			let eraser10 = eraser7.clone();
			
			eraser9.position.set(65,13.25,106)
			eraser10.position.set(115-3,13.25,106)	
			
			let eraser11 = buildEraser();
			eraser11.rotation.x = -Math.PI/2;
			eraser11.position.set(8,18.25,100)
			
			class3.add(eraser1,eraser2,eraser3,eraser4,eraser5,eraser6,eraser7,eraser8,eraser9,eraser10,eraser11)
			/*class3.add(eraser11,eraser12,eraser13,eraser14)*/
		}
		if(true){//彎的
		
			let group = new THREE.Group();
			
			let material = new THREE.MeshBasicMaterial({map: new THREE.TextureLoader().load("https://i.imgur.com/MN5mWBg.png"),side:THREE.DoubleSide,transparent: true,opacity: 1})
			var arcWallC11 = new THREE.Mesh(new THREE.CylinderGeometry(27,27,5,32,32,true,Math.PI/2 * 3,Math.PI/3),material);
			arcWallC11.R = 27;
			arcWallC11.height = 5
			arcWallC11.position.set(15,17.5,74);
			arcWallC11.castShadow = true;
			arcWallC11.thetaStart = Math.PI/2 * 3;
			arcWallC11.thetaLength = Math.PI/3;
			
			var arcWallC12 = new THREE.Mesh(new THREE.CylinderGeometry(30,30,5,32,32,true,Math.PI/2 * 3,Math.PI/3),material);
			arcWallC12.position.set(15,17.5,74);
			arcWallC12.castShadow = true;
			
			let mesh11 = new THREE.Mesh(new THREE.RingGeometry(27, 30, 32,1,-Math.PI,Math.PI/3), material );
			mesh11.rotation.x = -Math.PI /2;
			mesh11.position.set(15,20,74)
			
			let mesh12 = new THREE.Mesh( new THREE.RingGeometry(27, 30,32,1,-Math.PI,Math.PI/3), material );
			mesh12.rotation.x = -Math.PI /2;
			mesh12.position.set(15,15,74)
			
			group.add(arcWallC11,arcWallC12,mesh11,mesh12)
			arcWalls.push(group);
			class3.add(group)
			
		}
		if(true){//碰撞
			
			let wall1 = new Wall(30,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall1.mesh.position.set(0,18,3)
			level3Walls.push(wall1)
			class3.add(wall1.mesh)
			
			let wall2 = new Wall(74,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall2.mesh.rotation.y = Math.PI / 2;
			wall2.mesh.position.set(-12,18,37)
			level3Walls.push(wall2)
			class3.add(wall2.mesh)
			let wall3 = new Wall(74,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall3.mesh.rotation.y = -Math.PI / 2;
			wall3.mesh.position.set(12,18,37)
			level3Walls.push(wall3)
			class3.add(wall3.mesh)
			
			let wall4 = new Wall(65,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall4.mesh.rotation.y = -Math.PI;
			wall4.mesh.position.set(32.5,18,97)
			level3Walls.push(wall4)
			class3.add(wall4.mesh)
			
			let wall5 = new Wall(50,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall5.mesh.position.set(40,18,73)
			level3Walls.push(wall5)
			class3.add(wall5.mesh)
			
			let wall6 = new Wall(3,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall6.mesh.position.set(13.5,18,74)
			level3Walls.push(wall6)
			class3.add(wall6.mesh)
			
			let wall7 = new Wall(30,4,new THREE.Vector3(0,0,1),1,0xA23400)
			wall7.mesh.rotation.y = Math.PI / 2;
			wall7.mesh.position.set(65,12,85)
			level3Walls.push(wall7)
			class3.add(wall7.mesh)
			///時間性的 上方
			let wall8 = new Wall(3,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall8.mesh.rotation.y = Math.PI;
			wall8.mesh.position.set(66.5,13,100)
			level3Walls.push(wall8)
			class3.add(wall8.mesh)

			let wall9 = new Wall(50,5,new THREE.Vector3(0,0,1),1,0xA23400)
			wall9.mesh.rotation.y = Math.PI;
			wall9.mesh.position.set(90,12.5,112)
			level3Walls.push(wall9)
			class3.add(wall9.mesh)

			let wall10 = new Wall(3,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall10.mesh.rotation.y = Math.PI;
			wall10.mesh.position.set(113.5,13,100)
			level3Walls.push(wall10)
			class3.add(wall10.mesh)

			let wall11 = new Wall(12,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall11.mesh.rotation.y = Math.PI / 2;
			wall11.mesh.position.set(68,13,106)
			level3Walls.push(wall11)
			class3.add(wall11.mesh)
			
			let wall12 = new Wall(12,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall12.mesh.rotation.y = -Math.PI / 2;
			wall12.mesh.position.set(112,13,106)
			level3Walls.push(wall12)
			class3.add(wall12.mesh)	
			///時間性的 下方
			
			let wall13 = new Wall(3,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall13.mesh.position.set(66.5,13,70)
			level3Walls.push(wall13)
			class3.add(wall13.mesh)

			let wall14 = new Wall(50,5,new THREE.Vector3(0,0,1),1,0xA23400)
			wall14.mesh.position.set(90,12.5,58)
			level3Walls.push(wall14)
			class3.add(wall14.mesh)

			let wall15 = new Wall(3,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall15.mesh.position.set(113.5,13,70)
			level3Walls.push(wall15)
			class3.add(wall15.mesh)

			let wall16 = new Wall(12,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall16.mesh.rotation.y = Math.PI / 2;
			wall16.mesh.position.set(68,13,64)
			level3Walls.push(wall16)
			class3.add(wall16.mesh)
			
			let wall17 = new Wall(12,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall17.mesh.rotation.y = -Math.PI / 2;
			wall17.mesh.position.set(112,13,64)
			level3Walls.push(wall17)
			class3.add(wall17.mesh)	
			/// 風車
			
			let wall18 = new Wall(25,5,new THREE.Vector3(0,0,1),1,0xA23400)
			wall18.mesh.position.set(90,12.5,103.75);
			level3Walls.push(wall18)
			class3.add(wall18.mesh)

			let wall19 = new Wall(25,5,new THREE.Vector3(0,0,1),1,0xA23400)
			wall19.mesh.rotation.y = Math.PI
			wall19.mesh.position.set(90,12.5,66.25);
			level3Walls.push(wall19)
			class3.add(wall19.mesh)
			
			let wall20 = new Wall(37.5,4,new THREE.Vector3(0,0,1),1,0xA23400)
			wall20.mesh.rotation.y = -Math.PI / 2;
			wall20.mesh.position.set(77.5,12,85);
			level3Walls.push(wall20)
			class3.add(wall20.mesh)	
			
			let wall21 = new Wall(15.25,5,new THREE.Vector3(0,0,1),1,0xA23400)
			wall21.mesh.rotation.y = Math.PI / 2;
			wall21.mesh.position.set(102.5,12.5,95.625);
			level3Walls.push(wall21)
			class3.add(wall21.mesh)	

			let wall22 = new Wall(15.25,5,new THREE.Vector3(0,0,1),1,0xA23400)
			wall22.mesh.rotation.y = Math.PI / 2;
			wall22.mesh.position.set(102.5,12.5,74.375);
			level3Walls.push(wall22)
			class3.add(wall22.mesh)
			
			//斜坡雙牆
			
			let wall23 = new Wall(50,30,new THREE.Vector3(0,0,1),1,0xA23400)
			wall23.mesh.rotation.y = Math.PI;
			wall23.mesh.position.set(140,15,100.5);
			level3Walls.push(wall23)
			class3.add(wall23.mesh)
			
			let wall24 = new Wall(50,30,new THREE.Vector3(0,0,1),1,0xA23400)
			wall24.mesh.rotation.y = -Math.PI / 2;
			wall24.mesh.position.set(165,15,80);
			level3Walls.push(wall24)
			class3.add(wall24.mesh)	
			//斜坡
			
			let wall25 = new Wall(50,30,new THREE.Vector3(0,0,1),1,0xA23400)
			wall25.mesh.rotation.x = -Math.PI / 180 * 100;
			wall25.mesh.position.set(140,8,85);
			level3Walls.push(wall25)
			class3.add(wall25.mesh)
			
			let wall26 = new Wall(17.5,6,new THREE.Vector3(0,0,1),1,0xA23400)
			wall26.mesh.rotation.x = -Math.PI / 180 * 90;
			wall26.mesh.rotation.y = Math.PI /180 * 17
			
			wall26.mesh.position.set(90 + 3.4,12.5,85);
			level3Walls.push(wall26)
			class3.add(wall26.mesh)
			//塗鴉
			
			let wall27 = new Wall(70,10,new THREE.Vector3(0,0,1),1,0xA23400)
			wall27.mesh.rotation.y = Math.PI / 2;
			wall27.mesh.position.set(15,5,35)
			level3Walls.push(wall27)
			class3.add(wall27.mesh)

			let wall28 = new Wall(50,10,new THREE.Vector3(0,0,1),1,0xA23400)
			wall28.mesh.rotation.y = Math.PI;
			wall28.mesh.position.set(40,5,70)
			level3Walls.push(wall28)
			class3.add(wall28.mesh)
			
			let wall29 = new Wall(15,10,new THREE.Vector3(0,0,1),1,0xA23400)
			wall29.mesh.rotation.y = -Math.PI / 2;
			wall29.mesh.position.set(65,5,62.5)
			level3Walls.push(wall29)
			class3.add(wall29.mesh)

			let wall30 = new Wall(50,10,new THREE.Vector3(0,0,1),1,0xA23400)
			wall30.mesh.rotation.y = Math.PI;
			wall30.mesh.position.set(90,5,55)
			level3Walls.push(wall30)
			class3.add(wall30.mesh)
			let wall31 = new Wall(15,10,new THREE.Vector3(0,0,1),1,0xA23400)
			wall31.mesh.rotation.y = Math.PI / 2;
			wall31.mesh.position.set(115,5,62.5)
			level3Walls.push(wall31)
			class3.add(wall31.mesh)

			let wall32 = new Wall(50,5,new THREE.Vector3(0,0,1),1,0xA23400)
			wall32.mesh.rotation.x = -Math.PI /180 * 10
			wall32.mesh.rotation.y = Math.PI;
			
			wall32.mesh.position.set(140,2.5,70.5)
			level3Walls.push(wall32)
			class3.add(wall32.mesh)

			let wall33 = new Wall(140,10,new THREE.Vector3(0,0,1),1,0xA23400)

			wall33.mesh.position.set(90,5,0)
			level3Walls.push(wall33)
			class3.add(wall33.mesh)
			
			let wall34 = new Wall(55,10,new THREE.Vector3(0,0,1),1,0xA23400)
			wall34.mesh.rotation.y = -Math.PI /2
			wall34.mesh.position.set(165,5,27.5)
			level3Walls.push(wall34)
			class3.add(wall34.mesh)
			
			
			let wall35 = new Wall(23,10,new THREE.Vector3(0,0,1),1,0xA23400)
			wall35.mesh.position.set(165 - 11.5,5,30)
			level3Walls.push(wall35)
			class3.add(wall35.mesh)
			
			let wall36 = new Wall(15,10,new THREE.Vector3(0,0,1),1,0xA23400)
			wall36.mesh.rotation.y = Math.PI /2
			wall36.mesh.position.set(142,5,37.5)
			level3Walls.push(wall36)
			class3.add(wall36.mesh)
			
			let wall37 = new Wall(34,10,new THREE.Vector3(0,0,1),1,0xA23400)
			wall37.mesh.position.set(125,5,45)
			level3Walls.push(wall37)
			class3.add(wall37.mesh)
			
			let wall38 = new Wall(45,10,new THREE.Vector3(0,0,1),1,0xA23400)
			wall38.mesh.rotation.y = -Math.PI /2
			wall38.mesh.position.set(108,5,22.5)
			level3Walls.push(wall38)
			class3.add(wall38.mesh)
			
			let wall39 = new Wall(13,10,new THREE.Vector3(0,0,1),1,0xA23400)
			wall39.mesh.rotation.y = Math.PI /2
			wall39.mesh.position.set(92,5,48.5)
			level3Walls.push(wall39)
			class3.add(wall39.mesh)
			
			let wall40 = new Wall(4,10,new THREE.Vector3(0,0,1),1,0xA23400)
			wall40.mesh.rotation.y = Math.PI;
			wall40.mesh.position.set(90,5,42)
			level3Walls.push(wall40)
			class3.add(wall40.mesh)
			let wall41 = new Wall(15,10,new THREE.Vector3(0,0,1),1,0xA23400)
			wall41.mesh.rotation.y = Math.PI /2
			wall41.mesh.position.set(88,5,34.5)
			level3Walls.push(wall41)
			class3.add(wall41.mesh)	

			let wall42 = new Wall(15,10,new THREE.Vector3(0,0,1),1,0xA23400)
			wall42.mesh.rotation.y = Math.PI
			wall42.mesh.position.set(80.5,5,27)
			level3Walls.push(wall42)
			class3.add(wall42.mesh)	
			
			let wall43 = new Wall(28,10,new THREE.Vector3(0,0,1),1,0xA23400)
			wall43.mesh.rotation.y = -Math.PI / 2
			wall43.mesh.position.set(73,5,41)
			level3Walls.push(wall43)
			class3.add(wall43.mesh)

			let wall44 = new Wall(42,10,new THREE.Vector3(0,0,1),1,0xA23400)
			wall44.mesh.rotation.y = Math.PI / 180 * 73
			wall44.mesh.position.set(31,5,20)
			level3Walls.push(wall44)
			class3.add(wall44.mesh)	
			
			let wall45 = new Wall(10,10,new THREE.Vector3(0,0,1),1,0xA23400)
			wall45.mesh.position.set(20,5,40)
			level3Walls.push(wall45)
			class3.add(wall45.mesh)
			
			//第二關的steve
			let wall46 = new Wall(8,32,new THREE.Vector3(0,0,1),1,0xA23400)
			wall46.mesh.position.set(0,7,0);
			wall46.mesh.rotation.x=-Math.PI;
			level2Walls.push(wall46)
			class2.add(wall46.mesh)
			wall46.mesh.visible=false;
			
			let wall47 = new Wall(8,32,new THREE.Vector3(0,0,1),1,0xA23400)
			wall47.mesh.position.set(17,-7,0);
			level2Walls.push(wall47)
			class2.add(wall47.mesh)
			wall47.mesh.visible=false;
			
			let wall48 = new Wall(8,32,new THREE.Vector3(0,0,1),1,0xA23400)
			wall48.mesh.position.set(-17,-7,0);
			level2Walls.push(wall48)
			class2.add(wall48.mesh)
			wall48.mesh.visible=false;
			steveg.add(wall46.mesh,wall47.mesh,wall48.mesh)
			steveg.position.set(0,23,-224);
			scene.add(steveg);
			
			
			wall49 = new Wall(8,30,new THREE.Vector3(0,0,1),1,0xA23400)
			wall49.mesh.position.set(124,15,-300);
			wall49.mesh.rotation.y=-Math.PI/2;
			level2Walls.push(wall49)
			class2.add(wall49.mesh)
			wall49.mesh.visible=false;
			
            class2.add(class2g)
			for(var k = 0; k < level3Walls.length;k++){
				level3Walls[k].mesh.visible = false;
			//風扇
			
			/*
			let wall50 = new Wall(10,10,new THREE.Vector3(0,0,1),1,0xA23400)
			wall50.mesh.position.set(20,5,40)
			level3Walls.push(wall50)
			class3.add(wall50.mesh)
			
			let wall51 = new Wall(10,10,new THREE.Vector3(0,0,1),1,0xA23400)
			wall51.mesh.position.set(20,5,40)
			level3Walls.push(wall51)
			class3.add(wall51.mesh)
			*/
			
			//扇葉
			let wall52 = new Wall(5,30,new THREE.Vector3(0,0,1),1,0xA23400)
	        wall52.mesh.position.set(0,-15,7); 
			level3Walls.push(wall52)
			class3.add(wall52.mesh)
	        let wall53 = new Wall(5,30,new THREE.Vector3(0,0,1),1,0xA23400)
	        wall53.mesh.position.set(0,15,7); 
			level3Walls.push(wall53)
			class3.add(wall53.mesh)
	        let wall54 = new Wall(5,30,new THREE.Vector3(0,0,1),1,0xA23400)
	        wall54.mesh.rotation.z=Math.PI/2
	        wall54.mesh.position.set(15,0,7); 
			level3Walls.push(wall54)
			class3.add(wall54.mesh)
	        let wall55 = new Wall(5,30,new THREE.Vector3(0,0,1),1,0xA23400)
	        wall55.mesh.position.set(-15,0,7); 
	        wall55.mesh.rotation.z=-Math.PI/2
			level3Walls.push(wall55)
			class3.add(wall55.mesh)
	
	        fang.add(wall52.mesh,wall53.mesh,wall54.mesh,wall55.mesh);
	        fang.position.set(90,45,85);
	        class3.add(fang);
			
			}
		}
	
	}
	/*
	if(true){//時間
		let group = new THREE.Group();
		
		let Newton1 = buildNewtonCradle();
		let Newton2 = Newton1.clone();
		let Newton3 = Newton1.clone();
		let Newton4 = Newton1.clone();

		Newtons.push(Newton1,Newton2,Newton3,Newton4)
		Newtons[0].position.z = -1
		Newtons[1].position.z = 1
		Newtons[2].position.z = -3
		Newtons[3].position.z = 3
		group.add(stand(),Newton1,Newton2,Newton3,Newton4)
		group.position.set(90,10,85)
		group.scale.set(2.5,2.5,2.5)
		scene.add(group)
	}
	*/
	if(true){//風車
		let group = buildFan()
		group.position.set(90,10,85)
		class3.add(group)
	}
}
function buildEraser(){
	let group = new THREE.Group();
	
	let body = new THREE.Mesh(new THREE.BoxGeometry(24,5,12), new THREE.MeshBasicMaterial({color:0xdedcdc}))
	//body.position.x = 2
	
	let mesh1 = new THREE.Mesh(new THREE.BoxGeometry(15,2.5,5), new THREE.MeshBasicMaterial({color:"blue"}))
	mesh1.position.set(-4.49,1.75,4)
	let mesh2 = new THREE.Mesh(new THREE.BoxGeometry(15,2.5,3), new THREE.MeshBasicMaterial({color:"white"}))
	mesh2.position.set(-4.49,1.75,0)
	let mesh3 = new THREE.Mesh(new THREE.BoxGeometry(15,2.5,5), new THREE.MeshBasicMaterial({color:"black"}))
	mesh3.position.set(-4.49,1.75,-4)
	
	let mesh4 = new THREE.Mesh(new THREE.BoxGeometry(15,1,5), new THREE.MeshBasicMaterial({color:"white"}))
	mesh4.position.set(-4.49,0,4)
	let mesh5 = new THREE.Mesh(new THREE.BoxGeometry(15,1,5), new THREE.MeshBasicMaterial({color:"white"}))
	mesh5.position.set(-4.49,0,-4)
	
	let mesh6 = new THREE.Mesh(new THREE.BoxGeometry(15,2.5,5), new THREE.MeshBasicMaterial({color:"blue"}))
	mesh6.position.set(-4.49,-1.75,-4)
	let mesh7 = new THREE.Mesh(new THREE.BoxGeometry(15,2.5,3), new THREE.MeshBasicMaterial({color:"white"}))
	mesh7.position.set(-4.49,-1.75,0)
	let mesh8 = new THREE.Mesh(new THREE.BoxGeometry(15,2.5,5), new THREE.MeshBasicMaterial({color:"black"}))
	mesh8.position.set(-4.49,-1.75,4)	
	
	let mesh9 = new THREE.Mesh(new THREE.BoxGeometry(15,2.5,5), new THREE.MeshBasicMaterial({color:"black"}))
	mesh9.position.set(-4.49,1.75,-4)

	group.add(body,mesh1,mesh2,mesh3,mesh4,mesh5,mesh6,mesh7,mesh8)
	group.position.set(0,1.5,0)
	group.scale.set(0.5,0.5,0.5)
	
	
	let groupAll = new THREE.Group();
	groupAll.add(group);
	return groupAll
}
function buildPencil(){
	let group = new THREE.Group();
	
	let body = new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,45,6),new THREE.MeshBasicMaterial({color : 0xffc933}))
	let alu = new THREE.Mesh(new THREE.CylinderGeometry(1.6,1.6,2,32),new THREE.MeshBasicMaterial({color : 0x94938f}))
	let eraser = new THREE.Mesh(new THREE.CylinderGeometry(1.3,1.3,3,32),new THREE.MeshBasicMaterial({color : 0xd92b25}))
	
	let brown = new THREE.Mesh(new THREE.CylinderGeometry(1.2,1.2,45.01,32),new THREE.MeshBasicMaterial({color : 0xb37f4f}))
	let black = new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,45.02,32),new THREE.MeshBasicMaterial({color : 0x1c1c1b}))
	body.rotation.x = -Math.PI/2
	body.rotation.y = Math.PI / 180 * 90
	
	alu.rotation.x = -Math.PI / 2
	alu.position.z = 23.5;
	
	eraser.rotation.x = -Math.PI / 2
	eraser.position.z = 26;
	
	brown.rotation.x = -Math.PI/2
	black.rotation.x = -Math.PI/2
	group.add(body,alu,eraser,brown,black)
	group.position.set(0,1.5,22.5)
	let groupall = new THREE.Group();
	groupall.add(group)
	return groupall
	
}
function buildBook(){
	let group = new THREE.Group();
	
	let loader = new THREE.TextureLoader();
	let matArray = [];
	matArray.push(new THREE.MeshBasicMaterial({map : loader.load("https://i.imgur.com/VqZfkMV.jpg")}))
	matArray.push(new THREE.MeshBasicMaterial({map : loader.load("https://i.imgur.com/VqZfkMV.jpg")}))
	matArray.push(new THREE.MeshBasicMaterial({map : loader.load("https://i.imgur.com/5I081NU.png")}))
	matArray.push(new THREE.MeshBasicMaterial({map : loader.load("https://i.imgur.com/fgQf5yr.png")}))
	matArray.push(new THREE.MeshBasicMaterial({map : loader.load("https://i.imgur.com/VqZfkMV.jpg")}))
	matArray.push(new THREE.MeshBasicMaterial({map : loader.load("https://i.imgur.com/ZausXxX.png")}))
	let box = new THREE.Mesh(new THREE.BoxGeometry(50,5,30),matArray);
	box.rotation.y = -Math.PI/2
	box.position.set(0,-2.5,25);
	group.add(box)
	return group;
	
}
function buildRuler(){
	let group = new THREE.Group();
	let texture = new THREE.TextureLoader().load("https://i.imgur.com/m648HMn.png")
	let body = new THREE.Mesh(new THREE.BoxGeometry(40,0.1,6),new THREE.MeshBasicMaterial({map:texture,alphaTest:0.5,side:THREE.DoubleSide}))
	body.position.set(0,0.05,0)
	group.add(body)
	return group

}
function buildFan(){
	let group = new THREE.Group();
	
	var cylinder=new THREE.Mesh(new THREE.CylinderGeometry(5,5,20,32),new THREE.MeshPhongMaterial());
	cylinder.position.set(0,20,0)

	var cylinder2=new THREE.Mesh(new THREE.CylinderGeometry(7.5,7.5,10,32),new THREE.MeshPhongMaterial());
	cylinder2.position.set(0,35,0)
	cylinder2.rotation.x=Math.PI/2

	var sphere=new THREE.Mesh(new THREE.SphereGeometry(2,32,16),new THREE.MeshPhongMaterial({color:'blue'}));
	sphere.position.set(0,35,7);
	
	group.add(cylinder,cylinder2,sphere);
	
	var box = new THREE.Mesh(new THREE.BoxGeometry(5,30,0.5),new THREE.MeshPhongMaterial({color:'red'}));
	box.position.set(0,-15,7); 
	var box2 = new THREE.Mesh(new THREE.BoxGeometry(5,30,0.5),new THREE.MeshPhongMaterial({color:'red'}));
	box2.position.set(0,15,7); 
	var box3 = new THREE.Mesh(new THREE.BoxGeometry(5,30,0.5),new THREE.MeshPhongMaterial({color:'red'}));
	box3.rotation.z=Math.PI/2
	box3.position.set(15,0,7); 
	var box4 = new THREE.Mesh(new THREE.BoxGeometry(5,30,0.5),new THREE.MeshPhongMaterial({color:'red'}));
	box4.position.set(-15,0,7); 
	box4.rotation.z=-Math.PI/2
	
	boxg.add(box,box2,box3,box4);
	boxg.position.set(0,35,0);
	group.add(boxg)
	
	let stand1 = new THREE.Mesh(new THREE.BoxGeometry(20,2.5,10),new THREE.MeshBasicMaterial({color:"green"}));
	stand1.position.set(0,8.75,0)
	
	let stand2 = new THREE.Mesh(new THREE.BoxGeometry(7,2.5,10),new THREE.MeshBasicMaterial({color:"yellow"}));
	stand2.position.set(-6.5,6.25,0)
	let stand3 = new THREE.Mesh(new THREE.BoxGeometry(7,2.5,10),new THREE.MeshBasicMaterial({color:"pink"}));
	stand3.position.set(6.5,6.25,0)
	
	let stand4 = new THREE.Mesh(new THREE.BoxGeometry(37.5,5,7.5),new THREE.MeshBasicMaterial({color:"blue"}));
	stand4.position.set(0,2.5,8.75)
	
	let stand5 = new THREE.Mesh(new THREE.BoxGeometry(15.25,5,17.5),new THREE.MeshBasicMaterial({color:"white"}));
	stand5.position.set(10.625,2.5,-3.75)
	
	let stand6 = new THREE.Mesh(new THREE.BoxGeometry(15.25,5,17.5),new THREE.MeshBasicMaterial({color:"white"}));
	stand6.position.set(-10.625,2.5,-3.75)
	
	let plane = new THREE.Mesh(new THREE.PlaneGeometry(6,17.5),new THREE.MeshBasicMaterial({color:"pink",side:THREE.DoubleSide}))
	plane.position.set(0,2.5,-3.4)
	plane.rotation.x = Math.PI /180 * 73
	
	group.add(stand1,stand2,stand3,stand4,stand5,stand6,plane)
	group.rotation.y = -Math.PI / 2
	
	return group
}
function buildNewtonCradle(){
	let group = new THREE.Group();
	let box = new THREE.Mesh(new THREE.BoxGeometry(20,2,18),new THREE.MeshNormalMaterial())
	box.position.set(0,1,0)
	
	let group2 = new THREE.Group();
	let sphere = new THREE.Mesh(new THREE.SphereGeometry(1,32),new THREE.MeshNormalMaterial())
	sphere.position.set(0,-10.4,0)

	let cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.25,0.25,0.125,32,32),new THREE.MeshNormalMaterial())
	cylinder.position.set(0,-9.4,0)
	let line1 = new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,10),new THREE.MeshNormalMaterial());
	line1.position.set(1.75,9,0)
	line1.position.y = -4.7
	line1.rotation.z = -Math.PI / 180 * 20

	let line2 = new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,10),new THREE.MeshNormalMaterial());
	line2.position.set(-1.75,9,0)
	line2.position.y = -4.7
	line2.rotation.z = Math.PI / 180 * 20
	group2.add(sphere,cylinder,line1,line2)
	group2.position.y = 13.5;
	
	return group2;

}
function stand(){
	let group = new THREE.Group();
	let group1 = new THREE.Group();
	
	let cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.3,10,32,32),new THREE.MeshNormalMaterial())
	cylinder.rotation.x = Math.PI/2
	cylinder.rotation.y = Math.PI/2
	cylinder.position.set(0,0,0)
	
	let torus1 = new THREE.Mesh(new THREE.TorusGeometry( 0.302, 0.02, 16, 100 ),new THREE.MeshNormalMaterial())
	torus1.position.z = 1
	
	let torus2 = new THREE.Mesh(new THREE.TorusGeometry( 0.302, 0.02, 16, 100 ),new THREE.MeshNormalMaterial())
	torus2.position.z = -1
	
	group1.add(cylinder,torus1,torus2)
	group1.position.set(3.56,11.8,0)
	
	group.add(group1.clone())
	group1.position.set(-3.56,11.8,0)
	group.add(group1)
	
	let group2 = new THREE.Group();
	let torus11 = new THREE.Mesh(new THREE.TorusGeometry( 0.302, 0.02, 16, 100 ),new THREE.MeshNormalMaterial())
	torus11.position.z = 3
	
	let torus22 = new THREE.Mesh(new THREE.TorusGeometry( 0.302, 0.02, 16, 100 ),new THREE.MeshNormalMaterial())
	torus22.position.z = -3
	
	group2.add(torus11,torus22)
	group2.position.set(3.56,11.8,0)
	
	group.add(group2.clone())
	group2.position.set(-3.56,11.8,0)
	group.add(group2)
	
	
	let torus3 = new THREE.Mesh(new THREE.TorusGeometry( 0.3, 0.3, 32, 100,Math.PI / 2),new THREE.MeshNormalMaterial())
	torus3.position.set(-3.56,11.5,-5)
	torus3.rotation.y = -Math.PI / 2
	torus3.rotation.z = Math.PI / 2
	group.add(torus3.clone())
	torus3.position.set(3.56,11.5,-5)
	group.add(torus3.clone())
	torus3.rotation.y = 0
	torus3.rotation.y = Math.PI / 2
	torus3.position.set(3.56,11.5,5)
	group.add(torus3.clone())
	torus3.position.set(-3.56,11.5,5)
	group.add(torus3.clone())
	
	let cylinder2 = new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.3,12,32,32),new THREE.MeshNormalMaterial());
	cylinder2.position.set(3.56,5.5,5.3)
	group.add(cylinder2.clone())
	
	cylinder2.position.set(-3.56,5.5,5.3)
	group.add(cylinder2.clone())
	
	cylinder2.position.set(3.56,5.5,-5.3)
	group.add(cylinder2.clone())
	
	cylinder2.position.set(-3.56,5.5,-5.3)
	group.add(cylinder2.clone())
	
	let box = new THREE.Mesh(new THREE.BoxGeometry(10,2,15),new THREE.MeshNormalMaterial());
	box.position.y = -1
	group.add(box)
	let groupAll = new THREE.Group();
	group.position.y = 2;
	groupAll.add(group);
	return groupAll;
	
}
function buildGoal(){
	let loader = new THREE.TextureLoader();
  loader.crossOrigin = '';
  let texture = loader.load('https://i.imgur.com/Ze2KEuN.png');
  let texture2 = loader.load('https://i.imgur.com/Ze2KEuN.png');
  texture2.repeat.set(1,4/8)

  var texMat = new THREE.MeshBasicMaterial({
    map: texture,
    //transparent: true,
    alphaTest: 0.5,
    side:THREE.DoubleSide
  });
  var texMat2 = new THREE.MeshBasicMaterial({
    map: texture2,
    //transparent: true,
    alphaTest: 0.5,
    side:THREE.DoubleSide
  });
  var net = new THREE.Mesh(new THREE.PlaneGeometry(60, 55), texMat);
  net.position.set(0,0,-30)
  net.rotation.x=Math.PI/8;
  var net2 = new THREE.Mesh(new THREE.PlaneGeometry(60, 20), texMat2);
  net2.position.set(0,25,-10)
  net2.rotation.x=Math.PI/2;
  var pole=new THREE.Mesh(new THREE.CylinderGeometry(2,2,50,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole.position.set(30,0,0);
  var pole2=new THREE.Mesh(new THREE.CylinderGeometry(2,2,50,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole2.position.set(-30,0,0);
  var pole3=new THREE.Mesh(new THREE.CylinderGeometry(2,2,60,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole3.rotation.z=Math.PI/2;
  pole3.position.set(0,25,0);
  var pole4=new THREE.Mesh(new THREE.CylinderGeometry(2,2,60,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole4.rotation.z=Math.PI/2;
  pole4.position.set(0,25,-20);
  var pole5=new THREE.Mesh(new THREE.CylinderGeometry(2,2,20,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole5.rotation.x=Math.PI/2;
  pole5.position.set(30,25,-10);
  var pole6=new THREE.Mesh(new THREE.CylinderGeometry(2,2,20,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole6.rotation.x=Math.PI/2;
  pole6.position.set(-30,25,-10);
  var pole7=new THREE.Mesh(new THREE.CylinderGeometry(2,2,55,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole7.position.set(30,0,-30);
  pole7.rotation.x=Math.PI/8
  var pole8=new THREE.Mesh(new THREE.CylinderGeometry(2,2,55,32),new THREE.MeshPhongMaterial({color:0xffffff}));
  pole8.position.set(-30,0,-30);
  pole8.rotation.x=Math.PI/8
  
  var uvs = new Float32Array( quad_uvs);
  var geometry = new THREE.BufferGeometry();

  var indices = [];
  var vertices = [];
  
  vertices.push(0,0,0, 20,0,0, 40,-50,0, 0,-50,0);
  indices.push(3, 0, 1, 1, 2, 3);
  
	geometry.setIndex(indices);
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );
  geometry.computeVertexNormals();
  let material = new THREE.MeshBasicMaterial({
    map: texture,
    alphaTest: 0.5,
    side:THREE.DoubleSide
  });
	let pointer = new THREE.Mesh(geometry,material);
  pointer.rotation.y=Math.PI/2;
  pointer.position.set(30,25,0)
  let pointer2 = new THREE.Mesh(geometry,material);
  pointer2.rotation.y=Math.PI/2;
  pointer2.position.set(-30,25,0)
  var goal=new THREE.Group();
  goal.add(pointer2,pointer,pole,pole2,pole3,pole4,pole5,pole6,pole7,pole8,net,net2);
  scene.add(goal);
  goal.rotation.y=-Math.PI/2;
  goal.position.set(140,22,-300)
}
export {buildTerrain,table1,table2,table3,planes,walls,cylinders,holes,floors,arcWalls}
export {class1Rotate,class2Rotate,class3Rotate,setClassVisible}
export {obstacle1,obstacle2,obstacle3,car,car2,redhorse2G,boxg,steveg,wall49,fang}