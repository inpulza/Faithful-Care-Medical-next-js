import { LegalPage } from "@/components/legal-page";

export default function PrivacyPolicy() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      effectiveDate="January 1, 2026"
      intro={
        <p>
          Faithful Care Medical Services ("we," "our," "us") respects your privacy. This
          Privacy Policy explains how we collect, use, and share information when you visit
          faithfulcaremedical.com (the "Website") or interact with us online. For details about
          how we handle protected health information as a healthcare provider, please see our{" "}
          <a href="/notice-of-privacy-practices">HIPAA Notice of Privacy Practices</a>.
        </p>
      }
    >
      <h2>Information we collect</h2>
      <h3>Information you give us</h3>
      <ul>
        <li>Name, email address, phone number, and message content when you submit a contact or appointment form.</li>
        <li>The page from which you submitted the form (for routing and follow-up purposes).</li>
        <li>Any information you choose to share with us by phone, email, or in person.</li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li>Standard server logs (IP address, browser type, pages visited, referring URL, timestamps).</li>
        <li>Cookies and similar technologies (see Cookies and tracking below).</li>
        <li>Aggregate analytics data through Google Analytics 4.</li>
      </ul>

      <h2>How we use information</h2>
      <ul>
        <li>To respond to your inquiries and schedule appointments.</li>
        <li>To send you confirmation, reminders, or follow-up about a request you submitted.</li>
        <li>To improve the Website and understand how visitors use it.</li>
        <li>To comply with legal obligations and protect our rights.</li>
      </ul>
      <p>
        We do not sell your personal information. We do not use your information for targeted
        advertising without your consent.
      </p>

      <h2>Cookies and tracking technologies</h2>
      <p>
        We use cookies and similar technologies to operate the Website, remember your
        preferences, measure performance, and (with your consent) support advertising
        measurement. Categories include:
      </p>
      <ul>
        <li><strong>Necessary:</strong> required for core site functionality. Always on.</li>
        <li><strong>Analytics:</strong> help us understand how visitors use the Website (Google Analytics 4).</li>
        <li><strong>Advertising:</strong> support measurement and (when applicable) personalization for Google Ads.</li>
        <li><strong>Personalization:</strong> remember your choices and preferences.</li>
      </ul>
      <p>
        On your first visit you will be asked to accept, reject, or customize non-essential
        cookies. You can change your choice at any time using the "Cookie preferences" link in
        the footer. We honor Google Consent Mode v2 signals and the Global Privacy Control
        (GPC) where applicable.
      </p>

      <h2>Third-party services</h2>
      <p>We share information with the following service providers, only as needed to operate the Website and respond to you:</p>
      <ul>
        <li><strong>Google LLC:</strong> Google Analytics 4 (anonymous traffic measurement) and, in the future, Google Ads (advertising measurement). See Google's privacy policy at <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>.</li>
        <li><strong>Resend, Inc.:</strong> transactional email delivery for confirmations and form notifications.</li>
        <li><strong>Hosting and infrastructure providers</strong> that help us keep the Website online.</li>
      </ul>
      <p>
        Submissions through web forms are not intended to transmit protected health
        information. For health-related discussions, please call us at{" "}
        <a href="tel:+1-239-423-0205">(239) 423-0205</a>.
      </p>

      <h2>How long we keep information</h2>
      <p>
        We keep contact form submissions and related correspondence for as long as needed to
        respond to your inquiry, comply with our legal obligations, resolve disputes, and
        enforce our agreements. Server logs are retained for a limited operational period and
        then deleted or anonymized.
      </p>

      <h2>Your privacy rights</h2>
      <p>
        Depending on where you live, you may have the right to:
      </p>
      <ul>
        <li>Access the personal information we hold about you.</li>
        <li>Request correction of inaccurate information.</li>
        <li>Request deletion of your information, subject to legal exceptions.</li>
        <li>Opt out of the sale or sharing of personal information (we do not sell or share for cross-context advertising).</li>
        <li>Opt out of targeted advertising or profiling.</li>
        <li>Appeal a decision we make about your request.</li>
        <li>Lodge a complaint with your state attorney general.</li>
      </ul>
      <p>
        These rights apply under applicable laws including the Florida Digital Bill of Rights
        (FDBR), the California Consumer Privacy Act / CPRA (CCPA), the Colorado Privacy Act
        (CPA), the Virginia Consumer Data Protection Act (VCDPA), the Connecticut Data Privacy
        Act (CTDPA), and other US state privacy laws. To submit a privacy request, email{" "}
        <a href="mailto:info@faithfulcaremedical.com?subject=Privacy%20Request">info@faithfulcaremedical.com</a>{" "}
        with the subject line "Privacy Request," or call us at{" "}
        <a href="tel:+1-239-423-0205">(239) 423-0205</a>. We may need to verify your identity
        before completing the request, and we will respond within 45 days as required by law.
      </p>
      <p>
        Health information you share with us as a patient is governed by HIPAA and our{" "}
        <a href="/notice-of-privacy-practices">Notice of Privacy Practices</a>.
      </p>

      <h2>Children's privacy</h2>
      <p>
        The Website is not directed to children under 13, and we do not knowingly collect
        personal information from children under 13 through the Website. If you believe a
        child has provided us with personal information, please contact us so we can delete it.
      </p>

      <h2>Security</h2>
      <p>
        We use reasonable administrative, technical, and physical safeguards designed to
        protect personal information. No method of transmission over the internet or electronic
        storage is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h2>Links to other websites</h2>
      <p>
        The Website may contain links to third-party sites (such as Medicare.gov or insurance
        carrier sites). We are not responsible for the privacy practices of those sites. Please
        review their privacy policies before providing any information.
      </p>

      <h2>Changes to this Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. The "Effective date" at the top of
        the page reflects the most recent revision. Material changes will be highlighted on the
        Website.
      </p>

      <h2>Contact us</h2>
      <div className="legal-callout">
        <p>
          <strong>Faithful Care Medical Services</strong><br />
          9955 Tamiami Trail N. Suite 2<br />
          Naples, FL 34108<br />
          Phone: <a href="tel:+1-239-423-0205">(239) 423-0205</a><br />
          Email: <a href="mailto:info@faithfulcaremedical.com">info@faithfulcaremedical.com</a>
        </p>
      </div>
    </LegalPage>
  );
}
