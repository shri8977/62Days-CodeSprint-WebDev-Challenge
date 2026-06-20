'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface CounterProps {
  end: number;
  label: string;
  suffix?: string;
}

function Counter({ end, label, suffix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const duration = 2000;
          const increment = end / (duration / 16);
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 16);

          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <p className="text-5xl md:text-6xl font-bold gradient-text mb-2">
        {count}
        {suffix}
      </p>
      <p className="text-muted-foreground">{label}</p>
    </motion.div>
  );
}

export default function TrustSection() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-secondary/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            Trusted by <span className="gradient-text">Thousands</span>
          </h2>
          <p className="text-muted-foreground">
            Dr. Satapathy&apos;s proven track record of successful treatments
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          <Counter end={40} label="Years of Experience" suffix="+" />
          <Counter end={1000} label="Cases Successfully Treated" suffix="+" />
          <Counter end={500} label="Happy & Satisfied Patients" suffix="+" />
          <Counter end={95} label="Success Rate" suffix="%" />
        </div>
      </div>
    </section>
  );
}
