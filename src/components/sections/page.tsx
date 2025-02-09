"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/src/components/ui/button';
import { ArrowRight, Code2, Rocket } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
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
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/10 bg-grid-pattern [mask-image:radial-gradient(white,transparent_85%)]" />
      
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 ref={titleRef} className="text-6xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
            Transforming Ideas Into Digital Reality
          </h1>
          
          <p ref={subtitleRef} className="text-xl md:text-2xl text-muted-foreground mb-12">
            We craft innovative software solutions that empower businesses to thrive in the digital age
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

      <Rocket className="absolute bottom-10 right-10 h-32 w-32 text-primary/10 animate-pulse" />
    </section>
  );
}