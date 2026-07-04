'use client';

import React from 'react';
import { ParticleBackground } from '@/components/3d';
import { PageTransition, GradientText, ScrollAnimation, FloatingElement, PulseElement } from '@/components/animations';
import { GlassButton, GlassCard, GlassBadge } from '@/components/ui';
import { Layout } from '@/components/layout';
import { FeaturesSection, CTASection } from '@/components/sections';
import { useThemeContext } from '@/lib/theme/ThemeProvider';
import { Zap, Code, Palette } from 'lucide-react';

export default function Home() {
  const { isDark } = useThemeContext();

  return (
    <Layout>
      <PageTransition variant="fade">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Particle Background */}
          <ParticleBackground
            particleCount={800}
            particleSize={1.5}
            speed={0.3}
            interactive={true}
          />

          {/* Hero Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <ScrollAnimation variant="slideUp">
              <GlassBadge variant="primary" className="mb-6 inline-flex">
                <Zap size={16} className="mr-2" />
                Welcome to the Future of Learning
              </GlassBadge>
            </ScrollAnimation>

            {/* Main Heading */}
            <ScrollAnimation variant="slideUp" delay={0.1}>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                <GradientText colors={['#0ea5e9', '#8b5cf6', '#14b8a6']}>
                  Question Solver
                </GradientText>
              </h1>
            </ScrollAnimation>

            {/* Subheading */}
            <ScrollAnimation variant="slideUp" delay={0.2}>
              <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl mx-auto leading-relaxed">
                A premium 3D educational platform combining cutting-edge design with AI-powered PDF processing for the ultimate exam preparation experience.
              </p>
            </ScrollAnimation>

            {/* CTA Buttons */}
            <ScrollAnimation variant="slideUp" delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <GlassButton variant="primary" size="lg">
                  Get Started
                </GlassButton>
                <GlassButton variant="outline" size="lg">
                  Learn More
                </GlassButton>
              </div>
            </ScrollAnimation>

            {/* Info Cards */}
            <ScrollAnimation variant="slideUp" delay={0.4}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                {[
                  { icon: Palette, label: 'Premium Design', value: 'Glassmorphism UI' },
                  { icon: Code, label: 'Full-Stack', value: 'Next.js + Three.js' },
                  { icon: Zap, label: 'High Performance', value: '60 FPS Animations' },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <GlassCard key={index} variant="subtle" rounded="xl" className="p-4">
                      <FloatingElement distance={3} delay={index * 0.1}>
                        <Icon className="w-8 h-8 text-primary mx-auto mb-2" />
                      </FloatingElement>
                      <p className="text-sm text-text-secondary">{item.label}</p>
                      <p className="text-sm font-semibold text-text">{item.value}</p>
                    </GlassCard>
                  );
                })}
              </div>
            </ScrollAnimation>

            {/* Floating Elements */}
            <div className="absolute top-10 left-5 md:left-20 hidden md:block">
              <PulseElement scale={1.1} duration={3}>
                <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-lg" />
              </PulseElement>
            </div>
            <div className="absolute bottom-20 right-10 md:right-32 hidden md:block">
              <PulseElement scale={1.15} duration={4} delay={1}>
                <div className="w-12 h-12 rounded-full bg-secondary/20 backdrop-blur-lg" />
              </PulseElement>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <FeaturesSection />

        {/* CTA Section */}
        <CTASection />
      </PageTransition>
    </Layout>
  );
}
