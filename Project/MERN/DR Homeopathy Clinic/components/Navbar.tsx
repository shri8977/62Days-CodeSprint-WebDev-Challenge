'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaBars, FaX, FaPhone, FaWhatsapp } from 'react-icons/fa6';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <span className="text-white font-bold text-lg">🏥</span>
            </div>
            <div className="hidden md:block">
              <p className="text-lg font-bold gradient-text">Modern Homoeo</p>
              <p className="text-xs text-muted-foreground">Clinic & Research</p>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary/10 text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+919437449297"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-all"
            >
              <FaPhone size={16} />
              <span>Call Now</span>
            </a>
            <a
              href="https://wa.me/919437449297"
              target="_blank"
              rel="noopener noreferrer"
              className="glow-button flex items-center gap-2"
            >
              <FaWhatsapp size={16} />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary/10 transition-all"
          >
            {isOpen ? <FaX size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden pb-4 space-y-2"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 rounded-lg hover:bg-primary/10 transition-all"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <a
                href="tel:+919437449297"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm bg-primary/10 text-primary"
              >
              <FaPhone size={16} />
                Call
              </a>
              <a
                href="https://wa.me/919437449297"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 glow-button text-sm flex items-center justify-center gap-2"
              >
              <FaWhatsapp size={16} />
                WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
