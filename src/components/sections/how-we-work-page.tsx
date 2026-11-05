"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowRight, Check, Circle, GitBranch, Layers, Workflow } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

type Stage = {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  outputs: string[];
  client: string;
};

const stages: Stage[] = [
  {
    id: "understand",
    number: "01",
    title: "Understand",
    headline: "Before we build anything, we understand what needs to change.",
    description:
      "We bring the business objective, users, existing workflows and software into the same conversation. That creates a grounded starting point instead of treating a symptom as the whole problem.",
    outputs: [
      "Shared understanding of the problem",
      "Initial requirements and priorities",
      "Existing systems and constraints",
      "Key questions, risks and assumptions"
    ],
    client: "Share context, introduce the people closest to the work, and help distinguish essential constraints from inherited habits."
  },
  {
    id: "plan",
    number: "02",
    title: "Plan",
    headline: "Turn the problem into a plan that can be engineered.",
    description:
      "We shape the work into a clear boundary: what is included, what is not, how systems connect, and how progress will be evaluated. The plan is detailed enough to guide engineering without pretending uncertainty does not exist.",
    outputs: [
      "Documented scope and priorities",
      "Proposed technical approach",
      "Architecture or workflow documentation",
      "Milestones, acceptance criteria and open decisions"
    ],
    client: "Make the important trade-offs visible, confirm priorities, and agree what evidence will show that the work is moving in the right direction."
  },
  {
    id: "build",
    number: "03",
    title: "Build and validate",
    headline: "Build the solution. Test the assumptions. Improve what matters.",
    description:
      "Engineering happens in reviewable slices. We implement, integrate, test and refine the solution while decisions are still close enough to the work to change course when the evidence calls for it.",
    outputs: [
      "Working software increments",
      "Demonstrable features and workflows",
      "Appropriate testing and review evidence",
      "Documented decisions and issues"
    ],
    client: "Review working progress, answer questions about real-world behavior, and help refine the solution as new information appears."
  },
  {
    id: "deliver",
    number: "04",
    title: "Deliver and improve",
    headline: "Delivery is a transition, not the end of the thinking.",
    description:
      "We prepare the agreed deliverables for their next environment, document what matters, and make the handover understandable. Where ongoing improvement is useful, the next step is based on what the software and its users reveal.",
    outputs: [
      "Agreed deliverables",
      "Relevant code and documentation",
      "Handover and operational materials",
      "Agreed next steps"
    ],
    client: "Confirm the release or handover context, provide operational ownership, and decide which improvements belong in the next conversation."
  }
];

const modes = {
  product: {
    label: "New digital product",
    icon: Layers,
    steps: [
      "Understand users, business objectives and product requirements.",
      "Plan user journeys, product scope and architecture.",
      "Build features, validate workflows and refine the experience.",
      "Release with documentation and a path for future development."
    ]
  },
  ai: {
    label: "AI integration",
    icon: Workflow,
    steps: [
      "Understand workflow, data, decision points and user needs.",
      "Plan model selection, integrations, permissions and evaluation.",
      "Build and test the workflow, including failure handling and human review.",
      "Deploy with appropriate monitoring and operational controls."
    ]
  },
  modernization: {
    label: "Application modernization",
    icon: GitBranch,
    steps: [
      "Understand the current system, dependencies and technical risks.",
      "Plan stabilization, migration boundaries and priorities.",
      "Improve or migrate components in controlled increments.",
      "Validate the result, document changes and plan future improvements."
    ]
  },
  integration: {
    label: "Business-system integration",
    icon: Circle,
    steps: [
      "Understand applications, data and manual handoffs.",
      "Plan integration boundaries, data flows and failure handling.",
      "Implement and validate APIs, events and synchronization.",
      "Monitor the integration and document operational responsibilities."
    ]
  }
} as const;

function ProcessDiagram({ kind }: { kind: "understand" | "plan" | "build" | "deliver" }) {
  if (kind === "understand") {
    return (
      <div className="relative overflow-hidden border border-dark-border bg-deep-navy p-5 text-on-dark sm:p-8">
        <svg viewBox="0 0 640 300" role="img" aria-label="Business objective connected to users, workflows and systems" className="h-auto w-full">
          <path d="M135 150H250M390 150h115M320 75v-35M320 225v35" stroke="#D1A477" strokeWidth="1.5" strokeDasharray="5 6" />
          {[
            ["Business objective", 22, 126, 118, 48, "#D1A477"],
            ["Users", 250, 18, 140, 48, "#26364A"],
            ["Workflows", 250, 234, 140, 48, "#26364A"],
            ["Existing systems", 505, 126, 118, 48, "#26364A"]
          ].map(([label, x, y, width, height, fill]) => (
            <g key={String(label)}>
              <rect x={Number(x)} y={Number(y)} width={Number(width)} height={Number(height)} rx="2" fill={String(fill)} stroke="#D1A477" />
              <text x={Number(x) + Number(width) / 2} y={Number(y) + Number(height) / 2 + 5} fill="#F4F1EA" fontSize="13" textAnchor="middle">{String(label)}</text>
            </g>
          ))}
          <circle cx="320" cy="150" r="31" fill="#192638" stroke="#D1A477" />
          <text x="320" y="146" fill="#F4F1EA" fontSize="11" textAnchor="middle">Friction</text>
          <text x="320" y="162" fill="#D1A477" fontSize="11" textAnchor="middle">points</text>
        </svg>
        <p className="mt-4 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-copper">Map the system around the problem</p>
      </div>
    );
  }

  const labels =
    kind === "plan"
      ? ["Requirements", "Boundaries", "Components", "Data flows"]
      : kind === "build"
        ? ["Design", "Engineer", "Integrate", "Test", "Review"]
        : ["Validated", "Release", "Document", "Improve"];
  return (
    <div className="border border-border bg-surface-muted p-5 sm:p-8">
      <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
        {labels.map((label, index) => (
          <div key={label} className="flex items-center gap-2">
            <div className="flex min-h-16 min-w-[6.5rem] items-center justify-center border border-border bg-paper px-3 text-center text-sm font-semibold">
              {label}
            </div>
            {index < labels.length - 1 ? <ArrowRight size={17} className="hidden text-olive sm:block" aria-hidden="true" /> : null}
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-2 sm:grid-cols-4">
        {["Clear inputs", "Defined boundaries", "Reviewable work", "Useful evidence"].map((item) => (
          <p key={item} className="border-t-2 border-olive pt-2 text-xs text-muted">{item}</p>
        ))}
      </div>
    </div>
  );
}

export function HowWeWorkPage() {
  const [mode, setMode] = useState<keyof typeof modes>("product");
  const selectedMode = modes[mode];

  return (
    <>
      <section className="bg-deep-navy text-on-dark">
        <Container className="grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-28">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-copper">Process</p>
            <h1 className="mt-6 max-w-3xl font-serif text-[clamp(2.8rem,6vw,5.8rem)] leading-[0.98] tracking-[-0.04em]">
              Clear thinking. Deliberate engineering. Software that moves forward.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-on-dark/75">
              From the first conversation to a working release, every engagement is shaped around a clear problem, agreed priorities, visible engineering progress and responsible delivery.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Button href="/start-project" variant="secondary">Discuss a project</Button>
              <a href="#stages" className="inline-flex items-center gap-2 text-sm font-semibold text-copper hover:text-on-dark">
                Explore our approach <ArrowDown size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="border border-dark-border p-4 sm:p-7">
            <svg viewBox="0 0 480 300" role="img" aria-label="Four stages connected from context to improvement" className="w-full">
              <path d="M55 150H425" stroke="#354457" strokeWidth="2" />
              {[["01", "Understand", 65], ["02", "Plan", 185], ["03", "Build", 305], ["04", "Improve", 425]].map(([num, label, x]) => (
                <g key={String(num)}>
                  <circle cx={Number(x)} cy="150" r="28" fill="#192638" stroke="#D1A477" strokeWidth="2" />
                  <text x={Number(x)} y="146" fill="#D1A477" fontSize="11" textAnchor="middle">{String(num)}</text>
                  <text x={Number(x)} y="162" fill="#F4F1EA" fontSize="8" textAnchor="middle">{String(label)}</text>
                  <text x={Number(x)} y="215" fill="#667382" fontSize="10" textAnchor="middle">{["Context", "Direction", "Evidence", "Momentum"][Number(num) - 1]}</text>
                </g>
              ))}
            </svg>
          </div>
        </Container>
      </section>

      <section id="stages" className="border-b border-border bg-paper">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-5 md:grid-cols-4">
            {stages.map((stage, index) => (
              <a key={stage.id} href={`#${stage.id}`} className="group border-t-2 border-border pt-5 hover:border-forest">
                <span className="font-mono text-xs text-olive">{stage.number}</span>
                <h2 className="mt-3 text-xl font-semibold">{stage.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{["Context before solutions.", "Boundaries before building.", "Evidence through working software.", "A handover with a next step."][index]}</p>
                <ArrowDown size={16} className="mt-5 text-olive transition-transform group-hover:translate-y-1" aria-hidden="true" />
              </a>
            ))}
          </div>
        </Container>
      </section>

      {stages.map((stage, index) => (
        <section key={stage.id} id={stage.id} className={index % 2 ? "bg-surface-muted" : "bg-paper"}>
          <Container className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-olive">{stage.number} / {stage.title}</p>
              <h2 className="mt-5 font-serif text-4xl leading-tight tracking-[-0.03em] sm:text-5xl">{stage.headline}</h2>
              <p className="mt-6 text-lg leading-8 text-muted">{stage.description}</p>
              <div className="mt-8 border-l-2 border-olive pl-5">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-olive">Your role</p>
                <p className="mt-2 text-sm leading-6 text-muted">{stage.client}</p>
              </div>
            </div>
            <div>
              <ProcessDiagram kind={stage.id === "build" ? "build" : stage.id === "deliver" ? "deliver" : stage.id as "understand" | "plan"} />
              <div className="mt-8 border-t border-border pt-6">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-olive">Possible outputs</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {stage.outputs.map((output) => <li key={output} className="flex gap-3 text-sm leading-6 text-muted"><Check size={17} className="mt-1 shrink-0 text-olive" aria-hidden="true" />{output}</li>)}
                </ul>
              </div>
            </div>
          </Container>
        </section>
      ))}

      <section className="bg-deep-navy text-on-dark">
        <Container className="py-16 sm:py-24">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-copper">Collaboration principles</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">You stay close to the work, not just the status.</h2>
          </div>
          <div className="mt-12 grid gap-px bg-dark-border sm:grid-cols-2 lg:grid-cols-5">
            {[
              ["01", "Clear decisions", "Important scope and technical decisions are documented."],
              ["02", "Visible progress", "Work is shared in reviewable increments appropriate to the engagement."],
              ["03", "Direct communication", "Questions, dependencies and blockers are surfaced."],
              ["04", "Agreed priorities", "Changes are evaluated against scope, effort and business value."],
              ["05", "Responsible delivery", "Testing, documentation and handover are considered throughout."]
            ].map(([number, title, body]) => (
              <div key={number} className="bg-deep-navy p-5">
                <span className="font-mono text-xs text-copper">{number}</span>
                <h3 className="mt-8 font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-on-dark/65">{body}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 font-serif text-2xl text-copper sm:text-3xl">No unnecessary surprises. No hidden decisions. No black-box delivery.</p>
        </Container>
      </section>

      <section className="bg-surface-muted">
        <Container className="py-16 sm:py-24">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-olive">What clients receive</p>
            <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">The work should leave you with something tangible.</h2>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {["Requirements and scope documentation", "User flows and workflow maps", "Technical architecture and integration plans", "Interface designs and prototypes", "Working software and source code", "Test results and validation records", "Technical documentation", "Deployment and handover materials"].map((item) => (
              <div key={item} className="border border-border bg-paper p-5 text-sm font-semibold leading-6">{item}</div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">Not every engagement requires every item. The specific deliverables are agreed before work begins.</p>
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="py-16 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-olive">Adaptable by design</p>
              <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">The process adapts to the work.</h2>
              <p className="mt-5 leading-7 text-muted">These are illustrative explanations, not fixed service commitments. The same delivery discipline takes a different shape depending on the problem.</p>
            </div>
            <div>
              <div role="tablist" aria-label="Engagement types" className="grid gap-2 sm:grid-cols-2">
                {Object.entries(modes).map(([key, item]) => {
                  const Icon = item.icon;
                  return <button key={key} type="button" role="tab" aria-selected={mode === key} onClick={() => setMode(key as keyof typeof modes)} className={`flex items-center gap-3 border p-4 text-left text-sm font-semibold transition-colors ${mode === key ? "border-forest bg-forest text-on-forest" : "border-border bg-surface hover:border-forest"}`}><Icon size={18} aria-hidden="true" />{item.label}</button>;
                })}
              </div>
              <div className="mt-5 border border-border bg-surface-muted p-6" role="tabpanel">
                <div className="grid gap-4 sm:grid-cols-2">
                  {selectedMode.steps.map((step, index) => <div key={step} className="flex gap-3"><span className="font-mono text-xs text-olive">0{index + 1}</span><p className="text-sm leading-6 text-muted">{step}</p></div>)}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-forest text-on-forest">
        <Container className="grid gap-8 py-16 sm:py-20 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="font-serif text-4xl leading-tight sm:text-5xl">Start with the problem. We&apos;ll work through the next step together.</h2>
            <p className="mt-4 max-w-2xl leading-7 text-on-forest/75">Tell us what you are trying to build, improve or connect. We can begin by understanding the context and identifying a sensible way forward.</p>
          </div>
          <div className="flex flex-wrap items-center gap-5">
            <Button href="/start-project" variant="secondary">Discuss a project</Button>
            <Link href="/services" className="text-sm font-semibold text-on-forest hover:text-copper">Explore services <ArrowRight size={15} className="ml-1 inline" aria-hidden="true" /></Link>
          </div>
        </Container>
      </section>
    </>
  );
}
