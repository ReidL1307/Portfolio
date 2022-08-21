//boilerplate

import './style.css'

import * as three from "three";
import gsap from "gsap";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new three.Scene();
const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new three.WebGLRenderer({
    canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
renderer.render(scene, camera);

const loader = new GLTFLoader();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/examples/js/libs/draco/');
loader.setDRACOLoader(dracoLoader);

//load models/background

loader.load("./models/office.glb", function (gltf) {
    gltf.scene.castShadow = true;
    scene.add(gltf.scene);

    gltf.animations;
    gltf.scene;
    gltf.scenes;
    gltf.cameras;
    gltf.asset;
});

const light = new three.DirectionalLight(0xbec293, 1);
light.position.set(5, 3, -3);
light.castShadow = true;
scene.add(light);

//const controls = new OrbitControls(camera, renderer.domElement);

scene.background = new three.Color(0x73d966);

//event listener

camera.position.set(2, 2, -2);
camera.rotation.set(-2.356194490192345, 0.6154797086703874, 2.6179938779914944);


gsap.to(camera.position, {
    x: -0.4,
    y: 0.7,
    z: 0,
    duration: 1.5,
    onUpdate: function () {
        camera.lookAt(0, 0.5, 0);
    }
})

//animate stuff

function animate() {
    requestAnimationFrame(animate);
    //controls.update();
    renderer.render(scene, camera);
    console.log(camera.rotation);
};

animate();