import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Simple Astronaut 3D model component
function SimpleAstronautModel() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      // Simple floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* Main Body */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.4, 1.2, 8, 16]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      
      {/* Helmet */}
      <mesh position={[0, 0.8, 0]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color="#e0e0e0" transparent opacity={0.8} />
      </mesh>
      
      {/* Visor */}
      <mesh position={[0, 0.8, 0.3]}>
        <sphereGeometry args={[0.45, 16, 16]} />
        <meshStandardMaterial color="#001122" transparent opacity={0.7} />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.6, 0.2, 0]} rotation={[0, 0, -0.3]}>
        <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      <mesh position={[0.6, 0.2, 0]} rotation={[0, 0, 0.3]}>
        <capsuleGeometry args={[0.15, 0.8, 8, 16]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.2, -0.8, 0]}>
        <capsuleGeometry args={[0.18, 0.8, 8, 16]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      <mesh position={[0.2, -0.8, 0]}>
        <capsuleGeometry args={[0.18, 0.8, 8, 16]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>
      
      {/* Backpack */}
      <mesh position={[0, 0.2, -0.5]}>
        <boxGeometry args={[0.6, 0.8, 0.3]} />
        <meshStandardMaterial color="#d0d0d0" />
      </mesh>
    </group>
  )
}

// Loading fallback
function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#ffffff" wireframe />
    </mesh>
  )
}

// Fixed Hero Astronaut Component
export function FixedHeroAstronaut() {
  return (
    <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 hidden md:block pointer-events-none z-20">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
          <pointLight position={[-3, 3, 3]} intensity={0.4} color="#6366f1" />
          
          <SimpleAstronautModel />
        </Suspense>
      </Canvas>
    </div>
  )
}
