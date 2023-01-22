import { PerspectiveCamera } from "@react-three/drei";
import { useControls } from "leva";
import { useRef } from "react";
import { useFrame } from "react-three-fiber";

const MainCamera = () => {

  const camera = useRef<THREE.PerspectiveCamera>();
  const { cameraX, cameraY, cameraZ, moveX, moveY, moveZ } = useControls('Camera', {
    cameraX: { value: 9.53, min: -30, max: 30, step: 0.01 }, 
    cameraY: { value: 5.05, min: -30, max: 30, step: 0.01 }, 
    cameraZ: { value: 13.65, min: -30, max: 30, step: 0.01 },
    moveX: { value: 3.69, min: -6, max: 6, step: 0.01 }, 
    moveY: { value: -3.90, min: -6, max: 6, step: 0.01 }, 
    moveZ: { value: -1.53, min: -6, max: 6, step: 0.01 }, 
  })

  useFrame(() => {
    if (camera.current) {
      camera.current.lookAt( moveX, moveY, moveZ);
    }
  })

  return (
    <PerspectiveCamera 
      ref={camera}
      makeDefault 
      position={[cameraX, cameraY, cameraZ]}
   />
  );  
}

export default MainCamera;

