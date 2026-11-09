export type EnquiryField = "name" | "email" | "sessionType" | "date" | "message";

export type Enquiry = {
  name: string;
  email: string;
  sessionType: string;
  /** "YYYY-MM-DD" or empty. */
  date: string;
  message: string;
};

export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Reads the contact form into a trimmed, typed object. */
export function readEnquiry(form: FormData): Enquiry {
  const text = (key: EnquiryField) => {
    const value = form.get(key);
    return typeof value === "string" ? value.trim() : "";
  };
  return {
    name: text("name"),
    email: text("email"),
    sessionType: text("sessionType"),
    date: text("date"),
    message: text("message"),
  };
}

/**
 * Client-side checks with messages that say how to fix the problem.
 * `today` is passed in ("YYYY-MM-DD") so the rule stays pure and testable.
 */
export function validateEnquiry(enquiry: Enquiry, allowedSessionTypes: string[], today: string): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (enquiry.name.length < 2) errors.name = "Enter your name.";
  // Email is optional: the enquiry goes out over WhatsApp, which already carries the sender's number.
  if (enquiry.email && !EMAIL_PATTERN.test(enquiry.email)) errors.email = "Enter an email address like name@example.com, or leave it empty.";
  if (!allowedSessionTypes.includes(enquiry.sessionType)) errors.sessionType = "Choose a session type.";
  if (enquiry.date && enquiry.date < today) errors.date = "Choose a date that hasn't passed yet.";
  if (enquiry.message.length < 10) errors.message = "Tell me a little about your plans (at least 10 characters).";
  return errors;
}

const longDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/**
 * Builds a wa.me link whose pre-filled text holds every form field, so the
 * visitor only has to tap Send in WhatsApp. There is no email inbox yet, so
 * WhatsApp is the delivery channel for the form.
 */
export function buildWhatsAppEnquiryUrl(enquiry: Enquiry, sessionLabel: string, whatsappNumber: string): string {
  const lines = [
    "Hi Shah Meer, I'd like to enquire about a shoot.",
    "",
    `Name: ${enquiry.name}`,
    `Session type: ${sessionLabel}`,
    `Event date: ${enquiry.date ? longDate.format(new Date(`${enquiry.date}T00:00:00Z`)) : "Not decided yet"}`,
    ...(enquiry.email ? [`Email: ${enquiry.email}`] : []),
    "",
    enquiry.message,
  ];
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;
}
