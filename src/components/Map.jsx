import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, OrthographicCamera, PerspectiveCamera, Text , useCursor } from "@react-three/drei";
import { defineHex, Grid, rectangle, spiral } from "honeycomb-grid";
import { useSpring, animated } from "@react-spring/three";
import { useEffect, useRef, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { BoxGeometry, CylinderGeometry } from "three";
import { signal } from "@preact/signals-react";

const grid = signal([])
const deg2rad = (deg) => deg * (Math.PI / 180);
const Hex = defineHex({dimensions : 1.1});
const map = signal({
  width : 16,
  height : 19,
})
const obs = signal([{x: 23,y: -19},{x: 10,y: -12},{x: 1,y: 1}])

const agvs = signal([
  {
    pos: {
      x : 0,
      y : 0
    },
    rot : -30
  }
])

export default function Map(){
  const agvRef = useRef();
  const cameraRef = useRef();

  useEffect(()=>{
    const spiralGrid = new Grid(Hex, rectangle({ width: map.value.width, height: map.value.height }));
    let g = spiralGrid.toArray();
    grid.value = g ?? []
  },[map])

  useEffect(()=>{
    agvs.value[0].pos.x = -grid.value[150].center.x
    agvs.value[0].pos.y = -grid.value[150].center.y
    
  },[grid])
  
  useEffect(()=>{},[agvs])
  
  useFrame(() => {
    // console.log(cameraRef, agvRef);
    const boxPosition = agvs.value[0].pos;
    cameraRef.current.position.set(boxPosition.x, boxPosition.y, 10);
    cameraRef.current.lookAt(boxPosition.x, boxPosition.y, 0); 
  })

    return (
      
          <>
          <directionalLight intensity={0.75} />
          <ambientLight intensity={0.75} />
          <HexGrid />
          {
            agvs.value.map(agv => (
              <AGV {...agv}/>
            ))
          }
          <OrthographicCamera
            makeDefault
            ref={cameraRef}
            position={[20, 20, 5]} 
            zoom={40} // Optional: Set the initial zoom level
            left={window.innerWidth / -2} // Optional: Set the left boundary of the frustum
            right={window.innerWidth / 2} // Optional: Set the right boundary of the frustum
            top={window.innerHeight / 2} // Optional: Set the top boundary of the frustum
            bottom={window.innerHeight / -2} // Optional: Set the bottom boundary of the frustum
            near={0.1} // Optional: Set the near plane of the frustum
            far={1000} // Optional: Set the far plane of the frustum
          />
          <OrbitControls
            enabled={true}
            // minPolarAngle={deg2rad(75)}
            // maxPolarAngle={deg2rad(100)}
            // minAzimuthAngle={deg2rad(-10)}
            // maxAzimuthAngle={deg2rad(10)}
            // mouseButtons={{
            //   RIGHT: THREE.MOUSE.ROTATE,
            //   MIDDLE: THREE.MOUSE.PAN
            // }}
          />
        </>
    )
}

const AGV = (props) => {
  const {pos,rot} = props
  return (
    <mesh geometry={new BoxGeometry(1, 1)} position={[pos.x , pos.y ,0.5]} rotation={[ 0, 0 ,deg2rad(rot)]}>
      <meshBasicMaterial attach="material" color={ "black"} />
    </mesh>
  );
};

const HexGrid = ({obs}) => {
    return (
      <group>
        {grid.value.map((hex) => {
          const { q, r } = hex;
          return (
            <HexTile
              key={`${q}-${r}`}
              hex={hex}
              obs={obs}
            />
          );
        })}
      </group>
    );
  };
  
  const HexTile = (props) => {
    const {
      hex,
    } = props;
    
    let { x, y  } = hex.center;
    
    const mesh = useRef(null);

    x = -x;
    y = -y

    let isObstacle = obs.value.find((o) =>  o.x == Math.round(x) && o.y == Math.round(-y))
  
    return (
      <animated.mesh
        ref={mesh}
        rotation={[deg2rad(90), 0, 0]}
        castShadow
        position={[x, y,0]}
      >
        <ValueDisplay hex={hex} />
        <mesh geometry={new CylinderGeometry(1, 1, 0.1, 6, 1)}>
          <meshBasicMaterial attach="material" color={ !isObstacle ?  "teal" : "pink"} />
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
          rotation={[-deg2rad(90), 0, 0]}
          position={[0, 0.051, -0.8]}
        >
          {`${hex.q},${-hex.r}`}
        </Text>
      </>
    );
  };

  Map.propTypes = {};

  HexGrid.propTypes = {
    offsetX: PropTypes.number.isRequired,
  offsetY: PropTypes.number.isRequired,
  };

  HexTile.propTypes = {
    hex: PropTypes.object.isRequired,
  };

  ValueDisplay.propTypes = {
    hex: PropTypes.object.isRequired,
  };
  