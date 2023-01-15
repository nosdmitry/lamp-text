import { extend, useThree, useFrame } from 'react-three-fiber';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import * as THREE from 'three';
import { useRef } from 'react';

// extend THREE to include TrackballControls
extend({ TrackballControls });

// key code constants
const ALT_KEY = 18;
const CTRL_KEY = 17;
const CMD_KEY = 91;

const Controls = ({}) => {
  const controls = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    // @ts-ignore
    controls.current.update();
  });

  return (
    // @ts-ignore
    <trackballControls
      ref={controls}
      args={[camera, gl.domElement]}
      dynamicDampingFactor={0.1}
      rotateSpeed={10}
      // keys={[
      //   ALT_KEY, // orbit
      //   CTRL_KEY, // zoom
      //   CMD_KEY, // pan
      // ]}
      // mouseButtons={{
      //   LEFT: THREE.MOUSE.PAN, // make pan the default instead of rotate
      //   RIGHT: THREE.MOUSE.ROTATE,
      // }}
    />
  );
};

export default Controls;
