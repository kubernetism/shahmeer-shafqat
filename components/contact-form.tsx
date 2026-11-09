"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { SessionType } from "@/content/types";
import { ArrowAction } from "@/components/ui/arrow-action";
import { cn } from "@/lib/cn";
import {
  buildWhatsAppEnquiryUrl,
  readEnquiry,
  validateEnquiry,
  type Enquiry,
  type EnquiryErrors,
  type EnquiryField,
} from "@/lib/enquiry";

type Status = { kind: "idle" } | { kind: "sent"; name: string; url: string };

const FIELD_ORDER: EnquiryField[] = ["name", "email", "sessionType", "date", "message"];

export function ContactForm({ sessionTypes, whatsappNumber }: { sessionTypes: SessionType[]; whatsappNumber: string }) {
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  // The form unmounts while the success panel shows; keep the values for "Edit details".
  const [draft, setDraft] = useState<Enquiry | null>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const formId = useId();

  useEffect(() => {
    if (status.kind === "sent") successRef.current?.focus();
  }, [status.kind]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const enquiry = readEnquiry(new FormData(form));
    const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD in the visitor's time zone
    const nextErrors = validateEnquiry(
      enquiry,
      sessionTypes.map((s) => s.value),
      today,
    );
    setErrors(nextErrors);

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const sessionLabel = sessionTypes.find((s) => s.value === enquiry.sessionType)?.label ?? enquiry.sessionType;
    const url = buildWhatsAppEnquiryUrl(enquiry, sessionLabel, whatsappNumber);
    // Must run synchronously inside the submit gesture, or popup blockers stop it.
    // On phones this hands over to the WhatsApp app; on desktop it opens WhatsApp Web.
    window.open(url, "_blank", "noopener,noreferrer");
    setDraft(enquiry);
    setStatus({ kind: "sent", name: enquiry.name.split(" ")[0] ?? enquiry.name, url });
  }

  function clearError(field: string) {
    if (field in errors) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field as EnquiryField];
        return next;
      });
    }
  }

  if (status.kind === "sent") {
    return (
      <div className="anim-fade-up mt-8 rounded-tile bg-mist p-6 sm:p-8" role="status">
        <span aria-hidden="true" className="grid size-11 place-items-center rounded-full bg-ink text-paper">
          <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
            <path d="m3.5 8.5 3 3 6-7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 ref={successRef} tabIndex={-1} className="mt-5 text-2xl font-medium tracking-[-0.03em] outline-none">
          Almost there, {status.name}.
        </h3>
        <p className="mt-2 max-w-[42ch] text-[15px] leading-relaxed text-muted">
          WhatsApp has opened with your details written out. Tap <span className="font-medium text-ink">Send</span> in
          WhatsApp to deliver your enquiry.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
          <ArrowAction href={status.url} icon="whatsapp">
            Open WhatsApp again
          </ArrowAction>
          <button
            type="button"
            onClick={() => setStatus({ kind: "idle" })}
            className="text-sm font-medium underline decoration-line underline-offset-4 hover:decoration-ink"
          >
            Edit details
          </button>
        </div>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      onChange={(event) => {
        const target = event.target as Element;
        clearError(target.getAttribute("name") ?? "");
      }}
      aria-describedby={errorCount > 0 ? `${formId}-summary` : undefined}
      className="mt-8 grid gap-4"
    >
      <p id={`${formId}-summary`} className="sr-only" aria-live="polite">
        {errorCount > 0 ? `${errorCount} ${errorCount === 1 ? "field needs" : "fields need"} attention.` : ""}
      </p>

      <Field id={`${formId}-name`} label="Name" error={errors.name}>
        {(props) => <input {...props} name="name" type="text" autoComplete="name" required placeholder="Your full name" defaultValue={draft?.name} />}
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id={`${formId}-email`} label="E-mail" hint="Optional" error={errors.email}>
          {(props) => (
            <input {...props} name="email" type="email" autoComplete="email" inputMode="email" placeholder="name@example.com" defaultValue={draft?.email} />
          )}
        </Field>
        <Field id={`${formId}-session`} label="Session type" error={errors.sessionType}>
          {(props) => (
            <div className="relative">
              <select {...props} name="sessionType" required defaultValue={draft?.sessionType ?? ""} className={cn(props.className, "appearance-none pr-10")}>
                <option value="" disabled>
                  Choose one
                </option>
                {sessionTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                width="14"
                height="14"
                className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted"
              >
                <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </Field>
      </div>

      <Field id={`${formId}-date`} label="Event date" hint="Optional" error={errors.date}>
        {(props) => <input {...props} name="date" type="date" defaultValue={draft?.date} />}
      </Field>

      <Field id={`${formId}-message`} label="Message" error={errors.message}>
        {(props) => (
          <textarea
            {...props}
            name="message"
            rows={4}
            required
            defaultValue={draft?.message}
            placeholder="Venue, number of events, anything you have in mind"
            className={cn(props.className, "h-auto min-h-28 resize-y py-3")}
          />
        )}
      </Field>

      <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-muted">Opens WhatsApp in a new tab.</p>
        <ArrowAction type="submit" icon="whatsapp">
          Send on WhatsApp
        </ArrowAction>
      </div>
    </form>
  );
}

type ControlProps = {
  id: string;
  className: string;
  "aria-invalid"?: true;
  "aria-describedby"?: string;
};

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: (props: ControlProps) => ReactNode;
}) {
  const errorId = `${id}-error`;
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="flex items-baseline justify-between text-xs font-medium text-ink/80">
        {label}
        {hint ? <span className="font-normal text-muted">{hint}</span> : null}
      </label>
      {children({
        id,
        className: cn(
          "h-12 w-full rounded-tile bg-mist px-4 text-[15px] text-ink outline-none ring-1 transition-[box-shadow,background-color] placeholder:text-subtle",
          "focus:bg-paper focus:ring-2 focus:ring-ink",
          error ? "bg-red-50 ring-red-600" : "ring-transparent hover:ring-line",
        ),
        ...(error ? { "aria-invalid": true as const, "aria-describedby": errorId } : null),
      })}
      {error ? (
        <p id={errorId} className="flex items-center gap-1.5 text-xs font-medium text-red-700">
          <svg aria-hidden="true" viewBox="0 0 16 16" width="12" height="12">
            <circle cx="8" cy="8" r="7" fill="currentColor" />
            <path d="M8 4.5v4M8 11v.01" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
          {error}
        </p>
      ) : null}
    </div>
  );
}
