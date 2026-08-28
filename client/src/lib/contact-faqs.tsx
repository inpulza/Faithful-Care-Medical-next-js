import * as React from "react";
import type { FaqItem } from "@/components/sections";

export const contactFaqs: FaqItem[] = [
  {
    question: "How do I schedule my first appointment at Faithful Care?",
    answer: "Call (239) 423-0205, email info@faithfulcaremedical.com, or fill out the contact form on this page. We will confirm your insurance, send you the new-patient intake forms, and schedule your first visit. Most new patients are seen within a few days of reaching out.",
  },
  {
    question: "What should I bring to my first visit?",
    answer: "Bring a photo ID, your insurance card, a list of your current medications and supplements (with dosages), the name and phone number of any specialists you see, and any recent lab or imaging results if you have copies. If you completed the intake forms ahead of time, bring those too. If you forget anything, our front desk can help fill in the gaps.",
  },
  {
    question: "What payment and insurance options do you accept?",
    answer: <>We accept Original Medicare (Parts A and B), Humana Medicare Advantage, Aetna (Medicare Advantage and commercial), Cigna commercial plans, and Florida Medicaid through Sunshine Health. We also offer a Direct Primary Care membership governed by a written agreement that explains the monthly fee, included services, and exclusions. For plan-specific questions, you can verify benefits on <a href="https://www.medicare.gov" target="_blank" rel="noopener noreferrer">Medicare.gov</a> or call our office and we will check your coverage for you.</>,
  },
  {
    question: "Do you offer telehealth or video visits?",
    answer: "Yes. Established patients can book secure video or phone visits for follow-ups, medication refills, lab reviews, and many minor concerns. New patients are typically scheduled in person first so we can complete a thorough exam and build your medical history.",
  },
  {
    question: "Where is the office and is parking accessible?",
    answer: "We are located at 9955 Tamiami Trail N. Suite 2, Naples, FL 34108, in North Naples just off US-41. Free parking is available directly in front of the building, and the entrance is wheelchair accessible. If you need extra help getting in from your car, please let our front desk know when you arrive and a team member will meet you at the door.",
  },
];
