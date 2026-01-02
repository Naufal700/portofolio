import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  ArrowDown,
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

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
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
  const yHero = useTransform(scrollY, [0, 300], [0, -100]);
  const opacityHero = useTransform(scrollY, [0, 200], [1, 0.5]);

  const projects: Project[] = [
    {
      title: "Sistem Informasi Manajemen Rumah Sakit",
      desc: "Seorang analis akuntansi yang memastikan implementasi sistem informasi manajemen rumah sakit berjalan sesuai standar PSAK, dengan fokus pada modul keuangan dan akuntansi yang meliputi pendapatan, piutang, pembelian, utang, kas dan bendahara, persediaan, anggaran, aset tetap, serta pelaporan keuangan.",
      img: [simrs, jurnal, bukubesar, neracasaldo, neracalajur],
      link: "#",
      technologies: [],
    },
    {
      title: "Notasys | Sistem Informasi Manajemen Notaris",
      desc: "Aplikasi berbasis web yang dirancang untuk digitalisasi proses bisnis kantor notaris. Fitur mencakup pengelolaan data klien, lembar kerja, transaksi keuangan, dan pelacakan pekerjaan, mendukung efisiensi dan akurasi operasional.",
      img: [pelanggan, lembarkerja, keuangan, monitoring, detaillk],
      link: "#",
      technologies: [],
    },
    {
      title: "LEDGIRA | Ledger Information Reporting App",
      desc: "Aplikasi Berbasis web yang dirancang untuk memudahkan proses pencatatan transaksi sampai ke laporan keuangan.",
      img: [dashboardkeuangan,aruskas,neraca,dashboardrasiokeuangan,closingbulanan],
      link: "#",
      technologies: [],
    },
  ];

  const handleWhatsApp = () => {
    const url = `https://wa.me/62895417038500?text=Halo, saya ingin menghubungi Anda.`;
    window.open(url, "_blank");
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div
        className={`flex items-center justify-center h-screen transition-colors duration-500 ${
          darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
          ></motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg font-medium"
          >
            Memuat Portfolio...
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
      }, 5000);
      return () => clearInterval(interval);
    }, [images.length]);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
    const prevSlide = () =>
      setCurrent((prev) => (prev - 1 + images.length) % images.length);

    return (
      <div className="relative w-full h-full overflow-hidden">
        <motion.div
          className="flex w-full h-full"
          animate={{ x: `-${current * 100}%` }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`slide-${i}`}
              className="w-full h-full object-contain flex-shrink-0"
            />
          ))}
        </motion.div>

        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-gray-800/60 hover:bg-gray-700 text-white p-1 rounded-full text-sm"
        >
          ‹
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-gray-800/60 hover:bg-gray-700 text-white p-1 rounded-full text-sm"
        >
          ›
        </button>

        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                i === current ? "bg-blue-500" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    );
  };

  // Komponen Slideshow Full Screen - TANPA BACKGROUND
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
      <div 
        className="relative w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Current Image Full Screen - langsung full screen */}
        <img
          src={images[current]}
          alt={`slide-${current}`}
          className="w-full h-full object-contain"
        />

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-200 backdrop-blur-sm z-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-4 rounded-full transition-all duration-200 backdrop-blur-sm z-50"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-24 left-0 right-0 flex justify-center gap-3 z-50">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => goToSlide(i, e)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === current 
                    ? "bg-white scale-110" 
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        )}

        {/* Slide counter */}
        {images.length > 1 && (
          <div className="absolute top-6 left-6 bg-black/50 text-white px-3 py-2 rounded-full text-sm backdrop-blur-sm z-50">
            {current + 1} / {images.length}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={`transition-colors duration-500 font-sans scroll-smooth ${
        darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* HEADER */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          darkMode ? "bg-gray-900/90" : "bg-white/90"
        } backdrop-blur-lg border-b ${
          darkMode ? "border-gray-700/30" : "border-gray-200/30"
        }`}
      >
        <nav className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
          <motion.h1
            className="text-2xl font-bold tracking-wide cursor-pointer"
            onClick={() => scrollTo("home")}
            whileHover={{ scale: 1.05 }}
          >
            Naufal<span className="text-blue-500">Dev</span>
          </motion.h1>
          
          <ul className="hidden md:flex space-x-10 font-medium">
            {[
              { id: "home", label: "Beranda" },
              { id: "about", label: "Tentang" },
              { id: "project", label: "Proyek" },
              { id: "contact", label: "Kontak" },
            ].map((item) => (
              <motion.li
                key={item.id}
                className={`cursor-pointer transition-colors relative ${
                  activeSection === item.id 
                    ? "text-blue-500" 
                    : "hover:text-blue-500"
                }`}
                onClick={() => scrollTo(item.id)}
                whileHover={{ scale: 1.1 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-500"
                    layoutId="activeSection"
                  />
                )}
              </motion.li>
            ))}
          </ul>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section
        id="home"
        className={`min-h-screen flex flex-col justify-center items-center text-center relative overflow-hidden ${
          darkMode ? "bg-gradient-to-br from-gray-900 to-gray-950" : "bg-gradient-to-br from-blue-50 to-gray-100"
        }`}
      >
        <motion.div
          style={{ y: yHero, opacity: opacityHero }}
          className="z-10 px-6 max-w-4xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Halo, Saya{" "}
              <span className="text-blue-500 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                Muhamad Naufal Istikhori
              </span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-gray-400 max-w-3xl leading-relaxed mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="font-semibold text-white">Analyst Akuntansi & Web Developer</span> — 
              Spesialis dalam pengembangan sistem informasi akuntansi, ERP, dan solusi bisnis terintegrasi berbasis web.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              onClick={() => scrollTo("contact")}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Mulai Projek Bersama
            </motion.button>
            
            <motion.button
              onClick={() => scrollTo("project")}
              className={`px-8 py-3 border rounded-lg font-semibold transition-all duration-300 ${
                darkMode 
                  ? "border-gray-600 hover:bg-gray-800" 
                  : "border-gray-300 hover:bg-gray-100"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Lihat Portfolio
            </motion.button>
          </motion.div>

          <motion.div
            className="mt-12 flex space-x-6 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
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
                className={`p-3 rounded-xl transition-all duration-300 ${
                  darkMode 
                    ? "bg-gray-800 hover:bg-gray-700" 
                    : "bg-white hover:bg-gray-100 shadow-md"
                }`}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <button
            onClick={() => scrollTo("about")}
            className="text-blue-400 hover:text-blue-600 transition"
          >
            <ArrowDown size={32} />
          </button>
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 to-transparent z-0"></div>
      </section>

      {/* TENTANG SAYA */}
      <motion.section
        id="about"
        className={`py-20 px-6 md:px-12 transition-colors duration-500 ${
          darkMode ? "bg-gray-900 text-gray-300" : "bg-white text-gray-700"
        }`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold mb-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Tentang <span className="text-blue-500">Saya</span>
          </motion.h2>

          <motion.div
            className="w-24 h-1 bg-blue-500 mx-auto mb-10 rounded-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>

          <motion.div
            className="space-y-6 leading-relaxed text-lg md:text-xl font-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <p>
              Saya adalah seorang profesional dengan latar belakang{" "}
              <span className="font-medium text-blue-400">
                akuntansi dan sistem informasi
              </span>{" "}
              yang memiliki minat besar dalam pengembangan perangkat lunak berbasis web.
              Kombinasi keahlian di bidang keuangan dan teknologi memungkinkan saya
              untuk memahami kebutuhan bisnis secara mendalam serta menerjemahkannya
              menjadi solusi digital yang efisien.
            </p>

            <p>
              Fokus utama saya adalah pada{" "}
              <span className="font-medium text-blue-400">
                pengembangan sistem ERP dan aplikasi bisnis terintegrasi
              </span>{" "}
              yang tidak hanya fungsional, tetapi juga ramah pengguna, scalable, dan
              mendukung pengambilan keputusan berbasis data.
            </p>

            <p>
              Saya terus berupaya untuk belajar dan beradaptasi dengan teknologi baru,
              dengan tujuan menciptakan sistem yang memberikan nilai nyata bagi organisasi.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* PROYEK */}
      <motion.section
        id="project"
        className={`py-20 px-6 md:px-12 ${
          darkMode ? "bg-gray-900" : "bg-white"
        }`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl font-bold mb-4 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-blue-500">Proyek</span> Saya
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-blue-500 mx-auto mb-12 rounded-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className={`rounded-2xl overflow-hidden shadow-xl border ${
                  darkMode 
                    ? "bg-gray-800 border-gray-700" 
                    : "bg-white border-gray-200"
                }`}
              >
                {/* Gambar dengan tinggi tetap dan object-contain */}
                <motion.div className="overflow-hidden relative h-48 bg-gray-100 dark:bg-gray-700">
                  {Array.isArray(project.img) ? (
                    <Slideshow images={project.img} />
                  ) : (
                    <motion.img
                      src={project.img as string}
                      alt={project.title}
                      className="w-full h-full object-contain"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.5 }}
                    />
                  )}

                  {/* Overlay dan ikon mata */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="bg-white/20 p-3 rounded-full backdrop-blur-sm border border-white/30"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="white"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.01 9.964 7.183.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.01-9.964-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </motion.div>
                  </motion.div>
                </motion.div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 text-xs bg-blue-500/20 text-blue-400 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* KONTAK */}
      <motion.section
        id="contact"
        className={`py-20 px-6 md:px-12 ${
          darkMode ? "bg-gray-950" : "bg-gray-50"
        }`}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Mari <span className="text-blue-500">Bekerja Sama</span>
          </motion.h2>
          
          <motion.div 
            className="w-24 h-1 bg-blue-500 mx-auto mb-8 rounded-full"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>
          
          <motion.p
            className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Tertarik untuk mengembangkan solusi digital untuk bisnis Anda? 
            Mari berdiskusi bagaimana saya dapat membantu mewujudkan ide Anda.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.button
              onClick={handleWhatsApp}
              className="flex items-center gap-3 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Phone size={20} />
              Hubungi via WhatsApp
            </motion.button>
            
            <motion.a
              href="mailto:ufalbender700@gmail.com"
              className={`flex items-center gap-3 px-8 py-4 rounded-xl font-semibold shadow-lg transition-all duration-300 ${
                darkMode 
                  ? "bg-gray-800 hover:bg-gray-700" 
                  : "bg-white hover:bg-gray-100"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail size={20} />
              Kirim Email
            </motion.a>
          </motion.div>
        </div>
      </motion.section>

      {/* MODAL DETAIL GAMBAR */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 bg-black flex items-center justify-center z-[999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
        >
          {/* Tombol tutup */}
          <button
            onClick={() => setSelectedProject(null)}
            className="absolute top-6 right-6 z-50 text-white bg-black/50 hover:bg-black/70 p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Container gambar full screen - TANPA BACKGROUND SAMA SEKALI */}
          <div className="w-full h-full">
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

          {/* Informasi proyek di bawah gambar */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 pt-16 text-white">
            <h3 className="text-3xl font-bold mb-3 text-center">{selectedProject.title}</h3>
            <p className="text-gray-200 leading-relaxed text-center max-w-4xl mx-auto">
              {selectedProject.desc}
            </p>
          </div>
        </motion.div>
      )}

      {/* FOOTER */}
      <footer
        className={`py-8 text-center ${
          darkMode
            ? "bg-gray-900 text-gray-400 border-t border-gray-700/30"
            : "bg-white text-gray-600 border-t border-gray-200/30"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-4"
          >
            © {new Date().getFullYear()} <span className="font-semibold">NaufalDev</span>. All rights reserved.
          </motion.p>
        </div>
      </footer>
    </div>
  );
}