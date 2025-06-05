import { BoxGeometry, BufferGeometry, Matrix4, Mesh, MeshStandardMaterial } from "three";
import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { ImprovedNoise } from "three/examples/jsm/Addons.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const generateHeight = (width: number, height: number): number[] => {
  const data = new Array(width * height).fill(0);
  const perlin = new ImprovedNoise();
  let quality = 2;
  const z = Math.random() * 100;

  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < data.length; i++) {
      const x = i % width;
      const y = ~~(i / width);
      data[i] += perlin.noise(x / quality, y / quality, z) * quality;
    }
    quality *= 4;
  }

  return data;
}

const getY = (data: number[], x: number, z: number, width: number): number => {
  return Math.floor(data[x + z * width] * 0.15);
}

const Terrain = () => {

  const { scene } = useThree();

  useEffect(() => {
    const worldWidth = 32;
    const worldDepth = 32;
    const scale = 1;

    const data = generateHeight(worldWidth, worldDepth);
    const geometries: BufferGeometry[] = [];
    const matrix = new Matrix4();
    const cubeGeo = new BoxGeometry(scale, scale, scale);

    for (let z = 0; z < worldDepth; z++) {
      for (let x = 0; x < worldWidth; x++) {
        const y = getY(data, x, z, worldWidth);
        matrix.makeTranslation(x * scale, y * scale, z * scale);
        const cube = cubeGeo.clone();
        geometries.push(cube.applyMatrix4(matrix));
      }
    }

    const mergedGeometry = mergeGeometries(geometries, false);
    const material = new MeshStandardMaterial({ color: "#55cc55", wireframe: false});
    const mesh = new Mesh(mergedGeometry, material);

    // const texture = new TextureLoader().load('/textures/minecraft/atlas.png', (texture) => {
    //   texture.colorSpace = SRGBColorSpace;
    //   texture.magFilter = NearestFilter;
    // });
   
    scene.add(mesh);

    return () => {
      scene.remove(mesh);
      mergedGeometry.dispose();
      material.dispose();
    }
  }, [scene])

  return null;
}

export default Terrain;