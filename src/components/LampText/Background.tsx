import { useControls } from "leva";

const Background = () => {

  const { bgWidth, bgHeight, bgDeep,  boxPositionX, boxPositionY, boxPositionZ } = useControls('BG options', {
    bgWidth: { value: 6, min: 0.1, max: 30, step: 0.01 }, 
    bgHeight: { value: 6, min: 0.1, max: 15, step: 0.01 }, 
    bgDeep:{ value: 0.3, min: 0.01, max: 2, step: 0.01 }, 
    boxPositionX:  { value: 2.19, min: -10, max: 10, step: 0.01 }, 
    boxPositionY: { value: -2.30, min: -10, max: 10, step: 0.01 }, 
    boxPositionZ:{ value: -0.3, min: -3, max: 1, step: 0.01 }, 
  })

  return (
    <mesh position={[boxPositionX, boxPositionY, boxPositionZ]}>
      <boxGeometry args={[bgWidth, bgHeight, bgDeep]} />
      <meshStandardMaterial color="black" />
  </mesh>
  );
}

export default Background;
