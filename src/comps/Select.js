import { useSpring, animated } from '@react-spring/three'
import React , { useState } from 'react';
import { Html, Text } from '@react-three/drei';
import { Button } from '@material-ui/core';


const Select = (props) => {
    const [active, setActive] = useState(false)
    const [hovered2, setHovered2] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [ beep, setBeep] = useState(true)
    const ani = useSpring({
        color: ( hovered || active) ? "blue": "lightblue",
        scale: active ? [0.2,0.2,0.2] : [0.13,0.13,0.13],
    })
    const ani2 = useSpring({
      scale: ( hovered || active) ? [0.3,0.3,0.3] : [0.15,0.15,0.15],
      rotation: active ? [0.1,-0.3,0.04] : [-0.1,0.3,0],
      rotation: ( hovered || active) ? [0,0,0.75] : [0,0,0]
  })
    const audio1 = new Audio("/button-31.mp3")
    const audio2 = new Audio("/button-32.mp3")
    const sound = () => {
        beep ? audio1.play() : audio2.play()
        setBeep(!beep)
    }
        
    return (
      <group>
        <animated.mesh 
          position={props.position1}
          rotation={[-0.1,0.3,0]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={()=> (setActive(!active), sound())}
          scale={[0.13,0.13,0.13]}
          >

        <boxBufferGeometry args={[1,1,1]} attach="geometry"/>
        <animated.meshBasicMaterial  color={ani.color}  attach="material"/>
      
      </animated.mesh> 

      <animated.group position={props.position1}>
        
      <animated.mesh 
            rotation={ani2.rotation}
            scale={ani2.scale}
            >
        <planeBufferGeometry args={[1,1]} attach="geometry"/>
        <animated.meshBasicMaterial transparent opacity={0.4} color={ani.color}  attach="material"/>

        </animated.mesh> 
      </animated.group>
    </group>

    )
  }

export default Select;