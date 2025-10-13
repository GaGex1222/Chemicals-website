'use client'
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Home, Users, Package, Mail, Book, Sparkle, Phone, MapPin, SprayCan, Beaker, Leaf, Dna, Shield, Droplets, Syringe, TreePine, ChevronRight, X } from 'lucide-react';
import { motion, Variants, AnimatePresence } from 'framer-motion';

// Define the type for a Section object
interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  content: string;
}

// Define the type for a Product object with detailed info
interface Product {
  name: string;
  description: string;
  icon: React.ReactNode;
  keyRawMaterials: string[];
  applications: string[];
}

const App = () => {
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const [activeSection, setActiveSection] = useState<number>(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const scrollDelay = 1000;
  const statusClasses = {
    success: 'bg-green-100 text-green-700 border-green-400',
    error: 'bg-red-100 text-red-700 border-red-400',
  };
  // State to store the selected product's data for the sidebar
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // State to track if the current view is considered "mobile"
  const [isMobile, setIsMobile] = useState(false);
  const mobileBreakpoint = 768;

  const [fields, setFields] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submissionStatus, setSubmissionStatus] = useState<{status: '' | 'error' | 'success', message: string}>({status: '', message: ''})

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("SDDS")
    if (!fields.name.trim() || !fields.email.trim() || !fields.message.trim()) {
      setSubmissionStatus({ status: 'error', message: 'Please fill in all fields.' });
      return;
    }

    try {
      const res = await fetch('/api/email', {
        method: "POST",
        body: JSON.stringify({
          name: fields.name,
          email: fields.email,
          content: fields.message
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.ok) {
        // Condition for successful submission (HTTP status 200-299)
        setSubmissionStatus({ status: 'success', message: 'Thank you! Your email was sent successfully.' });
        setFields({name: '', email: '', message: ''}); // Clear the form fields on success
      } else {
        // Handle API error response (e.g., HTTP status 400 or 500)
        console.log("Error occured")
        setSubmissionStatus({ status: 'error', message: 'An unknown error occurred while sending.' });
      }
    } catch (e){
      console.log("Error occured when tried to fetch email api: ", e)
      setSubmissionStatus({status: "error", message: "Network error occured while trying to contact us, try again later."})
    }

  }

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setFields(prevInfo => ({...prevInfo, [name]: value}))

    if(submissionStatus.status !== ""){
      setSubmissionStatus({status: "", message: ''})
    }
  }

  // SECTION CONTENT
  const sections: Section[] = useMemo(() => [
    { id: 'home', title: "Home", icon: Home, content: "Welcome to our website! We provide innovative and sustainable solutions for your home and personal care needs." },
    { id: 'about', title: "About Us", icon: Users, content: "One of the leading players in the world of surfactants and specialty care ingredients, exclusively focused on catering to the Home and Personal Care industry." },
    { id: 'products', title: "Our Products", icon: Package, content: "Explore our wide range of products, including surfactants and specialty ingredients that are trusted by global brands." },
    { id: 'contact', title: "Contact Us", icon: Mail, content: "" },
  ], []);

  // PRODUCTS PORTFOLIO
  const products: Product[] = useMemo(() => [
    {
      name: "Surfactants",
      description: "High-performance surfactants that ensure effective cleaning, emulsifying, and foaming performance.",
      icon: <Droplets className="w-8 h-8 text-blue-600 mb-2" />,
      keyRawMaterials: ["Sodium Lauryl Ether Sulfate (SLES)", "Cocamidopropyl Betaine (CAPB)", "Alkyl Polyglucosides (APG)", "Sodium Coco-Sulfate (SCS)"],
      applications: ["Shampoos", "Liquid soaps", "Dishwashing liquids", "Laundry Detergents", "Industrial Cleaners"]
    },
    {
      name: "Specialty Esters",
      description: "Premium esters designed to improve texture, stability, and sensory feel in cosmetic and personal care formulations.",
      icon: <Syringe className="w-8 h-8 text-blue-600 mb-2" />,
      keyRawMaterials: ["Isopropyl Myristate (IPM)", "C12-15 Alkyl Benzoate", "Caprylic/Capric Triglyceride", "Glyceryl Stearate"],
      applications: ["Skin creams", "Sunscreens", "Serums", "Lipsticks", "Hair Conditioners"]
    },
    {
      name: "Natural Emollients",
      description: "Eco-friendly and biodegradable emollients derived from renewable sources for moisturizing and conditioning benefits.",
      icon: <Leaf className="w-8 h-8 text-blue-600 mb-2" />,
      keyRawMaterials: ["Shea Butter", "Jojoba Oil Esters", "Squalane (plant-based)", "Oat Kernel Oil"],
      applications: ["Body lotions", "Baby care", "Natural cosmetics", "Massage Oils", "Stretch Mark Creams"]
    },
    {
      name: "Polymers",
      description: "Functional polymers that enhance thickening, stabilization, and film-forming in a wide range of formulations.",
      icon: <Dna className="w-8 h-8 text-blue-600 mb-2" />,
      keyRawMaterials: ["Carbomer", "Acrylates Copolymer", "Xanthan Gum", "Polyquaternium-10"],
      applications: ["Gels", "Shampoos", "Hand sanitizers", "Hair styling products", "Sun Care"]
    },
    {
      name: "Antimicrobials",
      description: "Advanced systems for microbial protection and long-term product stability that meet global regulatory standards.",
      icon: <Shield className="w-8 h-8 text-blue-600 mb-2" />,
      keyRawMaterials: ["Phenoxyethanol", "Ethylhexylglycerin", "Sodium Benzoate", "Potassium Sorbate"],
      applications: ["Cosmetics", "Wet wipes", "Detergents", "Creams", "Body Washes"]
    },
    {
      name: "Fragrance Compounds",
      description: "A rich selection of custom-designed fragrances and aroma compounds to elevate product identity and consumer experience.",
      icon: <SprayCan className="w-8 h-8 text-blue-600 mb-2" />,
      keyRawMaterials: ["Limonene", "Linalool", "Natural essential oils", "Aroma Chemicals"],
      applications: ["Home care", "Laundry", "Personal care", "Fine Fragrances", "Diffusers"]
    },
  ], []);
  
  // Effect for screen size detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Effect for full-page scroll with mobile/sidebar logic
  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      // Disable auto-scroll logic on mobile or when the sidebar is open
      if (isScrolling || selectedProduct || isMobile) return; 

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
  }, [activeSection, sections.length, isScrolling, selectedProduct, isMobile]);

  const handleNavigationClick = (index: number) => {
    setActiveSection(index);
    sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };
  
  const handleCloseSidebar = () => {
    setSelectedProduct(null);
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

  const navItemVariants: Variants = {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };
  
  const sidebarVariants: Variants = {
    closed: { x: "100%", opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } },
    open: { x: 0, opacity: 1, transition: { duration: 0.5, ease: "easeInOut" } },
  };
  
  const backdropVariants: Variants = {
    closed: { opacity: 0, transition: { duration: 0.3 } },
    open: { opacity: 1, transition: { duration: 0.3 } },
  };


  return (
    <div className="relative overflow-hidden w-screen h-screen font-sans">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="fixed top-0 left-0 w-full z-20 rounded-b-xl bg-transparent bg-opacity-90"
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

      <div className={`w-screen h-screen ${isMobile ? 'overflow-y-auto' : ''}`}>
        {sections.map((section: Section, index: number) => (
          <div
            key={section.id}
            ref={el => {
              sectionRefs.current[index] = el;
            }}
            className={`relative flex flex-col items-center justify-center min-h-screen w-full transition-colors duration-500 p-8
              ${isMobile ? 'h-auto py-20' : 'h-screen'} 
              ${index % 2 === 0 && index > 0 ? 'bg-gray-100' : 'bg-gray-200'}
              ${selectedProduct ? 'overflow-hidden' : 'overflow-y-auto'}`}
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
                  NEWCHEM – Where Science Meets Sustainability
                </motion.h1>
                <motion.p variants={fadeIn} className="text-sm md:text-lg leading-relaxed mb-4 md:mb-8">
                  At NEWCHEM, we’re not just importing chemicals — we’re shaping the next generation of sustainable innovation.
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
                <div className={`space-y-6 md:space-y-8 ${activeSection === 1 ? '' : ''}`}>
                  <motion.h2 variants={slideInFromLeft} className="text-3xl flex justify-center md:text-4xl font-bold items-center space-x-2 text-gray-800 border-b-2 border-blue-600 pb-2">
                    <span>Our Story</span> <Book className='h-6 w-6' />
                  </motion.h2>
                  <motion.p variants={slideInFromLeft} className="text-base md:text-xl text-gray-600 leading-relaxed">
                    Founded by industry veterans with over 15 years of experience, NEWCHEM has become one of Israel’s most trusted chemical trading companies.
                    Born from a vision to bring innovation, transparency, and global reliability to the local market, we specialize in supplying both traditional and green raw materials for manufacturers across cosmetics, personal care, home care, and industrial applications.

                    Driven by a strong technical background and long-standing partnerships with world-leading suppliers, we ensure that every molecule we deliver adds real value — in performance, consistency, and sustainability.

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
                      At NEWCHEM, our mission is to lead the transformation toward a greener, smarter chemical industry by combining
                      scientific excellence with advanced data analytics and artificial intelligence to forecast demand, optimize
                      supply chains, and identify the most efficient, eco-friendly sourcing options. We’re not just adapting to
                      global trends — we’re creating them, replacing outdated, environmentally harmful materials with next-generation
                      green chemistry solutions that support our partners’ transition to cleaner production and circular economy models.
                    </motion.p>
                  </div>
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
              // PRODUCTS SECTION
              <>
                <motion.div key={section.id} variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="container mx-auto p-6 md:p-12 bg-white rounded-xl shadow-lg text-center relative z-10">
                  <motion.h1 variants={fadeIn} className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4 md:mb-6 flex items-center justify-center">
                    {section.title} <Package className="h-8 w-8 ml-2 text-blue-600" />
                  </motion.h1>
                  <motion.p variants={fadeIn} className="text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
                    We offer a diverse portfolio of specialty ingredients designed for the home and personal care industry. Click any product to explore the detailed chemistry and applications.
                  </motion.p>
                  <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product: Product, pIndex: number) => (
                      <motion.div
                        key={pIndex}
                        variants={fadeIn}
                        className="bg-gray-50 p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center cursor-pointer transition-shadow duration-300 hover:shadow-xl hover:ring-2 hover:ring-blue-200"
                        onClick={() => handleProductClick(product)}
                      >
                        {product.icon}
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-4">{product.description}</p>
                        
                        <div className="mt-auto flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
                          View Details <ChevronRight className="w-5 h-5 ml-1" />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
                
                <AnimatePresence>
                  {selectedProduct && (
                    <>
                      <motion.div
                        variants={backdropVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="fixed inset-0 backdrop-blur bg-opacity-50 z-30" 
                        onClick={handleCloseSidebar}
                      />

                      <motion.div
                        variants={sidebarVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="fixed top-0 right-0 h-full w-full max-w-sm md:max-w-md bg-white shadow-2xl p-6 md:p-8 z-40 overflow-y-auto"
                      >
                        <div className="flex justify-between items-center border-b pb-4 mb-6">
                          <div className='flex items-center'>
                            {selectedProduct.icon}
                            <h2 className="text-2xl font-bold text-gray-800 ml-3">{selectedProduct.name}</h2>
                          </div>
                          <button onClick={handleCloseSidebar} className="text-gray-500 hover:text-gray-800 transition-colors p-1">
                            <X className="w-6 h-6" />
                          </button>
                        </div>

                        <p className="text-gray-600 mb-8">{selectedProduct.description}</p>
                        
                        <div className="space-y-8">
                          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h3 className="text-lg font-bold text-blue-700 mb-3 flex items-center">
                              <Beaker className="w-5 h-5 mr-2" /> Key Raw Materials
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                              {selectedProduct.keyRawMaterials.map((material, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-blue-500 mr-2">•</span>{material}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                            <h3 className="text-lg font-bold text-green-700 mb-3 flex items-center">
                              <TreePine className="w-5 h-5 mr-2" /> Applications
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-700">
                              {selectedProduct.applications.map((app, i) => (
                                <li key={i} className="flex items-start">
                                  <span className="text-green-500 mr-2">•</span>{app}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </>
            ) : (
              // CONTACT SECTION
              <motion.div key={section.id} variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="container mx-auto p-6 md:p-12 bg-white rounded-xl shadow-lg relative z-10 lg:flex lg:gap-16">
                {/* Left Section (Contact Info) - MODIFIED FOR BLUE BACKGROUND AND WHITE TEXT */}
              <div className="flex-1 flex flex-col items-center text-center space-y-6 bg-blue-600 text-white rounded-lg p-10 
              lg:items-start lg:text-left">                  
                <h2 className="text-4xl font-extrabold text-white">Contact Us</h2> {/* Changed to white */}
                  <p className="text-gray-200 text-lg">
                    We&apos;d love to hear from you. Drop us a message and we&apos;ll get back to you as soon as possible.
                  </p>
                  <div className="text-white flex items-center space-x-3"> {/* Changed to white */}
                    <Mail className="h-5 w-5 text-white" /> {/* Icon changed to white */}
                    <div>
                      <p className="font-semibold">Email:</p>
                      <a href="mailto:hello@example.com" className="text-blue-100 hover:underline"> {/* Link changed to light blue for contrast */}
                        hello@example.com
                      </a>
                    </div>
                  </div>
                  <div className="text-white flex items-center space-x-3"> {/* Changed to white */}
                    <Phone className="h-5 w-5 text-white" /> {/* Icon changed to white */}
                    <div>
                      <p className="font-semibold">Phone:</p>
                      <a href="tel:+1234567890" className="text-blue-100 hover:underline"> {/* Link changed to light blue for contrast */}
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                  <div className="text-white flex items-center space-x-3"> {/* Changed to white */}
                    <MapPin className="h-5 w-5 text-white" /> {/* Icon changed to white */}
                    <div>
                      <p className="font-semibold">Address:</p>
                      <p className="text-blue-100"> {/* Changed to light blue for contrast */}
                        123 Chemical Lane, <br />Science City, SC 45678
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Section (Contact Form) - Unchanged */}
                <div className="flex-1 mt-10 lg:mt-0">
                  <motion.h1 variants={fadeIn} className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6 flex items-center justify-center">
                    Get in Touch <Mail className="h-8 w-8 ml-2" />
                  </motion.h1>
                  <motion.form
                    variants={staggerContainer}
                    initial="initial"
                    whileInView="whileInView"
                    onSubmit={onFormSubmit}
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <motion.div variants={fadeIn}>
                      <label htmlFor="name" className="block text-gray-700 text-sm font-bold text-left">Your Name</label>
                      <input
                        id="name"
                        type="text"
                        name='name'
                        value={fields['name']}
                        onChange={handleFieldChange}
                        placeholder="What should we call you?"
                        className="w-full p-3 bg-gray-50 border text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </motion.div>
                    <motion.div variants={fadeIn}>
                      <label htmlFor="email" className="block text-gray-700 text-sm font-bold text-left">Your Email</label>
                      <input
                        id="email"
                        name='email'
                        type="email"
                        value={fields['email']}    
                        onChange={handleFieldChange}                    
                        placeholder="Your email address"
                        className="w-full p-3 bg-gray-50 border text-gray-800 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </motion.div>
                    <motion.div variants={fadeIn}>
                      <label htmlFor="message" className="block text-gray-700 text-sm font-bold text-left">Your Message</label>
                      <textarea
                        id="message"
                        name='message'
                        placeholder="Tell us about your project or inquiry..."
                        value={fields['message']}
                        onChange={handleFieldChange}
                        rows={4}
                        className="w-full p-3 text-gray-800 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                      ></textarea>
                    </motion.div>
                    {
                      (submissionStatus.status == "error" || submissionStatus.status == "success") && (
                        <div className={`p-3 rounded-lg border text-sm transition-opacity duration-300 ${statusClasses[submissionStatus.status] || 'hidden'}`}>
                          <p className="font-medium">{submissionStatus.message}</p>
                        </div>
                      )
                    }
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

      <div className="fixed right-4 md:right-8 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 md:space-y-4 z-10 hidden md:flex">
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