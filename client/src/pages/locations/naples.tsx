import React from "react";
import { LocationPage } from "@/components/location-page";
import { Stethoscope, Heart, Brain, HandHeart, Heartbeat, ShieldCheck, ListChecks, Syringe } from "@phosphor-icons/react";

export default function NaplesLocation() {
  return (
    <LocationPage
      data={{
        name: "Naples",
        county: "Collier County",
        tagline: "Primary Care & Palliative Care in Naples, Florida",
        description: "Faithful Care Medical Services is your neighborhood medical home right here in Naples. Located on Tamiami Trail North, we provide complete primary care and compassionate palliative care for adults and seniors across Naples and surrounding communities.",
        driveTime: "5 minutes",
        driveDistance: "Centrally located on Tamiami Trail N.",
        population: "22,000+",
        highlights: ["Same-day sick visits", "Medicare accepted", "Senior-friendly care", "Chronic disease management", "On-site labs & EKG", "Palliative care team"],
        localNote: "As Naples' trusted medical practice on Tamiami Trail North, we serve residents from Park Shore to Pelican Bay, Pine Ridge to Vineyards. Whether you live in gated communities along the Gulf or inland neighborhoods, we're centrally located and easy to reach. Many of our patients have been with us for years, because consistent, personal care matters.",
        primaryCareDescription: "Naples residents have a dedicated primary care home steps from their neighborhood. At Faithful Care, we provide comprehensive medical care with 30 to 60 minute appointments, same-day sick visits, and a physician who knows your name, your history, and your health goals.",
        primaryCareServices: [
          { icon: Stethoscope, title: "Annual Wellness Exams", description: "Thorough physicals with lab work, cardiovascular screening, and personalized prevention plans for Naples adults and seniors." },
          { icon: Heartbeat, title: "Chronic Disease Management", description: "Ongoing care for diabetes, hypertension, heart disease, thyroid disorders, and COPD with regular monitoring." },
          { icon: Syringe, title: "Same-Day Sick Visits", description: "Feeling unwell? Call in the morning and we will do our best to see you the same day at our Tamiami Trail office." },
          { icon: ShieldCheck, title: "Preventive Screenings", description: "Cancer screenings, bone density referrals, cognitive assessments, and immunizations to protect your long-term health." },
        ],
        palliativeCareDescription: "For Naples patients and families navigating serious illness, our palliative care program provides an extra layer of support focused on comfort, symptom relief, and quality of life. Palliative care works alongside your regular treatments at any stage of illness.",
        palliativeCareServices: [
          { icon: Heart, title: "Pain & Symptom Relief", description: "Expert management of chronic pain, nausea, fatigue, and breathing difficulties for patients with serious conditions." },
          { icon: HandHeart, title: "Goals of Care Planning", description: "Thoughtful conversations about treatment priorities, advance directives, and what matters most to you and your family." },
          { icon: Brain, title: "Emotional Support", description: "Addressing anxiety, depression, and emotional distress that often accompanies serious illness for both patients and caregivers." },
          { icon: ListChecks, title: "Care Coordination", description: "Seamless communication with your NCH specialists, hospital teams, and family to keep everyone aligned on your care plan." },
        ],
        neighborhoods: ["Park Shore", "Pelican Bay", "Pine Ridge", "Vineyards", "North Naples", "Vanderbilt Beach", "Grey Oaks", "Livingston Woods"],
        directionsText: "Our office is at 9955 Tamiami Trail N. Suite 2, centrally located in North Naples. Easily accessible from Pine Ridge Road, Vanderbilt Beach Road, and Immokalee Road via US-41. Free parking available on site.",
        localHealthContext: "Naples is home to a large population of retirees and active seniors who prioritize their health and well-being. With many residents managing chronic conditions and seasonal visitors needing continuity of care, Faithful Care provides the consistent, personal medical attention that Naples patients deserve.",
        faqs: [
          {
            question: "Where is your Naples office located?",
            answer: "We are located at 9955 Tamiami Trail N. Suite 2, Naples, FL 34108. Our office is in North Naples, easily accessible from Pine Ridge Road, Vanderbilt Beach Road, and Immokalee Road."
          },
          {
            question: "Do you accept Medicare?",
            answer: <>Yes. We accept Medicare, Medicare Advantage, and most major commercial insurance plans. You can verify plan details and compare coverage options on <a href="https://www.medicare.gov" target="_blank" rel="noopener noreferrer">Medicare.gov</a>. Call us if you have questions about your specific plan.</>
          },
          {
            question: "Can I get a same-day appointment?",
            answer: "Yes. If you call in the morning with an urgent health concern, we will do our best to see you the same day. We reserve appointment slots specifically for same-day needs."
          },
          {
            question: "What is palliative care?",
            answer: <>Palliative care is specialized medical care for patients with serious illness. It focuses on pain relief, symptom management, and quality of life, and it works alongside your existing treatments. It is not the same as hospice. Learn more at the <a href="https://www.nhpco.org" target="_blank" rel="noopener noreferrer">National Hospice and Palliative Care Organization</a>.</>
          },
          {
            question: "How long are your appointments?",
            answer: "Our appointments are 30 to 60 minutes long. We believe in taking the time to listen, examine thoroughly, and explain everything clearly so you leave feeling confident about your care plan."
          },
        ],
      }}
    />
  );
}
