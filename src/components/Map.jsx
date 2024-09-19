/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Line, OrbitControls, OrthographicCamera, PerspectiveCamera, RoundedBox, Text , Text3D, useCursor, Html } from "@react-three/drei";
import { defineHex, Grid, rectangle, spiral,} from "honeycomb-grid";
import { useSpring, animated } from "@react-spring/three";
import { useEffect, useRef, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { BoxGeometry, CylinderGeometry } from "three";
import { effect, signal,useSignal } from "@preact/signals-react";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { SERVICE_URL } from "../utils/constants";
import { FaBatteryFull,  FaBatteryThreeQuarters, FaBatteryHalf, FaBatteryQuarter } from "react-icons/fa";
import useStations from "../custom_hooks/GET_HOOKS/useStations";

export const agvDatas = signal([])
const deg2rad = (deg) => deg * (Math.PI / 180);
const Hex = defineHex({dimensions : 1.01});
const cylinder = new CylinderGeometry(1, 1, 0.1, 6, 1)


export default function Map(){
  const { sendJsonMessage, lastMessage,readyState } = useWebSocket(SERVICE_URL, {shouldReconnect: (closeEvent) => true,});
  const cameraRef = useRef();

  const [grid, setGrid] = useState([])
  const [agvs, setAgvs] = useState([])
  const { stations, loading } = useStations();
  

  const [map, setMap] = useState({
    width : 16,
    height : 19,
    obs : []
  })

  useEffect(()=>{
    setTimeout(function () {
      sendJsonMessage({type: "map"})
    }, 500)
  },[])


  useEffect(()=>{
    const spiralGrid = new Grid(Hex, rectangle({ width: map.width, height: map.height }));
    let g = spiralGrid.toArray();
    setGrid(g ?? [])
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
          <ambientLight intensity={10.75} />
          <group rotation={[0,0,deg2rad(90)]} position={[(map.width / 2) + 2,-(map.height / 2) - 0.3,0]}>
            <HexGrid obs={map.obs} grid={grid} stations={stations}/>
            {
              agvs.map(agv => (
                <AGV ref={cameraRef} grid={grid} {...agv} key={agv.id}/>
              ))
            }
          </group>
          <OrthographicCamera
            makeDefault
            ref={cameraRef}
            position={[0, 0, 10]}
            zoom={50}
            left={window.innerWidth / -2}
            right={window.innerWidth / 2}
            top={window.innerHeight / 2}
            bottom={window.innerHeight / -2}
            near={0.1}
            far={1000}
          />
          <OrbitControls
            enabled={true}
            enableRotate={false}
            // args={[camera, gl.domElement]}
            enablePan={true}
            mouseButtons={{
              LEFT: THREE.MOUSE.PAN,
              RIGHT: THREE.MOUSE.ROTATE,
              MIDDLE: THREE.MOUSE.PAN
            }}
          />
        </>
    )
}

const AGV = ({ stations, coor, orientation, grid, isOnline, id, container, paths, zoom, traveledIndices = [], ...props }) => {
  let allPath = [];
  paths.forEach(arr => allPath.push(...arr));

  // Function to map the grid coordinates to 3D positions
  const mapPathToCoor = (path) => {
    return path.map(([x, y]) => {
      let tile = grid.find(o => x === -o.s && y === -o.r);
      if (!tile) return [0, 0, 0];
      return [-tile.center.x, -tile.center.y, 0.5];
    });
  };

  let pathCoor = mapPathToCoor(allPath);

  // Calculate the remaining path coordinates
  let remainingPathCoor = [];
  if (isOnline && pathCoor.length > 0) {
    remainingPathCoor = [[coor.x, coor.y, 0.5], ...pathCoor];
  }

  // Calculate the traveled path coordinates
  const [traveledPath, setTraveledPath] = useState([]);
  useEffect(() => {
    setTraveledPath(prev => {
      if (!prev.length) return [[coor.x, coor.y, 0.5]];
      const lastPosition = prev[prev.length - 1];
      const newPosition = [coor.x, coor.y, 0.5];
      if (lastPosition[0] !== newPosition[0] || lastPosition[1] !== newPosition[1]) {
        return [...prev, newPosition];
      }
      return prev;
    });
  }, [coor]);
  if(!isOnline) return
  const getBatteryIcon = (power) => {
    if (power > 75) return <FaBatteryFull fontSize={18} color="green" />;
    if (power > 50) return <FaBatteryThreeQuarters fontSize={18} color="green" />;
    if (power > 25) return <FaBatteryHalf fontSize={18} color="orange" />;
    return <FaBatteryQuarter fontSize={18} color="red" />;
  };
  const agvColor = getComputedStyle(document.documentElement).getPropertyValue("--agv");
  const onAgvColor = getComputedStyle(document.documentElement).getPropertyValue("--on-background");
 
  return (
    <>
    {/* AGV Visualization */}
      <group position={[coor.x , coor.y ,0.5]} rotation={[ 0, 0 ,deg2rad(orientation)]}>
        <RoundedBox args={[1.5, 1.5]} radius={0.4}>
          <meshBasicMaterial attach="material" color={agvColor} />
        </RoundedBox>
        {
          container &&
          <RoundedBox args={[1.5, 1.8, 0.5]} radius={0.1} position={[0.3,0,0]}>
            <meshBasicMaterial attach="material" color={ "grey"} />
          </RoundedBox>
        }
      </group>
      <group position={[coor.x, coor.y, 1]} rotation={[0, 0, -deg2rad(90)]}>
        {/* <Html position={[0, 0.5, 0]} center>
          <div style={{ color: 'black', fontSize: '0.4em' }}>
            AGV {id}
          </div>
        </Html> */}
        <Text
          rotation={[0, 0, 0]}
          position={[0, 0.4, 0]}
          color={onAgvColor}
          fontSize={0.3}
          anchorX="center"
          anchorY="middle"
        >
          AGV {id}
        </Text>
        <Html position={[0, -0.1, 0.5]} center>
        <div style={{ transform: `scale(${1 / zoom})`}}>
            {getBatteryIcon(props.power)}
          </div>
        </Html>
        <Text
          rotation={[0, 0, 0]}
          position={[0, -0.4, 0]}
          color={onAgvColor}
          fontSize={0.3}
          anchorX="center"
          anchorY="middle"
        >
          {props.power}%
        </Text>
      </group>
       {traveledPath.length > 1 && <Line points={traveledPath} color={"yellow"} />}
      {/* Line for the remaining path */}
      {remainingPathCoor.length > 1 && <Line points={remainingPathCoor} />}
    </>
  );
};

const HexGrid = ({obs, props, grid, stations}) => {
    return (
      <group {...props}>
        {grid.map((hex) => {
          const { q, r } = hex;
          return (
            <HexTile
              obs = {obs}
              key={`${q}-${r}`}
              hex={hex}
              stations={stations} 
            />
          );
        })}
      </group>
    );
  };
  
  const HexTile = (props) => {
    const {
      hex,
      obs,
      stations
    } = props;
    
    let { x, y  } = hex.center;
    let { s, r  } = hex;
    
    const mesh = useRef(null);

    x = -x;
    y = -y;
    
    
    let isObstacle = obs.find((o) =>  o.x == -s && o.y == -r);
    let station = stations.find((station) => station.x === -s && station.y === -r);

    const hexMapColor = getComputedStyle(document.documentElement).getPropertyValue("--map");
    const obstacleColor = getComputedStyle(document.documentElement).getPropertyValue("--obstacle");
    const stationColor = "yellow";
   
    return (
      <animated.mesh
        ref={mesh}
        rotation={[deg2rad(90), 0, 0]}
        castShadow
        position={[x, y,0]}
      >
         <ValueDisplay hex={hex} />
      <mesh geometry={cylinder}>
        <meshBasicMaterial attach="material" color={station ? stationColor : hexMapColor} />
     
      {station && (
        <Html position={[-0.4, 1, 0.7]} center>
          <div style={{ color: 'black', fontSize: '1em', transform: 'translate(-50%, -50%)' }}>
            {station.station_name}
          </div>
        </Html>
      )}
       </mesh>
    </animated.mesh>
    );
  };
  
  const ValueDisplay = (props) => {
    const { hex } = props;
    return (
      <>
        <Text
          color="white"
          fontSize={0.2}
          rotation={[-deg2rad(90), 0, -deg2rad(90)]}
          position={[0.7, 0.051, 0]}
        >
          {`${-hex.s},${-hex.r}`}
          
        </Text>
      </>
    );
  };

