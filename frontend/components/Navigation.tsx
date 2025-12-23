'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, ChevronDown, Menu, X } from 'lucide-react';
import { logout, isAuthenticated } from '@/lib/auth';

export default function Navigation() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleDropdown = (dropdown: string) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      logout();
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white/90 backdrop-blur-sm shadow-sm'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 z-50">
            <img 
              src="/website-logo-wide.png" 
              alt="Kestrel Voice Operations" 
              className="h-9 w-auto max-w-[180px] object-contain transition-all duration-200 hover:opacity-80"
            />
          </Link>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden z-50 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Products Dropdown - Always visible */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown('products')}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <span>Products</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {openDropdown === 'products' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                <Link href="/products/call-intelligence" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <div className="font-semibold">AI Call Agent</div>
                  <div className="text-xs text-gray-500">24/7 voice receptionist</div>
                </Link>
                <Link href="/products/click-to-call" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <div className="font-semibold">Click-to-Call</div>
                  <div className="text-xs text-gray-500">One-click dialing</div>
                </Link>
                <Link href="/products/follow-up-autopilot" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <div className="font-semibold">Follow-Up Autopilot</div>
                  <div className="text-xs text-gray-500">Automated follow-ups</div>
                </Link>
                <Link href="/video" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <div className="font-semibold">Video Calls</div>
                  <div className="text-xs text-gray-500">HD video conferencing</div>
                </Link>
              </div>
              )}
            </div>

            {isLoggedIn && (
              <>
                {/* CRM Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown('crm')}
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <span>CRM</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {openDropdown === 'crm' && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                      <Link href="/crm/leads" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Leads</Link>
                      <Link href="/crm/contacts" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Contacts</Link>
                      <Link href="/crm/pipeline" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Pipeline</Link>
                    </div>
                  )}
                </div>

                {/* Admin Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown('admin')}
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    <span>Admin</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {openDropdown === 'admin' && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                      <Link href="/admin/portal" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</Link>
                      <Link href="/admin/analytics" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Analytics</Link>
                      <Link href="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</Link>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 font-medium"
                >
                  Logout
                </button>
              </>
            )}

            {!isLoggedIn && (
              <a
                href="/login"
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                Sign In
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full pt-20 px-6 pb-6 overflow-y-auto">
          
          {/* Products Section */}
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Products</h3>
            <div className="space-y-1">
              <Link 
                href="/products/call-intelligence" 
                className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="font-semibold text-gray-900">AI Call Agent</div>
                <div className="text-sm text-gray-500">24/7 voice receptionist</div>
              </Link>
              <Link 
                href="/products/click-to-call" 
                className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="font-semibold text-gray-900">Click-to-Call</div>
                <div className="text-sm text-gray-500">One-click dialing</div>
              </Link>
              <Link 
                href="/products/follow-up-autopilot" 
                className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="font-semibold text-gray-900">Follow-Up Autopilot</div>
                <div className="text-sm text-gray-500">Automated follow-ups</div>
              </Link>
              <Link 
                href="/video" 
                className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="font-semibold text-gray-900">Video Calls</div>
                <div className="text-sm text-gray-500">HD video conferencing</div>
              </Link>
            </div>
          </div>

          {isLoggedIn && (
            <>
              {/* CRM Section */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">CRM</h3>
                <div className="space-y-1">
                  <Link 
                    href="/crm/leads" 
                    className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Leads
                  </Link>
                  <Link 
                    href="/crm/contacts" 
                    className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contacts
                  </Link>
                  <Link 
                    href="/crm/pipeline" 
                    className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Pipeline
                  </Link>
                </div>
              </div>

              {/* Admin Section */}
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Admin</h3>
                <div className="space-y-1">
                  <Link 
                    href="/admin/portal" 
                    className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/admin/analytics" 
                    className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Analytics
                  </Link>
                  <Link 
                    href="/settings" 
                    className="block px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-gray-900"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Settings
                  </Link>
                </div>
              </div>
            </>
          )}

          {/* CTA Buttons */}
          <div className="mt-auto space-y-3 pt-6 border-t border-gray-200">
            {!isLoggedIn ? (
              <>
                <a
                  href="/login"
                  className="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-center hover:bg-blue-700 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </a>
                <a
                  href="/calendar"
                  className="block w-full border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold text-center hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Demo
                </a>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="block w-full border-2 border-red-200 text-red-600 px-6 py-3 rounded-lg font-semibold text-center hover:bg-red-50 transition-colors"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
