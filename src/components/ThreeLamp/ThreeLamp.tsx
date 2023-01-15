
const ThreeLamp = () => {
  return (
      <mesh position={[0, 0, 0]} rotation={[Math.PI * 0.5, 0, 0]}>
        <cylinderBufferGeometry attach="geometry" args={[0.5, 0.5, 0.15, 32]} />
        <meshStandardMaterial attach="material" color="#fff" />
      </mesh>
  );
};

export default ThreeLamp;
