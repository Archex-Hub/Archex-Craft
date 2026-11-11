import { z } from "zod";

export const projectTypes = [
  "new-product",
  "ai-integration",
  "modernization",
  "ongoing-engineering",
  "not-sure"
] as const;

export const enquiryCategories = [
  "general",
  "project",
  "privacy-access",
  "privacy-correction",
  "privacy-deletion",
  "privacy-consent-withdrawal",
  "privacy-grievance",
  "privacy-question"
] as const;

export type EnquiryCategory = (typeof enquiryCategories)[number];

export const categoryLabels: Record<EnquiryCategory, string> = {
  general: "General Enquiry",
  project: "Project / Technical Enquiry",
  "privacy-access": "Privacy: Access Personal Information",
  "privacy-correction": "Privacy: Correction of Information",
  "privacy-deletion": "Privacy: Deletion / Erasure Request",
  "privacy-consent-withdrawal": "Privacy: Withdrawal of Consent",
  "privacy-grievance": "Privacy: Grievance or Complaint",
  "privacy-question": "Privacy: General Data Protection Question"
};

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(120),
  email: z.string().trim().email("Enter a valid work email").max(180),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  category: z.enum(enquiryCategories).optional().or(z.literal("")),
  projectType: z.enum(projectTypes).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(30, "Please provide at least 30 characters describing your enquiry or request")
    .max(4000),
  budgetRange: z.string().trim().max(80).optional().or(z.literal("")),
  desiredStart: z.string().trim().max(80).optional().or(z.literal("")),
  contactMethod: z.string().trim().max(80).optional().or(z.literal("")),
  privacy: z.boolean().refine((value) => value, "Please acknowledge the privacy notice"),
  website: z.string().max(0).optional(),
  turnstileToken: z.string().optional()
});

export type LeadInput = z.infer<typeof leadSchema>;

export const leadInsertSchema = leadSchema.transform((lead) => {
  const isPrivacy = Boolean(lead.category && lead.category.startsWith("privacy-"));
  const categoryLabel = (lead.category && lead.category in categoryLabels)
    ? categoryLabels[lead.category as EnquiryCategory]
    : undefined;
  
  // Format message with explicit category header if not general
  const formattedMessage =
    lead.category && lead.category !== "general" && categoryLabel
      ? `[Request Category: ${categoryLabel}]\n\n${lead.message}`
      : lead.message;

  return {
    name: lead.name,
    email: lead.email,
    company:
      lead.company && lead.company.trim().length >= 2
        ? lead.company.trim()
        : isPrivacy
          ? "Privacy Request"
          : "Not specified",
    project_type:
      lead.projectType && lead.projectType.length > 0 && ['new-product', 'ai-integration', 'modernization', 'ongoing-engineering'].includes(lead.projectType)
        ? lead.projectType
        : "not-sure",
    message: formattedMessage,
    budget_range: lead.budgetRange || null,
    desired_start: lead.desiredStart || null,
    contact_method: lead.contactMethod || null,
    privacy_consent: lead.privacy,
    privacy_consented_at: lead.privacy ? new Date().toISOString() : null,
    status: "new"
  };
});
