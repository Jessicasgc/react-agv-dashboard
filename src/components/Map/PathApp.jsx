import { Canvas } from '@react-three/fiber'
import { Experience } from './Experience'

const PathApp = () => {
  return (
    <Canvas shadows camera={{ position: [45, 50, 75], fov: 25}}>
      <Experience />
    </Canvas>
  )
}

export default PathApp