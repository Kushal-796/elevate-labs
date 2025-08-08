import { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

// 3D Astronaut Model for Hero Section
function HeroAstronautModel() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (groupRef.current) {
      // Slow rotation animation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3
      // Gentle floating motion
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
      // Slight tilt animation
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={groupRef} scale={[1.2, 1.2, 1.2]}>
        {/* Main Body */}
        <mesh position={[0, 0, 0]} castShadow>
          <capsuleGeometry args={[0.5, 1.6, 8, 16]} />
          <meshStandardMaterial 
            color="#f8f8f8" 
            roughness={0.2}
            metalness={0.1}
          />
        </mesh>
        
        {/* Helmet */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <sphereGeometry args={[0.65, 32, 32]} />
          <meshStandardMaterial 
            color="#e8e8e8" 
            transparent 
            opacity={0.9}
            roughness={0.05}
            metalness={0.9}
          />
        </mesh>
        
        {/* Helmet Visor (reflective) */}
        <mesh position={[0, 1.2, 0.45]}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial 
            color="#001133" 
            transparent 
            opacity={0.8}
            roughness={0.02}
            metalness={0.98}
          />
        </mesh>
        
        {/* Arms */}
        <mesh position={[-0.85, 0.4, 0]} rotation={[0, 0, -0.3]} castShadow>
          <capsuleGeometry args={[0.18, 1.1, 8, 16]} />
          <meshStandardMaterial color="#f8f8f8" roughness={0.2} />
        </mesh>
        <mesh position={[0.85, 0.4, 0]} rotation={[0, 0, 0.3]} castShadow>
          <capsuleGeometry args={[0.18, 1.1, 8, 16]} />
          <meshStandardMaterial color="#f8f8f8" roughness={0.2} />
        </mesh>
        
        {/* Hands/Gloves */}
        <mesh position={[-1.2, -0.2, 0]} castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#e0e0e0" roughness={0.3} />
        </mesh>
        <mesh position={[1.2, -0.2, 0]} castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#e0e0e0" roughness={0.3} />
        </mesh>
        
        {/* Legs */}
        <mesh position={[-0.3, -1.3, 0]} castShadow>
          <capsuleGeometry args={[0.22, 1.1, 8, 16]} />
          <meshStandardMaterial color="#f8f8f8" roughness={0.2} />
        </mesh>
        <mesh position={[0.3, -1.3, 0]} castShadow>
          <capsuleGeometry args={[0.22, 1.1, 8, 16]} />
          <meshStandardMaterial color="#f8f8f8" roughness={0.2} />
        </mesh>
        
        {/* Boots */}
        <mesh position={[-0.3, -1.9, 0.1]} castShadow>
          <boxGeometry args={[0.3, 0.15, 0.4]} />
          <meshStandardMaterial color="#333" roughness={0.8} />
        </mesh>
        <mesh position={[0.3, -1.9, 0.1]} castShadow>
          <boxGeometry args={[0.3, 0.15, 0.4]} />
          <meshStandardMaterial color="#333" roughness={0.8} />
        </mesh>
        
        {/* Backpack */}
        <mesh position={[0, 0.4, -0.7]} castShadow>
          <boxGeometry args={[0.8, 1.1, 0.35]} />
          <meshStandardMaterial color="#d5d5d5" roughness={0.4} />
        </mesh>
        
        {/* Chest Control Panel */}
        <mesh position={[0, 0.6, 0.52]}>
          <boxGeometry args={[0.35, 0.2, 0.05]} />
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* Status LEDs */}
        <mesh position={[-0.08, 0.6, 0.55]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial 
            color="#00ff44" 
            emissive="#00aa22"
            emissiveIntensity={0.4}
          />
        </mesh>
        <mesh position={[0.08, 0.6, 0.55]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial 
            color="#4444ff" 
            emissive="#002288"
            emissiveIntensity={0.4}
          />
        </mesh>
        
        {/* Helmet Antenna */}
        <mesh position={[0.3, 1.7, 0]} rotation={[0, 0, 0.2]}>
          <cylinderGeometry args={[0.01, 0.01, 0.3, 8]} />
          <meshStandardMaterial color="#888" metalness={0.9} />
        </mesh>
        <mesh position={[0.42, 1.82, 0]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial 
            color="#ff0000" 
            emissive="#440000"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
    </Float>
  )
}

// Loading fallback
function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 8, 8]} />
      <meshBasicMaterial color="#4444ff" wireframe />
    </mesh>
  )
}

// Main Hero Astronaut Component
export function HeroAstronaut() {
  return (
    <div 
      className="absolute right-4 top-1/2 transform -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 lg:right-8 hidden md:block pointer-events-none z-20"
      style={{
        filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.3))'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <Suspense fallback={<LoadingFallback />}>
          {/* Lighting setup for Hero */}
          <ambientLight intensity={0.4} />
          <directionalLight 
            position={[5, 8, 5]} 
            intensity={1.2} 
            color="#ffffff"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight 
            position={[-3, 3, 3]} 
            intensity={0.6} 
            color="#6366f1" 
          />
          <pointLight 
            position={[3, -3, 2]} 
            intensity={0.4} 
            color="#8b5cf6" 
          />
          
          <HeroAstronautModel />
          
          {/* Space atmosphere particles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <mesh 
              key={i}
              position={[
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 5 - 3
              ]}
            >
              <sphereGeometry args={[0.01, 8, 8]} />
              <meshBasicMaterial 
                color="#ffffff" 
                transparent 
                opacity={Math.random() * 0.6 + 0.2}
              />
            </mesh>
          ))}
        </Suspense>
      </Canvas>
    </div>
  )
}
