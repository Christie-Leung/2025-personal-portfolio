import { Page } from "@/components";
import { Terrain } from "@/threejs";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { AmbientLight, BoxGeometry, Mesh, MeshStandardMaterial, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from '@react-three/drei';

const StartScreen = () => {

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    )
    const renderer = new WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);
    scene.add(cube);

    const light = new AmbientLight(0xffffff, 1);
    scene.add(light);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    }
  }, []);

  return (
    <div className="w-screen h-screen">
      <Canvas camera={{ position: [0, 10, 20], fov: 60 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <Terrain />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}

export default StartScreen;