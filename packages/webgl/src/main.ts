import { Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import {
  createCube,
  createElectron,
  createPointLight,
  createSphere,
} from './utils';

const { innerWidth, innerHeight } = window;

const scene = new Scene();
// prettier-ignore
const camera = new PerspectiveCamera(40, innerWidth / innerHeight, 0.0001, 10000);
camera.position.set(0, 0, 50);

const renderer = new WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

const yellow = new Color('hsl(40, 80%, 60%)');
const pink = new Color('hsl(306, 80%, 60%)');
const colorLight = new Color('hsl(40, 100%, 95%)');

const cube = createCube(yellow);
const light = createPointLight(2, colorLight);
const light2 = createPointLight(0.5, colorLight);

light.position.set(-40, -20, 20);
light2.position.set(10, 20, 40);

scene.add(cube);
scene.add(light);
scene.add(light2);

camera.position.z = 15;
cube.rotation.set(20, 0, -20);

const nucleus = createSphere(3);
const l1 = createPointLight(0.8);
const l2 = createPointLight(0.4);
l1.position.set(60, 20, 60);
l2.position.set(-30, 0, 20);

scene.add(nucleus, l1, l2);

const electrons = [10, 5, -5, -10].map((e) => {
  const electron = createElectron(0.4);
  electron.sphere.position.set(e, 0, 0);

  scene.add(electron.pivot);
  return electron;
});
nucleus.add(...[...electrons].map((e) => e.pivot));

function handleResize() {
  const { innerWidth, innerHeight } = window;
  renderer.setSize(innerWidth, innerHeight);

  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
}

function loop() {
  cube.rotation.x += 0.01;
  cube.rotation.z -= 0.05;

  electrons.forEach((electron, i) => {
    electron.pivot.rotation.z += 0.01 * (i + 1);
  });
  nucleus.rotation.z += 0.01;
  nucleus.rotation.x += 0.02;
  nucleus.rotation.y += 0.03;

  renderer.render(scene, camera);
  requestAnimationFrame(loop);
}

export function init2() {
  loop();
  window.addEventListener('resize', handleResize);
}
