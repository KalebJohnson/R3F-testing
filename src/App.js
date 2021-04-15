import React, {Suspense, useState} from 'react';
import { Canvas, useThree, extend, useFrame} from '@react-three/fiber';
import { OrbitControls, Effects, Billboard, Html, Text, useTexture} from '@react-three/drei';
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";
import SkyBox from './comps/SkyBox';
import NavBall from './comps/NavBall';
import ActionGroup from './comps/ActionGroup';
import Start from './comps/Start';
import * as THREE from 'three'
import './index.css';



function Rig() {
  const { camera, mouse } = useThree()
  const vec = new THREE.Vector3()
  return useFrame(() => camera.position.lerp(vec.set(mouse.x * .5, mouse.y * .5, camera.position.z), 0.02))
}


const Bootup = () => {
  return (
    
    <Html center={true}>
      <div><img src="/bootup.gif"/></div>
    </Html>
   
  )
}


extend({GlitchPass});

function App() {
  return (
    <Canvas camera={{fov: 60}}>
      <Suspense fallback={<Bootup/>}>
        <SkyBox/>
        <ActionGroup/>
        <NavBall/>
      </Suspense>
      <ambientLight intensity={1}/> 
      <Rig />
    </Canvas>
  );
}

export default App;
