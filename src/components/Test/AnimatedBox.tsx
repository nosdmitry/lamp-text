import { FC, useRef } from "react";
import { useFrame } from "react-three-fiber";

interface IAnimatedBoxProps {
  position: {
    boxX: number,
    boxY: number,
    boxZ: number,
  },
  testing: boolean,
}

const AnimatedBox: FC<IAnimatedBoxProps> = ({ testing, position }) => {
  const {boxX, boxY, boxZ} = position;

  const meshRef = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if(meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  })
  

  return (
    <mesh ref={meshRef} position={[boxX, boxY, boxZ]}>
      { testing ? <axesHelper args={[2]} /> : null }
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={"gray"} />
    </mesh>  
  )
}

export default AnimatedBox;