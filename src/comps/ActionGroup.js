import Tablet from './tablet';

const ActionGroup = () => {
    const Education = { args:[5,4], position1:[-5.5,1.8,-3], position2:[-5.5,1.8,-3], rotation:[0,0.15,0], backing:{ args:[5.2,4.2], position1:[-5.6,1.8,-3.1], position2:[-5.6,1.8,-3.1], rotation:[]}}
    const Projects = { args:[7,8], position1:[.2,0,-3], position2:[.2,0,-3], rotation:[0,0,0], backing:{ args:[7.2,8.2], position1:[.2,0,-3.1], position2:[.2,0,-3.1], rotation:[]}}
    const Skills = { args:[2.5,8], position1:[4.6,0,-3.5], position2:[4.6,0,-3.5], rotation:[0,-0.18,0], backing:{ args:[2.7,8.2], position1:[4.7,0,-3.6], position2:[4.7,0,-3.6], rotation:[]} }
    const options = [Education, Projects, Skills]
    
    return (
    <>
        { options.map(option => {
                return <Tablet {...option}/>
            }) } 
    </>
    )
}

export default ActionGroup;
