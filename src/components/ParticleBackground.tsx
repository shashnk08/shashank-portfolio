import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ParticleBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<{ x: number; y: number; px: number; py: number }>({ x: 0, y: 0, px: 0, py: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030014, 0.005);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 100;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 4. Create Particles (15,000 points)
    const particleCount = 15000;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const originalColors = new Float32Array(particleCount * 3);

    const baseColor = new THREE.Color(0x001f3f);
    const targetColor = new THREE.Color(0xCCFF00); // Acid Lime Green

    for (let i = 0; i < particleCount; i++) {
      // Random coordinates in a 3D box
      const x = (Math.random() - 0.5) * 300;
      const y = (Math.random() - 0.5) * 300;
      const z = (Math.random() - 0.5) * 200;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      // Small noise drift velocities
      velocities[i * 3] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.05;
      velocities[i * 3 + 2] = Math.random() * 0.1; // slowly moving forward

      colors[i * 3] = baseColor.r;
      colors[i * 3 + 1] = baseColor.g;
      colors[i * 3 + 2] = baseColor.b;

      originalColors[i * 3] = baseColor.r;
      originalColors[i * 3 + 1] = baseColor.g;
      originalColors[i * 3 + 2] = baseColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.7,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particlePoints = new THREE.Points(particleGeo, particleMat);
    scene.add(particlePoints);

    // 5. Create Energy Lines (530 lines moving forward)
    const lineCount = 530;
    const linesData: {
      line: THREE.LineSegments;
      speed: number;
      length: number;
      x: number;
      y: number;
      z: number;
    }[] = [];

    const lineMat = new THREE.LineBasicMaterial({
      color: 0x88aaff,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    });

    for (let i = 0; i < lineCount; i++) {
      const length = Math.random() * 15 + 5;
      const x = (Math.random() - 0.5) * 200;
      const y = (Math.random() - 0.5) * 200;
      const z = Math.random() * -200;

      const lineGeo = new THREE.BufferGeometry();
      const linePositions = new Float32Array([
        0, 0, 0,
        0, 0, length
      ]);
      lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

      const lineSegments = new THREE.LineSegments(lineGeo, lineMat);
      lineSegments.position.set(x, y, z);
      scene.add(lineSegments);

      linesData.push({
        line: lineSegments,
        speed: Math.random() * 0.8 + 0.3,
        length,
        x,
        y,
        z,
      });
    }

    // 6. Interaction Calculations
    const handleMouseMove = (event: MouseEvent) => {
      // Store normalized mouse coords
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Raycaster to find 3D mouse vector
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    // 7. Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      // Update mouse vector
      mouseVector.set(mouseRef.current.x, mouseRef.current.y);
      raycaster.setFromCamera(mouseVector, camera);

      // We intersect a virtual plane at z = 50 (or where particles are dense)
      const targetPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -50);
      const intersectionPoint = new THREE.Vector3();
      raycaster.ray.intersectPlane(targetPlane, intersectionPoint);

      // Particle physics
      const posAttr = particleGeo.getAttribute('position') as THREE.BufferAttribute;
      const colorAttr = particleGeo.getAttribute('color') as THREE.BufferAttribute;

      const posArr = posAttr.array as Float32Array;
      const colArr = colorAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        let px = posArr[idx];
        let py = posArr[idx + 1];
        let pz = posArr[idx + 2];

        // Drift/move forward
        pz += velocities[idx + 2];
        if (pz > 100) {
          pz = -100;
        }

        // Target position (spring back)
        const ox = originalPositions[idx];
        const oy = originalPositions[idx + 1];
        
        // Attraction/repulsion from mouse intersection
        const dx = px - intersectionPoint.x;
        const dy = py - intersectionPoint.y;
        const dz = pz - intersectionPoint.z;
        const distSq = dx * dx + dy * dy + dz * dz;
        const dist = Math.sqrt(distSq);

        if (dist < 20) {
          // Repulse
          const force = (20 - dist) * 0.04;
          const rx = (dx / dist) * force;
          const ry = (dy / dist) * force;
          
          px += rx;
          py += ry;

          // Color interpolation towards acid green
          const ratio = (20 - dist) / 20 * 0.4;
          colArr[idx] = THREE.MathUtils.lerp(originalColors[idx], targetColor.r, ratio);
          colArr[idx + 1] = THREE.MathUtils.lerp(originalColors[idx + 1], targetColor.g, ratio);
          colArr[idx + 2] = THREE.MathUtils.lerp(originalColors[idx + 2], targetColor.b, ratio);
        } else {
          // Spring return
          px += (ox - px) * 0.08;
          py += (oy - py) * 0.08;

          // Return color to base
          colArr[idx] += (originalColors[idx] - colArr[idx]) * 0.1;
          colArr[idx + 1] += (originalColors[idx + 1] - colArr[idx + 1]) * 0.1;
          colArr[idx + 2] += (originalColors[idx + 2] - colArr[idx + 2]) * 0.1;
        }

        posArr[idx] = px;
        posArr[idx + 1] = py;
        posArr[idx + 2] = pz;
      }

      posAttr.needsUpdate = true;
      colorAttr.needsUpdate = true;

      // Update Lines
      for (let i = 0; i < lineCount; i++) {
        const data = linesData[i];
        data.z += data.speed;
        if (data.z > 100) {
          data.z = -200;
          data.x = (Math.random() - 0.5) * 200;
          data.y = (Math.random() - 0.5) * 200;
        }
        data.line.position.set(data.x, data.y, data.z);
      }

      // Slowly rotate scene for subtle environment movement
      scene.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Window Resize Handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 9. Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      // Clean up geometries and materials
      particleGeo.dispose();
      particleMat.dispose();
      lineMat.dispose();
      linesData.forEach(data => {
        data.line.geometry.dispose();
      });

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none" />;
};
