import React from "react";
import { LocationPage } from "@/components/location-page";
import { Stethoscope, Heart, Pill, FirstAid, Brain, HandHeart, Heartbeat, ShieldCheck, ListChecks, UserCircle, Syringe, Thermometer, Bandaids } from "@phosphor-icons/react";

export default function BonitaSpringsLocation() {
  return (
    <LocationPage
      data={{
        name: "Bonita Springs",
        county: "Lee County",
        tagline: "Primary Care & Palliative Care Near Bonita Springs, FL",
        description: "Bonita Springs is one of Southwest Florida's most desirable communities, with more than 57,000 residents enjoying neighborhoods like Bonita Bay, Pelican Landing, Spanish Wells, Highland Woods, and Barefoot Beach. Faithful Care Medical Services is practically your neighbor, just 15 minutes south on Tamiami Trail, offering complete primary care and palliative care with the warmth of a neighborhood practice.",
        driveTime: "15 minutes",
        driveDistance: "About 10 miles south on US-41 (Tamiami Trail)",
        population: "57,000+",
        highlights: ["Just 15 min away", "Annual physicals & wellness", "Chronic disease management", "Same-day sick visits", "Palliative care team", "Medicare & Medicare Advantage"],
        localNote: "Living in Bonita Springs means you're surrounded by championship golf courses at Bonita Bay and Spanish Wells, the nature trails at Lovers Key State Park, and a true sense of community. Our office at 9955 Tamiami Trail N. Suite 2 is right on your regular route, making it easy to fit in an annual checkup, manage your diabetes or blood pressure, or schedule a same-day visit when something comes up. Many of our Bonita Springs patients are retirees and active seniors who appreciate our focus on preventive care and coordinated chronic disease management.",
        primaryCareDescription: "Bonita Springs residents from Bonita Bay to Highland Woods and Spanish Wells have a primary care practice just 15 minutes south on US-41. Our office provides thorough, personalized medical care with the time and attention that Bonita Springs' active senior community deserves.",
        primaryCareServices: [
          { icon: Stethoscope, title: "Geriatric Assessments", description: "Specialized evaluations for adults over 65, including fall risk, cognitive screening, and medication review." },
          { icon: Heartbeat, title: "Chronic Condition Care", description: "Ongoing management of diabetes, COPD, arthritis, heart disease, and other conditions common in Bonita Springs seniors." },
          { icon: ShieldCheck, title: "Preventive Medicine", description: "Annual wellness visits, cancer screenings, immunizations, and health risk assessments to keep you healthy." },
          { icon: Syringe, title: "In-Office Procedures", description: "EKGs, lab work, skin checks, and minor procedures done right in our office for your convenience." },
        ],
        palliativeCareDescription: "Many Bonita Springs residents and their families face serious health conditions that benefit from palliative care support. Our team provides comfort-focused medical care that works alongside your regular treatments, helping manage pain and difficult symptoms while respecting your goals.",
        palliativeCareServices: [
          { icon: Heart, title: "Comfort-Focused Care", description: "Pain management and symptom control for patients with cancer, heart failure, kidney disease, and neurological conditions." },
          { icon: HandHeart, title: "Caregiver Support", description: "Resources, guidance, and emotional support for family members and caregivers in the Bonita Springs community." },
          { icon: Brain, title: "Quality of Life Planning", description: "Helping you and your family define what quality of life means and building a care plan around those priorities." },
          { icon: ListChecks, title: "Hospice Transition Support", description: "When the time comes, we help facilitate a smooth, dignified transition to hospice care with trusted local partners." },
        ],
        neighborhoods: ["Bonita Bay", "Pelican Landing", "Spanish Wells", "Highland Woods", "Worthington", "Vasari", "Brooks", "Imperial Golf Estates"],
        directionsText: "From Bonita Springs, head south on US-41 (Tamiami Trail) for about 10 miles. Our office is on the right at 9955 Tamiami Trail N. Suite 2, just past Vanderbilt Beach Road. The drive takes approximately 15 minutes with easy parking.",
        localHealthContext: "Bonita Springs has a large population of retirees and seasonal residents who need reliable, ongoing primary care. Many patients split their time between Florida and northern states, making continuity of care a challenge. At Faithful Care, we coordinate with your out-of-state physicians so nothing falls through the cracks during your time in Southwest Florida.",
        faqs: [
          {
            question: "How close is your office to Bonita Springs?",
            answer: "We're about 10 miles south on US-41 (Tamiami Trail), roughly a 15-minute drive. Patients from Bonita Bay, Pelican Landing, and Spanish Wells often tell us we're closer than their previous doctor."
          },
          {
            question: "Do you focus on senior care and geriatrics?",
            answer: <>Yes. A large portion of our Bonita Springs patients are active adults over 60. We provide comprehensive geriatric assessments, preventive screenings, medication reviews, fall prevention evaluations, and personalized wellness plans designed for your stage of life. For additional senior resources, visit <a href="https://www.aarp.org" target="_blank" rel="noopener noreferrer">AARP</a>.</>
          },
          {
            question: "Can I keep my current specialists and still see you?",
            answer: "Absolutely. We coordinate closely with specialists throughout Lee and Collier counties. As your primary care doctor, we serve as the central hub for all your care, making sure every provider is aligned and nothing slips through the cracks."
          },
          {
            question: "What insurance plans do you accept?",
            answer: <>We accept Medicare, Medicare Advantage, and most major commercial insurance plans. You can check your Medicare eligibility and benefits at <a href="https://www.medicare.gov" target="_blank" rel="noopener noreferrer">Medicare.gov</a>. Call us before your first visit and we'll verify your coverage so you know exactly what to expect.</>
          },
          {
            question: "Do I need a referral to become a patient?",
            answer: "No referral is needed. You can call us directly, schedule your first visit, and we'll take it from there. We'll request your medical records from your previous provider to ensure a smooth transition."
          },
          {
            question: "What makes Faithful Care different from larger practices?",
            answer: <>We intentionally keep our patient panel small so that every appointment is unhurried and personal. You'll see the same doctor each visit, spend 30 to 60 minutes discussing your health, and never feel like you're on a conveyor belt. For community health resources in the area, you can also visit <a href="https://collier.floridahealth.gov" target="_blank" rel="noopener noreferrer">Florida Department of Health in Collier County</a>.</>
          }
        ],
      }}
    />
  );
}
