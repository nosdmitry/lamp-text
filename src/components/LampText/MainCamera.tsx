import { PerspectiveCamera } from "@react-three/drei";
import { FC } from "react";

interface IProps {
  cameraX?: number,
  cameraY?: number,
  cameraZ?: number
}

const MainCamera: FC<IProps> = (props) => {

  const { cameraX = 0, cameraY = 0, cameraZ = 0 } = props;

  // const camera = useRef<THREE.PerspectiveCamera>();
  // const { cameraX, cameraY, cameraZ, moveX, moveY, moveZ } = useControls('Camera', {
  //   cameraX: { value: 0, min: -30, max: 30, step: 0.01 }, 
  //   cameraY: { value: 0, min: -30, max: 30, step: 0.01 }, 
  //   cameraZ: { value: 13.65, min: -30, max: 30, step: 0.01 },
  //   moveX: { value: 0, min: -6, max: 6, step: 0.01 }, 
  //   moveY: { value: 0, min: -6, max: 6, step: 0.01 }, 
  //   moveZ: { value: 0, min: -6, max: 6, step: 0.01 }, 
  // })

  // useFrame(() => {
  //   if (camera.current) {
  //     camera.current.lookAt( moveX, moveY, moveZ);
  //   }
  // })

  return (
    <PerspectiveCamera 
      makeDefault 
      position={[cameraX, cameraY, cameraZ]}
   />
  );  
}

export default MainCamera;

