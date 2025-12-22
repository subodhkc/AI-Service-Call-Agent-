"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Zap, Shield, Calendar, TrendingUp, Users, CheckCircle } from "lucide-react";
import Navigation from "@/components/Navigation";

export default function Home() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-white pt-20">
        {/* Hero Section with Main Value Prop */}
        <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Stop Losing $200K+ Per Year
              </h1>
              <p className="text-2xl md:text-3xl mb-4 text-blue-100">
                From Missed Calls & Poor Follow-Ups
              </p>
              <p className="text-xl mb-8 text-blue-50">
                AI-powered voice operations that never miss a lead, automatically follow up, and close more deals
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/login"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href="/calendar"
                  className="bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg border-2 border-white hover:bg-blue-400 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Book a Demo
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Your Current Reality
              </h2>
              <p className="text-xl text-gray-600">
                Every missed call is a missed opportunity. Every delayed follow-up is lost revenue.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">30% Missed Calls</h3>
                <p className="text-gray-600">
                  Average HVAC company misses 3 out of 10 calls during peak hours
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-orange-500">
                <div className="text-4xl mb-4">⏰</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">48-Hour Delay</h3>
                <p className="text-gray-600">
                  Average time to follow up with leads - by then, they've called your competitor
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
                <div className="text-4xl mb-4">💸</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">$200K+ Lost</h3>
                <p className="text-gray-600">
                  Annual revenue lost from poor call handling and follow-up failures
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Section */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                The Kestrel Solution
              </h2>
              <p className="text-xl text-gray-600">
                AI-powered voice operations that work 24/7 to capture, qualify, and convert every lead
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Never Miss a Call</h3>
                <p className="text-gray-600">
                  AI answers every call instantly, 24/7. No more voicemail, no more lost leads.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Instant Follow-Ups</h3>
                <p className="text-gray-600">
                  Automated emails and SMS sent within minutes, not days. Strike while the iron is hot.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Real-Time Coaching</h3>
                <p className="text-gray-600">
                  AI analyzes every call and provides instant feedback to improve close rates.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Smart Routing</h3>
                <p className="text-gray-600">
                  Calls routed to the right person based on expertise, availability, and priority.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Call Intelligence</h3>
                <p className="text-gray-600">
                  Every call transcribed, analyzed, and logged automatically in your CRM.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">Proven Results</h3>
                <p className="text-gray-600">
                  Average 40% increase in booked appointments within the first 30 days.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Stop Losing Revenue?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Join hundreds of service businesses already using Kestrel to capture every opportunity
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/login"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors inline-flex items-center justify-center gap-2"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="/calendar"
                className="bg-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg border-2 border-white hover:bg-blue-400 transition-colors inline-flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Schedule Demo
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
