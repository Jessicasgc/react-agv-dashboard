export default function Floor({size}){

    return (
        <mesh rotation={[-Math.PI / 2,0,0]} position={[size[0]/2,0.000001,size[1]/2]} receiveShadow>
            <planeGeometry args={size}/>
            <meshStandardMaterial color={"#ffffff"}/>
        </mesh>
    )
}