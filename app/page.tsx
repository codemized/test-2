'use client';

import { useState, useEffect } from 'react';

export default function BouncingBallPage() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [velocity, setVelocity] = useState({ x: 5, y: 5 });

  useEffect(() => {
    const animate = () => {
      setPosition(prev => ({
        x: prev.x + velocity.x,
        y: prev.y + velocity.y
      }));

      // Bounce off walls
      if (position.x <= 0 || position.x >= window.innerWidth - 50) {
        setVelocity(prev => ({ ...prev, x: -prev.x }));
      }

      if (position.y <= 0 || position.y >= window.innerHeight - 50) {
        setVelocity(prev => ({ ...prev, y: -prev.y }));
      }

      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [position, velocity]);

  return (
    <div className="relative w-screen h-screen bg-gray-100 overflow-hidden">
      <div
        className="absolute w-12 h-12 bg-blue-500 rounded-full transition-all duration-100 ease-linear"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`
        }}
      />
    </div>
  );
}