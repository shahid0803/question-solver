'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassButton } from '@/components/ui';
import { ScrollAnimation, GradientText } from '@/components/animations';
import { ArrowRight } from 'lucide-react';

/**
 * CTA Section Component
 * Call-to-action section with animated button
 */
export const CTASection: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <ScrollAnimation variant="scale">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 rounded-3xl p-12 backdrop-blur-sm border border-border/30">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <GradientText colors={['#0ea5e9', '#8b5cf6', '#14b8a6']}>
              Ready to Transform Your Learning?
            </GradientText>
          </h2>
          <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
            Join thousands of students preparing for their exams with our premium platform
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <GlassButton variant="primary" size="lg" className="group">
              Get Started Now
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </GlassButton>
          </motion.div>
        </div>
      </ScrollAnimation>
    </section>
  );
};

export default CTASection;
