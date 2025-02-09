/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/src/components/ui/card';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "John Smith",
    role: "CEO at TechCorp",
    content: "Working with this team has transformed our business. Their expertise in software development is unmatched.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
  },
  {
    name: "Lisa Chen",
    role: "CTO at InnovateLabs",
    content: "The attention to detail and technical excellence delivered by the team exceeded our expectations.",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop"
  },
  {
    name: "Mark Johnson",
    role: "Founder at StartupX",
    content: "Their innovative approach to problem-solving helped us achieve our goals faster than expected.",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop"
  }
];

const clients = [
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=150&h=80&fit=crop",
  "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=150&h=80&fit=crop",
  "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=150&h=80&fit=crop",
  "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=150&h=80&fit=crop",
  "https://images.unsplash.com/photo-1611162617263-4ec3060a058e?w=150&h=80&fit=crop",
  "https://images.unsplash.com/photo-1611162616677-5d51b5f9f861?w=150&h=80&fit=crop"
];

export default function Clients() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".testimonial-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonials-container",
          start: "top center+=100",
          toggleActions: "play none none reverse"
        }
      });

      gsap.from(".client-logo", {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".clients-container",
          start: "top center+=100",
          toggleActions: "play none none reverse"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section  id="clients" ref={sectionRef} className="py-32">
      <div className="container mx-auto px-4">
        <div className="testimonials-container mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-xl text-muted-foreground">What our clients say about us</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="testimonial-card p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="clients-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted By</h2>
            <p className="text-xl text-muted-foreground">Companies that trust our expertise</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {clients.map((logo, index) => (
              <div key={index} className="client-logo flex items-center justify-center">
                <img
                  src={logo}
                  alt={`Client ${index + 1}`}
                  className="max-w-[120px] h-auto opacity-50 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}