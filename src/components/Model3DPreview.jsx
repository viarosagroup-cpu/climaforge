import { Canvas } from '@react-three/fiber';
import { OrbitControls, Box, Text } from '@react-three/drei';
import { motion } from 'framer-motion';

const LAYOUTS = {
  default: {
    shell: [3.8, 2, 2.8],
    roof: [4.2, 0.3, 3.2],
    doorX: 0,
    wing: null,
  },
  compact: {
    shell: [3.2, 2, 2.4],
    roof: [3.6, 0.3, 2.8],
    doorX: 0,
    wing: null,
  },
  extended: {
    shell: [4.4, 2, 3],
    roof: [4.8, 0.3, 3.4],
    doorX: -0.3,
    wing: {
      args: [1.5, 1.6, 1.7],
      position: [2.7, 0.8, -0.5],
      roofArgs: [1.8, 0.24, 2],
      roofPosition: [2.7, 1.75, -0.5],
    },
  },
};

export function Model3DPreview({
  modelName = 'The Veranda',
  layout = 'default',
  wallColor = '#F5F5F5',
  roofColor = '#8B4513',
  accentColor = '#654321',
}) {
  const selected = LAYOUTS[layout] || LAYOUTS.default;

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
          <Box args={selected.shell} position={[0, 1, 0]}>
            <meshStandardMaterial color={wallColor} />
          </Box>

          {/* Roof */}
          <Box args={selected.roof} position={[0, 2.15, 0]} rotation={[0.2, 0, 0]}>
            <meshStandardMaterial color={roofColor} />
          </Box>

          {selected.wing && (
            <>
              <Box args={selected.wing.args} position={selected.wing.position}>
                <meshStandardMaterial color={wallColor} />
              </Box>
              <Box args={selected.wing.roofArgs} position={selected.wing.roofPosition}>
                <meshStandardMaterial color={roofColor} />
              </Box>
            </>
          )}

          {/* Door */}
          <Box args={[0.8, 1.8, 0.1]} position={[selected.doorX, 0.9, 1.45]}>
            <meshStandardMaterial color={accentColor} />
          </Box>

          {/* Windows */}
          <Box args={[0.6, 0.6, 0.1]} position={[-1.1, 1.2, 1.45]}>
            <meshStandardMaterial color="#87CEEB" />
          </Box>
          <Box args={[0.6, 0.6, 0.1]} position={[1.1, 1.2, 1.45]}>
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
          {modelName} - {layout} layout
        </Text>
      </Canvas>
    </motion.div>
  );
}