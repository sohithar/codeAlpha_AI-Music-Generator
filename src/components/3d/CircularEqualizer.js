import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CircularEqualizer = () => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const barsRef = useRef([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x0a0a0a, 0);
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xa855f7, 2, 100);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // Create circular equalizer bars
    const barCount = 32;
    const radius = 2;
    const barGeometry = new THREE.BoxGeometry(0.15, 1, 0.15);

    for (let i = 0; i < barCount; i++) {
      const angle = (i / barCount) * Math.PI * 2;
      const hue = i / barCount;

      const barMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color().setHSL(hue, 1, 0.5),
        metalness: 0.8,
        roughness: 0.1,
        emissive: new THREE.Color().setHSL(hue, 1, 0.5),
        emissiveIntensity: 0.6,
      });

      const bar = new THREE.Mesh(barGeometry, barMaterial);

      // Position bar in circle
      bar.position.x = Math.cos(angle) * radius;
      bar.position.y = Math.sin(angle) * radius;
      bar.position.z = 0;

      // Rotate bar to face center
      bar.rotation.z = angle + Math.PI / 2;

      scene.add(bar);

      barsRef.current.push({
        mesh: bar,
        angle,
        hue,
        height: 1,
      });
    }

    // Create center glowing sphere
    const sphereGeometry = new THREE.IcosahedronGeometry(0.3, 4);
    const sphereMaterial = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      metalness: 0.8,
      roughness: 0.1,
      emissive: 0xec4899,
      emissiveIntensity: 1,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Create particles around center
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 3 + 0.5;
      positions[i] = Math.cos(angle) * distance;
      positions[i + 1] = Math.sin(angle) * distance;
      positions[i + 2] = (Math.random() - 0.5) * 2;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x0ea5e9,
      size: 0.05,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particlesMaterial);
    scene.add(particles);

    // Animation variables
    let audioData = new Array(barCount).fill(0.5);

    // Simulate audio data
    const updateAudioData = () => {
      for (let i = 0; i < barCount; i++) {
        const target = Math.random() * 0.8 + 0.2;
        audioData[i] += (target - audioData[i]) * 0.1;
      }
    };

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      updateAudioData();

      // Update bars
      barsRef.current.forEach((bar, index) => {
        const height = 0.5 + audioData[index] * 2;
        bar.mesh.scale.y = height;
        
        // Animate bar with pulse
        bar.mesh.rotation.z = bar.angle + Math.PI / 2 + Math.sin(Date.now() * 0.001 + index * 0.2) * 0.1;

        // Update glow intensity based on height
        bar.mesh.material.emissiveIntensity = 0.3 + height * 0.5;
      });

      // Rotate center sphere
      sphere.rotation.x += 0.003;
      sphere.rotation.y += 0.004;

      // Pulse sphere
      const pulse = 0.3 + Math.sin(Date.now() * 0.005) * 0.1;
      sphere.scale.set(pulse, pulse, pulse);

      // Rotate particles
      particles.rotation.z += 0.0005;

      // Rotate point light
      pointLight.position.x = Math.sin(Date.now() * 0.0008) * 4;
      pointLight.position.y = Math.cos(Date.now() * 0.0006) * 4;

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
      barGeometry.dispose();
      sphereGeometry.dispose();
      particleGeometry.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default CircularEqualizer;
