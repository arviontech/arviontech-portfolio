"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card } from '@/components/ui/card';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

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
  
];

const clients = [
  "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=150&h=80&fit=crop",
  "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=150&h=80&fit=crop",
  "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=150&h=80&fit=crop",
  "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=150&h=80&fit=crop",
  "https://images.unsplash.com/photo-1611162617263-4ec3060a058e?w=150&h=80&fit=crop",
  "https://images.unsplash.com/photo-1611162617263-4ec3060a058e?w=150&h=80&fit=crop",
   
];

export default function Clients() {
  const sectionRef = useRef(null);
  const carouselRef = useRef(null);
  const clientsTrackRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const nextIndex = (currentSlide + 1) % testimonials.length;
    animateSlide(nextIndex, 'next');
  };

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    const prevIndex = currentSlide === 0 ? testimonials.length - 1 : currentSlide - 1;
    animateSlide(prevIndex, 'prev');
  };
   //@ts-ignore
  const animateSlide = (newIndex, direction) => {
       //@ts-ignore
    const cards = carouselRef.current.querySelectorAll('.testimonial-card');
    const currentCard = cards[currentSlide];
    const nextCard = cards[newIndex];
    const xOffset = direction === 'next' ? 100 : -100;

    gsap.to(currentCard, {
      xPercent: -xOffset,
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut"
    });

    gsap.fromTo(nextCard,
      {
        xPercent: xOffset,
        opacity: 0
      },
      {
        xPercent: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          setIsAnimating(false);
          setCurrentSlide(newIndex);
        }
      }
    );
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animations
      gsap.from(".testimonial-card", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".testimonials-container",
          start: "top center+=100",
          toggleActions: "play none none reverse"
        }
      });

      // Set up the infinite slider for client logos
      const clientsTrack = clientsTrackRef.current;
      //@ts-ignore
      const totalWidth = clientsTrack.offsetWidth;
      
      // Clone the clients for seamless loop
      const slideAnimation = gsap.to(clientsTrack, {
        x: -totalWidth / 2,
        duration: 20,
        ease: "none",
        repeat: -1,
        paused: true
      });

      // Pause on hover
      //@ts-ignore
      clientsTrack.addEventListener('mouseenter', () => slideAnimation.pause());
         //@ts-ignore
      clientsTrack.addEventListener('mouseleave', () => slideAnimation.play());

      // Start the animation
      slideAnimation.play();

      // Auto-advance testimonial carousel
      const autoAdvance = setInterval(nextSlide, 5000);
      return () => {
        clearInterval(autoAdvance);
        slideAnimation.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [currentSlide]);

  return (
    <section id="clients" ref={sectionRef} className="py-32">
      <div className="container mx-auto px-4">
        <div className="testimonials-container mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Client Testimonials</h2>
            <p className="text-xl text-muted-foreground">What our clients say about us</p>
          </div>

          <div className="relative" ref={carouselRef}>
            <div className="overflow-hidden relative">
              <div className="flex">
                {testimonials.map((testimonial, index) => (
                  <Card 
                    key={index} 
                    className={`testimonial-card p-6 w-4xl mx-auto flex-shrink-0 ${
                      index === currentSlide ? 'block' : 'hidden'
                    }`}
                  >
                    <div className="flex items-center mb-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                        width={32}
                        height={32}
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

            <Button
              variant="ghost"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12"
              onClick={prevSlide}
              disabled={isAnimating}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12"
              onClick={nextSlide}
              disabled={isAnimating}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            <div className="flex justify-center mt-6 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide ? 'w-6 bg-primary' : 'w-2 bg-primary/30'
                  }`}
                  onClick={() => {
                    if (!isAnimating && index !== currentSlide) {
                      animateSlide(index, index > currentSlide ? 'next' : 'prev');
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="clients-container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted By</h2>
            <p className="text-xl text-muted-foreground">Companies that trust our expertise</p>
          </div>

          <div className="overflow-hidden">
            <div 
              ref={clientsTrackRef}
              className="flex gap-8 items-center"
            >
              {/* Original logos */}
              {clients.map((logo, index) => (
                <div key={index} className="client-logo flex-shrink-0">
                  <Image
                    src={logo}
                    alt={`Client ${index + 1}`}
                    className="max-w-[120px] rounded-lg h-auto opacity-50 hover:opacity-100 transition-opacity"
                    width={100}
                    height={120}
                  />
                </div>
              ))}
              {/* Cloned logos for seamless loop */}
              {clients.map((logo, index) => (
                <div key={`clone-${index}`} className="client-logo flex-shrink-0">
                  <Image
                    src={logo}
                    alt={`Client ${index + 1}`}
                    className="max-w-[120px] rounded-lg h-auto opacity-50 hover:opacity-100 transition-opacity"
                    width={100}
                    height={120}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}