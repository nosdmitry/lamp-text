import * as React from 'react';
import { Canvas } from 'react-three-fiber';
import Controls from '../Controls/Controls';
import ThreeLamp from '../ThreeLamp/ThreeLamp';

const LampField = () => {

  const CELL_AMOUNT_HORIZONTAL = 100;
  const CELL_AMOUNT_VERTICAL = 5;
  const SPACE_SIZE = 1;

  return (
    <Canvas camera={{ position: [0, 0, 25] }}>
      <Controls />
      <ambientLight color="#ffffff" intensity={0.1} />
      <hemisphereLight
        color="#ffffff"
        groundColor="black"
        intensity={1.0}
      />
      
      {
        [...Array(CELL_AMOUNT_VERTICAL)].map((item, y) => {
          return [...Array(CELL_AMOUNT_HORIZONTAL)].map((element, x) => {
            return (
              <mesh
                key={`${x}${y}`}
                position={[x * 1.1, y * 1.1, 0]}
                rotation={[Math.PI * 0.5, 0, 0]}
              >
                <cylinderBufferGeometry
                  attach="geometry"
                  args={[0.5, 0.5, 0.15, 32]}
                />
                <meshStandardMaterial attach="material" color="#fff" />
              </mesh>
            )
          })
        }) 
      }

          {/* <mesh
            key={`d.id`}
            position={[0, 0, 0]}
            rotation={[Math.PI * 0.5, 0, 0]}
          >
            <cylinderBufferGeometry
              attach="geometry"
              args={[0.5, 0.5, 0.15, 32]}
            />
            <meshStandardMaterial attach="material" color="#fff" />
          </mesh>

          <mesh
            key={`32`}
            position={[1.1, 0, 0]}
            rotation={[Math.PI * 0.5, 0, 0]}
          >
            <cylinderBufferGeometry
              attach="geometry"
              args={[0.5, 0.5, 0.15, 32]}
            />
            <meshStandardMaterial attach="material" color="#fff" />
          </mesh> */}
    </Canvas>
  );
};

export default LampField;
