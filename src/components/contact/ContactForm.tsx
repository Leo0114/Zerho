import { useId, useState, type ReactNode } from "react";
import { useForm, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Toaster, toast } from "sonner";
import { LuArrowRight, LuCheck, LuLoaderCircle } from "react-icons/lu";
import { Button } from "@/components/homeShared/ui/Button";
import {
  SERVICE_OPTIONS,
  contactSchema,
  type ContactInput,
} from "@/lib/contact-schema";

// Muelle críticamente amortiguado (damping 1.0, response ~0.4s): asienta sin
// rebote, lo que corresponde a algo que aparece y no a algo lanzado.
const SPRING = { type: "spring", bounce: 0, duration: 0.45 } as const;

const DEFAULTS: ContactInput = {
  name: "",
  email: "",
  phone: "",
  service: "",
  message: "",
  nickname: "",
};

const FIELD =
  "w-full rounded-2xl border border-ink/12 bg-white/70 px-4 text-[0.9375rem] text-ink placeholder:text-ink/35 " +
  "transition-[border-color,box-shadow,background-color] duration-300 ease-[var(--ease-out-expo)] " +
  "hover:border-ink/25 focus:border-primary/60 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary/10 " +
  "aria-[invalid=true]:border-[#a3412f]/60 aria-[invalid=true]:ring-[#a3412f]/10";

const LABEL =
  "text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-warmGray";

interface FieldProps {
  label: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: (props: { id: string; describedBy?: string }) => ReactNode;
}

function Field({ label, error, optional, className = "", children }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className={LABEL}>
        {label}
        {optional && (
          <span className="ml-2 font-medium normal-case tracking-normal text-muted">
            (opcional)
          </span>
        )}
      </label>
      {children({ id, describedBy: error ? errorId : undefined })}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={errorId}
            role="alert"
            className="overflow-hidden text-[0.8125rem] text-[#a3412f]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={SPRING}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const fieldAria = (
  registration: UseFormRegisterReturn,
  invalid: boolean,
  describedBy?: string,
) => ({
  ...registration,
  "aria-invalid": invalid,
  "aria-describedby": describedBy,
});

export default function ContactForm() {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: DEFAULTS,
    mode: "onTouched",
  });

  const onSubmit = async (data: ContactInput) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = (await response.json().catch(() => null)) as {
        error?: string;
      } | null;

      if (!response.ok) {
        throw new Error(result?.error ?? "No pudimos enviar tu mensaje.");
      }

      setSentTo(data.name.split(" ")[0] ?? data.name);
      reset(DEFAULTS);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "No pudimos enviar tu mensaje.",
        { description: "Inténtalo de nuevo o llámanos directamente." },
      );
    }
  };

  const enter = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, scale: 0.98, filter: "blur(8px)" },
        animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
        exit: { opacity: 0, scale: 0.98, filter: "blur(8px)" },
      };

  return (
    <div className="relative isolate rounded-[2rem] border border-white/80 bg-white/55 p-6 shadow-[inset_0_1px_0_rgb(255_255_255/0.95),0_1px_2px_rgb(43_42_38/0.06),0_30px_80px_-30px_rgb(43_42_38/0.35)] backdrop-blur-[22px] backdrop-saturate-[1.8] sm:p-10">
      <Toaster position="bottom-center" richColors closeButton />

      <AnimatePresence mode="wait" initial={false}>
        {sentTo ? (
          <motion.div
            key="sent"
            {...enter}
            transition={SPRING}
            className="flex min-h-[28rem] flex-col items-center justify-center text-center"
            role="status"
          >
            <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-2xl text-darkGray">
              <LuCheck aria-hidden="true" />
            </span>
            <h2 className="mt-6 font-display text-[2.25rem] font-medium leading-tight tracking-[-0.01em] text-ink">
              Gracias, {sentTo}.
            </h2>
            <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-muted">
              Recibimos tu mensaje. Te contactaremos personalmente para conocer
              tu proyecto.
            </p>
            <Button
              variant="simple"
              className="mt-8"
              onClick={() => setSentTo(null)}
            >
              Enviar otro mensaje
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            {...enter}
            transition={SPRING}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="grid gap-6 sm:grid-cols-2"
          >
            <div className="sm:col-span-2">
              <h2 className="font-display text-[2rem] font-medium leading-tight tracking-[-0.01em] text-ink">
                Cuéntanos de tu proyecto
              </h2>
              <p className="mt-2 text-[0.9375rem] text-muted">
                Respondemos personalmente, sin intermediarios.
              </p>
            </div>

            <Field label="Nombre" error={errors.name?.message}>
              {({ id, describedBy }) => (
                <input
                  id={id}
                  type="text"
                  autoComplete="name"
                  className={`${FIELD} h-12`}
                  {...fieldAria(register("name"), !!errors.name, describedBy)}
                />
              )}
            </Field>

            <Field label="Correo" error={errors.email?.message}>
              {({ id, describedBy }) => (
                <input
                  id={id}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  className={`${FIELD} h-12`}
                  {...fieldAria(register("email"), !!errors.email, describedBy)}
                />
              )}
            </Field>

            <Field label="Teléfono" optional error={errors.phone?.message}>
              {({ id, describedBy }) => (
                <input
                  id={id}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  className={`${FIELD} h-12`}
                  {...fieldAria(register("phone"), !!errors.phone, describedBy)}
                />
              )}
            </Field>

            <Field label="Servicio" error={errors.service?.message}>
              {({ id, describedBy }) => (
                <select
                  id={id}
                  className={`${FIELD} h-12 appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='none' stroke='%232b2a26' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m3 4.5 3 3 3-3'/%3E%3C/svg%3E")] bg-[length:12px] bg-[position:right_1rem_center] bg-no-repeat pr-10`}
                  {...fieldAria(register("service"), !!errors.service, describedBy)}
                >
                  <option value="" disabled>
                    Selecciona…
                  </option>
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </Field>

            <Field label="Mensaje" error={errors.message?.message} className="sm:col-span-2">
              {({ id, describedBy }) => (
                <textarea
                  id={id}
                  rows={5}
                  placeholder="Ubicación del terreno, tiempos, lo que imaginas…"
                  className={`${FIELD} resize-none py-3.5 leading-relaxed`}
                  {...fieldAria(register("message"), !!errors.message, describedBy)}
                />
              )}
            </Field>

            {/* Campo trampa: fuera de pantalla y fuera del orden de tabulación. */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
              <label>
                No llenar
                <input type="text" tabIndex={-1} autoComplete="off" {...register("nickname")} />
              </label>
            </div>

            <div className="flex flex-col-reverse gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed text-muted">
                Usamos tus datos sólo para responderte.
              </p>
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                iconPosition="end"
                icon={
                  isSubmitting ? (
                    <LuLoaderCircle className="animate-spin" />
                  ) : (
                    <LuArrowRight />
                  )
                }
              >
                {isSubmitting ? "Enviando" : "Enviar mensaje"}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
