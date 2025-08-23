import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  life: number;
  maxLife: number;
}

const GradientDust: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle colors - gradient dust effect
    const colors = [
      'rgba(59, 130, 246, 0.6)',   // Blue
      'rgba(147, 51, 234, 0.6)',   // Purple
      'rgba(236, 72, 153, 0.6)',   // Pink
      'rgba(34, 197, 94, 0.6)',    // Green
      'rgba(251, 191, 36, 0.6)',   // Yellow
      'rgba(239, 68, 68, 0.6)',    // Red
    ];

    const createParticle = (): Particle => {
      const maxLife = Math.random() * 300 + 200;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: maxLife
      };
    };

    // Initialize particles
    const particleCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 8000));
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle());
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        // Fade in and out based on life cycle
        const lifeCycle = particle.life / particle.maxLife;
        let alpha = particle.opacity;
        
        if (lifeCycle < 0.1) {
          alpha *= lifeCycle / 0.1; // Fade in
        } else if (lifeCycle > 0.9) {
          alpha *= (1 - lifeCycle) / 0.1; // Fade out
        }

        // Wrap around screen edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Create gradient effect
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 3
        );
        
        const baseColor = particle.color.replace('0.6', alpha.toString());
        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(0.5, baseColor.replace(alpha.toString(), (alpha * 0.3).toString()));
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        // Draw particle
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Reset particle when it dies
        if (particle.life >= particle.maxLife) {
          particlesRef.current[index] = createParticle();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default GradientDust;