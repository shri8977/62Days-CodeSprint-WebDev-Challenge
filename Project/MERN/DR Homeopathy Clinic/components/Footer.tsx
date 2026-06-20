'use client';

import { motion } from 'framer-motion';
import { FaEnvelope, FaLocationDot, FaPhone, FaClock } from 'react-icons/fa6';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-gradient-to-b from-transparent to-primary/5 border-t border-border">
      {/* Main Footer */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🏥</span>
                </div>
                <div>
                  <p className="font-bold gradient-text">Modern Homoeo</p>
                  <p className="text-xs text-muted-foreground">Clinic & Research</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Providing trusted homeopathy care with natural healing for over 40 years.
              </p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-foreground">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#home" className="hover:text-primary transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#about" className="hover:text-primary transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#services" className="hover:text-primary transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="#appointment" className="hover:text-primary transition-colors">
                    Book Appointment
                  </Link>
                </li>
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-foreground">Treatments</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Skin Diseases</li>
                <li>Hair Fall</li>
                <li>Diabetes</li>
                <li>Thyroid Disorders</li>
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-foreground">Contact</h4>
              <div className="space-y-3 text-sm">
                <a
                  href="tel:+919437449297"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <FaPhone size={16} />
                  +91 94374 49297
                </a>
                <a
                  href="mailto:doctor@modernhomoeo.com"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <FaEnvelope size={16} />
                  Email us
                </a>
                <div className="flex items-start gap-2 text-muted-foreground">
                  <FaLocationDot size={16} className="mt-0.5 flex-shrink-0" />
                  <span>
                    Gopabandhu Chhack, Main Road,<br />
                    Jajpur, Odisha
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-border my-8" />

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} Modern Homoeo Clinic & Research Centre. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-primary transition-colors">
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/919437449297"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-40"
        aria-label="Contact us on WhatsApp"
      >
        <span className="text-2xl">💬</span>
      </motion.a>

      {/* Floating Call Button - Mobile Only */}
      <motion.a
        href="tel:+919437449297"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3, delay: 0.7 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 md:hidden w-14 h-14 rounded-full bg-gradient-to-r from-secondary to-primary text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-40"
        aria-label="Call us now"
      >
        <FaPhone size={20} />
      </motion.a>
    </footer>
  );
}
