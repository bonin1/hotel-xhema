"use client";

import { useEffect, useRef } from 'react';

interface SectionDividerProps {
  color?: string;
  height?: number;
}

export default function SectionDivider({ 
  color = '#A57B0A',
  height = 2
}: SectionDividerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      const width = canvas.width;
      const canvasHeight = canvas.height;

      ctx.clearRect(0, 0, width, canvasHeight);
      ctx.strokeStyle = color;
      ctx.lineWidth = height;

      // Draw curved line
      ctx.beginPath();
      const amplitude = 20;
      const frequency = 0.01;
      const centerY = canvasHeight / 2;

      for (let x = 0; x <= width; x++) {
        const y = centerY + amplitude * Math.sin(frequency * x);
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    };

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 60;
      draw();
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [color, height]);

  return (
    <div className="w-full my-0">
      <canvas
        ref={canvasRef}
        className="w-full h-[60px]"
        style={{ display: 'block' }}
      />
    </div>
  );
}
