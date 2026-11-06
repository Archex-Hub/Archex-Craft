import { Container } from "@/components/layout/container";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Privacy Policy",
  description:
    "How Archex Web collects, uses, protects and manages information from website visitors and enquiries.",
  path: "/privacy"
});

const sections = [
  ["who-we-are", "Who we are"],
  ["information-collected", "Information we collect"],
  ["how-we-use", "How we use information"],
  ["storage-processing", "Storage and processing"],
  ["sharing", "How we share information"],
  ["cookies", "Cookies and similar technologies"],
  ["retention", "Data retention"],
  ["protection", "How we protect information"],
  ["rights", "Your privacy rights"],
  ["children", "Children's privacy"],
  ["international", "International processing"],
  ["third-party", "Third-party websites"],
  ["contact", "Contact and requests"],
  ["changes", "Changes to this Policy"]
];

export default function PrivacyPage() {
  return (
    <>
      <section className="border-b border-border bg-surface-muted">
        <Container className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-5xl">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-olive">Legal</p>
            <h1 className="mt-5 max-w-4xl font-serif text-[clamp(2.75rem,6vw,5.5rem)] leading-[0.98] tracking-[-0.04em]">
              Privacy <span className="text-muted">policy</span>
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border pt-5 text-sm text-muted">
              <span>
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-olive">
                  Revision date
                </span>{" "}
                4 September 2026
              </span>
              <span>How Archex handles website and enquiry information</span>
            </div>
          </div>
        </Container>
      </section>
      <Container className="terms-document py-12 sm:py-16 lg:py-20">
        <div className="grid max-w-[1400px] gap-10 lg:grid-cols-[15rem_minmax(0,58rem)]">
          <aside className="h-fit lg:sticky lg:top-28">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-olive">On this page</p>
            <nav aria-label="Privacy policy sections" className="mt-5 border-l border-border pl-4">
              <ol className="space-y-2 text-sm text-muted">
                {sections.map(([id, label], index) => (
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
              At Archex, we respect the privacy of people who visit our website and contact us
              about our services.
            </p>
            <p>
              This Privacy Policy explains what information we collect, why we collect it, how we
              use and protect it, and the choices available to you when you visit{" "}
              <a href="https://www.archexweb.in">https://www.archexweb.in</a> or submit an enquiry.
            </p>

            <h2 id="who-we-are">1. Who we are</h2>
            <p>
              This website is operated under the name <strong>Archex</strong>. For the purposes of
              this Privacy Policy, &quot;Archex&quot;, &quot;we&quot;, &quot;us&quot; and
              &quot;our&quot; refer to the operator of this website.
            </p>
            <p>
              Archex provides digital product engineering, custom software development, AI
              integration, web and mobile development, business-system integration, application
              modernization and related technology services.
            </p>
            <p>
              <strong>Website:</strong>{" "}
              <a href="https://www.archexweb.in">https://www.archexweb.in</a>
            </p>
            <p>
              The business entity identified above is responsible for the personal information
              described in this Policy, subject to applicable law.
            </p>

            <h2 id="information-collected">2. Information we collect</h2>
            <p>
              We collect information that you voluntarily provide through our website, along with
              limited technical information that may be processed when you visit the site.
            </p>
            <h3>2.1 Information you provide</h3>
            <p>When you contact us or submit a project enquiry, we may collect:</p>
            <ul>
              <li><strong>Identity information:</strong> Your name.</li>
              <li><strong>Contact information:</strong> Your work email address and other contact details you choose to provide.</li>
              <li><strong>Business information:</strong> Your company or organization name.</li>
              <li><strong>Project information:</strong> The service type and description, requirements or context you provide.</li>
              <li><strong>Project preferences:</strong> Optional budget, preferred start date or preferred contact method.</li>
              <li><strong>Consent information:</strong> Your confirmation that you have read and agreed to the applicable enquiry and privacy notice.</li>
            </ul>
            <p>
              Please do not submit passwords, authentication credentials, payment card
              information, confidential production data or other sensitive information through
              general enquiry forms.
            </p>
            <h3>2.2 Technical information</h3>
            <p>
              Website hosting, delivery and security infrastructure may automatically process
              limited technical information, including:
            </p>
            <ul>
              <li>IP address, browser type and version, and device and operating system information.</li>
              <li>Requested pages and resources, date and time of access, and referring page where available.</li>
              <li>Technical and diagnostic information associated with requests.</li>
            </ul>
            <p>
              This information may be processed to deliver the website, maintain availability,
              diagnose technical problems, protect against malicious activity and investigate
              abuse.
            </p>
            <h3>2.3 Information from third-party services</h3>
            <p>
              If you interact with an external service linked from our website, that service may
              collect information directly from your browser or device under its own privacy
              policy. We do not control the independent privacy practices of external websites or
              services.
            </p>

            <h2 id="how-we-use">3. How we use your information</h2>
            <p>We use the information described above for the following purposes:</p>
            <ul>
              <li><strong>Responding to enquiries:</strong> To review your message, understand your requirements, respond to questions and discuss potential projects.</li>
              <li><strong>Project communication:</strong> To communicate about a proposed engagement, request information, prepare estimates or proposals and coordinate discussions.</li>
              <li><strong>Website operation:</strong> To operate, maintain and improve the website and ensure that its features function correctly.</li>
              <li><strong>Security and abuse prevention:</strong> To detect and reduce spam, fraudulent submissions, unauthorized access, malicious activity and other threats.</li>
              <li><strong>Business administration:</strong> To maintain appropriate enquiry records and document discussions or decisions where necessary.</li>
              <li><strong>Legal obligations:</strong> To comply with applicable laws, regulations, lawful requests and other legitimate legal requirements.</li>
            </ul>
            <p>
              We do not use information submitted through a general project enquiry to send
              unrelated promotional communications unless we have an appropriate basis and, where
              required, your permission.
            </p>

            <h2 id="storage-processing">4. How enquiry information is stored and processed</h2>
            <p>
              Archex uses third-party technology providers to support the operation of its website
              and enquiry process. Depending on the website configuration and services enabled,
              these may include:
            </p>
            <ul>
              <li><strong>Supabase:</strong> May store and manage enquiry information submitted through website forms.</li>
              <li><strong>Resend:</strong> May deliver transactional notification emails associated with submitted enquiries.</li>
              <li><strong>Vercel:</strong> Provides hosting and delivery infrastructure that may process technical request information.</li>
              <li><strong>Cloudflare Turnstile:</strong> May help identify and prevent automated or abusive form submissions where configured.</li>
            </ul>
            <p>
              These providers process information according to their respective services,
              contractual arrangements and privacy documentation. We aim to limit information
              shared with providers to what is reasonably necessary for their role.
            </p>

            <h2 id="sharing">5. How we share information</h2>
            <p>We do not sell personal information. We may share information in limited circumstances, including:</p>
            <ul>
              <li><strong>Service providers:</strong> With providers supporting hosting, database storage, email delivery, security and related operations.</li>
              <li><strong>Legal and regulatory requirements:</strong> Where disclosure is required by law, court order, lawful government request or valid legal process.</li>
              <li><strong>Protection of rights and security:</strong> Where reasonably necessary to investigate suspected fraud, protect systems, enforce agreements or protect rights and safety.</li>
              <li><strong>Business changes:</strong> If the business undergoes restructuring, merger, acquisition or transfer of relevant assets, where legally permitted and subject to safeguards.</li>
            </ul>
            <p>
              We do not authorize service providers to use enquiry information for their own
              unrelated marketing merely because they process it on our behalf.
            </p>

            <h2 id="cookies">6. Cookies and similar technologies</h2>
            <p>
              Our website may use cookies, browser storage or similar technologies for
              functionality, user preferences, security or reliable delivery. Browser storage may
              remember a preference such as a selected appearance theme, if enabled.
            </p>
            <p>
              Hosting and security infrastructure may also use technically necessary mechanisms to
              deliver pages, protect the website or manage traffic. We do not intend to use
              enquiry information for advertising profiling.
            </p>
            <p>
              You can manage cookies and browser storage through your browser settings.
              Restricting certain technologies may affect functionality. If additional analytics,
              advertising or tracking technologies are introduced, this Policy should be updated.
            </p>

            <h2 id="retention">7. Data retention</h2>
            <p>
              We retain personal information only for as long as reasonably necessary for the
              purposes described in this Policy, subject to applicable legal requirements.
            </p>
            <ul>
              <li><strong>Enquiry information:</strong> As long as necessary to review and respond, maintain relevant records and manage resulting discussions or engagements.</li>
              <li><strong>Project-related records:</strong> For the duration of a professional engagement and an appropriate period afterwards, in accordance with the agreement and legal requirements.</li>
              <li><strong>Technical and security logs:</strong> According to operational and security requirements of relevant infrastructure providers.</li>
            </ul>
            <p>
              When information is no longer required, we take reasonable steps to delete it or
              remove it from active use, subject to legal retention, legitimate record-keeping
              needs and technical backup cycles. Specific periods may depend on the information and
              purpose for which it was collected.
            </p>

            <h2 id="protection">8. How we protect information</h2>
            <p>
              We take reasonable technical and organizational measures designed to protect
              personal information against unauthorized access, disclosure, alteration, loss or
              misuse. These measures may include:
            </p>
            <ul>
              <li>Restricted access to systems containing enquiry information.</li>
              <li>Appropriate authentication and access controls.</li>
              <li>Secure website connections using HTTPS.</li>
              <li>Established infrastructure and service providers.</li>
              <li>Reasonable measures to prevent spam and unauthorized form submissions.</li>
              <li>Appropriate handling of business and enquiry records.</li>
            </ul>
            <p>
              No website, internet transmission or electronic storage system can be guaranteed to
              be completely secure. If you believe information submitted to Archex has been exposed
              or misused, please contact us using the details below.
            </p>

            <h2 id="rights">9. Your privacy rights and choices</h2>
            <p>Depending on your location and applicable law, you may have rights to:</p>
            <ul>
              <li>Request information about personal data we hold about you.</li>
              <li>Request correction of inaccurate or incomplete information.</li>
              <li>Request deletion, subject to legal and operational requirements.</li>
              <li>Withdraw consent where processing is based on consent.</li>
              <li>Raise an objection or concern about certain forms of processing.</li>
              <li>Seek assistance or submit a privacy complaint through the appropriate process.</li>
            </ul>
            <p>
              To make a request, contact us using the details in Section 13. We may need to verify
              your identity or request additional information. Valid requests will be handled in
              accordance with applicable law, and we will explain where a request cannot be
              fulfilled in full to the extent permitted by law.
            </p>

            <h2 id="children">10. Children&apos;s privacy</h2>
            <p>
              The Archex website and professional services are intended for businesses,
              professionals and others seeking technology services. The website is not designed to
              collect personal information specifically from children.
            </p>
            <p>
              If you believe a child has provided personal information through our website, please
              contact us so that we can review the matter and take appropriate action.
            </p>

            <h2 id="international">11. International processing</h2>
            <p>
              Some technology providers used to operate our website may process information in
              data centres or locations outside your country of residence. Technical or enquiry
              information may therefore be processed across geographical locations depending on
              provider, service configuration and infrastructure.
            </p>
            <p>
              Where required by applicable law, appropriate measures will be taken in relation to
              such processing and transfers.
            </p>

            <h2 id="third-party">12. Third-party websites and services</h2>
            <p>
              Our website may contain links to third-party websites, platforms, documentation or
              services. These operate independently and have their own privacy policies, terms and
              data-handling practices.
            </p>
            <p>
              Archex is not responsible for the privacy practices or content of third-party
              websites that we do not operate. We encourage you to review the privacy policy of
              any external service before providing information to it.
            </p>

            <h2 id="contact">13. Contact and privacy requests</h2>
            <p>
              If you have questions about this Privacy Policy, wish to understand how your
              information is handled, or want to exercise an applicable privacy right, contact us:
            </p>
            <div className="my-6 border border-border bg-surface-muted p-5 text-base leading-7">
              <p><strong>Archex:</strong></p>
              <p><a href="https://www.archexweb.in/contact">https://www.archexweb.in/contact</a></p>
            </div>
            <p>
              Please include enough information for us to understand your request. Do not include
              passwords, OTPs or other authentication credentials in your message. We will review
              and respond to privacy-related requests in accordance with applicable requirements.
            </p>

            <h2 id="changes">14. Changes to this Privacy Policy</h2>
            <p>
              We may update this Privacy Policy when our website, services, technology providers
              or data-handling practices change, or when required by applicable law. The latest
              version will be published on this page with its revised &quot;Last updated&quot;
              date.
            </p>
            <p>
              We encourage visitors to review this page periodically to understand how their
              information is handled.
            </p>
            <div className="mt-10 border-l-2 border-olive bg-surface-muted px-5 py-4 text-base leading-7">
              <strong>About this policy:</strong> This policy describes how Archex currently
              intends to handle information submitted through this website and the technology
              providers used to operate it. If you have a question about how your information is
              handled or would like to make a privacy request, please contact us using the details
              above.
            </div>
          </article>
        </div>
      </Container>
    </>
  );
}
