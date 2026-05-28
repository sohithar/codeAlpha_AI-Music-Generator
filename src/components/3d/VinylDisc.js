import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

const VinylDisc = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.Fog(0x0a0a0a, 1000, 1200);

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x0a0a0a, 0);
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xa855f7, 1.5, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xec4899, 1, 100);
    pointLight2.position.set(-5, 0, 5);
    scene.add(pointLight2);

    // Create vinyl disc
    const discGeometry = new THREE.CylinderGeometry(2, 2, 0.1, 64);
    const discMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x330033,
    });
    const disc = new THREE.Mesh(discGeometry, discMaterial);
    scene.add(disc);

    // Create vinyl grooves
    const grooveGeometry = new THREE.TorusGeometry(1.8, 0.05, 16, 8);
    const grooveMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      metalness: 0.8,
      roughness: 0.2,
    });

    for (let i = 0; i < 5; i++) {
      const groove = new THREE.Mesh(grooveGeometry, grooveMaterial);
      groove.position.z = 0.05;
      groove.scale.set(1 - i * 0.15, 1 - i * 0.15, 1);
      scene.add(groove);
    }

    // Center label
    const labelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.15, 32);
    const labelMaterial = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      metalness: 0.5,
      roughness: 0.3,
      emissive: 0xec4899,
      emissiveIntensity: 0.5,
    });
    const label = new THREE.Mesh(labelGeometry, labelMaterial);
    label.position.z = 0.1;
    scene.add(label);

    // Floating music notes
    const notes = [];
    for (let i = 0; i < 8; i++) {
      const noteGeometry = new THREE.OctahedronGeometry(0.15, 2);
      const noteMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(i / 8, 1, 0.5),
        metalness: 0.8,
        roughness: 0.1,
        emissive: new THREE.Color().setHSL(i / 8, 1, 0.5),
        emissiveIntensity: 0.8,
      });
      const note = new THREE.Mesh(noteGeometry, noteMaterial);
      
      const angle = (i / 8) * Math.PI * 2;
      note.position.set(
        Math.cos(angle) * 3.5,
        Math.sin(angle) * 3.5,
        Math.random() * 2 - 1
      );

      scene.add(note);
      notes.push({
        mesh: note,
        angle,
        baseY: Math.sin(angle) * 3.5,
        baseX: Math.cos(angle) * 3.5,
      });
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate vinyl disc
      disc.rotation.z += 0.002;

      // Rotate label
      label.rotation.z = disc.rotation.z;

      // Animate music notes
      notes.forEach((note, index) => {
        note.mesh.rotation.x += 0.02;
        note.mesh.rotation.y += 0.03;
        
        note.mesh.position.y = note.baseY + Math.sin(Date.now() * 0.001 + index) * 0.5;
        note.mesh.position.z = Math.sin(Date.now() * 0.0005 + index * 0.5) * 1.5;

        // Pulsing effect
        const pulse = 0.15 + Math.sin(Date.now() * 0.003 + index) * 0.05;
        note.mesh.scale.set(pulse, pulse, pulse);
      });

      // Animate lights
      pointLight1.position.x = Math.sin(Date.now() * 0.0005) * 7;
      pointLight1.position.y = Math.cos(Date.now() * 0.0004) * 7;

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeChild(renderer.domElement);
      discGeometry.dispose();
      discMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default VinylDisc;
