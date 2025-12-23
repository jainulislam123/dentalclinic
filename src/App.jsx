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
  Activity,
  Heart,
  Plus,
  Trash2,
  Edit2,
  Lock,
  Share2,
  LogOut,
  Upload,
  AlertTriangle,
  Info,
  LogIn,
  Link as LinkIcon,
} from "lucide-react";

// --- Firebase Imports ---
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, onSnapshot } from "firebase/firestore";

// --- Error Boundary Component ---
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("App Crash:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-6 text-center">
          <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg border border-red-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Something went wrong
            </h2>
            <p className="text-gray-500 mb-6">
              The application crashed. Error details below:
            </p>
            <div className="bg-gray-900 text-red-300 p-4 rounded-xl text-left text-xs font-mono overflow-auto mb-6 max-h-40">
              {this.state.error?.toString()}
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-600 transition-all"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- Data Fallback (Default Data) ---
const initialPortfolio = [
  {
    id: 1,
    title: "Veneers",
    subtitle: "Cosmetic",
    img: "https://i.postimg.cc/brmHM73W/unnamed.jpg",
  },
  {
    id: 2,
    title: "Whitening",
    subtitle: "Brightening",
    img: "https://i.postimg.cc/sDKKMJ1M/Whiting.png",
  },
  {
    id: 3,
    title: "Aligners",
    subtitle: "Orthodontics",
    img: "https://i.postimg.cc/50s9KGcd/IMG_20251211_WA0020.jpg",
  },
  {
    id: 4,
    title: "Root Canal (RCT)",
    subtitle: "Endodontics",
    img: "https://i.postimg.cc/TYzdsgs7/IMG_20251211_WA0018.jpg",
  },
  {
    id: 5,
    title: "Dental Implants",
    subtitle: "Restoration",
    img: "https://i.postimg.cc/L61Rjhsf/IMG_20251211_WA0024.jpg",
  },
  {
    id: 6,
    title: "Dental Crowns",
    subtitle: "Prosthodontics",
    img: "https://i.postimg.cc/85XDm6W1/IMG_20251211_WA0027.jpg",
  },
];

// --- Components ---

const Navbar = ({ onViewChange, currentView }) => {
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

  const handleNavClick = (e, href, name) => {
    e.preventDefault();
    if (currentView === "admin") {
      onViewChange("home");
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.querySelector(href);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
    setActiveTab(name);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || currentView === "admin"
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
                {activeTab === link.name && currentView !== "admin" && (
                  <motion.div
                    layoutId="underline"
                    className="absolute inset-0 bg-teal-50 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            ))}

            {/* Admin Button */}
            <button
              onClick={() =>
                onViewChange(currentView === "admin" ? "home" : "admin")
              }
              className={`ml-4 px-4 py-2 rounded-full font-medium transition-all flex items-center gap-2 ${
                currentView === "admin"
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-slate-200 text-slate-700 hover:bg-slate-300"
              }`}
            >
              {currentView === "admin" ? (
                <LogOut className="w-4 h-4" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              {currentView === "admin" ? "Exit Admin" : "Admin"}
            </button>

            <button className="ml-2 bg-slate-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-slate-800 transition-all transform hover:scale-105 shadow-xl shadow-slate-200 hover:shadow-slate-300">
              <a href="tel:+918918796858">Book Call</a>
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
              <div className="pt-4 px-2 space-y-3">
                <button
                  onClick={() => {
                    onViewChange(currentView === "admin" ? "home" : "admin");
                    setIsOpen(false);
                  }}
                  className="w-full bg-slate-200 text-slate-800 px-5 py-3 rounded-xl font-bold"
                >
                  {currentView === "admin" ? "Exit Admin Panel" : "Admin Panel"}
                </button>
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

// --- Admin Component ---
const AdminPanel = ({ items, onSave, isConfigured, authError }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [newItem, setNewItem] = useState({ title: "", subtitle: "", img: "" });
  const [editMode, setEditMode] = useState(null);

  // Safeguard check
  const safeItems = Array.isArray(items) ? items : [];

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "toffa@shop") {
      setIsAuthenticated(true);
    } else {
      alert("Wrong Password! remember!!!'");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500000) {
        alert("File too large! Please use an image smaller than 500KB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, img: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImageUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 500000) {
        alert("File too large! Please use an image smaller than 500KB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const newItems = safeItems.map((i) =>
          i.id === id ? { ...i, img: reader.result } : i
        );
        onSave(newItems);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newItem.title || !newItem.img)
      return alert("Title and Image are required!");

    const item = {
      id: Date.now(),
      ...newItem,
    };
    onSave([...safeItems, item]);
    setNewItem({ title: "", subtitle: "", img: "" });

    if (isConfigured) {
      alert("New Portfolio Item Added & Synced!");
    } else {
      alert(
        "Item added locally (Demo Mode). Configure Firebase to save permanently."
      );
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      onSave(safeItems.filter((item) => item.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-20">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-slate-100">
          <div className="flex justify-center mb-6">
            <div className="bg-red-100 p-4 rounded-full">
              <Lock className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-6">
            Admin Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter PIN (1234)"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-all">
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Portfolio Manager
          </h1>
          <div
            className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 ${
              isConfigured
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {isConfigured ? (
              <CheckCircle className="w-4 h-4" />
            ) : (
              <AlertTriangle className="w-4 h-4" />
            )}
            {isConfigured
              ? "Logged In (Firebase Live)"
              : "Demo Mode (Not Connected)"}
          </div>
        </div>

        {/* --- Error Warning --- */}
        {!isConfigured && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700 font-bold">
                  Connection Issue:
                </p>
                <p className="text-sm text-yellow-700">
                  {authError
                    ? `Auth Error: ${authError}`
                    : "Firebase not configured or auth failed."}
                </p>
                {authError &&
                  (authError.includes("auth/operation-not-allowed") ||
                    authError.includes("auth/configuration-not-found") ||
                    authError.includes("auth/unauthorized-domain")) && (
                    <div className="text-sm text-red-600 mt-2 font-bold space-y-1">
                      <p>
                        👉 Step 1: Go to Firebase Console &gt; Authentication
                        &gt; Get Started &gt; Enable "Anonymous".
                      </p>
                      <p>
                        👉 Step 2: Go to Authentication &gt; Settings &gt;
                        Authorized Domains &gt; Add your GitHub domain (e.g.
                        yourname.github.io).
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>
        )}

        {/* Add New Item Form */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-10">
          <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-teal-500" /> Add New Item
          </h3>
          <form onSubmit={handleAdd} className="grid md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Title (e.g. Dental Implants)"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={newItem.title}
              onChange={(e) =>
                setNewItem({ ...newItem, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Subtitle (e.g. Surgery)"
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={newItem.subtitle}
              onChange={(e) =>
                setNewItem({ ...newItem, subtitle: e.target.value })
              }
            />

            {/* Image Selection Area */}
            <div className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  id="file-upload"
                  className="hidden"
                  onChange={handleImageUpload}
                />
                <label
                  htmlFor="file-upload"
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors text-slate-500 text-sm h-[42px] overflow-hidden"
                >
                  <Upload className="w-4 h-4" />
                  {newItem.img
                    ? newItem.img.startsWith("data:")
                      ? "Image Uploaded"
                      : "Image Linked"
                    : "Upload Image"}
                </label>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-bold uppercase">
                  OR
                </span>
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Paste Image URL..."
                    className="w-full pl-9 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                    value={
                      newItem.img && !newItem.img.startsWith("data:")
                        ? newItem.img
                        : ""
                    }
                    onChange={(e) =>
                      setNewItem({ ...newItem, img: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <button className="md:col-span-3 bg-teal-500 text-white py-3 rounded-lg font-bold hover:bg-teal-600 shadow-md transition-all mt-2">
              {isConfigured ? "Add to Live Portfolio" : "Add to Demo Portfolio"}
            </button>
          </form>
        </div>

        {/* List Items */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safeItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 group"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white font-medium text-sm px-2 text-center">
                    {item.title}
                  </span>
                </div>
              </div>
              <div className="p-4">
                {editMode === item.id ? (
                  <div className="space-y-3">
                    <input
                      className="w-full border p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                      placeholder="Title"
                      value={item.title}
                      onChange={(e) => {
                        const newItems = safeItems.map((i) =>
                          i.id === item.id ? { ...i, title: e.target.value } : i
                        );
                        onSave(newItems);
                      }}
                    />
                    <input
                      className="w-full border p-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                      placeholder="Subtitle"
                      value={item.subtitle}
                      onChange={(e) => {
                        const newItems = safeItems.map((i) =>
                          i.id === item.id
                            ? { ...i, subtitle: e.target.value }
                            : i
                        );
                        onSave(newItems);
                      }}
                    />

                    {/* Edit Image Options */}
                    <div className="space-y-2">
                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          id={`edit-file-${item.id}`}
                          className="hidden"
                          onChange={(e) => handleEditImageUpload(e, item.id)}
                        />
                        <label
                          htmlFor={`edit-file-${item.id}`}
                          className="flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded cursor-pointer hover:bg-slate-50 text-xs text-slate-500 w-full"
                        >
                          <Upload className="w-3 h-3" /> Upload New File
                        </label>
                      </div>
                      <div className="relative">
                        <LinkIcon className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                        <input
                          className="w-full border pl-7 pr-2 py-2 rounded text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                          placeholder="Or Paste Link"
                          value={
                            item.img && !item.img.startsWith("data:")
                              ? item.img
                              : ""
                          }
                          onChange={(e) => {
                            const newItems = safeItems.map((i) =>
                              i.id === item.id
                                ? { ...i, img: e.target.value }
                                : i
                            );
                            onSave(newItems);
                          }}
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => setEditMode(null)}
                      className="bg-green-500 text-white px-3 py-2 rounded text-sm w-full font-bold hover:bg-green-600 transition-colors"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-bold text-lg text-slate-900 truncate">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm truncate">
                      {item.subtitle}
                    </p>
                  </>
                )}

                {editMode !== item.id && (
                  <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                    <button
                      onClick={() => setEditMode(item.id)}
                      className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-600 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                    >
                      <Edit2 className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-600 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Website Sections ---

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
              <a
                className="flex items-center justify-center gap-2 bg-slate-900 text-white px-18 py-4 rounded-full font-bold hover:bg-slate-800 transition-all hover:gap-4 shadow-xl shadow-slate-200 hover:shadow-2xl active:scale-95"
                href="https://maps.app.goo.gl/dNYSmq6yjmxPgjCn9"
                target="blank"
              >
                {" "}
                <button className="flex items-center gap-2">
                  Book Visit
                  <ArrowRight className="w-5 h-5" />
                </button>{" "}
              </a>
              <a
                className="flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-bold hover:border-teal-500 hover:text-teal-600 transition-all shadow-sm hover:shadow-md active:scale-95"
                href="https://wa.me/8918796858"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="flex items-center gap-2">
                  Connect to Whatsapp <LogIn />
                </button>
              </a>
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
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://i.postimg.cc/RZMRZZ3v/Whats-App-Image-2025-12-15-at-6-28-36-PM.jpg"
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
            <span className="text-teal-500 font-bold tracking-wider uppercase bg-teal-50 px-3 py-1 rounded-full text-2xl">
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
    {
      icon: Calendar,
      title: "Extractions",
      desc: "Safe and comfortable tooth extraction procedures when restoration isn't possible.",
    },
    {
      icon: Smile,
      title: "Dentures & Bridges",
      desc: "Custom-fitted dentures and bridges to restore your smile and ability to chew comfortably.",
    },
    {
      icon: Stethoscope,
      title: "Oral Surgery",
      desc: "Specialized surgical procedures for complex dental issues, performed with care.",
    },
    {
      icon: ShieldCheck,
      title: "Bonding",
      desc: "Quick and effective repair for chipped or cracked teeth using composite resin.",
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

const Portfolio = ({ items }) => {
  const [shareMsg, setShareMsg] = useState("");

  // Safeguard against non-array items
  const displayItems = Array.isArray(items) ? items : [];
  const handleShare = (item) => {
    // Simulating a shareable link
    const text = `Check out this amazing ${item.title} result from City Smile Dental Clinic!`;
    if (navigator.share) {
      navigator
        .share({
          title: item.title,
          text: text,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(`${text} ${window.location.href}`);
      setShareMsg("Link Copied!");
      setTimeout(() => setShareMsg(""), 2000);
    }
  };

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
            {shareMsg ? (
              <span className="text-teal-500">{shareMsg}</span>
            ) : (
              "View All Cases"
            )}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {displayItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
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
                <div className="flex justify-between items-end">
                  <div>
                    <div className="bg-teal-500 w-12 h-1 mb-4 rounded-full origin-left transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    <h4 className="text-white text-2xl font-bold">
                      {item.title}
                    </h4>
                    <p className="text-teal-300 text-sm font-medium mt-1">
                      {item.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(item);
                    }}
                    className="bg-white/20 p-2 rounded-full hover:bg-white/40 transition-colors text-white"
                    title="Share this result"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
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
    event.preventDefault();
    setSubmitting(true);
    const formData = new FormData(event.target);

    try {
      const response = await fetch("", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
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
                      Buniadpur, New Bus Stand Beside Popular Drag House,
                      Dakshin Dinajpur, 733121
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
                      Mon - Sat: 9AM - 9PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

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
              <a href="https://www.facebook.com/profile.php?id=61578930450958">
                <Facebook className="w-5 h-5" />
              </a>
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
          <a href="https://jaihosolution.netlify.app/">Jaihosolution</a>
        </p>
      </div>
    </div>
  </footer>
);

// --- Main App Component ---

const DentalClinic = () => {
  const [view, setView] = useState("home");
  const [portfolioItems, setPortfolioItems] = useState(initialPortfolio);
  const [user, setUser] = useState(null);
  const [isConfigured, setIsConfigured] = useState(false);
  const [authError, setAuthError] = useState(null);

  // Initialize Firebase Safely
  useEffect(() => {
    const initFirebase = async () => {
      // 👇👇👇 YOUR HARDCODED CONFIG 👇👇👇
      // IMPORTANT: Variable name changed back to 'productionConfig' to match logic below
      const productionConfig = {
        apiKey: "AIzaSyAZxojzW9HT83hvINZjUQrrm1YxKGW0ddA",
        authDomain: "dentalshop-c4b32.firebaseapp.com",
        projectId: "dentalshop-c4b32",
        storageBucket: "dentalshop-c4b32.firebasestorage.app",
        messagingSenderId: "730961871136",
        appId: "1:730961871136:web:c4aa2cc66e010de8e25745",
        measurementId: "G-P5XKXD51N6",
      };

      let configToUse;

      // 1. Determine priority: Hardcoded > Environment
      if (productionConfig.apiKey && productionConfig.apiKey.length > 20) {
        configToUse = productionConfig;
      } else if (typeof __firebase_config !== "undefined") {
        configToUse = JSON.parse(__firebase_config);
      } else {
        console.warn("No valid Firebase config found.");
        return;
      }

      // 2. Initialize App
      try {
        let app;
        const appName = "dental-clinic"; // Unique name to avoid conflicts with default app

        // Check if the named app is already initialized
        if (getApps().some((a) => a.name === appName)) {
          app = getApp(appName);
        } else {
          // Initialize a named app with YOUR specific configuration
          app = initializeApp(configToUse, appName);
        }

        const auth = getAuth(app);

        // 3. Authenticate
        // Check if we are already signed in to avoid re-triggering auth flow
        onAuthStateChanged(auth, (u) => {
          if (u) {
            setUser(u);
            setIsConfigured(true);
            setAuthError(null);
          } else {
            // Only try to sign in if not signed in
            signInAnonymously(auth).catch((error) => {
              console.warn(
                "Auth Failed (likely pending enabled in console):",
                error
              );

              // Handle specific "auth not enabled" error
              let errorMessage = error.message;
              if (
                error.code === "auth/configuration-not-found" ||
                error.message.includes("configuration-not-found")
              ) {
                errorMessage =
                  "Auth not enabled. Go to Firebase Console -> Authentication -> Get Started.";
              } else if (error.code === "auth/operation-not-allowed") {
                errorMessage =
                  "Anonymous Auth not enabled. Go to Firebase Console -> Authentication -> Sign-in method.";
              } else if (
                error.code === "auth/unauthorized-domain" ||
                error.message.includes("unauthorized-domain")
              ) {
                errorMessage =
                  "Domain not authorized. Go to Firebase Console -> Authentication -> Settings -> Authorized Domains.";
              }

              setAuthError(errorMessage);
              setIsConfigured(false);
            });
          }
        });
      } catch (error) {
        console.error("Firebase Initialization Failed:", error);
        setAuthError(error.message);
        setIsConfigured(false);
      }
    };

    initFirebase();
  }, []);

  // Sync Data
  useEffect(() => {
    if (!user) return; // Wait for auth

    try {
      // IMPORTANT: Get the SPECIFIC named app instance we initialized
      let app;
      try {
        app = getApp("dental-clinic");
      } catch (e) {
        // Fallback (should rarely happen if useEffect runs in order)
        return;
      }

      const db = getFirestore(app);
      // Use Hardcoded App ID for consistency if needed, else fallback
      const appId = "dental-clinic-app"; // Using a consistent ID for your app data

      const unsubscribe = onSnapshot(
        doc(db, "artifacts", appId, "public", "data", "portfolio_list", "main"),
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            if (data.items && Array.isArray(data.items)) {
              setPortfolioItems(data.items);
            }
          }
        },
        (error) => {
          console.error("Data Sync Error:", error);
          if (error.code === "permission-denied") {
            setAuthError("Permission Denied (Check Firestore Rules)");
          }
        }
      );

      return () => unsubscribe();
    } catch (e) {
      console.log("Error setting up listener", e);
    }
  }, [user]);

  const handleSaveItems = async (newItems) => {
    setPortfolioItems(newItems); // Optimistic

    if (!isConfigured || !user) {
      alert(
        "Cannot Save: Firebase is not connected or Auth failed. Check the Admin panel for details."
      );
      return;
    }

    try {
      // IMPORTANT: Get the SPECIFIC named app instance
      const app = getApp("dental-clinic");
      const db = getFirestore(app);
      const appId = "dental-clinic-app";

      await setDoc(
        doc(db, "artifacts", appId, "public", "data", "portfolio_list", "main"),
        { items: newItems }
      );
    } catch (error) {
      console.error("Save error:", error);
      alert(`Failed to save: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      <ErrorBoundary>
        {/* Configuration Warning Banner for Admin */}
        {!isConfigured && view === "admin" && (
          <div className="bg-red-600 text-white px-4 py-2 text-center text-sm font-bold">
            ⚠️ Database Not Connected.
            {authError && (
              <span className="block text-xs mt-1">{authError}</span>
            )}
          </div>
        )}

        {/* GLOBAL ERROR BANNER FOR GITHUB PAGES DEBUGGING - ADDED BY AI */}
        {!isConfigured && authError && view !== "admin" && (
          <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white p-4 text-center text-sm font-bold z-[100] shadow-lg flex items-center justify-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Connection Error: {authError}</span>
            <button
              onClick={() => setView("admin")}
              className="underline ml-2 bg-white/20 px-2 py-1 rounded"
            >
              Fix Now
            </button>
          </div>
        )}

        <Navbar onViewChange={setView} currentView={view} />

        {view === "admin" ? (
          <AdminPanel
            items={portfolioItems}
            onSave={handleSaveItems}
            isConfigured={isConfigured}
            authError={authError}
          />
        ) : (
          <main>
            <Hero />
            <About />
            <Services />
            <Portfolio items={portfolioItems} />
            <Contact />
          </main>
        )}
        {view !== "admin" && <Footer />}
      </ErrorBoundary>
    </div>
  );
};

export default DentalClinic;
