import React, { useState } from 'react';
import { Reflector, Html, Effects, MeshWobbleMaterial } from '@react-three/drei';
import { useSpring, animated, config} from '@react-spring/three';
import { BloomPass } from "three/examples/jsm/postprocessing/BloomPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";

const Tablet = (props) => {


    const [active, setActive] = useState(false)
    const [hovered, setHovered] = useState(false)
    const ani = useSpring({
        color: ( hovered || active) ? "blue": "lightblue",
        scale: hovered ? [1.05,1.05,1.05] : [1,1,1],
        position: active ? props.backing.position1 : props.backing.position1,
        
    })
    const ani2 = useSpring({
      scale: hovered ? [0.4,0.4,0.4] : [0.2,0.2,0.2],
      rotation: active ? [0.1,-0.3,0.04] : [-0.1,0.3,0],
      position: active ? [50,0,0] : [0,0,0]
  })


    return(
        <group
        rotation={props.rotation}
        >
            <animated.mesh 
            position={props.backing.position1}
            onPointerOver={() => setHovered(true)}
            onPointerOut={() => setHovered(false)}
            scale={ani.scale}
            position={ani.position}
            >
                <planeBufferGeometry args={props.backing.args} geometry="geometry" />
                <MeshWobbleMaterial
                factor={.05} // Strength, 0 disables the effect (default=1)
                speed={2}
                transparent={true}
                opacity={0.4}
                color="lightblue"
                material="material"/>

            <Html
             prepend // Project content behind the canvas (default: false)
             center={true} // Adds a -50%/-50% css transform (default: false) [ignored in transform mode]
             fullscreen // Aligns to the upper-left corner, fills the screen (default:false) [ignored in transform mode]
             distanceFactor={10} // If set (default: undefined), children will be scaled by this factor, and also by distance to a PerspectiveCamera / zoom by a OrthographicCamera.
             zIndexRange={[100, 0]} // Z-order range (default=[16777271, 0])
             transform // If true, applies matrix3d transformations (default=false)
             sprite // Renders as sprite, but only in transform mode (default=false)
            ><div

            >hi
            </div>
            </Html>

            </animated.mesh>

            <Reflector
            position={props.position1}
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

        </group>
    )
}

export default Tablet;