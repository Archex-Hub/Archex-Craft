import { describe, expect, it } from "vitest";
import { leadInsertSchema, leadSchema } from "@/features/leads/schema";

const validLead = {
  name: "Avery Stone",
  email: "avery@example.com",
  company: "Example Co",
  projectType: "ai-integration",
  message: "We need help evaluating an AI workflow for document intake and review.",
  privacy: true,
  website: ""
};

describe("leadSchema", () => {
  it("accepts a valid lead", () => {
    expect(leadSchema.safeParse(validLead).success).toBe(true);
  });

  it("accepts a lead without company or projectType", () => {
    const minimalLead = {
      name: "Taylor Reed",
      email: "taylor@example.com",
      message: "We are exploring software modernisation options for our internal portal.",
      privacy: true
    };
    const result = leadSchema.safeParse(minimalLead);
    expect(result.success).toBe(true);

    if (result.success) {
      const inserted = leadInsertSchema.parse(result.data);
      expect(inserted.company).toBe("Not specified");
      expect(inserted.project_type).toBe("not-sure");
    }
  });

  it("accepts a lead with empty optional strings", () => {
    const emptyOptionalLead = {
      name: "Jordan Lee",
      email: "jordan@example.com",
      company: "",
      projectType: "",
      budgetRange: "",
      desiredStart: "",
      contactMethod: "",
      message: "Looking for an initial discussion on workflow automation constraints.",
      privacy: true
    };
    const result = leadSchema.safeParse(emptyOptionalLead);
    expect(result.success).toBe(true);

    if (result.success) {
      const inserted = leadInsertSchema.parse(result.data);
      expect(inserted.company).toBe("Not specified");
      expect(inserted.project_type).toBe("not-sure");
      expect(inserted.budget_range).toBeNull();
      expect(inserted.desired_start).toBeNull();
      expect(inserted.contact_method).toBeNull();
    }
  });

  it("accepts a privacy data protection request and formats correctly", () => {
    const privacyRequest = {
      name: "Morgan Bailey",
      email: "morgan@example.com",
      category: "privacy-deletion",
      message: "Please erase all my personal records and contact logs from your systems.",
      privacy: true
    };
    const result = leadSchema.safeParse(privacyRequest);
    expect(result.success).toBe(true);

    if (result.success) {
      const inserted = leadInsertSchema.parse(result.data);
      expect(inserted.company).toBe("Privacy Request");
      expect(inserted.project_type).toBe("not-sure");
      expect(inserted.message).toContain("[Request Category: Privacy: Deletion / Erasure Request]");
    }
  });

  it("rejects short messages", () => {
    expect(leadSchema.safeParse({ ...validLead, message: "Too short", privacy: true }).success).toBe(false);
  });

  it("rejects missing required fields", () => {
    expect(leadSchema.safeParse({ ...validLead, name: "" }).success).toBe(false);
    expect(leadSchema.safeParse({ ...validLead, email: "invalid-email" }).success).toBe(false);
    expect(leadSchema.safeParse({ ...validLead, privacy: false }).success).toBe(false);
  });
});
