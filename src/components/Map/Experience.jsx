import { Environment, Line, OrbitControls } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { MeshLineGeometry, MeshLineMaterial } from 'meshline'
import AGV from "./objects/AGV";
import Box from "./objects/Box";
import Floor from "./objects/Floor";
import FloorParticle from "./objects/FloorParticle";
import object from "./objects/Object.json"
import { isDown, isLeft, isRight, isUp } from "./Dpad";
import { isPause } from "./PauseButton";
import { xPos, yPos, width, height } from "./InputObstacle";
import Grid from "../pathfinding/core/Grid";
import { Always } from "../pathfinding/core/DiagonalMovement";
import RRT from "../pathfinding/finder/RRT";
import { euclidian } from "../pathfinding/core/Heuristic";
import { signal, effect } from "@preact/signals-core";

extend({ MeshLineGeometry, MeshLineMaterial })

export const map = {
  size: [30,50],
  gridDivision : 1,
}

export const obstacles = signal(object);
export const grid = signal(new Grid(map.size[0], map.size[1], obstacles.value));

export const Experience = () => {
  const AGVref = useRef()
  const [AGVPos, setAGVPos] = useState({
    x: 10,
    y: 12
  })
  const [target, setTarget] = useState([]);
  const [nodes, setNodes] = useState([])
  const [AGVRot, setAGVRot] = useState(0)
  
  const finder = new RRT({
    diagonalMovement: Always,
    heuristic: euclidian,
    bias: 0.7,
  })

  const findPath = (start, end) => {
    const gridClone = grid.value.clone()
    const path = finder.findPath(start[0],start[1], end[0],end[1], gridClone)
    return path
  }

  const boxOnClick = ( target) => {
    if(nodes.length>0) return;
    console.log(target)
    setTarget(target);
    let boxPos = target; 
    let start = nodes.length>0 ? nodes.at(-1) : [ parseInt((AGVref.current.position.x).toFixed(2)), parseInt((AGVref.current.position.z).toFixed(2))]; 
    let res = findPath(start, boxPos)

    console.log(res);
    setNodes(res);
    // setNodes([...nodes, ...res])
  }

  const moveDpad  = () => {
    let node = null;
    if(isLeft.value) node = AGVref.current.position.clone().add(new THREE.Vector3(-1, 0, 0))
    if(isDown.value) node = AGVref.current.position.clone().add(new THREE.Vector3(0, 0, 1))
    if(isRight.value) node = AGVref.current.position.clone().add(new THREE.Vector3(1, 0, 0))
    if(isUp.value) node = AGVref.current.position.clone().add(new THREE.Vector3(0, 0, -1))
    if(!node) return;
    if(!grid.value.nodes[Math.ceil(node.z)][Math.ceil(node.x)].walkable) return
    let dir = AGVref.current.position.clone().sub(node).normalize().multiplyScalar(0.1);
    AGVref.current.position.sub(dir);
    AGVref.current.lookAt(node);
    setAGVPos({x : AGVref.current.position.x, y : AGVref.current.position.y})
  }

  useFrame((state) => {
    // state.camera.position.x = AGVref.current.position.x + 50
    // state.camera.position.y = AGVref.current.position.y + 50
    // state.camera.position.z = AGVref.current.position.z + 50
    // state.camera.lookAt(AGVref.current.position)
    moveDpad();

    if(nodes.length == 0) {
      if(target.length > 0) setTarget([]);
      return;
    }
    if(isPause.value) return;
    let node = new THREE.Vector3(nodes[0][0], 0, nodes[0][1])
    
    if(AGVref.current.position.distanceTo(node) > 0.1){
      const dir = AGVref.current.position.clone().sub(node).normalize().multiplyScalar(0.1);
      AGVref.current.position.sub(dir);
      AGVref.current.lookAt(node);
      //check if the node is walkable
      if(!grid.value.nodes[Math.ceil(node.z)][Math.ceil(node.x)].walkable){
        setNodes([])
        let start = [ parseInt((AGVref.current.position.x).toFixed(2)), parseInt((AGVref.current.position.z).toFixed(2))]; 
        let res = findPath(start, target)
        setNodes(res);
        return;
      }
      setAGVPos({x : AGVref.current.position.x, y : AGVref.current.position.y})
    }
    else setNodes(nodes.slice(1));
  });

  return (
    <>
      {/* <Environment preset="sunset" /> */}
      <OrbitControls 
        target={[map.size[0]/2, 0 ,map.size[1]/2]}
        minPolarAngle={- Math.PI / 4} maxPolarAngle={( Math.PI / 2) }
        minAzimuthAngle={- Math.PI /2} maxAzimuthAngle={-Math.PI  }
        // minDistance={50}
        maxDistance={100}
      />
      
      <ambientLight intensity={2}/>
      <directionalLight color="green" position={[0, 0, 50]} />
      <directionalLight color="green" position={[10, 20, 50]} />
    
      <Floor size={map.size}/>
      {/* robot agv */}
      <AGV agvref={AGVref} pos={AGVPos} setPos={setAGVPos} rot={AGVRot} setRot={setAGVRot}/>
      {/* garis path */}
      <Line points={[AGVref.current?.position ?? [0,0,0], ...nodes.map(node => new THREE.Vector3(node[0],0,node[1]))]} />
      {/* kotak */}
      {
        obstacles.value.map(box => (<Box key={box.key} onClick={boxOnClick} {...box} />))
      }
      {/* posisi obstacle baru */}
      <FloorParticle x={xPos.value} y={yPos.value} w={width.value} h={height.value}/>
    </>
  );
};
