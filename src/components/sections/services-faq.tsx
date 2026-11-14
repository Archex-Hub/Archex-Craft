"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

type FaqItem = {
  question: string;
  answer: string;
};

const FAQS: FaqItem[] = [
  {
    question: "How do you guarantee zero-error software delivery?",
    answer:
      "We achieve zero-error software through a multi-layered engineering discipline: strict runtime validation (Zod & TypeScript), deterministic state boundaries, and end-to-end automated testing (Playwright, unit suites, and API contracts) run on every pull request. We treat architecture as durable infrastructure, prioritizing explicit error handling and automated regression guards over rushed shortcuts."
  },
  {
    question: "Can you collaborate with our existing in-house team or codebase?",
    answer:
      "Yes. We frequently integrate with internal engineering teams to accelerate roadmaps, untangle legacy bottlenecks, or deliver specialized capabilities like AI workflows or commerce architecture. We work directly in your repositories, follow your branching strategies, and provide transparent documentation and pull requests."
  },
  {
    question: "How do you structure project scope and pricing?",
    answer:
      "We provide two primary structures: fixed-scope milestone delivery for projects with well-defined boundaries, and dedicated engineering sprints for evolving products and ongoing platform development. In both models, deliverables are demoed weekly, scope is transparently tracked, and you only pay for high-velocity senior engineering."
  },
  {
    question: "Who owns the intellectual property, code, and deployments?",
    answer:
      "You own 100% of everything we create. All source code, Git histories, CI/CD pipelines, database schemas, and documentation are committed directly to your accounts with zero proprietary lock-in or licensing fees. When our engagement concludes, your team has full autonomy to run and maintain the platform."
  },
  {
    question: "How do you integrate AI capabilities without hallucinations?",
    answer:
      "We engineer AI as reliable software rather than open-ended chatbots. We enforce strict JSON schema output parsing, ground model context through verified vector retrieval (RAG) against your actual business data, set automated confidence score thresholds, and implement clear escalation routes to human operators whenever certainty is low."
  }
];

export function ServicesFaq() {
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
