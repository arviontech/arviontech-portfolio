"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Code2,
  Rocket,
  Database,
  Cloud,
  Terminal,
  Server,
  Cpu,
  Globe,
  Layers,
} from "lucide-react";

import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  const titleRef = useRef(null);

  const subtitleRef = useRef(null);

  const [gridDimensions, setGridDimensions] = useState({ rows: 0, cols: 0 });

  useEffect(() => {
    const updateGridDimensions = () => {
      if (heroRef.current) {
        const width = heroRef.current.offsetWidth;

        const height = heroRef.current.offsetHeight;

        const cellSize = 40;

        const cols = Math.ceil(width / cellSize);

        const rows = Math.ceil(height / cellSize);

        setGridDimensions({ rows, cols });
      }
    };

    updateGridDimensions();

    window.addEventListener("resize", updateGridDimensions);

    const ctx = gsap.context(() => {
      // Background image zoom animation

      gsap.to(".bg-image", {
        scale: 1.1,

        duration: 20,

        ease: "none",

        repeat: -1,

        yoyo: true,
      });

      gsap.from(titleRef.current, {
        y: 100,

        opacity: 0,

        duration: 1,

        ease: "power4.out",
      });

      gsap.from(subtitleRef.current, {
        y: 50,

        opacity: 0,

        duration: 1,

        delay: 0.5,

        ease: "power4.out",
      });

      gsap.from(".hero-button", {
        y: 50,

        opacity: 0,

        duration: 1,

        delay: 1,

        ease: "power4.out",

        stagger: 0.2,
      });

      gsap.to(".floating-icon", {
        y: -20,

        duration: "random(2, 4)",

        repeat: -1,

        yoyo: true,

        ease: "power1.inOut",

        stagger: {
          amount: 2,

          from: "random",
        },
      });
    }, heroRef);

    return () => {
      ctx.revert();

      window.removeEventListener("resize", updateGridDimensions);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const cells = document.querySelectorAll(".grid-cell");

    const mouseX = e.clientX;

    const mouseY = e.clientY;

    cells.forEach((cell) => {
      const rect = (cell as HTMLElement).getBoundingClientRect();

      const cellCenterX = rect.left + rect.width / 2;

      const cellCenterY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(mouseX - cellCenterX, 2) + Math.pow(mouseY - cellCenterY, 2)
      );

      const maxDistance = 150;

      const opacity = Math.max(0, 1 - distance / maxDistance);

      gsap.to(cell, {
        opacity: 0.2 + opacity * 0.8,

        scale: 1 + opacity * 0.4,

        duration: 0.3,

        ease: "power2.out",
      });
    });
  };

  const handleMouseLeave = () => {
    const cells = document.querySelectorAll(".grid-cell");

    cells.forEach((cell) => {
      gsap.to(cell, {
        opacity: 0.1,

        scale: 1,

        duration: 0.5,

        ease: "power2.out",
      });
    });
  };

  const BackgroundIcons = () => {
    const icons = [
      Database,

      Cloud,

      Terminal,

      Server,

      Cpu,

      Globe,

      Layers,

      Code2,

      Rocket,
    ];

    return (
      <>
        {icons.map((Icon, index) => (
          <Icon
            key={index}
            className="floating-icon absolute text-primary/5 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,

              left: `${Math.random() * 100}%`,

              width: `${Math.random() * 40 + 20}px`,

              height: "auto",
            }}
          />
        ))}
      </>
    );
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image */}

      <div className="absolute inset-0 overflow-hidden">
        <div className="bg-image absolute inset-0 w-full h-full">
          <Image
            src="https://i.ibb.co.com/8LypvHzP/annie-spratt-sggw4-q-DD54-unsplash.jpg"
            alt="Background"
            className=" object-cover opacity-100 w-full"
            width={1920}
            height={480}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary/20" />
      </div>

      {/* Background Grid */}

      <div
        className="absolute inset-0 grid"
        style={{
          gridTemplateColumns: `repeat(${gridDimensions.cols}, minmax(40px, 1fr))`,

          gridTemplateRows: `repeat(${gridDimensions.rows}, minmax(40px, 1fr))`,
        }}
      >
        {Array.from({ length: gridDimensions.rows * gridDimensions.cols }).map(
          (_, i) => (
            <div
              key={i}
              className="grid-cell bg-blue-200/10 border border-primary/10 transition-all duration-300"
            />
          )
        )}
      </div>

      {/* Floating Background Icons */}

      <BackgroundIcons />

      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            ref={titleRef}
            className="text-6xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-300"
          >
            Transforming Ideas Into Digital Reality
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-muted-foreground mb-12"
          >
            We craft innovative software solutions that empower businesses to
            thrive in the digital age
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="hero-button group">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button size="lg" variant="outline" className="hero-button group">
              View Our Work
              <Code2 className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
