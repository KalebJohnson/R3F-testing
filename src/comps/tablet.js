import { Reflector, Html } from '@react-three/drei';



const Tablet = (props) => {
    return(
        <group rotation={props.rotation}>
            <mesh position={props.backing.position1}>
                <planeBufferGeometry args={props.backing.args} geometry="geometry"/>
                <meshLambertMaterial 
                transparent={true}
                opacity={0.5}
                color="lightblue"
                material="material"/>
            </mesh>

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