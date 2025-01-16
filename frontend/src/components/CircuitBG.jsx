"use client";

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Circuit = () => {
    const groupRef = useRef(null);
    const particlesRef = useRef(null);

    useEffect(() => {
        if (!groupRef.current) return;

        const paths = [];
        for (let i = 0; i < 30; i++) {
            const curve = new THREE.CurvePath();
            const startPoint = new THREE.Vector3(
                Math.random() * 20 - 10,
                Math.random() * 20 - 10,
                Math.random() * 20 - 10
            );

            let currentPoint = startPoint.clone();
            const segments = Math.floor(Math.random() * 3) + 3;

            for (let j = 0; j < segments; j++) {
                const controlPoint1 = currentPoint.clone().add(
                    new THREE.Vector3(
                        Math.random() * 4 - 2,
                        Math.random() * 4 - 2,
                        Math.random() * 4 - 2
                    )
                );

                const controlPoint2 = currentPoint.clone().add(
                    new THREE.Vector3(
                        Math.random() * 4 - 2,
                        Math.random() * 4 - 2,
                        Math.random() * 4 - 2
                    )
                );

                const endPoint = currentPoint.clone().add(
                    new THREE.Vector3(
                        Math.random() * 4 - 2,
                        Math.random() * 4 - 2,
                        Math.random() * 4 - 2
                    )
                );

                const curve = new THREE.CubicBezierCurve3(
                    currentPoint,
                    controlPoint1,
                    controlPoint2,
                    endPoint
                );

                paths.push(curve);
                currentPoint = endPoint;
            }
        }

        paths.forEach((path, index) => {
            const points = path.getPoints(50);
            const geometry = new THREE.BufferGeometry().setFromPoints(points);

            const material = new THREE.LineBasicMaterial({
                color: new THREE.Color().setHSL(Math.random() * 0.1 + 0.5, 0.8, 0.6),
                transparent: true,
                opacity: Math.random() * 0.3 + 0.2,
            });

            const line = new THREE.Line(geometry, material);
            groupRef.current?.add(line);
        });

        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 2000;
        const positions = new Float32Array(particlesCount * 3);
        const sizes = new Float32Array(particlesCount);

        for (let i = 0; i < particlesCount * 3; i += 3) {
            positions[i] = Math.random() * 30 - 15;
            positions[i + 1] = Math.random() * 30 - 15;
            positions[i + 2] = Math.random() * 30 - 15;
            sizes[i / 3] = Math.random() * 0.1 + 0.05;
        }

        particlesGeometry.setAttribute(
            'position',
            new THREE.BufferAttribute(positions, 3)
        );
        particlesGeometry.setAttribute(
            'size',
            new THREE.BufferAttribute(sizes, 1)
        );

        const particlesMaterial = new THREE.PointsMaterial({
            color: 0x00ffff,
            size: 0.1,
            transparent: true,
            opacity: 0.6,
            sizeAttenuation: true,
        });

        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        particlesRef.current = particles;
        groupRef.current.add(particles);
    }, []);

    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.1;
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
        }

        if (particlesRef.current) {
            const positions = particlesRef.current.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                const time = clock.getElapsedTime();
                positions[i + 1] += Math.sin(time + i) * 0.002;
                positions[i] += Math.cos(time + i) * 0.002;
            }
            particlesRef.current.geometry.attributes.position.needsUpdate = true;
        }
    });

    return <group ref={groupRef} />;
};

const CircuitBackground = () => {
    return (
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[var(--gradient-start)] to-[var(--gradient-end)]">
            <Canvas
                camera={{ position: [0, 0, 20], fov: 75 }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Circuit />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate
                    autoRotateSpeed={0.5}
                    maxPolarAngle={Math.PI / 1.5}
                    minPolarAngle={Math.PI / 2.5}
                />
            </Canvas>
        </div>
    );
};

export default CircuitBackground;
