/**
 * Comportamiento de `Modal.astro`.
 *
 * Un solo listener delegado en `document` sirve a todos los modales de la
 * página, también a los que llegan con una navegación de `ClientRouter`: no
 * hay nada que montar ni desmontar por instancia.
 *
 * Ciclo de vida (atributo `data-state` del <dialog>):
 *   cerrado → `showModal()` → "open" (anima la entrada)
 *   "open"  → "closing" → al terminar la transición → `close()`
 *
 * El cierre es interrumpible: si se vuelve a pedir la apertura mientras el
 * panel sale, la transición se invierte desde donde está, sin saltos.
 */

const CLOSE_FALLBACK_MS = 520;

/** Disparador de cada modal abierto, para devolverle el foco al cerrar. */
const openers = new WeakMap<HTMLDialogElement, HTMLElement>();

function lockScroll(locked: boolean) {
  document.documentElement.classList.toggle("modal-open", locked);
}

/** En escritorio el panel nace del botón que lo abrió, no del centro. */
function anchorToTrigger(dialog: HTMLDialogElement, trigger?: HTMLElement) {
  const panel = dialog.querySelector<HTMLElement>(".modal-panel");
  if (!panel) return;

  if (!trigger || window.matchMedia("(max-width: 639px)").matches) {
    panel.style.transformOrigin = "";
    return;
  }

  const from = trigger.getBoundingClientRect();
  const to = panel.getBoundingClientRect();
  const x = from.left + from.width / 2 - to.left;
  const y = from.top + from.height / 2 - to.top;
  panel.style.transformOrigin = `${x}px ${y}px`;
}

export function openModal(dialog: HTMLDialogElement, trigger?: HTMLElement) {
  if (trigger) openers.set(dialog, trigger);

  if (!dialog.open) {
    dialog.showModal();
    lockScroll(true);
    anchorToTrigger(dialog, trigger);
    // Un fotograma en estado inicial para que el navegador tenga desde dónde
    // animar; sin él, la entrada saltaría directamente al final.
    requestAnimationFrame(() => {
      if (dialog.open) dialog.dataset.state = "open";
    });
    return;
  }

  dialog.dataset.state = "open";
}

export function closeModal(dialog: HTMLDialogElement) {
  if (!dialog.open || dialog.dataset.state === "closing") return;

  dialog.dataset.state = "closing";
  const panel = dialog.querySelector<HTMLElement>(".modal-panel");

  const finish = () => {
    panel?.removeEventListener("transitionend", onEnd);
    clearTimeout(timer);
    // Si alguien lo reabrió mientras salía, se queda abierto.
    if (dialog.dataset.state !== "closing") return;

    delete dialog.dataset.state;
    dialog.close();
    lockScroll(Boolean(document.querySelector("dialog[data-modal][open]")));
    openers.get(dialog)?.focus({ preventScroll: true });
  };

  const onEnd = (event: TransitionEvent) => {
    if (event.target === panel) finish();
  };

  panel?.addEventListener("transitionend", onEnd);
  // Red de seguridad: con movimiento reducido o pestaña en segundo plano el
  // `transitionend` puede no llegar nunca.
  const timer = window.setTimeout(finish, CLOSE_FALLBACK_MS);
}

document.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;

  const opener = target.closest<HTMLElement>("[data-modal-open]");
  if (opener) {
    const dialog = document.getElementById(opener.dataset.modalOpen!);
    if (dialog instanceof HTMLDialogElement) {
      event.preventDefault();
      openModal(dialog, opener);
    }
    return;
  }

  const closer = target.closest<HTMLElement>("[data-modal-close]");
  const dialog = target.closest<HTMLDialogElement>("dialog[data-modal]");

  // El <dialog> sólo mide lo que su panel: un clic que cae en el propio
  // elemento y no en un hijo es un clic en el velo.
  if (dialog && (closer || target === dialog)) closeModal(dialog);
});

// `Esc` dispara `cancel`: se intercepta para cerrar con animación.
document.addEventListener(
  "cancel",
  (event) => {
    const dialog = event.target;
    if (dialog instanceof HTMLDialogElement && dialog.matches("[data-modal]")) {
      event.preventDefault();
      closeModal(dialog);
    }
  },
  true,
);

// Una navegación nunca debe heredar el scroll bloqueado.
document.addEventListener("astro:before-swap", () => lockScroll(false));
