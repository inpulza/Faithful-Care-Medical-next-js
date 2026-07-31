import { LegalPage } from "@/components/legal-page";

export default function NoticeOfPrivacyPractices() {
  return (
    <LegalPage
      eyebrow="HIPAA"
      title="Notice of Privacy Practices"
      effectiveDate="January 1, 2026"
      schemaUrl="/notice-of-privacy-practices"
      schemaDescription="HIPAA Notice of Privacy Practices for Faithful Care Medical Services in Naples, FL. How protected health information is used and disclosed, and your rights under federal law."
      intro={
        <p className="legal-mandatory">
          THIS NOTICE DESCRIBES HOW MEDICAL INFORMATION ABOUT YOU MAY BE USED AND DISCLOSED
          AND HOW YOU CAN GET ACCESS TO THIS INFORMATION. PLEASE REVIEW IT CAREFULLY.
        </p>
      }
    >
      <h2>Our pledge regarding your health information</h2>
      <p>
        Faithful Care Medical Services ("Faithful Care," "we," "our," or "us") is committed to
        protecting the privacy of your health information. We are required by federal law,
        specifically the Health Insurance Portability and Accountability Act of 1996 (HIPAA)
        and the Health Information Technology for Economic and Clinical Health (HITECH) Act,
        to maintain the privacy of your protected health information ("PHI"), provide you with
        this notice of our legal duties and privacy practices, follow the terms of the notice
        currently in effect, and notify you in the event of a breach of unsecured PHI.
      </p>

      <h2>How we may use and disclose your health information</h2>
      <p>
        The following categories describe the ways we may use and disclose your PHI without
        your separate written authorization. Not every use or disclosure within a category
        will be listed.
      </p>

      <h3>For treatment</h3>
      <p>
        We may use and share your health information to provide medical care to you. For
        example, your physician may share information with nurses, lab technicians, specialists,
        pharmacists, or other healthcare providers involved in your care, including referrals
        and consultations.
      </p>

      <h3>For payment</h3>
      <p>
        We may use and share your information to bill and receive payment from health plans,
        insurance companies, or other payers. For example, we may send claims, eligibility
        verification, or pre-authorization requests to your insurer.
      </p>

      <h3>For health care operations</h3>
      <p>
        We may use and share your information to run our practice, improve your care, and
        contact you when necessary. Examples include quality assessment, staff training,
        accreditation, licensing, audits, and case management.
      </p>

      <h2>Other uses and disclosures permitted or required by law</h2>
      <p>
        We may use or disclose your PHI without your authorization in the following situations:
      </p>
      <ul>
        <li><strong>Public health activities:</strong> reporting disease, injury, vital events, or supporting public health investigations as required by law.</li>
        <li><strong>Health oversight activities:</strong> to agencies authorized to audit, investigate, license, or inspect.</li>
        <li><strong>Judicial and administrative proceedings:</strong> in response to a valid court order, subpoena, or discovery request.</li>
        <li><strong>Law enforcement:</strong> when required by law or in response to a lawful request.</li>
        <li><strong>Coroners, medical examiners, and funeral directors:</strong> as necessary to perform their duties.</li>
        <li><strong>Organ and tissue donation:</strong> to organizations that handle procurement, banking, or transplantation.</li>
        <li><strong>Research:</strong> when an Institutional Review Board has approved a waiver of authorization.</li>
        <li><strong>To avert a serious threat to health or safety</strong> as permitted by law.</li>
        <li><strong>Workers' compensation:</strong> as authorized by and to the extent necessary to comply with laws relating to workers' compensation.</li>
        <li><strong>Military, national security, and protective services</strong> when required by federal law.</li>
        <li><strong>Inmates:</strong> if you are an inmate of a correctional institution, we may release information to that institution.</li>
        <li><strong>Required by law:</strong> when federal, state, or local law requires disclosure.</li>
      </ul>

      <h2>Uses and disclosures that require your written authorization</h2>
      <p>
        We will obtain your written authorization before using or disclosing your PHI for any
        purpose other than those described in this notice. In particular, we will obtain your
        authorization before:
      </p>
      <ul>
        <li>Most uses and disclosures of psychotherapy notes.</li>
        <li>Uses and disclosures for marketing purposes.</li>
        <li>Disclosures that constitute a sale of PHI.</li>
      </ul>
      <p>
        You may revoke any authorization at any time, in writing, except to the extent we have
        already acted in reliance on it.
      </p>

      <h2>Your rights regarding your health information</h2>
      <p>
        You have the following rights with respect to your PHI:
      </p>
      <ul>
        <li><strong>Right to inspect and copy:</strong> You may request to see and obtain a copy of your medical and billing records, in paper or electronic format. We may charge a reasonable, cost-based fee.</li>
        <li><strong>Right to amend:</strong> You may request that we correct PHI you believe is incorrect or incomplete. We may deny your request in certain circumstances, and we will tell you why in writing.</li>
        <li><strong>Right to an accounting of disclosures:</strong> You may request a list of certain disclosures we have made of your PHI for purposes other than treatment, payment, or health care operations.</li>
        <li><strong>Right to request restrictions:</strong> You may request that we limit the way we use or disclose your PHI for treatment, payment, or operations. We are not required to agree, except when the disclosure is to a health plan for payment of an item or service you paid for in full out of pocket.</li>
        <li><strong>Right to confidential communications:</strong> You may request to receive communications from us in a specific way (for example, by mail to a particular address) or at a specific location.</li>
        <li><strong>Right to a paper copy of this notice:</strong> You may request a printed copy of this notice at any time, even if you agreed to receive it electronically.</li>
        <li><strong>Right to be notified of a breach:</strong> You will be notified following any breach of your unsecured PHI.</li>
        <li><strong>Right to opt out of fundraising or marketing communications</strong> (if applicable).</li>
      </ul>
      <p>
        To exercise any of these rights, please submit your request in writing to our Privacy
        Officer at the contact information below.
      </p>

      <h2>Our responsibilities</h2>
      <ul>
        <li>We are required by law to maintain the privacy and security of your PHI.</li>
        <li>We will let you know promptly if a breach occurs that may have compromised the privacy or security of your information.</li>
        <li>We must follow the duties and privacy practices described in this notice and give you a copy of it.</li>
        <li>We will not use or share your information other than as described here unless you tell us we can in writing. If you tell us we can, you may change your mind at any time.</li>
      </ul>

      <h2>Changes to this notice</h2>
      <p>
        We reserve the right to change this notice at any time and to make the revised notice
        effective for all PHI we maintain. The revised notice will be posted in our office and
        on our website at faithfulcaremedical.com. The effective date is shown at the top of
        this notice.
      </p>

      <h2>Complaints</h2>
      <p>
        If you believe your privacy rights have been violated, you may file a complaint with us
        or with the Secretary of the U.S. Department of Health and Human Services, Office for
        Civil Rights. We will not retaliate against you for filing a complaint.
      </p>
      <ul>
        <li>
          <strong>With Faithful Care:</strong> contact our Privacy Officer (see below).
        </li>
        <li>
          <strong>With HHS Office for Civil Rights:</strong>{" "}
          <a href="https://www.hhs.gov/hipaa/filing-a-complaint/index.html" target="_blank" rel="noopener noreferrer">
            hhs.gov/hipaa/filing-a-complaint
          </a>{" "}
          or call 1-800-368-1019 (TDD: 1-800-537-7697).
        </li>
      </ul>

      <h2>Contact our Privacy Officer</h2>
      <div className="legal-callout">
        <p>
          <strong>Faithful Care Medical Services, Privacy Officer</strong><br />
          9955 Tamiami Trail N. Suite 2<br />
          Naples, FL 34108<br />
          Phone: <a href="tel:+1-239-423-0205">(239) 423-0205</a><br />
          Email: <a href="mailto:info@faithfulcaremedical.com">info@faithfulcaremedical.com</a>
        </p>
      </div>
    </LegalPage>
  );
}
