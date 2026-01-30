import React, { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

/* ===============================
   ROBOT MODEL – STABLE + BLINK
================================ */
function RobotModel() {
  const { scene, animations } = useGLTF("/models/KIDDO SHADOW ROBOT.glb");
  const mixer = useRef(null);

  useEffect(() => {
    // 🔒 Lock transforms (NO shake)
    scene.rotation.set(0, Math.PI, 0);
    scene.scale.setScalar(0.72);

    // ✅ Slightly UP (perfect framing)
    scene.position.set(0, -11.6, 0);

    if (animations.length) {
      mixer.current = new THREE.AnimationMixer(scene);

      // 👀 Find blink / eye animation
      const blinkClip =
        animations.find((clip) =>
          clip.name.toLowerCase().includes("blink")
        ) ||
        animations.find((clip) =>
          clip.name.toLowerCase().includes("eye")
        );

      if (blinkClip) {
        const action = mixer.current.clipAction(blinkClip);
        action.loop = THREE.LoopRepeat;
        action.play();
      }
    }
  }, [scene, animations]);

  // 🔥 REQUIRED for blink to work
  useFrame((_, delta) => {
    mixer.current?.update(delta);
  });

  return <primitive object={scene} />;
}

/* ===============================
   CAMERA – EYE LEVEL
================================ */
function FaceCamera() {
  const { camera } = useThree();

  useEffect(() => {
    const setCamera = () => {
      if (window.innerWidth < 768) {
        // 📱 Mobile
        camera.position.set(0, 3.1, 9.0);
        camera.lookAt(0, 2.6, 0);
        camera.fov = 34;
      } else {
        // 🖥 Desktop
        camera.position.set(0, 3.5, 8.6);
        camera.lookAt(0, 2.9, 0);
        camera.fov = 32;
      }
      camera.updateProjectionMatrix();
    };

    setCamera();
    window.addEventListener("resize", setCamera);
    return () => window.removeEventListener("resize", setCamera);
  }, [camera]);

  return null;
}

/* ===============================
   VIEWER
================================ */
export default function RobotViewer() {
  return (
    <Canvas style={{ width: "100%", height: "100%" }}>
      <FaceCamera />

      {/* Lighting */}
      <ambientLight intensity={1.1} />
      <directionalLight position={[-6, 10, 6]} intensity={1.2} />
      <directionalLight position={[5, 3, 5]} intensity={0.6} />
      <spotLight position={[0, 8, -6]} intensity={0.35} />

      <Suspense fallback={null}>
        <RobotModel />
      </Suspense>

      {/* Lock camera */}
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
}
