import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Stethoscope,
  Smile,
  Calendar,
  Phone,
  MapPin,
  Clock,
  ArrowRight,
  ShieldCheck,
  Star,
  Instagram,
  Facebook,
  Twitter,
  User,
  CheckCircle,
} from "lucide-react";

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact Us", href: "#contact" },
  ];

  // Smooth Scroll Function
  const handleNavClick = (e, href, name) => {
    e.preventDefault();
    setActiveTab(name);
    setIsOpen(false);

    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
            onClick={(e) => handleNavClick(e, "#home", "Home")}
          >
            <div className="bg-teal-500 rounded-full shadow-lg shadow-teal-200 overflow-hidden">
              <img
                src="https://i.postimg.cc/x8N2ZZW3/citysmilelogo.png"
                alt="City Smile Logo"
                className="w-12 h-12 object-cover"
              />
            </div>
            <span className="font-bold text-xl md:text-2xl text-slate-800 tracking-tight ">
              City Smile
              <span className="text-teal-500 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
                {" "}
                Dental Clinic
              </span>
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.name)}
                className="relative px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-teal-600 group"
              >
                {activeTab === link.name && (
                  <motion.div
                    layoutId="underline"
                    className="absolute inset-0 bg-teal-50 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            ))}
            <button className="ml-6 bg-slate-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-slate-800 transition-all transform hover:scale-105 shadow-xl shadow-slate-200 hover:shadow-slate-300">
              <a href="tel:+918918796858">Book to Call</a>
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-800 p-2 hover:bg-teal-50 rounded-lg transition-colors focus:outline-none"
            >
              {isOpen ? (
                <X className="h-7 w-7" />
              ) : (
                <Menu className="h-7 w-7" />
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.name)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-slate-700 hover:text-teal-600 hover:bg-teal-50 transition-all"
                >
                  {link.name}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100" />
                </a>
              ))}
              <div className="pt-4 px-2">
                <button className="w-full bg-teal-500 text-white px-5 py-4 rounded-xl font-bold shadow-lg shadow-teal-200 active:scale-95 transition-transform">
                  <a href="tel:+918918796858">Book Appointment</a>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section
      id="home"
      className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-slate-200 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-teal-200 to-transparent opacity-60 pointer-events-none"></div>
      <div className="absolute top-20 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-200/20 blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-200/20 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-teal-100 text-teal-700 text-sm font-bold mb-8 shadow-sm">
              <Star className="w-4 h-4 fill-teal-500 text-teal-500" />
              <span>#1 Rated Dental Clinic 2025</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-[1.1] mb-8 tracking-tight">
              Dental Checkup <br />
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
                  Unforgettable
                </span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-teal-200/50 -z-0"></span>
              </span>{" "}
              Smiles.
            </h1>

            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-lg leading-relaxed">
              Experience modern dentistry with a gentle touch. From cosmetic
              makeovers to routine checkups, we use Digital technology to ensure
              your comfort.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <button className="flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition-all hover:gap-4 shadow-xl shadow-slate-200 hover:shadow-2xl active:scale-95">
                <a href="https://maps.app.goo.gl/dNYSmq6yjmxPgjCn9">
                  Book Visit
                </a>{" "}
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-bold hover:border-teal-500 hover:text-teal-600 transition-all shadow-sm hover:shadow-md active:scale-95">
                View Portfolio
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            <div className="relative w-full max-w-3xl mx-auto">
              <div className="absolute inset-0 bg-teal-500 rounded-[3rem] rotate-6 opacity-10"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl shadow-teal-900/10 border-[6px] border-white">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Professional Dentist"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-1000"
                />

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="absolute bottom-8 left-8 bg-white/95 backdrop-blur px-5 py-4 rounded-2xl shadow-xl border border-white/50 flex items-center gap-4 max-w-[200px]"
                >
                  <div className="bg-green-100 p-2.5 rounded-full shrink-0">
                    <ShieldCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                      Certified
                    </p>
                    <p className="text-slate-800 font-bold text-sm leading-tight">
                      Top 1% Dental Specialists
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="absolute top-8 right-8 bg-white/95 backdrop-blur p-4 rounded-2xl shadow-xl border border-white/50 text-center"
                >
                  <p className="text-2xl font-bold text-teal-600">10+</p>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                    Years Exp.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-teal-100 rounded-full blur-3xl -z-10"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-100%">
              <img
                src="https://i.postimg.cc/Rh0hMm13/IMG_20251211_WA0029.jpg"
                alt="Dental Team"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
              <div className="flex items-center gap-4">
                <div className="bg-teal-50 p-3 rounded-full">
                  <User className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900">2K+</p>
                  <p className="text-sm text-slate-500 font-medium">
                    Happy Patients
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-teal-500 font-bold tracking-wider uppercase  bg-teal-50 px-3 py-1 rounded-full text-2xl">
              With Dr. Tofajjal Hossain And team
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-6 mb-6">
              Your Trusted Dental Care Partner in Buniadpur
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              At City Smile Dental Clinic, we believe that a healthy smile is
              the foundation of confidence. Located conveniently in Buniadpur,
              our clinic is equipped with state-of-the-art technology to provide
              pain-free and precise treatments.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <span className="text-slate-700 font-medium">
                  Modern Digital X-Rays & Diagnostics
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <span className="text-slate-700 font-medium">
                  Certified & Experienced Dentists
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-teal-500 flex-shrink-0" />
                <span className="text-slate-700 font-medium">
                  Comprehensive Care for All Ages
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ icon: Icon, title, desc, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
    whileHover={{ y: -8 }}
    className="bg-white p-8 rounded-3xl shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-teal-100 transition-all border border-gray-100 group cursor-pointer relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50 rounded-bl-[4rem] -mr-4 -mt-4 transition-colors group-hover:bg-teal-500"></div>

    <div className="relative w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-500 transition-colors duration-300">
      <Icon className="w-7 h-7 text-teal-600 group-hover:text-white transition-colors duration-300" />
    </div>

    <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
    <p className="text-slate-500 leading-relaxed mb-6 text-sm">{desc}</p>

    <div className="flex items-center text-teal-600 font-bold text-sm group-hover:gap-2 transition-all">
      Learn More <ArrowRight className="w-4 h-4 ml-1" />
    </div>
  </motion.div>
);

const Services = () => {
  const services = [
    {
      icon: Stethoscope,
      title: "General Dentistry",
      desc: "Routine cleanings, comprehensive exams, and cavity prevention for the whole family.",
    },
    {
      icon: Smile,
      title: "Cosmetic Makeovers",
      desc: "Veneers, teeth whitening, and alignment to give you the perfect Hollywood smile.",
    },
    {
      icon: Calendar,
      title: "Implant Surgery",
      desc: "Permanent, natural-looking solutions for missing teeth using 3D guided technology.",
    },
    {
      icon: ShieldCheck,
      title: "Orthodontics",
      desc: "Invisible aligners and traditional braces to correct bite issues and straightness.",
    },
  ];

  return (
    <section id="services" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-teal-500 font-bold tracking-wider uppercase text-xs bg-teal-50 px-3 py-1 rounded-full">
              Our Expertise
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4 mb-4">
              World Class Dental Services
            </h2>
            <p className="text-slate-600 text-lg">
              We combine art and science to improve your oral health and
              aesthetics with precision.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((s, i) => (
            <ServiceCard key={i} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  return (
    <section id="portfolio" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-xl">
            <span className="text-teal-500 font-bold tracking-wider uppercase text-xs">
              Real Results
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Smile Transformations
            </h2>
          </div>
          <button className="hidden md:flex items-center gap-2 text-slate-700 font-bold hover:text-teal-500 transition-colors group">
            View All Cases{" "}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Veneers",
              subtitle: "Cosmetic",
              img: "https://i.postimg.cc/vTvDbdh3/Gemini-Generated-Image-oxyrnyoxyrnyoxyr.png",
            },
            {
              title: "Whitening",
              subtitle: "Brightening",
              img: "https://i.postimg.cc/sDKKMJ1M/Whiting.png",
            },
            {
              title: "Aligners",
              subtitle: "Orthodontics",
              img: "https://i.postimg.cc/50s9KGcd/IMG_20251211_WA0020.jpg",
            },
            {
              title: "Root Canal (RCT)",
              subtitle: "Endodontics",
              img: "https://i.postimg.cc/TYzdsgs7/IMG_20251211_WA0018.jpg",
            },
            {
              title: "Dental Implants",
              subtitle: "Restoration",
              img: "https://i.postimg.cc/L61Rjhsf/IMG_20251211_WA0024.jpg",
            },
            {
              title: "Dental Crowns",
              subtitle: "Prosthodontics",
              img: "https://i.postimg.cc/85XDm6W1/IMG_20251211_WA0027.jpg",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-3xl aspect-[4/5] shadow-lg cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>

              <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="bg-teal-500 w-12 h-1 mb-4 rounded-full origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                <h4 className="text-white text-2xl font-bold">{item.title}</h4>
                <p className="text-teal-300 text-sm font-medium mt-1">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Updated Contact Component using robust FormData fetch ---
const Contact = () => {
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    // 1. STOP page reload
    event.preventDefault();
    setSubmitting(true);

    // 2. Prepare FormData
    const formData = new FormData(event.target);

    try {
      // 3. Send using fetch (REPLACE YOUR_FORM_ID BELOW)
      const response = await fetch("https://formspree.io/f/manrppno", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setSucceeded(true);
        setSubmitting(false);
        event.target.reset();
      } else {
        const json = await response.json();
        setErrors(json.errors || [{ message: "Something went wrong" }]);
        setSubmitting(false);
      }
    } catch (error) {
      setErrors([{ message: "Network error" }]);
      setSubmitting(false);
    }
  };

  if (succeeded) {
    return (
      <section id="contact" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="bg-teal-50 p-12 rounded-3xl border border-teal-100 shadow-xl inline-block">
            <div className="bg-teal-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-200">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Message Sent!
            </h2>
            <p className="text-slate-600 text-lg">
              Thanks for contacting us. We will get back to you shortly.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-8 text-teal-600 font-bold hover:underline"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 overflow-hidden relative shadow-2xl shadow-slate-200">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500 rounded-full blur-[120px] opacity-20 transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500 rounded-full blur-[80px] opacity-20 transform -translate-x-1/3 translate-y-1/3"></div>

          <div className="grid lg:grid-cols-2 gap-16 relative z-10">
            <div className="text-white">
              <span className="text-teal-400 font-bold tracking-wider uppercase text-xs mb-2 block">
                Contact Us
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready for your new smile?
              </h2>
              <p className="text-slate-300 mb-10 text-lg leading-relaxed">
                Book an appointment online or give us a call. We accept all
                major insurance plans and offer flexible financing.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-5 group">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl group-hover:bg-teal-500/20 group-hover:border-teal-500/50 transition-all">
                    <Phone className="text-teal-400 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">
                      Call Us
                    </p>
                    <p className="text-xl font-bold group-hover:text-teal-400 transition-colors">
                      +91 89187 96858
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-5 group">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl group-hover:bg-teal-500/20 group-hover:border-teal-500/50 transition-all">
                    <MapPin className="text-teal-400 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">
                      Visit Us
                    </p>
                    <p className="text-xl font-bold group-hover:text-teal-400 transition-colors">
                      Buniadpur, Dakshin Dinajpur, 733121
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-5 group">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl group-hover:bg-teal-500/20 group-hover:border-teal-500/50 transition-all">
                    <Clock className="text-teal-400 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm font-medium mb-1">
                      Working Hours
                    </p>
                    <p className="text-xl font-bold group-hover:text-teal-400 transition-colors">
                      Mon - Sat: 9AM - 7PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Note: NO action attribute here. handled by onSubmit */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-8 md:p-10 shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-8">
                Quick Appointment
              </h3>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                      First Name
                    </label>
                    <input
                      name="firstName"
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                      Last Name
                    </label>
                    <input
                      name="lastName"
                      type="text"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-teal-600 transition-all shadow-lg shadow-slate-900/20 mt-2 disabled:opacity-50"
                >
                  {submitting ? "Sending..." : "Submit Request"}
                </button>
                {errors.length > 0 && (
                  <p className="text-red-500 text-center text-sm mt-2">
                    Error sending message. Please try again.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-slate-50 pt-20 pb-10 border-t border-slate-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-teal-500 p-1 rounded-lg">
              <img
                src="https://i.postimg.cc/x8N2ZZW3/citysmilelogo.png"
                alt=""
                width={30}
              />
            </div>
            <span className="font-bold text-xl text-slate-800">
              City Smile Dental Clinic
            </span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Making the world a better place, one smile at a time. Award-winning
            dentistry in the heart of the city.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:bg-teal-500 hover:text-white transition-all cursor-pointer">
              <Instagram className="w-5 h-5" />
            </div>
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:bg-teal-500 hover:text-white transition-all cursor-pointer">
              <Facebook className="w-5 h-5" />
            </div>
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:bg-teal-500 hover:text-white transition-all cursor-pointer">
              <Twitter className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-slate-800 mb-6">Services</h4>
          <ul className="space-y-3 text-sm text-slate-500">
            <li className="hover:text-teal-500 cursor-pointer">
              General Dentistry
            </li>
            <li className="hover:text-teal-500 cursor-pointer">
              Cosmetic Dentistry
            </li>
            <li className="hover:text-teal-500 cursor-pointer">Invisalign</li>
            <li className="hover:text-teal-500 cursor-pointer">Implants</li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-800 mb-6">Company</h4>
          <ul className="space-y-3 text-sm text-slate-500">
            <li className="hover:text-teal-500 cursor-pointer">About Us</li>
            <li className="hover:text-teal-500 cursor-pointer">Careers</li>
            <li className="hover:text-teal-500 cursor-pointer">Blog</li>
            <li className="hover:text-teal-500 cursor-pointer">
              Privacy Policy
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-800 mb-6">Newsletter</h4>
          <p className="text-slate-500 text-sm mb-4">
            Subscribe to get the latest dental tips.
          </p>
          <div className="flex items-center ">
            <input
              type="text"
              placeholder="Email"
              className="bg-white px-4 py-2 rounded-l-lg border border-r-0 border-gray-200 focus:outline-none w-full text-sm"
            />
            <button className="bg-teal-500 text-white px-4 py-2 rounded-r-lg font-medium text-sm hover:bg-teal-600 transition-colors">
              Subscribe
            </button>
          </div>
          <div className="space-y-8 pt-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7814641.366832302!2d76.52271835737758!3d22.323625629674567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fb3b00793393f5%3A0x7e855ed0b95138a3!2sCity%20Smile%20Dental%20Clinic(%20Buniadpur%20new%20bus%20stand)!5e1!3m2!1sen!2sin!4v1765210705559!5m2!1sen!2sin"
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl shadow-lg"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-400 text-sm">
          &copy; 2025 City Smile Dental Clinic. All rights reserved.
        </p>
        <p className="text-slate-400 text-sm flex items-center gap-1">
          Developed by <span className="text-red-400">♥</span> for{" "}
          <a href="https://jaihosolution.website2.me/">Jaihosolution</a>
        </p>
      </div>
    </div>
  </footer>
);

// --- Main App Component ---

const DentalClinic = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default DentalClinic;
