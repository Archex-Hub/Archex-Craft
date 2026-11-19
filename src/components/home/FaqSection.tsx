"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do I need a technical specification before contacting you?",
    answer:
      "No. You don't need a technical specification or architecture document. We regularly start with an outline of the business problem or idea, help you clarify requirements, and define the right technical scope together.",
  },
  {
    question: "Can I hire Craft without hiring Studio?",
    answer:
      "Yes. Craft and Studio operate as independent practices within Archex. You can engage Craft purely for software engineering, web application development, or AI workflows, or combine both if you need brand and product design as well.",
  },
  {
    question: "Can you work with software that my business already uses?",
    answer:
      "Yes. We assess existing codebases, databases, and third-party APIs. We can stabilize, refactor, modernize, or integrate existing systems without forcing an expensive complete rewrite.",
  },
  {
    question: "Do you build AI and workflow automations?",
    answer:
      "Yes. We build practical AI capabilities integrated into active business workflows—including document extraction, knowledge retrieval (RAG), automated data pipelines, and verified human-in-the-loop review guardrails.",
  },
  {
    question: "Who owns the code and intellectual property?",
    answer:
      "You do. 100% of the intellectual property, source code, repositories, data schemas, and deployment assets belong to you from day one. We never introduce proprietary runtime lock-in.",
  },
  {
    question: "What happens after the software is delivered?",
    answer:
      "We provide complete documentation, operational runbooks, and handover sessions. We can also provide continued engineering support or feature iterations depending on what your software and team need.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-20 lg:py-28 border-b border-border bg-paper scroll-mt-20 transition-colors duration-300"
      aria-label="Frequently Asked Questions"
    >
      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.8fr]">
          {/* Header */}
          <div className="space-y-4 max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface shadow-2xs">
              <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                QUESTIONS & CLARITY
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-tight">
              A few things worth knowing.
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Common questions about working with Craft, engineering scoping, and code ownership.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-forest bg-surface shadow-xs"
                      : "border-border bg-surface hover:border-forest/40 shadow-2xs"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="font-sans text-base sm:text-lg font-semibold text-ink tracking-wide pr-4">
                      {faq.question}
                    </span>
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200 shrink-0 ${
                        isOpen
                          ? "border-forest/20 bg-forest-subtle text-forest rotate-180"
                          : "border-border bg-surface-muted text-muted"
                      }`}
                    >
                      <ChevronDown size={16} />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-muted leading-relaxed border-t border-border">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
