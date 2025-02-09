/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/src/components/ui/card';
import { Github, Linkedin, Twitter } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SocialLinks {
  twitter: string;
  linkedin: string;
  github: string;
}

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  social: SocialLinks;
}

const teamMembers: TeamMember[] = [
  {
    name: "Md Emamul Mursalin",
    role: "Managing Director & Co-Founder",
    image: "https://i.ibb.co.com/Csb0ZK48/Blue-Simple-Business-Professional-Linked-In-Profile-Picture-2.png",
    bio: "Visionary leader with years of experience in software development",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    }
  },
  {
    name: "Md Hasan Ali Khan",
    role: "CEO & Founder",
    image: "https://i.ibb.co.com/NgrYDZt6/Blue-Simple-Business-Professional-Linked-In-Profile-Picture-1.png",
    bio: "Tech innovator specializing in Web Development and cloud architecture",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    }
  },
  {
    name: "Arfaz Ahamed",
    role: "Lead Developer & Co-Founder",
    image: "https://i.ibb.co.com/0R9fFgHB/Blue-Simple-Business-Professional-Linked-In-Profile-Picture.png",
    bio: "Full Stack Developer with a passion for accessibility",
    social: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    }
  }
];

class Particle {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private x: number;
  private y: number;
  private vx: number;
  private vy: number;
  private radius: number;
  private connectionDistance: number;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    // Increased particle size
    this.radius = Math.random() * 4 + 2; // Now between 2-6 pixels
    this.connectionDistance = 200; // Increased connection distance for larger particles
  }

  update(): void {
    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
  }

  draw(): void {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    // Added gradient for more depth
    const gradient = this.ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.radius
    );
    gradient.addColorStop(0, 'rgba(100, 149, 237, 0.8)');
    gradient.addColorStop(1, 'rgba(100, 149, 237, 0.3)');
    this.ctx.fillStyle = gradient;
    this.ctx.fill();
  }

  getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }

  getConnectionDistance(): number {
    return this.connectionDistance;
  }
}

export default function Team() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current || !sectionRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles: Particle[] = [];
    const particleCount = 40; // Reduced count for larger particles

    const resizeCanvas = () => {
      if (!canvas || !sectionRef.current) return;
      canvas.width = sectionRef.current.offsetWidth;
      canvas.height = sectionRef.current.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas, ctx));
    }
    particlesRef.current = particles;

    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();

        // Draw connections
        particles.forEach(otherParticle => {
          const pos1 = particle.getPosition();
          const pos2 = otherParticle.getPosition();
          const dx = pos1.x - pos2.x;
          const dy = pos1.y - pos2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < particle.getConnectionDistance()) {
            ctx.beginPath();
            ctx.moveTo(pos1.x, pos1.y);
            ctx.lineTo(pos2.x, pos2.y);
            const opacity = 1 - (distance / particle.getConnectionDistance());
            ctx.strokeStyle = `rgba(100, 149, 237, ${opacity * 0.3})`; // Increased connection opacity
            ctx.lineWidth = opacity * 2; // Added variable line width
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // GSAP animations for team cards
    const ctx2 = gsap.context(() => {
      gsap.from(".team-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        }
      });
    }, sectionRef);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      ctx2.revert();
    };
  }, []);

  return (
    <section id="team" ref={sectionRef} className="py-32 bg-secondary/20 relative">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Team</h2>
          <p className="text-xl text-muted-foreground">Meet the experts behind our success</p>
        </div>

        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-16">
          {teamMembers.map((member, index) => (
            <Card key={index} className="team-card overflow-hidden group">
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full aspect-square object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a href={member.social.twitter} className="text-white hover:text-primary transition-colors">
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a href={member.social.linkedin} className="text-white hover:text-primary transition-colors">
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a href={member.social.github} className="text-white hover:text-primary transition-colors">
                    <Github className="h-6 w-6" />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-sm text-primary mb-3">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}