import React from "react";
import { LocationPage } from "@/components/location-page";
import { Stethoscope, Heart, Pill, FirstAid, Brain, HandHeart, Heartbeat, ShieldCheck, ListChecks, UserCircle, Syringe, Thermometer, Bandaids } from "@phosphor-icons/react";

export default function MarcoIslandLocation() {
  return (
    <LocationPage
      data={{
        name: "Marco Island",
        county: "Collier County",
        tagline: "Primary Care Doctor Near Marco Island. Geriatric & Palliative Care.",
        description: "Marco Island is a stunning barrier island with about 17,000 year-round residents that swells to 35,000 during season. With a median age of nearly 68, the island's residents have specific healthcare needs: geriatric care, chronic disease management, fall prevention, and support for serious illness. Faithful Care Medical Services in Naples is just 25 minutes north via Collier Blvd, offering the specialized care Marco Island's community deserves.",
        driveTime: "25 minutes",
        driveDistance: "About 17 miles north via Collier Blvd (CR-951)",
        population: "17,000+ year-round",
        highlights: ["Geriatric assessments", "Fall prevention", "Medicare & Medicare Advantage", "Chronic disease control", "Snowbird-friendly scheduling", "Palliative care team"],
        localNote: "Whether you live on Marco Island year-round or spend your winters here, you need a primary care doctor on the mainland who understands the health priorities of an active, older population. Our patients from Marco Island appreciate that we take the time to do thorough geriatric assessments, review all medications carefully, coordinate with specialists when needed, and provide honest, compassionate conversations about long-term health planning. From Hideaway Beach to Tigertail, we serve Marco Island residents who want healthcare that matches their quality of life.",
        primaryCareDescription: "Marco Island's year-round residents and seasonal visitors deserve a primary care doctor who understands the unique health needs of an island community. From routine physicals to managing chronic conditions, Faithful Care offers comprehensive medical care just 25 minutes from the island.",
        primaryCareServices: [
          { icon: Stethoscope, title: "Comprehensive Wellness Exams", description: "Thorough annual physicals with lab work, cardiovascular assessment, and personalized health plans for island residents." },
          { icon: Heartbeat, title: "Chronic Disease Management", description: "Expert care for diabetes, hypertension, thyroid conditions, and COPD with regular monitoring and follow-up." },
          { icon: UserCircle, title: "Seasonal Patient Care", description: "Coordinated care for snowbirds who split time between Marco Island and northern states, keeping records seamless." },
          { icon: Syringe, title: "Same-Day Urgent Care", description: "When illness strikes on the island, call us for same-day availability at our Naples office, just 25 minutes north." },
        ],
        palliativeCareDescription: "For Marco Island residents facing cancer, heart failure, or other serious diagnoses, our palliative care program provides comfort-focused support that complements your existing medical treatments. We work with you and your family to manage symptoms and maintain the quality of life you value.",
        palliativeCareServices: [
          { icon: Heart, title: "Pain Management", description: "Individualized pain relief strategies for patients with advanced illness, focused on comfort and function." },
          { icon: HandHeart, title: "Advance Directives", description: "Help creating living wills and healthcare surrogate designations that reflect your personal wishes." },
          { icon: Brain, title: "Coping & Support", description: "Emotional and psychological support for patients and families adjusting to serious health diagnoses." },
          { icon: ListChecks, title: "NCH & Specialist Coordination", description: "We coordinate with NCH Healthcare System and Collier County specialists to streamline your care." },
        ],
        neighborhoods: ["Marco Island Town Center", "Hideaway Beach", "Key Marco", "Olde Marco", "Tigertail Beach Area", "Residents' Beach Area", "South Collier Boulevard", "San Marco Road Corridor"],
        directionsText: "From Marco Island, take Collier Blvd (CR-951) north to US-41. Turn left (north) on US-41 and continue for about 10 miles to our office at 9955 Tamiami Trail N. Suite 2. The drive takes approximately 25 minutes from the island center.",
        localHealthContext: "Marco Island has a high concentration of retirees and seasonal residents who need consistent primary care throughout the year. Limited medical options on the island itself mean many residents already travel to the Naples mainland for specialist care. Faithful Care gives Marco Island patients a dedicated primary care home with a doctor who tracks their health across seasons.",
        faqs: [
          {
            question: "Is your office convenient for Marco Island residents?",
            answer: "Yes. We're about 17 miles north via Collier Blvd (CR-951), roughly a 25-minute drive from Marco Island. Just cross the Jolley Bridge, head north on 951, and continue to US-41. Our office is at 9955 Tamiami Trail N. Suite 2."
          },
          {
            question: "Do you accommodate snowbird schedules?",
            answer: <>Absolutely. We work with many seasonal residents who spend winter months on Marco Island. We can schedule your annual physical, Medicare Wellness Visit, and preventive screenings during your season stay, and coordinate with your northern doctor for year-round continuity. You can explore senior resources and local programs at <a href="https://www.aarp.org" target="_blank" rel="noopener noreferrer">AARP</a>.</>
          },
          {
            question: "What geriatric services do you offer?",
            answer: <>Our geriatric care includes comprehensive health assessments, medication safety reviews, fall risk evaluations, cognitive screenings for memory concerns, nutritional counseling, bone density coordination, and personalized wellness plans designed for patients over 65. The <a href="https://www.nchmd.org" target="_blank" rel="noopener noreferrer">NCH Healthcare System</a> is also a trusted resource for specialized care in Collier County.</>
          },
          {
            question: "Can you coordinate with my doctors back home?",
            answer: "Yes. For our seasonal patients, we regularly communicate with physicians in their home states to ensure seamless care. We share visit notes, lab results, and updated medication lists so nothing is lost during transitions."
          },
          {
            question: "Do you help with advance care planning?",
            answer: <>Yes. We help Marco Island patients and their families with advance directives, healthcare proxies, living wills, and goals-of-care conversations. These discussions are an important part of thoughtful, patient-centered medicine. For more on advance care planning, visit the <a href="https://www.nhpco.org" target="_blank" rel="noopener noreferrer">National Hospice and Palliative Care Organization</a>.</>
          },
          {
            question: "What palliative care services are available for Marco Island patients?",
            answer: "Our palliative care program includes pain and symptom management, emotional support for patients and caregivers, family meetings, advance care planning, and coordination with home health agencies serving Marco Island. This care is available alongside your regular treatment at any stage of a serious illness."
          }
        ],
      }}
    />
  );
}
