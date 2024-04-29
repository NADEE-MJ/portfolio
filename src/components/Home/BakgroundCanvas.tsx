import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  originalRadius: number;
}

const BackgroundCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = {
    x: undefined as undefined | number,
    y: undefined as undefined | number
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas!.getContext('2d')!;
    canvas!.width = window.innerWidth;
    canvas!.height = window.innerHeight;

    const stars: Star[] = Array.from({ length: 150 }, () => ({
      x: Math.random() * canvas!.width,
      y: Math.random() * canvas!.height,
      radius: Math.random() * 2 + 1,
      originalRadius: Math.random() * 2 + 1
    }));

    const maxRadius = 5;

    const drawStar = (star: Star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      stars.forEach(star => {
        drawStar(star);
        // Grow nearby stars
        if (mouse.x && mouse.y && Math.abs(mouse.x - star.x) < 50 && Math.abs(mouse.y - star.y) < 50) {
          if (star.radius < maxRadius) {
            star.radius += 0.2;
          }
        } else {
          if (star.radius > star.originalRadius) {
            star.radius -= 0.1;
          }
        }
      });
      requestAnimationFrame(update);
    };

    canvas!.addEventListener('mousemove', (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });

    canvas!.addEventListener('mouseout', () => {
      mouse.x = undefined;
      mouse.y = undefined;
    });

    update();

    return () => {
      canvas!.removeEventListener('mousemove', update);
      canvas!.removeEventListener('mouseout', update);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />;
};

export default BackgroundCanvas;
