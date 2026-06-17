import React, { useEffect, useRef } from 'react';

export default function BackgroundHearts() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let hearts = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Heart {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * canvas.width;
        this.y = init ? Math.random() * canvas.height : canvas.height + 20;
        this.size = Math.random() * 15 + 8;
        this.speedY = Math.random() * 0.8 + 0.3;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.4 + 0.15;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = '#ff7597';

        // Draw custom heart shape path
        ctx.beginPath();
        const d = this.size;
        ctx.moveTo(0, -d / 2);
        // Left curve
        ctx.bezierCurveTo(-d / 2, -d, -d, -d / 3, 0, d);
        // Right curve
        ctx.bezierCurveTo(d, -d / 3, d / 2, -d, 0, -d / 2);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y < -30 || this.x < -30 || this.x > canvas.width + 30) {
          this.reset(false);
        }
      }
    }

    // Initialize 20 floating hearts
    for (let i = 0; i < 20; i++) {
      hearts.push(new Heart());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hearts.forEach((heart) => {
        heart.update();
        heart.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="canvas-container">
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}
