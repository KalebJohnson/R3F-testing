import React, {Suspense} from 'react';
import { Canvas, useThree, extend} from '@react-three/fiber';
import { OrbitControls, Effects, Billboard, Html, Text} from '@react-three/drei';
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import SkyBox from './comps/SkyBox';
import NavBall from './comps/NavBall';
import './index.css';

const Welcome = () => {
  return (
    <Billboard
      args={[2,1]}
      position={[-3.8,1,0]}
      follow={true} // Follow the camera (default=true)
      lockX={false} // Lock the rotation on the x axis (default=false)
      lockY={false} // Lock the rotation on the y axis (default=false)
      lockZ={false} // Lock the rotation on the z axis (default=false)
    >
      <Text
        position={[0,0,.01]}
        color="black" // default
        anchorX="center" // default
        anchorY="middle" // default
      >
        Navigate with this guy bellow!
      </Text>
      
    </Billboard>
  )
}


extend({GlitchPass, BloomPass });

function App() {
  return (
    <Canvas camera={{fov: 60}}>
      <Suspense fallback={null}>
        <SkyBox/>
        <Welcome/>
        <NavBall/>
        <mesh position={[-1,0,0]}>
          <boxBufferGeometry attach="geometry"></boxBufferGeometry>
          <meshLambertMaterial attach="material" color="red"></meshLambertMaterial>
        </mesh>
      </Suspense>
      <spotLight position={[10,5,0]} angle={0.3}/>
      <OrbitControls/>
      <ambientLight intensity={1}/>
    </Canvas>
  );
}

export default App;
