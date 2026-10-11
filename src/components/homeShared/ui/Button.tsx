import React from "react";

/**
 * primary · relleno oliva, para el lienzo crema.
 * light   · casi blanco, la acción principal sobre imagen u oliva.
 * glass   · liquid glass, acción secundaria sobre imagen u oliva.
 * simple  · contorno discreto sobre el lienzo.
 */
export type ButtonVariant = "primary" | "light" | "glass" | "simple";
export type ButtonSize = "sm" | "md" | "lg";

type BaseProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Elemento (`<LuArrow />`) o componente (`LuArrow`). Desde Astro pasa el
   *  componente: Astro no puede crear elementos React como props. */
  icon?: React.ReactNode | React.ComponentType;
  /** Icono tras el texto (flechas) en lugar de delante. */
  iconPosition?: "start" | "end";
  className?: string;
  children?: React.ReactNode;
};

type AnchorProps = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

type NativeButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

export type ButtonProps = AnchorProps | NativeButtonProps;

// La respuesta vive en el pointer-down (`active:`), no al soltar: escala
// inmediata de 100ms, y el regreso hereda la curva de muelle.
const BASE =
  "group/button inline-flex select-none items-center justify-center gap-2.5 rounded-full font-medium leading-none tracking-[-0.005em] whitespace-nowrap " +
  "transition-[transform,background-color,border-color,color,box-shadow] duration-500 ease-[var(--ease-spring)] " +
  "active:scale-[0.97] active:duration-100 disabled:pointer-events-none disabled:opacity-50";

const SIZES: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-[0.8125rem]",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
};

const VARIANTS: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-darkGray shadow-[inset_0_1px_0_rgb(255_255_255/0.12),0_8px_24px_-12px_rgb(51_58_48/0.6)] hover:bg-secondary",
  light:
    "bg-white/90 text-ink shadow-[inset_0_1px_0_rgb(255_255_255),0_8px_24px_-12px_rgb(0_0_0/0.45)] backdrop-blur-md hover:bg-white",
  glass:
    "border border-white/25 bg-white/10 text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.35)] backdrop-blur-xl backdrop-saturate-150 hover:border-white/40 hover:bg-white/18",
  simple:
    "border border-ink/15 bg-transparent text-ink hover:border-ink/30 hover:bg-ink/[0.04]",
};

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = "primary",
      size = "md",
      icon,
      iconPosition = "start",
      className = "",
      children,
      ...props
    },
    ref,
  ) => {
    const classes = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;
    const iconNode = icon ? (
      <span
        aria-hidden="true"
        className="inline-flex shrink-0 text-[1.1em] transition-transform duration-500 ease-[var(--ease-spring)] group-hover/button:translate-x-0.5"
      >
        {typeof icon === "function" ? React.createElement(icon) : icon}
      </span>
    ) : null;

    const content = (
      <>
        {iconPosition === "start" && iconNode}
        {children}
        {iconPosition === "end" && iconNode}
      </>
    );

    if (props.href !== undefined) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    const { type = "button", ...buttonProps } =
      props as React.ButtonHTMLAttributes<HTMLButtonElement>;

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={classes}
        {...buttonProps}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = "Button";
