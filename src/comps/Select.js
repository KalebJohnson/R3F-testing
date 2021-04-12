import { useSpring, animated } from '@react-spring/three'
import React , { useState } from 'react';
import { Octahedron } from '@react-three/drei';

const Select = (props) => {
    const [active, setActive] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [ beep, setBeep] = useState(true)
    const ani = useSpring({
        color: hovered ? "orange": "lightblue",
        scale: active ? [0.2,0.2,0.2] : [0.1,0.1,0.1],
    })
    const audio1 = new Audio("/button-31.mp3")
    const audio2 = new Audio("/button-32.mp3")
    const sound = () => {
        beep ? audio1.play() : audio2.play()
        setBeep(!beep)
    }
        
    return (
  <animated.mesh 
    position={props.position}
    rotation={[-0.1,0.3,0]}
    onPointerOver={() => setHovered(true)}
    onPointerOut={() => setHovered(false)}
    onClick={()=> (setActive(!active), sound())}
    scale={ani.scale}
    >
  <Octahedron attach="geometry"/>
   <animated.meshBasicMaterial  color={ani.color}  attach="material"/>
 </animated.mesh> 

    )
  }

export default Select;