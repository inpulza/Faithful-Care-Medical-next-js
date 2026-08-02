import { LegalPage } from "@/components/legal-page";

export default function MedicalDisclaimer() {
  return (
    <LegalPage
      eyebrow="Important"
      title="Medical Disclaimer"
      intro={
        <p>
          Please read this disclaimer carefully before relying on any information presented on
          faithfulcaremedical.com (the "Website").
        </p>
      }
    >
      <div className="legal-callout">
        <p className="legal-mandatory">
          In a medical emergency, call 911 immediately. Do not use this Website for emergency
          medical needs.
        </p>
      </div>

      <h2>Educational information only</h2>
      <p>
        The content on the Website, including descriptions of conditions, services, treatments,
        and palliative or primary care topics, is provided for general informational and
        educational purposes only. It is not a substitute for professional medical advice,
        diagnosis, or treatment. Always seek the advice of a qualified healthcare provider with
        any questions you may have regarding a medical condition.
      </p>

      <h2>No doctor-patient relationship</h2>
      <p>
        Reading the Website, submitting a contact or appointment form, sending us an email, or
        calling our office does not create a doctor-patient relationship. A doctor-patient
        relationship with Faithful Care Medical Services is established only after you become
        a patient through an appointment with one of our providers and we have agreed to
        provide care to you.
      </p>

      <h2>Do not delay seeking care</h2>
      <p>
        Never disregard professional medical advice or delay seeking it because of something
        you have read on the Website. If you think you may have a medical emergency, call your
        doctor, go to the nearest emergency room, or dial 911 immediately.
      </p>

      <h2>Information accuracy</h2>
      <p>
        We make reasonable efforts to keep the information on the Website current and accurate,
        but medicine evolves and individual circumstances vary. We make no warranty that any
        content is complete, accurate, current, or applicable to your specific situation.
      </p>

      <h2>External links and resources</h2>
      <p>
        The Website may link to government, payer, or educational resources (such as
        Medicare.gov, the National Hospice and Palliative Care Organization, or insurance
        carriers). Those resources are independent of Faithful Care, and we are not responsible
        for their content or any decisions you make based on them.
      </p>

      <h2>Testimonials and outcomes</h2>
      <p>
        Patient testimonials and reviews on the Website reflect individual experiences. They
        are not a guarantee of any specific outcome, and individual results may vary. Your
        clinical outcome will depend on your unique medical situation and adherence to your
        care plan.
      </p>

      <h2>Telehealth and electronic communications</h2>
      <p>
        Web forms and email are not secure and are not intended for the exchange of protected
        health information. For sensitive health questions, please call us at{" "}
        <a href="tel:+1-239-423-0205">(239) 423-0205</a> or schedule a visit.
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
