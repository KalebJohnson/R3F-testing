import { useThree } from '@react-three/fiber';
import { useCubeTexture } from '@react-three/drei'

export default function SkyBox(){
  
    // grab the scene with useThree hook
    
    const {scene} = useThree()
    // load texture to loader
    const texture = useCubeTexture([
    "bkg1_right.png",
    "bkg1_left.png",
    "bkg1_top.png",
    "bkg1_bot.png",
    "bkg1_front.png",
    "bkg1_back.png",], { path: '/' })
  
    // set scene background to texture
    scene.background = texture
    // have to return something cuz react so we return null
    return null
  }

