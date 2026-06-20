'use client';

import { motion } from 'framer-motion';
import { FaArrowRight, FaPhone, FaCalendar } from 'react-icons/fa6';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-block">
            <div className="glass px-4 py-2 text-sm font-medium text-primary rounded-full">
              ✨ AYUSH Certified Homeopath
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold leading-tight"
          >
            Trusted Homeopathy Care with{' '}
            <span className="gradient-text">Natural Healing</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground leading-relaxed"
          >
            Personalized, safe & effective homeopathy treatments for your complete wellness. With 40 years of experience treating 1000+ patients.
          </motion.p>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex gap-8 py-4"
          >
            <div>
              <p className="text-3xl font-bold gradient-text">40+</p>
              <p className="text-sm text-muted-foreground">Years Experience</p>
            </div>
            <div>
              <p className="text-3xl font-bold gradient-text">1000+</p>
              <p className="text-sm text-muted-foreground">Cases Treated</p>
            </div>
            <div>
              <p className="text-3xl font-bold gradient-text">500+</p>
              <p className="text-sm text-muted-foreground">Happy Patients</p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <button className="glow-button flex items-center justify-center gap-2 group">
              <FaCalendar size={20} />
              <span>Book Appointment</span>
              <FaArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="tel:+919437449297"
              className="px-6 py-3 rounded-lg font-medium border-2 border-primary text-primary hover:bg-primary/10 transition-all flex items-center justify-center gap-2"
            >
              <FaPhone size={20} />
              <span>Call Now</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side - Doctor Image Placeholder */}
        <motion.div
          variants={itemVariants}
          className="relative hidden md:block"
        >
          <div className="relative w-full aspect-square">
            {/* Glass Card */}
            <div className="absolute inset-0 glass rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
              
              {/* Placeholder for doctor image */}
              <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-8xl">
                👨‍⚕️
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 glass px-6 py-4 rounded-2xl max-w-xs shadow-xl"
            >
              <p className="text-sm font-semibold text-foreground">MD - Homeopathy</p>
              <p className="text-xs text-muted-foreground">Utkal University</p>
            </motion.div>

            {/* Decoration */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-8 -left-8 w-32 h-32 border-2 border-primary/30 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
