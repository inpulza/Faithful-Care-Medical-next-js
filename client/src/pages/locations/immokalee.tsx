import React from "react";
import { LocationPage } from "@/components/location-page";
import { Stethoscope, Heart, Pill, FirstAid, Brain, HandHeart, Heartbeat, ShieldCheck, ListChecks, UserCircle, Syringe, Thermometer, Bandaids } from "@phosphor-icons/react";

export default function ImmokaleeLocation() {
  return (
    <LocationPage
      data={{
        name: "Immokalee",
        county: "Collier County",
        tagline: "Accessible Medical Care for Immokalee & Eastern Collier County",
        description: "The Immokalee community is the backbone of Collier County's agricultural industry, made up of hardworking families who deserve the same quality of medical care available anywhere in Southwest Florida. Faithful Care Medical Services welcomes patients from Immokalee and all of eastern Collier County, providing comprehensive primary care and palliative care with a deep commitment to accessibility, affordability, and dignity for every patient.",
        driveTime: "35 minutes",
        driveDistance: "About 30 miles west via Immokalee Rd (CR-846)",
        population: "28,000+",
        highlights: ["Medicare & Medicaid accepted", "Preventive screenings", "Chronic disease management", "Senior care", "Same-day visits available", "Respectful, compassionate team"],
        localNote: "We know that for many Immokalee residents, getting to a doctor's appointment can mean arranging transportation, taking time off work, and navigating a healthcare system that doesn't always feel welcoming. At Faithful Care, we work to make every visit worth the trip. We provide thorough care, not rushed 10-minute appointments, covering everything from annual physicals and diabetes management to blood pressure control, women's health screenings, and preventive cancer screenings. We treat every patient who walks through our door with the same respect, regardless of background or insurance type.",
        primaryCareDescription: "Immokalee's hardworking families deserve accessible, affordable primary care from a doctor who treats every patient with dignity. At Faithful Care, we accept Medicare, Medicaid, and most insurance plans, offer bilingual care in English and Spanish, and take the time to make sure you understand your diagnosis and treatment plan.",
        primaryCareServices: [
          { icon: Stethoscope, title: "Adult Primary Care", description: "Complete medical evaluations, annual physicals, lab work, and ongoing health monitoring for Immokalee adults." },
          { icon: Heartbeat, title: "Chronic Disease Care", description: "Management of diabetes, high blood pressure, asthma, and other conditions with regular check-ins and medication adjustments." },
          { icon: ShieldCheck, title: "Preventive Health Screenings", description: "Cancer screenings, cholesterol checks, blood sugar testing, and immunizations to protect your long-term health." },
          { icon: Syringe, title: "Urgent Medical Visits", description: "When you need to see a doctor quickly, call us for same-day availability. We understand that time off work is limited." },
        ],
        palliativeCareDescription: "For Immokalee patients living with serious illness, palliative care provides compassionate support focused on comfort and dignity. Our bilingual team works with patients and families to manage pain, understand treatment options, and make decisions that align with personal and cultural values.",
        palliativeCareServices: [
          { icon: Heart, title: "Pain & Comfort Care", description: "Targeted pain management and symptom relief for patients with cancer, diabetes complications, kidney disease, and more." },
          { icon: HandHeart, title: "Family-Centered Decisions", description: "Including your family in care conversations, with translation support, so everyone understands the plan." },
          { icon: Brain, title: "Emotional Support", description: "Addressing the stress, fear, and emotional weight that serious illness places on patients and their loved ones." },
          { icon: ListChecks, title: "Insurance & Resource Navigation", description: "Helping Immokalee patients access Medicaid benefits, county health programs, and community support services." },
        ],
        neighborhoods: ["Immokalee Town Center", "Main Street Corridor", "New Market Road", "State Road 29", "Lake Trafford Area", "Roberts Ranch", "Farm Worker Village", "Immokalee Airport Area"],
        directionsText: "From Immokalee, take State Road 29 south to I-75. Head west on I-75 to Exit 111 (Immokalee Road), then west to US-41 and south to our office at 9955 Tamiami Trail N. Suite 2. The drive takes about 45 minutes. Alternatively, take CR-846 (Immokalee Road) west directly to US-41.",
        localHealthContext: "Immokalee is a vital agricultural community in eastern Collier County where access to quality healthcare has historically been limited. Many residents work demanding physical jobs and face chronic health conditions that require consistent medical attention. Faithful Care serves Immokalee families with affordable, bilingual medical care and the respect that every patient deserves.",
        faqs: [
          {
            question: "How do I get to your office from Immokalee?",
            answer: "Take Immokalee Road (CR-846) heading west for about 30 miles until it meets US-41 (Tamiami Trail). Turn left (south) on US-41, and our office at 9955 Tamiami Trail N. Suite 2 is a short drive south. The total trip takes about 35 minutes."
          },
          {
            question: "Do you accept Medicaid for Immokalee patients?",
            answer: <>Yes. We accept Medicaid, Medicare, Medicare Advantage, and most major commercial insurance plans. You can check your eligibility and learn about available programs at <a href="https://www.medicare.gov" target="_blank" rel="noopener noreferrer">Medicare.gov</a>. We believe everyone in the Immokalee community deserves access to quality, thorough healthcare.</>
          },
          {
            question: "Can I bring a family member to translate or help during my visit?",
            answer: "Absolutely. We encourage family involvement in your healthcare. Bringing a family member who can help with communication, take notes, or simply provide support is always welcome at our office."
          },
          {
            question: "What if I need to take time off work for an appointment?",
            answer: "We understand that many Immokalee residents have demanding work schedules. We offer morning appointments starting at 8:30 AM and do our best to minimize wait times so your time away from work is as brief as possible."
          },
          {
            question: "Do you provide preventive screenings?",
            answer: <>Yes. Preventive care is essential to catching health problems early, when they're easiest to treat. We offer diabetes screening, blood pressure checks, cancer screenings, cholesterol testing, and comprehensive annual wellness exams covered by most insurance plans. For more health resources in your area, visit the <a href="https://collier.floridahealth.gov" target="_blank" rel="noopener noreferrer">Florida Department of Health in Collier County</a>.</>
          },
          {
            question: "What is palliative care and who is it for?",
            answer: <>Palliative care is specialized medical support for people living with a serious illness. It focuses on relieving pain and other symptoms, providing emotional support for the whole family, and helping with important decisions about future care. It is not the same as hospice and is available alongside your regular treatment. Learn more at the <a href="https://www.capc.org" target="_blank" rel="noopener noreferrer">Center to Advance Palliative Care</a>.</>
          }
        ],
      }}
    />
  );
}
