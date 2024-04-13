import { map } from "../components/Experience";

export default function FloorParticle({x = 0, y = 0, w = 0, h = 0, color = "green"}){

    return (
        <mesh rotation={[-Math.PI / 2,0,0]} position={
            [
                w / map.gridDivision / 2 + x / map.gridDivision || 0, 
                0.1, 
                h / map.gridDivision / 2 + y / map.gridDivision || 0
            ]} receiveShadow>
            <planeGeometry args={[w || 0,h || 0]}/>
            <meshStandardMaterial color={color}/>
        </mesh>
    )
}