import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Vector3, PerspectiveCamera, Scene, WebGLRenderer, Group, Texture, TextureLoader, Fog, Points, PointsMaterial, BufferGeometry, Float32BufferAttribute } from "three";
import { gsap } from "gsap";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { useTheme } from "@/provider";
import { twMerge } from "tailwind-merge";

gsap.registerPlugin(THREE);

type TunnelProps = {
  started: boolean;
  onAnimationEnd?: () => void;
  tubeTextureImg?: string | undefined;
  className?: string;
}

const Tunnel: React.FC<TunnelProps> = ({ 
  started, 
  onAnimationEnd, 
  tubeTextureImg,
  className = "", 
}) => {
  const { theme } = useTheme(); 
  const lightColor = theme === "dark" ? 0xfefefe : 0x000000; // Adjust light color based on theme
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const rendererRef = useRef<WebGLRenderer>(null);
  const sceneRef = useRef<Scene>(null);
  const cameraRef = useRef<PerspectiveCamera>(null);
  const composerRef = useRef<EffectComposer>(null);
  const cameraGroupRef = useRef<Group>(null);
  const pathRef = useRef<THREE.CatmullRomCurve3>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);
  const tubeMatRef = useRef<THREE.MeshPhongMaterial>(null);

  const defaultUrl = "https://t3.ftcdn.net/jpg/08/53/79/60/360_F_853796022_XHrh59jpyl9jTaSTw0RULzjLShgvn75h.jpg"; // Default texture URL

  const cameraTargetPercentageRef = useRef(0); // target from GSAP
  const currentCameraPercentageRef = useRef(0); // for interpolation

  const timelineRef = useRef<gsap.core.Timeline>(null);
  const cleanupRef = useRef<() => void>(() => {});

  const cameraRotXRef = useRef(Math.PI); 
  const cameraRotYRef = useRef(0);

  const particles1Ref = useRef<Points | null>(null);
  const particles2Ref = useRef<Points | null>(null);
  const particles3Ref = useRef<Points | null>(null);

  const FADE_START = 0.9;
  const FADE_END = 1.0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
   
    const width = window.innerWidth;
    const height = window.innerHeight;


    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;


    const scene = new THREE.Scene();
    scene.fog = new Fog(lightColor, 5, 100);
    scene.background = new THREE.Color(lightColor); 
    sceneRef.current = scene;
    

    const camera = new PerspectiveCamera(45, width / height, 0.001, 200);
    camera.rotation.y = cameraRotXRef.current; // initial yaw
    camera.rotation.x = cameraRotYRef.current; // initial pitch

    const cameraGroup = new Group();
    cameraGroup.position.set(0, 0, 400);
    cameraGroup.add(camera);
    scene.add(cameraGroup);

    cameraRef.current = camera;
    cameraGroupRef.current = cameraGroup;

    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 1.5, 0.4, 0.85);
    bloomPass.threshold = 0;
    bloomPass.strength = 0.9;
    bloomPass.radius = 0;

    const composer = new EffectComposer(renderer);
    composer.setSize(width, height);
    composer.addPass(renderPass);
    composer.addPass(bloomPass);
    composerRef.current = composer;

    const rawPoints: [number, number, number][] = [
      [10, 89, 0],
      [50, 88, 10],
      [76, 139, 20],
      [126, 141, 12],
      [150, 112, 8],
      [157, 73, 0],
      [180, 44, 5],
      [207, 35, 10],
      [232, 36, 0],
      [360, 37, -10],
    ];
    
    const vecs: Vector3[] = rawPoints.map((p) => new Vector3(p[0], p[2], p[1]));
    const path = new THREE.CatmullRomCurve3(vecs, false, "catmullrom", 0.5);
    pathRef.current = path;

    
    const tubeGeo = new THREE.TubeGeometry(path, 300, 4, 32, false);

    const textureLoader = new TextureLoader();
    const tubeTexture = textureLoader.load(tubeTextureImg ||
      "",
      (tex: Texture) => {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(15, 2);
        tex.needsUpdate = true;
      },
      undefined,
      (err) => {
        console.error("Error loading texture:", err);
      }
    );

    const bumpMap = textureLoader.load(
      defaultUrl, 
      (tex: Texture) => {
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(15, 2);
      }
    );

    const tubeMat = new THREE.MeshPhongMaterial({
      side: THREE.BackSide,
      map: tubeTexture,
      shininess: 20,
      bumpMap: bumpMap,
      bumpScale: -0.03,
      // specular: 0x0b2349,
      transparent: true,
      opacity: 0,
    });
    tubeMatRef.current = tubeMat;

    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    // const S0 = 10; // try 10× or 20× (tweak to taste)
    // tubeMesh.scale.set(S0, S0, 1);
    scene.add(tubeMesh);

    const innerTubeGeo = new THREE.TubeGeometry(path, 150, 3.4, 32, false);
    const edges = new THREE.EdgesGeometry(innerTubeGeo);
    const wireMat = new THREE.LineBasicMaterial({
      linewidth: 2,
      opacity: 0,
      transparent: true,
      color: lightColor,
    });
    const wireframe = new THREE.LineSegments(edges, wireMat);
    scene.add(wireframe);

    const pointLight = new THREE.PointLight(lightColor, 0.15, 200);
    pointLight.castShadow = true;
    scene.add(pointLight);
    pointLightRef.current = pointLight;

    // add ambient light to brighten the tube material
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const particleTexture = textureLoader.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/68819/spikey.png");
    const particleMaterial = new PointsMaterial({
      size: 0.5,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      color: '#FBEEC1',
      depthWrite: false,
    });

    function createRandomPoints(count: number, rangeX: [number, number], rangeY: [number, number], rangeZ: [number, number]) {
      const geo = new BufferGeometry();
      const positions: number[] = [];
      for (let i = 0; i < count; i++) {
        const x = THREE.MathUtils.randFloat(rangeX[0], rangeX[1]);
        const y = THREE.MathUtils.randFloat(rangeY[0], rangeY[1]);
        const z = THREE.MathUtils.randFloat(rangeZ[0], rangeZ[1]);
        positions.push(x, y, z);
      }
      geo.setAttribute("position", new Float32BufferAttribute(positions, 3));
      return geo;
    }

    const pGeo1 = createRandomPoints(6800, [-250, 250], [-25, 25], [-250, 250]);
    const particleSystem1 = new Points(pGeo1, particleMaterial);
    scene.add(particleSystem1);
    particles1Ref.current = particleSystem1;

    const pGeo2 = createRandomPoints(6800, [0, 500], [-5, 5], [0, 500]);
    const particleSystem2 = new Points(pGeo2, particleMaterial);
    scene.add(particleSystem2);
    particles2Ref.current = particleSystem2;

    const pGeo3 = createRandomPoints(6800, [0, 500], [-5, 5], [0, 500]);
    const particleSystem3 = new Points(pGeo3, particleMaterial);
    scene.add(particleSystem3);
    particles3Ref.current = particleSystem3;

    const lastPoint = path.getPointAt(1.0);
    const lastTangent = path.getTangentAt(1.0).normalize();
    const lastPointRef = { current: lastPoint.clone() };
    const lastTangentRef = { current: lastTangent.clone() };

    const tubePerc = { percent: 0 };
    const timeline = gsap.timeline({
      paused: true,
      onUpdate: () => {
        cameraTargetPercentageRef.current = tubePerc.percent;
      },
      onComplete: () => onAnimationEnd && onAnimationEnd(),
    });

    timeline
      .to(tubeMat, 
        { opacity: 1, duration: 2, ease: "sine.inOut" }, 
        0
      )
      .to(wireMat, 
        { opacity: 0.1, duration: 2, ease: "sine.inOut" }, 
        0
      )
      .fromTo(tubePerc, { opacity: 0, autoAlpha: 0}, {
        autoAlpha: 1,
        opacity: 1,
        delay: 0,
        duration: 5,
      }, 0)
      .to(tubePerc, {
        percent: 1.1,
        ease: "power1.inOut",
        duration: 6, // change to whatever total time you want
        y: -500,
      }, 0);

    timelineRef.current = timeline;
    

    let rafId: number = 0;
    const render = () => {
      currentCameraPercentageRef.current +=
        (cameraTargetPercentageRef.current - currentCameraPercentageRef.current) * 0.1; // ease

      const t = currentCameraPercentageRef.current;

      if (t < 1.0) {
        const p1 = path.getPointAt(Math.min(t, 1.0));
        const p2 = path.getPointAt(Math.min(t + 0.03, 1.0));
        cameraGroupRef.current!.position.set(p1.x, p1.y, p1.z);
        cameraGroupRef.current!.lookAt(p2);
        pointLight.position.set(p2.x, p2.y, p2.z);
      } else {
        const over = t - 1.0;                      
        const extraDist = over * 50;             
        const newPos = lastPointRef.current.clone().addScaledVector(lastTangentRef.current, extraDist);
        const lookPos = newPos.clone().addScaledVector(lastTangentRef.current, 10);

        cameraGroupRef.current!.position.copy(newPos);
        cameraGroupRef.current!.lookAt(lookPos);
        pointLight.position.copy(lookPos);
      }

      if (t >= FADE_START && t <= FADE_END) {
        const fadeNorm = (t - FADE_START) / (FADE_END - FADE_START); // 0 → 1
        const newOpacity = 1 - THREE.MathUtils.clamp(fadeNorm, 0, 1);
        (tubeMesh.material as THREE.MeshPhongMaterial).opacity = newOpacity;
      } else if (t > FADE_END) {
        (tubeMesh.material as THREE.MeshPhongMaterial).opacity = 0;
      } else {
        (tubeMesh.material as THREE.MeshPhongMaterial).opacity = 1;
      }

      const tNext = t + 0.03; 
      if (pathRef.current && cameraGroupRef.current && pointLight) {
        const p1 = pathRef.current.getPointAt(t);
        const p2 = pathRef.current.getPointAt(Math.min(tNext, 1));
        if (!p1 || !p2) return;
        cameraGroupRef.current.position.set(p1.x, p1.y, p1.z);
        cameraGroupRef.current.lookAt(p2);
        pointLight.position.set(p2.x, p2.y, p2.z);
      }

      if (particles1Ref.current)
        particles1Ref.current.rotation.y += 0.00002;
      if (particles2Ref.current)
        particles2Ref.current.rotation.x += 0.00005;
      if (particles3Ref.current)
        particles3Ref.current.rotation.z += 0.00001;

      composerRef.current!.render();
      rafId = requestAnimationFrame(render);
    };
    render();

    function onWindowResize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (cameraRef.current && rendererRef.current && composerRef.current) {
        cameraRef.current.aspect = w / h;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(w, h);
        composerRef.current.setSize(w, h);
      }
    }
    window.addEventListener("resize", onWindowResize);

    cleanupRef.current = () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onWindowResize);

      tubeGeo.dispose();
      innerTubeGeo.dispose();
      tubeMat.dispose();
      wireMat.dispose();
      pGeo1.dispose();
      pGeo2.dispose();
      pGeo3.dispose();
      particleMaterial.dispose();

      renderer.dispose();
      composer.dispose();
      scene.clear();
    }
    return () => cleanupRef.current();
  }, []);

  useEffect(() => {
  if (!tubeMatRef.current) return;                 // scene not ready yet

  const loader = new THREE.TextureLoader();
  const url = tubeTextureImg || defaultUrl;

  let cancelled = false;

  loader.load(
    url,
    (tex) => {
      if (cancelled) { tex.dispose(); return; } 

      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(15, 2);

      const old = tubeMatRef.current!.map;
      if (old) old.dispose();

      tubeMatRef.current!.map = tex;
      tubeMatRef.current!.needsUpdate = true;
    },
    undefined,
    (err) => console.error("texture load failed:", err)
  );

  return () => { cancelled = true; };
  }, [tubeTextureImg]);

  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;

    tl.eventCallback("onComplete", () => {
      if (onAnimationEnd) {
        onAnimationEnd();
      }
    });
  }, [onAnimationEnd]);

  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;

    if (started) {
      tl.play(0);
    } else {
      tl.pause(0);
    }
  }, [started]);

  return (
    <canvas
      ref={canvasRef}
      className={twMerge(className, "animation fixed top-0 left-0 w-full h-screen")}
    />
  );
};

export default Tunnel;
