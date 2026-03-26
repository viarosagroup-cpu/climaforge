import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Text } from '@react-three/drei';
import { motion } from 'framer-motion';

export function Model3DPreview({ modelName = "The Veranda" }) {
  return (
    <motion.div
      className="model-3d-container"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <OrbitControls enableZoom={true} enablePan={false} />

        {/* Simple house representation */}
        <group>
          {/* Base/foundation */}
          <Box args={[4, 0.2, 3]} position={[0, -0.1, 0]}>
            <meshStandardMaterial color="#8B7355" />
          </Box>

          {/* Main structure */}
          <Box args={[3.8, 2, 2.8]} position={[0, 1, 0]}>
            <meshStandardMaterial color="#F5F5F5" />
          </Box>

          {/* Roof */}
          <Box args={[4.2, 0.3, 3.2]} position={[0, 2.15, 0]} rotation={[0.2, 0, 0]}>
            <meshStandardMaterial color="#8B4513" />
          </Box>

          {/* Door */}
          <Box args={[0.8, 1.8, 0.1]} position={[0, 0.9, 1.45]}>
            <meshStandardMaterial color="#654321" />
          </Box>

          {/* Windows */}
          <Box args={[0.6, 0.6, 0.1]} position={[-1, 1.2, 1.45]}>
            <meshStandardMaterial color="#87CEEB" />
          </Box>
          <Box args={[0.6, 0.6, 0.1]} position={[1, 1.2, 1.45]}>
            <meshStandardMaterial color="#87CEEB" />
          </Box>
        </group>

        <Text
          position={[0, -2, 0]}
          fontSize={0.5}
          color="#1c1c1c"
          anchorX="center"
          anchorY="middle"
        >
          {modelName} - Interactive 3D Preview
        </Text>
      </Canvas>
    </motion.div>
  );
}