import { Component, useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Text, Html } from '@react-three/drei'
import * as THREE from 'three'
import { Monitor, Server, FileCheck2, Sparkles, CheckCircle2, ChevronRight, RotateCcw } from 'lucide-react'

class WebGLErrorBoundary extends Component {
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

const NODES_DATA = [
  {
    id: 'client-app',
    step: '01',
    label: 'Client App',
    role: 'Repo Upload & Query UI',
    position: [-3.3, 0.3, 0],
    color: '#c2a4ff',
    icon: Monitor,
    endpoint: 'POST /api/chat/query',
    moduleRef: 'frontend/src/components/ChatWorkspace.tsx',
    summary:
      'Packages developer queries and session identifier into a validated request payload, rendering streaming markdown answers with real-time verification indicators.',
  },
  {
    id: 'fastapi',
    step: '02',
    label: 'FastAPI',
    role: 'Parsing & Pydantic Validation',
    position: [-1.1, -0.25, 0.4],
    color: '#c2a4ff',
    icon: Server,
    endpoint: 'Pydantic Request / Response',
    moduleRef: 'backend/app/routers/chat.py',
    summary:
      'Parses directory trees, strips binary and build artifacts (node_modules, .git), indexes source chunks, and handles upstream error boundaries.',
  },
  {
    id: 'citation-validator',
    step: '03',
    label: 'Citation Validator',
    role: 'Deterministic Verification',
    position: [1.1, 0.35, 0],
    color: '#f5c26b',
    icon: FileCheck2,
    endpoint: 'Post-Generation Check',
    moduleRef: 'backend/app/services/citation_validator.py',
    summary:
      'Cross-checks every referenced file path and line number from LLM output against the verified repo manifest to flag hallucinated paths before returning.',
  },
  {
    id: 'gemini',
    step: '04',
    label: 'Gemini AI',
    role: 'Grounded LLM Synthesis',
    position: [3.3, -0.2, -0.2],
    color: '#c2a4ff',
    icon: Sparkles,
    endpoint: 'Server-Side SDK Call',
    moduleRef: 'backend/app/services/gemini_client.py',
    summary:
      'Processes scoped code context strictly on backend to explain architecture flows and symbol behavior with structured file citations.',
  },
]

function PipelineScene({ activeId, onSelectNode, isDark }) {
  const groupRef = useRef()
  const packetsRef = useRef([])
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0))

  // Create points for the connecting bezier curve
  const curve = useMemo(() => {
    const points = NODES_DATA.map((n) => new THREE.Vector3(...n.position))
    return new THREE.CatmullRomCurve3(points)
  }, [])

  // Curve geometry line points
  const linePoints = useMemo(() => curve.getPoints(70), [curve])
  const lineGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(linePoints), [linePoints])

  // Data packet progress offsets (3 packets flowing continuously)
  const packetOffsets = useRef([0.1, 0.45, 0.8])

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05)
    const elapsed = state.clock.getElapsedTime()

    // Smooth camera drift towards active node
    const targetNode = NODES_DATA.find((n) => n.id === activeId)
    if (targetNode) {
      cameraTarget.current.lerp(
        new THREE.Vector3(targetNode.position[0] * 0.4, targetNode.position[1] * 0.4, 0),
        dt * 3.5
      )
    }

    state.camera.lookAt(cameraTarget.current)

    // Animate glowing data packets along the curve
    packetOffsets.current = packetOffsets.current.map((off) => (off + dt * 0.28) % 1.0)
  })

  return (
    <>
      <ambientLight intensity={isDark ? 0.6 : 0.8} />
      <directionalLight position={[4, 5, 4]} intensity={1.6} color="#eae5ec" />
      <pointLight position={[0, 2, 2]} intensity={3.5} color="#c2a4ff" distance={10} />

      {/* Connecting Flow Cable */}
      <primitive object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
        color: '#c2a4ff',
        transparent: true,
        opacity: isDark ? 0.35 : 0.25,
        linewidth: 2,
      }))} />

      {/* Floating 3D Glass Pipeline Nodes */}
      {NODES_DATA.map((node) => {
        const isSelected = node.id === activeId
        return (
          <Float key={node.id} speed={1.2} rotationIntensity={0.2} floatIntensity={0.25}>
            <group
              position={node.position}
              onClick={(e) => {
                e.stopPropagation()
                onSelectNode(node.id)
              }}
            >
              {/* Outer Glowing Wireframe Cage */}
              <mesh>
                <boxGeometry args={[1.2, 0.9, 0.5]} />
                <meshStandardMaterial
                  color={node.color}
                  wireframe
                  transparent
                  opacity={isSelected ? 0.9 : 0.35}
                />
              </mesh>

              {/* Inner Translucent 3D Glass Core */}
              <mesh>
                <boxGeometry args={[1.15, 0.85, 0.45]} />
                <meshPhysicalMaterial
                  color={isDark ? '#141018' : '#faf8fc'}
                  metalness={0.8}
                  roughness={0.2}
                  transmission={0.4}
                  transparent
                  opacity={0.88}
                  emissive={isSelected ? node.color : '#000000'}
                  emissiveIntensity={isSelected ? 0.4 : 0.0}
                />
              </mesh>

              {/* Pulsing Selection Halo */}
              {isSelected && (
                <mesh scale={1.25}>
                  <ringGeometry args={[0.7, 0.74, 32]} />
                  <meshBasicMaterial color={node.color} transparent opacity={0.6} side={THREE.DoubleSide} />
                </mesh>
              )}

              {/* 3D Label Badge floating on node */}
              <Html center distanceFactor={7} position={[0, -0.65, 0]} className="pointer-events-none select-none">
                <div
                  className={`px-2.5 py-1 rounded-lg border text-[11px] font-mono whitespace-nowrap transition-all ${
                    isSelected
                      ? 'border-[#c2a4ff] bg-[#1a1224] text-[#c2a4ff] shadow-lg shadow-purple-950/60 font-semibold'
                      : 'border-[var(--border)] bg-[#110d14]/90 text-zinc-300'
                  }`}
                >
                  <span className="text-[10px] text-[#f5c26b] mr-1">{node.step}</span>
                  {node.label}
                </div>
              </Html>
            </group>
          </Float>
        )
      })}

      {/* Flowing 3D Data Packets */}
      {packetOffsets.current.map((t, idx) => {
        const pt = curve.getPoint(t)
        return (
          <mesh key={idx} position={[pt.x, pt.y, pt.z]}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshStandardMaterial
              color={idx === 1 ? '#f5c26b' : '#c2a4ff'}
              emissive={idx === 1 ? '#f5c26b' : '#c2a4ff'}
              emissiveIntensity={2.8}
            />
          </mesh>
        )
      })}
    </>
  )
}

export default function CodeMind3DPipeline({
  activeNodeId,
  onNodeChange,
  isDark = true,
  className = '',
}) {
  const [internalId, setInternalId] = useState(activeNodeId || 'citation-validator')
  const currentId = activeNodeId !== undefined ? activeNodeId : internalId

  const handleSelect = (id) => {
    setInternalId(id)
    onNodeChange?.(id)
  }

  const activeNode = NODES_DATA.find((n) => n.id === currentId) || NODES_DATA[2]

  return (
    <div className={`space-y-4 ${className}`}>
      {/* 3D WebGL Pipeline Stage Canvas */}
      <div className="relative h-[280px] sm:h-[320px] rounded-2xl border border-[var(--border)] overflow-hidden bg-gradient-to-b from-[#110d14] via-[#0b080c] to-[#141018]">
        <WebGLErrorBoundary
          fallback={
            <div className="flex h-full items-center justify-center text-sm font-mono text-[var(--text-dim)]">
              3D Pipeline Stage (Fallback Active)
            </div>
          }
        >
          <Canvas
            camera={{ position: [0, 0.4, 5.2], fov: 48 }}
            dpr={[1, 1.5]}
            gl={{ powerPreference: 'high-performance', antialias: false }}
          >
            <PipelineScene activeId={currentId} onSelectNode={handleSelect} isDark={isDark} />
          </Canvas>
        </WebGLErrorBoundary>

        {/* 3D Stage Overlay Controls */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-mono pointer-events-none">
          <span className="px-2.5 py-1 rounded-md border border-[var(--border)] bg-[#110d14]/80 backdrop-blur-md text-[var(--accent)] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-ping" />
            3D Animated Request Pipeline
          </span>
          <span className="text-[11px] text-[var(--text-dim)] hidden sm:inline">
            Click any 3D node to inspect
          </span>
        </div>
      </div>

      {/* Selected Node Inspection Details */}
      <div className="rounded-2xl border border-[var(--border-strong)] p-5 bg-[var(--bg-card-solid)] shadow-xl shadow-black/40">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--border)]">
          <div>
            <div className="text-[11px] font-mono text-[#f5c26b]">
              NODE {activeNode.step} OF 04
            </div>
            <h4 className="font-display font-bold text-base text-[var(--text-primary)]">
              {activeNode.label} · <span className="text-xs font-mono text-[var(--accent)]">{activeNode.role}</span>
            </h4>
          </div>
          <span className="px-2.5 py-1 rounded-md border border-[var(--border)] bg-[#110d14] font-mono text-xs text-[var(--text-dim)]">
            {activeNode.endpoint}
          </span>
        </div>

        <p className="font-body text-xs sm:text-sm leading-relaxed text-[var(--text-muted)] mt-3">
          {activeNode.summary}
        </p>

        <div className="mt-3 pt-3 border-t border-[var(--border)] flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <span className="text-[var(--text-dim)] truncate">
            Ref: {activeNode.moduleRef}
          </span>
          <span className="text-[var(--accent)] flex items-center gap-1">
            <CheckCircle2 size={13} /> Strict Verification Contract
          </span>
        </div>
      </div>
    </div>
  )
}
