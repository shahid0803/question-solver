'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard, GlassButton } from '@/components/ui';
import { ScrollAnimation, StaggerContainer, GradientText, FloatingElement } from '@/components/animations';
import { Sparkles, Zap, Globe, Rocket } from 'lucide-react';

/**
 * Features Section Component
 * Showcases key features with animations
 */
export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'Premium Design',
      description: 'Built with glassmorphism and modern UI principles for a stunning visual experience.',
      color: 'primary',
    },
    {
      icon: Globe,
      title: '3D Interactive Elements',
      description: 'Experience immersive 3D visualizations and animated particles for engaging learning.',
      color: 'secondary',
    },
    {
      icon: Zap,
      title: 'AI-Powered Processing',
      description: 'Intelligent PDF processing and automatic question categorization using cutting-edge AI.',
      color: 'accent',
    },
    {
      icon: Rocket,
      title: 'Lightning Fast',
      description: 'Optimized performance with smooth animations and responsive design across all devices.',
      color: 'warning',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <ScrollAnimation variant="slideUp">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <GradientText colors={['#0ea5e9', '#8b5cf6', '#14b8a6']}>
              Powerful Features
            </GradientText>
          </h2>
        </ScrollAnimation>
        <ScrollAnimation variant="slideUp" delay={0.2}>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Experience the future of exam preparation with our premium platform
          </p>
        </ScrollAnimation>
      </div>

      <StaggerContainer staggerDelay={0.1}>
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <ScrollAnimation key={index} variant="slideUp" delay={index * 0.1}>
              <GlassCard variant="elevated" rounded="2xl" hover className="p-8 h-full">
                <FloatingElement distance={5} delay={index * 0.1}>
                  <div className="mb-4">
                    <Icon className="w-12 h-12 text-primary" />
                  </div>
                </FloatingElement>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">{feature.description}</p>
              </GlassCard>
            </ScrollAnimation>
          );
        })}
      </StaggerContainer>
    </section>
  );
};

export default FeaturesSection;
