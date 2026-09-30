/**
 * Visor a pantalla completa (PhotoSwipe) para todo contenedor con
 * `data-pswp-gallery`: el mosaico de la galería y el visor de planos.
 *
 * Cada contenedor es un solo recorrido: al abrir cualquiera de sus enlaces se
 * puede pasar a los demás con flechas, teclado o gesto. Al cambiar de imagen
 * el contenedor emite `lightbox:change` con el índice, para que quien lo
 * necesite (las pestañas de planos) se sincronice sin conocer PhotoSwipe.
 *
 * Opciones por contenedor:
 *   data-pswp-animation="zoom|fade"  (por defecto "zoom")
 *
 * El módulo se registra una sola vez aunque lo importen varios componentes.
 */
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

export interface LightboxChangeDetail {
  index: number;
}

let lightboxes: PhotoSwipeLightbox[] = [];

function destroyLightboxes() {
  lightboxes.forEach((lb) => lb.destroy());
  lightboxes = [];
}

function mountLightbox(root: HTMLElement) {
  const animation =
    root.dataset.pswpAnimation === "fade" ? "fade" : ("zoom" as const);

  const lb = new PhotoSwipeLightbox({
    gallery: root,
    children: "a",
    bgOpacity: 0.94,
    loop: true,
    // Zoom desde la miniatura: la foto crece desde donde estaba, no aparece
    // de la nada en el centro de la pantalla.
    showHideAnimationType: animation,
    pswpModule: () => import("photoswipe"),
  });

  lb.on("uiRegister", () => {
    lb.pswp?.ui?.registerElement({
      name: "caption",
      order: 9,
      isButton: false,
      appendTo: "root",
      html: "",
      onInit: (element, pswp) => {
        element.classList.add("pswp-caption");
        pswp.on("change", () => {
          element.textContent =
            pswp.currSlide?.data.element?.dataset.pswpCaption ?? "";
        });
      },
    });
  });

  lb.on("change", () => {
    const index = lb.pswp?.currIndex;
    if (typeof index !== "number") return;
    root.dispatchEvent(
      new CustomEvent<LightboxChangeDetail>("lightbox:change", {
        detail: { index },
      }),
    );
  });

  lb.init();
  lightboxes.push(lb);
}

function initLightboxes() {
  destroyLightboxes();
  document
    .querySelectorAll<HTMLElement>("[data-pswp-gallery]")
    .forEach(mountLightbox);
}

document.addEventListener("astro:page-load", initLightboxes);
document.addEventListener("astro:before-swap", destroyLightboxes);
