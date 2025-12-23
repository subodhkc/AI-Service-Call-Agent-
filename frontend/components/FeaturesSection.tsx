'use client';

import { Phone, Calendar, MessageSquare, BarChart3, Clock, Zap, Shield, Users } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Phone,
      title: "Instant Call Answering",
      description: "Answer every call in under 200ms. No hold music, no missed opportunities. Your AI agent picks up instantly, every time.",
      color: "blue"
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Books appointments directly into your calendar. Checks availability, confirms details, and sends reminders automatically.",
      color: "green"
    },
    {
      icon: MessageSquare,
      title: "Natural Conversations",
      description: "Sounds human, understands context, handles objections. Trained specifically for HVAC, plumbing, and home services.",
      color: "purple"
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Track every call, conversion rate, and revenue impact. See exactly what's working and optimize continuously.",
      color: "amber"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Never miss an after-hours emergency call. Your AI works nights, weekends, and holidays without overtime pay.",
      color: "indigo"
    },
    {
      icon: Zap,
      title: "Instant Follow-Ups",
      description: "Automatically sends quotes, confirmations, and reminders. Keeps leads warm until they convert.",
      color: "orange"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 certified, HIPAA compliant. Your customer data is encrypted and protected at all times.",
      color: "red"
    },
    {
      icon: Users,
      title: "CRM Integration",
      description: "Syncs with ServiceTitan, Housecall Pro, Jobber, and more. All data flows seamlessly into your existing tools.",
      color: "teal"
    }
  ];

  const colorClasses = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    amber: "bg-amber-50 text-amber-600",
    indigo: "bg-indigo-50 text-indigo-600",
    orange: "bg-orange-50 text-orange-600",
    red: "bg-red-50 text-red-600",
    teal: "bg-teal-50 text-teal-600"
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-blue-50 border border-blue-200 rounded-full mb-4">
            <span className="text-sm font-medium text-blue-900">Everything you need</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Built for service businesses
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Every feature designed to maximize bookings, minimize no-shows, and scale your operations without hiring more staff
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-6 rounded-lg border border-neutral-200 hover:border-neutral-300 hover:shadow-lg transition-all"
            >
              <div className={`w-12 h-12 rounded-lg ${colorClasses[feature.color as keyof typeof colorClasses]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-neutral-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a 
            href="/calendar"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-lg hover:shadow-xl"
          >
            See it in action
          </a>
        </div>
      </div>
    </section>
  );
}
