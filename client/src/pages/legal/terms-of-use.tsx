import { LegalPage } from "@/components/legal-page";

export default function TermsOfUse() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      effectiveDate="January 1, 2026"
      intro={
        <p>
          These Terms of Use ("Terms") govern your access to and use of the website
          faithfulcaremedical.com (the "Website") operated by Faithful Care Medical Services
          ("we," "our," "us"). By accessing or using the Website, you agree to be bound by
          these Terms and by our <a href="/privacy-policy">Privacy Policy</a>. If you do not
          agree, please do not use the Website.
        </p>
      }
    >
      <h2>Use of the Website</h2>
      <p>
        You may use the Website for lawful, personal, non-commercial purposes only. You agree
        not to:
      </p>
      <ul>
        <li>Use the Website in any way that violates any applicable law or regulation.</li>
        <li>Attempt to gain unauthorized access to any portion of the Website, accounts, systems, or networks.</li>
        <li>Interfere with or disrupt the Website or its servers.</li>
        <li>Submit false, misleading, or fraudulent information through any form.</li>
        <li>Use automated means (bots, scrapers, crawlers) to access or harvest content, except for legitimate search engine crawling or where we have given written permission.</li>
        <li>Attempt to reverse engineer, decompile, or disassemble any portion of the Website.</li>
      </ul>

      <h2>No medical advice</h2>
      <p>
        The information on the Website is provided for general informational and educational
        purposes only and is not intended as, and should not be relied upon as, medical advice,
        diagnosis, or treatment. Please see our <a href="/medical-disclaimer">Medical Disclaimer</a>{" "}
        for important details. In a medical emergency, call 911 immediately.
      </p>

      <h2>Intellectual property</h2>
      <p>
        All content on the Website, including text, graphics, logos, images, photographs, and
        software, is the property of Faithful Care Medical Services or its licensors and is
        protected by US and international copyright, trademark, and other intellectual property
        laws. You may not copy, reproduce, modify, distribute, publish, or create derivative
        works from any content on the Website without our prior written consent, except for
        personal, non-commercial use.
      </p>

      <h2>Submissions</h2>
      <p>
        Any information you submit through a contact or appointment form is governed by our{" "}
        <a href="/privacy-policy">Privacy Policy</a> and, where applicable, our{" "}
        <a href="/notice-of-privacy-practices">HIPAA Notice of Privacy Practices</a>. Web forms
        are not intended for transmitting protected health information. For sensitive health
        questions, please call us at <a href="tel:+1-239-423-0205">(239) 423-0205</a>.
      </p>

      <h2>Third-party links</h2>
      <p>
        The Website may contain links to third-party websites, including Medicare.gov,
        insurance carriers, and reference resources. We provide these links for convenience
        only and are not responsible for the content, accuracy, or practices of any third-party
        site.
      </p>

      <h2>Disclaimer of warranties</h2>
      <p>
        THE WEBSITE AND ALL CONTENT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS,
        WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT
        PERMITTED BY LAW, FAITHFUL CARE DISCLAIMS ALL WARRANTIES, INCLUDING, BUT NOT LIMITED
        TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
        NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE WEBSITE WILL BE UNINTERRUPTED, SECURE, OR
        FREE OF ERRORS, VIRUSES, OR OTHER HARMFUL COMPONENTS.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL FAITHFUL CARE MEDICAL
        SERVICES, ITS AFFILIATES, OFFICERS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT,
        INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO
        YOUR USE OF, OR INABILITY TO USE, THE WEBSITE, EVEN IF WE HAVE BEEN ADVISED OF THE
        POSSIBILITY OF SUCH DAMAGES. OUR TOTAL LIABILITY FOR ANY CLAIM ARISING OUT OF OR
        RELATING TO THE WEBSITE WILL NOT EXCEED ONE HUNDRED US DOLLARS ($100.00). NOTHING IN
        THESE TERMS LIMITS ANY LIABILITY THAT CANNOT BE LIMITED BY APPLICABLE LAW.
      </p>

      <h2>Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless Faithful Care Medical Services and
        its affiliates, officers, employees, and agents from any claims, liabilities, damages,
        losses, and expenses (including reasonable attorneys' fees) arising out of or related
        to your violation of these Terms or your misuse of the Website.
      </p>

      <h2>Governing law and jurisdiction</h2>
      <p>
        These Terms are governed by the laws of the State of Florida, without regard to its
        conflict-of-laws principles. You agree that any dispute arising out of or relating to
        these Terms or the Website will be resolved exclusively in the state or federal courts
        located in Collier County, Florida, and you consent to the personal jurisdiction of
        those courts.
      </p>

      <h2>Changes to these Terms</h2>
      <p>
        We may update these Terms at any time by posting the revised version on the Website.
        The "Effective date" above reflects the most recent revision. Your continued use of the
        Website after the posting of any changes constitutes acceptance of those changes.
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
