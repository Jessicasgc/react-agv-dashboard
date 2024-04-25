import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, OrbitControls, OrthographicCamera, PerspectiveCamera, RoundedBox, Text , Text3D, useCursor } from "@react-three/drei";
import { defineHex, Grid, rectangle, spiral,} from "honeycomb-grid";
import { useSpring, animated } from "@react-spring/three";
import { useEffect, useRef, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { BoxGeometry, CylinderGeometry } from "three";
import { effect, signal,useSignal } from "@preact/signals-react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { SERVICE_URL } from "../utils/constants";

export const agvDatas = signal([])
const deg2rad = (deg) => deg * (Math.PI / 180);
const Hex = defineHex({dimensions : 1.01});
const cylinder = new CylinderGeometry(1, 1, 0.1, 6, 1)

export default function Map(){
  const { sendJsonMessage, lastMessage,readyState } = useWebSocket(SERVICE_URL, {shouldReconnect: (closeEvent) => true,});
  const cameraRef = useRef();
  const { gl, camera } = useThree();

  const [grid, setGrid] = useState([])
  const [agvs, setAgvs] = useState([])

  const [map, setMap] = useState({
    width : 16,
    height : 19,
    obs : []
  })

  useEffect(()=>{
    agvDatas.value = agvs
  },[agvs])

  useEffect(()=>{
    setTimeout(function () {
      sendJsonMessage({type: "map"})
    }, 500)
  },[])

  useEffect(()=>{
    camera.position.set(-12.75,12.75, 10); // Set camera position
    camera.lookAt(-12.75,12.75, 0); // Set camera target

    const updateControls = () => {
      controlsRef.current.target.copy(camera.position);
    };

    // Listen to the camera's position changes
    camera.addEventListener('update', updateControls);

    return () => {
      // Clean up event listener
      camera.removeEventListener('update', updateControls);
    };
  },[])

  useFrame(() => {
    // console.log(cameraRef.current);
    if(!cameraRef.current) return
    // cameraRef.current.lookAt(-12.75,12.75, 0); 
  })

  useEffect(()=>{
    const spiralGrid = new Grid(Hex, rectangle({ width: map.width, height: map.height }));
    let g = spiralGrid.toArray();
    setGrid(g ?? [])
    // if(!cameraRef.current) return
    // cameraRef.current.lookAt(-12.75,12.75, 0); 
  },[map])

  useEffect(() => {
    if (lastMessage !== null) {
        let res = JSON.parse(lastMessage.data)
        
        if(!res.type) return
        
        if(res.type == "update") updateDataAgv(res.data) ;

        if(res.type == "map" && JSON.stringify(res.data) != JSON.stringify(map)) setMap(res.data);
    }
  }, [lastMessage]);

  const updateDataAgv = (data) => {
    let old = agvs.map(a => {
      const {coor, ...x} = a
      return x
    })
    // if(JSON.stringify(old) == JSON.stringify(data)) return;
    
    let newAgvs = data.map((agv,i) => {
      // if(agv.coor && agv.coor == agvs[i].coor && ) return agv
      
      let {x,y} = agv.position
      let currentPosition = grid.find((g) => -g.s == x && -g.r == y)

      if(!agv.coor) agv.coor = {x:0,y:0}
      
      agv['coor'].x = !currentPosition ? 0 : -currentPosition.center.x
      agv['coor'].y = !currentPosition ? 0 : -currentPosition.center.y

      return agv
    })
    if(JSON.stringify(agvs) !== JSON.stringify(newAgvs)){
      setAgvs(newAgvs)
    }
  }
    if(readyState !== WebSocket.OPEN) return 
    
    return (
      
          <>
          <directionalLight intensity={0.75} />
          <ambientLight intensity={0.75} />
          <group rotation={[0,0,deg2rad(90)]}>
            <HexGrid obs={map.obs} grid={grid}/>
            {
              agvs.map(agv => (
                <AGV grid={grid} {...agv} key={agv.id}/>
              ))
            }
          </group>
          {/* <OrthographicCamera
            makeDefault
            ref={cameraRef}
            rotation={[1.77, -3.55, 6.31]}
            position={[-12.75, 12.75, 10]}
            zoom={27}
            left={window.innerWidth / -2}
            right={window.innerWidth / 2}
            top={window.innerHeight / 2}
            bottom={window.innerHeight / -2}
            near={0.1}
            far={1000}
            loo
          /> */}
          <OrbitControls
            enabled={true}
            enableRotate={!false}
            args={[cameraRef, gl.domElement]}
            enablePan={!false}
            mouseButtons={{
              LEFT: THREE.MOUSE.PAN,
              RIGHT: THREE.MOUSE.ROTATE,
              MIDDLE: THREE.MOUSE.PAN
            }}
          />
        </>
    )
}

const AGV = ({coor,orientation, grid,isOnline,id,container,paths, ...props}) => {
  let allPath = []
  paths = paths.map(arr => allPath.push(...arr))

  let pathCoor = allPath.map(([x,y],i) => {
    let tile = grid.find((o) =>  x == -o.s && y == -o.r)
    if(!tile) return [0,0,0]
    return [-tile.center.x, -tile.center.y , 0.5 ]
  })

  // if(!isOnline) return
  
  return (
    <>
      <group position={[coor.x , coor.y ,0.5]} rotation={[ 0, 0 ,deg2rad(orientation)]}>
        <RoundedBox args={[1.5, 1.5]} radius={0.4}>
          <meshBasicMaterial attach="material" color={ "white"} />
        </RoundedBox>
        {
          container &&
          <RoundedBox args={[1.5, 1.8, .5]} radius={0.1} position={[.3,0,0]}>
            <meshBasicMaterial attach="material" color={ "grey"} />
          </RoundedBox>
        }
      </group>
      <Text 
        position={[coor.x  + -0., coor.y,1]}
        rotation={[ 0, 0 ,-deg2rad(90)]}
        color={"black"}
        fontSize={"0.4"}
      >AGV {id}</Text>
        <Line points={[[coor.x ,  coor.y, 0.5 ], ...pathCoor ]} />
    </>
  );
};

const HexGrid = ({obs, props, grid}) => {
    return (
      <group {...props}>
        {grid.map((hex) => {
          const { q, r } = hex;
          return (
            <HexTile
              obs = {obs}
              key={`${q}-${r}`}
              hex={hex}
            />
          );
        })}
      </group>
    );
  };
  
  const HexTile = (props) => {
    const {
      hex,
      obs
    } = props;
    
    let { x, y  } = hex.center;
    let { s, r  } = hex;
    
    const mesh = useRef(null);

    x = -x;
    y = -y
    
    let isObstacle = obs.find((o) =>  o.x == -s && o.y == -r)
    
    return (
      <animated.mesh
        ref={mesh}
        rotation={[deg2rad(90), 0, 0]}
        castShadow
        position={[x, y,0]}
      >
        <ValueDisplay hex={hex} />
        <mesh geometry={cylinder}>
          <meshBasicMaterial attach="material" color={ !isObstacle ?  "teal" : "black"} />
        </mesh>
      </animated.mesh>
    );
  };
  
  const ValueDisplay = (props) => {
    const { hex } = props;
    return (
      <>
        <Text
          color="#222831"
          fontSize={0.2}
          rotation={[-deg2rad(90), 0, -deg2rad(90)]}
          position={[0.7, 0.051, 0]}
        >
          {`${-hex.s},${-hex.r}`}
        </Text>
      </>
    );
  };

