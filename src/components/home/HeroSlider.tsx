import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { LuArrowRight } from "react-icons/lu";

import "swiper/css";
import "swiper/css/effect-fade";

// En React/Vite (Astro), podemos importar imágenes directamente si están en src
import img1 from "@/assets/homeAssets/images/encinos8.jpeg";
import img2 from "@/assets/homeAssets/images/encinos11.png";
import img3 from "@/assets/homeAssets/images/FPENC8_01.jpg";
import img4 from "@/assets/homeAssets/images/Picture1.png";
import img5 from "@/assets/homeAssets/images/TENERIFE FF_HD.png";
import img6 from "@/assets/homeAssets/images/balcones.png";

import logoImg from "@/assets/firstLogo.png";

const slides = [img1, img2, img3, img4, img5, img6];

interface HeroProps {
  hero: {
    preTitle: string;
    title: string;
    ctaPrimary: string;
    specialties: string[];
  };
  contactPath: string;
}

export default function HeroSlider({ hero, contactPath }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFloating, setIsFloating] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Activar el botón flotante cuando se haya bajado el 70% de la pantalla
      if (window.scrollY > window.innerHeight * 0.7) {
        setIsFloating(true);
      } else {
        setIsFloating(false);
      }

      // Detectar si llegamos al footer (ej. a 400px del fondo de la página)
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (documentHeight - scrollPosition < 400) {
        setIsNearBottom(true);
      } else {
        setIsNearBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial position
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section
        id="inicio"
        data-surface="dark"
        className="relative isolate flex min-h-screen items-end overflow-clip bg-secondary text-white w-full h-screen"
      >
        {/* Top Center Logo (Hidden in Mobile) */}
        <div className="hidden sm:block absolute top-28 md:top-32 left-1/2 -translate-x-1/2 z-30 pointer-events-none w-48 md:w-64 aspect-[3/1]">
          <motion.img
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            src={logoImg.src}
            alt="Zerho"
            className="w-full h-full object-cover drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* Background Slider */}
        <div className="absolute inset-0 -z-20">
          <Swiper
            modules={[EffectFade, Autoplay]}
            effect="fade"
            speed={1500}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            loop={true}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="w-full h-full"
          >
            {slides.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="w-full h-full relative">
                  <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: activeIndex === idx ? 1 : 1.1 }}
                    transition={{ duration: 10, ease: "easeOut" }}
                    src={img.src}
                    alt={`Slide ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/50 via-black/30 to-transparent bg-[length:100%_45%] bg-no-repeat"></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/35 to-transparent bg-[length:100%_75%] bg-no-repeat bg-bottom"></div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-16 sm:pb-24 pt-36 sm:pt-40 lg:pb-32 pointer-events-none">
          <div className="flex flex-col gap-4 sm:gap-6 pt-16">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-4xl font-display text-3xl sm:text-4xl lg:text-5xl font-medium leading-[1.05] tracking-[-0.022em] text-balance drop-shadow-lg"
            >
              {hero.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2"
            >
              <span className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-widest text-white drop-shadow-md uppercase leading-snug">
                {hero.preTitle}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-4 sm:mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8 pointer-events-auto"
            >
              {/* Espacio reservado para el botón */}
              <div className="h-10 sm:h-12 w-[175px] sm:w-[220px] relative shrink-0">
                {!isFloating && (
                  <motion.a
                    layoutId="cta-btn"
                    href={contactPath}
                    className="group absolute inset-0 inline-flex items-center justify-center gap-2 px-5 sm:px-7 rounded-full text-xs sm:text-base font-semibold shadow-[inset_0_1px_0_rgba(255,255,255,1)] transition-colors duration-300 text-black bg-white/95 hover:bg-white whitespace-nowrap"
                  >
                    <motion.span layoutId="cta-text">
                      {hero.ctaPrimary}
                    </motion.span>
                    <motion.div layoutId="cta-icon">
                      <LuArrowRight className="transition-transform group-hover:translate-x-1" />
                    </motion.div>
                  </motion.a>
                )}
              </div>

              {/* <ul className="flex flex-wrap gap-2" aria-label="Especialidades">
              {hero.specialties.map((specialty, i) => (
                <li key={i} className="inline-flex items-center h-7 sm:h-9 px-3 sm:px-4 rounded-full text-xs sm:text-sm font-medium tracking-wide text-white bg-black/20 border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md">
                  {specialty}
                </li>
              ))}
            </ul> */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floating Button fuera de la section para evitar problemas de stacking context (z-index) */}
      {isFloating && (
        <motion.a
          layoutId="cta-btn"
          href={contactPath}
          animate={{
            opacity: isNearBottom ? 0 : 1,
            y: isNearBottom ? 20 : 0,
            pointerEvents: isNearBottom ? "none" : "auto",
          }}
          transition={{ duration: 0.3 }}
          className="group fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[9999] inline-flex items-center justify-center gap-2 h-10 sm:h-12 px-5 sm:px-7 rounded-full text-xs sm:text-base font-semibold shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-colors duration-300 text-white bg-black/30 backdrop-blur-xl saturate-150 border border-white/20 hover:bg-black/40 hover:scale-105 active:scale-95 whitespace-nowrap"
        >
          <motion.span layoutId="cta-text">{hero.ctaPrimary}</motion.span>
          <motion.div layoutId="cta-icon">
            <LuArrowRight className="transition-transform group-hover:translate-x-1" />
          </motion.div>
        </motion.a>
      )}
    </>
  );
}
