import { FC } from "react";

interface IPlane {
  testing: boolean
}

const Plane: FC<IPlane> = ({ testing }) => {

  return (
    <mesh position={[0, 0, -2]}>
      { testing ? <axesHelper /> : null }
      <planeGeometry args={[50, 50, 10]}  />
      <meshStandardMaterial color={"#101010"} />
    </mesh>
  )
}

export default Plane;