import React, {Suspense} from 'react';
import { Canvas, useThree} from '@react-three/fiber';
import { OrbitControls, Reflector, useCubeTexture} from '@react-three/drei';
import SkyBox from './comps/SkyBox';
import NavBall from './comps/NavBall';
import './index.css';



function App() {
  return (
    <Canvas camera={{fov: 60}}>
      <Suspense fallback={null}>
      <SkyBox/>
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
