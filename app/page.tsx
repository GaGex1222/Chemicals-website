'use client'
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Users, Package, Mail, Book, Sparkle, Phone, SprayCan, Beaker, Leaf, Dna, Shield, Droplets, Syringe, TreePine, ChevronRight, X, Menu, ArrowDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {

  name: string;
  description: string;
  icon: React.ReactNode;
  keyRawMaterials: string[];
  applications: string[];
}

import type { Variants } from 'framer-motion';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const slideRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [submissionStatus, setSubmissionStatus] = useState<{ status: '' | 'error' | 'success'; message: string }>({ status: '', message: '' });

  const sectionRefs = {
    home: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    products: useRef<HTMLElement>(null),
    contact: useRef<HTMLElement>(null),
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: keyof typeof sectionRefs) => {
    sectionRefs[id].current?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fields.name.trim() || !fields.email.trim() || !fields.message.trim()) {
      setSubmissionStatus({ status: 'error', message: 'Please fill in all fields.' });
      return;
    }
    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        body: JSON.stringify({ name: fields.name, email: fields.email, content: fields.message }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) {
        setSubmissionStatus({ status: 'success', message: 'Thank you! Your message was sent successfully.' });
        setFields({ name: '', email: '', message: '' });
      } else {
        setSubmissionStatus({ status: 'error', message: 'Something went wrong. Please try again.' });
      }
    } catch {
      setSubmissionStatus({ status: 'error', message: 'Network error. Please try again later.' });
    }
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    if (submissionStatus.status) setSubmissionStatus({ status: '', message: '' });
  };

  const products: Product[] = useMemo(() => [
    {
      name: 'Surfactants',
      description: 'High-performance surfactants ensuring effective cleaning, emulsifying, and foaming.',
      icon: <Droplets className="w-7 h-7 text-blue-600" />,
      keyRawMaterials: ['Sodium Lauryl Ether Sulfate (SLES)', 'Cocamidopropyl Betaine (CAPB)', 'Alkyl Polyglucosides (APG)', 'Sodium Coco-Sulfate (SCS)'],
      applications: ['Shampoos', 'Liquid soaps', 'Dishwashing liquids', 'Laundry Detergents', 'Industrial Cleaners'],
    },
    {
      name: 'Specialty Esters',
      description: 'Premium esters improving texture, stability, and sensory feel in cosmetic formulations.',
      icon: <Syringe className="w-7 h-7 text-blue-600" />,
      keyRawMaterials: ['Isopropyl Myristate (IPM)', 'C12-15 Alkyl Benzoate', 'Caprylic/Capric Triglyceride', 'Glyceryl Stearate'],
      applications: ['Skin creams', 'Sunscreens', 'Serums', 'Lipsticks', 'Hair Conditioners'],
    },
    {
      name: 'Natural Emollients',
      description: 'Eco-friendly emollients from renewable sources for moisturizing and conditioning.',
      icon: <Leaf className="w-7 h-7 text-blue-600" />,
      keyRawMaterials: ['Shea Butter', 'Jojoba Oil Esters', 'Squalane (plant-based)', 'Oat Kernel Oil'],
      applications: ['Body lotions', 'Baby care', 'Natural cosmetics', 'Massage Oils', 'Stretch Mark Creams'],
    },
    {
      name: 'Polymers',
      description: 'Functional polymers enhancing thickening, stabilization, and film-forming.',
      icon: <Dna className="w-7 h-7 text-blue-600" />,
      keyRawMaterials: ['Carbomer', 'Acrylates Copolymer', 'Xanthan Gum', 'Polyquaternium-10'],
      applications: ['Gels', 'Shampoos', 'Hand sanitizers', 'Hair styling products', 'Sun Care'],
    },
    {
      name: 'Antimicrobials',
      description: 'Advanced systems for microbial protection meeting global regulatory standards.',
      icon: <Shield className="w-7 h-7 text-blue-600" />,
      keyRawMaterials: ['Phenoxyethanol', 'Ethylhexylglycerin', 'Sodium Benzoate', 'Potassium Sorbate'],
      applications: ['Cosmetics', 'Wet wipes', 'Detergents', 'Creams', 'Body Washes'],
    },
    {
      name: 'Fragrance Compounds',
      description: 'Custom-designed fragrances and aroma compounds to elevate product identity.',
      icon: <SprayCan className="w-7 h-7 text-blue-600" />,
      keyRawMaterials: ['Limonene', 'Linalool', 'Natural essential oils', 'Aroma Chemicals'],
      applications: ['Home care', 'Laundry', 'Personal care', 'Fine Fragrances', 'Diffusers'],
    },
  ], []);

  const navLinks = [
    { label: 'Home', id: 'home' as const },
    { label: 'About Us', id: 'about' as const },
    { label: 'Products', id: 'products' as const },
    { label: 'Contact', id: 'contact' as const },
  ];

  return (
    <div className="min-h-screen bg-white font-sans antialiased">

      {/* ── NAVBAR ── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <img src="/logo.png" alt="NEWCHEM" className="h-14 w-auto" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-blue-600 ${scrolled ? 'text-gray-700' : 'text-white'}`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('contact')}
              className="ml-2 px-5 py-2 bg-blue-600 text-white text-sm font-semibold rounded-full hover:bg-blue-700 transition-colors"
            >
              Get in Touch
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button onClick={() => setIsMenuOpen(v => !v)} className={`md:hidden p-2 rounded-lg ${scrolled ? 'text-gray-800' : 'text-white'}`}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-t border-gray-100 shadow-lg px-6 py-4 flex flex-col gap-3"
            >
              {navLinks.map(link => (
                <button key={link.id} onClick={() => scrollTo(link.id)} className="text-left text-gray-700 font-medium py-2 hover:text-blue-600 transition-colors border-b border-gray-50">
                  {link.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO ── */}
      <section ref={sectionRefs.home} id="home" className="relative min-h-screen flex items-center justify-start overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover" >
          <source src="/women.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        <div className="relative z-10 max-w-6xl mx-auto px-8 py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-xl"
          >
            <motion.p variants={fadeUp} className="text-blue-400 text-sm font-semibold tracking-widest uppercase mb-4">
              Science Meets Sustainability
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              NEWCHEM – Shaping the Future of Chemistry
            </motion.h1>
            <motion.p variants={fadeUp} className="text-gray-300 text-lg leading-relaxed mb-10">
              We bring innovative and sustainable raw materials to the Home and Personal Care industry — combining scientific expertise with global reliability.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo('products')}
                className="px-7 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors shadow-lg"
              >
                Explore Products
              </button>
              <button
                onClick={() => scrollTo('about')}
                className="px-7 py-3 border border-white/50 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                Learn More
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 cursor-pointer"
          onClick={() => scrollTo('about')}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="bg-blue-600 py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-3 gap-8 text-center text-white">
          {[
            { value: '10+', label: 'Years of Expertise' },
            { value: '50+', label: 'Global Partners' },
            { value: 'Top 500', label: 'Ranked Company' },
          ].map(stat => (
            <motion.div
              key={stat.label}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="text-4xl md:text-5xl font-extrabold">{stat.value}</p>
              <p className="text-blue-200 text-sm mt-1 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section ref={sectionRefs.about} id="about" className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            {/* Text */}
            <div className="space-y-8">
              <motion.div variants={slideLeft}>
                <p className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">Who We Are</p>
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight flex items-center gap-3">
                  Our Story <Book className="w-8 h-8 text-blue-600" />
                </h2>
              </motion.div>
              <motion.p variants={slideLeft} className="text-gray-600 text-lg leading-relaxed">
                Founded by industry veterans with over 15 years of experience, NEWCHEM has become one of Israel&apos;s most trusted chemical trading companies. Born from a vision to bring innovation, transparency, and global reliability to the local market, we specialize in supplying both traditional and green raw materials.
              </motion.p>
              <motion.p variants={slideLeft} className="text-gray-600 text-lg leading-relaxed">
                Every ingredient we deliver is designed to enhance performance and quality, while minimizing our environmental footprint.
              </motion.p>
              <motion.button
                variants={slideLeft}
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-colors"
              >
                Get in Touch <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Image + Vision */}
            <div className="space-y-8">
              <motion.div variants={slideRight} className="rounded-2xl overflow-hidden shadow-xl aspect-video">
                <img src="/chemical.jpeg" alt="NEWCHEM Laboratory" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div variants={slideRight} className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  Our Vision <Sparkle className="w-5 h-5 text-blue-600" />
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  To lead the transformation toward a greener, smarter chemical industry — combining scientific excellence with AI-driven analytics to forecast demand, optimize supply chains, and identify eco-friendly sourcing options.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section ref={sectionRefs.products} id="products" className="py-28 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">Portfolio</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Our Products</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-lg max-w-2xl mx-auto">
              A diverse portfolio of specialty ingredients for the home and personal care industry. Click any product to learn more.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {products.map((product, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                onClick={() => setSelectedProduct(product)}
                className="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 cursor-pointer transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 transition-colors">
                  {product.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed flex-1">{product.description}</p>
                <div className="mt-5 flex items-center text-blue-600 text-sm font-semibold group-hover:gap-2 gap-1 transition-all">
                  View Details <ChevronRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Product sidebar */}
        <AnimatePresence>
          {selectedProduct && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                onClick={() => setSelectedProduct(null)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 250 }}
                className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                        {selectedProduct.icon}
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">{selectedProduct.name}</h2>
                    </div>
                    <button onClick={() => setSelectedProduct(null)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-gray-600 leading-relaxed mb-8">{selectedProduct.description}</p>

                  <div className="space-y-6">
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                      <h3 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
                        <Beaker className="w-5 h-5" /> Key Raw Materials
                      </h3>
                      <ul className="space-y-2">
                        {selectedProduct.keyRawMaterials.map((m, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                            {m}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                      <h3 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
                        <TreePine className="w-5 h-5" /> Applications
                      </h3>
                      <ul className="space-y-2">
                        {selectedProduct.applications.map((a, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </section>

      {/* ── CONTACT ── */}
      <section ref={sectionRefs.contact} id="contact" className="py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.p variants={fadeUp} className="text-blue-600 text-sm font-semibold tracking-widest uppercase mb-3">Reach Out</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Get in Touch</motion.h2>
            <motion.p variants={fadeUp} className="text-gray-500 text-lg max-w-xl mx-auto">
              We&apos;d love to hear from you. Send us a message and we&apos;ll get back to you as soon as possible.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Info panel */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideLeft}
              className="lg:col-span-2 bg-blue-600 rounded-2xl p-10 text-white space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-2">Contact Information</h3>
                <p className="text-blue-200 text-sm leading-relaxed">Fill out the form and our team will get back to you within 24 hours.</p>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-blue-300 uppercase tracking-wide font-semibold mb-1">Email</p>
                  <a href="mailto:Info@newchemi.com" className="text-white hover:text-blue-200 transition-colors font-medium">
                    Info@newchemi.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-blue-300 uppercase tracking-wide font-semibold mb-1">Phone</p>
                  <a href="tel:+972543373301" className="text-white hover:text-blue-200 transition-colors font-medium">
                    +972 54-337-3301
                  </a>
                </div>
              </div>

              {/* Decorative circles */}
              <div className="relative h-28 mt-4">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/30 rounded-full" />
                <div className="absolute bottom-4 right-4 w-20 h-20 bg-blue-400/30 rounded-full" />
              </div>
            </motion.div>

            {/* Form */}
            <motion.form
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
              onSubmit={onFormSubmit}
              className="lg:col-span-3 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-semibold text-gray-700">Your Name</label>
                  <input
                    id="name" name="name" type="text"
                    value={fields.name} onChange={handleFieldChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </motion.div>
                <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-700">Email Address</label>
                  <input
                    id="email" name="email" type="email"
                    value={fields.email} onChange={handleFieldChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </motion.div>
              </div>

              <motion.div variants={fadeUp} className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-semibold text-gray-700">Message</label>
                <textarea
                  id="message" name="message"
                  value={fields.message} onChange={handleFieldChange}
                  placeholder="Tell us about your project or inquiry..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </motion.div>

              {submissionStatus.status && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`px-4 py-3 rounded-xl text-sm font-medium border ${submissionStatus.status === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}
                >
                  {submissionStatus.message}
                </motion.div>
              )}

              <motion.button
                variants={fadeUp}
                type="submit"
                className="w-full py-3.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-sm"
              >
                Send Message
              </motion.button>
            </motion.form>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-gray-900 text-gray-400 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src="/logo.png" alt="NEWCHEM" className="h-10 opacity-80" />
          <p className="text-sm">© {new Date().getFullYear()} NEWCHEM. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            {navLinks.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="hover:text-white transition-colors">
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
