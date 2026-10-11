import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

// 6 imágenes que tenemos disponibles
import img1 from "@/assets/homeAssets/images/encinos8.jpeg";
import img2 from "@/assets/homeAssets/images/encinos11.png";
import img3 from "@/assets/homeAssets/images/FPENC8_01.jpg";
import img4 from "@/assets/homeAssets/images/Picture1.png";
import img5 from "@/assets/homeAssets/images/TENERIFE FF_HD.png";
import img6 from "@/assets/homeAssets/images/balcones.png";

const slides = [
  { before: img1, after: img2 },
  { before: img3, after: img4 },
  { before: img5, after: img6 },
];

export default function TrayectoriaSlider() {
  return (
    <div className="w-full relative mt-12 mx-auto group reveal">
      <Swiper
        modules={[Navigation, EffectFade]}
        effect="fade"
        navigation
        loop={true}
        className="w-full"
        style={
          {
            "--swiper-navigation-color": "var(--color-canvas, #f4efe6)",
            "--swiper-navigation-size": "22px",
          } as React.CSSProperties
        }
      >
        {slides.map((pair, idx) => (
          <SwiperSlide key={idx}>
            <div className="flex flex-col sm:flex-row w-full h-full items-center justify-center gap-6 sm:gap-12 p-4 sm:p-12">
              
              {/* Imagen 1 (al mismo nivel para mantener simetría y elegancia) */}
              <div className="w-[85%] sm:w-[40%] aspect-[4/5] sm:aspect-square relative overflow-hidden rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.08)] ring-1 ring-ink/5">
                <img
                  src={pair.before.src}
                  alt="Proyecto"
                  className="w-full h-full object-cover transition-transform duration-[15s] ease-out group-hover:scale-110"
                />
              </div>

              {/* Imagen 2 (en posición más alta) */}
              <div className="w-[85%] sm:w-[40%] aspect-[4/5] sm:aspect-square relative overflow-hidden rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.08)] ring-1 ring-ink/5">
                <img
                  src={pair.after.src}
                  alt="Proyecto"
                  className="w-full h-full object-cover transition-transform duration-[15s] ease-out group-hover:scale-110"
                />
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Estilos adicionales para que Swiper se vea mejor con la estética Apple */}
      <style>{`
        .swiper-button-next, .swiper-button-prev {
          background-color: rgba(51, 58, 48, 0.7); /* Primary color translúcido */
          backdrop-filter: blur(12px) saturate(180%);
          -webkit-backdrop-filter: blur(12px) saturate(180%);
          width: 60px !important;
          height: 60px !important;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 8px 32px rgba(51, 58, 48, 0.25);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0;
        }
        .group:hover .swiper-button-next,
        .group:hover .swiper-button-prev {
          opacity: 1;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background-color: rgba(43, 42, 38, 0.85); /* Ink color translúcido */
          transform: scale(1.1);
          box-shadow: 0 12px 32px rgba(43, 42, 38, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.25);
        }
      `}</style>
    </div>
  );
}
