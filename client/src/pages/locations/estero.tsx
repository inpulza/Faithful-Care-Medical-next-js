import React from "react";
import { LocationPage } from "@/components/location-page";
import { Stethoscope, Heart, Pill, FirstAid, Brain, HandHeart, Heartbeat, ShieldCheck, ListChecks, UserCircle, Syringe, Thermometer, Bandaids } from "@phosphor-icons/react";

export default function EsteroLocation() {
  return (
    <LocationPage
      data={{
        name: "Estero",
        county: "Lee County",
        tagline: "Doctor's Office Near Estero. Primary Care & Palliative Care.",
        description: "Estero is one of the fastest-growing communities in Southwest Florida, with more than 35,000 residents across master-planned neighborhoods like The Brooks, Grandezza, Miromar Lakes, Pelican Sound, and Coconut Point. Whether you're newly settled or have lived here for years, Faithful Care Medical Services in Naples is just 20 minutes south on US-41, offering the kind of personal, comprehensive care that's hard to find in a rapidly growing area.",
        driveTime: "20 minutes",
        driveDistance: "About 14 miles south on US-41",
        population: "35,000+",
        highlights: ["Close & convenient", "Senior-focused care", "Preventive medicine", "In-office EKG & labs", "Palliative support", "Same-day sick visits"],
        localNote: "Estero's appeal is easy to understand: communities like The Brooks with its Shadow Wood golf courses, the lakeside luxury of Miromar Lakes, and the shopping at Coconut Point and Miromar Outlets make it feel like a complete destination. But finding a primary care doctor who isn't part of a large, impersonal system can be a challenge. At Faithful Care, we keep our practice intentionally small so you get more time with your doctor, not less.",
        primaryCareDescription: "Estero's growing communities, from The Brooks to Miromar Lakes and Grandezza, need a primary care physician who keeps up with the area's active, health-conscious lifestyle. Faithful Care provides comprehensive medical care with 30 to 60 minute appointments designed for thorough evaluation and honest conversation.",
        primaryCareServices: [
          { icon: Stethoscope, title: "Adult Primary Care", description: "Complete medical evaluations for Estero adults, including detailed history review, physical exams, and lab interpretation." },
          { icon: Heartbeat, title: "Cardiovascular Monitoring", description: "Blood pressure tracking, cholesterol management, in-office EKGs, and heart disease prevention for active lifestyles." },
          { icon: ShieldCheck, title: "Cancer Screenings", description: "Age-appropriate screening referrals and coordination for breast, colon, prostate, and skin cancer detection." },
          { icon: Pill, title: "Medication Reviews", description: "Comprehensive review of all prescriptions and supplements to eliminate unnecessary medications and prevent interactions." },
        ],
        palliativeCareDescription: "Estero patients and families dealing with serious illness can access palliative care at Faithful Care for symptom management, emotional support, and help navigating complex medical decisions. Our approach puts your comfort and personal goals at the center of every care plan.",
        palliativeCareServices: [
          { icon: Heart, title: "Pain & Symptom Control", description: "Medical management of chronic pain, fatigue, nausea, and other symptoms that interfere with daily living." },
          { icon: HandHeart, title: "Family Meetings", description: "Structured conversations with your family and care team to align treatment with your values and priorities." },
          { icon: Brain, title: "Emotional Well-Being", description: "Screening and support for anxiety, depression, and grief that often accompany serious health challenges." },
          { icon: ListChecks, title: "Treatment Navigation", description: "Helping you understand your options, coordinate between specialists, and make informed choices about your care." },
        ],
        neighborhoods: ["The Brooks", "Grandezza", "Miromar Lakes", "Coconut Point", "Rapallo", "Bella Terra", "Estero Grande", "Villages of Country Creek"],
        directionsText: "From Estero, take US-41 South (Tamiami Trail) for approximately 15 miles. Our office is at 9955 Tamiami Trail N. Suite 2, on the right past Vanderbilt Beach Road. From Coconut Point, the drive takes about 20 minutes via US-41.",
        localHealthContext: "Estero is one of Lee County's fastest-growing communities, with a mix of active retirees, young families, and seasonal residents. As the population grows, the demand for quality primary care has outpaced the supply of local physicians. Our Naples office is a short drive from Estero and provides the unhurried, personal medical care that residents deserve.",
        faqs: [
          {
            question: "How do I get to your office from Estero?",
            answer: "Take US-41 (Tamiami Trail) south for about 14 miles. Our office at 9955 Tamiami Trail N. Suite 2 is a straight, 20-minute drive. No highway or toll roads needed."
          },
          {
            question: "I just moved to Estero. How do I transfer my medical records?",
            answer: "When you schedule your first visit, we'll handle the records transfer for you. We'll contact your previous provider, request your complete history, and review everything before your appointment so your care continues seamlessly."
          },
          {
            question: "Do you offer preventive health screenings?",
            answer: <>Yes. Preventive care is a cornerstone of our practice. We offer cancer screenings, cardiovascular risk assessments, diabetes screening, bone health evaluations, and comprehensive Medicare Annual Wellness Visits designed to catch issues early. Learn more about preventive health resources through the <a href="https://lee.floridahealth.gov" target="_blank" rel="noopener noreferrer">Florida Department of Health in Lee County</a>.</>
          },
          {
            question: "What's different about your practice compared to the large medical systems?",
            answer: <>We intentionally limit our patient panel so we can spend 30 to 60 minutes with each patient. You see the same doctor every visit, your calls are returned quickly, and your care plan is genuinely personalized. While <a href="https://www.leehealth.org" target="_blank" rel="noopener noreferrer">Lee Health</a> and other large systems serve the region well, our approach offers an alternative for patients who want a more personal relationship with their doctor.</>
          },
          {
            question: "Do you work with specialists in the Estero area?",
            answer: "Yes. We coordinate care with specialists throughout Lee and Collier counties, including cardiologists, orthopedists, oncologists, and more. We manage the referrals and communication so your entire care team stays aligned."
          },
          {
            question: "Can I use my Medicare Advantage plan at your office?",
            answer: <>Yes. We accept Original Medicare, Humana and Aetna Medicare Advantage, Cigna commercial plans, and Florida Medicaid through Sunshine Health. If you're enrolled in one of these plans, give us a call and we'll confirm your coverage. You can compare plans at <a href="https://www.medicare.gov" target="_blank" rel="noopener noreferrer">Medicare.gov</a>.</>
          }
        ],
      }}
    />
  );
}
