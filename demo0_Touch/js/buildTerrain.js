import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {ParametricGeometry} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/geometries/ParametricGeometry.js';
import {FinitePlane,Wall} from './terrain.js'
import {scene,sceneMap,renderer} from './render.js'
var table,floor5;

var walls = [],holes = [],cylinders = [],planes = [],floors = [];
var class1 = new THREE.Group(),class1Rotate = new THREE.Group();

var obstacle1=new THREE.Group();
var obstacle2=new THREE.Group();
var obstacle3=new THREE.Group();
var car,car2;

function buildTerrain(){
	buildPlane();
	buildWalls();
	buildholes();
	buildCylinder();
	buildfloors();

	class1.position.z = 30;
	class1Rotate.add(class1)
	
	sceneMap.add(class1Rotate)
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
	 
	class1.add(table.clone(),box1.clone())
	//class2
	var floor2 = new THREE.Mesh(new THREE.PlaneGeometry(50,150), new THREE.MeshPhongMaterial({map: texture,side:THREE.DoubleSide}));
	floor2.material.map.repeat.set( 3, 3 );
	floor2.rotation.x = -Math.PI / 2;
	floor2.position.y = 0.02;
	floor2.position.z = -200;
	floor.receiveShadow = true;
	  
	plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), floor2, 150 * 1.5, table);
	plane.update()
	planes.push(plane);
	  
	var floor3 = new THREE.Mesh(new THREE.PlaneGeometry(150,50), new THREE.MeshPhongMaterial({map: texture,side:THREE.DoubleSide}));
	floor3.material.map.repeat.set( 3, 3 );
	floor3.rotation.x = -Math.PI / 2;
	floor3.position.y = 0.02;
	floor3.position.z = -300;
	floor3.position.x = 50;
	floor.receiveShadow = true;
	  
	plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), floor3, 150 * 1.5, table);
	plane.update()
	planes.push(plane);
  
    var hole2= new THREE.Mesh(new THREE.PlaneGeometry(50,50),new THREE.MeshPhongMaterial({map: texture2,side:THREE.DoubleSide,alphaMap:alpha,alphaTest: 0.1,}));
	hole2.rotation.x=-Math.PI/2;  
	hole2.position.set(150,0,-300);
	hole2.rotation.z = Math.PI/2 ;
	hole2.material.map.repeat.set(3, 3);
	hole2.receiveShadow = true;

	plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1),hole2, 50 * 1.5, table);
	plane.update()
	planes.push(plane);

	//class3

	var floor6 = new THREE.Mesh(new THREE.PlaneGeometry(150,50), new THREE.MeshPhongMaterial({map: texture,side:THREE.DoubleSide}));
	floor6.material.map.repeat.set( 3, 3 );
	floor6.rotation.x = -Math.PI / 2;
	floor6.rotation.y = Math.PI / 2/3;
	floor6.position.y = 42.5;
	floor6.position.z = -300;
	floor6.position.x = 339.8;
	floor6.receiveShadow = true;
	  
	plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), floor6, 150 * 1.5, table);
	plane.update()
	planes.push(plane);
	  
	var floor7 = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), new THREE.MeshPhongMaterial({map: texture,side:THREE.DoubleSide}));
	floor7.material.map.repeat.set( 3, 3 );
	floor7.rotation.x = -Math.PI / 2;
	floor7.position.y = 5;
	floor7.position.z = -300;
	floor7.position.x = 429.8;
	floor7.receiveShadow = true;
	  
	plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1), floor7, 150 * 1.5, table);
	plane.update()
	planes.push(plane);

	var hole3= new THREE.Mesh(new THREE.PlaneGeometry(50,50),new THREE.MeshPhongMaterial({map: texture2,side:THREE.DoubleSide,alphaMap:alpha,alphaTest: 0.1,}));
	hole3.rotation.x=-Math.PI/2;  
	hole3.position.set(479.8,5,-300);
	hole3.rotation.z = Math.PI/2 ;
	hole3.material.map.repeat.set(3, 3);
	hole3.receiveShadow = true;

	plane = new FinitePlane(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 1),hole3, 50 * 1.5, table);
	plane.update()
	planes.push(plane);

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
  for(var i = 0; i < 4; i++)
	class1.add(walls[i].mesh.clone())
  
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

  //時間性關卡:抬升牆壁 class 2
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
  obstacle1.position.z =-200;
  obstacle2.position.z =-200;
  obstacle3.position.z =-200;
  
  //時間性關卡:車子
  car = new THREE.Group();
  for (var i = 0; i < 4; i++) {
    if (i < 2) {
      let x = new Wall(15,10, new THREE.Vector3(0, 0, -1),1);
      x.update();
      walls.push(x);
    }
	else {
      let x = new Wall(5,10, new THREE.Vector3(0, 0, -1),1);
      x.update();
      walls.push(x);
    }
  }
  
  var cargeometry = new THREE.BoxGeometry(5, 10, 15);
  var carmaterial = new THREE.MeshPhongMaterial({
      color: 0xA23400,
      shininess: 200,
      transparent: true,
      opacity: 1
    })
  var carmesh= new THREE.Mesh(cargeometry, carmaterial);
  carmesh.position.set(0,2.5,-3)
  
  car.add(carmesh);
  car.add(walls[28].mesh);
  car.add(walls[29].mesh);
  car.add(walls[31].mesh);
  car.add(walls[30].mesh);
  //car.rotation.y = -Math.PI / 2;
  car.position.set(75,2.5,-300)
  
  scene.add(car);
  
  
  walls[28].mesh.rotation.y = -Math.PI / 2;
  walls[29].mesh.rotation.y = Math.PI / 2;
  walls[31].mesh.rotation.y = Math.PI;

  walls[28].mesh.position.set(-2.5, 2.5, -3)
  walls[29].mesh.position.set(2.5, 2.5, -3)
  walls[30].mesh.position.set(0, 2.5, 4.5)
  walls[31].mesh.position.set(0, 2.5, -10.5)
  
  car2 = new THREE.Group();
  for (var i = 0; i < 4; i++) {
    if (i < 2) {
      let x = new Wall(15,10, new THREE.Vector3(0, 0, -1),1);
      x.update();
      walls.push(x);
    }
	else {
      let x = new Wall(5,10, new THREE.Vector3(0, 0, -1),1);
      x.update();
      walls.push(x);
    }
  }
  
  var carmesh2= new THREE.Mesh(cargeometry, carmaterial);
  carmesh2.position.set(0,2.5,-3)
  
  car2.add(carmesh2);
  car2.add(walls[32].mesh);
  car2.add(walls[33].mesh);
  car2.add(walls[35].mesh);
  car2.add(walls[34].mesh);
  //car.rotation.y = -Math.PI / 2;
  car2.position.set(125,2.5,-300)
  
  scene.add(car2);
  
  
  walls[32].mesh.rotation.y = -Math.PI / 2;
  walls[33].mesh.rotation.y = Math.PI / 2;
  walls[35].mesh.rotation.y = Math.PI;

  walls[32].mesh.position.set(-2.5, 2.5, -3)
  walls[33].mesh.position.set(2.5, 2.5, -3)
  walls[34].mesh.position.set(0, 2.5, 4.5)
  walls[35].mesh.position.set(0, 2.5, -10.5)
  
  //第二關
   for (var i = 0; i < 3; i++) {
    if (i < 2) {
      let x = new Wall(50,5, new THREE.Vector3(0, 0, -1));
      x.update();
      walls.push(x);
    }
	else {
      let x = new Wall(200,5, new THREE.Vector3(0, 0, -1));
      x.update();
      walls.push(x);
    }
  }
  walls[37].mesh.rotation.y = -Math.PI / 2;
  walls[38].mesh.rotation.y = -Math.PI / 2;

  walls[36].mesh.position.set(0, 2.5, -125)
  walls[37].mesh.position.set(175, 2.5, -300)
  walls[38].mesh.position.set(-25, 2.5, -225)
  
  walls[36].mesh.visible = false;
  
  
  let x = new Wall(95,5, new THREE.Vector3(0, 0, -1));
      x.update();
      walls.push(x);
  walls[39].mesh.position.set(22.5, 2.5, -325)
  
  
  x = new Wall(150,5, new THREE.Vector3(0, 0, -1));
  x.update();
  walls.push(x);
  walls[40].mesh.rotation.y = -Math.PI / 2;
  walls[40].mesh.position.set(25, 2.5, -200)
  
  for (var i = 0; i < 3; i++) {
      let x = new Wall(42.5,5, new THREE.Vector3(0, 0, -1));
      x.update();
      walls.push(x);
  }
  walls[41].mesh.position.set(100, 2.5, -275)
  walls[42].mesh.position.set(47.5, 2.5, -275)
  walls[43].mesh.position.set(152.5, 2.5, -275)
  
  
  for (var i = 0; i < 2; i++) {
      let x = new Wall(42.5,5, new THREE.Vector3(0, 0, -1));
      x.update();
      walls.push(x);
  }
  walls[44].mesh.position.set(100, 2.5, -325)
  walls[45].mesh.position.set(152.5, 2.5, -325)
  
  //class 3
  
  for(var i=0;i<8;i++)
   {
	 if (i < 4) {
      let x = new Wall(50,5, new THREE.Vector3(0, 0, -1));
      x.update();
      walls.push(x);
    }
     else if(i>=4&&i<6)
     {
       let x = new Wall(100,5, new THREE.Vector3(0, 0, -1));
      x.update();
      walls.push(x);
     }
     else{
       let x = new Wall(150,5, new THREE.Vector3(0, 0, -1));
      x.update();
      walls.push(x);
	 }		 
   }
   walls[46].mesh.rotation.y = -Math.PI / 2;
   walls[47].mesh.rotation.y = -Math.PI / 2;
   walls[52].mesh.rotation.z = -Math.PI / 2/3;
   walls[53].mesh.rotation.z = -Math.PI / 2/3;
   
   walls[46].mesh.position.set(225, 82.5, -300);
   walls[47].mesh.position.set(504.8,7.5,-300);
   walls[48].mesh.position.set(250,82.5,-325);
   walls[49].mesh.position.set(250.8,82.5,-275);
   walls[50].mesh.position.set(454.8,7.5,-325);
   walls[51].mesh.position.set(454.8,7.5,-275);
   walls[52].mesh.position.set(339.8,45,-325);
   walls[53].mesh.position.set(339.8,45,-275);
   
   
   walls[46].mesh.visible = false;
   
    for(var i=0;i<6;i++)
   {
	 if (i < 2) {
      let x = new Wall(30,5, new THREE.Vector3(0, 0, -1));
      x.update();
      walls.push(x);
    }
	else
	{
	  let x = new Wall(2.5,5,new THREE.Vector3(0,0,1),1);
	  x.update();
	  walls.push(x)
	}
   }
   walls[54].mesh.position.set(0, 3, 0)
   walls[55].mesh.position.set(0, 3, 0)    
   walls[56].mesh.position.set(-15, 3, 0)
   walls[56].mesh.rotation.y = -Math.PI / 2;
   walls[57].mesh.position.set(-15, 3, 0)
   walls[57].mesh.rotation.y = -Math.PI / 2;
   walls[58].mesh.position.set(15, 3, 0)
   walls[58].mesh.rotation.y = Math.PI / 2;
   walls[59].mesh.position.set(15, 3, 0)
   walls[59].mesh.rotation.y = Math.PI / 2;
   
  var separator1=new THREE.Group();
  var separator2=new THREE.Group();
  
  separator1.add(walls[54].mesh,walls[56].mesh,walls[58].mesh); 
  scene.add(separator1);
  separator2.add(walls[55].mesh,walls[57].mesh,walls[59].mesh); 
  scene.add(separator2);
  
  
  separator1.position.set(390,12.5,-290)
  separator1.rotation.z=-Math.PI/2/3;
  separator2.position.set(390,12.5,-310)
  separator2.rotation.z=-Math.PI/2/3;
  
  for(var i=0;i<4;i++)
   {
	 if (i < 2) {
      let x = new Wall(15,5, new THREE.Vector3(0, 0, -1));
      x.update();
      walls.push(x);
    }
	else
	{
	  let x = new Wall(2.5,5,new THREE.Vector3(0,0,1),1);
	  x.update();
	  walls.push(x)
	}
   }
   walls[60].mesh.position.set(0, 3, 0)
   walls[61].mesh.position.set(0, 3, 0)    
   walls[62].mesh.position.set(-7.5, 3, 0)
   walls[62].mesh.rotation.y = -Math.PI / 2;
   walls[63].mesh.position.set(7.5, 3, 0)
   walls[63].mesh.rotation.y = Math.PI / 2;
   
   var separator3=new THREE.Group();
    separator3.add(walls[60].mesh,walls[62].mesh); 
    scene.add(separator3);
	separator3.position.set(430,4,-283)
	separator3.rotation.y=-Math.PI/2;
	
    var separator4=new THREE.Group();
    separator4.add(walls[61].mesh,walls[63].mesh); 
    scene.add(separator4);
	separator4.position.set(430,4,-317)
	separator4.rotation.y=-Math.PI/2;
	
/*
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
*/
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
	
	class1.add(ballhole.clone())
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
    mesh2.position.set(161.25,-0.205,-288.45);
    mesh2.ID = "hole";
	mesh2.level = 2;
	mesh2.visible = false
	holes.push(mesh2)

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
	ballhole2.position.set(161.25,0,-288.45);

	let mesh3 = new THREE.Mesh(geometry2, material);
	scene.add(mesh3);
	mesh3.meshFunc = meshFunc2;
    mesh3.inMeshFunc = inMeshFunc2;
    mesh3.meshDifFunc = meshDifFunc2;
    mesh3.rotation.x = -Math.PI/2
    mesh3.position.set(491.05,-4.795,-288.45);
    mesh3.ID = "hole";
	mesh3.level = 3;
	mesh3.visible = false
	holes.push(mesh3)
	
 	var ballhole3 = new THREE.Group();

	var cylinder3 = new THREE.Mesh( geometry4, material );
	cylinder3.castShadow = true;
	cylinder3.receiveShadow = true;
	cylinder3.position.y = -3;
	cylinder3.ID = "wall";
	cylinder3.r = 2.576;
	cylinder3.height = 6;
	holes.push(cylinder3);
	
	ballhole3.add(cylinder3);
	
	const block3 = new THREE.Mesh( geometry, material2);
	
	block3.position.y=-6;
	block3.ID = "bottom";
	block3.r = 2.576
	block3.normal = new THREE.Vector3(0,1,0);
	holes.push(block3)
	ballhole3.add(block3)
	scene.add(ballhole3);
	ballhole3.position.set(491.05,5,-288.45);  	
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
	
	var pillar1 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillar1.R = 2;
	pillar1.height = 6
	pillar1.position.set(25,3,20);
	pillar1.ID = "wall"
	pillar1.castShadow = true;
	scene.add(pillar1)
	cylinders.push(pillar1)

	var pillar2 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillar2.R = 2;
	pillar2.height = 6
	pillar2.position.set(-25,3,20);
	pillar2.ID = "wall"
	pillar2.castShadow = true;
	scene.add(pillar2)
	cylinders.push(pillar2)
	
	var pillar3 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillar3.R = 2;
	pillar3.height = 6
	pillar3.position.set(-25,3,-80);
	pillar3.ID = "wall"
	pillar3.castShadow = true;
	scene.add(pillar3)
	cylinders.push(pillar3)
	
	var pillar4 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	pillar4.R = 2;
	pillar4.height = 6
	pillar4.position.set(25,3,-80);
	pillar4.ID = "wall"
	pillar4.castShadow = true;
	scene.add(pillar4)
	cylinders.push(pillar4)
	
	class1.add(pillar1.clone(),pillar2.clone(),pillar3.clone(),pillar4.clone())
	
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
	
	//第二關柱子
	var class31 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class31.R = 2;
	class31.height = 6
	class31.position.set(25,3,-125);
	class31.ID = "wall"
	class31.castShadow = true;
	scene.add(class31)
	cylinders.push(class31)
	
	var class32 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class32.R = 2;
	class32.height = 6
	class32.position.set(-25,3,-125);
	class32.ID = "wall"
	class32.castShadow = true;
	scene.add(class32)
	cylinders.push(class32)
	
	var class33 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class33.R = 2;
	class33.height = 6
	class33.position.set(25,3,-275);
	class33.ID = "wall"
	class33.castShadow = true;
	scene.add(class33)
	cylinders.push(class33)
	
	var class34 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class34.R = 2;
	class34.height = 6
	class34.position.set(-25,3,-325);
	class34.ID = "wall"
	class34.castShadow = true;
	scene.add(class34)
	cylinders.push(class34)
	
	var class35 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class35.R = 2;
	class35.height = 6
	class35.position.set(175,3,-275);
	class35.ID = "wall"
	class35.castShadow = true;
	scene.add(class35)
	cylinders.push(class35)
	
	var class36 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class36.R = 2;
	class36.height = 6
	class36.position.set(175,3,-325);
	class36.ID = "wall"
	class36.castShadow = true;
	scene.add(class36)
	cylinders.push(class36)
	
	
	var class37 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class37.R = 2;
	class37.height = 6
	class37.position.set(130,3,-275);
	class37.ID = "wall"
	class37.castShadow = true;
	scene.add(class37)
	cylinders.push(class37)
	
	var class38 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class38.R = 2;
	class38.height = 6
	class38.position.set(120,3,-275);
	class38.ID = "wall"
	class38.castShadow = true;
	scene.add(class38)
	cylinders.push(class38)
	
	var class39 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class39.R = 2;
	class39.height = 6
	class39.position.set(70,3,-275);
	class39.ID = "wall"
	class39.castShadow = true;
	scene.add(class39)
	cylinders.push(class39)
	
	var class391 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class391.R = 2;
	class391.height = 6
	class391.position.set(80,3,-275);
	class391.ID = "wall"
	class391.castShadow = true;
	scene.add(class391)
	cylinders.push(class391)
	
	var class392 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class392.R = 2;
	class392.height = 6
	class392.position.set(130,3,-325);
	class392.ID = "wall"
	class392.castShadow = true;
	scene.add(class392)
	cylinders.push(class392)
	
	var class393 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class393.R = 2;
	class393.height = 6
	class393.position.set(120,3,-325);
	class393.ID = "wall"
	class393.castShadow = true;
	scene.add(class393)
	cylinders.push(class393)
	
	var class394 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class394.R = 2;
	class394.height = 6
	class394.position.set(70,3,-325);
	class394.ID = "wall"
	class394.castShadow = true;
	scene.add(class394)
	cylinders.push(class394)
	
	var class395 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class395.R = 2;
	class395.height = 6
	class395.position.set(80,3,-325);
	class395.ID = "wall"
	class395.castShadow = true;
	scene.add(class395)
	cylinders.push(class395)
	
	///class 3
	
	var class41 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class41.R = 2;
	class41.height = 6
	class41.position.set(225,83,-325);
	class41.ID = "wall"
	class41.castShadow = true;
	scene.add(class41)
	cylinders.push(class41)
	
	var class42 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class42.R = 2;
	class42.height = 6
	class42.position.set(225,83,-275);
	class42.ID = "wall"
	class42.castShadow = true;
	scene.add(class42)
	cylinders.push(class42)
	
	var class43 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class43.R = 2;
	class43.height = 6
	class43.position.set(275,83,-325);
	class43.ID = "wall"
	class43.castShadow = true;
	scene.add(class43)
	cylinders.push(class43)
	
	var class44 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class44.R = 2;
	class44.height = 6
	class44.position.set(275,83,-275);
	class44.ID = "wall"
	class44.castShadow = true;
	scene.add(class44)
	cylinders.push(class44)
	
	var class45 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class45.R = 2;
	class45.height = 6
	class45.position.set(404.8,8,-275);
	class45.ID = "wall"
	class45.castShadow = true;
	scene.add(class45)
	cylinders.push(class45)
	
	var class46 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class46.R = 2;
	class46.height = 6
	class46.position.set(404.8,8,-325);
	class46.ID = "wall"
	class46.castShadow = true;
	scene.add(class46)
	cylinders.push(class46)
	
	var class47 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class47.R = 2;
	class47.height = 6
	class47.position.set(504.8,8,-275);
	class47.ID = "wall"
	class47.castShadow = true;
	scene.add(class47)
	cylinders.push(class47)
	
	var class48 = new THREE.Mesh(new THREE.CylinderGeometry(2,2,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class48.R = 2;
	class48.height = 6
	class48.position.set(504.8,8,-275);
	class48.ID = "wall"
	class48.castShadow = true;
	scene.add(class48)
	cylinders.push(class48)
	
	var class49 = new THREE.Mesh(new THREE.CylinderGeometry(3,3,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class49.R = 3;
	class49.height = 6
	class49.position.set(310,63,-310);
	class49.rotation.z=-Math.PI/2/3;
	class49.ID = "wall"
	class49.castShadow = true;
	scene.add(class49)
	cylinders.push(class49)
	
	var class410 = new THREE.Mesh(new THREE.CylinderGeometry(3,3,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class410.R = 3;
	class410.height = 6
	class410.position.set(310,63,-290);
	class410.rotation.z=-Math.PI/2/3;
	class410.ID = "wall"
	class410.castShadow = true;
	scene.add(class410)
	cylinders.push(class410)
	
	var class411 = new THREE.Mesh(new THREE.CylinderGeometry(3,3,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class411.R = 3;
	class411.height = 6
	class411.position.set(330,51.5,-300);
	class411.rotation.z=-Math.PI/2/3;
	class411.ID = "wall"
	class411.castShadow = true;
	scene.add(class411)
	cylinders.push(class411)
	
	var class412 = new THREE.Mesh(new THREE.CylinderGeometry(3,3,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class412.R = 3;
	class412.height = 6
	class412.position.set(330,51.5,-316);
	class412.rotation.z=-Math.PI/2/3;
	class412.ID = "wall"
	class412.castShadow = true;
	scene.add(class412)
	cylinders.push(class412)
	
	var class413 = new THREE.Mesh(new THREE.CylinderGeometry(3,3,6,64),new THREE.MeshPhongMaterial({color:0x642100,clippingPlanes: [localPlane]}));
	class413.R = 3;
	class413.height = 6
	class413.position.set(330,51.5,-284);
	class413.rotation.z=-Math.PI/2/3;
	class413.ID = "wall"
	class413.castShadow = true;
	scene.add(class413)
	cylinders.push(class413)
	
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
	//class 3
	var geometry3 = new ParametricGeometry(function(u0, v0, pos) {
		let x = 225 + 50 * u0;
		let z = -325 + 50 * v0;
		pos.set(x, heightFunc(x, z)+80, z);
	}, 40, 40);
	var convertUV3 = function(x,z){
		return [(x - 225) / 50,(z + 325) / 50]
	}
	
	var floor4 = new THREE.Mesh(geometry3, new THREE.MeshPhongMaterial({map: texture,side:THREE.DoubleSide}));
    floor4.material.map.repeat.set( 3, 3 );
    floor4.y = 80;
    floor4.receiveShadow = true;
	floor4.heightFunc = heightFunc;
	floor4.inHeightFunc = inHeightFunc;
	floor4.convertUV = convertUV3;

	floors.push(floor4)
	scene.add(floor4)
	
}
export {buildTerrain,table,planes,walls,cylinders,holes,floors,class1Rotate}
export {obstacle1,obstacle2,obstacle3,car,car2}