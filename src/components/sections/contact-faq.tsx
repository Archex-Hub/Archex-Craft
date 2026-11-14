"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    question: "How quickly will we hear back after submitting an enquiry?",
    answer:
      "We review all submissions within one business day (typically under 24 hours). A senior software engineer or solutions partner will respond directly with substantive technical observations and recommended next steps."
  },
  {
    question: "Can we sign a Non-Disclosure Agreement (NDA) before sharing details?",
    answer:
      "Yes. We routinely execute mutual NDAs with founders, CTOs, and product leaders before reviewing proprietary architectures, data schemas, or internal workflows. Simply indicate this in your message."
  },
  {
    question: "What if our project scope or architecture is not fully defined yet?",
    answer:
      "That is completely fine. Many of our best partnerships begin with an operational bottleneck or a high-level product thesis. We help you explore the trade-offs, define explicit boundaries, and shape an MVP roadmap."
  },
  {
    question: "Do you work with startups, growth-stage teams, and enterprises?",
    answer:
      "Yes. We engineer software for fast-growing venture-backed startups needing senior velocity without agency overhead, as well as established organizations looking to decouple legacy monoliths or integrate AI."
  },
  {
    question: "Can you collaborate directly with our existing engineering team?",
    answer:
      "Absolutely. We frequently integrate with internal engineering teams, opening pull requests in your repositories, adhering to your CI/CD pipelines, and providing clean documentation for long-term handover."
  }
];

export function ContactFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="mx-auto max-w-3xl divide-y divide-border/80 rounded-2xl border border-border/90 bg-surface dark:bg-[#111c2e] p-6 sm:p-8 shadow-xs">
      {FAQS.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className={index === 0 ? "pb-5" : "py-5"}>
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 text-left font-sans text-base sm:text-lg font-bold text-ink transition-colors hover:text-forest"
            >
              <span>{faq.question}</span>
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-full border border-border/80 bg-paper transition-transform duration-200 ${
                  isOpen ? "rotate-180 border-forest text-forest" : "text-muted"
                }`}
              >
                <ChevronDown size={16} />
              </span>
            </button>
            {isOpen && (
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted animate-fadeIn">
                {faq.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
