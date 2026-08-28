import React from "react";
import { LocationPage } from "@/components/location-page";
import { Stethoscope, Heart, Pill, FirstAid, Brain, HandHeart, Heartbeat, ShieldCheck, ListChecks, UserCircle, Syringe, Thermometer, Bandaids } from "@phosphor-icons/react";

export default function CapeCoralLocation() {
  return (
    <LocationPage
      data={{
        name: "Cape Coral",
        county: "Lee County",
        tagline: "Doctor Accepting Patients from Cape Coral, FL. Primary & Palliative Care.",
        description: "With more than 210,000 residents, Cape Coral is the largest city between Tampa and Miami, and its explosive growth has made it one of the hardest places in Southwest Florida to find a primary care doctor accepting new patients. Faithful Care Medical Services in Naples offers Cape Coral families a genuinely different healthcare experience: unhurried visits, a doctor who remembers you, and same-day appointments when you need them most.",
        driveTime: "40–50 minutes",
        driveDistance: "About 40 miles via I-75 South",
        population: "210,000+",
        highlights: ["New patient inquiries", "Unhurried appointments", "Chronic disease care", "Senior-focused care", "Palliative support", "Call to verify insurance"],
        localNote: "Cape Coral patients from Tarpon Point, Cape Harbour, Yacht Club, Pelican, Sandoval, and Del Prado are discovering that the drive down I-75 South to our Naples office is one of the best healthcare decisions they've made. Our practice intentionally limits our patient panel so that every visit feels personal, not rushed. If you've been waiting weeks to see your current doctor, it may be time for a change.",
        primaryCareDescription: "Cape Coral is one of the fastest-growing cities in Florida, and the demand for primary care doctors far exceeds the supply. Many Cape Coral residents wait weeks for a basic appointment. At Faithful Care, we offer the opposite: unhurried visits, same-day availability for urgent needs, and a physician who remembers your name.",
        primaryCareServices: [
          { icon: Stethoscope, title: "Comprehensive Physicals", description: "Thorough annual exams with lab work, health risk assessments, and personalized wellness plans for Cape Coral patients." },
          { icon: Heartbeat, title: "Heart & Cardiovascular Care", description: "In-office EKGs, blood pressure management, cholesterol monitoring, and heart disease prevention." },
          { icon: Pill, title: "Medication Management", description: "Careful review and coordination of all your medications to prevent interactions and simplify your daily routine." },
          { icon: Syringe, title: "Urgent Sick Visits", description: "When you are sick, call us in the morning. We will do our best to see Cape Coral patients the same day." },
        ],
        palliativeCareDescription: "Palliative care at Faithful Care gives Cape Coral patients living with cancer, heart failure, COPD, or other serious conditions an additional layer of support. We focus on reducing suffering, managing symptoms, and helping families navigate difficult decisions together.",
        palliativeCareServices: [
          { icon: Heart, title: "Symptom Relief", description: "Targeted treatment for pain, shortness of breath, nausea, and other symptoms that reduce quality of life." },
          { icon: HandHeart, title: "Family Support & Guidance", description: "Helping your family understand the diagnosis, make informed decisions, and access community resources." },
          { icon: Brain, title: "Advance Care Planning", description: "Creating living wills, healthcare proxies, and advance directives so your wishes are respected." },
          { icon: ListChecks, title: "Specialist Coordination", description: "Managing communication between your oncologist, cardiologist, and other specialists for seamless care." },
        ],
        neighborhoods: ["Cape Coral Parkway", "Pine Island Road", "Del Prado", "Pelican Boulevard", "Burnt Store", "Surfside", "Yacht Club", "Coral Oaks"],
        directionsText: "From Cape Coral, take Cape Coral Parkway east to I-75 South. Follow I-75 for approximately 40 miles to Exit 111 (Immokalee Road), then head west to US-41 and south to our office at 9955 Tamiami Trail N. Suite 2. The drive is about 45 minutes.",
        localHealthContext: "Cape Coral is the largest city between Tampa and Miami by land area, yet it has fewer primary care providers per capita than the state average. Many residents drive to Fort Myers or Naples for medical care. Our practice welcomes Cape Coral patients who want a doctor-patient relationship built on trust and time, not volume.",
        faqs: [
          {
            question: "How far is your Naples office from Cape Coral?",
            answer: "Our office is about 40 miles south of Cape Coral, roughly a 40 to 50 minute drive via I-75 South. Patients from communities like Tarpon Point, Cape Harbour, and Sandoval typically find the drive straightforward and worth it for the quality of care."
          },
          {
            question: "Why can't I find a doctor accepting patients in Cape Coral?",
            answer: <>Availability changes over time. Contact Faithful Care to ask whether we are accepting new patients and which appointment options are currently available. The <a href="https://www.leehealth.org" target="_blank" rel="noopener noreferrer">Lee Health</a> system is another regional care resource.</>
          },
          {
            question: "What insurance do you accept for Cape Coral patients?",
            answer: <>We accept Medicare, Medicare Advantage, and most major commercial insurance plans available in Lee County. You can review your Medicare benefits at <a href="https://www.medicare.gov" target="_blank" rel="noopener noreferrer">Medicare.gov</a>. Call our office and we'll verify your specific plan before your first visit so there are no surprises.</>
          },
          {
            question: "Can I call ahead to make sure I'll be seen on time?",
            answer: "Yes. We respect your time, especially when you're driving from Cape Coral. Our scheduling approach minimizes wait times, and if there's an unexpected delay, we'll let you know before you make the drive."
          },
          {
            question: "Do you coordinate care with my Cape Coral specialists?",
            answer: "Absolutely. We regularly coordinate with cardiologists, endocrinologists, and other specialists in both Lee and Collier counties. We handle the communication so your care team stays aligned and nothing falls through the cracks."
          },
          {
            question: "Is palliative care only for end-of-life situations?",
            answer: <>Not at all. Palliative care is available at any stage of a serious illness and works alongside your existing treatment. It focuses on relieving pain and symptoms, supporting your family emotionally, and improving your overall quality of life. You can learn more at the <a href="https://www.capc.org" target="_blank" rel="noopener noreferrer">Center to Advance Palliative Care</a>.</>
          }
        ],
      }}
    />
  );
}
