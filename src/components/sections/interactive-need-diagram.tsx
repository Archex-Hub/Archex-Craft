"use client";

import { useState } from "react";

const needs = [
  {
    label: "I have an idea for a product or app.",
    title: "An idea becomes a product question",
    description: "Start with the people the product is for and the problem it may address. Existing product and software pages can help you explore the topic.",
    nodes: ["Product idea", "Intended users", "Possible tools", "Questions to explore"],
    focus: 0,
    href: "/services",
    link: "Explore product and software services"
  },
  {
    label: "We need a tool for our business.",
    title: "A business tool starts with the work",
    description: "Consider the task the tool should support, who is involved and which tools are already in use. Relevant pages include business software topics such as web applications, CRM and ERP.",
    nodes: ["Business task", "People at work", "Current tools", "Possible tool"],
    focus: 2,
    href: "/services",
    link: "Browse the service catalogue"
  },
  {
    label: "Our website or online store needs work.",
    title: "A website is part of a visitor journey",
    description: "Content, navigation, the platform and development can all shape a website or store. The existing catalogue describes these topics; specific scope depends on the situation.",
    nodes: ["Visitor need", "Page content", "Website tools", "Next action"],
    focus: 1,
    href: "/services",
    link: "Browse website and ecommerce information"
  },
  {
    label: "Too much of our work is manual or disconnected.",
    title: "Manual work reveals a handoff question",
    description: "Repeated steps or information moving between tools are useful problems to describe. This path does not imply a confirmed automation offer or supported integration.",
    nodes: ["Repeated step", "People involved", "Tools and handoffs", "Open question"],
    focus: 2,
    href: "/ai-solutions",
    link: "Explore related software information"
  },
  {
    label: "Our existing software needs attention.",
    title: "Current software can have several paths",
    description: "Assessment, incremental change and other modernization topics may help frame the question. The current situation shapes which options are relevant; a rewrite is not assumed.",
    nodes: ["Current system", "People relying on it", "Existing tools", "Possible options"],
    focus: 0,
    href: "/modernization",
    link: "Explore modernization information"
  },
  {
    label: "I'm not sure yet.",
    title: "Start with what you know",
    description: "Describe what is happening in your own words. You can begin without choosing a service, a technology or a particular solution.",
    nodes: ["Situation", "People affected", "Current tools", "Questions to ask"],
    focus: 3,
    href: "/contact",
    link: "Start a conversation"
  }
] as const;

export function InteractiveNeedDiagram() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = needs[selectedIndex];

  return (
    <div className="need-explorer">
      <div className="need-picker" role="group" aria-label="Choose a business situation">
        {needs.map((need, index) => (
          <button
            type="button"
            className="need-choice"
            key={need.label}
            aria-pressed={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
          >
            <span className="need-choice-marker" aria-hidden="true" />
            <span>{need.label}</span>
          </button>
        ))}
      </div>

      <section className="need-diagram-panel" aria-labelledby="need-diagram-title">
        <div aria-live="polite" aria-atomic="true">
          <p className="home-overline">A way to frame the question</p>
          <h3 id="need-diagram-title">{selected.title}</h3>
          <p className="need-diagram-description">{selected.description}</p>
        </div>

        <div className="need-map-wrap">
          <svg
            className="need-map"
            viewBox="0 0 760 220"
            role="img"
            aria-labelledby="need-map-title need-map-description"
          >
            <title id="need-map-title">{`Illustrative map for: ${selected.title}`}</title>
            <desc id="need-map-description">
              A conceptual path from {selected.nodes[0]} through people and tools to {selected.nodes[3]}.
            </desc>
            <path className="need-map-line" d="M100 96H660" />
            <path className="need-map-dash" d="M100 96H660" />
            {selected.nodes.map((node, index) => {
              const x = 100 + index * 187;
              return (
                <g key={`${node}-${index}`} className={`need-map-node${selected.focus === index ? " is-focused" : ""}`}>
                  <rect x={x - 72} y="50" width="144" height="92" rx="3" />
                  <circle cx={x} cy="96" r="7" />
                  <text x={x} y="173" textAnchor="middle">{node}</text>
                </g>
              );
            })}
          </svg>
          <ol className="need-map-mobile" aria-label="Illustrative path through the situation">
            {selected.nodes.map((node, index) => <li className={selected.focus === index ? "is-focused" : undefined} key={node}>{node}</li>)}
          </ol>
        </div>

        <div className="need-diagram-footer">
          <p>Illustrative model — a way to explore the question, not a specific deployed system.</p>
          <a href={selected.href}>{selected.link} <span aria-hidden="true">↗</span></a>
        </div>
      </section>
    </div>
  );
}
