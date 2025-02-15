"use client";

import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Card } from '@/components/ui/card';
import { Feature } from './types';

// Correct Spline import
const Spline = dynamic(() => import('@splinetool/react-spline').then(mod => mod.default), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/10" />
});

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Card 
      ref={cardRef}
      className="feature-card relative h-96 p-6 transition-all duration-500 bg-black/5 backdrop-blur-lg border-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-20">
        <Spline 
          scene={feature.splineScene}
          className="w-full h-full transform scale-150"
        />
      </div>
      <div className={`card-content relative z-10 transition-all duration-500 ${
        isHovered ? 'transform -translate-y-2' : ''
      }`}>
        <div className="text-primary mb-4 transform transition-all duration-500">
          {feature.icon}
        </div>
        <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
          {feature.title}
        </h3>
        <p className="text-muted-foreground">
          {feature.description}
        </p>
      </div>
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/0 transform transition-all duration-500 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
    </Card>
  );
};