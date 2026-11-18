import { Component, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useTheme } from '../context/ThemeContext'

class EmberErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) return this.props.fallback ?? null
    return this.props.children
  }
}

function EmberFlightField({ isDark, reducedMotion, scrollRef, pointerRef }) {
  const pointsRef = useRef()
  const shardsGroupRef = useRef()
  const currentScroll = useRef(0)
  const currentCamPos = useRef(new THREE.Vector3(0, 0, 5.5))
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 5.5))

  // 160 Rising lilac embers distributed in 3D volume
  const { positions, speeds } = useMemo(() => {
    const count = 160
    const pos = new Float32Array(count * 3)
    const spd = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 18
      pos[i * 3 + 1] = (Math.random() - 0.5) * 14
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 1
      spd[i] = 0.25 + Math.random() * 0.65
    }
    return { positions: pos, speeds: spd }
  }, [])

  useFrame((state, delta) => {
    if (reducedMotion) return
    const dt = Math.min(delta, 0.05)
    const elapsed = state.clock.getElapsedTime()

    // Smooth scroll interpolation (0 to 1)
    currentScroll.current = THREE.MathUtils.damp(
      currentScroll.current,
      scrollRef.current,
      3.2,
      dt
    )
    const p = currentScroll.current

    // Camera 3D Flight Path across Hero -> Projects -> About -> Contact
    // Section 1: Hero (0.00 - 0.25)
    // Section 2: Projects (0.25 - 0.50)
    // Section 3: About (0.50 - 0.75)
    // Section 4: Journey & Skills & Contact (0.75 - 1.00)
    let targetX = 0
    let targetY = 0
    let targetZ = 5.5
    let rollZ = 0

    if (p < 0.25) {
      const t = p / 0.25
      targetX = THREE.MathUtils.lerp(0, 1.8, t)
      targetY = THREE.MathUtils.lerp(0, -0.6, t)
      targetZ = THREE.MathUtils.lerp(5.5, 4.6, t)
      rollZ = THREE.MathUtils.lerp(0, -0.05, t)
    } else if (p < 0.5) {
      const t = (p - 0.25) / 0.25
      targetX = THREE.MathUtils.lerp(1.8, -1.9, t)
      targetY = THREE.MathUtils.lerp(-0.6, 0.7, t)
      targetZ = THREE.MathUtils.lerp(4.6, 5.2, t)
      rollZ = THREE.MathUtils.lerp(-0.05, 0.04, t)
    } else if (p < 0.75) {
      const t = (p - 0.5) / 0.25
      targetX = THREE.MathUtils.lerp(-1.9, 0.6, t)
      targetY = THREE.MathUtils.lerp(0.7, -0.4, t)
      targetZ = THREE.MathUtils.lerp(5.2, 4.5, t)
      rollZ = THREE.MathUtils.lerp(0.04, -0.02, t)
    } else {
      const t = (p - 0.75) / 0.25
      targetX = THREE.MathUtils.lerp(0.6, 0, t)
      targetY = THREE.MathUtils.lerp(-0.4, 1.0, t)
      targetZ = THREE.MathUtils.lerp(4.5, 6.0, t)
      rollZ = THREE.MathUtils.lerp(-0.02, 0, t)
    }

    // Add gentle pointer mouse parallax
    const px = pointerRef.current.x * 0.35
    const py = pointerRef.current.y * 0.25

    targetCamPos.current.set(targetX + px, targetY + py, targetZ)
    state.camera.position.lerp(targetCamPos.current, dt * 4.0)
    state.camera.rotation.z = THREE.MathUtils.damp(state.camera.rotation.z, rollZ, 3.0, dt)
    state.camera.lookAt(0, 0, 0)

    // Upward rising ember particles
    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.attributes.position
      for (let i = 0; i < attr.count; i++) {
        let y = attr.getY(i) + speeds[i] * dt * 0.55
        if (y > 7.0) y = -7.0
        attr.setY(i, y)
      }
      attr.needsUpdate = true
      pointsRef.current.rotation.y = elapsed * 0.02 + p * 0.8
    }

    // Rotating wireframe polyhedral shards
    if (shardsGroupRef.current) {
      shardsGroupRef.current.rotation.y = elapsed * 0.06 + p * 1.2
      shardsGroupRef.current.rotation.x = Math.sin(elapsed * 0.04) * 0.15
    }
  })

  return (
    <>
      {/* 3D Rising Lilac Embers */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.058}
          color={isDark ? '#c2a4ff' : '#6d28d9'}
          transparent
          opacity={isDark ? 0.75 : 0.4}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Floating 3D Wireframe Geometric Shards */}
      <group ref={shardsGroupRef} position={[0, 0, -2.5]}>
        <mesh position={[-4.8, 2.5, 0]} rotation={[0.4, 0.6, 0]}>
          <octahedronGeometry args={[0.42, 0]} />
          <meshBasicMaterial color="#c2a4ff" wireframe transparent opacity={isDark ? 0.22 : 0.14} />
        </mesh>
        <mesh position={[5.2, -1.9, -1]} rotation={[0.8, 0.2, 0.3]}>
          <icosahedronGeometry args={[0.5, 0]} />
          <meshBasicMaterial color="#eae5ec" wireframe transparent opacity={isDark ? 0.16 : 0.1} />
        </mesh>
        <mesh position={[-2.4, -3.2, 1]} rotation={[0.2, 0.9, 0.4]}>
          <dodecahedronGeometry args={[0.35, 0]} />
          <meshBasicMaterial color="#f5c26b" wireframe transparent opacity={isDark ? 0.2 : 0.12} />
        </mesh>
        <mesh position={[3.2, 3.4, -1.5]} rotation={[0.5, 0.1, 0.8]}>
          <octahedronGeometry args={[0.36, 0]} />
          <meshBasicMaterial color="#c2a4ff" wireframe transparent opacity={isDark ? 0.18 : 0.1} />
        </mesh>
      </group>
    </>
  )
}

export default function Ambient3DBackground({ className = '' }) {
  const { dark } = useTheme()
  const [fallback, setFallback] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const scrollRef = useRef(0)
  const pointerRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    setReducedMotion(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false)
    try {
      const c = document.createElement('canvas')
      const gl = c.getContext('webgl2') || c.getContext('webgl')
      if (!gl) setFallback(true)
      else gl.getExtension('WEBGL_lose_context')?.loseContext()
    } catch {
      setFallback(true)
    }

    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0
    }

    const handleMouseMove = (e) => {
      pointerRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      pointerRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const cssFallback = (
    <div
      className={`pointer-events-none ${className}`}
      style={{
        background:
          'radial-gradient(ellipse 68% 45% at 50% 0%, rgba(194, 164, 255, 0.11), transparent 72%)',
      }}
      aria-hidden="true"
    />
  )

  if (fallback || reducedMotion) {
    return cssFallback
  }

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(194, 164, 255, 0.08), transparent 72%)',
        }}
      />
      <EmberErrorBoundary fallback={null}>
        <Canvas
          dpr={[1, 1.25]}
          camera={{ position: [0, 0, 5.5], fov: 50 }}
          gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener('webglcontextlost', (e) => {
              e.preventDefault()
              setFallback(true)
            })
          }}
        >
          <EmberFlightField
            isDark={dark}
            reducedMotion={reducedMotion}
            scrollRef={scrollRef}
            pointerRef={pointerRef}
          />
        </Canvas>
      </EmberErrorBoundary>
    </div>
  )
}
