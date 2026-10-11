import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

// Import images directly
import Cuencame1Render from "@/assets/homeAssets/images/RendersvsRealidad/Cuencame1Render.webp";
import Cuencame1Realidad from "@/assets/homeAssets/images/RendersvsRealidad/Cuencame1Realidad.webp";

import Cuencame2Render from "@/assets/homeAssets/images/RendersvsRealidad/Cuencame2Render.webp";
import Cuencame2Realidad from "@/assets/homeAssets/images/RendersvsRealidad/Cuencame2Realidad.webp";

import EncinosRender from "@/assets/homeAssets/images/RendersvsRealidad/EncinosRender.webp";
import EncinosRealidad from "@/assets/homeAssets/images/RendersvsRealidad/EncinosRealidad.webp";

import Encinos1Render from "@/assets/homeAssets/images/RendersvsRealidad/Encinos1Render.webp";
import Encinos1Realidad from "@/assets/homeAssets/images/RendersvsRealidad/Encinos1Realidad.webp";

import MisiondeAsisRender from "@/assets/homeAssets/images/RendersvsRealidad/MisiondeAsisRender.webp";
import MisiondeAsisRealidad from "@/assets/homeAssets/images/RendersvsRealidad/MisiondeAsisRealidad.webp";

import MisiondeSanJuanRender from "@/assets/homeAssets/images/RendersvsRealidad/MisiondeSanJuanRender.webp";
import MisiondeSanJuanRealidad from "@/assets/homeAssets/images/RendersvsRealidad/MisiondeSanJuanRealidad.webp";

interface CompareSliderProps {
  renderImg: string;
  realidadImg: string;
  name?: string;
}

const CompareSlider: React.FC<CompareSliderProps> = ({
  renderImg,
  realidadImg,
  name,
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(event.target.value));
  };

  return (
    <div className="flex flex-col gap-0 w-full max-w-5xl mx-auto">
      {/* <h3 className="text-2xl sm:text-3xl font-bold text-ink text-center tracking-tight font-heading">
        {name}
      </h3> */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] sm:aspect-video rounded-3xl overflow-hidden shadow-2xl bg-warmGray/20 group select-none ring-1 ring-ink/5"
      >
        {/* Realidad Image (Background - Right Side) */}
        <img
          src={realidadImg}
          alt={`${name} Realidad`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        {/* Realidad Badge — always inside image */}
        <div className="absolute top-3 sm:top-6 right-3 sm:right-6 bg-primary text-white text-[10px] sm:text-sm font-semibold px-2.5 sm:px-4 py-1 sm:py-2 rounded-full shadow-md backdrop-blur-sm pointer-events-none z-[5]">
          Realidad
        </div>

        {/* Render Image (Foreground with clip-path - Left Side) */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={renderImg}
            alt={`${name} Render`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Render Badge — always inside image */}
          <div className="absolute top-3 sm:top-6 left-3 sm:left-6 bg-ink/80 text-white text-[10px] sm:text-sm font-semibold px-2.5 sm:px-4 py-1 sm:py-2 rounded-full shadow-md backdrop-blur-sm">
            Render
          </div>
        </div>

        {/* Slider Input - Added swiper-no-swiping to prevent slide change when interacting with comparison slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          className="swiper-no-swiping absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
          aria-label={`${name} slider comparison`}
        />

        {/* Slider Line & Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)] pointer-events-none z-10 flex items-center justify-center"
          style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full flex items-center justify-center shadow-xl ring-2 ring-primary">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-ink"
            >
              <path d="M18 8L22 12L18 16" />
              <path d="M6 8L2 12L6 16" />
            </svg>
          </div>
        </div>
      </div>


    </div>
  );
};

const sliderData = [
  {
    name: "Cuencamé 1",
    render: Cuencame1Render.src,
    realidad: Cuencame1Realidad.src,
  },
  {
    name: "Cuencamé 2",
    render: Cuencame2Render.src,
    realidad: Cuencame2Realidad.src,
  },
  { name: "Encinos", render: EncinosRender.src, realidad: EncinosRealidad.src },
  {
    name: "Encinos 1",
    render: Encinos1Render.src,
    realidad: Encinos1Realidad.src,
  },
  {
    name: "Misión de Asís",
    render: MisiondeAsisRender.src,
    realidad: MisiondeAsisRealidad.src,
  },
  {
    name: "Misión de San Juan",
    render: MisiondeSanJuanRender.src,
    realidad: MisiondeSanJuanRealidad.src,
  },
];

export default function RenderVsRealidad() {
  const swiperRef = useRef<any>(null);

  return (
    <div className="md:mt-8 mt-24 relative w-full">
      {/* Swiper without built-in navigation — no arrows inside the slide */}
      <Swiper
        modules={[EffectFade]}
        effect="fade"
        loop={true}
        allowTouchMove={true}
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        className="w-full"
      >
        {sliderData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="px-4 sm:px-12 w-full h-full flex items-center justify-center">
              <CompareSlider
                name={item.name}
                renderImg={item.render}
                realidadImg={item.realidad}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* External navigation — always below the image, never overlapping */}
      <div className="flex items-center justify-center gap-4 mt-5 sm:mt-7">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Proyecto anterior"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer hover:scale-105"
          style={{ backgroundColor: "rgba(43, 42, 38, 0.90)", border: "1px solid rgba(255,255,255,0.18)", boxShadow: "0 2px 8px rgba(0,0,0,0.18)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Proyecto siguiente"
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer hover:scale-105"
          style={{ backgroundColor: "rgba(51, 58, 48, 0.90)", border: "1px solid rgba(255,255,255,0.18)", boxShadow: "0 2px 8px rgba(0,0,0,0.18)" }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Desktop hover navigation — visible on hover, positioned at image sides */}
      <style>{`
        /* Desktop ghost buttons on hover, overlaid on the slide */
        @media (min-width: 640px) {
          .rvr-nav-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            z-index: 30;
            opacity: 0;
            transition: opacity 0.3s ease, transform 0.3s ease;
          }
          .rvr-nav-btn:hover {
            transform: translateY(-50%) scale(1.08) !important;
            opacity: 1 !important;
          }
          .rvr-wrap:hover .rvr-nav-btn {
            opacity: 1;
          }
        }
        @media (max-width: 639px) {
          .rvr-nav-btn { display: none; }
        }
      `}</style>
    </div>
  );
}
