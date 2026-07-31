import React from "react";
import { LocationPage } from "@/components/location-page";
import { Stethoscope, Heart, Pill, FirstAid, Brain, HandHeart, Heartbeat, ShieldCheck, ListChecks, UserCircle, Syringe, Thermometer, Bandaids } from "@phosphor-icons/react";

export default function FortMyersLocation() {
  return (
    <LocationPage
      data={{
        name: "Fort Myers",
        county: "Lee County",
        tagline: "Primary Care Doctor Near Fort Myers. Accepting New Patients.",
        description: "Fort Myers is Lee County's largest city, home to nearly 100,000 residents across neighborhoods like the River District, Edison Park, McGregor, Whiskey Creek, Colonial Country Club, and Gateway. Finding a primary care doctor who isn't rushed and overbooked can feel impossible. That's why many Fort Myers residents are making the short drive south on I-75 to Faithful Care Medical Services in Naples.",
        driveTime: "35–45 minutes",
        driveDistance: "About 35 miles via US-41 or I-75 South",
        population: "98,000+",
        highlights: ["Comprehensive primary care", "Chronic disease management", "Same-day sick visits", "Geriatric assessments", "In-office EKG & labs", "Palliative care team"],
        localNote: "Whether you're near downtown Fort Myers by the Caloosahatchee River, out in South Fort Myers near Lakes Regional Park, or in the Gateway community off Daniels Parkway, our Naples office is a straight shot down I-75 or US-41. Many of our Fort Myers patients tell us they chose Faithful Care because they were tired of being treated like a number at large practices. Here, you'll spend real time with your doctor, get answers to your questions, and receive a personalized care plan.",
        primaryCareDescription: "Fort Myers residents deserve a doctor who takes the time to understand their health history, answers every question, and creates a care plan that actually fits their life. At Faithful Care, our primary care visits last 30 to 60 minutes, not the rushed 10-minute appointments common at larger Lee County practices.",
        primaryCareServices: [
          { icon: Stethoscope, title: "Annual Wellness Exams", description: "Comprehensive physicals with bloodwork, health screenings, and personalized prevention plans for Fort Myers adults." },
          { icon: Heartbeat, title: "Chronic Disease Management", description: "Ongoing care for diabetes, hypertension, high cholesterol, and heart disease with regular monitoring and medication adjustments." },
          { icon: Syringe, title: "Same-Day Sick Visits", description: "Feeling sick today? Fort Myers patients can call in the morning and be seen the same day at our Naples office." },
          { icon: ShieldCheck, title: "Preventive Screenings", description: "Cancer screenings, bone density referrals, cognitive assessments, and immunizations to catch problems early." },
        ],
        palliativeCareDescription: "For Fort Myers patients living with serious illness, palliative care provides an extra layer of medical support focused on comfort, symptom relief, and quality of life. This is not hospice. Palliative care works alongside your existing treatments at any stage of illness.",
        palliativeCareServices: [
          { icon: Heart, title: "Pain & Symptom Management", description: "Expert relief for chronic pain, nausea, fatigue, and breathing difficulties that affect daily life." },
          { icon: HandHeart, title: "Goals of Care Conversations", description: "Thoughtful discussions about treatment priorities, advance directives, and what matters most to you and your family." },
          { icon: Brain, title: "Emotional & Psychological Support", description: "Addressing anxiety, depression, and emotional distress that often accompanies serious illness." },
          { icon: ListChecks, title: "Care Coordination", description: "We communicate with your specialists, hospital teams, and family to keep everyone on the same page." },
        ],
        neighborhoods: ["River District", "Edison Park", "McGregor Boulevard", "South Fort Myers", "Gateway", "Colonial Country Club", "Whiskey Creek", "Page Field"],
        directionsText: "From downtown Fort Myers, take I-75 South for about 30 miles to Exit 111 (Immokalee Road). Head west to US-41, then south to 9955 Tamiami Trail N. Suite 2. From South Fort Myers, US-41 South is a direct route through Bonita Springs to our office.",
        localHealthContext: "Fort Myers has a rapidly growing population of adults over 55, many of whom struggle to find primary care doctors who are accepting new patients. Lee County's healthcare system is stretched thin, and many practices have wait times of weeks or even months. Our Naples office offers Fort Myers residents a personal care alternative with shorter wait times and longer appointments.",
        faqs: [
          {
            question: "How long is the drive from Fort Myers to your office?",
            answer: "Our office at 9955 Tamiami Trail N. Suite 2 in Naples is about 35 miles south of Fort Myers. The drive takes 35 to 45 minutes via I-75 South or US-41 (Tamiami Trail), depending on traffic. Many of our Fort Myers patients find it's an easy, pleasant drive."
          },
          {
            question: "Do you accept Medicare and insurance plans from Fort Myers?",
            answer: <>Yes. We accept Medicare, Medicare Advantage, and most major commercial insurance plans used throughout Lee County. You can verify plan details and compare coverage options on <a href="https://www.medicare.gov" target="_blank" rel="noopener noreferrer">Medicare.gov</a>. If you're unsure whether we take your specific plan, call us and we'll check right away.</>
          },
          {
            question: "Can I get a same-day appointment if I'm sick?",
            answer: "Absolutely. If you call in the morning, we'll do our best to see you that same day. We know that driving from Fort Myers isn't something you want to do unless you'll actually be seen, so we prioritize getting you in quickly."
          },
          {
            question: "Why do Fort Myers patients choose a Naples doctor?",
            answer: "Many Fort Myers patients come to us because they struggled to find a doctor who wasn't rushing through appointments. Our intentionally small practice means longer visits, a doctor who remembers you, and care that feels personal rather than transactional."
          },
          {
            question: "Do you provide geriatric care for older adults?",
            answer: <>Yes. A significant portion of our practice is focused on adults over 65. We provide comprehensive geriatric assessments, fall risk evaluations, medication reviews, cognitive screenings, and coordination with specialists to ensure nothing falls through the cracks. For additional senior health resources in Lee County, visit <a href="https://lee.floridahealth.gov" target="_blank" rel="noopener noreferrer">Florida Department of Health in Lee County</a>.</>
          },
          {
            question: "What is palliative care, and is it the same as hospice?",
            answer: <>No, palliative care is not hospice. Palliative care is an extra layer of medical support for patients dealing with serious illness, available at any stage and alongside your regular treatment. It focuses on pain relief, symptom management, and quality of life for both patients and their families. Learn more about palliative care at the <a href="https://www.nhpco.org" target="_blank" rel="noopener noreferrer">National Hospice and Palliative Care Organization</a>.</>
          }
        ],
      }}
    />
  );
}
