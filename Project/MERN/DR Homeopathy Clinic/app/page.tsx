'use client';

import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import TrustSection from '@/components/TrustSection';
import Testimonials from '@/components/Testimonials';
import Appointment from '@/components/Appointment';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  useEffect(() => {
    // Initialize AOS for scroll animations
    import('aos').then((AOS) => {
      AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
      });
    });
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5">
      <Toaster position="top-right" />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <TrustSection />
      <Testimonials />
      <Appointment />
      <FAQ />
      <Footer />
    </main>
  );
}
