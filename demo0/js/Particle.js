import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {planes,holes,cylinders,walls,floors} from './buildTerrain.js';
import {balls} from './main.js'
import {scene,start} from './render.js'
import {countSwingReset} from './mouseEvent.js'
var level = 1
class Particle {
  constructor(mesh,dt,id) {
	  
    this.vel = new THREE.Vector3(0, 0, 0);
    this.pos = new THREE.Vector3(0,1,10);
    this.force = new THREE.Vector3(0, -10, 0);
    this.torque = new THREE.Vector3(0.0001, 0, 0);
    this.lastP = new THREE.Vector3(0, 0, 0)
	
    this.mesh = mesh;
	mesh.position.copy(this.pos)
	this.mesh.castShadow = true;
	this.mesh.receiveShadow = true;
    this.n = new THREE.Vector3(0, 1, 0);
    this.m = 16;
    this.delta = 0.082; //滾動摩擦係數
    this.theta = 0; //轉動的角度

	this.dt = dt;
	this.ID = id;
    this.nowIsFlyC = true;
    this.nowIsFlyP = true;
	this.nowIsFlyF = true;
    this.us = 6;
	this.r = 1;
	this.testRunInHole = false;

    scene.add(this.mesh);

  }
  update() {
    var dtt = this.dt;
    var rollingWS = new THREE.Vector3();
    var N = new THREE.Vector3(0, 0, 0);

    var velH = new THREE.Vector3(0, 0, 0);
    var velV = new THREE.Vector3(0, 0, 0);
    rollingWS.copy(this.vel.clone().normalize().multiplyScalar(-this.force.dot(this.n)).multiplyScalar(this.m * this.delta * dtt))
    velH.copy(this.vel.clone().projectOnPlane(this.n));
    velV.copy(this.vel.clone().projectOnVector(this.n));	
	
	
    if (!this.nowIsFlyP || !this.nowIsFlyC || !this.nowIsFlyF) {
      if (velH.length() >= rollingWS.length())
        velH.sub(rollingWS)
      else
        velH.copy(new THREE.Vector3(0, 0, 0));
	  this.theta = this.vel.length() * dtt / this.r;
    }
	this.mesh.rotateOnWorldAxis(this.n.clone().cross(this.vel).normalize(), this.theta);	

    this.vel.copy(velH.add(velV))
	if(start)
		this.vel.add(this.force.clone().multiplyScalar(this.m).multiplyScalar(dtt));
    this.pos.add(this.vel.clone().multiplyScalar(dtt));

	  this.checkHole(holes)
		if(this.inHole != true){
			this.collidingPlane(planes);
			
			this.checkFloor(floors)

			this.checkWall(walls)

			this.checkCylinder(cylinders)
		
		}
    this.lastP.copy(this.pos);

    this.mesh.position.copy(this.pos);
  }
  checkHole(holes) {
    const COR = 0.64;

    for (var i = 0; i < holes.length; i++) {
			let hole = holes[i];
			let temp = new THREE.Vector3(0,0,0)
			temp.copy(hole.worldToLocal(this.pos.clone()))
			
			if(hole.ID == "hole" && temp.x * temp.x + temp.y * temp.y <= 2.52 * 2.52 && hole.level == level){
				this.inHole = true;
				this.nowIsFlyP = true;
				this.nowIsFlyC = true;
				this.nowIsFlyF = true;
			}
			else if (hole.ID == "hole" && temp.x * temp.x + temp.y * temp.y >= 2.52 * 2.52 && hole.level == level){
				this.inHole = false;
			}
			
      var ballNowPos = new THREE.Vector3(0, 0, 0)
      ballNowPos.copy(hole.worldToLocal(this.pos.clone()))

      var ballLastPos = new THREE.Vector3(0, 0, 0);
      ballLastPos.copy(hole.worldToLocal(this.lastP.clone()));
	  
	  if(hole.ID == "hole")
		var ans = hole.inMeshFunc(ballNowPos);
	  
      if (hole.ID == "wall") {
		  
		var cylinderPos = new THREE.Vector3()
		cylinderPos.copy(new THREE.Vector3(0,hole.worldToLocal(balls[0].pos.clone()).y,0))
		
		var ballPos = new THREE.Vector3()
		
		ballPos.copy(hole.worldToLocal(this.pos.clone()))

		if(ballPos.clone().sub(cylinderPos).length() >= hole.r - this.r && ballPos.clone().sub(cylinderPos).length() <= hole.r + this.r && Math.abs(cylinderPos.length()) <= hole.height / 2){
			ballPos.sub(cylinderPos).normalize()
			var temp1 = new THREE.Vector3();
			temp1.copy(cylinderPos.clone().add(ballPos.clone().multiplyScalar(hole.r-this.r)))
			this.n.copy(ballPos)
			this.pos.copy(hole.localToWorld(temp1))
			this.vel.sub(this.n.clone().multiplyScalar((1 + COR) * this.vel.dot(this.n)));
		}
		/*
        var dis = new THREE.Vector3(0, 0, 0)
        dis.copy(ballNowPos.clone().sub(ballLastPos).normalize().divideScalar(100))
        ballLastPos.add(dis);
        while (hole.inMeshFunc(ballLastPos) < 0) {
          ballLastPos.add(dis);
        }
        ballLastPos.sub(dis.multiplyScalar(1));

        this.n.copy(hole.meshDifFunc(ballLastPos).normalize())

        this.pos.copy(hole.localToWorld(ballLastPos.clone()));
        this.vel.sub(this.n.clone().multiplyScalar((1 + COR) * this.vel.dot(this.n)));
		*/
      } 
      if (ans <= 0 && hole.ID == "hole") {

        var dis = new THREE.Vector3(0, 0, 0)
        dis.copy(ballNowPos.clone().sub(ballLastPos).normalize().divideScalar(100))
        ballLastPos.add(dis);
        while (hole.inMeshFunc(ballLastPos) > 0) {
          ballLastPos.add(dis);
        }
        ballLastPos.sub(dis.multiplyScalar(1.1));
        //ballLastPos.sub(dis);

        this.n.copy(hole.meshDifFunc(ballLastPos).normalize())

        this.pos.copy(hole.localToWorld(ballLastPos.clone()));
        this.vel.sub(this.n.clone().multiplyScalar((1 + COR) * this.vel.dot(this.n)));
      }
	  if(hole.ID == "bottom"){
		    const EPS = 1e-5;
			const CR = 0;
			const COR = 0.61;
			var tempP = new THREE.Vector3(0,0,0);
		    tempP.copy(hole.worldToLocal(this.pos.clone()));
		    let posR = tempP.x * tempP.x + tempP.z * tempP.z;
			if (posR <= (hole.r - this.r) * (hole.r - this.r) && tempP.y <= this.r){
				this.pos.y = hole.position.y + this.r;
				var tempV = new THREE.Vector3(0, 0, 0)
				tempV.copy(this.vel.clone().projectOnVector(hole.normal).negate())
				this.vel.sub(hole.normal.clone().multiplyScalar((1 + CR) * this.vel.dot(hole.normal)));
				this.vel.add(tempV.multiplyScalar(COR))
				this.n.copy(hole.normal)
				this.vel.multiplyScalar(0.1)
			}
	  }
	  if(this.inHole && temp.z <= -3){
		/*
		alert("進球")
		this.vel.set(0,0,0)
		this.pos.set(0,1,10).
		*/
		if(this.ID == "player" && hole.ID == "hole"){
			this.inholeSound.play();
			//level++;
			this.inHole = false;
			this.nowIsFlyP = false;
			this.nowIsFlyC = false;
			this.nowIsFlyF = false;
			
			this.pos.set(0,1,10);
			this.vel.set(0,0,0);
			countSwingReset();
			
			/*
			if(level == 2){
				alert("next level")
				this.pos.set(80,1,-125);
				this.vel.set(0,0,0)
			}
			if(level == 3){
				level = 1;
				alert(" Game Restart")
				//hole.level = 1
				this.pos.set(0,1,0);
				this.vel.set(0,0,0);
			}
			*/
		}
		if(this.ID == "predict"){
			this.testRunInHole = true;
		}
	  }
    }
  }
  collidingPlane(planes) {

    const EPS = 1e-5;

    const CR = 0;

    const COR = 0.61;

    var count = 0;

    for (var i = 0; i < planes.length; i++) {

      let plane = planes[i];
      let point = this.pos.clone().sub(plane.ptOnPl);
			//&& plane.mesh.worldToLocal(this.pos.clone()).projectOnVector(plane.localNormal).angleTo(plane.localNormal) < 1
      if (point.dot(plane.normal) < EPS && point.projectOnPlane(plane.normal).length() < plane.length / 2 && plane.mesh.worldToLocal(this.pos.clone()).projectOnVector(plane.localNormal).angleTo(plane.localNormal) < 1) {
        count++;
        this.pos.copy(plane.ptOnPl.clone().add(point.projectOnPlane(plane.normal)));
        var tempV = new THREE.Vector3(0, 0, 0)
        if (this.nowIsFlyP && this.nowIsFlyC && this.nowIsFlyF) {
          tempV.copy(this.vel.clone().projectOnVector(plane.normal).negate())
          this.vel.sub(plane.normal.clone().multiplyScalar((1 + CR) * this.vel.dot(plane.normal)));
          this.vel.add(tempV.multiplyScalar(COR))
        } else {
          this.vel.sub(plane.normal.clone().multiplyScalar((1 + CR) * this.vel.dot(plane.normal)));
        }
        this.n.copy(plane.normal)
        this.nowIsFlyP = false;
      }
    }
    if (count == 0) {
      this.nowIsFlyP = true;
    }

  }
  checkCylinder(cylinders){
        var count = 0;
        var COR = 0.64;
        for(var i = 0; i < cylinders.length; i++){
            let cylinder = cylinders[i];
            var cylinderPos = new THREE.Vector3()
            cylinderPos.copy(new THREE.Vector3(0,cylinder.worldToLocal(this.pos.clone()).y,0))
            var ballPos = new THREE.Vector3()
            ballPos.copy(cylinder.worldToLocal(this.pos.clone()))

            if(ballPos.sub(cylinderPos).length() <= this.r + cylinder.R && Math.abs(cylinderPos.length()) <= cylinder.height / 2){
				if(this.ID == "player"){
					this.hitSound.play()
				}
                count++;
                ballPos.normalize()
                var temp = new THREE.Vector3();
                temp.copy(cylinderPos.clone().add(ballPos.clone().multiplyScalar(this.r + cylinder.R)))
                this.pos.copy(cylinder.localToWorld(temp))
                this.n.copy(cylinder.localToWorld(ballPos).sub(cylinder.position).normalize());
                if (this.nowIsFlyC && this.nowIsFlyP && this.nowIsFlyCy || cylinder.ID == "wall") {
                        var tempV = new THREE.Vector3(0, 0, 0)
            tempV.copy(this.vel.clone().projectOnVector(this.n).negate())
            this.vel.sub(this.n.clone().multiplyScalar(this.vel.dot(this.n)));
            this.vel.add(tempV.multiplyScalar(COR))
          } else {
            this.vel.sub(this.n.clone().multiplyScalar(this.vel.dot(this.n)));
          }
                 this.nowIsFlyCy = false;
            }
        }
         if (count == 0) {
      this.nowIsFlyCy = true;
    }
    }
  checkWall(walls) {
    const COR = 0.64;
    for (var i = 0; i < walls.length; i++) {
      let wall = walls[i]
      let temp = new THREE.Vector3(0, 0, 0);
      temp.copy(wall.mesh.worldToLocal(this.pos.clone()))
	  var times = 3;
	  if(wall.type == 0){
		  if(this.ID == "player")
			wall.mesh.material.opacity = 1;
		  if(temp.z <= (1.25 + this.r) * times  && temp.z >= (-1.25 - this.r) * times && Math.abs(temp.x) <= wall.len / 2 && this.ID == "player"){
			wall.mesh.material.opacity = 0.5;
		  }
		  if (temp.z <= 1.25 + this.r  && temp.z >= -1.25 - this.r  && Math.abs(temp.x) <= wall.len / 2 && temp.y <= wall.height + this.r && temp.y >= -wall.height - this.r) {
			if(this.ID == "player"){
				this.hitSound.play()
			}
			this.n.copy(wall.normal);
			if(temp.z < 0)
				this.pos.copy(wall.mesh.localToWorld(new THREE.Vector3(temp.x,temp.y,-1.25 - this.r)));
			else
				this.pos.copy(wall.mesh.localToWorld(new THREE.Vector3(temp.x,temp.y,1.25 + this.r)));
			this.vel.sub(this.n.clone().multiplyScalar((1 + COR) * this.vel.dot(this.n)))
		  }
	  }
	  if(wall.type == 1){
		if(this.ID == "player")
			wall.mesh.material.opacity = 1;
		if(temp.z <= this.r * times  && temp.z >= this.r * times && Math.abs(temp.x) <= wall.len / 2 && this.ID == "player"){
			wall.mesh.material.opacity = 0.5;
		}
		if (temp.z <= this.r  && temp.z >= -this.r  && Math.abs(temp.x) <= wall.len / 2 && temp.y <= wall.height + this.r && temp.y >= -wall.height - this.r) {
			if(this.ID == "player"){
				this.hitSound.play()
			}
			this.n.copy(wall.normal);
			this.pos.copy(wall.mesh.localToWorld(new THREE.Vector3(temp.x,temp.y,this.r)));
			this.vel.sub(this.n.clone().multiplyScalar((1 + COR) * this.vel.dot(this.n)))
		  }  
		  
	  }
    }

  }
  checkFloor(floors){
	const COR = 0.61;
    var count = 0;
    for (var i = 0; i < floors.length; i++) {
		let floor = floors[i]
		let UV = floor.convertUV(floor.worldToLocal(this.pos.clone()).x,floor.worldToLocal(this.pos.clone()).z)
		let y = floor.heightFunc(this.pos.x, this.pos.z);
		let height = new THREE.Vector3();
		height = floor.localToWorld(new THREE.Vector3(0,y,0)).y
		
		if(UV[0] >= 0 && UV[0] <= 1 && UV[1] >= 0 && UV[1] <= 1 && this.pos.y >= height - this.r && this.pos.y <= height + this.r){
			count++;
			this.pos.set(this.pos.x, floor.heightFunc(this.pos.x, this.pos.z) + this.r, this.pos.z);
			let temp = floor.inHeightFunc(this.pos.x,this.pos.z);
			let normal = new THREE.Vector3(temp[0],1,temp[1])
			this.n.copy(normal.normalize())
			if (this.nowIsFlyP && this.nowIsFlyC && this.nowIsFlyF){
				var tempV = new THREE.Vector3(0, 0, 0)
				tempV.copy(this.vel.clone().projectOnVector(this.n).negate())
				this.vel.sub(this.n.clone().multiplyScalar(this.vel.dot(this.n)));
				this.vel.add(tempV.multiplyScalar(COR))
			}
			else
				this.vel.sub(this.n.clone().multiplyScalar(this.vel.dot(this.n)));
			this.nowIsFlyF = false;
		}
	}
	if(count == 0){
		this.nowIsFlyF = true;
	}
  }
  start(){
	this.vel.set(0,0,0);
	this.pos.set(0,1,10);
  }
}
export {Particle}