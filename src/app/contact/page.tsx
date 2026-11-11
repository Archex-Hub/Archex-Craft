import Link from "next/link";
import { Container, Section } from "@/components/layout/container";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { PageHero } from "@/components/sections/page-hero";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({ title: "Contact", path: "/contact" });

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact & Enquiries"
        title="Send an enquiry."
        summary="The central contact destination for the Archex ecosystem. Send a note for general questions, project conversations, collaborations, or data protection requests."
      />
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-2xl font-semibold">How can we help?</h2>
            <p className="mt-4 leading-7 text-muted">
              Whether you are reaching out about software engineering, creative direction, go-to-market collaboration, or a general question, send us a message and we will respond promptly.
            </p>
            <p className="mt-4 text-sm leading-6 text-muted">
              To exercise privacy rights under the DPDP Act or query your data, simply mention your request below.
            </p>
            <Link
              href="/start-project"
              className="mt-6 inline-flex text-sm font-semibold text-forest"
            >
              Have a structured engineering scope? Share a project brief <span aria-hidden="true">-&gt;</span>
            </Link>

            <div className="mt-8 border-t border-border pt-6 text-sm text-muted">
              <p className="font-semibold text-ink">Direct email channels</p>
              <ul className="mt-2 space-y-1 font-mono text-xs">
                <li>General: <a href="mailto:hello@archexweb.in" className="text-forest hover:underline">hello@archexweb.in</a></li>
                <li>Privacy: <a href="mailto:privacy@archexweb.in" className="text-forest hover:underline">privacy@archexweb.in</a></li>
                <li>Grievance: <a href="mailto:grievance@archexweb.in" className="text-forest hover:underline">grievance@archexweb.in</a></li>
              </ul>
            </div>
          </div>
          <EnquiryForm compact />
        </Container>
      </Section>
    </>
  );
}
