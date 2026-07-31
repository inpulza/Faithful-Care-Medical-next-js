import { LegalPage } from "@/components/legal-page";

export default function AccessibilityStatement() {
  return (
    <LegalPage
      eyebrow="Accessibility"
      title="Accessibility Statement"
      effectiveDate="January 1, 2026"
      schemaUrl="/accessibility-statement"
      schemaDescription="Accessibility commitment for faithfulcaremedical.com. We work to meet WCAG 2.1 Level AA so everyone can access primary and palliative care information."
      intro={
        <p>
          Faithful Care Medical Services is committed to ensuring that our website, services,
          and care are accessible to people with disabilities. We believe everyone deserves
          equal access to information about their health.
        </p>
      }
    >
      <h2>Our commitment</h2>
      <p>
        We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA,
        published by the World Wide Web Consortium (W3C). These guidelines explain how to make
        web content more accessible for people with a wide range of disabilities, including
        visual, auditory, physical, speech, cognitive, language, learning, and neurological
        disabilities.
      </p>

      <h2>What we have done</h2>
      <ul>
        <li>Used semantic HTML and ARIA labels so screen readers can navigate the site.</li>
        <li>Provided alternative text for meaningful images.</li>
        <li>Designed for keyboard navigation, including visible focus indicators.</li>
        <li>Used color contrast ratios that meet or exceed WCAG 2.1 AA targets for body text.</li>
        <li>Set base text size at 18px or larger for senior-friendly readability.</li>
        <li>Honored the user's "prefers-reduced-motion" setting throughout the site.</li>
        <li>Sized interactive controls for comfortable touch use, with a minimum 64-pixel tap target on key actions.</li>
      </ul>

      <h2>Ongoing work</h2>
      <p>
        Accessibility is an ongoing effort. We regularly audit the site, fix issues we find,
        and apply improvements as we add new content. If you encounter content that is hard to
        access, please tell us so we can address it.
      </p>
      <p>
        <strong>Last accessibility audit:</strong> January 1, 2026. The site was reviewed
        against WCAG 2.1 Level AA criteria using a combination of automated tools and manual
        keyboard and screen reader testing. The next scheduled audit is January 2027, with
        ad-hoc audits whenever significant new content is published.
      </p>

      <h2>Known limitations</h2>
      <p>
        Some embedded third-party content (such as Google Maps, embedded videos, or insurance
        carrier widgets) may not fully meet WCAG 2.1 AA standards. We work with vendors to
        improve their accessibility, and we provide phone, in-person, and email alternatives
        for any task you cannot complete on the Website.
      </p>

      <h2>Alternative ways to reach us</h2>
      <p>
        If you have trouble using any part of the Website, you can always contact us by phone
        or in person. Our staff is available to help schedule appointments, answer questions,
        and provide information by voice.
      </p>
      <ul>
        <li>Phone: <a href="tel:+1-239-423-0205">(239) 423-0205</a></li>
        <li>Hours: Monday to Friday 8:30 AM to 5:00 PM, Saturday 8:30 AM to 12:00 PM</li>
        <li>In person: 9955 Tamiami Trail N. Suite 2, Naples, FL 34108</li>
      </ul>

      <h2>Reporting accessibility issues</h2>
      <p>
        If you find an accessibility barrier on the Website, please tell us. Include the page
        URL, a description of the problem, and how we can reach you. We will respond within
        five business days and work with you on a solution.
      </p>
      <div className="legal-callout">
        <p>
          <strong>Accessibility contact</strong><br />
          Email: <a href="mailto:info@faithfulcaremedical.com">info@faithfulcaremedical.com</a><br />
          Phone: <a href="tel:+1-239-423-0205">(239) 423-0205</a><br />
          Mail: 9955 Tamiami Trail N. Suite 2, Naples, FL 34108
        </p>
      </div>

      <h2>Formal complaints</h2>
      <p>
        We are committed to resolving accessibility concerns directly. If you are not
        satisfied with our response, you may also contact the U.S. Department of Health and
        Human Services Office for Civil Rights or the U.S. Department of Justice ADA
        Information Line at 1-800-514-0301 (voice) or 1-833-610-1264 (TTY).
      </p>
    </LegalPage>
  );
}
