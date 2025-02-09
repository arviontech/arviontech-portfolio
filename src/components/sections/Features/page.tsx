"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/src/components/ui/card';
import { 
  ShoppingBag, 
  Layout, 
  BoxesIcon, 
  Building2, 
  GraduationCap,
  Calendar 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: <ShoppingBag className="h-12 w-12" />,
    title: "E-Commerce Solutions",
    description: "Custom online stores with secure payment gateways, inventory tracking, and customer management"
  },
  {
    icon: <Layout className="h-12 w-12" />,
    title: "Portfolio Websites",
    description: "Professional portfolio sites with modern designs to showcase your work and attract clients"
  },
  {
    icon: <BoxesIcon className="h-12 w-12" />,
    title: "Inventory Management",
    description: "Comprehensive systems to track stock, manage orders, and optimize your supply chain"
  },
  {
    icon: <Building2 className="h-12 w-12" />,
    title: "Business Management",
    description: "Complete business automation solutions including CRM, billing, and reporting systems"
  },
  {
    icon: <GraduationCap className="h-12 w-12" />,
    title: "Learning Management",
    description: "Online education platforms with course management, student tracking, and assessment tools"
  },
  {
    icon: <Calendar className="h-12 w-12" />,
    title: "Booking Systems",
    description: "Appointment scheduling and reservation systems for services and consultations"
  }
];

export default function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial entrance animation
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

      // 3D hover animation setup
      const cards = document.querySelectorAll('.feature-card');
      
      cards.forEach(card => {
        const content = card.querySelector('.card-content');
        
        gsap.set(content, {
          transformStyle: "preserve-3d",
          transformPerspective: 1000,
        });

        card.addEventListener('mouseenter', (e) => {
          gsap.to(card, {
            boxShadow: "0 10px 30px -10px rgba(var(--primary), 0.5)",
            duration: 0.3
          });
          
          card.addEventListener('mousemove', handleMouseMove);
        });

        card.addEventListener('mouseleave', () => {
          card.removeEventListener('mousemove', handleMouseMove);
          
          gsap.to(content, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.7)"
          });
          
          gsap.to(card, {
            boxShadow: "none",
            duration: 0.3
          });
        });
      });

      function handleMouseMove(e) {
        const card = e.currentTarget;
        const content = card.querySelector('.card-content');
        const rect = card.getBoundingClientRect();
        
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const rotateX = (mouseY - rect.height / 2) / 10;
        const rotateY = -(mouseX - rect.width / 2) / 10;
        
        gsap.to(content, {
          rotationX: rotateX,
          rotationY: rotateY,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Web Development Services</h2>
          <p className="text-xl text-muted-foreground">Specialized solutions for your online business needs</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="feature-card p-6 transition-shadow duration-300 cursor-pointer overflow-hidden"
            >
              <div className="card-content">
                <div className="text-primary mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}