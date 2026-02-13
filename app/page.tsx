'use client';

import { useState, useEffect, useRef } from 'react';

export default function BouncingBallPage() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 1.5, y: 1.5 });
  const velocityRef = useRef({ x: 1.5, y: 1.5 });

  useEffect(() => {
    // Inicializar posición en el centro
    const centerX = window.innerWidth / 2 - 25;
    const centerY = window.innerHeight / 2 - 25;
    setPosition({ x: centerX, y: centerY });

    let animationFrame: number;

    const animate = () => {
      setPosition(prev => {
        const newX = prev.x + velocityRef.current.x;
        const newY = prev.y + velocityRef.current.y;

        // Bounce off walls (con un área de rebote en el centro)
        if (newX <= 100 || newX >= window.innerWidth - 150) {
          velocityRef.current.x = -velocityRef.current.x;
        }

        if (newY <= 100 || newY >= window.innerHeight - 150) {
          velocityRef.current.y = -velocityRef.current.y;
        }

        return {
          x: newX,
          y: newY
        };
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="relative w-screen h-screen bg-gradient-to-br from-gray-50 to-gray-200 overflow-hidden">
      <div
        className="absolute w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-lg"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: 'all 0.05s linear'
        }}
      />
    </div>
  );
}