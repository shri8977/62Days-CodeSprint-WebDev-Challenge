'use client';

import { motion } from 'framer-motion';
import {
  FaLeaf,
  FaHeart,
  FaHeartPulse,
  FaVial,
  FaWind,
  FaUtensils,
  FaBaby,
  FaBrain,
} from 'react-icons/fa6';

const services = [
  {
    icon: FaLeaf,
    title: 'Skin Diseases',
    description: 'Eczema, psoriasis, acne, and other dermatological conditions treated naturally.',
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: FaHeart,
    title: 'Hair Fall',
    description: 'Effective treatment for hair loss and alopecia with natural remedies.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: FaHeartPulse,
    title: 'Diabetes',
    description: 'Comprehensive management of diabetes with personalized treatment plans.',
    color: 'from-red-500 to-rose-500',
  },
  {
    icon: FaVial,
    title: 'Thyroid Disorders',
    description: 'Thyroid imbalance and related conditions managed effectively.',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: FaWind,
    title: 'Allergy & Asthma',
    description: 'Relief from allergic reactions and asthmatic conditions naturally.',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    icon: FaUtensils,
    title: 'Gastric Problems',
    description: 'IBS, GERD, constipation, and digestive issues treated holistically.',
    color: 'from-yellow-500 to-amber-500',
  },
  {
    icon: FaBaby,
    title: 'Child Care',
    description: 'Safe and effective treatments for common childhood ailments.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: FaBrain,
    title: 'Chronic Diseases',
    description: 'Long-term management of chronic conditions with minimal side effects.',
    color: 'from-violet-500 to-purple-500',
  },
];

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
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
            Our <span className="gradient-text">Treatment Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive homeopathic treatments for a wide range of conditions
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group glass p-6 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="text-white" size={24} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold mb-2 text-foreground">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>

                {/* Hover Border Glow */}
                <div className="mt-4 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-primary to-secondary transition-all duration-300" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-muted-foreground mb-4">Not sure which treatment you need?</p>
          <button className="glow-button">
            Consult with Dr. Satapathy Today
          </button>
        </motion.div>
      </div>
    </section>
  );
}
