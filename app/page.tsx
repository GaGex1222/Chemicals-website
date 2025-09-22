'use client'
import React, { useState, useRef, useEffect } from 'react';
import { Home, Users, Package, Mail, Book, Sparkle, Phone, MapPin, SprayCan, Beaker, Leaf, Dna, Shield, Droplets } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

// Define the type for a Section object
interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  content: string;
}

// Define the type for a Product object
interface Product {
  name: string;
  description: string;
  icon: React.ReactNode;
}

const App = () => {
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const [activeSection, setActiveSection] = useState<number>(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const scrollDelay = 1000;

  const sections: Section[] = [
    { id: 'home', title: "Home", icon: Home, content: "Welcome to our website! We provide innovative and sustainable solutions for your home and personal care needs." },
    { id: 'about', title: "About Us", icon: Users, content: "One of the leading players in the world of surfactants and specialty care ingredients, exclusively focused on catering to the Home and Personal Care industry." },
    { id: 'products', title: "Our Products", icon: Package, content: "Explore our wide range of products, including surfactants and specialty ingredients that are trusted by global brands." },
    { id: 'contact', title: "Contact Us", icon: Mail, content: "" },
  ];

  const products: Product[] = [
    { name: "Surfactants", description: "High-performance surfactants for effective cleaning and foaming.", icon: <SprayCan className="w-8 h-8 text-blue-600 mb-2" /> },
    { name: "Specialty Esters", description: "Enhance the feel and stability of your personal care formulations.", icon: <Beaker className="w-8 h-8 text-blue-600 mb-2" /> },
    { name: "Natural Emollients", description: "Derived from sustainable sources to nourish and moisturize.", icon: <Leaf className="w-8 h-8 text-blue-600 mb-2" /> },
    { name: "Polymers", description: "Functional polymers for thickening and film-forming applications.", icon: <Dna className="w-8 h-8 text-blue-600 mb-2" /> },
    { name: "Antimicrobials", description: "Protect your products from microbial growth for long-lasting freshness.", icon: <Shield className="w-8 h-8 text-blue-600 mb-2" /> },
    { name: "Fragrance Compounds", description: "A wide variety of captivating scents for a luxurious sensory experience.", icon: <Droplets className="w-8 h-8 text-blue-600 mb-2" /> },
  ];

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (isScrolling) return;

      const direction = event.deltaY > 0 ? 'down' : 'up';
      let newSection = activeSection;

      if (direction === 'down' && activeSection < sections.length - 1) {
        newSection = activeSection + 1;
      } else if (direction === 'up' && activeSection > 0) {
        newSection = activeSection - 1;
      }

      if (newSection !== activeSection) {
        setIsScrolling(true);
        setActiveSection(newSection);
        sectionRefs.current[newSection]?.scrollIntoView({ behavior: 'smooth' });

        setTimeout(() => {
          setIsScrolling(false);
        }, scrollDelay);
      }
    };

    window.addEventListener('wheel', handleScroll);
    return () => {
      window.removeEventListener('wheel', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [activeSection, sections.length, isScrolling]);

  const handleNavigationClick = (index: number) => {
    setActiveSection(index);
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  const staggerContainer: Variants = {
    initial: {},
    whileInView: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const fadeIn: Variants = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const slideInFromLeft: Variants = {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const slideInFromRight: Variants = {
    initial: { opacity: 0, x: 50 },
    whileInView: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  // Add the Variants type to fix the type assignment error
  const navItemVariants: Variants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="relative overflow-hidden w-screen h-screen font-sans">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="fixed top-0 left-0 w-full z-20 rounded-b-xl bg-transparent bg-opacity-80"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center flex-wrap">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="flex items-center">
            <img src="logo.png" alt="Logo" className="h-10 md:h-14" />
          </motion.div>
          <motion.div variants={staggerContainer} initial="initial" animate="animate" className="flex justify-center items-center space-x-2 md:space-x-8 mt-2 md:mt-0">
            {sections.map((section: Section, index: number) => (
              <motion.button
                key={section.id}
                variants={navItemVariants}
                className={`flex items-center space-x-1 md:space-x-2 text-sm md:text-lg font-medium transition-colors duration-300 rounded-full px-2 md:px-4 py-1 md:py-2 
                  ${activeSection === index ? 'text-blue-600' : 'text-gray-800 hover:text-blue-500'}`}
                onClick={() => handleNavigationClick(index)}
              >
                {<section.icon className="h-4 w-4 md:h-5 md:w-5" />}
                <span className="hidden md:inline">{section.title}</span>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.nav>

      <div className="w-screen h-screen">
        {sections.map((section: Section, index: number) => (
          <div
            key={section.id}
            ref={el => {
              sectionRefs.current[index] = el;
            }}
            className={`relative flex flex-col items-center justify-center h-screen w-full transition-colors duration-500 p-8
              ${index % 2 === 0 && index > 0 ? 'bg-gray-100' : 'bg-gray-200'}`}
          >
            {section.id === 'home' && (
              <video
                autoPlay
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
              >
                <source src="/women.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}

            {section.id === 'home' ? (
              <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 lg:left-1/4 transition-all duration-500 rounded-xl p-4 lg:p-12 text-center lg:text-left z-10 text-gray-800 max-w-sm md:max-w-lg w-full">
                <motion.h1 variants={fadeIn} className="text-2xl md:text-4xl font-extrabold mb-2 md:mb-4 leading-tight">
                  INNOVATIVE AND SUSTAINABLE SOLUTIONS TRUSTED BY GLOBAL BRANDS
                </motion.h1>
                <motion.p variants={fadeIn} className="text-sm md:text-lg leading-relaxed mb-4 md:mb-8">
                  Consumer-Centric Solutions that enhances the Performance, Functionality and Quality of your Personal and Home Care Products
                </motion.p>
                <motion.button
                  variants={fadeIn}
                  className="bg-transparent text-gray-800 font-bold border-b border-gray-800 hover:text-gray-600 hover:border-gray-600 transition-colors"
                  onClick={() => handleNavigationClick(1)}
                >
                  Explore Now
                </motion.button>
              </motion.div>
            ) : section.id === 'about' ? (
              <motion.div
                variants={staggerContainer}
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true }}
                className="container mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-6 md:gap-12 p-6 md:p-12 bg-white rounded-xl shadow-lg relative z-10"
              >
                {/* Left column for Our Story */}
                <div className={`space-y-6 md:space-y-8 ${activeSection === 1 ? '' : 'h-12'}`}>
                  <motion.h2 variants={slideInFromLeft} className="text-3xl flex justify-center md:text-4xl font-bold items-center space-x-2 text-gray-800 border-b-2 border-blue-600 pb-2">
                    <span>Our Story</span> <Book className='h-6 w-6' />
                  </motion.h2>
                  <motion.p variants={slideInFromLeft} className="text-base md:text-xl text-gray-600 leading-relaxed">
                    Welcome to **NEWCHEM**. For over a decade, we've been at the forefront of the chemical industry,
                    driven by a singular mission: to provide **innovative and sustainable solutions** for the Home and Personal Care sectors.
                    Born from a passion for chemistry and a commitment to quality, we've grown from a small startup to
                    a leading player trusted by global brands.
                  </motion.p>
                  <motion.p variants={slideInFromLeft} className="text-base md:text-xl text-gray-600 leading-relaxed">
                    Our journey is built on a foundation of scientific excellence and a deep understanding of consumer needs.
                    Every ingredient we develop is designed to enhance the performance, functionality, and quality of your products,
                    all while minimizing our environmental footprint.
                  </motion.p>
                </div>

                <div className="space-y-6 md:space-y-8">
                  <motion.div variants={slideInFromRight} className="relative w-full h-64 md:h-80 bg-gray-300 rounded-lg overflow-hidden shadow-lg">
                    <img src="/chemical.jpeg" alt="NEWCHEM Laboratory" className="object-cover w-full h-full" />
                  </motion.div>
                  <div className="space-y-4 ">
                    <motion.h2
                      variants={slideInFromRight}
                      className="text-2xl md:text-3xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2 flex items-center justify-center space-x-2"
                    >
                      <span>Our Vision</span> <Sparkle className='h-6 w-6' />
                    </motion.h2>
                    <motion.p variants={slideInFromRight} className="text-base md:text-xl text-gray-600 leading-relaxed">
                      We're not just a chemical company; we're a force for positive change.
                      Our vision is to continue pushing the boundaries of what's possible in specialty care ingredients,
                      empowering brands worldwide to create products that are both effective and environmentally responsible.
                    </motion.p>
                  </div>
                  {/* Stats section to add credibility and context */}
                  <motion.div variants={fadeIn} className="flex flex-col md:flex-row justify-around text-center mt-4">
                    <div className="flex flex-col items-center">
                      <p className="text-blue-600 text-3xl md:text-4xl font-extrabold">1</p>
                      <p className="text-gray-600 text-sm md:text-base">Among Top 500 Companies</p>
                    </div>
                    <div className="flex flex-col items-center mt-4 md:mt-0">
                      <p className="text-blue-600 text-3xl md:text-4xl font-extrabold">10+</p>
                      <p className="text-gray-600 text-sm md:text-base">Years of Expertise</p>
                    </div>
                    <div className="flex flex-col items-center mt-4 md:mt-0">
                      <p className="text-blue-600 text-3xl md:text-4xl font-extrabold">50+</p>
                      <p className="text-gray-600 text-sm md:text-base">Global Partners</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ) : section.id === 'products' ? (
              <motion.div key={section.id} variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="container mx-auto p-6 md:p-12 bg-white rounded-xl shadow-lg text-center relative z-10">
                <motion.h1 variants={fadeIn} className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 md:mb-6 flex items-center justify-center">
                  {section.title} <Package className="h-8 w-8 ml-2" />
                </motion.h1>
                <motion.p variants={fadeIn} className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto mb-12">
                  We offer a diverse portfolio of specialty ingredients designed for the home and personal care industry.
                </motion.p>
                <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map((product: Product, pIndex: number) => (
                    <motion.div variants={fadeIn} key={pIndex} className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300">
                      {product.icon}
                      <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                      <p className="text-gray-600">{product.description}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div key={section.id} variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="container mx-auto p-6 md:p-12 bg-white rounded-xl shadow-lg relative z-10 lg:flex lg:gap-16">
                {/* Left Section (Contact Info) */}
                <div className="flex-1 lg:flex lg:flex-col lg:items-start text-center lg:text-left space-y-6 lg:bg-blue-600 lg:text-white lg:rounded-lg lg:p-10">
                  <h2 className="text-4xl font-extrabold text-gray-900 lg:text-white">Contact Us</h2>
                  <p className="text-gray-600 text-lg lg:text-gray-200">
                    We'd love to hear from you. Drop us a message and we'll get back to you as soon as possible.
                  </p>
                  <div className="text-gray-700 lg:text-white flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600 lg:text-white" />
                    <div>
                      <p className="font-semibold">Email:</p>
                      <a href="mailto:hello@example.com" className="text-blue-600 hover:underline lg:text-blue-100">
                        hello@example.com
                      </a>
                    </div>
                  </div>
                  <div className="text-gray-700 lg:text-white flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-600 lg:text-white" />
                    <div>
                      <p className="font-semibold">Phone:</p>
                      <a href="tel:+1234567890" className="text-blue-600 hover:underline lg:text-blue-100">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                  <div className="text-gray-700 lg:text-white flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600 lg:text-white" />
                    <div>
                      <p className="font-semibold">Address:</p>
                      <p className="text-blue-600 lg:text-blue-100">
                        123 Chemical Lane, <br />Science City, SC 45678
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Section (Contact Form) */}
                <div className="flex-1 mt-10 lg:mt-0">
                  <motion.h1 variants={fadeIn} className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 flex items-center justify-center">
                    {section.title} <Mail className="h-8 w-8 ml-2" />
                  </motion.h1>
                  <motion.form
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="whileInView"
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <motion.div variants={fadeIn}>
                      <label htmlFor="name" className="block text-gray-700 text-sm font-bold text-left">Your Name</label>
                      <input
                        id="name"
                        type="text"
                        placeholder="What should we call you?"
                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </motion.div>
                    <motion.div variants={fadeIn}>
                      <label htmlFor="email" className="block text-gray-700 text-sm font-bold text-left">Your Email</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Your email address"
                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </motion.div>
                    <motion.div variants={fadeIn}>
                      <label htmlFor="message" className="block text-gray-700 text-sm font-bold text-left">Your Message</label>
                      <textarea
                        id="message"
                        placeholder="Tell us about your project or inquiry..."
                        rows={4}
                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                      ></textarea>
                    </motion.div>
                    <motion.button
                      variants={fadeIn}
                      type="submit"
                      className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Send Message
                    </motion.button>
                  </motion.form>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 md:space-y-4 z-10">
        {sections.map((_, index: number) => (
          <motion.div
            key={index}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: activeSection === index ? 1.5 : 1, opacity: activeSection === index ? 1 : 0.5 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className={`w-3 h-3 md:w-4 md:h-4 rounded-full cursor-pointer transition-all duration-300
              ${activeSection === index ? 'bg-blue-600 scale-150' : 'bg-gray-400 opacity-50'}`}
            onClick={() => handleNavigationClick(index)}
          ></motion.div>
        ))}
      </div>
    </div>
  );
};

export default App;
