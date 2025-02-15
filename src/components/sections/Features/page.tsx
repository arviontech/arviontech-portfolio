"use client";

import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { 
  ShoppingBag, 
  Layout, 
  BoxesIcon, 
  Building2, 
  GraduationCap,
  Calendar 
} from 'lucide-react';
import { FeatureCard } from './FeatureCard';
import { Feature } from './types';

// Correct Spline import
const Spline = dynamic(() => import('@splinetool/react-spline').then(mod => mod.default), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/10" />
});

const features: Feature[] = [
  {
    icon: <ShoppingBag className="h-12 w-12" />,
    title: "E-Commerce Solutions",
    description: "Custom online stores with secure payment gateways, inventory tracking, and customer management",
    splineScene: "https://prod.spline.design/6Wq9JwsXfBU5wsdN/scene.splinecode"
  },
  {
    icon: <Layout className="h-12 w-12" />,
    title: "Portfolio Websites",
    description: "Professional portfolio sites with modern designs to showcase your work and attract clients",
    splineScene: "https://prod.spline.design/dK8iPlmnBv7wsXcM/scene.splinecode"
  },
  {
    icon: <BoxesIcon className="h-12 w-12" />,
    title: "Inventory Management",
    description: "Comprehensive systems to track stock, manage orders, and optimize your supply chain",
    splineScene: "https://prod.spline.design/inventoryScene/scene.splinecode"
  },
  {
    icon: <Building2 className="h-12 w-12" />,
    title: "Business Management",
    description: "Complete business automation solutions including CRM, billing, and reporting systems",
    splineScene: "https://prod.spline.design/businessScene/scene.splinecode"
  },
  {
    icon: <GraduationCap className="h-12 w-12" />,
    title: "Learning Management",
    description: "Online education platforms with course management, student tracking, and assessment tools",
    splineScene: "https://prod.spline.design/educationScene/scene.splinecode"
  },
  {
    icon: <Calendar className="h-12 w-12" />,
    title: "Booking Systems",
    description: "Appointment scheduling and reservation systems for services and consultations",
    splineScene: "https://prod.spline.design/bookingScene/scene.splinecode"
  }
];

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const initializeGSAP = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(".feature-card", {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center+=100",
          end: "bottom center",
          toggleActions: "play none none reverse"
        }
      });
    };

    initializeGSAP();
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="relative py-32 overflow-hidden"
    >
      {/* Background Spline Scene */}
      <div className="absolute inset-0 w-full h-full opacity-30">
        <Spline 
          scene="https://prod.spline.design/mainBackgroundScene/scene.splinecode"
          className="w-full h-full"
        />
      </div>
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Web Development Services
          </h2>
          <p className="text-xl text-muted-foreground">
            Specialized solutions for your online business needs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index} 
              feature={feature} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}