"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BrainCircuit, Facebook, Github, Instagram, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';

const navigation = {
  solutions: [
    { name: 'E-Commerce Solutions', href: '#' },
    { name: 'Portfolio Websites', href: '#' },
    { name: 'Inventory Management', href: '#' },
    { name: 'Business Management', href: '#' },
    { name: 'Learning Management', href: '#' },
    { name: 'Booking Management', href: '#' },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Press', href: '#' },
  ],
  legal: [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'Licensing', href: '#' },
  ],
  social: [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-card  mt-32">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://i.ibb.co.com/vx1tyMy9/Tech-brand-3.png"
              alt="Arvion Tech Logo"
              width={32}
              height={32}
              className="h-12 w-36"
            />
          </Link>
            <p className="mt-4 text-muted-foreground max-w-md">
              Empowering businesses with cutting-edge technology solutions. 
              Building the future of digital innovation, one project at a time.
            </p>
            <div className="mt-6">
              <h3 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h3>
              <div className="flex gap-2">
                <Input placeholder="Enter your email" className="bg-muted" />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Solutions</h3>
            <ul className="space-y-3">
              {navigation.solutions.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-muted">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2025 ArvionTech. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {navigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span className="sr-only">{item.name}</span>
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}