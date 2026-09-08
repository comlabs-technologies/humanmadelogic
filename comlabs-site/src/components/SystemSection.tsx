'use client';

import React, { useState } from 'react';
import { Layers, Move, FileText, LayoutTemplate } from 'lucide-react';

const tabs = [
  { id: 'components', label: 'Components', icon: Layers },
  { id: 'scenes', label: 'Product scenes', icon: FileText },
  { id: 'motion', label: 'Motion', icon: Move },
  { id: 'templates', label: 'Templates', icon: LayoutTemplate },
];

const tabContent = {
  components: {
    title: 'Refined building blocks',
    description: 'Buttons, inputs, cards, and navigation elements with considered proportions, subtle states, and proper accessibility. Each component is a complete solution—not just styles.',
    features: ['40+ components', 'Full TypeScript support', 'Accessible by default', 'Dark mode ready'],
  },
  scenes: {
    title: 'Product UI compositions',
    description: 'Pre-composed interface sections that feel like real software: settings panels, onboarding flows, approval dialogs, and data entry experiences that users recognize instantly.',
    features: ['25+ scene templates', 'Contextual interactions', 'Real-world patterns', 'Production tested'],
  },
  motion: {
    title: 'Purposeful animation',
    description: 'Motion that clarifies state changes and adds weight to interactions. Every transition serves a function—orienting users, confirming actions, or guiding attention.',
    features: ['180-240ms defaults', 'Meaningful easing curves', 'Reduced motion support', 'Performance optimized'],
  },
  templates: {
    title: 'Complete page layouts',
    description: 'Full landing pages, dashboards, and product screens built from Comlabs components. Start with structure, customize with your content, ship faster.',
    features: ['12+ page templates', 'Responsive layouts', 'SEO-ready structure', 'Easy customization'],
  },
};

export function SystemSection() {
  const [activeTab, setActiveTab] = useState('components');

  return (
    <section id="system" className="py-section-mobile md:py-section-desktop border-t border-b border-line">
      <div className="max-w-container mx-auto px-gutter-mobile md:px-gutter-desktop">
        {/* Tab strip */}
        <div className="flex flex-wrap gap-2 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  inline-flex items-center gap-2 px-4 py-2 rounded-small
                  text-body font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-lilac text-ink' 
                    : 'bg-surface text-muted hover:text-ink border border-line'}
                `}
              >
                <Icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div>
            <h3 className="text-heading-lg font-medium text-ink mb-4">
              {tabContent[activeTab as keyof typeof tabContent].title}
            </h3>
            <p className="text-body-lg text-muted mb-8 leading-relaxed">
              {tabContent[activeTab as keyof typeof tabContent].description}
            </p>
            <ul className="space-y-3">
              {tabContent[activeTab as keyof typeof tabContent].features.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-body text-ink">
                  <div className="w-1.5 h-1.5 rounded-full bg-wine" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual representation */}
          <div className="bg-surface rounded-card p-6 border border-line">
            <div className="aspect-[4/3] bg-canvas/50 rounded-small flex items-center justify-center">
              <div className="text-center">
                {activeTab === 'components' && (
                  <>
                    <Layers size={48} className="mx-auto text-muted mb-4" />
                    <p className="text-body text-muted">Component library preview</p>
                  </>
                )}
                {activeTab === 'scenes' && (
                  <>
                    <FileText size={48} className="mx-auto text-muted mb-4" />
                    <p className="text-body text-muted">Product scene composition</p>
                  </>
                )}
                {activeTab === 'motion' && (
                  <>
                    <Move size={48} className="mx-auto text-muted mb-4" />
                    <p className="text-body text-muted">Motion timeline visualization</p>
                  </>
                )}
                {activeTab === 'templates' && (
                  <>
                    <LayoutTemplate size={48} className="mx-auto text-muted mb-4" />
                    <p className="text-body text-muted">Page template grid</p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
