'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa6';

const faqs = [
  {
    question: 'Is homeopathy safe?',
    answer:
      'Yes, homeopathy is completely safe. It uses highly diluted natural substances with no harmful side effects. It is suitable for all ages, including infants and pregnant women.',
  },
  {
    question: 'How long does treatment take?',
    answer:
      'Treatment duration depends on the condition, severity, and individual constitution. Acute conditions may improve in weeks, while chronic conditions may take 3-6 months or longer. Dr. Satapathy will provide a timeline after initial consultation.',
  },
  {
    question: 'Can I take homeopathy with other medicines?',
    answer:
      'Yes, homeopathic medicines can be taken alongside conventional medicines. However, it&apos;s important to inform Dr. Satapathy about any other medications you&apos;re taking for optimal treatment planning.',
  },
  {
    question: 'Are there any side effects?',
    answer:
      'Homeopathic medicines have no harmful side effects as they are made from natural substances in highly diluted form. The body may sometimes experience slight detoxification reactions, which are temporary and beneficial.',
  },
  {
    question: 'Is homeopathy effective for chronic diseases?',
    answer:
      'Yes, homeopathy is particularly effective for chronic diseases. It works on the root cause of the disease rather than just treating symptoms, making it ideal for long-standing conditions.',
  },
  {
    question: 'How should I prepare for my first consultation?',
    answer:
      'Write down your symptoms, medical history, lifestyle habits, and any previous treatments. Be ready to discuss your family history and any emotional or physical stressors. Bring any recent medical reports if available.',
  },
  {
    question: 'Can children be treated with homeopathy?',
    answer:
      'Absolutely! Homeopathy is very safe for children. It&apos;s particularly effective for common childhood issues like cough, cold, fever, ear infections, and behavioral problems.',
  },
  {
    question: 'Do I need to follow a special diet?',
    answer:
      'While on homeopathic treatment, certain dietary modifications may be recommended depending on your condition. Dr. Satapathy will provide specific dietary guidelines during your consultation.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Find answers to common questions about homeopathy and our treatments
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="glass rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-primary/5 transition-colors"
              >
                <h3 className="text-lg font-semibold text-foreground pr-4">
                  {faq.question}
                </h3>
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <FaChevronDown className="text-primary" size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 border-t border-border bg-primary/5">
                      <p className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <a
            href="https://wa.me/919437449297"
            target="_blank"
            rel="noopener noreferrer"
            className="glow-button inline-block"
          >
            Ask Dr. Satapathy
          </a>
        </motion.div>
      </div>
    </section>
  );
}
