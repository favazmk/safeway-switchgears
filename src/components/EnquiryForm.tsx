"use client";

import { useState, type FormEvent } from "react";
import { company } from "@/lib/site";
import Icon from "@/components/Icon";

const interests = [
  "Main / Sub Main Distribution Board",
  "Final Distribution Board",
  "ATS / Changeover System",
  "Motor Control Center",
  "PLC / VFD Control Panel",
  "Pump / Fan Control Panel",
  "Capacitor Bank",
  "Components & Accessories",
  "Other",
];

const field =
  "w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-ink outline-none transition placeholder:text-muted focus:border-brand focus:ring-4 focus:ring-brand/15";

// Static site: the enquiry is composed into the visitor's email app.
export default function EnquiryForm() {
  const [sent, setSent] = useState(false);
  const [interest, setInterest] = useState(interests[0]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const subject = `Website enquiry: ${interest}`;
    const body = [
      `Name: ${d.get("name")}`,
      `Company: ${d.get("company") || "-"}`,
      `Phone: ${d.get("phone")}`,
      `Email: ${d.get("email")}`,
      `Interested in: ${interest}`,
      "",
      `${d.get("message")}`,
    ].join("\n");
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
      <fieldset className="sm:col-span-2">
        <legend className="mb-3 text-sm text-ink-soft">I&apos;m interested in</legend>
        <div className="flex flex-wrap gap-2">
          {interests.map((i) => (
            <label key={i} className="cursor-pointer">
              <input
                type="radio"
                name="interest"
                value={i}
                checked={interest === i}
                onChange={() => setInterest(i)}
                className="peer sr-only"
              />
              <span className="inline-block rounded-full border border-line bg-white px-3.5 py-2 text-sm text-ink-soft transition peer-checked:border-brand peer-checked:bg-brand peer-checked:text-white peer-focus-visible:ring-4 peer-focus-visible:ring-brand/20 hover:border-ink">
                {i}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="grid gap-2 text-sm text-ink-soft">
        Full name
        <input name="name" required autoComplete="name" className={field} placeholder="Your name" />
      </label>
      <label className="grid gap-2 text-sm text-ink-soft">
        Company
        <input name="company" autoComplete="organization" className={field} placeholder="Company name" />
      </label>
      <label className="grid gap-2 text-sm text-ink-soft">
        Phone
        <input name="phone" type="tel" required autoComplete="tel" className={field} placeholder="+971 5X XXX XXXX" />
      </label>
      <label className="grid gap-2 text-sm text-ink-soft">
        Email
        <input name="email" type="email" required autoComplete="email" className={field} placeholder="you@company.com" />
      </label>
      <label className="grid gap-2 text-sm text-ink-soft sm:col-span-2">
        Project details
        <textarea
          name="message"
          required
          rows={5}
          className={field}
          placeholder="Ratings, quantities, IP rating, form of separation, deadlines..."
        />
      </label>
      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted" aria-live="polite">
          {sent
            ? "Your email app should now be open with the enquiry ready to send."
            : "Your enquiry opens in your email app, ready to send."}
        </p>
        <button type="submit" className="btn btn-primary">
          Send enquiry
          <span className="chip">
            <Icon name="arrow" className="size-3.5" />
          </span>
        </button>
      </div>
    </form>
  );
}
