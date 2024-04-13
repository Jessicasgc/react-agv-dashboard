import { RoundedBox } from "@react-three/drei";

export default function AGV({ agvref }) {

    return (
      <group ref={agvref} position={[10,0,2]}>
        <mesh position={[0,0,1.5]} rotation={[Math.PI/2,0,0]} castShadow>
          <coneGeometry args={[0.25,0.5, 10]} />
          <meshLambertMaterial attach="material" color={"purple"} />
        </mesh>
        <RoundedBox position={[0,0.5,0]} args={[1.5, 1, 1.5]} radius={0.1} >
          <meshLambertMaterial attach="material" color={"grey"} />
        </RoundedBox>
      </group>
    )
  }