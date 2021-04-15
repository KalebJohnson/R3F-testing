import { useSpring, animated} from '@react-spring/three'
import React , { useState } from 'react';
import { Html } from '@react-three/drei';


const Start = () => {

    const [active, setActive] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [ beep, setBeep] = useState(true)
    const ani = useSpring({
        color: ( hovered || active) ? "blue": "lightblue",
        scale: hovered ? [0.3,0.3,0.3] : [0.2,0.2,0.2],
        position: active ? [-50,0,0] : [0,0,0],
        
    })
    const ani2 = useSpring({
      scale: hovered ? [0.4,0.4,0.4] : [0.2,0.2,0.2],
      rotation: active ? [0.1,-0.3,0.04] : [-0.1,0.3,0],
      position: active ? [50,0,0] : [0,0,0]
  })
    const audio1 = new Audio("/button-31.mp3")
    const sound = () => {
        audio1.play()
    }

    return(
        <group>
            <animated.mesh
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={()=> (setActive(!active), sound())}
            position={ani.position}
            scale={ani.scale}
            >
            <sphereGeometry attach="geometry" args={[1,256,256]}/>
            <meshLambertMaterial metalness={1} color="lightblue" material="material" />
            </animated.mesh>

            <animated.mesh
            scale={ani2.scale}
            position={ani2.position}
            >
            <sphereGeometry attach="geometry" args={[1,256,256]}/>
            <meshLambertMaterial transparent={true} opacity={0.5} metalness={1} color="red" material="material" />
            </animated.mesh>

        </group>
    )
  }

export default Start;