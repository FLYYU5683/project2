import * as THREE from 'https://cdn.skypack.dev/three@0.136';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.136/examples/jsm/controls/OrbitControls.js';
import {balls,steve} from './main.js'
import {useOrb,countSwing,resetPlayData,replayAll,resetCameraAngle,fovX,inHoleBreak} from './touchEvent.js'
//import {portalsRenderer} from './portal.js'
import {setClassVisible} from './buildTerrain.js';

var look = false;
var cameraOnPlayer,cameraForMap,cameraHUD,cameraOrbit,cameraOnBall,scene,sceneHUD,sceneMap,renderer;
var controls;

var textureHUD1,textureHUD2,textureHUD3;
var startButton;

var start = false;
var switchCameraButton, cameraButton1, cameraButton2, cameraButton3, cameraButtons = new THREE.Group();
var switchCamera = 3;

var cameraSlider;
var sliderGroup;
var isOpen = false;

var scores = [];
var manipulateButton = new THREE.Group();
var levelChangeButton = new THREE.Group();

var isOver = false;
var levelPos =  [new THREE.Vector3(0,1,10),new THREE.Vector3(0,2,-135),new THREE.Vector3(250,81,-300)]

var level = 1;
var sign1,sign2,sign3;


var gearButton,replayGroup = new THREE.Group();

var modeChose = false, mode = -1;
var levelChose = true;
var chooseLevelButton = new THREE.Group();
function render() {
  var WW = window.innerWidth;
  var HH = window.innerHeight;
	  if (levelChose) {
		if(switchCamera - 1 === 0){
			look = false
			//portalsRenderer(cameraOrbit,false);
			renderer.render(scene,cameraOnPlayer);
		}
		else if(switchCamera - 1 === 1){
			look = false
			cameraOnBall.lookAt(balls[0].pos)
			
			//portalsRenderer(cameraOnBall,false);
			renderer.render(scene,cameraOnBall);
		}
		else if(switchCamera - 1 === 2){
			if (!look) {
			  cameraOrbit.position.copy(cameraOnPlayer.localToWorld(new THREE.Vector3(0,0,0)))
			  cameraOrbit.lookAt(balls[0].pos)
			  controls.target.copy(balls[0].pos.clone())
			  controls.update();
			  look = !look;
			}
			//portalsRenderer(cameraOrbit,true);
			renderer.render(scene,cameraOrbit);
		}
	  } 
	  else{
		  renderer.render(sceneMap, cameraForMap)
	  }
    renderer.render(sceneHUD, cameraHUD);

}
function buildCamAndSen(){
  
  scene = new THREE.Scene();
  var textureLoader = new THREE.TextureLoader();
  var texture = textureLoader.load('https://i.imgur.com/JHaU4X4.jpg');
  scene.background = texture;
  //scene.fog = new THREE.FogExp2( 0x21384f, 0.0050,1000);
  //scene.background = new THREE.Color( 0x21384f );
  sceneHUD = new THREE.Scene();
  sceneMap = new THREE.Scene();
  sceneMap.background = new THREE.Color( 0x21384f );

  var amblight = new THREE.AmbientLight(0x255483); // soft white light
  scene.add(amblight);
  amblight.intensity=0.7
  
  renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  //renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.localClippingEnabled = true;
  
  cameraOnPlayer = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
  cameraOnPlayer.position.set(0, 30, 70);
  cameraOnPlayer.lookAt(0, 5.68, 10);
  
  
  cameraForMap = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 1000);
  cameraForMap.position.set(0, 200, 600);
  cameraForMap.lookAt(0, 5.68, 10);

  cameraHUD = new THREE.OrthographicCamera(-10, 10, 10, -10, -10, 1600);
  cameraHUD.position.z = 1580;
  
  cameraOrbit = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
  cameraOrbit.position.set(0, 30, 70);
  cameraOrbit.lookAt(0,1,10);
  
  cameraOnBall = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
  cameraOnBall.position.set(0, 30, 70);
  cameraOnBall.lookAt(0,1,10);
  
  controls = new OrbitControls(cameraOrbit, renderer.domElement);
    
  renderer.autoClear = false;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  let loader3 = new THREE.TextureLoader();
  var texture4 = loader3.load("https://i.imgur.com/PegGW4D.png")
  var startButtonMaterial = new THREE.MeshBasicMaterial({
	  opacity: 1,
	  alphaTest:0.5,
	  transparent: true,
	  depthTest: false,
	  depthWrite: false,
	  map: texture4});
  startButton = new THREE.Mesh(new THREE.PlaneGeometry(12, 8), startButtonMaterial);
  startButton.position.set(0, 0, 0);
  //startButton.visible = false////////////////////////////////////////////////////////////////////////////////////////////////////////
  sceneHUD.add(startButton)
  buildHUD()
  
  //洞標
	let loader1 = new THREE.TextureLoader();
  loader1.crossOrigin = '';
  var texture1 = loader1.load('https://i.imgur.com/E3yqlrK.png');

  var texMat1 = new THREE.MeshBasicMaterial({
    map: texture1,
    //transparent: true
    alphaTest: 0.5,
	side:THREE.DoubleSide
  });

	sign1 = new THREE.Mesh(new THREE.PlaneGeometry(10, 20), texMat1);
	sign1.position.set(20,5,20);
	sign1.rotation.y = -Math.PI / 9
	scene.add(sign1);
  
  
  let loader2 = new THREE.TextureLoader();
  loader2.crossOrigin = '';
  var texture2 = loader2.load('https://i.imgur.com/62bVwfm.png');

  var texMat2 = new THREE.MeshBasicMaterial({
    map: texture2,
    //transparent: true
    alphaTest: 0.5,
	side:THREE.DoubleSide
  });

	sign2 = new THREE.Mesh(new THREE.PlaneGeometry(10, 20), texMat2);
	sign2.position.set(20,5,-125);
	sign2.rotation.y = -Math.PI / 9
	scene.add(sign2);
  
  
  let loader4 = new THREE.TextureLoader();
  loader4.crossOrigin = '';
  var texture4 = loader3.load('https://i.imgur.com/gGw3I9S.png');

  var texMat3 = new THREE.MeshBasicMaterial({
    map: texture4,
    //transparent: true
    alphaTest: 0.5,
	side:THREE.DoubleSide
  });

	sign3 = new THREE.Mesh(new THREE.PlaneGeometry(10, 20), texMat3);
	sign3.position.set(230,85,-280);
	sign3.rotation.y = -Math.PI / 2 - Math.PI / 9;
	scene.add(sign3);
  
  
  
}
function buildHUD(){
	////計分板
        var textureloader1 = new THREE.TextureLoader();
        // load a resource
        textureHUD1 = textureloader1.load(
        // URL ...
        'https://i.imgur.com/humdukl.jpg',
        // onLoad ...
        function(textureHUD1) {
        // do something with the texture
        // Plane with default texture coordinates [0,1]x[0,1]
        },
            undefined, // onProgress
        // onError ...
        function(xhr) {
          console.log('An error happened');
        }
        );
        var texMat1 = new THREE.MeshBasicMaterial({
             opacity: 1,
             transparent: true,
             depthTest: false,
             depthWrite: false,
             map: textureHUD1
        });
        
        
        var score1 = new THREE.Mesh(new THREE.PlaneGeometry(10, 2), texMat1);
        textureHUD1.wrapS = THREE.RepeatWrapping;
        textureHUD1.wrapT = THREE.RepeatWrapping;
        textureHUD1.repeat.set (1,1/12);
		textureHUD1.offset.x = 0;
		textureHUD1.offset.y = 11/12;
		
        score1.position.set(-5, 9, 102);
        sceneHUD.add(score1);

        var textureloader2 = new THREE.TextureLoader();
        // load a resource
        textureHUD2 = textureloader2.load(
        // URL ...
        'https://i.imgur.com/8ec7043.jpg',
        // onLoad ...
        function(textureHUD2) {
        // do something with the texture
        // Plane with default texture coordinates [0,1]x[0,1]
        },
            undefined, // onProgress
        // onError ...
        function(xhr) {
          console.log('An error happened');
        }
        );
        var texMat2 = new THREE.MeshBasicMaterial({
             opacity: 1,
             transparent: true,
             depthTest: false,
             depthWrite: false,
             map: textureHUD2
        });
        
        
        var score2 = new THREE.Mesh(new THREE.PlaneGeometry(10, 2), texMat2);
        textureHUD2.wrapS = THREE.RepeatWrapping;
        textureHUD2.wrapT = THREE.RepeatWrapping;
        textureHUD2.repeat.set (1,1/12);
		textureHUD2.offset.x = 0;
		textureHUD2.offset.y = 11/12;
		
        score2.position.set(-5, 9, 101);
        sceneHUD.add(score2);

        var textureloader3 = new THREE.TextureLoader();
        // load a resource
        textureHUD3 = textureloader3.load(
        // URL ...
        'https://i.imgur.com/2NqRqm5.jpg',
        // onLoad ...
        function(textureHUD3) {
        // do something with the texture
        // Plane with default texture coordinates [0,1]x[0,1]
        },
            undefined, // onProgress
        // onError ...
        function(xhr) {
          console.log('An error happened');
        }
        );
        var texMat3 = new THREE.MeshBasicMaterial({
             opacity: 1,
             transparent: true,
             depthTest: false,
             depthWrite: false,
             map: textureHUD3
        });
        
        
        var score3 = new THREE.Mesh(new THREE.PlaneGeometry(10, 2), texMat3);
        textureHUD3.wrapS = THREE.RepeatWrapping;
        textureHUD3.wrapT = THREE.RepeatWrapping;
        textureHUD3.repeat.set (1,1/12);
		textureHUD3.offset.x = 0;
		textureHUD3.offset.y = 11/12;
		
        score3.position.set(-5, 9, 100);
        sceneHUD.add(score3);
		scores.push(score1,score2,score3)
		for(var k = 0; k < scores.length; k++){
			scores[k].visible = false;
		}
	////Camera按鈕
	    let loader4 = new THREE.TextureLoader();
		var texture5 = loader4.load("https://i.imgur.com/dhvNfiN.png")
		var switchCameraButtonMaterial = new THREE.MeshBasicMaterial({
			opacity: 1,
			alphaTest:0.5,
			transparent: true,
			depthTest: false,
			depthWrite: false,
			map: texture5});

		switchCameraButton = new THREE.Mesh(new THREE.PlaneGeometry(4, 2),switchCameraButtonMaterial)
		switchCameraButton.position.set(8,9,0);
		
		cameraButton1 = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 1.25),switchCameraButtonMaterial)
		cameraButton1.position.set(4.5,9.1,0);
		cameraButton1.scale.set(0.8,0.8,0.8)

		cameraButton2 = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 1.25),switchCameraButtonMaterial)
		cameraButton2.position.set(4.8,7.5,0);
		
		cameraButton3 = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 1.25),switchCameraButtonMaterial)
		cameraButton3.position.set(8.1,7.3,0);
		
		cameraButtons.add(switchCameraButton,cameraButton1,cameraButton2,cameraButton3)
		sceneHUD.add(cameraButtons)
		cameraButtons.visible = false;
		for(var k = 1; k < cameraButtons.children.length; k++)
			cameraButtons.children[k].visible = false;
		
	////fov縮放滑條
	  var shape1 = new THREE.Shape();
	  shape1.moveTo(0, 10);
	  shape1.absarc(-7, 0, 3, Math.PI / 3 * 2, Math.PI / 3 * 4, false);
	  shape1.lineTo(8.5, -2.6)
	  shape1.absarc(7, 0, 3, Math.PI / 3 * 5, Math.PI / 3, false);
	  shape1.lineTo(-8.5, 2.6)

	  var holePath = new THREE.Path();
	  holePath.moveTo(0, -10);

	  holePath.absarc(-7.0, 0, 2.5, Math.PI / 3 * 2, Math.PI / 3 * 4, false);
	  holePath.lineTo(8.5, -2.1)
	  holePath.absarc(7.0, 0, 2.5, Math.PI / 3 * 5, Math.PI / 3, false);
	  holePath.lineTo(-8.5, 2.1)
	  shape1.holes.push(holePath);

	  var extrudeSettings1 = {};
	  var mesh1 = new THREE.Mesh(new THREE.ExtrudeGeometry(shape1, extrudeSettings1), new THREE.MeshBasicMaterial({
		color: 0x00AA00,
		shininess: 200,
	  }));
	  mesh1.position.z = 10
	  
	  var board = new THREE.Mesh(new THREE.PlaneGeometry(20,6),new THREE.MeshBasicMaterial({color:0xAAAAAA}))
	  board.position.z = -10
	  var click = new THREE.Mesh(new THREE.PlaneGeometry(6,2),new THREE.MeshBasicMaterial({color:0x444444}))
	  click.position.y = 4;
	  var ball = new THREE.Mesh(new THREE.SphereGeometry(0.5),new THREE.MeshBasicMaterial({color:0xffffff}))
	  ball.position.y = 4
	  
	  let loader1 = new THREE.TextureLoader();
	  var texture = loader4.load("https://i.imgur.com/eH3hFaS.png")
	  var FOVMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: texture});
	  cameraSlider = new THREE.Mesh(new THREE.CircleGeometry(2.0,32),FOVMaterial);

	  sliderGroup = new THREE.Group();
	  sliderGroup.add(mesh1,cameraSlider,ball,click,board)
	  sliderGroup.scale.set(1,0.5,1)
	  sliderGroup.position.set(0,-11.5,200)
	  sliderGroup.onTop = false;
	  ///操控
	  let loader5 = new THREE.TextureLoader();
	  var texture6 = loader4.load("https://i.imgur.com/RZ7HuLd.png")
	  var arrowMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: texture6});
	  
	  var arrow = new THREE.Mesh(new THREE.PlaneGeometry(8, 4),arrowMaterial)
	  arrow.position.set(-6,0.2,0);
	  
	  let loader6 = new THREE.TextureLoader();
	  var texture7 = loader4.load("https://i.imgur.com/X0fOF3h.png")
	  var arrowMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: texture7});

	  var arrow1 = new THREE.Mesh(new THREE.PlaneGeometry(8, 4),arrowMaterial)
	  arrow1.position.set(6,0.2,0);
	  sceneHUD.add(arrow,arrow1);
	  let loader7 = new THREE.TextureLoader();
	  var texture8 = loader4.load("https://i.imgur.com/eHdPwDG.png")
	  var arrowMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: texture8});
		
		let loaderChoose = new THREE.TextureLoader();
		var textureChoose = loaderChoose.load("https://i.imgur.com/k2jGSlw.png")
		var chooseMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: textureChoose});
		

	  var swingButton = new THREE.Mesh(new THREE.PlaneGeometry(6, 1.8),arrowMaterial)
	  swingButton.position.set(0,0,0);
	  
	  var chooseButton = new THREE.Mesh(new THREE.PlaneGeometry(6, 1.8),chooseMaterial)
	  chooseButton.position.set(0,0,0);
	  
	  manipulateButton.add(arrow,arrow1,swingButton);
	  manipulateButton.position.y = 7
	  manipulateButton.scale.set(1,2,1)
	  sliderGroup.add(manipulateButton.clone())
	  
	  manipulateButton.scale.set(1,1,1)
	  swingButton.visible = false;
	  manipulateButton.position.y = -8;
	  manipulateButton.add(chooseButton);
	  
	  sceneHUD.add(sliderGroup,manipulateButton)
	  
	  sliderGroup.visible = false;
	  manipulateButton.visible = false;
	   /// 齒輪
	
		let loader15= new THREE.TextureLoader();
		var texture15 = loader15.load("https://i.imgur.com/hPNtuny.png")
		var gearMaterial = new THREE.MeshBasicMaterial({
			opacity: 1,
			alphaTest:0.5,
			transparent: true,
			depthTest: false,
			depthWrite: false,
			map: texture15});
		gearButton = new THREE.Mesh(new THREE.PlaneGeometry(2,2),gearMaterial);
		gearButton.position.set(-8.9,7.5,500);
		gearButton.scale.set(1,0.5,1)
		sceneHUD.add(gearButton)
		gearButton.visible = false;
		
	  ///replay Button
	  let loader2 = new THREE.TextureLoader();
	  var texture2 = loader2.load("https://i.imgur.com/qGZYbQ8.png")
	  var replay1Material = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: texture2});
	  let loader3 = new THREE.TextureLoader();
	  var texture3 = loader3.load("https://i.imgur.com/BvV2eFr.png")
	  var replay2Material = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: texture3});
		
	  let loaderX = new THREE.TextureLoader();
	  var textureX = loaderX.load("https://i.imgur.com/6Pd6ywQ.png")
	  var XMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: textureX});
		
		var XButton = new THREE.Mesh(new THREE.PlaneGeometry(2,2),XMaterial);
		//XButton.position.set(-8.9,7.5,500);
		XButton.scale.set(1,0.5,1)
		
	  var gearBoard = new THREE.Mesh(new THREE.PlaneGeometry(9,1.6),new THREE.MeshBasicMaterial({color:0xAAAAAA}))
	  gearBoard.position.set(-4.4,6.5,300)
	  
	  var replay1Button = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 1),replay1Material)
	  replay1Button.position.set(-6.5,6.5,100);
	  
	  var replay2Button = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 1),replay2Material)
	  replay2Button.position.set(-2.5,6.5,100);
	  replayGroup.add(gearBoard,replay1Button,replay2Button)
	  replayGroup.visible = false;
	  sceneHUD.add(replayGroup)
	/// 進球後
	
	let loader13 = new THREE.TextureLoader();
	var texture13 = loader13.load("https://i.imgur.com/Bz90jwT.png")
	var nextLevelMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: texture13});

	let loader14 = new THREE.TextureLoader();
	var texture14 = loader14.load("https://i.imgur.com/JqLutbX.png")
	var watchReplayMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: texture14});
		
	var nextLevelButton = new THREE.Mesh(new THREE.PlaneGeometry(7,2.5),nextLevelMaterial);
	nextLevelButton.position.set(5,0,100);
	var watchReplayButton = new THREE.Mesh(new THREE.PlaneGeometry(7,2.5),watchReplayMaterial);
	watchReplayButton.position.set(-5,0,100);

	let loaderSelect = new THREE.TextureLoader();
	var textureSelect = loaderSelect.load("https://i.imgur.com/p4ycMph.png")
	var selectMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: textureSelect});
		
	var selectButton = new THREE.Mesh(new THREE.PlaneGeometry(7,2.5),selectMaterial);
	selectButton.position.set(5,0,100);
	
	levelChangeButton.add(watchReplayButton,nextLevelButton,selectButton)
	sceneHUD.add(levelChangeButton)
	levelChangeButton.visible = false;
	/// modeChoose
	
	let loaderMode = new THREE.TextureLoader();
	var textureMode = loaderMode.load("https://i.imgur.com/2RvgFys.png")
	var modeMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: textureMode});	

	let loaderPractice = new THREE.TextureLoader();
	var texturePractice = loaderMode.load("https://i.imgur.com/ckhlDxg.png")
	var practiceMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: texturePractice});
		
	let loaderStander = new THREE.TextureLoader();
	var textureStander = loaderMode.load("https://i.imgur.com/gHNtlT9.png")
	var standerMaterial = new THREE.MeshBasicMaterial({
		opacity: 1,
		alphaTest:0.5,
		transparent: true,
		depthTest: false,
		depthWrite: false,
		map: textureStander});	
		
	var modeButton = new THREE.Mesh(new THREE.PlaneGeometry(10, 6),modeMaterial);
    modeButton.position.set(0, 2, 0);
	
	var practiceButton = new THREE.Mesh(new THREE.PlaneGeometry(8, 2), practiceMaterial);
    practiceButton.position.set(-5, -2.5, 0);	
	
	var standerButton = new THREE.Mesh(new THREE.PlaneGeometry(8, 2), standerMaterial);
    standerButton.position.set(5, -2.5, 0);
		
	chooseLevelButton.add(modeButton,practiceButton,standerButton)
	chooseLevelButton.visible = false;
	sceneHUD.add(chooseLevelButton)
}
function HUDPress(){
	event.preventDefault();
	var touch = new THREE.Vector2();
	touch.x = (event.touches[0].pageX / window.innerWidth) * 2 - 1;
    touch.y = -(event.touches[0].pageY / window.innerHeight) * 2 + 1;
	if(Math.abs(touch.x) <= 0.4 && Math.abs(touch.y) <= 0.4){
	    if(start === false){
			start = true;
			startButton.visible = false
			switchCamera = 1
			chooseLevelButton.visible = true;
		}
	}
	//console.log(touch.x,touch.y);
	
	if(start === true && modeChose === false){
		if(between(touch.x,1,0.02) && between(touch.y,-0.1,-0.33)){
			balls[0].start();
			balls[1].start();
			steve.start();
			modeChose = true;
			mode = 0 // 標準
			level = 1;
			levelChangeButton.children[2].visible = false;
			chooseLevelButton.visible = false;
			
			//cameraButtons.visible = true;
			sliderGroup.visible = true;
			//gearButton.visible = true;
			
		}
		else if (between(touch.x,-0.1,-1) && between(touch.y,-0.1,-0.33)){
			modeChose = true;
			mode = 1 // 練習
			levelChangeButton.children[1].visible = false;
			levelChose = false;
			chooseLevelButton.visible = false;
			manipulateButton.visible = true;
		}
		
	}
	if(start && modeChose && levelChose){
		if(isOver === false){
			///Camera按鈕
			if(touch.x >= 0.6 && touch.y >= 0.84){
				if(!isOpen){
					cameraButtons.children[0].scale.set(0.8,0.8,0.8);
					for(var k = 1; k < cameraButtons.children.length; k++)
						cameraButtons.children[k].visible = true;
					isOpen = !isOpen;
				}
				else{
					for(var k = 1; k < cameraButtons.children.length; k++)
						cameraButtons.children[k].visible = false;
					cameraButtons.children[0].scale.set(1,1,1);
					isOpen = !isOpen;
				}
				return 1;
			}
			///gearpressed
			if(mode === 1){
				if(between(touch.x,-0.82,-1),between(touch.y,0.83,0.72)){
					if(replayGroup.visible === false){
						gearButton.scale.set(0.6,0.3,0.6)
						replayGroup.visible = true;
					}
					else{
						gearButton.scale.set(1,0.5,1)
						replayGroup.visible = false;				
					}
				}
				/// replay
				if(replayGroup.visible === true){
					if(between(touch.x,-0.5,-0.9) && between(touch.y,0.74,0.62)){
						return 6;
					}
					if(between(touch.x,-0.1,-0.5)&& between(touch.y,0.74,0.62)){
						return 5;
					}			
				}
			}
			if(false){
				for(var k = 1; k < cameraButtons.children.length; k++)
					cameraButtons.children[k].scale.set(1,1,1);
				if(isOpen){
					if (touch.y >= 0.86 && between(touch.x,0.55,0.24)){
						switchCamera = 1
						cameraButtons.children[switchCamera].scale.set(0.6,0.6,0.6);
						return 1;	
					}
					else if (between(touch.y,0.86,0.70) && between(touch.x,0.76,0.27)){
						switchCamera = 2
						cameraButtons.children[switchCamera].scale.set(0.6,0.6,0.6);
						return 1;
					}
					else if (between(touch.y,0.84,0.68) && touch.x > 0.76){
						
						switchCamera = 3
						cameraButtons.children[switchCamera].scale.set(0.6,0.6,0.6);
						
						return 1;		
					}
				}
				cameraButtons.children[switchCamera].scale.set(0.6,0.6,0.6);
				if(switchCamera === 3){
					return -1;
				}
			}
			///滑條
			if(touch.y <= -0.75 && sliderGroup.onTop === true){
				
				return 1;		
			}
			else if(between(touch.x,0.25,-0.36) && between(touch.y,-0.57,-0.67) && sliderGroup.onTop === true){
				sliderGroup.onTop = false;
				
				return 1;
			}
			else if( between(touch.x,0.25,-0.36) && touch.y <= -0.86 && sliderGroup.onTop === false){
				sliderGroup.onTop = true;
				
				return 1;
			}
			
			/// 操作
			
			if(sliderGroup.onTop === false && touch.x <= -0.38 && between(touch.y,-0.67,-0.86)){
				return 2;
			}
			else if (sliderGroup.onTop === false && touch.x >= 0.38 && between(touch.y,-0.67,-0.86)){
				return 3;
			}
			else if (sliderGroup.onTop === false && between(touch.x,0.38,-0.38) && between(touch.y,-0.67,-0.86)){
				return 4;
			}
			else if (sliderGroup.onTop === true && touch.x <= -0.38 && between(touch.y,-0.38,-0.57)){
				return 2;
			}
			else if (sliderGroup.onTop === true && touch.x >= 0.38 && between(touch.y,-0.38,-0.57)){
				return 3;
			}
			else if (sliderGroup.onTop === true && between(touch.x,0.38,-0.38) && between(touch.y,-0.38,-0.57)){
				return 4;
			}		
			return 0;
		} 
		else{
			if(mode === 0){
				if(between(touch.x,-0.17,-0.97) && between(touch.y,0.2,-0.145)){
					balls[0].choose = true;
					levelChangeButton.visible = false;
					replayAll()
				}
				else if(between(touch.x , 0.82, 0.05) && between(touch.y,0.2,-0.145)){
					balls[0].choose = true;
					level++;
					if(level > 3)
						level = 1;
					if(level === 1)
						balls[0].pos.copy(new THREE.Vector3(0,1,10));
					else if (level === 2)
						balls[0].pos.copy(new THREE.Vector3(0,2,-135));
					else if (level === 3)
						balls[0].pos.copy(new THREE.Vector3(250,81,-300));
					resetPlayData(level);
					levelChangeButton.visible = false;
					resetCameraAngle();
					isOver = false;
					steve.camera.children[0].fov = 40 + fovX * 2
					steve.direct.children[3].children[0].fov = 40 + fovX * 2;
					steve.camera.children[0].updateProjectionMatrix();
					steve.direct.children[3].children[0].updateProjectionMatrix();
					balls[0].runInHole = false;
					inHoleBreak();
				}
			}
			else if (mode === 1){
				if(between(touch.x,-0.17,-0.97) && between(touch.y,0.2,-0.145)){
					balls[0].choose = true;
					levelChangeButton.visible = false;
					replayAll()
				}
				else if(between(touch.x , 0.82, 0.05) && between(touch.y,0.2,-0.145)){
					balls[0].choose = true;
					balls[0].start();
					balls[1].start();
					levelChose = false;
					levelChangeButton.visible = false;
					sliderGroup.visible = false;
					manipulateButton.visible = true;					
					isOver = false;
					steve.camera.children[0].fov = 40 + fovX * 2
					steve.direct.children[3].children[0].fov = 40 + fovX * 2;
					steve.camera.children[0].updateProjectionMatrix();
					steve.direct.children[3].children[0].updateProjectionMatrix();
					balls[0].runInHole = false
					inHoleBreak();
				}
			}
		}
	}
	else if(levelChose === false && mode === 1){
		
		if(touch.x >= 0.38 && between(touch.y,-0.67,-0.86)){//右切
			level++;
			if(level === 4){
				level = 1;
			}
			setClassVisible(level)
		}
		else if(touch.x <= -0.38 && between(touch.y,-0.67,-0.86)){//左切
			level--;
			if(level === 0){
				level = 3;
			}
			setClassVisible(level)
		}
		else if(between(touch.x,0.38,-0.38) && between(touch.y,-0.67,-0.86)){//確定
			levelChose = true;
			if(level === 1)
				balls[0].pos.copy(new THREE.Vector3(0,1,10));
			else if (level === 2)
				balls[0].pos.copy(new THREE.Vector3(0,2,-135));
			else if (level === 3)
				balls[0].pos.copy(new THREE.Vector3(250,81,-300));
			balls[1].pos.copy(balls[0].pos)
			balls[0].vel.set(0,0,0);
			balls[1].vel.set(0,0,0);
			steve.start();
			//cameraButtons.visible = true;
			sliderGroup.visible = true;
			gearButton.visible = true;
			manipulateButton.visible = false;
			resetCameraAngle();
			resetPlayData(level);
		}
	}
	
}
function textureAnimate() {
	if(start && modeChose && levelChose){
		for (var i = 0; i < 3; i++){
			if(i + 1 === level)
			{
				scores[i].visible = true;
				continue;
			}
			scores[i].visible = false;
		}
		if(level === 1){
			if (textureHUD1 !== undefined){
				textureHUD1.offset.y = (12-countSwing)/12;
			}
		}
		else if (level === 2){
			if (textureHUD2 !== undefined){
				textureHUD2.offset.y = (12-countSwing)/12;
			}	
		}
		else if (level === 3){
			if (textureHUD3 !== undefined){
				textureHUD3.offset.y = (12-countSwing)/12;
			}	
		}
	}
}
function HUDForInHole(){
	levelChangeButton.visible = true;
	isOver = true;
}
function between(val,big,small){
	var t = true, f = false;
	if(val <= big && val > small)
		return t;
	return f;
	
}
export {buildCamAndSen,textureAnimate,HUDPress,start,cameraButtons,cameraSlider,sliderGroup}
export {cameraOrbit,cameraOnPlayer,cameraOnBall}
export {scene,sceneMap,render,renderer}
export {HUDForInHole,level,isOver}