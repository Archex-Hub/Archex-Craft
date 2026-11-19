"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, CheckCircle2, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { leadSchema, projectTypes, type LeadInput } from "@/features/leads/schema";
import { Button } from "@/components/ui/button";
import { TurnstileField } from "@/components/forms/turnstile-field";

const projectLabels: Record<(typeof projectTypes)[number], string> = {
  "new-product": "New product or application",
  "ai-integration": "AI integration",
  modernization: "Modernization",
  "ongoing-engineering": "Ongoing engineering",
  "not-sure": "Not sure yet"
};

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1.5 text-xs font-medium text-danger">{message}</p> : null;
}

function RequiredMark() {
  return (
    <span className="required-mark ml-1 text-forest font-bold" aria-hidden="true">
      *
    </span>
  );
}

export function EnquiryForm({
  compact = false,
  id = "enquiry-form",
  category
}: {
  compact?: boolean;
  id?: string;
  category?: string;
}) {
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      category: (category as any) || "general",
      projectType: "not-sure",
      privacy: false,
      website: "",
      turnstileToken: ""
    }
  });

  const selectedCategory = watch("category");
  const isPrivacyCategory = selectedCategory?.startsWith("privacy-");
  const messageText = watch("message") || "";
  const charCount = messageText.trim().length;

  async function onSubmit(values: LeadInput) {
    setStatus(null);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values)
      });
      const result = (await response.json()) as { ok: boolean; message: string };
      if (result.ok) {
        reset();
      }
      setStatus({ type: result.ok ? "success" : "error", message: result.message });
    } catch {
      setStatus({ type: "error", message: "We could not send your enquiry. Please try again." });
    }
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-5 rounded-2xl border border-border/90 bg-surface dark:bg-[#111c2e] p-6 sm:p-8 shadow-xl shadow-forest/5 dark:shadow-black/25 backdrop-blur-sm"
      noValidate
    >
      {/* Form Top Header & Assurance */}
      <div className="flex items-center justify-between border-b border-border/70 pb-4">
        <div className="flex items-center gap-2">
          <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-forest">
            Direct Engineering Intake
          </span>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted">
          <Lock size={12} className="text-bronze" />
          <span>Strictly Confidential</span>
        </span>
      </div>

      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>

      {/* Category Dropdown */}
      <div>
        <label className="text-sm font-semibold text-ink">
          Topic / Request category
          <select
            className="mt-2 w-full rounded-xl border border-border/80 bg-paper/50 dark:bg-black/30 px-3.5 py-3 text-sm text-ink transition focus:border-forest focus:bg-surface focus:outline-none focus:ring-2 focus:ring-forest/20"
            {...register("category")}
          >
            <option value="general">General enquiry</option>
            <option value="project">Project / technical enquiry</option>
            <optgroup label="Data Protection &amp; Privacy (DPDP Act)">
              <option value="privacy-access">Privacy: Access personal data</option>
              <option value="privacy-correction">Privacy: Correction of information</option>
              <option value="privacy-deletion">Privacy: Erasure / deletion request</option>
              <option value="privacy-consent-withdrawal">Privacy: Withdrawal of consent</option>
              <option value="privacy-grievance">Privacy: Privacy grievance or complaint</option>
              <option value="privacy-question">Privacy: General data protection question</option>
            </optgroup>
          </select>
        </label>
      </div>

      {/* Name and Email Row */}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-ink">
          Name<RequiredMark />
          <input
            placeholder="e.g. Jordan Reed"
            className="mt-2 w-full rounded-xl border border-border/80 bg-paper/50 dark:bg-black/30 px-3.5 py-3 text-sm text-ink placeholder:text-muted/60 transition focus:border-forest focus:bg-surface focus:outline-none focus:ring-2 focus:ring-forest/20"
            {...register("name")}
          />
          <FieldError message={errors.name?.message} />
        </label>
        <label className="text-sm font-semibold text-ink">
          Work email<RequiredMark />
          <input
            type="email"
            placeholder="jordan@company.com"
            className="mt-2 w-full rounded-xl border border-border/80 bg-paper/50 dark:bg-black/30 px-3.5 py-3 text-sm text-ink placeholder:text-muted/60 transition focus:border-forest focus:bg-surface focus:outline-none focus:ring-2 focus:ring-forest/20"
            {...register("email")}
          />
          <FieldError message={errors.email?.message} />
        </label>
      </div>

      {/* Company */}
      <label className="text-sm font-semibold text-ink">
        Company <span className="font-normal text-muted text-xs">(optional)</span>
        <input
          placeholder="e.g. Acme Corp"
          className="mt-2 w-full rounded-xl border border-border/80 bg-paper/50 dark:bg-black/30 px-3.5 py-3 text-sm text-ink placeholder:text-muted/60 transition focus:border-forest focus:bg-surface focus:outline-none focus:ring-2 focus:ring-forest/20"
          {...register("company")}
        />
        <FieldError message={errors.company?.message} />
      </label>

      {/* Optional fields when not compact and not privacy */}
      {!compact && !isPrivacyCategory ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold text-ink">
            Budget range <span className="font-normal text-muted text-xs">(optional)</span>
            <input
              placeholder="e.g. $25k – $50k"
              className="mt-2 w-full rounded-xl border border-border/80 bg-paper/50 dark:bg-black/30 px-3.5 py-3 text-sm text-ink placeholder:text-muted/60 transition focus:border-forest focus:bg-surface focus:outline-none focus:ring-2 focus:ring-forest/20"
              {...register("budgetRange")}
            />
          </label>
          <label className="text-sm font-semibold text-ink">
            Desired start <span className="font-normal text-muted text-xs">(optional)</span>
            <input
              placeholder="e.g. Immediately / Next quarter"
              className="mt-2 w-full rounded-xl border border-border/80 bg-paper/50 dark:bg-black/30 px-3.5 py-3 text-sm text-ink placeholder:text-muted/60 transition focus:border-forest focus:bg-surface focus:outline-none focus:ring-2 focus:ring-forest/20"
              {...register("desiredStart")}
            />
          </label>
        </div>
      ) : null}

      {!compact && !isPrivacyCategory ? (
        <label className="text-sm font-semibold text-ink">
          Project type <span className="font-normal text-muted text-xs">(optional)</span>
          <select
            className="mt-2 w-full rounded-xl border border-border/80 bg-paper/50 dark:bg-black/30 px-3.5 py-3 text-sm text-ink transition focus:border-forest focus:bg-surface focus:outline-none focus:ring-2 focus:ring-forest/20"
            {...register("projectType")}
          >
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {projectLabels[type]}
              </option>
            ))}
          </select>
          <FieldError message={errors.projectType?.message} />
        </label>
      ) : null}

      {/* Message Textarea */}
      <label className="block text-sm font-semibold text-ink">
        <span className="flex items-center justify-between">
          <span>
            {isPrivacyCategory
              ? "Describe your data protection request or grievance"
              : compact
                ? "What is difficult, or what would you like to change?"
                : "Describe the challenge"}
            <RequiredMark />
          </span>
          <span
            className={`font-mono text-[11px] font-normal ${
              charCount >= 30 ? "text-emerald-600 dark:text-emerald-400 font-semibold" : "text-muted"
            }`}
          >
            {charCount >= 30 ? `✓ ${charCount} chars` : `${charCount}/30 min`}
          </span>
        </span>
        <textarea
          id="message"
          placeholder={
            compact
              ? "Share a brief overview of your business situation, software challenge, or general question..."
              : "Describe the challenge, existing tech stack context, timeline goals, and what success looks like..."
          }
          className="mt-2 min-h-32 w-full font-normal rounded-xl border border-border/80 bg-paper/50 dark:bg-black/30 p-3.5 text-sm text-ink placeholder:text-muted/60 transition focus:border-forest focus:bg-surface focus:outline-none focus:ring-2 focus:ring-forest/20"
          {...register("message")}
        />
        <FieldError message={errors.message?.message} />
      </label>

      {!compact && !isPrivacyCategory ? (
        <label className="text-sm font-semibold text-ink">
          Preferred contact method <span className="font-normal text-muted text-xs">(optional)</span>
          <input
            placeholder="e.g. Email or Google Meet"
            className="mt-2 w-full rounded-xl border border-border/80 bg-paper/50 dark:bg-black/30 px-3.5 py-3 text-sm text-ink placeholder:text-muted/60 transition focus:border-forest focus:bg-surface focus:outline-none focus:ring-2 focus:ring-forest/20"
            {...register("contactMethod")}
          />
        </label>
      ) : null}

      {/* Privacy Checkbox */}
      <div className="rounded-xl border border-border/60 bg-paper/30 dark:bg-white/[0.01] p-3.5">
        <label className="flex items-start gap-3 text-xs leading-5 text-muted cursor-pointer">
          <input
            type="checkbox"
            className="mt-0.5 size-4 rounded border-border text-forest focus:ring-forest"
            {...register("privacy")}
          />
          <span>
            <RequiredMark />I understand Archex Craft will use my details to respond, and that this
            communication may be processed and stored as described in the{" "}
            <a
              href="/privacy"
              className="text-forest underline underline-offset-2 hover:text-ink"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy Policy
            </a>
            .
          </span>
        </label>
        <FieldError message={errors.privacy?.message} />
      </div>

      <TurnstileField
        onToken={(token) => setValue("turnstileToken", token, { shouldValidate: true })}
      />
      <input type="hidden" {...register("turnstileToken")} />

      {/* Status Alert */}
      {status ? (
        <div
          role="status"
          aria-live="polite"
          className={
            status.type === "success"
              ? "rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm font-medium text-emerald-800 dark:text-emerald-200"
              : "rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm font-medium text-danger"
          }
        >
          {status.message}
        </div>
      ) : null}

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        busy={isSubmitting}
        className="w-full justify-center py-3.5 text-base font-semibold shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
      >
        <span>
          {isSubmitting
            ? "Sending enquiry..."
            : isPrivacyCategory
              ? "Submit privacy request"
              : "Send enquiry"}
        </span>
        {!isSubmitting && <ArrowRight size={17} className="ml-1.5" />}
      </Button>

      {/* Trust micro-footer */}
      <div className="flex items-center justify-center gap-2 pt-1 font-mono text-[11px] text-muted text-center">
        <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
        <span>Reviewed directly by senior engineers · Zero spam commitment</span>
      </div>
    </form>
  );
}
