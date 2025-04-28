import React, { useState, useEffect, Suspense } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PresentationControls } from '@react-three/drei';
import axios from 'axios';
import server_url from '../services/ServerUrl';


const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  return <primitive object={scene} scale={1} />;
};

const ModelViewer = () => {
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        const response = await axios.get(`${server_url}/api/models/${id}`);
        setModel(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch model details');
        setLoading(false);
        console.error(err);
      }
    };

    fetchModel();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !model) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative h-screen flex items-center justify-center" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error || 'Model not found'}</span>
        <div className="mt-4">
          <Link to="/" className="text-blue-500 hover:underline">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  const modelUrl = model.filePath.startsWith('http') ? model.filePath : `${server_url}/${model.filePath}`;

  return (
    <div className="h-screen w-screen">
      {/* <div className="absolute top-4 left-4 z-10">
        <Link to="/" className="text-blue-500 hover:underline">&larr; Back to Dashboard</Link>
      </div> */}
      <Canvas className="h-full w-full" camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <Suspense fallback={null}>
          <PresentationControls
            global
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <Model url={modelUrl} />
          </PresentationControls>
          <Environment preset="city" />
        </Suspense>
        
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default ModelViewer;