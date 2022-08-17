import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {planes,holes,curveds,spheres,cylinders,walls,wall2s,floors} from './buildTerrain.js';
import {ballR,scene,light,start,balls,stroke,level,levelPlus,levelRestart} from './main.js'
import {textureAnimate} from './render.js'
import {preInHole} from './keyPressed.js'
class Particle {
  constructor(mesh) {
	  
    this.vel = new THREE.Vector3(0, 0, 0);
    this.pos = new THREE.Vector3(10, 1, 0);
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

    this.nowIsFlyC = true;
    this.nowIsFlyP = true;
	this.nowIsFlyF = true;
    this.us = 6;

    scene.add(this.mesh);

  }
  update(dt) {
	
    var dtt = this.dtt;
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
    }
    //console.log(this.vel)
    this.vel.copy(velH.add(velV))
	if(start)
		this.vel.add(this.force.clone().multiplyScalar(this.m).multiplyScalar(dtt));

    this.pos.add(this.vel.clone().multiplyScalar(dtt));

	  this.checkHole(holes)
		if(this.inHole != true){
			this.collidingPlane(planes);
			
			this.checkFloor(floors)

			this.contact(curveds)

			this.checkWall(walls)

			this.checkCylinder(cylinders)
			
			this.checkSphere(spheres)
		
		}
    this.lastP.copy(this.pos);

    this.mesh.position.copy(this.pos);
    light.position.copy(this.pos);
    light.position.y += 100;
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

		if(ballPos.clone().sub(cylinderPos).length() >= hole.r - ballR && ballPos.clone().sub(cylinderPos).length() <= hole.r + ballR && Math.abs(cylinderPos.length()) <= hole.height / 2){
			ballPos.sub(cylinderPos).normalize()
			var temp1 = new THREE.Vector3();
			temp1.copy(cylinderPos.clone().add(ballPos.clone().multiplyScalar(hole.r-ballR)))
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
			if (posR <= (hole.r - ballR) * (hole.r - ballR) && tempP.y <= ballR){
				this.pos.y = hole.position.y + ballR;
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
			levelPlus();
			this.inHole = false;
			this.nowIsFlyP = false;
			this.nowIsFlyC = false;
			this.nowIsFlyF = false;
			//hole.level++;
			
			if(level == 2){
				alert("next level")
				this.pos.set(80,1,-125);
				this.vel.set(0,0,0)
			}
			if(level == 3){
				levelRestart();
				alert(" Game Restart")
				//hole.level = 1
				this.pos.set(0,1,0);
				this.vel.set(0,0,0);
			}
			textureAnimate.count = 1;
			if (stroke) {
				var texture = stroke.material.map;
				texture.offset.x = 0;
				texture.offset.y = 0;
			}
		}
		if(this.ID == "predict"){
			preInHole()
			this.inHole = false;
			this.nowIsFlyP = false;
			this.nowIsFlyC = false;
			this.nowIsFlyF = false;
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
  contact(curveds) {
    const COR = 0.61;
    var count = 0;
    for (var i = 0; i < curveds.length; i++) {
      let curved = curveds[i];
      var ballOnP = new THREE.Vector3();
      var u0, v0;
      var ans = curved.inMeshFunc(curved.worldToLocal(this.pos.clone()).x, curved.worldToLocal(this.pos.clone()).z);
      u0 = ans[0]
      v0 = ans[1]
      //console.log(u0 ,v0)

      curved.meshFunc(u0, v0, ballOnP)

      var n = new THREE.Vector3(0, 0, 0);
      if (u0 >= 0 && v0 >= 0 && u0 <= 1 && v0 <= 1) {
        const d = 0.0001;
        var du = new THREE.Vector3()
        var dv = new THREE.Vector3()

        curved.meshFunc(u0 + d, v0, du)
        curved.meshFunc(u0, v0 + d, dv)
        du.sub(ballOnP).divideScalar(d)
        dv.sub(ballOnP).divideScalar(d)

        //du.cross(dv).normalize()
        dv.cross(du).normalize()

        var y = new THREE.Vector3();
        //y.copy(ballOnP.clone().add(new THREE.Vector3(0, du.clone().multiplyScalar(ballR).y, 0)))
        y.copy(ballOnP.clone().add(new THREE.Vector3(0, dv.clone().multiplyScalar(ballR).y, 0)))
        if (y.y - curved.worldToLocal(this.pos.clone()).y >= 0 && y.y - curved.worldToLocal(this.pos.clone()).y <= 20) {
          count++;


          //this.n.copy(du);
          this.n.copy(dv);
          this.pos.copy(curved.localToWorld(ballOnP.clone().add(new THREE.Vector3(0, this.n.clone().multiplyScalar(ballR).y, 0))));

          

          if (this.nowIsFlyC && this.nowIsFlyP && this.nowIsFlyF) {
			var tempV = new THREE.Vector3(0, 0, 0)
            tempV.copy(this.vel.clone().projectOnVector(this.n).negate())
            this.vel.sub(this.n.clone().multiplyScalar(this.vel.dot(this.n)));
            this.vel.add(tempV.multiplyScalar(COR))
          } else {
            this.vel.sub(this.n.clone().multiplyScalar(this.vel.dot(this.n)));
          }
          this.nowIsFlyC = false;
        }

      }
    }
    if (count == 0) {
      this.nowIsFlyC = true;
    }
  }
  checkSphere(spheres){
        var count = 0;
        var COR = 0.64;
        for(var i = 0; i < spheres.length; i++){
            let sphere = spheres[i];
            var ballPos = new THREE.Vector3()
            ballPos.copy(sphere.worldToLocal(this.pos.clone()))

            if(ballPos.length() <= ballR + sphere.R){
                count++;
                ballPos.normalize()
                var temp = new THREE.Vector3();
                temp.copy(ballPos.clone().multiplyScalar(ballR + sphere.R))
                this.pos.copy(sphere.localToWorld(temp))
                this.n.copy(sphere.localToWorld(ballPos).sub(sphere.position).normalize());
                if (this.nowIsFlyC && this.nowIsFlyP && this.nowIsFlyCy&& this.nowIsFlyS || sphere.ID == "Wall") {
                    console.log("y")
                        var tempV = new THREE.Vector3(0, 0, 0)
            tempV.copy(this.vel.clone().projectOnVector(this.n).negate())
            this.vel.sub(this.n.clone().multiplyScalar(this.vel.dot(this.n)));
            this.vel.add(tempV.multiplyScalar(COR))
          } else {
            this.vel.sub(this.n.clone().multiplyScalar(this.vel.dot(this.n)));
          }
                 this.nowIsFlyS = false;
            }
        }
         if (count == 0) {
      this.nowIsFlyS = true;
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

            if(ballPos.sub(cylinderPos).length() <= ballR + cylinder.R && Math.abs(cylinderPos.length()) <= cylinder.height / 2){
                count++;
                ballPos.normalize()
                var temp = new THREE.Vector3();
                temp.copy(cylinderPos.clone().add(ballPos.clone().multiplyScalar(ballR + cylinder.R)))
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
      if (temp.z <= 2.25 && temp.z >= -2.25 && Math.abs(temp.x) <= wall.len / 2 && temp.y <= 3.5 && temp.y >= -3.5) {
        let temp = new THREE.Vector3(0, 0, 0)
        this.n.copy(wall.normal);
        this.pos.copy(this.lastP)
        this.vel.sub(this.n.clone().multiplyScalar((1 + COR) * this.vel.dot(this.n)))

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
		
		if(UV[0] >= 0 && UV[0] <= 1 && UV[1] >= 0 && UV[1] <= 1 && this.pos.y >= height - ballR && this.pos.y <= height + ballR){
			count++;
			this.pos.set(this.pos.x, floor.heightFunc(this.pos.x, this.pos.z) + ballR, this.pos.z);
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
	//this.pos.set(150,10,-130);
	this.pos.set(0,1,0);
  }
}
export {Particle}