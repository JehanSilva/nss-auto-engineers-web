"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function Gear({ position, scale, speed = 1, reverse = false }: { 
  position: [number, number, number]; 
  scale: number; 
  speed?: number;
  reverse?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const teeth = 12;
    const outerRadius = 1;
    const innerRadius = 0.7;
    const toothDepth = 0.15;
    
    for (let i = 0; i < teeth; i++) {
      const angle = (i / teeth) * Math.PI * 2;
      const nextAngle = ((i + 1) / teeth) * Math.PI * 2;
      const midAngle = (angle + nextAngle) / 2;
      
      const x1 = Math.cos(angle) * outerRadius;
      const y1 = Math.sin(angle) * outerRadius;
      const x2 = Math.cos(angle + 0.1) * (outerRadius + toothDepth);
      const y2 = Math.sin(angle + 0.1) * (outerRadius + toothDepth);
      const x3 = Math.cos(midAngle - 0.1) * (outerRadius + toothDepth);
      const y3 = Math.sin(midAngle - 0.1) * (outerRadius + toothDepth);
      const x4 = Math.cos(midAngle) * outerRadius;
      const y4 = Math.sin(midAngle) * outerRadius;
      
      if (i === 0) {
        shape.moveTo(x1, y1);
      }
      shape.lineTo(x2, y2);
      shape.lineTo(x3, y3);
      shape.lineTo(x4, y4);
      shape.lineTo(Math.cos(nextAngle) * outerRadius, Math.sin(nextAngle) * outerRadius);
    }
    
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, innerRadius, 0, Math.PI * 2, false);
    shape.holes.push(holePath);
    
    const extrudeSettings = {
      depth: 0.3,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.05,
      bevelSegments: 3,
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.003 * speed * (reverse ? -1 : 1);
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={position} scale={scale}>
      <meshStandardMaterial 
        color="#dc2626"
        metalness={0.9}
        roughness={0.2}
        envMapIntensity={1.5}
      />
    </mesh>
  );
}

function Piston({ position }: { position: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const pistonRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (pistonRef.current && groupRef.current) {
      pistonRef.current.position.y = Math.sin(state.clock.elapsedTime * 2) * 0.3;
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Cylinder Block */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 1.5, 32, 1, true]} />
        <meshStandardMaterial 
          color="#262626" 
          metalness={0.8} 
          roughness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
      
      {/* Piston */}
      <mesh ref={pistonRef} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.35, 0.35, 0.3, 32]} />
        <meshStandardMaterial 
          color="#78716c" 
          metalness={0.95} 
          roughness={0.1}
        />
      </mesh>
      
      {/* Piston Rod */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.8, 16]} />
        <meshStandardMaterial 
          color="#a3a3a3" 
          metalness={0.9} 
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

function GlassSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <icosahedronGeometry args={[1.5, 1]} />
        <MeshTransmissionMaterial
          backside
          samples={16}
          thickness={0.5}
          chromaticAberration={0.5}
          anisotropy={0.3}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.1}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
          color="#dc2626"
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1}
        castShadow
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#dc2626" />
      
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <group>
          <Gear position={[-1.5, 0.8, 0]} scale={0.6} speed={1} />
          <Gear position={[1.2, -0.5, 0.3]} scale={0.45} speed={1.3} reverse />
          <Gear position={[0, 0, -0.5]} scale={0.8} speed={0.7} />
        </group>
      </Float>
      
      <Piston position={[2.5, 0, 0]} />
      
      <GlassSphere />
      
      <Environment preset="warehouse" />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
