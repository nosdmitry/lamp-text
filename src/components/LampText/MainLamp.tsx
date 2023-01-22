import { useControls } from "leva";
import { FC } from "react";

interface IMainLamp {
  postition: {
    x: number,
    y: number,
  },
  isActive: boolean
}

const MainLamp: FC<IMainLamp> = ({postition, isActive}) => {
  
  const { lampColor, mainColor, mainColorInt, mainColorDecay, secondColor } = useControls('Lamp lights', {
    lampColor: { value: '#004280'}, 
    mainColor: { value: '#6caaac' },
    mainColorInt: { value: 30.00, min: 0, max: 30, step: 0.01 },
    mainColorDecay: { value: 32.71, min: 0, max: 50, step: 0.01 },
    secondColor: { value: '#2f0'}
  })

  const { x, y } = postition;
  const NOT_ACTIVE_LAMP_COLOR = "#101010";

  function setLampColor(): string {
    return isActive ? lampColor : NOT_ACTIVE_LAMP_COLOR;
  }

  return (
    <>
      <pointLight 
        distance={19}
        position={[x, y, 0.3]}
        intensity={mainColorInt}
        decay={mainColorDecay}
        color={mainColor}
        visible={isActive}
      />

      <pointLight 
        distance={15}
        position={[x, y, 4]}
        intensity={ 3.2 }
        decay={30}
        color={secondColor}
        visible={false}
      />

      <mesh position={[x, y, 0]} rotation={[Math.PI * 0.5, 0, 0]}>
        <cylinderBufferGeometry attach="geometry" args={[0.5, 0.5, 0.15, 32]} />
        <meshStandardMaterial attach="material" color={setLampColor()} />
      </mesh>
    </>
  );
};

export default MainLamp;
