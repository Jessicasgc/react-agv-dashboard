import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text , useCursor } from "@react-three/drei";
import { defineHex, Grid, rectangle, spiral } from "honeycomb-grid";
import { useSpring, animated } from "@react-spring/three";
import { useEffect, useRef, useState } from "react";

const floorPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
const hexTile = defineHex({ dimensions: 1.2 });
const deg2rad = (deg) => deg * (Math.PI / 180);
const spiralGrid = new Grid(hexTile, rectangle({ width: 16, height: 19 }));
let planeIntersectPoint = new THREE.Vector3();
const spiralGridArray = spiralGrid.toArray();

console.log(spiralGridArray);

export default function Map(){
    return (
        <Canvas >
      <directionalLight intensity={0.75} />
      <ambientLight intensity={0.75} />
      <HexGrid />
      <OrbitControls
        enabled={true}
        // mouseButtons={{
        //   RIGHT: THREE.MOUSE.ROTATE,
        //   MIDDLE: THREE.MOUSE.PAN
        // }}
      />
    </Canvas>
    )
}

const HexGrid = () => {
    return (
      <group>
        {spiralGridArray.map((hex) => {
          const { q, r } = hex;
          return (
            <HexTile
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
    } = props;
    
    const { x: originX, y: originY } = hex.center;
    
    console.log(hex.center);
    const mesh = useRef(null);
  
    return (
      <animated.mesh
        ref={mesh}
        rotation={[deg2rad(90), 0, 0]}
        castShadow
        position={[originX, originY,0]}
      >
        <ValueDisplay hex={hex} />
        <cylinderGeometry args={[1, 1, 0.1, 6, 1]} />
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
          {`${hex.q},${hex.r}`}
        </Text>
      </>
    );
  };
  