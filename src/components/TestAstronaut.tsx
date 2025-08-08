import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'

// Simple test astronaut component
function TestAstronaut() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  )
}

export function SimpleTestAstronaut() {
  return (
    <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-32 h-32 bg-red-500 pointer-events-none z-20">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <TestAstronaut />
        </Suspense>
      </Canvas>
    </div>
  )
}
