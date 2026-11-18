import { Component, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Environment,
  Float,
  Lightformer,
  MeshDistortMaterial,
  OrbitControls,
} from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '../context/ThemeContext'

function probeWebGL() {
  try {
    const probeCanvas = document.createElement('canvas')
    const gl = probeCanvas.getContext('webgl2') || probeCanvas.getContext('webgl')
    if (!gl) return { supported: false, isSoftware: true }
    const ext = gl.getExtension('WEBGL_debug_renderer_info')
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER
    const gpu = String(gl.getParameter(param) || '')
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return {
      supported: true,
      isSoftware: /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu),
    }
  } catch {
    return { supported: false, isSoftware: true }
  }
}

class WebGLErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  componentDidCatch() {
    this.props.onError?.()
  }
  render() {
    if (this.state.hasError) return this.props.fallback ?? null
    return this.props.children
  }
}

function UndulatingWaveTerrain({ isDark, burstRef, reducedMotion }) {
  const meshRef = useRef()
  const geometryRef = useRef()

  const { originalPositions, count } = useMemo(() => {
    const segX = 28
    const segY = 28
    const geom = new THREE.PlaneGeometry(24, 24, segX, segY)
    const pos = new Float32Array(geom.attributes.position.array)
    return { originalPositions: pos, count: geom.attributes.position.count }
  }, [])

  useFrame((state, delta) => {
    if (reducedMotion || !geometryRef.current) return
    const elapsed = state.clock.getElapsedTime()
    const pulse = burstRef?.current || 0
    const attr = geometryRef.current.attributes.position

    for (let i = 0; i < count; i++) {
      const origX = originalPositions[i * 3]
      const origY = originalPositions[i * 3 + 1]

      const dist = Math.sqrt(origX * origX + origY * origY)
      let z =
        Math.sin(origX * 0.42 + elapsed * 1.4) * Math.cos(origY * 0.42 + elapsed * 1.2) * 0.25 +
        Math.sin((origX + origY) * 0.28 + elapsed * 1.0) * 0.12

      if (pulse > 0.01) {
        z += Math.sin(dist * 2.6 - elapsed * 6.5) * pulse * 0.4
      }

      attr.setZ(i, z)
    }
    attr.needsUpdate = true
  })

  return (
    <group position={[0, -2.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh ref={meshRef}>
        <planeGeometry ref={geometryRef} args={[24, 24, 28, 28]} />
        <meshStandardMaterial
          color={isDark ? '#c2a4ff' : '#6d28d9'}
          wireframe
          transparent
          opacity={isDark ? 0.42 : 0.25}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[24, 24]} />
        <meshBasicMaterial color={isDark ? '#0b080c' : '#ede9f6'} transparent opacity={0.85} />
      </mesh>
    </group>
  )
}

function CyberArchitecturalStage({ pointerRef, reducedMotion, isDark, burstRef }) {
  const rigRef = useRef()
  const coreGroupRef = useRef()
  const outerRingRef = useRef()
  const innerRingRef = useRef()
  const thirdRingRef = useRef()
  const monolithOrbitRef = useRef()
  const particlesRef = useRef()

  const particlePositions = useMemo(() => {
    const count = 200
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 2.8 + Math.random() * 5.6
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.72
      arr[i * 3 + 2] = r * Math.cos(phi) - 0.3
    }
    return arr
  }, [])

  const monolithOffsets = useMemo(() => {
    const count = 6
    return Array.from({ length: count }, (_, idx) => {
      const angle = (idx / count) * Math.PI * 2
      const radius = 2.65
      return {
        pos: [Math.cos(angle) * radius, Math.sin(angle * 2) * 0.42, Math.sin(angle) * radius],
        rot: [0.3, -angle, 0.15],
        color: idx % 2 === 0 ? '#c2a4ff' : '#eae5ec',
      }
    })
  }, [])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const elapsed = state.clock.getElapsedTime()
    const px = pointerRef.current.x
    const py = pointerRef.current.y

    if (burstRef.current > 0) {
      burstRef.current = Math.max(0, burstRef.current - dt * 1.7)
    }
    const pulse = burstRef.current

    if (rigRef.current) {
      rigRef.current.rotation.y = THREE.MathUtils.damp(rigRef.current.rotation.y, px * 0.4, 4.0, dt)
      rigRef.current.rotation.x = THREE.MathUtils.damp(rigRef.current.rotation.x, -py * 0.24, 4.0, dt)
    }

    if (!reducedMotion) {
      const boost = 1 + pulse * 4.0
      if (coreGroupRef.current) {
        coreGroupRef.current.rotation.y += dt * 0.3 * boost
        coreGroupRef.current.rotation.x = Math.sin(elapsed * 0.55) * 0.18
        coreGroupRef.current.scale.setScalar(1 + pulse * 0.15)
      }
      if (outerRingRef.current) {
        outerRingRef.current.rotation.z += dt * 0.32 * boost
      }
      if (innerRingRef.current) {
        innerRingRef.current.rotation.z -= dt * 0.42 * boost
      }
      if (thirdRingRef.current) {
        thirdRingRef.current.rotation.y += dt * 0.26 * boost
      }
      if (monolithOrbitRef.current) {
        monolithOrbitRef.current.rotation.y -= dt * 0.24 * boost
      }
      if (particlesRef.current) {
        particlesRef.current.rotation.y = elapsed * 0.03
      }
    }
  })

  return (
    <>
      <fog attach="fog" args={[isDark ? '#0b080c' : '#faf8fc', 6.5, 19]} />

      <Environment key={isDark ? 'dark' : 'light'} resolution={128} frames={1}>
        <mesh scale={28}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshBasicMaterial color={isDark ? '#0b080c' : '#ede9f6'} side={THREE.BackSide} />
        </mesh>
        <Lightformer form="rect" intensity={4.8} color="#c2a4ff" position={[4, 4, 3]} scale={[6, 4, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={3.2} color="#eae5ec" position={[-5, 2, 4]} scale={[6, 3, 1]} target={[0, 0, 0]} />
        <Lightformer form="ring" intensity={3.8} color="#a87fff" position={[0, 5, -2]} rotation={[Math.PI / 2, 0, 0]} scale={[7, 7, 1]} />
      </Environment>

      {/* Studio 3-Point Lighting */}
      <hemisphereLight args={['#eae5ec', '#141018', 0.75]} />
      <directionalLight position={[4, 6, 4]} intensity={2.6} color="#eae5ec" />
      <directionalLight position={[-4, -2, 3]} intensity={1.9} color="#c2a4ff" />
      <pointLight position={[0, 0.4, -2.2]} intensity={6.0} distance={12} color="#b48cff" />

      {/* 3D Architectural Perspective Undulating Wave Grid Floor */}
      <UndulatingWaveTerrain isDark={isDark} burstRef={burstRef} reducedMotion={reducedMotion} />

      <group ref={rigRef} position={[0, 0.15, 0]}>
        <Float speed={reducedMotion ? 0 : 1.4} rotationIntensity={0.18} floatIntensity={0.32}>
          <group ref={coreGroupRef}>
            {/* Liquid-Chrome Obsidian Core */}
            <mesh>
              <icosahedronGeometry args={[0.96, 4]} />
              <MeshDistortMaterial
                color={isDark ? '#1e152c' : '#4c1d95'}
                metalness={0.94}
                roughness={0.12}
                distort={reducedMotion ? 0 : 0.28}
                speed={reducedMotion ? 0 : 2.3}
                envMapIntensity={2.1}
              />
            </mesh>

            {/* Luminous Lilac Geodesic Wireframe Cage */}
            <mesh>
              <icosahedronGeometry args={[1.38, 1]} />
              <meshStandardMaterial
                color="#c2a4ff"
                wireframe
                transparent
                opacity={isDark ? 0.65 : 0.4}
              />
            </mesh>

            {/* Inner Glowing Heart Crystal with Neon Bloom Glow */}
            <mesh>
              <octahedronGeometry args={[0.56, 0]} />
              <meshStandardMaterial
                color="#f4ecff"
                emissive="#c2a4ff"
                emissiveIntensity={3.2}
                roughness={0.1}
                metalness={0.3}
              />
            </mesh>
            <pointLight position={[0, 0, 0]} intensity={4.5} distance={6} color="#c2a4ff" />
          </group>

          {/* Outer Gimbal Rings with Neon Rim Glow */}
          <mesh ref={outerRingRef} rotation={[Math.PI * 0.36, 0.25, 0]}>
            <torusGeometry args={[1.88, 0.028, 20, 128]} />
            <meshPhysicalMaterial
              color="#c2a4ff"
              emissive="#a87fff"
              emissiveIntensity={0.7}
              metalness={0.95}
              roughness={0.12}
              clearcoat={1.0}
              envMapIntensity={2.2}
            />
          </mesh>

          <mesh ref={innerRingRef} rotation={[-Math.PI * 0.28, -0.4, 0.35]}>
            <torusGeometry args={[1.56, 0.02, 18, 128]} />
            <meshPhysicalMaterial
              color="#eae5ec"
              emissive="#eae5ec"
              emissiveIntensity={0.4}
              metalness={0.92}
              roughness={0.14}
              transparent
              opacity={0.88}
            />
          </mesh>

          <mesh ref={thirdRingRef} rotation={[Math.PI * 0.16, 0.65, -0.35]}>
            <torusGeometry args={[2.22, 0.018, 16, 128]} />
            <meshStandardMaterial
              color="#f5c26b"
              emissive="#f5c26b"
              emissiveIntensity={0.6}
              metalness={0.9}
              roughness={0.15}
              transparent
              opacity={0.85}
            />
          </mesh>

          {/* Orbiting 3D Monolith Slabs */}
          <group ref={monolithOrbitRef}>
            {monolithOffsets.map((m, i) => (
              <group key={i} position={m.pos} rotation={m.rot}>
                <mesh>
                  <boxGeometry args={[0.24, 0.38, 0.06]} />
                  <meshPhysicalMaterial
                    color={isDark ? '#1a1324' : '#ffffff'}
                    metalness={0.88}
                    roughness={0.16}
                    clearcoat={0.9}
                  />
                </mesh>
                <mesh>
                  <boxGeometry args={[0.27, 0.41, 0.08]} />
                  <meshBasicMaterial color={m.color} wireframe transparent opacity={0.45} />
                </mesh>
              </group>
            ))}
          </group>
        </Float>
      </group>

      {/* Atmospheric Depth Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particlePositions.length / 3}
            array={particlePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.044}
          color={isDark ? '#e0ceff' : '#6d28d9'}
          transparent
          opacity={isDark ? 0.68 : 0.32}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </>
  )
}

export default function Hero3DBackdrop({ className = '', interactive = true }) {
  const { dark } = useTheme()
  const containerRef = useRef(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const burstRef = useRef(0)
  const [fallback, setFallback] = useState(false)
  const [isSoftwareGl, setIsSoftwareGl] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [inView, setInView] = useState(true)

  useEffect(() => {
    setReducedMotion(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || false)
    const glProbe = probeWebGL()
    if (!glProbe.supported) {
      setFallback(true)
    } else {
      setIsSoftwareGl(glProbe.isSoftware)
    }

    const onMove = (e) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointerRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    let observer
    if (containerRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => setInView(entry.isIntersecting),
        { threshold: 0.05 }
      )
      observer.observe(containerRef.current)
    }

    return () => {
      window.removeEventListener('pointermove', onMove)
      observer?.disconnect()
    }
  }, [])

  const fallbackBackdrop = (
    <div
      className={`${className}`}
      style={{
        background: dark
          ? 'radial-gradient(circle at 50% 48%, rgba(194, 164, 255, 0.28), rgba(168, 127, 255, 0.1) 42%, transparent 70%)'
          : 'radial-gradient(circle at 50% 48%, rgba(109, 40, 217, 0.16), transparent 70%)',
      }}
    />
  )

  if (fallback) {
    return fallbackBackdrop
  }

  return (
    <div
      ref={containerRef}
      onClick={() => {
        burstRef.current = 1
      }}
      className={`${interactive ? 'cursor-grab active:cursor-grabbing' : 'pointer-events-none'} ${className}`}
      aria-hidden="true"
    >
      <WebGLErrorBoundary fallback={fallbackBackdrop} onError={() => setFallback(true)}>
        <Canvas
          frameloop={inView ? 'always' : 'demand'}
          dpr={isSoftwareGl ? 1 : [1, 1.75]}
          camera={{ position: [0, 0.45, 6.2], fov: 44 }}
          gl={{
            antialias: !isSoftwareGl,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.22,
          }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener('webglcontextlost', (e) => {
              e.preventDefault()
              setFallback(true)
            })
          }}
        >
          <CyberArchitecturalStage
            pointerRef={pointerRef}
            reducedMotion={reducedMotion}
            isDark={dark}
            burstRef={burstRef}
          />
          {interactive && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableDamping
              dampingFactor={0.07}
              autoRotate={!reducedMotion}
              autoRotateSpeed={0.95}
              rotateSpeed={0.7}
            />
          )}
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  )
}
