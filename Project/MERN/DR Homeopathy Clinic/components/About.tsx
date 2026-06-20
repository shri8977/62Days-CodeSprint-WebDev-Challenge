'use client';

import { motion } from 'framer-motion';
import { FaCircleCheck } from 'react-icons/fa6';

export default function About() {
  const qualifications = [
    {
      title: 'MD - Homeopathy',
      institution: 'Utkal University, Odisha',
      year: '2007',
    },
    {
      title: 'DHMS (Diploma in Homeopathic Medicine & Surgery)',
      institution: 'Utkalmani Homoeopathic Medical College & Hospital',
      year: '1986',
    },
  ];

  const features = [
    'Classical Homeopathy Treatment',
    'Personalized Care Plans',
    'Natural Healing Methods',
    'Evidence-Based Practice',
    'Patient-Centric Approach',
    'Comprehensive Case Studies',
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-primary/5">
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
            Meet <span className="gradient-text">Dr. Pramod Satapathy</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A renowned homeopathy practitioner with 40+ years of dedicated service to holistic wellness
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Doctor Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Qualifications */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Professional Qualifications</h3>
              {qualifications.map((qual, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass p-4 rounded-xl"
                >
                  <p className="font-semibold text-primary">{qual.title}</p>
                  <p className="text-sm text-muted-foreground">{qual.institution}</p>
                  <p className="text-xs text-accent mt-1">{qual.year}</p>
                </motion.div>
              ))}
            </div>

            {/* About Text */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-4 pt-4"
            >
              <p className="text-muted-foreground leading-relaxed">
                Dr. Pramod Satapathy is a highly experienced homeopathic physician dedicated to providing natural, safe, and effective treatments. With over 40 years of clinical practice, he has successfully treated over 1000 patients with various chronic and acute conditions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                His approach combines classical homeopathic principles with modern understanding of diseases, ensuring personalized treatment plans tailored to each patient's unique constitution and condition.
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Features */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Main Feature Box */}
            <div className="glass-dark dark:glass-dark p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-6">Why Choose Dr. Satapathy?</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <FaCircleCheck className="text-primary flex-shrink-0" size={20} />
                    <span className="text-foreground">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-xl text-center"
            >
              <p className="text-sm text-muted-foreground mb-2">Medical Registration Verified</p>
              <p className="text-3xl font-bold gradient-text">AYUSH Certified</p>
              <p className="text-sm text-muted-foreground mt-2">Registered Homoeopath</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
