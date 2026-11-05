import { Container, Section } from "@/components/layout/container";
import { PageHero } from "@/components/sections/page-hero";
import { CTA } from "@/components/sections/cta";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({ title: "Engagement Models", path: "/engagement-models" });

export default function EngagementModelsPage() {
  const models = [
    {
      title: "Defined-scope project delivery",
      summary:
        "A focused piece of product, integration, or modernization work with an agreed scope and checkpoints.",
      fit: "A new MVP, discrete portal, AI workflow integration, or targeted system migration where requirements can be shaped into an agreed initial boundary.",
      scope:
        "The proposal or service agreement records the agreed work, deliverables, technical choices, checkpoints, and how completion will be reviewed.",
      collaboration:
        "Progress reviews, demonstrations, and written decision records are agreed to suit the work and the people involved.",
      ownership:
        "Code, intellectual property, repositories, and handover materials are handled as set out in the project proposal or service agreement."
    },
    {
      title: "Extended engineering capacity",
      summary:
        "For an active product or operations team that needs additional engineering capacity.",
      fit: "Product engineering teams with established backlogs that need dedicated senior full-stack, AI, or backend engineers to accelerate roadmap velocity.",
      scope:
        "Priorities, responsibilities, and access to the client’s systems are agreed before the engagement begins.",
      collaboration:
        "The proposal or service agreement describes how the engineers will work with the client’s team and tools.",
      ownership:
        "Code and intellectual property ownership, repository access, and handover are set out in the project proposal or service agreement."
    },
    {
      title: "Ongoing engineering partnership",
      summary:
        "For software that needs ongoing maintenance, operational support, or gradual improvement.",
      fit: "Production systems and operational software that require dependable technical stewardship, regular dependency updates, and continuous improvements.",
      scope:
        "The work, priorities, and any planning checkpoints are agreed for the engagement and recorded in writing.",
      collaboration:
        "Review arrangements, monitoring responsibilities, and incident handling are agreed in the proposal or service agreement.",
      ownership:
        "Repository access, code ownership, documentation, and support responsibilities are agreed before work begins."
    }
  ];

  return (
    <>
      <PageHero
        eyebrow="Ways of working"
        title="Choose the working arrangement that fits the job."
        summary="A defined project delivery, embedded capacity, or ongoing support can each be right. The distinction is what needs to be delivered, how decisions are made, and where ownership sits."
      />
      <Section>
        <Container className="grid gap-8 lg:grid-cols-3">
          {models.map((model) => (
            <div
              key={model.title}
              className="flex flex-col rounded-md border border-border bg-surface p-6 sm:p-8"
            >
              <h2 className="text-2xl font-semibold leading-tight">{model.title}</h2>
              <p className="mt-4 text-sm leading-6 text-muted">{model.summary}</p>

              <div className="mt-8 space-y-6 border-t border-border pt-6 text-sm">
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-olive">
                    When it is a good fit
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{model.fit}</p>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-olive">
                    Scope & prioritization
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{model.scope}</p>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-olive">
                    Collaboration & review
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{model.collaboration}</p>
                </div>

                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.16em] text-olive">
                    Ownership & handover
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{model.ownership}</p>
                </div>
              </div>
            </div>
          ))}
        </Container>
      </Section>
      <CTA />
    </>
  );
}
