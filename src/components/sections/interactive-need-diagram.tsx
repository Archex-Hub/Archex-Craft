"use client";

import { useState } from "react";
import { MotionViewport } from "@/components/ui/motion-viewport";

const needs = [
  {
    label: "I have an idea for a product or app.",
    title: "An idea becomes a product question",
    description:
      "Start with the people the product is for and the problem it may address. Existing product and software pages can help you explore the topic.",
    nodes: ["Product idea", "Intended users", "Possible tools", "Questions to explore"],
    href: "/services",
    link: "Explore product and software services"
  },
  {
    label: "We need a tool for our business.",
    title: "A business tool starts with the work",
    description:
      "Consider the task the tool should support, who is involved and which tools are already in use. Relevant pages include business software topics such as web applications, CRM and ERP.",
    nodes: ["Business task", "People at work", "Current tools", "Possible tool"],
    href: "/services",
    link: "Browse the service catalogue"
  },
  {
    label: "Our website or online store needs work.",
    title: "A website is part of a visitor journey",
    description:
      "Content, navigation, the platform and development can all shape a website or store. The existing catalogue describes these topics; specific scope depends on the situation.",
    nodes: ["Visitor need", "Page content", "Website tools", "Next action"],
    href: "/services",
    link: "Browse website and ecommerce information"
  },
  {
    label: "Too much of our work is manual or disconnected.",
    title: "Manual work reveals a handoff question",
    description:
      "Repeated steps or information moving between tools are useful problems to describe. This path does not imply a confirmed automation offer or supported integration.",
    nodes: ["Repeated step", "People involved", "Tools and handoffs", "Open question"],
    href: "/ai-solutions",
    link: "Explore related software information"
  },
  {
    label: "Our existing software needs attention.",
    title: "Current software can have several paths",
    description:
      "Assessment, incremental change and other modernization topics may help frame the question. The current situation shapes which options are relevant; a rewrite is not assumed.",
    nodes: ["Current system", "People relying on it", "Existing tools", "Possible options"],
    href: "/modernization",
    link: "Explore modernization information"
  },
  {
    label: "I'm not sure yet.",
    title: "Start with what you know",
    description:
      "Describe what is happening in your own words. You can begin without choosing a service, a technology or a particular solution.",
    nodes: ["Situation", "People affected", "Current tools", "Questions to ask"],
    href: "/contact",
    link: "Start a conversation"
  }
] as const;

const storyStages = [
  "The situation",
  "What is involved",
  "How it connects",
  "What to explore next"
] as const;
const stagePrompts = [
  "Start with the situation as it is today.",
  "Notice the people, tools or activities around it.",
  "Explore where work or information passes between them.",
  "Use the context to decide what questions may be useful next."
] as const;

export function InteractiveNeedDiagram() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedStage, setSelectedStage] = useState(0);
  const selected = needs[selectedIndex];

  function selectStage(index: number) {
    setSelectedStage(Math.max(0, Math.min(storyStages.length - 1, index)));
  }

  return (
    <div className="need-explorer">
      <div className="need-picker" role="group" aria-label="Choose a business situation">
        {needs.map((need, index) => (
          <button
            type="button"
            className="need-choice"
            key={need.label}
            aria-pressed={selectedIndex === index}
            onClick={() => {
              setSelectedIndex(index);
              setSelectedStage(0);
            }}
          >
            <span className="need-choice-marker" aria-hidden="true" />
            <span>{need.label}</span>
          </button>
        ))}
      </div>

      <section className="need-diagram-panel" aria-labelledby="need-diagram-title">
        <div
          key={selectedIndex}
          className="need-diagram-copy"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="home-overline">A way to frame the question</p>
          <h3 id="need-diagram-title">{selected.title}</h3>
          <p className="need-diagram-description">{selected.description}</p>
        </div>

        <MotionViewport className="need-map-wrap" disableMotionAtSmall>
          {(motionActive) => (
            <>
              <svg
                className="need-map"
                viewBox="0 0 760 220"
                role="img"
                aria-labelledby="need-map-title need-map-description"
              >
                <title id="need-map-title">{`Illustrative map for: ${selected.title}`}</title>
                <desc id="need-map-description">
                  An illustrative sequence from {selected.nodes[0]} through people and tools to{" "}
                  {selected.nodes[3]}. Stage {selectedStage + 1} is active.
                </desc>
                <path className="need-map-line" d="M100 96H660" />
                <path className="need-map-dash" d={`M100 96H${100 + selectedStage * 187}`} />
                {motionActive && selectedStage > 0 ? (
                  <circle className="need-map-signal" r="5" aria-hidden="true">
                    <animateMotion
                      dur="8s"
                      repeatCount="indefinite"
                      path={`M100 96H${100 + selectedStage * 187}`}
                    />
                  </circle>
                ) : null}
                {selected.nodes.map((node, index) => {
                  const x = 100 + index * 187;
                  return (
                    <g
                      key={`stage-${index}`}
                      className={`need-map-node${selectedStage === index ? " is-focused" : ""}${selectedStage > index ? " is-past" : ""}`}
                    >
                      <rect x={x - 72} y="50" width="144" height="92" rx="3" />
                      <text className="need-map-number" x={x - 58} y="70">
                        {String(index + 1).padStart(2, "0")}
                      </text>
                      <circle cx={x} cy="96" r="7" />
                      <text className="need-map-label" x={x} y="173" textAnchor="middle">
                        {node}
                      </text>
                    </g>
                  );
                })}
              </svg>
              <ol className="need-map-mobile" aria-label="Illustrative path through the situation">
                {selected.nodes.map((node, index) => (
                  <li
                    className={
                      selectedStage === index
                        ? "is-focused"
                        : selectedStage > index
                          ? "is-past"
                          : undefined
                    }
                    key={`stage-${index}`}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {node}
                  </li>
                ))}
              </ol>
            </>
          )}
        </MotionViewport>

        <div className="need-story-controls" aria-label="Explore the situation in stages">
          <div className="need-stage-tabs" role="group" aria-label="Story stages">
            {storyStages.map((stage, index) => (
              <button
                key={stage}
                type="button"
                aria-pressed={selectedStage === index}
                onClick={() => selectStage(index)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {stage}
              </button>
            ))}
          </div>
          <div className="need-stage-current" aria-live="polite" aria-atomic="true">
            <span>Stage {String(selectedStage + 1).padStart(2, "0")} / 04</span>
            <p>
              {stagePrompts[selectedStage]} <strong>{selected.nodes[selectedStage]}.</strong>
            </p>
            <div>
              <button
                type="button"
                onClick={() => selectStage(selectedStage - 1)}
                disabled={selectedStage === 0}
                aria-label="Previous story stage"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => selectStage(selectedStage + 1)}
                disabled={selectedStage === storyStages.length - 1}
                aria-label="Next story stage"
              >
                Next <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>

        <div className="need-diagram-footer">
          <p>Illustrative model — a way to explore the question, not a specific deployed system.</p>
          <a href={selected.href}>
            {selected.link} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </div>
  );
}
