import { z } from "zod";

export const projectTypes = [
  "new-product",
  "ai-integration",
  "modernization",
  "ongoing-engineering",
  "not-sure"
] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(120),
  email: z.string().trim().email("Enter a valid work email").max(180),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  projectType: z.enum(projectTypes).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(30, "Share a little more about what is difficult or what you want to change")
    .max(4000),
  budgetRange: z.string().trim().max(80).optional().or(z.literal("")),
  desiredStart: z.string().trim().max(80).optional().or(z.literal("")),
  contactMethod: z.string().trim().max(80).optional().or(z.literal("")),
  privacy: z.boolean().refine((value) => value, "Please acknowledge the privacy notice"),
  website: z.string().max(0).optional(),
  turnstileToken: z.string().optional()
});

export type LeadInput = z.infer<typeof leadSchema>;

export const leadInsertSchema = leadSchema.transform((lead) => ({
  name: lead.name,
  email: lead.email,
  company:
    lead.company && lead.company.trim().length >= 2
      ? lead.company.trim()
      : "Not specified",
  project_type:
    lead.projectType && lead.projectType.length > 0
      ? lead.projectType
      : "not-sure",
  message: lead.message,
  budget_range: lead.budgetRange || null,
  desired_start: lead.desiredStart || null,
  contact_method: lead.contactMethod || null,
  privacy_consent: lead.privacy,
  privacy_consented_at: lead.privacy ? new Date().toISOString() : null,
  status: "new"
}));
