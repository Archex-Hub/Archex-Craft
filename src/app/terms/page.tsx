import { Container } from "@/components/layout/container";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Terms of Use & Service Terms",
  description:
    "Terms governing use of the Archex Web website and the general basis for its software engineering services.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <>
      <section className="border-b border-border bg-surface-muted">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-5xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-olive">Legal</p>
            <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.98] tracking-[-0.04em]">
              Terms of use <span className="text-muted">&amp;</span> service terms
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-5 text-sm text-muted">
              <span>
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-olive">
                  Revision date
                </span>{" "}
                4 September 2026
              </span>
              <span>Website use and professional service terms</span>
            </div>
          </div>
        </Container>
      </section>
      <Container className="terms-document py-12 sm:py-16 lg:py-20">
        <div className="grid max-w-[1400px] gap-10 lg:grid-cols-[15rem_minmax(0,58rem)]">
          <aside className="h-fit lg:sticky lg:top-28">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-olive">On this page</p>
            <nav aria-label="Terms sections" className="mt-5 border-l border-border pl-4">
              <ol className="space-y-2 text-sm text-muted">
                {[
                  ["about-archex", "About Archex"],
                  ["website-use", "Use of this website"],
                  ["website-information", "Website information"],
                  ["enquiries", "Enquiries and proposals"],
                  ["scope", "Project scope"],
                  ["client-responsibilities", "Client responsibilities"],
                  ["fees", "Fees and payments"],
                  ["intellectual-property", "Intellectual property"],
                  ["third-party", "Third-party services"],
                  ["ai", "AI and automated systems"],
                  ["confidentiality", "Confidentiality"],
                  ["delivery", "Delivery and acceptance"],
                  ["support", "Maintenance and support"],
                  ["termination", "Suspension and termination"],
                  ["warranties", "Warranties and disclaimers"],
                  ["liability", "Limitation of liability"],
                  ["external-links", "External links"],
                  ["changes", "Changes to these Terms"]
                ].map(([id, label], index) => (
                  <li key={id}>
                    <a href={`#${id}`} className="transition-colors hover:text-ink">
                      <span className="mr-2 font-mono text-[0.65rem] text-olive">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
          <article className="prose-content min-w-0">
        <p className="terms-lead">
          These Terms of Use &amp; Service Terms (&quot;Terms&quot;) govern access to the Archex
          website at{" "}
          <a href="https://www.archexweb.in">https://www.archexweb.in</a> and the general basis on
          which Archex (&quot;Archex&quot;, &quot;we&quot;, &quot;us&quot; or &quot;our&quot;)
          provides software engineering, digital product development, AI integration and related
          technology services.
        </p>
        <p>
          By accessing this website, you agree to comply with the provisions that apply to website
          use. If you engage Archex for professional services, the additional service terms below
          apply together with the relevant written proposal, Statement of Work (SOW), Master
          Services Agreement (MSA) or other agreement accepted by both parties.
        </p>

        <h2 id="about-archex">1. About Archex</h2>
        <p>
          Archex provides digital product and software engineering services, including custom
          software development, AI integration and intelligent automation, web and mobile
          development, ecommerce solutions, business-system integrations, application
          modernization, quality engineering and ongoing technical support.
        </p>
        <p>
          The precise services offered for an individual project will be described in the
          applicable proposal or project agreement.
        </p>

        <h2 id="website-use">2. Use of this website</h2>
        <p>
          You may use this website to learn about Archex, explore its services and submit
          legitimate business enquiries.
        </p>
        <p>You agree not to:</p>
        <ul>
          <li>Use the website for unlawful, fraudulent or misleading purposes.</li>
          <li>Attempt to gain unauthorized access to the website, its infrastructure or related systems.</li>
          <li>Interfere with the website&apos;s availability, security or normal operation.</li>
          <li>Introduce malicious code or attempt to compromise the website.</li>
          <li>Copy, reproduce or commercially exploit website materials without permission, except where permitted by applicable law.</li>
        </ul>
        <p>
          We may restrict access where reasonably necessary to protect the website, its users or
          our systems.
        </p>

        <h2 id="website-information">3. Website information and service descriptions</h2>
        <p>
          The information on this website is provided for general informational purposes.
          Service descriptions, technical explanations, examples and illustrations are intended to
          help visitors understand the types of work Archex may undertake. They do not, by
          themselves, constitute a binding proposal, technical specification, delivery commitment
          or guarantee of a particular outcome.
        </p>
        <p>
          We make reasonable efforts to keep website information accurate and current, but we do
          not guarantee that every page or description will always be complete or up to date.
        </p>

        <h2 id="enquiries">4. Enquiries, estimates and proposals</h2>
        <p>
          Submitting a contact form, project enquiry or other communication does not automatically
          create a client relationship or require Archex to accept an engagement.
        </p>
        <p>
          Any preliminary discussion, indicative estimate or website information is subject to
          further assessment. Before work begins, the parties should agree in writing on the
          applicable project scope, deliverables, fees, timelines, assumptions and
          responsibilities.
        </p>
        <p>
          A proposal or estimate is not binding beyond the period and conditions expressly stated
          in it.
        </p>

        <h2 id="scope">5. Project scope and changes</h2>
        <p>
          Each professional engagement should be governed by a written proposal, SOW, MSA or other
          mutually accepted project agreement.
        </p>
        <p>The applicable agreement should describe, as relevant:</p>
        <ul>
          <li>Project objectives and requirements.</li>
          <li>Features, deliverables and exclusions.</li>
          <li>Technical scope and integrations.</li>
          <li>Milestones and delivery expectations.</li>
          <li>Fees and payment arrangements.</li>
          <li>Acceptance criteria.</li>
          <li>Responsibilities of each party.</li>
        </ul>
        <p>
          Requests that materially change the agreed scope may require revised fees, timelines or
          delivery arrangements. Such changes should be reviewed and agreed in writing before
          additional work is undertaken.
        </p>

        <h2 id="client-responsibilities">6. Client responsibilities</h2>
        <p>Clients are expected to:</p>
        <ul>
          <li>Provide accurate requirements, information and project materials.</li>
          <li>Appoint an appropriate contact for decisions and approvals.</li>
          <li>Provide authorized access to relevant systems, environments and services.</li>
          <li>Ensure that materials and data supplied to Archex may lawfully be used for the project.</li>
          <li>Review deliverables and provide feedback within agreed timeframes.</li>
          <li>Maintain appropriate backups and access controls for their own systems.</li>
          <li>Pay agreed fees according to the applicable project agreement.</li>
        </ul>
        <p>
          Delays caused by missing information, access, approvals or other client dependencies may
          affect delivery schedules. The parties should discuss and document any resulting changes.
        </p>

        <h2 id="fees">7. Fees and payments</h2>
        <p>
          Fees, payment schedules, taxes, reimbursable expenses and any applicable deposits will be
          set out in the relevant proposal, invoice or project agreement. Unless otherwise agreed
          in writing, payment obligations are governed by those project-specific documents.
        </p>
        <p>Any changes to fees or payment arrangements should be communicated and agreed in writing.</p>

        <h2 id="intellectual-property">8. Intellectual property and ownership</h2>
        <p>
          Ownership and permitted use of project deliverables should be expressly defined in the
          applicable project agreement. That agreement should distinguish between:
        </p>
        <ul>
          <li>Custom deliverables created specifically for the client.</li>
          <li>Materials, software, tools and components owned or developed by Archex before the engagement or independently of it.</li>
          <li>Open-source and third-party software.</li>
          <li>Client-provided materials, data and intellectual property.</li>
        </ul>
        <p>
          No transfer or licence of intellectual property should be assumed beyond the rights
          expressly agreed by the parties.
        </p>
        <p>
          Unless separately authorized in writing, Archex will not assume permission to publish
          confidential client materials, project details, screenshots or the client&apos;s identity
          in its portfolio or marketing.
        </p>

        <h2 id="third-party">9. Third-party services and software</h2>
        <p>
          Projects may depend on third-party platforms, cloud providers, APIs, libraries, payment
          services, content-management systems or other external products. Such services may be
          governed by separate terms, licences, pricing and usage restrictions.
        </p>
        <p>
          Archex does not control independent third-party providers and cannot guarantee their
          uninterrupted availability, continued functionality, pricing or future compatibility.
          Any project-specific responsibilities for selecting, configuring, licensing or
          maintaining third-party services should be documented in the relevant agreement.
        </p>

        <h2 id="ai">10. AI and automated systems</h2>
        <p>
          Some services may involve artificial intelligence, machine learning, language models,
          automated workflows or other probabilistic systems.
        </p>
        <p>
          AI-generated outputs may be inaccurate, incomplete, inconsistent or unsuitable for a
          particular purpose. Their quality may depend on the available data, model behaviour,
          configuration and third-party services.
        </p>
        <p>
          Where appropriate, systems should include evaluation, monitoring, validation and human
          review. Clients remain responsible for determining whether outputs are suitable for their
          intended business decisions and uses.
        </p>
        <p>
          The parties should agree on relevant data permissions, security requirements, human
          oversight and operational responsibilities before deploying AI-enabled systems.
        </p>

        <h2 id="confidentiality">11. Confidentiality</h2>
        <p>
          Confidential information shared during a professional engagement should be handled in
          accordance with any applicable NDA, MSA or project agreement.
        </p>
        <p>
          Where no separate confidentiality agreement exists, the parties should agree on
          appropriate confidentiality obligations before exchanging sensitive business, technical
          or personal information. Confidentiality arrangements should address permitted use,
          access, disclosure, protection and any required return or deletion of information.
        </p>

        <h2 id="delivery">12. Delivery, testing and acceptance</h2>
        <p>
          Project milestones, testing responsibilities, acceptance criteria and handover
          requirements should be defined in the relevant project agreement.
        </p>
        <p>
          Clients should review submitted deliverables and communicate any material issues within
          the agreed review period.
        </p>
        <p>
          Any warranty period, defect correction obligation, deployment responsibility or
          post-delivery support arrangement should be expressly documented rather than assumed.
        </p>

        <h2 id="support">13. Maintenance and support</h2>
        <p>
          Ongoing maintenance, monitoring, hosting, incident response, updates and technical
          support are not automatically included in every development engagement.
        </p>
        <p>
          Where these services are required, their scope, availability, response expectations,
          fees and responsibilities should be agreed separately in writing.
        </p>

        <h2 id="termination">14. Suspension and termination</h2>
        <p>
          The conditions for suspension or termination of a professional engagement should be
          specified in the applicable project agreement. That agreement should address outstanding
          fees, work completed, committed third-party costs, access to systems, transfer of
          deliverables and the return or handling of confidential information.
        </p>
        <p>
          Archex may restrict or suspend access to its website where reasonably necessary for
          security, maintenance, legal compliance or protection against misuse.
        </p>

        <h2 id="warranties">15. Warranties and disclaimers</h2>
        <p>
          To the extent permitted by applicable law, website content is provided for general
          information without a guarantee that the website will always be uninterrupted,
          error-free or suitable for every purpose.
        </p>
        <p>
          Any warranties relating to professional services, software deliverables, performance,
          security, compatibility or defect correction should be set out in the applicable project
          agreement.
        </p>
        <p>
          Nothing in these Terms is intended to exclude a right or protection that cannot lawfully
          be excluded.
        </p>

        <h2 id="liability">16. Limitation of liability</h2>
        <p>
          The allocation and limitation of liability for a professional engagement should be set
          out in the applicable MSA, SOW or other project agreement.
        </p>
        <p>
          Any limitation should be reasonable, clearly drafted and reviewed for compliance with
          applicable law. It should address the relevant categories of loss, any agreed financial
          cap and any exceptions required by law.
        </p>
        <p>
          Nothing in these Terms excludes liability to the extent that such exclusion is prohibited
          by applicable law.
        </p>

        <h2 id="external-links">17. External links</h2>
        <p>
          This website may contain links to third-party websites or services for convenience or
          reference. Archex does not control those external resources and is not responsible for
          their content, availability, security or privacy practices.
        </p>
        <p>
          Accessing third-party websites is at your discretion and subject to their own terms.
        </p>

        <h2 id="changes">18. Changes to these Terms</h2>
        <p>
          We may update these Terms to reflect changes to the website, our services or applicable
          requirements. The revised version will be published on this page with an updated revision
          date.
        </p>
        <p>
          Changes to an existing professional engagement will be governed by the applicable project
          agreement and any mutually agreed amendments.
        </p>
          </article>
        </div>
      </Container>
    </>
  );
}
