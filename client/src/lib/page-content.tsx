import type { ReactNode } from "react";
import { GOOGLE_RATING } from "@/lib/provider-info";
import heroImageDefault from "@/assets/images/hero-doctor-faithful-care.optimized.webp";
import heroImageMobileDefault from "@/assets/images/hero-doctor-mobile.mobile.webp";
import heroSeniorWoman from "@/assets/images/hero-doctor-senior-woman.optimized.webp";
import heroSeniorWomanMobile from "@/assets/images/hero-doctor-senior-woman.mobile.webp";
import heroYoungWoman from "@/assets/images/hero-doctor-young-woman.optimized.webp";
import heroYoungWomanMobile from "@/assets/images/hero-doctor-young-woman.mobile.webp";
import heroYoungMan from "@/assets/images/hero-doctor-young-man.optimized.webp";
import heroYoungManMobile from "@/assets/images/hero-doctor-young-man.mobile.webp";
import heroWoman from "@/assets/images/hero-doctor-woman.optimized.webp";
import heroWomanMobile from "@/assets/images/hero-doctor-woman.mobile.webp";
import heroSeniorMan from "@/assets/images/hero-doctor-senior-man.optimized.webp";
import heroSeniorManMobile from "@/assets/images/hero-doctor-senior-man.mobile.webp";
import heroCheckups from "@/assets/images/hero-checkups-prevention.optimized.webp";
import heroCheckupsMobile from "@/assets/images/hero-checkups-prevention.mobile.webp";
import heroChronic from "@/assets/images/hero-chronic-disease.optimized.webp";
import heroChronicMobile from "@/assets/images/hero-chronic-disease.mobile.webp";
import heroSameDay from "@/assets/images/hero-same-day-visits.optimized.webp";
import heroSameDayMobile from "@/assets/images/hero-same-day-visits.mobile.webp";
import heroWomens from "@/assets/images/hero-womens-health.optimized.webp";
import heroWomensMobile from "@/assets/images/hero-womens-health.mobile.webp";
import heroSenior from "@/assets/images/hero-senior-care.optimized.webp";
import heroSeniorMobile from "@/assets/images/hero-senior-care.mobile.webp";
import heroProcedures from "@/assets/images/hero-procedures-diagnostics.optimized.webp";
import heroProceduresMobile from "@/assets/images/hero-procedures-diagnostics.mobile.webp";
import heroNaples from "@/assets/images/hero-naples-a5.optimized.webp";
import heroNaplesMobile from "@/assets/images/hero-naples-a5.mobile.webp";
import heroMarcoIsland from "@/assets/images/hero-location-marco-island.optimized.webp";
import heroMarcoIslandMobile from "@/assets/images/hero-location-marco-island.mobile.webp";
import heroGoldenGate from "@/assets/images/hero-location-golden-gate.optimized.webp";
import heroGoldenGateMobile from "@/assets/images/hero-location-golden-gate.mobile.webp";
import heroImmokalee from "@/assets/images/hero-location-immokalee.optimized.webp";
import heroImmokaleMobile from "@/assets/images/hero-location-immokalee.mobile.webp";
import heroBonitaSprings from "@/assets/images/hero-location-bonita-springs.optimized.webp";
import heroBonitaSpringsMobile from "@/assets/images/hero-location-bonita-springs.mobile.webp";
import heroEstero from "@/assets/images/hero-location-estero.optimized.webp";
import heroEsteroMobile from "@/assets/images/hero-location-estero.mobile.webp";
import heroFortMyers from "@/assets/images/hero-location-fort-myers.optimized.webp";
import heroFortMyersMobile from "@/assets/images/hero-location-fort-myers.mobile.webp";
import heroCapeCoral from "@/assets/images/hero-location-cape-coral.optimized.webp";
import heroCapCoralMobile from "@/assets/images/hero-location-cape-coral.mobile.webp";
import heroAveMaria from "@/assets/images/hero-location-ave-maria.optimized.webp";

export interface MapConfig {
  lat: number;
  lng: number;
  label?: string;
  zoom?: number;
}

export interface PageContent {
  title: ReactNode;
  subtitle: string;
  subtitleBold?: string;
  marqueeItems: string[];
  heroImage: string;
  heroImageAlt?: string;
  heroImageMobile?: string;
  heroBlurPlaceholder?: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  heroTextTheme?: "dark" | "light";
  mapConfig?: MapConfig;
  mobileGreeting?: boolean;
}

const blur = {
  doctor: "data:image/webp;base64,UklGRnYAAABXRUJQVlA4IGoAAAAwBACdASoUAAsAPu1orU2ppqSiMAgBMB2JaACxC8AJW1kgpoUTNzNZ+gAA/vforvEhALTYVpUo1d+4Smfo1ttD85s/YgUVhX2MxrlngUyzldYql84PMsNvr3peRFj50rgtGHJD3mE9OQAA",
  doctorMobile: "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAABQAwCdASoUAAsALvmczmclLy8vDwD4SzAFYAIbvCTE/pZp4AD+r22TpKzTTJGwRATyI2g3O9kI/6sh84Sl6mBpz7I+TQcWAAA=",
  seniorWoman: "data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAADwAwCdASoUAAsALrV2u12jqampiYC0S1AE6ZQANT8q2eCa/+TTYVTQAP7nKQhIjXCKkEjmr5VZaTpUPl8SdVNw56z8b9qZyZ5tWvzptXAxSOvWfi1b9gXRHJjJUT9LQnDwEJR9O05/ccL8sC0pFmfq/5yOmVsAAAA=",
  youngWoman: "data:image/webp;base64,UklGRogAAABXRUJQVlA4IHwAAABQBACdASoUAAsAPu1qrU8ppiQiMAgBMB2JZgCdMoMrZEmivuoxYbogrXIgAP7TSlp7iP9gDZUrBaSeOs9AjRI0jSWCwOvcWb9oJgX8i0uiqmjeEbbrlC+s7RDA+cZ9w36lae4roHgj3eREl+itPFp9s1akgUoxc4YggAAA",
  youngMan: "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAADwAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JQBYdg9XbBJTg/gI+Y9BYAP7D/bEzK4LUnWMamwtEG3uljBmwOm2QZeEvFD41JOyutT+Te8tdHPzWQTOcD3PM0PFdoCqw44mGhQmaZAMnVsIAAAA=",
  patientWoman: "data:image/webp;base64,UklGRoQAAABXRUJQVlA4IHgAAAAwBACdASoUAAsAPu1kqk2ppaQiMAgBMB2JbACdMoMxgONSqVACV/+p6oAA/vgkVdYDHHLMQWgl/dWNoakSkfiHXRxAx4XsrDYMePKOhsqLL1BcByZ74DMjOx8fMXPDj2PRqloj558XYlkY98yR5chd1jSu8SpPgAA=",
  seniorMan: "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAADwAwCdASoUAAsAPu1iqk2ppaQiMAgBMB2JZgCdABxL3MwXR/6s25NAAP7D/bdmM+6Y/EXPuAQi86X99WcoC84xDhvYjUGGJ/E8Tdrol7OnBi9lveDzOyhCXbkI8xOInJiZlYpD79Hdj6kgr5spAAAA",
  checkups: "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAAAwAwCdASoUAAsAPzmEuVOvKKWisAgB4CcJZgCdABg0hLYAAP3OoxXRm8WS1Ip3+8ZrrQd2517XpzX2uV4D9mqBlht2yeunfiXcJKYvNjIiuaSnE0a+AAAA",
  chronic: "data:image/webp;base64,UklGRlwAAABXRUJQVlA4IFAAAACQAwCdASoUAAsAPzmGulQvKSWjMAgB4CcJQBdgApiLdYGFwD5AAKw7kXENevObFY9hrC04azPedwvk68ZdQhtxh4iAIQz4vevFeUjkloAAAA==",
  sameDay: "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAABwAwCdASoUAAsAPzmKu1SvKaYjMAgB4CcJYgCdABTcioSVDgAA9wMjSP8c807xmlvLanH7VpL0KKveuK5sn1feyx7xKkRYU8lPz9WAUu71cpnDSJrcetEsAAA=",
  womens: "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAACwAwCdASoUAAsAPzmMu1SvKaYjMAgB4CcJZgCdAAqdaxkxXww/AAD8Uq0gnycCV2pOB7d61xz0qoFEb/XuIlKac2sxaX+GpyVoQ4AiymrYHo+4hJs1N1v7BsoDwAAA",
  senior: "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAACQAwCdASoUAAsAPzmIvlOvKScisAgB4CcJaACdAA0s2qI5LKFAAPcGuFc7pKva6Oc668E0+i3ytS/k5LU9LhnI0KhCxZbuwZm2RUcMtGi/chcOnnt46nf7Wj0Hwk1xgAA=",
  procedures: "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAACwAwCdASoUAAsAPzmGuVOvKSWisAgB4CcJagCdABxFf2RQq6010ADCvan5UKLeBCz3GX5OVjPFLF+f2KnhwWMdPynWm1fHSQUiMPFseCroZfdELVGUDhAiaZAzfT1z8qWAAA==",
  naples: "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADQAwCdASoUAAsAPzmIulQvKSWjMAgB4CcJYgBUfoeN/eet8NzwFIAA8pGzLQ1kRdGBEEILPilsww81x90t+9HdimFFIETtwfluqWAIHv8cBCueqbtgAAAA",
  marcoIsland: "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAABwAwCdASoUAAsAPzmIulQvKSWjMAgB4CcJYwC7AA/cFnJ7p9wAzfEL37Lmq9p4IofjDV+e7BayhDqBw3oF/1M0tsA8XRul6NddEdF0x3mEjDomaIAAAA==",
  goldenGate: "data:image/webp;base64,UklGRngAAABXRUJQVlA4IGwAAABQBACdASoUAAsAPzmGulQvKSWjMAgB4CcJYgC7MoGv/gMlD5dyzbHLFexgAP0rSafBb04WRjxUS6vblJqa65Ot/POycGf70uQtblDo441+3vuE7ZghIQeT/171YnyA+cWgRwEVckieGcAAAAA=",
  immokalee: "data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAACwAwCdASoUAAsAPzmIu1QvKSYjMAgB4CcJYgCdACHYnRQ7U73HAAD17RNVEP+Zlo+CxIXzPL0M3bJetj4l9T5lffmN2QtyUofr3PAA",
  bonitaSprings: "data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAAAQAwCdASoUAAsAPzmGuVOvKSWisAgB4CcJQAALb+i+0QAA/ujZ2qPPRYWfjFD/MA8Vvv1qv88sEJWcZhSjivlfjfkQn8XIAAA=",
  estero: "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAADQAwCdASoUAAsAPzmGuVOvKSWisAgB4CcJYgAAWrBv6i2WyPVpF9AA/uL1u4TlHiPSQMd7e50dU4DD+lCOu7dpXOyZUf8qzqF5gz5q0PbJuGWIrMVqf0pRgAA=",
  fortMyers: "data:image/webp;base64,UklGRl4AAABXRUJQVlA4IFIAAAAQBACdASoUAAsAPzmGulOvKSWisAgB4CcJZQCxHn8AwNaBuWHj2J14AAD+6MtPuxe9ocWZ7Bbw7yBx2yeDuB8YluQPcSG6Spoq5Xv3QyzOAAAA",
  capeCoral: "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAADwAwCdASoUAAsAPzmEuVOvKKWisAgB4CcJZACdMoACrCOQf3r9dTvQAP4mpw6vE/Z3bHmnMKBx/dozd+x0VBtVwMLhuA91iWOwnhtNoKRQhcg7etKUXf9rf3ICwDgP0AA=",
} as const;

export const pageContentMap: Record<string, PageContent> = {
  "/primary-care/checkups-prevention": {
    title: <>Annual Checkups &<br className="hidden md:block" /> Preventive Care</>,
    subtitleBold: "Stay Healthy, Stay Ahead.",
    subtitle: "Annual physicals, Medicare Wellness Visits, cancer screenings, immunizations, and heart health assessments. Everything you need to catch problems early and stay on track.",
    marqueeItems: ["Annual physicals", "Medicare Wellness", "Cancer screenings", "Immunizations"],
    heroImage: heroCheckups,
    heroImageAlt: "Faithful Care doctor performing an annual checkup and preventive care exam for a patient in Naples, Florida",
    heroImageMobile: heroCheckupsMobile,
    heroBlurPlaceholder: blur.checkups,
  },
  "/primary-care/chronic-disease": {
    title: <>Chronic Disease<br className="hidden md:block" /> Management</>,
    subtitleBold: "Keep Your Conditions Under Control.",
    subtitle: "Expert, ongoing care for diabetes, high blood pressure, heart disease, COPD, kidney disease, thyroid problems, and more. All managed right here without endless specialist referrals.",
    marqueeItems: ["Diabetes care", "Blood pressure control", "Heart disease", "COPD management"],
    heroImage: heroChronic,
    heroImageAlt: "Naples primary care doctor helping a patient manage a chronic disease at Faithful Care Medical Services",
    heroImageMobile: heroChronicMobile,
    heroBlurPlaceholder: blur.chronic,
  },
  "/primary-care/same-day-visits": {
    title: <>Same-Day &<br className="hidden md:block" /> Urgent Visits</>,
    subtitleBold: "Sick Today? We See You Today.",
    subtitle: "Infections, dizziness, headaches, minor injuries, and medication side effects. No need for the ER. Walk in or call for a same-day appointment in Naples.",
    marqueeItems: ["Same-day appointments", "Infections & flu", "Urgent concerns", "No ER needed"],
    heroImage: heroSameDay,
    heroImageAlt: "Faithful Care doctor providing a same-day, urgent care visit for a patient in Naples, Florida",
    heroImageMobile: heroSameDayMobile,
    heroBlurPlaceholder: blur.sameDay,
  },
  "/primary-care/womens-health": {
    title: <>Women's Health<br className="hidden md:block" /> Services</>,
    subtitleBold: "Care Designed for You.",
    subtitle: "Pap smears, breast exams, contraceptive counseling, menopause support, and STI evaluation with the privacy and compassion you deserve.",
    marqueeItems: ["Pap smears", "Breast exams", "Menopause care", "Contraceptive counseling"],
    heroImage: heroWomens,
    heroImageAlt: "Doctor providing women's health services to a patient at Faithful Care Medical Services in Naples, Florida",
    heroImageMobile: heroWomensMobile,
    heroBlurPlaceholder: blur.womens,
  },
  "/primary-care/senior-care": {
    title: <>Specialized Care<br className="hidden md:block" /> for Seniors</>,
    subtitleBold: "The Gold Standard for Older Adults.",
    subtitle: "Comprehensive geriatric assessments, fall prevention, memory screening, medication review, and coordination with your family and caregivers, helping you stay independent longer.",
    marqueeItems: ["Geriatric assessments", "Fall prevention", "Memory screening", "Medication review"],
    heroImage: heroSenior,
    heroImageAlt: "Faithful Care physician providing specialized primary care for a senior patient in Naples, Florida",
    heroImageMobile: heroSeniorMobile,
    heroBlurPlaceholder: blur.senior,
  },
  "/primary-care/procedures-diagnostics": {
    title: <>In-Office Procedures<br className="hidden md:block" /> & Diagnostics</>,
    subtitleBold: "Advanced Care, Right Here.",
    subtitle: "Joint injections, skin biopsies, wound care, EKG testing, and rapid lab results. No hospital visit needed. Get answers and treatment in one place.",
    marqueeItems: ["Joint injections", "Wound care", "EKG testing", "Rapid lab results"],
    heroImage: heroProcedures,
    heroImageAlt: "Doctor performing an in-office procedure and diagnostic test at Faithful Care Medical Services in Naples, Florida",
    heroImageMobile: heroProceduresMobile,
    heroBlurPlaceholder: blur.procedures,
  },
  "/palliative-care/about-palliative-care": {
    title: <>What Is<br className="hidden md:block" /> Palliative Care?</>,
    subtitleBold: "Not Hospice. Not Giving Up.",
    subtitle: "Palliative care is an extra layer of support for people with serious illnesses. It focuses on relieving symptoms and stress, and it's available at any stage, alongside your regular treatment.",
    marqueeItems: ["Not hospice", "Any stage of illness", "Alongside treatment", "Quality of life"],
    heroImage: heroSeniorMan,
    heroImageAlt: "Dr. Addys Reve reassuring an older man while explaining palliative care at Faithful Care Medical Services in Naples, Florida",
    heroImageMobile: heroSeniorManMobile,
    heroBlurPlaceholder: blur.seniorMan,
    mobileGreeting: true,
  },
  "/palliative-care/symptom-relief": {
    title: <>Relief From Pain<br className="hidden md:block" /> & Difficult Symptoms</>,
    subtitleBold: "You Don't Have to Suffer.",
    subtitle: "Expert help with chronic pain, breathing difficulty, fatigue, nausea, anxiety, sleep problems, and appetite loss, so you can focus on living, not just surviving.",
    marqueeItems: ["Pain relief", "Breathing support", "Anxiety care", "Better sleep"],
    heroImage: heroWoman,
    heroImageAlt: "Palliative care doctor providing pain and symptom relief to a woman patient at Faithful Care Medical Services in Naples, Florida",
    heroImageMobile: heroWomanMobile,
    heroBlurPlaceholder: blur.patientWoman,
    mobileGreeting: true,
  },
  "/palliative-care/patient-family-support": {
    title: <>Support for Patients<br className="hidden md:block" /> & Families</>,
    subtitleBold: "You're Not Alone in This.",
    subtitle: "Guidance through serious illness for patients and their loved ones: caregiver support, honest conversations about what to expect, emotional care, and help navigating difficult decisions.",
    marqueeItems: ["Caregiver support", "Family guidance", "Emotional care", "Illness navigation"],
    heroImage: heroYoungWoman,
    heroImageAlt: "Faithful Care doctor offering palliative support to a young woman patient and her family in Naples, Florida",
    heroImageMobile: heroYoungWomanMobile,
    heroBlurPlaceholder: blur.youngWoman,
    mobileGreeting: true,
  },
  "/palliative-care/planning-transitions": {
    title: <>Advance Planning<br className="hidden md:block" /> & Care Transitions</>,
    subtitleBold: "Plan With Confidence.",
    subtitle: "Advance directives, living wills, goals of care discussions, and smooth hospice coordination when the time is right, so your wishes are always honored.",
    marqueeItems: ["Advance directives", "Living wills", "Goals of care", "Hospice coordination"],
    heroImage: heroYoungMan,
    heroImageAlt: "Doctor discussing advance care planning and care transitions with a young man at Faithful Care Medical Services in Naples, Florida",
    heroImageMobile: heroYoungManMobile,
    heroBlurPlaceholder: blur.youngMan,
    mobileGreeting: true,
  },
  "/locations/naples": {
    title: <>Primary Care &<br className="hidden md:block" /> Palliative Care in Naples</>,
    subtitleBold: "Your Neighborhood Medical Home.",
    subtitle: "Faithful Care Medical Services is your neighborhood medical home right here in Naples. Located on Tamiami Trail North, we provide complete primary care and compassionate palliative care for adults and seniors across Naples and surrounding communities.",
    marqueeItems: ["Naples, FL", "Tamiami Trail N.", "Same-day visits", "Medicare accepted"],
    heroImage: heroNaples,
    heroImageAlt: "Faithful Care Medical Services primary and palliative care clinic serving Naples, Florida",
    heroImageMobile: heroNaplesMobile,
    heroTextTheme: "light",
    heroBlurPlaceholder: blur.naples,
    mapConfig: { lat: 26.142, lng: -81.795, label: "Faithful Care, Naples", zoom: 13 },
  },
  "/locations/marco-island": {
    title: <>Primary Care Doctor<br className="hidden md:block" /> Near Marco Island, FL</>,
    subtitleBold: "Island Living, Mainland Medical Care.",
    subtitle: "Marco Island's year-round residents and seasonal visitors deserve a primary care doctor who understands the health needs of an active, older community. Faithful Care Medical Services in Naples is just 25 minutes north via Collier Blvd, offering geriatric care, chronic disease management, and palliative support.",
    marqueeItems: ["Marco Island, FL", "25 min via Collier Blvd", "Geriatric specialists", "Snowbirds welcome"],
    heroImage: heroMarcoIsland,
    heroImageAlt: "Faithful Care primary care doctor serving patients near Marco Island, Florida",
    heroImageMobile: heroMarcoIslandMobile,
    heroTextTheme: "light",
    heroBlurPlaceholder: blur.marcoIsland,
    mapConfig: { lat: 25.941, lng: -81.729, label: "Marco Island", zoom: 12 },
  },
  "/locations/golden-gate": {
    title: <>Healthcare for Golden Gate<br className="hidden md:block" /> & Golden Gate Estates</>,
    subtitleBold: "Your Family Doctor in Collier County.",
    subtitle: "Families in Golden Gate and Golden Gate Estates deserve a doctor who listens, explains clearly, and treats everyone with respect. Faithful Care Medical Services is just 15 minutes away via Golden Gate Parkway, offering affordable primary care, chronic disease management, and palliative care for all adults.",
    marqueeItems: ["Golden Gate, FL", "15 min drive", "Se habla español", "New patients welcome"],
    heroImage: heroGoldenGate,
    heroImageAlt: "Faithful Care Medical Services providing healthcare to Golden Gate and Golden Gate Estates, Florida",
    heroImageMobile: heroGoldenGateMobile,
    heroTextTheme: "light",
    heroBlurPlaceholder: blur.goldenGate,
    mapConfig: { lat: 26.187, lng: -81.700, label: "Golden Gate", zoom: 12 },
  },
  "/locations/immokalee": {
    title: <>Medical Care for<br className="hidden md:block" /> Immokalee Families</>,
    subtitleBold: "Dignified Healthcare for Every Patient.",
    subtitle: "Faithful Care Medical Services proudly serves the hardworking families of Immokalee and eastern Collier County. We provide comprehensive primary care and palliative care with a focus on accessibility, affordability, and genuine respect, because every patient deserves quality healthcare, no exceptions.",
    marqueeItems: ["Immokalee, FL", "Collier County", "Preventive screenings", "Medicare & Medicaid"],
    heroImage: heroImmokalee,
    heroImageAlt: "Faithful Care primary and palliative care for Immokalee, Florida families",
    heroImageMobile: heroImmokaleMobile,
    heroTextTheme: "light",
    heroBlurPlaceholder: blur.immokalee,
    mapConfig: { lat: 26.419, lng: -81.417, label: "Immokalee", zoom: 12 },
  },
  "/locations/bonita-springs": {
    title: <>Primary Care &<br className="hidden md:block" /> Palliative Care in Bonita Springs</>,
    subtitleBold: "Your Neighbor on Tamiami Trail.",
    subtitle: "From Bonita Bay to Pelican Landing, Spanish Wells, and Highland Woods. Faithful Care Medical Services is just 15 minutes south on US-41. Complete primary care and compassionate palliative care for Bonita Springs adults and seniors, with same-day appointments available.",
    marqueeItems: ["Bonita Springs, FL", "15 min on US-41", "Senior-focused care", "Same-day visits"],
    heroImage: heroBonitaSprings,
    heroImageAlt: "Faithful Care Medical Services primary and palliative care serving Bonita Springs, Florida",
    heroImageMobile: heroBonitaSpringsMobile,
    heroTextTheme: "light",
    heroBlurPlaceholder: blur.bonitaSprings,
    mapConfig: { lat: 26.340, lng: -81.795, label: "Bonita Springs", zoom: 12 },
  },
  "/locations/estero": {
    title: <>Doctor's Office Near<br className="hidden md:block" /> Estero, FL</>,
    subtitleBold: "Expert Primary Care for a Growing Community.",
    subtitle: "Whether you live in The Brooks, Grandezza, Miromar Lakes, or Coconut Point, Faithful Care Medical Services is just 20 minutes south on US-41. We provide complete primary care and palliative care designed for Estero's active adults, retirees, and growing families.",
    marqueeItems: ["Estero, FL", "20 min on US-41", "In-office procedures", "Medicare accepted"],
    heroImage: heroEstero,
    heroImageAlt: "Faithful Care primary care doctor's office serving patients near Estero, Florida",
    heroImageMobile: heroEsteroMobile,
    heroTextTheme: "light",
    heroBlurPlaceholder: blur.estero,
    mapConfig: { lat: 26.438, lng: -81.807, label: "Estero", zoom: 12 },
  },
  "/locations/fort-myers": {
    title: <>Primary Care Doctor<br className="hidden md:block" /> Near Fort Myers, FL</>,
    subtitleBold: "The City of Palms Deserves Better Care.",
    subtitle: "Fort Myers residents from the River District to Gateway and South Fort Myers: Faithful Care Medical Services in Naples is just 35 minutes south on I-75, offering comprehensive primary care and palliative care with the personal attention that larger Lee County practices can't match.",
    marqueeItems: ["Fort Myers, FL", "35 min via I-75", "Same-day sick visits", "Medicare accepted"],
    heroImage: heroFortMyers,
    heroImageAlt: "Faithful Care primary care doctor serving patients near Fort Myers, Florida",
    heroImageMobile: heroFortMyersMobile,
    heroTextTheme: "light",
    heroBlurPlaceholder: blur.fortMyers,
    mapConfig: { lat: 26.640, lng: -81.872, label: "Fort Myers", zoom: 12 },
  },
  "/locations/cape-coral": {
    title: <>Doctor Accepting Patients<br className="hidden md:block" /> from Cape Coral, FL</>,
    subtitleBold: "Personal Care Worth the Drive South.",
    subtitle: "Cape Coral is the largest city between Tampa and Miami, and one of the hardest places to find a doctor who isn't overbooked. Faithful Care Medical Services in Naples offers Cape Coral families a refreshing alternative: unhurried visits, same-day sick appointments, and a care team that knows your name.",
    marqueeItems: ["Cape Coral, FL", "45 min via I-75", "Accepting new patients", "All major insurance"],
    heroImage: heroCapeCoral,
    heroImageAlt: "Faithful Care Medical Services doctor accepting new patients from Cape Coral, Florida",
    heroImageMobile: heroCapCoralMobile,
    heroTextTheme: "light",
    heroBlurPlaceholder: blur.capeCoral,
    mapConfig: { lat: 26.563, lng: -81.949, label: "Cape Coral", zoom: 12 },
  },
  "/contact": {
    title: <>We're Here<br className="hidden md:block" /> When You Need Us</>,
    subtitleBold: "Reaching Us Is Easy.",
    subtitle: "Whether you're a new patient or an existing one, reaching us is easy. Call, email, or stop by. We'll take care of the rest.",
    marqueeItems: ["New patients welcome", "Naples, FL", "Same-day appointments", "Aetna, Cigna, Medicare & Medicaid"],
    heroImage: heroSeniorWoman,
    heroImageAlt: "Welcoming Faithful Care Medical Services provider with a senior woman patient, ready to help schedule a visit in Naples, Florida",
    heroImageMobile: heroSeniorWomanMobile,
    heroBlurPlaceholder: blur.seniorWoman,
    mobileGreeting: true,
  },
  "/primary-care": {
    title: <>Primary Care Doctor<br className="hidden md:block" /> in Naples, FL</>,
    subtitleBold: "Accepting new patients.",
    subtitle: "Faithful Care Medical Services is the medical home for adults and seniors in Naples. Unhurried visits with Dr. Addys Reve, MD, on-site lab testing, same-day appointments when you're sick, and most major insurances accepted, including Medicare.",
    marqueeItems: ["Naples, FL", "Same-day visits", "Accepting new patients", "Medicare accepted"],
    heroImage: heroImageDefault,
    heroImageAlt: "Faithful Care primary care doctor welcoming a patient in Naples, Florida",
    heroImageMobile: heroImageMobileDefault,
    heroBlurPlaceholder: blur.doctor,
  },
  "/palliative-care": {
    title: <>Palliative Care<br className="hidden md:block" /> in Naples, FL</>,
    subtitleBold: "It is not hospice.",
    subtitle: "Palliative care helps people living with a serious illness feel better: less pain, fewer symptoms, more good days. You can receive palliative care while continuing your treatments. We support the patient and the family.",
    marqueeItems: ["Not hospice", "Symptom relief", "Family support", "Naples, FL"],
    heroImage: heroSeniorMan,
    heroImageAlt: "Faithful Care doctor supporting a senior patient during a palliative care visit in Naples, Florida",
    heroImageMobile: heroSeniorManMobile,
    heroBlurPlaceholder: blur.seniorMan,
  },
  "/about": {
    title: <>{"Meet Dr. Addys Reve,\u00A0MD"}</>,
    subtitleBold: "Care in English and in Spanish.",
    subtitle: "At Faithful Care Medical Services you are not a number. Dr. Addys Reve gives every patient the time it takes to listen, explain, and decide together. She cares for adults and older adults from Naples and the surrounding areas, in English and in Spanish.",
    marqueeItems: ["Naples, FL", "English & Spanish", "Adults & seniors", "Accepting new patients"],
    heroImage: heroImageDefault,
    heroImageAlt: "Dr. Addys Reve, MD of Faithful Care Medical Services welcoming a patient in Naples, Florida",
    heroImageMobile: heroImageMobileDefault,
    heroBlurPlaceholder: blur.doctor,
  },
  "/reviews": {
    title: <>Patient Reviews</>,
    subtitleBold: `Rated ${GOOGLE_RATING.value} stars on Google.`,
    subtitle: "The best way to know what Faithful Care is like is to hear from the people who are already our patients.",
    marqueeItems: [`${GOOGLE_RATING.value} stars on Google`, "Naples, FL", "Real patient reviews", "Accepting new patients"],
    heroImage: heroYoungWoman,
    heroImageAlt: "Faithful Care doctor talking with a smiling patient in Naples, Florida",
    heroImageMobile: heroYoungWomanMobile,
    heroBlurPlaceholder: blur.youngWoman,
  },
  "/new-patients": {
    title: <>Accepting New Patients<br className="hidden md:block" /> in Naples, FL</>,
    subtitleBold: "We can often see you the same week.",
    subtitle: "Faithful Care Medical Services is welcoming new adult and senior patients in Naples. If you're looking for a primary care doctor who actually listens, and who can see you soon, you're in the right place.",
    marqueeItems: ["Accepting new patients", "Naples, FL", "Same-week appointments", "English & Spanish"],
    heroImage: heroYoungMan,
    heroImageAlt: "Faithful Care doctor welcoming a new patient to the clinic in Naples, Florida",
    heroImageMobile: heroYoungManMobile,
    heroBlurPlaceholder: blur.youngMan,
    primaryCtaText: "Call to Book",
    secondaryCtaText: "Get Directions",
  },
  "/medicare": {
    title: <>Medicare & Medicare Advantage<br className="hidden md:block" /> Primary Care in Naples</>,
    subtitleBold: "Accepting new Medicare patients.",
    subtitle: "Faithful Care accepts Medicare and works with adults and seniors across Naples. Dr. Addys Reve, MD provides unhurried primary care, geriatric-focused attention and on-site testing, with the time that older patients deserve.",
    marqueeItems: ["Medicare accepted", "Annual Wellness Visits", "Naples, FL", "Accepting new patients"],
    heroImage: heroSeniorWoman,
    heroImageAlt: "Faithful Care doctor caring for a senior Medicare patient in Naples, Florida",
    heroImageMobile: heroSeniorWomanMobile,
    heroBlurPlaceholder: blur.seniorWoman,
    primaryCtaText: "Call Now",
    secondaryCtaText: "Get Directions",
  },
  "/es": {
    title: <>Atención Primaria y Cuidados<br className="hidden md:block" /> Paliativos en Naples, Florida</>,
    subtitleBold: "Atendemos en español y en inglés.",
    subtitle: "Faithful Care Medical Services es su consultorio médico en Naples para adultos y adultos mayores: consultas sin prisa, laboratorio en la clínica y citas el mismo día cuando lo necesita.",
    marqueeItems: ["Atendemos en español", "Naples, Florida", "Citas el mismo día", "Aceptamos Medicare"],
    heroImage: heroImageDefault,
    heroImageAlt: "Doctora de Faithful Care Medical Services atendiendo a un paciente en español en Naples, Florida",
    heroImageMobile: heroImageMobileDefault,
    heroBlurPlaceholder: blur.doctor,
    primaryCtaText: "Llamar ahora",
    secondaryCtaText: "Cómo llegar",
  },
  "/es/medico-de-familia-naples": {
    title: <>Médico de Familia en Naples<br className="hidden md:block" /> que Habla Español</>,
    subtitleBold: "La Dra. Addys Reve y su equipo lo atienden en español.",
    subtitle: "En Faithful Care Medical Services atendemos a adultos y adultos mayores en Naples con el tiempo y la cercanía que usted merece, sin prisas y explicándole todo con claridad. Aceptamos pacientes nuevos y la mayoría de los seguros.",
    marqueeItems: ["Se habla español", "Citas el mismo día", "Aceptamos pacientes nuevos", "Medicare y seguros"],
    heroImage: heroImageDefault,
    heroImageAlt: "Médico de familia que habla español atendiendo a un paciente en Faithful Care Medical Services, Naples, Florida",
    heroImageMobile: heroImageMobileDefault,
    heroBlurPlaceholder: blur.doctor,
    primaryCtaText: "Llamar ahora",
    secondaryCtaText: "Cómo llegar",
  },
  "/es/cuidados-paliativos-naples": {
    title: <>Cuidados Paliativos<br className="hidden md:block" /> en Naples</>,
    subtitleBold: "No es lo mismo que hospicio.",
    subtitle: "Cuando una enfermedad seria complica el día a día, los cuidados paliativos ayudan a vivir con menos síntomas y más tranquilidad. Se pueden recibir mientras usted continúa con sus tratamientos.",
    marqueeItems: ["Alivio de síntomas", "Apoyo a la familia", "No es hospicio", "Atención en español"],
    heroImage: heroSeniorMan,
    heroImageAlt: "Doctora de Faithful Care acompañando a un adulto mayor en una consulta de cuidados paliativos en Naples, Florida",
    heroImageMobile: heroSeniorManMobile,
    heroBlurPlaceholder: blur.seniorMan,
    primaryCtaText: "Llamar ahora",
    secondaryCtaText: "Cómo llegar",
  },
  "/es/seguros-y-medicare": {
    title: <>Seguros que Aceptamos<br className="hidden md:block" /> y Medicare</>,
    subtitleBold: "Verificamos su cobertura antes de la cita.",
    subtitle: "Aceptamos la mayoría de los seguros principales y Medicare. Si no encuentra el suyo, llámenos y lo verificamos por usted antes de su cita.",
    marqueeItems: ["Humana", "Aetna", "Cigna", "Medicare", "Medicaid"],
    heroImage: heroImageDefault,
    heroImageAlt: "Equipo de Faithful Care Medical Services que acepta Medicare y los seguros principales en Naples, Florida",
    heroImageMobile: heroImageMobileDefault,
    heroBlurPlaceholder: blur.doctor,
    primaryCtaText: "Llamar ahora",
    secondaryCtaText: "Cómo llegar",
  },
  "/es/contacto": {
    title: <>Contacto y<br className="hidden md:block" /> Cómo Llegar</>,
    subtitleBold: "Llámenos y le damos cita.",
    subtitle: "Atendemos en español. Estamos en North Naples, en Tamiami Trail N., con estacionamiento en la puerta.",
    marqueeItems: ["North Naples", "Tamiami Trail N.", "(239) 423-0205", "Atendemos en español"],
    heroImage: heroSeniorWoman,
    heroImageAlt: "Recepción de Faithful Care Medical Services lista para recibir pacientes en Naples, Florida",
    heroImageMobile: heroSeniorWomanMobile,
    heroBlurPlaceholder: blur.seniorWoman,
    primaryCtaText: "Llamar ahora",
    secondaryCtaText: "Cómo llegar",
  },
};
