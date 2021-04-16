import React, { useState } from 'react';
import { Reflector, Effects, MeshWobbleMaterial } from '@react-three/drei';
import { useSpring, animated, config} from '@react-spring/three';
import { panelState } from '../store/State'
import { useRecoilValue } from "recoil";

const Tablet = (props) => {

    const panel = useRecoilValue(panelState)
    const [active, setActive] = useState(false)
    const [hovered, setHovered] = useState(false)
    const ani = useSpring({
        config: { mass:1, tension:10, friction:8 },
        color: ( hovered || active) ? "blue": "lightblue",
        scale: hovered ? [1.05,1.05,1.05] : [1,1,1],
        position: panel ? [0,0,0] : [0,10,0],
        
    })
    const ani2 = useSpring({
        position: panel ? props.position2 : props.position1,
     })


    return(
        <animated.group
        rotation={props.rotation}
        position={ani.position}
        >
            <animated.mesh 
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            scale={ani.scale}
            position={props.backing.position2}
            >
                <planeBufferGeometry args={props.backing.args} geometry="geometry" />
                <MeshWobbleMaterial
                factor={.05} // Strength, 0 disables the effect (default=1)
                speed={2}
                transparent={true}
                opacity={0.6}
                color="purple"
                material="material"/>

 
            </animated.mesh>

            <Reflector
            position={props.position2}
            args={props.args} // PlaneBufferGeometry arguments
            resolution={1500} // Off-buffer resolution, lower=faster, higher=better quality
            mirror={1} // Mirror environment, 0 = texture colors, 1 = pick up env colors
            mixBlur={0} // How much blur mixes with surface roughness (default = 0), note that this can affect performance
            mixStrength={1} // Strength of the reflections
            depthScale={1} // Scale the depth factor (0 = no depth, default = 0)
            minDepthThreshold={0.9} // Lower edge for the depthTexture interpolation (default = 0)
            maxDepthThreshold={1} // Upper edge for the depthTexture interpolation (default = 0)
            depthToBlurRatioBias={3} // Adds a bias factor to the depthTexture before calculating the blur amount [blurFactor = blurTexture * (depthTexture + bias)]. It accepts values between 0 and 1, default is 0.25. An amount > 0 of bias makes sure that the blurTexture is not too sharp because of the multiplication with the depthTexture
            distortion={0} // Amount of distortion based on the distortionMap texture
            debug={0} /* Depending on the assigned value, one of the following channels is shown:
                0 = no debug
                1 = depth channel
                2 = base channel
                3 = distortion channel
                4 = lod channel (based on the roughness)
            */
            >
            {(Material, props) => <Material {...props}/>}
            </Reflector>


        </animated.group>
    )
}

export default Tablet;