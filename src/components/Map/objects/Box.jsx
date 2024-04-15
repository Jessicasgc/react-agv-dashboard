import { useCallback } from "react";
import { map } from "../Experience";

const BOX_HEIGHT = 2

export default function Box({ size, position, onClick, ...props }) {

    const generateTitik = useCallback(() => {
      const titiks = []
      // kanan
      if(map.size[0] > position[0] + size[0] + 1) titiks.push({
        key: titiks.length - 1,
        local : [Math.ceil(size[0] / 2) + 1, - Math.ceil(BOX_HEIGHT / 2), 0 ],
        global : [position[0] + size[0] + 1, position[1] + Math.ceil(size[1] /2)]
      })
      // bawah
      if(map.size[1] > position[1] + size[1] + 1) titiks.push({
        key: titiks.length - 1,
        local : [0, - Math.ceil(BOX_HEIGHT / 2), Math.ceil(size[1] / 2) + 1 ],
        global : [position[0] + Math.ceil(size[0] /2), position[1] + size[1] + 1]
      })
      // kiri
      if(position[0] - 2 > 0)  titiks.push({
        key: titiks.length - 1,
        local : [- Math.ceil(size[0] / 2) - 2, - Math.ceil(BOX_HEIGHT / 2), 0 ],
        global : [position[0] - 2, position[1] + Math.ceil(size[1] /2 )]
      })
      // atas
      if(position[1] - 2 >= 0) titiks.push({
        key: titiks.length - 1,
        local : [0, - Math.ceil(BOX_HEIGHT / 2), - Math.ceil(size[1] / 2) - 2],
        global : [position[0] + Math.ceil(size[0] /2) , position[1] - 2]
      })
      return titiks
    }, []);

    return (
      <group {...props} position={
          [
            size[0] / map.gridDivision / 2 + position[0] / map.gridDivision, 
            BOX_HEIGHT / 2, 
            size[1] / map.gridDivision / 2 + position[1] / map.gridDivision, 
          ]
        }
      >
        {
          generateTitik().map(t => (
          <mesh key={t.key} onClick={() => onClick(t.global)} position={t.local}  >
            <sphereGeometry args={[0.5,5, 5, 1, Math.PI * 2, 0,1]} />
            <meshStandardMaterial color="purple" wireframe={true} />
          </mesh>
          ))
        }
        <mesh>
          <boxGeometry args={[size[0],BOX_HEIGHT,size[1]]} />
          <meshStandardMaterial color="hotpink" wireframe={true} />
        </mesh>
      </group>
    )
  }