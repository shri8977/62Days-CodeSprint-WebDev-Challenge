'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { FaCalendar, FaPhone, FaEnvelope, FaPaperPlane } from 'react-icons/fa6';
import toast from 'react-hot-toast';

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    problem: '',
    date: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.phone || !formData.problem) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    try {
      // Send via WhatsApp
      const message = `Hi Dr. Satapathy, I would like to book an appointment.\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nProblem: ${formData.problem}\nPreferred Date: ${formData.date || 'ASAP'}`;
      const encodedMessage = encodeURIComponent(message);
      window.open(
        `https://wa.me/919437449297?text=${encodedMessage}`,
        '_blank'
      );

      toast.success('Opening WhatsApp to confirm your appointment!');
      setFormData({ name: '', phone: '', email: '', problem: '', date: '' });
    } catch (error) {
      toast.error('Failed to book appointment');
    } finally {
      setIsLoading(false);
    }
  };

  const problems = [
    'Skin Diseases',
    'Hair Fall',
    'Diabetes',
    'Thyroid Disorder',
    'Allergy & Asthma',
    'Gastric Problems',
    'Child Care',
    'Chronic Diseases',
    'Other',
  ];

  return (
    <section id="appointment" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-secondary/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Book Your <span className="gradient-text">Consultation</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Schedule your personalized treatment plan with Dr. Pramod Satapathy
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Get in Touch</h3>

              <motion.a
                href="tel:+919437449297"
                whileHover={{ x: 10 }}
                className="glass p-4 rounded-xl flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <FaPhone className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Call Now</p>
                  <p className="text-sm text-muted-foreground">+91 94374 49297</p>
                </div>
              </motion.a>

              <motion.a
                href="https://wa.me/919437449297"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 10 }}
                className="glass p-4 rounded-xl flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <FaPaperPlane className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">Quick message booking</p>
                </div>
              </motion.a>

              <motion.a
                href="mailto:doctor@modernhomoeo.com"
                whileHover={{ x: 10 }}
                className="glass p-4 rounded-xl flex items-center gap-4 group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                  <FaEnvelope className="text-primary" size={20} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">Send us your details</p>
                </div>
              </motion.a>
            </div>

            {/* Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-xl border-l-4 border-primary"
            >
              <p className="text-sm text-muted-foreground mb-2">📍 Location</p>
              <p className="font-semibold text-foreground">
                Gopabandhu Chhack, Main Road, Jajpur, Odisha
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-2xl"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Problem */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Health Concern *
                </label>
                <select
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                  required
                >
                  <option value="">Select your concern</option>
                  {problems.map((problem) => (
                    <option key={problem} value={problem}>
                      {problem}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:border-primary focus:outline-none transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="glow-button w-full mt-6 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <FaCalendar size={18} />
                {isLoading ? 'Booking...' : 'Book Appointment'}
              </button>

              <p className="text-xs text-muted-foreground text-center">
                We&apos;ll confirm your appointment via WhatsApp or call
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
