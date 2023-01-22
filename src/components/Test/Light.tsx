// @ts-nocheck

import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { DirectionalLight } from "three";

const Light = () => {
  
  const lightRef = useRef<THREE.DirectionalLight>();
  useHelper(lightRef, DirectionalLight, 5, "red");

  return (
    <>
      <ambientLight intensity={0.05} />
      <directionalLight ref={lightRef} color="white" intensity={0.1} position={[2.0, 0.5, 5]} />
    </>
  )
}

export default Light;