
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber'
import { useControls } from 'leva';
import AnimatedBox from './AnimatedBox';
import Light from './Light';
import Plane from './Plane';


const Test = () => {

  const testing = true;
  const { boxX, boxY, boxZ } = useControls({ 
    boxX: { value: 0, min: 0, max: 10, step: 0.01 },
    boxY: { value: 2, min: 0, max: 10, step: 0.01 },
    boxZ: { value: 0, min: 0, max: 10, step: 0.01 },
  })

  const { cameraX, cameraY, cameraZ } = useControls({ 
    cameraX: { value: 5, min: 0, max: 20, step: 0.01 },
    cameraY: { value: 5, min: 0, max: 20, step: 0.01 },
    cameraZ: { value: 5, min: 0, max: 20, step: 0.01 },
  })


  return (
    
      <Canvas>
        { testing ? <gridHelper args={[100, 100]} /> : null }
        <PerspectiveCamera makeDefault  position={[cameraX, cameraY, cameraZ]} />
        <OrbitControls />
        <Light />
        <AnimatedBox testing={testing} position={{boxX, boxY, boxZ}} />
        <Plane testing={false} />
        <mesh position={[3, 2, 0]}>
          <sphereGeometry />
          <meshStandardMaterial />
        </mesh>
        
        <pointLight 
          distance={9}
          position={[0, 2, 3.3]}
          intensity={2.2}
          decay={30}
          color={"#3f3"}
        />

        <pointLight 
          distance={5}
          position={[0, 2, 3]}
          intensity={1.2}
          decay={30}
          color={"#2f0"}
        />
        <mesh position={[0, 2, 3]} rotation={[Math.PI * 0.5, 0, 0]}>
        
          <cylinderBufferGeometry
            attach="geometry"
            args={[0.5, 0.5, 0.15, 32]}
          />
          <meshStandardMaterial attach="material" color={"green"} />
        </mesh>

        <mesh position={[1.2, 2, 3]} rotation={[Math.PI * 0.5, 0, 0]}>
        
          <cylinderBufferGeometry
            attach="geometry"
            args={[0.5, 0.5, 0.15, 32]}
          />
          <meshStandardMaterial attach="material"  />
        </mesh>

      </Canvas>
  );
}

export default Test;
