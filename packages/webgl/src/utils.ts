import {
  Sphere,
  MeshPhongMaterial,
  SphereGeometry,
  Mesh,
  PointLight,
  Object3D,
  BoxGeometry,
  Color,
} from 'three';

export function createCube(color: Color) {
  const cubeGeometry = new BoxGeometry(1, 1.5, 0.9);
  const cubeMaterial = new MeshPhongMaterial({
    color,
    shininess: 80,
  });
  const cube = new Mesh(cubeGeometry, cubeMaterial);
  return cube;
}

export function createSphere(r: Sphere['radius'] = 1, color = 0xffffff) {
  const sphereMat = new MeshPhongMaterial({
    color,
    shininess: 30,
  });

  const sphereGeo = new SphereGeometry(r, 20, 20);
  return new Mesh(sphereGeo, sphereMat);
}

export function createPointLight(
  intensity: PointLight['intensity'] = 1,
  color: number | Color = 0xffffff
) {
  return new PointLight(color, intensity);
}

export function createElectron(r = 0.4, color = 0xffffff) {
  const sphere = createSphere(r, color);
  const pivot = new Object3D();

  pivot.add(sphere);

  return { sphere, pivot };
}
