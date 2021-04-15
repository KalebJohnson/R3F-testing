import React, { useRef, useFrame } from 'react'
import { CubeCamera, useTexture } from '@react-three/drei';
import Select from './Select'

export default function NavBall(){
    const Skills = {position1:[0.7,0.83,0], position2:[9,5.1,0.5], name:"Skills"}
    const Education = {position1:[-0.7,0.8,0.1], position2:[-1.3,4.9,-3], name:"Education"}
    const Projects = {position1:[-0.02,1.05,0], position2:[4.15,4.7,-0.3], name:"Projects"}
    const options = [Skills, Projects, Education]
    //const ringRef = useRef();
    const holotexture = useTexture('/hologram.jpg')
    //useFrame(() => {
    //  ringRef.current.rotation.z  += 0.01
    //})
    return(
    <group>

        <group position={[-3.8,-1.5,0]} rotation={[0,0.35,0]} >
           { options.map(option => {
                return <Select {...option}/>
            }) } 
        </group>

        <CubeCamera
        position={[-3.8,-1.5,0]}
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
    </group>
)}