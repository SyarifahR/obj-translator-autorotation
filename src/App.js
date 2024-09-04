import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import * as THREE from 'three';

function RotatingOBJ({ objPath, mtlPath, setRotationInfo }) {
  const objRef = useRef();
  const [scale, setScale] = useState([1, 1, 1]);

  // Load MTL and OBJ files
  const materials = useLoader(MTLLoader, mtlPath);
  const obj = useLoader(OBJLoader, objPath, (loader) => {
    loader.setMaterials(materials);
  });

  useEffect(() => {
    if (obj) {
      // Calculate the bounding box of the object
      const box = new THREE.Box3().setFromObject(obj);
      const size = new THREE.Vector3();
      box.getSize(size);

      // Determine the largest dimension
      const maxSize = Math.max(size.x, size.y, size.z);

      // Set a scale factor to fit the object into the viewport
      const scaleFactor = 2 / maxSize; // Adjust this factor if necessary

      setScale([scaleFactor, scaleFactor, scaleFactor]);

      // Center the object
      const center = new THREE.Vector3();
      box.getCenter(center);
      obj.position.sub(center);
    }
  }, [obj]);

  useFrame(() => {
    if (objRef.current) {
      objRef.current.rotation.x += 0.01;
      objRef.current.rotation.y += 0.01;

      setRotationInfo({
        x: objRef.current.rotation.x,
        y: objRef.current.rotation.y,
        z: objRef.current.rotation.z,
        xDeg: objRef.current.rotation.x * (180 / Math.PI),
        yDeg: objRef.current.rotation.y * (180 / Math.PI),
        zDeg: objRef.current.rotation.z * (180 / Math.PI),
      });
    }
  });

  return <primitive object={obj} ref={objRef} scale={scale} />;
}

function App() {
  const [rotationInfo, setRotationInfo] = useState({ x: 0, y: 0, z: 0, xDeg: 0, yDeg: 0, zDeg: 0 });

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <RotatingOBJ 
          objPath="/Floorplan_1_text/Floorplan_1_text.obj" 
          mtlPath="/Floorplan_1_text/Floorplan_1_text.mtl" 
          setRotationInfo={setRotationInfo} 
        />
        {/* <RotatingOBJ 
          objPath="/Floorplan_1_withouttext/Floorplan_1_withouttext.obj" 
          mtlPath="/Floorplan_1_withouttext/Floorplan_1_withouttext.mtl" 
          setRotationInfo={setRotationInfo} 
        /> */}
        {/* <RotatingOBJ 
          objPath="/Floorplan_2_withouttext/Floorplan_2_withouttext.obj" 
          mtlPath="/Floorplan_2_withouttext/Floorplan_2_withouttext.mtl" 
          setRotationInfo={setRotationInfo} 
        /> */}
        {/* <RotatingOBJ 
          objPath="/Floorplan_2_withouttext/testing.obj" 
          mtlPath="/Floorplan_2_withouttext/testing.mtl" 
          setRotationInfo={setRotationInfo} 
        /> */}
        <OrbitControls 
          enableZoom={true}  // Ensure zoom is enabled
          zoomSpeed={1.0}     // Control the speed of zooming
          maxDistance={20}    // Maximum distance to zoom out
          minDistance={2}     // Minimum distance to zoom in
        />
      </Canvas>
      <div id="info" style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        color: 'black', 
        padding: '20px', 
        backgroundColor: 'rgba(0, 0, 0, 0)', 
        zIndex: 1,
        fontSize: '24px',
        textAlign: 'center',
        width: '100vw'
        }}>
        Position - X: {rotationInfo.x.toFixed(2)}, Y: {rotationInfo.y.toFixed(2)}, Z: {rotationInfo.z.toFixed(2)}<br />
        Rotation - X: {rotationInfo.xDeg.toFixed(2)}°, Y: {rotationInfo.yDeg.toFixed(2)}°, Z: {rotationInfo.zDeg.toFixed(2)}°
      </div>
    </div>
  );
}

export default App;






////////////////////////////////////////////////////////////////////////////////////////////






// import React, { useRef, useState, useEffect } from 'react';
// import { Canvas, useFrame, useLoader, extend } from '@react-three/fiber';
// import { OrbitControls, Html } from '@react-three/drei';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
// import * as THREE from 'three';
// import { SphereGeometry } from 'three';

// // Extend the SphereGeometry for use in React Three Fiber
// extend({ SphereGeometry });

// function RotatingOBJ({ objPath, mtlPath, setRotationInfo }) {
//   const objRef = useRef();
//   const [scale, setScale] = useState([1, 1, 1]);

//   // Load MTL and OBJ files
//   const materials = useLoader(MTLLoader, mtlPath);
//   const obj = useLoader(OBJLoader, objPath, (loader) => {
//     loader.setMaterials(materials);
//   });

//   useEffect(() => {
//     if (obj) {
//       // Calculate the bounding box of the object
//       const box = new THREE.Box3().setFromObject(obj);
//       const size = new THREE.Vector3();
//       box.getSize(size);

//       // Determine the largest dimension
//       const maxSize = Math.max(size.x, size.y, size.z);

//       // Set a scale factor to fit the object into the viewport
//       const scaleFactor = 2 / maxSize;

//       setScale([scaleFactor, scaleFactor, scaleFactor]);

//       // Center the object
//       const center = new THREE.Vector3();
//       box.getCenter(center);
//       obj.position.sub(center);
//     }
//   }, [obj]);

//   useFrame(() => {
//     if (objRef.current) {
//       objRef.current.rotation.x += 0.01;
//       objRef.current.rotation.y += 0.01;

//       setRotationInfo({
//         x: objRef.current.rotation.x,
//         y: objRef.current.rotation.y,
//         z: objRef.current.rotation.z,
//         xDeg: objRef.current.rotation.x * (180 / Math.PI),
//         yDeg: objRef.current.rotation.y * (180 / Math.PI),
//         zDeg: objRef.current.rotation.z * (180 / Math.PI),
//       });
//     }
//   });

//   return (
//     <primitive object={obj} ref={objRef} scale={scale}>
//       {/* Annotation */}
//       <mesh position={[0, 0, 0]}>
//         <sphereGeometry args={[0.1, 32, 32]} />
//         <meshBasicMaterial color="red" />
//         <Html position={[0.2, 0.2, 0]} distanceFactor={5}>
//           <div style={{ color: 'black', backgroundColor: 'white', padding: '2px', borderRadius: '2px' }}>
//             Room 101
//           </div>
//         </Html>
//       </mesh>
//     </primitive>
//   );
// }

// function App() {
//   const [rotationInfo, setRotationInfo] = useState({ x: 0, y: 0, z: 0, xDeg: 0, yDeg: 0, zDeg: 0 });

//   return (
//     <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
//       <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
//         <ambientLight />
//         <pointLight position={[10, 10, 10]} />
//         <RotatingOBJ 
//           objPath="/Floorplan_2_withouttext/testing.obj" 
//           mtlPath="/Floorplan_2_withouttext/testing.mtl" 
//           setRotationInfo={setRotationInfo} 
//         />
//         <OrbitControls 
//           enableZoom={true}
//           zoomSpeed={1.0}
//           maxDistance={20}
//           minDistance={2}
//         />
//       </Canvas>
//       <div id="info" style={{ 
//         position: 'absolute', 
//         bottom: 0, 
//         left: 0, 
//         color: 'black', 
//         padding: '20px', 
//         backgroundColor: 'rgba(0, 0, 0, 0)', 
//         zIndex: 1,
//         fontSize: '24px',
//         textAlign: 'center',
//         width: '100vw'
//         }}>
//         Position - X: {rotationInfo.x.toFixed(2)}, Y: {rotationInfo.y.toFixed(2)}, Z: {rotationInfo.z.toFixed(2)}<br />
//         Rotation - X: {rotationInfo.xDeg.toFixed(2)}°, Y: {rotationInfo.yDeg.toFixed(2)}°, Z: {rotationInfo.zDeg.toFixed(2)}°
//       </div>
//     </div>
//   );
// }

// export default App;
