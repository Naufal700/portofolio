import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ArrowDown,
  ChevronRight,
  Sparkles,
  Cpu,
  Code,
  Database,
  Layout,
  Globe,
  Zap,
} from "lucide-react";
import simrs from "./assets/simrs.png";
import jurnal from "./assets/jurnal.png";
import bukubesar from "./assets/buku besar.png";
import neracasaldo from "./assets/Neraca saldo.png";
import neracalajur from "./assets/Neraca Lajur.png";
import pelanggan from "./assets/Pelanggan.png";
import lembarkerja from "./assets/lembar kerja.png";
import keuangan from "./assets/keuangan.png";
import monitoring from "./assets/Monitoring.png";
import detaillk from "./assets/detail lembar kerja.png";
import dashboardkeuangan from "./assets/Dashboard Keuangan.png";
import aruskas from "./assets/Arus kas Direct.png";
import neraca from "./assets/Dashboard Rasio Keuangan.png";
import dashboardrasiokeuangan from "./assets/Dashboard Rasio Keuangan.png";
import closingbulanan from "./assets/closing bulanan.png";

// Type definitions
interface Project {
  title: string;
  desc: string;
  img: string[] | string;
  link?: string;
  technologies: string[];
}

export default function Portofolio() {
  const [darkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, -150]);
  const opacityHero = useTransform(scrollY, [0, 300], [1, 0.3]);
  const scaleHero = useTransform(scrollY, [0, 500], [1, 0.95]);
  
  // Spring animations for smoothness
  const smoothScrollY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const projects: Project[] = [
    {
      title: "Sistem Informasi Manajemen Rumah Sakit",
      desc: "Implementasi sistem informasi manajemen rumah sakit sesuai standar PSAK, dengan fokus pada modul keuangan dan akuntansi yang meliputi pendapatan, piutang, pembelian, utang, kas, persediaan, anggaran, aset tetap, serta pelaporan keuangan.",
      img: [simrs, jurnal, bukubesar, neracasaldo, neracalajur],
      link: "#",
      technologies: [],
    },
    {
      title: "Notasys | Sistem Informasi Manajemen Notaris",
      desc: "Aplikasi berbasis web untuk digitalisasi proses bisnis kantor notaris. Fitur mencakup pengelolaan data klien, lembar kerja, transaksi keuangan, dan pelacakan pekerjaan untuk efisiensi operasional.",
      img: [pelanggan, lembarkerja, keuangan, monitoring, detaillk],
      link: "#",
      technologies: [],
    },
    {
      title: "LEDGIRA | Ledger Information Reporting App",
      desc: "Aplikasi berbasis web untuk memudahkan proses pencatatan transaksi hingga laporan keuangan dengan dashboard analitik yang komprehensif.",
      img: [dashboardkeuangan, aruskas, neraca, dashboardrasiokeuangan, closingbulanan],
      link: "#",
      technologies: [],
    },
  ];

  const handleWhatsApp = () => {
    const url = `https://wa.me/62895417038500?text=Halo,%20saya%20tertarik%20untuk%20berdiskusi%20tentang%20proyek.`;
    window.open(url, "_blank");
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Floating Particles Background
  const ParticleBackground = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-[1px] h-[1px] bg-blue-500/20 rounded-full"
            initial={{
              x: Math.random() * 100 + "vw",
              y: Math.random() * 100 + "vh",
            }}
            animate={{
              x: [null, Math.random() * 100 + "vw"],
              y: [null, Math.random() * 100 + "vh"],
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
        ))}
      </div>
    );
  };

  // Grid Background Pattern
  const GridPattern = () => {
    return (
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/5 to-transparent"></div>
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
    );
  };

  // Animated Tech Icons
  const TechIcons = () => (
    <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-6">
      {[<Cpu size={24} />, <Code size={24} />, <Database size={24} />, <Layout size={24} />, <Globe size={24} />, <Zap size={24} />]
        .map((Icon, i) => (
          <motion.div
            key={i}
            className="p-3 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 shadow-lg"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            <div className="text-blue-400">{Icon}</div>
          </motion.div>
        ))}
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-950">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-6 relative"
          >
            <motion.div
              className="absolute inset-0 border-4 border-cyan-500 border-b-transparent rounded-full"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg font-medium text-gray-300"
          >
            Loading Portfolio...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  // Komponen Slideshow untuk card
  const Slideshow = ({ images }: { images: string[] }) => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % images.length);
      }, 4000);
      return () => clearInterval(interval);
    }, [images.length]);

    return (
      <div className="relative w-full h-full overflow-hidden rounded-t-xl">
        <motion.div
          className="flex w-full h-full"
          animate={{ x: `-${current * 100}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`slide-${i}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </motion.div>

        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "bg-white scale-125" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  // Komponen Slideshow Full Screen
  const FullScreenSlideshow = ({ images }: { images: string[] }) => {
    const [current, setCurrent] = useState(0);

    const nextSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setCurrent((prev) => (prev + 1) % images.length);
    };
    
    const prevSlide = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setCurrent((prev) => (prev - 1 + images.length) % images.length);
    };

    const goToSlide = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setCurrent(index);
    };

    return (
      <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
        <motion.img
          key={current}
          src={images[current]}
          alt={`slide-${current}`}
          className="w-full h-full object-contain"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        />

        {images.length > 1 && (
          <>
            <motion.button
              onClick={prevSlide}
              className="absolute left-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-lg border border-white/10 z-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <motion.button
              onClick={nextSlide}
              className="absolute right-8 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-lg border border-white/10 z-50"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>

            <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-3 z-50">
              {images.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={(e) => goToSlide(i, e)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === current 
                      ? "bg-white scale-125" 
                      : "bg-white/40 hover:bg-white/60"
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>

            <div className="absolute top-8 left-8 bg-black/40 text-white px-4 py-2 rounded-full text-sm backdrop-blur-lg border border-white/10 z-50">
              {current + 1} / {images.length}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      className="bg-gray-950 text-white font-sans scroll-smooth overflow-hidden"
    >
      {/* Background Elements */}
      <GridPattern />
      <ParticleBackground />

      {/* Animated Background Gradient */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 40% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
          ]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />

      {/* HEADER */}
      <motion.header
        className="fixed w-full z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-8">
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => scrollTo("home")}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <Code className="absolute inset-0 m-auto text-white" size={24} />
            </div>
            <motion.h1
              className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
            >
              Naufal<span className="text-white">Dev</span>
            </motion.h1>
          </motion.div>
          
          <ul className="hidden md:flex space-x-8 font-medium">
            {[
              { id: "home", label: "Beranda" },
              { id: "about", label: "Tentang" },
              { id: "project", label: "Proyek" },
              { id: "contact", label: "Kontak" },
            ].map((item) => (
              <motion.li
                key={item.id}
                className="cursor-pointer relative"
                onClick={() => scrollTo(item.id)}
                whileHover={{ scale: 1.1 }}
              >
                <span className={`transition-colors duration-300 ${
                  activeSection === item.id 
                    ? "text-blue-400" 
                    : "text-gray-400 hover:text-white"
                }`}>
                  {item.label}
                </span>
                {activeSection === item.id && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500"
                    layoutId="activeSection"
                  />
                )}
              </motion.li>
            ))}
          </ul>

          <motion.button
            onClick={() => scrollTo("contact")}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Start Project
          </motion.button>
        </nav>
      </motion.header>

      {/* HERO SECTION */}
      <section
        id="home"
        className="min-h-screen relative overflow-hidden flex items-center justify-center"
      >
        <motion.div
          style={{ 
            y: yHero, 
            opacity: opacityHero,
            scale: scaleHero 
          }}
          className="z-10 px-8 max-w-6xl text-center relative"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            {/* Animated Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-800/50 border border-gray-700/50 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Sparkles size={16} className="text-cyan-400" />
              <span className="text-sm text-gray-300">Analyst Akuntansi</span>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent bg-size-200 animate-gradient">
                Muhamad Naufal
              </span>
              <br />
              <span className="text-white">Istikhori</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Spesialis pengembangan sistem informasi akuntansi, ERP, 
              dan solusi bisnis terintegrasi berbasis teknologi modern.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.button
              onClick={() => scrollTo("contact")}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-3"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Mulai Projek Bersama
              <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </motion.button>
            
            <motion.button
              onClick={() => scrollTo("project")}
              className="px-8 py-4 border border-gray-700 bg-gray-900/50 hover:bg-gray-800/50 rounded-xl font-semibold transition-all duration-300 flex items-center gap-3"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Lihat Portfolio</span>
              <ArrowDown size={20} />
            </motion.button>
          </motion.div>

          <motion.div
            className="mt-16 flex space-x-6 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {[
              { icon: <Github size={24} />, href: "https://github.com/Naufal700", label: "GitHub" },
              { icon: <Linkedin size={24} />, href: "https://www.linkedin.com/in/muhamad-naufal-istikhori", label: "LinkedIn" },
              { icon: <Mail size={24} />, href: "mailto:ufalbender700@gmail.com", label: "Email" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-gray-900/50 border border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-800/50 transition-all duration-300 group"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                <div className="text-gray-400 group-hover:text-white transition-colors">
                  {social.icon}
                </div>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <button
            onClick={() => scrollTo("about")}
            className="p-3 rounded-full bg-gray-900/50 border border-gray-700/50 hover:border-blue-500/50 transition-colors"
          >
            <ArrowDown size={24} className="text-blue-400" />
          </button>
        </motion.div>

        <TechIcons />
      </section>

      {/* TENTANG SAYA */}
      <motion.section
        id="about"
        className="py-32 px-8 relative overflow-hidden"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto relative">
          <motion.div
            className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3] 
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />
          
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Tentang
            </span>
            <span className="text-white"> Saya</span>
          </motion.h2>

          <motion.div
            className="grid lg:grid-cols-2 gap-16 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-8">
              <motion.div
                className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 backdrop-blur-sm"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    <Code className="text-blue-400" size={24} />
                  </div>
                  <span>Keahlian Teknis</span>
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Mengembangkan sistem ERP dan aplikasi bisnis terintegrasi dengan fokus pada 
                  skalabilitas, user experience, dan dukungan pengambilan keputusan berbasis data.
                </p>
              </motion.div>

              <motion.div
                className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 backdrop-blur-sm"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/20">
                    <Database className="text-cyan-400" size={24} />
                  </div>
                  <span>Pendekatan Bisnis</span>
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Memahami kebutuhan bisnis secara mendalam dan menerjemahkannya menjadi 
                  solusi digital yang efisien dan memberikan nilai nyata bagi organisasi.
                </p>
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.p
                className="text-xl text-gray-300 leading-relaxed"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Profesional dengan latar belakang{" "}
                <span className="text-blue-400 font-semibold">akuntansi dan sistem informasi</span> 
                {" "}yang memiliki passion dalam pengembangan solusi digital berbasis web.
              </motion.p>
              
              <motion.p
                className="text-xl text-gray-300 leading-relaxed"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Kombinasi keahlian finansial dan teknologi memungkinkan saya untuk 
                menciptakan sistem yang tidak hanya teknis tetapi juga strategis dalam 
                mendukung tujuan bisnis klien.
              </motion.p>
              
              <motion.p
                className="text-xl text-gray-300 leading-relaxed"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Terus beradaptasi dengan teknologi terbaru untuk memberikan solusi 
                yang inovatif dan relevan dengan perkembangan industri digital.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* PROYEK */}
      <motion.section
        id="project"
        className="py-32 px-8 relative"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Project
              </span>
              <span className="text-white"> Saya</span>
            </h2>
          </motion.div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  layout
                  initial={{ opacity: 0, y: 60, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ y: -10 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100 
                  }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`relative rounded-2xl overflow-hidden group cursor-pointer ${
                    hoveredCard === index 
                      ? 'shadow-2xl shadow-blue-500/20' 
                      : 'shadow-xl'
                  }`}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Card Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
                  
                  {/* Animated Border */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100"
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{ backgroundSize: '200% 200%' }}
                  />
                  <div className="absolute inset-[1px] rounded-2xl bg-gray-900" />
                  
                  {/* Image Container */}
                  <div className="relative h-56 overflow-hidden">
                    {Array.isArray(project.img) ? (
                      <Slideshow images={project.img} />
                    ) : (
                      <img
                        src={project.img as string}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* View Project Button */}
                    <motion.button
                      className="absolute top-4 right-4 px-4 py-2 bg-black/50 backdrop-blur-sm rounded-lg text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-white/10"
                      whileHover={{ scale: 1.05 }}
                    >
                      View Details
                    </motion.button>
                  </div>
                  
                  {/* Content */}
                  <div className="relative p-8">
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {project.desc}
                    </p>
                    
                    {/* Tech Tags */}
                    {/* <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                        Web Application
                      </span>
                      <span className="px-3 py-1 text-xs bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30">
                        ERP System
                      </span>
                      <span className="px-3 py-1 text-xs bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30">
                        Business Solution
                      </span>
                    </div> */}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      {/* KONTAK */}
      <motion.section
        id="contact"
        className="py-32 px-8 relative"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-white">Mari </span>
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Bekerja Sama
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Tertarik mengembangkan solusi digital untuk bisnis Anda? 
              Mari berdiskusi bagaimana saya dapat membantu mewujudkan ide Anda.
            </p>
          </motion.div>
          
          <motion.div
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Contact Card 1 */}
            <motion.div
              className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 backdrop-blur-sm"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-green-500/20 border border-green-500/30">
                  <Phone className="text-green-400" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white">WhatsApp</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Hubungi saya langsung untuk diskusi cepat dan responsif.
              </p>
              <motion.button
                onClick={handleWhatsApp}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone size={20} />
                Hubungi via WhatsApp
              </motion.button>
            </motion.div>

            {/* Contact Card 2 */}
            <motion.div
              className="p-8 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 backdrop-blur-sm"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30">
                  <Mail className="text-blue-400" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white">Email</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Kirim detail proyek Anda untuk diskusi lebih mendalam.
              </p>
              <motion.a
                href="mailto:ufalbender700@gmail.com"
                className="block w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Mail size={20} />
                Kirim Email
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center gap-6 mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { icon: <Github size={24} />, href: "https://github.com/Naufal700", label: "GitHub" },
              { icon: <Linkedin size={24} />, href: "https://www.linkedin.com/in/muhamad-naufal-istikhori", label: "LinkedIn" },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-gray-900/50 border border-gray-700/50 hover:border-blue-500/50 hover:bg-gray-800/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -4 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="text-gray-400 hover:text-white transition-colors">
                  {social.icon}
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* MODAL DETAIL GAMBAR */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/95 flex items-center justify-center z-[999] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            {/* Tombol tutup */}
            <motion.button
              onClick={() => setSelectedProject(null)}
              className="absolute top-8 right-8 z-50 text-white bg-gray-900/80 hover:bg-gray-800/80 p-3 rounded-full transition-all duration-200 backdrop-blur-lg border border-gray-700/50"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* Container Modal */}
            <motion.div
              className="relative w-full max-w-7xl h-[90vh] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700/50"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gambar */}
              <div className="h-3/4 bg-gray-950">
                {Array.isArray(selectedProject.img) ? (
                  <FullScreenSlideshow images={selectedProject.img} />
                ) : (
                  <img
                    src={selectedProject.img as string}
                    alt={selectedProject.title}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Informasi proyek */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 via-gray-900/95 to-transparent p-8 pt-16">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-3xl font-bold mb-4 text-white">{selectedProject.title}</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedProject.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="py-12 relative border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="mb-6 md:mb-0"
            >
              {/* <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg" />
                <div>
                  <h3 className="text-xl font-bold text-white">NaufalDev</h3>
                  <p className="text-gray-400 text-sm">Analyst Akuntansi</p>
                </div>
              </div> */}
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gray-500 text-center"
            >
              © {new Date().getFullYear()} <span className="text-white">Muhamad Naufal Istikhori</span>. All rights reserved.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="mt-6 md:mt-0"
            >
              {/* <p className="text-gray-400 text-sm">
                Built with React & Framer Motion
              </p> */}
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Custom Styles untuk animasi gradient */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .bg-size-200 {
          background-size: 200% 200%;
        }
      `}</style>
    </div>
  );
}