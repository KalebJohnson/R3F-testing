import React, { useRef, useFrame, useState } from 'react';
import { CubeCamera, Effects, useTexture } from '@react-three/drei';
import { useSpring, animated} from '@react-spring/three';
import Start from './Start';
import Select from './Select';

export default function NavBall(){
    const Skills = {position1:[0.7,0.83,0.1]}
    const Education = {position1:[-0.7,0.8,0.1]}
    const Projects = {position1:[-0.02,1.05,0.1]}
    const options = [Skills, Projects, Education]
    //const ringRef = useRef();
    const holotexture = useTexture('/hologram.jpg')
    //useFrame(() => {
    //  ringRef.current.rotation.z  += 0.01
    //})


    const [active, setActive] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [start, setStart] = useState(false)
    const [glitch, setGlitch] = useState(false)

    const ani = useSpring({
        config: { mass:1, tension:10, friction:8 },
        color: ( hovered || active) ? "blue": "lightblue",
        scale: hovered ? [0.3,0.3,0.3] : [0.2,0.2,0.2],
        position: active ? [-3.8,-1.5,0] : [-3.8,-10,0],
    })
    const button1 = useSpring({
        color: ( hovered || active) ? "blue": "lightblue",
        scale: hovered ? [0.3,0.3,0.3] : [0.2,0.2,0.2],
        position: start ? [-20,0,0] : [0,0,0],
    })
    const button2 = useSpring({
        scale: hovered ? [0.4,0.4,0.4] : [0.2,0.2,0.2],
        rotation: start ? [0.1,-0.3,0.04] : [-0.1,0.3,0],
        position: start ? [20,0,0] : [0,0,0]
    })

    const audio1 = new Audio("/button-31.mp3")
    const sound = () => {
        audio1.play()
    }

    return(
    <>
    { glitch ? <Effects disableGamma={true}><glitchPass attachArray="passes" />{setTimeout(() => { setGlitch(false) }, 500)}</Effects> : null}
    <group>
            <animated.mesh
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            onClick={()=> (setStart(!start), setActive(!active), setGlitch(true), sound())}
            position={button1.position}
            scale={button1.scale}
            >
            <sphereGeometry attach="geometry" args={[1,256,256]}/>
            <meshLambertMaterial metalness={1} color="lightblue" material="material" />
            </animated.mesh>

            <animated.mesh
            scale={button2.scale}
            position={button2.position}
            >
            <sphereGeometry attach="geometry" args={[1,256,256]}/>
            <meshLambertMaterial transparent={true} opacity={0.5} metalness={1} color="red" material="material" />
            </animated.mesh>

        </group>

    <animated.group position={ani.position}>
        <group  rotation={[0,0.35,0]} >
           { options.map(option => {
                return <Select {...option}/>
            }) } 
        </group>

        <CubeCamera
        resolution={300} // Size of the off-buffer (256 by default)
        frames={Infinity} // How many frames it should render (Indefinitively by default)
        near={0.1}
        far={1000}
        >
        {(texture) => (
            <group>

                <mesh>
                <sphereGeometry args={[0.8,256,256]}/>
                <meshLambertMaterial  roughness={0} metalness={1} envMap={texture} />
                </mesh>

                <mesh rotation={[3.1,-0.5,0]}>
                <ringGeometry args={[1.2,0.9,256]}/>
                <meshPhysicalMaterial transparent opacity={0.7} metalness={0.8} clearcoat={0.8} map={holotexture} attach="material" />
                </mesh>

            </group>
        )}
        </CubeCamera>
    </animated.group>
    </>
)}