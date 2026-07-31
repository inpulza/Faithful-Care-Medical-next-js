import * as React from "react";
import type { FaqItem } from "@/components/sections";

export const homeFaqs: FaqItem[] = [
  {
    question: "Are you accepting new patients in Naples, Florida?",
    answer: <>Yes. Faithful Care is open to new patients of all ages across Naples and the surrounding Collier and Lee County communities. Call (239) 423-0205 or use our contact form to start the intake process. Most new patients are scheduled within a few days. See <a href="/new-patients">what to bring and what to expect at your first visit</a>.</>,
  },
  {
    question: "Do you accept Medicare, Medicare Advantage, and commercial insurance?",
    answer: <>Yes. We accept Original Medicare (Parts A and B), Humana Medicare Advantage, Aetna (Medicare Advantage and commercial), Cigna commercial plans, and Florida Medicaid through Sunshine Health. You can verify your specific plan benefits anytime on <a href="https://www.medicare.gov" target="_blank" rel="noopener noreferrer">Medicare.gov</a>, or call our office and we will check your coverage for you.</>,
  },
  {
    question: "What is Direct Primary Care and how is it different from concierge medicine?",
    answer: <>Direct Primary Care (DPC) is a membership model where you pay your doctor a flat monthly fee for unlimited primary care visits, direct phone and text access, and longer appointments. It is not insurance and it does not replace coverage for hospital stays or specialists. Concierge medicine usually charges a much higher annual retainer on top of insurance billing; DPC is a flat fee with no insurance billing for primary care. Read more about the model from the <a href="https://www.dpcare.org" target="_blank" rel="noopener noreferrer">Direct Primary Care Coalition</a>.</>,
  },
  {
    question: "How much does a Direct Primary Care membership cost?",
    answer: "Pricing depends on your age and household. Adult memberships at Faithful Care typically range from a low monthly fee for individuals to a discounted family rate. There are no copays, no per-visit charges, and prescription medications dispensed in our office are billed at wholesale cost. Call us for current pricing and family plans.",
  },
  {
    question: "Can I get a same-day or next-day appointment?",
    answer: "Yes. We hold appointment slots open every day specifically for urgent issues. If you call in the morning with a fever, infection, injury, or sudden symptom, we will do everything we can to see you the same day, or the next morning at the latest. Members get priority scheduling.",
  },
  {
    question: "What is the difference between palliative care and hospice?",
    answer: <>Palliative care is specialized medical support for anyone living with a serious illness. It focuses on relieving pain, managing symptoms, and improving quality of life, and it works alongside your other treatments at any stage of the disease. Hospice is a specific benefit for the final months of life when curative treatment has been stopped. You can read a clear comparison from the <a href="https://www.nhpco.org" target="_blank" rel="noopener noreferrer">National Hospice and Palliative Care Organization</a>.</>,
  },
  {
    question: "Do you offer telehealth or video visits?",
    answer: "Yes. Established patients can schedule secure video and phone visits for follow-ups, medication refills, lab reviews, and many minor concerns. In-person visits are still recommended for new patients, physical exams, and anything that needs hands-on assessment. Members can text or call their doctor directly for quick questions without booking a full visit.",
  },
];
