import React from "react";
import { LocationPage } from "@/components/location-page";
import { Stethoscope, Heart, Pill, FirstAid, Brain, HandHeart, Heartbeat, ShieldCheck, ListChecks, UserCircle, Syringe, Thermometer, Bandaids } from "@phosphor-icons/react";

export default function GoldenGateLocation() {
  return (
    <LocationPage
      data={{
        name: "Golden Gate",
        county: "Collier County",
        tagline: "Quality Healthcare for Golden Gate & Golden Gate Estates, FL",
        description: "Golden Gate and Golden Gate Estates are home to more than 50,000 residents, one of Collier County's largest and most vibrant communities. Families here work hard, and they deserve a doctor who takes the time to listen, explains things in plain language, and treats every patient with genuine respect. Faithful Care Medical Services is just 15 minutes away via Golden Gate Parkway, offering affordable primary care and palliative care for all adults.",
        driveTime: "15 minutes",
        driveDistance: "About 8 miles west via Golden Gate Pkwy to US-41",
        population: "50,000+",
        highlights: ["Accepting new patients", "Se habla español", "Same-day sick visits", "Diabetes & blood pressure care", "Women's health screenings", "Medicare & Medicaid friendly"],
        localNote: "Golden Gate is a proud, diverse community where many families have built their lives from the ground up. We understand that finding a doctor you trust, one who speaks your language, respects your time, and doesn't rush you out the door, matters. Our office on Tamiami Trail North is an easy drive from Golden Gate via Golden Gate Parkway, and we accept Medicare, Medicaid, and most commercial insurance plans. No confusing medical jargon, just honest, personal care.",
        primaryCareDescription: "Golden Gate and Golden Gate Estates families need affordable, respectful primary care from a doctor who takes the time to listen. We serve patients in both English and Spanish, offer flexible scheduling, and accept Medicare, Medicaid, and most insurance plans used in the Golden Gate community.",
        primaryCareServices: [
          { icon: Stethoscope, title: "Family Primary Care", description: "Comprehensive care for adults of all ages in Golden Gate, from routine check-ups to managing complex health issues." },
          { icon: Heartbeat, title: "Diabetes & Blood Pressure", description: "Ongoing monitoring, medication management, and lifestyle coaching for diabetes and hypertension control." },
          { icon: ShieldCheck, title: "Women's Health Screenings", description: "Annual wellness exams, Pap smears, breast cancer screening referrals, and reproductive health counseling." },
          { icon: Syringe, title: "Vaccinations & Immunizations", description: "Flu shots, pneumonia vaccines, shingles prevention, and all recommended adult immunizations." },
        ],
        palliativeCareDescription: "Palliative care at Faithful Care helps Golden Gate patients with serious illness get relief from pain and symptoms while continuing their regular treatments. Our bilingual team ensures that every patient and family member understands the care plan and feels supported every step of the way.",
        palliativeCareServices: [
          { icon: Heart, title: "Symptom Management", description: "Relief from chronic pain, breathing difficulty, nausea, and fatigue for patients with serious medical conditions." },
          { icon: HandHeart, title: "Bilingual Family Support", description: "Care conversations in English and Spanish so every family member can participate in important health decisions." },
          { icon: Brain, title: "Emotional & Spiritual Care", description: "Addressing the emotional impact of serious illness with compassion, cultural sensitivity, and practical resources." },
          { icon: ListChecks, title: "Community Resource Connection", description: "Connecting Golden Gate families with Collier County support services, financial assistance, and community health programs." },
        ],
        neighborhoods: ["Golden Gate City", "Golden Gate Estates", "Collier Boulevard Corridor", "Santa Barbara Boulevard", "Green Boulevard", "Golden Gate Parkway", "Randall Boulevard", "Oil Well Road"],
        directionsText: "From Golden Gate, take Golden Gate Parkway west to US-41 (Tamiami Trail). Turn right (north) and continue for about 5 miles to our office at 9955 Tamiami Trail N. Suite 2. The entire drive takes about 15 minutes from the Golden Gate Parkway intersection.",
        localHealthContext: "Golden Gate is one of Collier County's most diverse and hardworking communities. Many families here face barriers to quality healthcare, including long wait times, language differences, and insurance limitations. Faithful Care is committed to removing those barriers with bilingual care, flexible appointments, and acceptance of Medicare, Medicaid, and most commercial insurance plans.",
        faqs: [
          {
            question: "Is your office easy to get to from Golden Gate?",
            answer: "Yes. Our office at 9955 Tamiami Trail N. Suite 2 is about 8 miles west of Golden Gate via Golden Gate Parkway, then north on US-41. The drive takes about 15 minutes, making us one of the most convenient primary care options for Golden Gate residents."
          },
          {
            question: "Do you have Spanish-speaking staff?",
            answer: "Yes. We provide care in both English and Spanish. From scheduling your appointment to discussing your diagnosis and treatment plan, you can communicate in the language that's most comfortable for you."
          },
          {
            question: "Do you accept Medicaid and Medicare?",
            answer: <>Yes. We accept Medicare, Medicaid, Medicare Advantage plans, and most commercial insurance. You can learn more about eligibility and benefits at <a href="https://www.medicare.gov" target="_blank" rel="noopener noreferrer">Medicare.gov</a>. We believe quality healthcare should be accessible to everyone in the Golden Gate community, regardless of insurance type.</>
          },
          {
            question: "Can you help manage my diabetes and blood pressure?",
            answer: <>Absolutely. Chronic disease management is one of our specialties. We provide regular monitoring, medication adjustments, nutritional guidance, and ongoing education to help you keep your diabetes and blood pressure under control and prevent complications. For community health programs in Collier County, visit the <a href="https://collier.floridahealth.gov" target="_blank" rel="noopener noreferrer">Florida Department of Health in Collier County</a>.</>
          },
          {
            question: "What if I need to see a specialist?",
            answer: <>We handle all referrals and coordinate directly with specialists in Collier County. The <a href="https://www.nchmd.org" target="_blank" rel="noopener noreferrer">NCH Healthcare System</a> is one of the local resources we work with regularly. We'll help you find the right specialist, send your records, and follow up after your visit to make sure your overall care plan stays on track.</>
          },
          {
            question: "Do you offer women's health services?",
            answer: "Yes. We provide comprehensive women's health care including annual wellness exams, breast and cervical cancer screenings, reproductive health counseling, bone density coordination, and management of conditions like thyroid disorders and menopause symptoms."
          }
        ],
      }}
    />
  );
}
