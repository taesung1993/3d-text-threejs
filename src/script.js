import './styles.css';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Axes helper
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTextures = [
  textureLoader.load('/images/textures/matcaps/1.png'),
  textureLoader.load('/images/textures/matcaps/2.png'),
  textureLoader.load('/images/textures/matcaps/3.png'),
  textureLoader.load('/images/textures/matcaps/4.png'),
  textureLoader.load('/images/textures/matcaps/5.png'),
  textureLoader.load('/images/textures/matcaps/6.png'),
  textureLoader.load('/images/textures/matcaps/7.png'),
  textureLoader.load('/images/textures/matcaps/8.png'),
];

/**
 * Fonts
 */

const fontLoader = new FontLoader();
fontLoader.load('/fonts/helvetiker_regular.typeface.json',
  (font) => {
    const textGeometry = new TextGeometry(
      '3D Text By Mason',
      {
        font: font,
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      }
    );

    // set center position
    textGeometry.center();
    
    const textMaterial = new THREE.MeshMatcapMaterial({
      matcap: matcapTextures[0]
    });

    const text = new THREE.Mesh(textGeometry, textMaterial);
    scene.add(text);
  
    /* create donut */
    const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);

    for(let i=0; i<200; i++) {
      const donut = new THREE.Mesh(donutGeometry, donutMaterial);
      const donutMaterial = new THREE.MeshMatcapMaterial({
        matcap: matcapTextures[i % 8]
      });

      /* set random position */
      donut.position.x = (Math.random() - 0.5) * 10;
      donut.position.y = (Math.random() - 0.5) * 10;
      donut.position.z = (Math.random() - 0.5) * 10;

      /* set random rotation */
      donut.rotation.x = Math.random() * Math.PI;
      donut.rotation.y = Math.random() * Math.PI;

      /* set random scale */
      const scale = Math.random();
      donut.scale.set(scale, scale, scale);

      scene.add(donut);
    }
  }
);

// Object
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({color: 0xff0000});
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

// Cursor
const cursor = {
    x: 0,
    y: 0
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 7;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Controls
const controls = new OrbitControls(camera, canvas);

// Animation
const tick = () => {
  // Cursor
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

// Resize Event
window.addEventListener('resize', () => {
    // Update Sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update Camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
});