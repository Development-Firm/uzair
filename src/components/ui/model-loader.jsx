// components/ui/ModelLoader.tsx
import { Html, useProgress } from '@react-three/drei'
import { useEffect } from 'react'

// Circular progress with label using Tailwind CSS and ShadCN
function CircularProgressWithLabel(props) {
  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Create a circular progress bar using Tailwind */}
      <div className="w-24 h-24 border-4 border-blue-500 rounded-full animate-spin-slow">
        <div
          className="w-full h-full rounded-full border-4 border-t-4 border-blue-500"
          style={{
            transform: `rotate(${props.value * 3.6}deg)`,
            transition: 'transform 0.2s ease-out',
          }}
        />
      </div>
      
      <div className="absolute flex items-center justify-center inset-0">
        {/* Display the percentage value */}
        <span className="text-gray-600 text-xs">{`${Math.round(props.value)}%`}</span>
      </div>
    </div>
  )
}

const ModelLoader = () => {
  const { active, progress, errors, item, loaded, total } = useProgress()

  useEffect(() => {
    // You can add any side-effects if needed here (e.g., log loading state)
  }, [active, progress])

  return (
    <Html
      as="div"
      style={{ width: '100%', backgroundColor: 'transparent' }} // Remove background or change it
      position={[0, 0, 0]} // You can adjust this position if needed
    >
      <div className="flex items-center justify-center w-full h-full bg-transparent">
        <CircularProgressWithLabel value={progress} />
      </div>
    </Html>
  )
}

export default ModelLoader
