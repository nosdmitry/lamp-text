// import { useControls } from "leva";
import { FC } from "react";

interface IProps {
  width: number,
  height?: number,
  deep?: number,
  positionX?: number,
  positionY?: number, 
  positionZ?: number,
}

const Background: FC<IProps> = (props) => {

  // const { bgWidth, bgHeight, bgDeep,  boxPositionX, boxPositionY, boxPositionZ } = useControls('BG options', {
  //   bgWidth: { value: 6, min: 0.1, max: 30, step: 0.01 }, 
  //   bgHeight: { value: 6, min: 0.1, max: 15, step: 0.01 }, 
  //   bgDeep:{ value: 0.3, min: 0.01, max: 2, step: 0.01 }, 
  //   boxPositionX:  { value: 2.19, min: -10, max: 10, step: 0.01 }, 
  //   boxPositionY: { value: -2.30, min: -10, max: 10, step: 0.01 }, 
  //   boxPositionZ:{ value: -0.3, min: -3, max: 1, step: 0.01 }, 
  // })

  const { width = 6, height = 6, deep = 0.3, positionX = 2.2, positionY = -2.3, positionZ = -0.3 } = props;

  return (
    <mesh position={[positionX, positionY, positionZ]}>
      <boxGeometry args={[width, height, deep]} />
      <meshStandardMaterial color="black" />
  </mesh>
  );
}

export default Background;
