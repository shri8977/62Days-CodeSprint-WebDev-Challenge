'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaStar } from 'react-icons/fa6';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    condition: 'Chronic Eczema',
    text: 'Dr. Satapathy&apos;s treatment completely transformed my skin condition. After 3 months, the eczema that had troubled me for years is almost gone!',
    rating: 5,
    initial: 'PS',
  },
  {
    id: 2,
    name: 'Rajesh Patel',
    condition: 'Hair Loss',
    text: 'The natural approach worked wonders for my hair fall. I can see significant hair regrowth and my confidence is back. Highly recommend!',
    rating: 5,
    initial: 'RP',
  },
  {
    id: 3,
    name: 'Anjali Singh',
    condition: 'Thyroid Disorder',
    text: 'Finally found relief without taking harsh medications. Dr. Satapathy&apos;s homeopathic treatment stabilized my thyroid naturally.',
    rating: 5,
    initial: 'AS',
  },
  {
    id: 4,
    name: 'Vikram Desai',
    condition: 'Diabetes Management',
    text: 'The personalized treatment plan has helped me manage my diabetes better. Blood sugar levels are more stable than ever before.',
    rating: 5,
    initial: 'VD',
  },
  {
    id: 5,
    name: 'Meera Gupta',
    condition: 'Asthma & Allergy',
    text: 'I can breathe freely now! Dr. Satapathy&apos;s treatment reduced my asthma episodes significantly. Life-changing experience.',
    rating: 5,
    initial: 'MG',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="gradient-text">Patients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real experiences from patients who've been transformed by our treatments
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main Testimonial Card */}
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.5 },
                }}
                className="glass p-8 md:p-12 rounded-2xl"
              >
                {/* Stars */}
                <div className="flex gap-2 mb-4">
                  {[...Array(current.rating)].map((_, i) => (
                    <FaStar key={i} size={20} className="fill-accent text-accent" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-xl md:text-2xl text-foreground mb-6 leading-relaxed">
                  &quot;{current.text}&quot;
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                    <span className="text-white font-bold">{current.initial}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{current.name}</p>
                    <p className="text-sm text-muted-foreground">{current.condition}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={() => paginate(-1)}
              className="absolute -left-6 md:-left-16 top-1/2 -translate-y-1/2 p-3 rounded-lg glass hover:bg-primary/20 transition-all z-10"
              aria-label="Previous testimonial"
            >
              <FaChevronLeft size={24} className="text-primary" />
            </button>

            <button
              onClick={() => paginate(1)}
              className="absolute -right-6 md:-right-16 top-1/2 -translate-y-1/2 p-3 rounded-lg glass hover:bg-primary/20 transition-all z-10"
              aria-label="Next testimonial"
            >
              <FaChevronRight size={24} className="text-primary" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-primary w-8'
                    : 'bg-primary/30 hover:bg-primary/60'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 mt-20"
        >
          {[
            { number: '500+', label: 'Happy Patients' },
            { number: '95%', label: 'Success Rate' },
            { number: '40+', label: 'Years Experience' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="glass p-8 text-center rounded-xl"
            >
              <p className="text-4xl font-bold gradient-text mb-2">{stat.number}</p>
              <p className="text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
