'use client';

import { Star, Quote } from 'lucide-react';

export default function SocialProofSection() {
  const testimonials = [
    {
      quote: "We went from missing 30% of calls to answering 100%. Revenue is up $180K in just 3 months.",
      author: "Mike Thompson",
      role: "Owner, Phoenix HVAC Pro",
      rating: 5
    },
    {
      quote: "The AI books appointments while I'm on other calls. It's like having 5 extra CSRs without the payroll.",
      author: "Sarah Chen",
      role: "Operations Manager, Cool Air Solutions",
      rating: 5
    },
    {
      quote: "Setup took 2 hours. ROI was positive in week 1. This is the best investment we've made.",
      author: "David Rodriguez",
      role: "CEO, Elite Plumbing Services",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Trusted by industry leaders
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Join hundreds of service businesses recovering millions in lost revenue
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white border border-neutral-200 rounded-lg p-8 hover:shadow-lg transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <Quote className="w-8 h-8 text-neutral-300 mb-4" />
              <p className="text-neutral-700 mb-6 leading-relaxed">
                {testimonial.quote}
              </p>
              <div className="border-t border-neutral-200 pt-4">
                <div className="font-semibold text-neutral-900">{testimonial.author}</div>
                <div className="text-sm text-neutral-600">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Metrics bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-neutral-200 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-neutral-900 mb-1">500+</div>
            <div className="text-sm text-neutral-600">Active businesses</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neutral-900 mb-1">2M+</div>
            <div className="text-sm text-neutral-600">Calls handled</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neutral-900 mb-1">98%</div>
            <div className="text-sm text-neutral-600">Customer satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-neutral-900 mb-1">$50M+</div>
            <div className="text-sm text-neutral-600">Revenue recovered</div>
          </div>
        </div>
      </div>
    </section>
  );
}
