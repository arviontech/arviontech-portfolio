"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/src/components/ui/card';
import { Code2, Cpu, Globe2, Lock, Palette, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <Code2 className="h-12 w-12" />,
    title: "Custom Development",
    description: "Tailored software solutions built with cutting-edge technologies"
  },
  {
    icon: <Globe2 className="h-12 w-12" />,
    title: "Web Applications",
    description: "Responsive and scalable web applications for modern businesses"
  },
  {
    icon: <Cpu className="h-12 w-12" />,
    title: "AI Solutions",
    description: "Intelligent systems powered by machine learning and AI"
  },
  {
    icon: <Lock className="h-12 w-12" />,
    title: "Cyber Security",
    description: "Advanced security measures to protect your digital assets"
  },
  {
    icon: <Zap className="h-12 w-12" />,
    title: "Cloud Services",
    description: "Scalable cloud solutions for optimal performance"
  },
  {
    icon: <Palette className="h-12 w-12" />,
    title: "UI/UX Design",
    description: "Beautiful and intuitive interfaces that users love"
  }
];

export default function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Services</h2>
          <p className="text-xl text-muted-foreground">Comprehensive solutions for your digital needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="feature-card p-6 hover:shadow-lg transition-shadow">
              <div className="text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}