import { Component, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Line, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { SKILL_CATEGORIES } from '../data/portfolioData'
import { useTheme } from '../context/ThemeContext'

const STAGE_COLOR = {
  'Actively Used': '#c2a4ff',
  'Working Knowledge': '#eae5ec',
  'Currently Learning': '#f5c26b',
}

// Highlighted anchor skills positioned around a balanced 3D Fibonacci sphere
const CONSTELLATION_SKILL_NAMES = [
  'Python',
  'FastAPI',
  'Node.js',
  'Express.js',
  'React.js',
  'MongoDB',
  'PostgreSQL',
  'Gemini API',
  'RAG Concepts',
  'JWT',
  'Docker',
  'NLTK',
  'Pandas',
  'Flutter',
]

function buildConstellationNodes() {
  const flat = []
  SKILL_CATEGORIES.forEach((group) => {
    group.items.forEach((item) => {
      if (CONSTELLATION_SKILL_NAMES.includes(item.name)) {
        flat.push({
          ...item,
          category: group.category,
          color: STAGE_COLOR[item.tier] || '#c2a4ff',
        })
      }
    })
  })

  // Fibonacci sphere distribution for even 3D spacing
  const n = flat.length
  const goldenAngle = Math.PI * (3 - Math.sqrt(5))
  return flat.map((node, i) => {
    const y = 1 - (i / (n - 1)) * 2
    const radiusAtY = Math.sqrt(1 - y * y)
    const theta = goldenAngle * i
    const r = 2.35
    return {
      ...node,
      position: [
        Math.cos(theta) * radiusAtY * r,
        y * r * 0.85,
        Math.sin(theta) * radiusAtY * r,
      ],
    }
  })
}

class CanvasErrorBoundary extends Component {
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

function OrbitalSkillMesh({ nodes, selectedName, onSelect, reducedMotion, isDark }) {
  const groupRef = useRef()
  const [hoveredName, setHoveredName] = useState(null)

  const spokes = useMemo(
    () => nodes.map((n) => [[0, 0, 0], n.position]),
    [nodes]
  )

  useFrame((_, delta) => {
    if (!reducedMotion && groupRef.current && !hoveredName) {
      groupRef.current.rotation.y += Math.min(delta, 0.05) * 0.14
    }
  })

  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 5, 4]} intensity={1.8} color="#eae5ec" />
      <pointLight position={[-3, -2, 3]} intensity={2.4} color="#c2a4ff" />

      <group ref={groupRef}>
        {/* Central Obsidian Core */}
        <mesh>
          <icosahedronGeometry args={[0.52, 1]} />
          <meshStandardMaterial
            color={isDark ? '#1a1324' : '#4c1d95'}
            metalness={0.85}
            roughness={0.2}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.72, 1]} />
          <meshStandardMaterial color="#c2a4ff" wireframe transparent opacity={0.36} />
        </mesh>

        {/* Orbital Guide Rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.35, 0.008, 12, 96]} />
          <meshBasicMaterial color="#c2a4ff" transparent opacity={0.26} />
        </mesh>
        <mesh rotation={[Math.PI * 0.25, Math.PI * 0.25, 0]}>
          <torusGeometry args={[2.35, 0.008, 12, 96]} />
          <meshBasicMaterial color="#eae5ec" transparent opacity={0.14} />
        </mesh>

        {/* Connection Spokes from Core */}
        {spokes.map((pts, idx) => (
          <Line
            key={idx}
            points={pts}
            color={nodes[idx].color}
            transparent
            opacity={
              selectedName === nodes[idx].name || hoveredName === nodes[idx].name
                ? 0.65
                : 0.16
            }
            lineWidth={1}
          />
        ))}

        {/* Skill Anchor Nodes */}
        {nodes.map((node) => {
          const isActive = selectedName === node.name || hoveredName === node.name
          return (
            <group key={node.name} position={node.position}>
              <mesh
                onPointerOver={(e) => {
                  e.stopPropagation()
                  setHoveredName(node.name)
                  onSelect(node)
                  document.body.style.cursor = 'pointer'
                }}
                onPointerOut={() => {
                  setHoveredName(null)
                  document.body.style.cursor = 'auto'
                }}
                onClick={(e) => {
                  e.stopPropagation()
                  onSelect(node)
                }}
              >
                <sphereGeometry args={[isActive ? 0.16 : 0.11, 20, 20]} />
                <meshStandardMaterial
                  color={node.color}
                  emissive={node.color}
                  emissiveIntensity={isActive ? 1.4 : 0.5}
                  metalness={0.5}
                  roughness={0.2}
                />
              </mesh>

              <Html
                center
                distanceFactor={8}
                style={{ pointerEvents: 'auto' }}
              >
                <button
                  type="button"
                  onMouseEnter={() => onSelect(node)}
                  onClick={() => onSelect(node)}
                  className="px-2 py-0.5 rounded-md text-[11px] font-mono whitespace-nowrap transition-transform duration-150 border"
                  style={{
                    backgroundColor: isActive
                      ? 'rgba(194, 164, 255, 0.22)'
                      : isDark
                        ? 'rgba(11, 8, 12, 0.88)'
                        : 'rgba(255, 255, 255, 0.92)',
                    color: isActive ? '#ffffff' : isDark ? '#eae5ec' : '#130f18',
                    borderColor: isActive ? node.color : 'rgba(234, 229, 236, 0.16)',
                    transform: isActive ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {node.name}
                </button>
              </Html>
            </group>
          )
        })}
      </group>
    </>
  )
}

export default function TechConstellation3D() {
  const { dark } = useTheme()
  const nodes = useMemo(() => buildConstellationNodes(), [])
  const [selected, setSelected] = useState(nodes[0])
  const [inView, setInView] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [fallback, setFallback] = useState(false)
  const wrapperRef = useRef(null)

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

    let observer
    if (wrapperRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => setInView(entry.isIntersecting),
        { threshold: 0.05 }
      )
      observer.observe(wrapperRef.current)
    }
    return () => observer?.disconnect()
  }, [])

  if (fallback) {
    return null
  }

  return (
    <div
      ref={wrapperRef}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center rounded-2xl border border-[var(--border)] p-4 md:p-6 mb-8"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      {/* Left: Live Interactive 3D WebGL Tech Sphere */}
      <div className="lg:col-span-7 relative h-[280px] sm:h-[340px] lg:h-[360px] rounded-xl overflow-hidden border border-[var(--border)] bg-[#0b080c]">
        <div
          className="pointer-events-none absolute top-3 left-3.5 z-10 text-[11px] font-mono"
          style={{ color: 'var(--text-dim)' }}
        >
          Drag to orbit · Hover or click node
        </div>
        <CanvasErrorBoundary fallback={null}>
          <Canvas
            frameloop={inView ? 'always' : 'demand'}
            dpr={[1, 1.5]}
            camera={{ position: [0, 0.4, 6.2], fov: 44 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            onCreated={({ gl }) => {
              gl.domElement.addEventListener('webglcontextlost', (e) => {
                e.preventDefault()
                setFallback(true)
              })
            }}
          >
            <OrbitalSkillMesh
              nodes={nodes}
              selectedName={selected?.name}
              onSelect={setSelected}
              reducedMotion={reducedMotion}
              isDark={dark}
            />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableDamping
              dampingFactor={0.07}
              rotateSpeed={0.7}
            />
          </Canvas>
        </CanvasErrorBoundary>
      </div>

      {/* Right: Concise Active 3D Node Context */}
      {selected && (
        <div className="lg:col-span-5 space-y-4 px-2">
          <div className="flex items-center gap-2 text-xs font-mono">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: selected.color }}
              aria-hidden="true"
            />
            <span style={{ color: selected.color }}>{selected.tier}</span>
            <span style={{ color: 'var(--text-dim)' }}>·</span>
            <span style={{ color: 'var(--text-dim)' }}>{selected.category}</span>
          </div>

          <h3 className="font-display font-bold text-2xl md:text-3xl" style={{ color: 'var(--text-primary)' }}>
            {selected.name}
          </h3>

          <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {selected.context}
          </p>

          {selected.appliedIn?.length > 0 && (
            <div className="pt-3 border-t border-[var(--border)]">
              <p className="text-[11px] font-mono uppercase tracking-wider mb-2" style={{ color: 'var(--text-dim)' }}>
                Applied In
              </p>
              <div className="flex flex-wrap gap-1.5 text-xs font-mono" style={{ color: 'var(--text-primary)' }}>
                {selected.appliedIn.map((proj) => (
                  <span
                    key={proj}
                    className="px-2.5 py-1 rounded-lg border border-[var(--border)]"
                    style={{ backgroundColor: 'var(--bg-card-solid)' }}
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
