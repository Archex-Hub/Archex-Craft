"use client";

import { useState } from "react";
import { Container } from "@/components/layout/container";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Can I approach Archex Craft with just an idea?",
    answer:
      "Absolutely. You don't need to have a complete technical plan. We can start with the problem, understand what you're trying to achieve and explore what a practical software solution could look like.",
  },
  {
    question: "Can you work with software that my business already uses?",
    answer:
      "Yes. We can assess existing applications and systems, identify areas for improvement and explore ways to modernize or integrate them.",
  },
  {
    question: "Do you develop AI-powered applications?",
    answer:
      "Yes. We work on integrating AI into applications and business workflows, including intelligent document processing, knowledge retrieval and automation.",
  },
  {
    question: "What kinds of businesses do you work with?",
    answer:
      "We work on software challenges across different business contexts. The suitability of an engagement depends on the requirements, technical scope and the problem being addressed.",
  },
  {
    question: "How do projects usually begin?",
    answer:
      "They begin with a conversation. We understand your requirements, discuss the problem and work towards defining an appropriate scope and approach.",
  },
  {
    question: "Can you help after the software is delivered?",
    answer:
      "Further improvements, maintenance and support can be discussed as part of the engagement, depending on the needs of the software and business.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-24 lg:py-32 border-b border-border bg-surface/50 dark:bg-[#08090f] overflow-hidden scroll-mt-20 transition-colors duration-300"
      aria-label="Frequently Asked Questions"
    >
      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.8fr]">
          {/* Header */}
          <div className="space-y-4 max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-surface shadow-2xs">
              <span className="font-mono text-[11px] uppercase tracking-widest text-copper">
                FREQUENTLY ASKED QUESTIONS
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-ink leading-tight">
              A few things worth knowing.
            </h2>
            <p className="text-muted text-sm sm:text-base leading-relaxed">
              Common questions about how we evaluate projects, integrate with teams, and deliver durable software.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`rounded-xl border transition-all duration-300 backdrop-blur-md overflow-hidden ${
                    isOpen
                      ? "border-copper bg-surface shadow-md"
                      : "border-border bg-surface/80 hover:border-copper/50 shadow-2xs"
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
                      className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 shrink-0 ${
                        isOpen
                          ? "border-copper bg-copper/10 text-copper rotate-180"
                          : "border-border bg-surface text-muted"
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
