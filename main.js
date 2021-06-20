import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(addStar);

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;


// Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');



const m = new THREE.Matrix4();

m.set(11, 12, 13, 14,
  21, 22, 23, 24,
  31, 32, 33, 34,
  41, 42, 43, 44);

const loader = new GLTFLoader();
let heart = {};

const prideTexture = new THREE.TextureLoader().load('pride.png');
prideTexture.encoding = THREE.sRGBEncoding;

prideTexture.flipY = false;

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: prideTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

const material = new THREE.MeshStandardMaterial({
  map: prideTexture,
  normalMap: normalTexture,
});

loader.load('./heart.glb', function (gltf) {
  gltf.scene.scale.set(0.1, 0.1, 0.1)
  heart = gltf.scene;
  window.heart = heart;

  let mesh = gltf.scene.children[0];
  mesh.material = material;
  mesh.scale.set(0.1, 0.1, 0.1)
  mesh.position.set(-2.3, -2.50,  0)
  mesh.traverse( function ( node ) {
    if ( node.isMesh ) 
      node.material = material;

  } );
  scene.add(mesh);

}, undefined, function (error) {
  console.error(error);
});


moon.position.z = 30;
moon.position.setX(-10);

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;
  // heart.position.z -= 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);
  moon.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();
