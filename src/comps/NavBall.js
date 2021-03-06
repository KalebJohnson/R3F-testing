import React, { useRef, Suspense, useFrame, useState } from 'react';
import { CubeCamera, Effects, useTexture, Text, Html } from '@react-three/drei';
import { useSpring, animated} from '@react-spring/three';
import { useRecoilState, useRecoilValue } from "recoil";
import { panelState } from '../store/State';
import Select from './Select';
import { Button } from '@material-ui/core'

export default function NavBall(){

    
    const Skills = {position1:[0.7,0.83,0.1], contentPosition: [15,0,-3.5], content:"skills"}
    const Education = {position1:[-0.7,0.8,0.1], contentPosition: [-.5,3,0], content:"education"}
    const Projects = {position1:[-0.02,1.05,0.1], contentPosition: [4.2,3,0], content:"projects"}
    const options = [Skills, Projects, Education]
    //const ringRef = useRef();
    const holotexture = useTexture('/hologram.jpg')
    //useFrame(() => {
    //  ringRef.current.rotation.z  += 0.01
    //})

    const [panel, setPanel] = useRecoilState(panelState);
    const [active, setActive] = useState(false)
    const [hovered, setHovered] = useState(false)
    const [start, setStart] = useState(false)
    const [glitch, setGlitch] = useState(false)

    const ani = useSpring({
        config: { mass:1, tension:10, friction:8 },
        color: ( hovered || active) ? "blue": "lightblue",
        scale: hovered ? [0.3,0.3,0.3] : [0.2,0.2,0.2],
        position: active ? [-3.8,-1.5,0] : [-3.8,-8,0],
    })
    const button1 = useSpring({
        color:  hovered ? "blue": "lightblue",
        position: active ? [0,10,0] : [0,0,0]
    })
    const button2 = useSpring({
        scale: hovered ? [0.4,0.4,0.4] : [0.2,0.2,0.2],
        rotation: start ? [0.1,-0.3,0.04] : [-0.1,0.3,0],
    })

    const audio1 = new Audio("/button-31.mp3")
    const sound = () => {
        audio1.play()
    }

    const begin = () => {
        return setStart(!start), setPanel(!panel), setActive(!active), setGlitch(!glitch), sound()
    }

    return(
    <>

    { glitch ? <Effects disableGamma={true}><glitchPass attachArray="passes"/>{setTimeout(() => { setGlitch(!glitch) }, 500)}</Effects> : null}

    <group>
            <animated.mesh
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            position={button1.position}
            scale={button1.scale}
            >
            <planeBufferGeometry attach="geometry" args={[2,.5]}/>
            <meshLambertMaterial metalness={1} color={button1.color} material="material" transparent={true} opacity={0.4}/>
            </animated.mesh>
            { active ? null :
            <Html
              prepend // Project content behind the canvas (default: false)
              center // Adds a -50%/-50% css transform (default: false) [ignored in transform mode]
              fullscreen // Aligns to the upper-left corner, fills the screen (default:false) [ignored in transform mode]
              distanceFactor={2} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
              zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
              transform // If true, applies matrix3d transformations (default=false)
              sprite // Renders as sprite, but only in transform mode (default=false)
              >
                <div style={{display:"flex", flexDirection:"column"}}>
                    <Button variant="contained" color="primary" onClick={()=> begin()}>Initialize HUD</Button>
                    <p>(WARNING: flashing lights)</p>
                </div>
            </Html>
            }
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