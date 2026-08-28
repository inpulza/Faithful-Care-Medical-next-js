import type { DetailCard, FaqItem, VisitStep } from "@/components/sections";
import {
  Stethoscope,
  ShieldCheck,
  MagnifyingGlass,
  Syringe,
  ChartBar,
  Heartbeat,
  Drop,
  Heart,
  Wind,
  Atom,
  FirstAidKit,
  Thermometer,
  Lightning,
  Bandaids,
  Pill,
  Warning,
  FileText,
  ChatCircleDots,
  FlowerLotus,
  TestTube,
  ClipboardText,
  Brain,
  UsersThree,
  PersonSimpleWalk,
  Knife,
  Flask,
  CalendarCheck,
  Clipboard,
  Notebook,
  Phone,
  CheckCircle,
  ListChecks,
  Handshake,
  UserCircle,
  Scales,
  Ear,
  Bed,
  House,
  HandHeart,
  Timer,
  TreeStructure,
  Scroll,
  Path,
  SealCheck,
  Pulse,
  Mountains,
  Moon,
  BowlFood,
  Chats,
  Lifebuoy,
  BookOpen,
  HouseSimple,
  Megaphone,
} from "@phosphor-icons/react";

interface AlternatingBlockData {
  subtitle: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  ctaText: string;
  ctaHref: string;
  reversed: boolean;
  variant: "primary" | "secondary";
}

interface ServiceSectionData {
  detailGrid: {
    eyebrow: string;
    eyebrowColor: "primary" | "secondary";
    title: string;
    description: string;
    statNumber: string;
    statLabel: string;
    cards: DetailCard[];
  };
  alternatingBlock: AlternatingBlockData;
  visitSteps: {
    title: string;
    subtitle?: string;
    steps: VisitStep[];
    ctaText: string;
    ctaHref: string;
  };
  faq: {
    eyebrow: string;
    title: string;
    description?: string;
    items: FaqItem[];
  };
  dpc: {
    contextHeading: string;
    contextDescription: string;
  };
  tealCta: {
    subtitle: string;
    title: string;
    description: string;
    primaryCtaText: string;
    primaryCtaHref: string;
    secondaryCtaText: string;
    secondaryCtaHref: string;
  };
}

export const serviceSectionsMap: Record<string, ServiceSectionData> = {
  "/primary-care/checkups-prevention": {
    detailGrid: {
      eyebrow: "What we cover",
      eyebrowColor: "secondary",
      title: "Six essential screenings to catch problems before they start.",
      description: "Prevention is the most powerful tool in medicine. We combine routine exams with targeted screenings to keep you healthy year after year.",
      statNumber: "6",
      statLabel: "preventive services\nunder one roof",
      cards: [
        {
          icon: Stethoscope,
          title: "Annual Physicals",
          description: "A thorough head-to-toe evaluation every year. We review your vitals, check organ function, and update your care plan based on what we find.",
        },
        {
          icon: ShieldCheck,
          title: "Medicare Wellness Visits",
          description: "A personalized prevention plan covered by Medicare. We assess your health risks, update screenings, and coordinate your preventive care schedule.",
        },
        {
          icon: MagnifyingGlass,
          title: "Cancer Screenings",
          description: "Age-appropriate screenings for breast, colon, prostate, cervical, and skin cancers. Early detection gives you the best chance at successful treatment.",
        },
        {
          icon: Syringe,
          title: "Immunizations",
          description: "Flu shots, pneumonia vaccines, shingles prevention, and COVID boosters. We keep your immunization record current and recommend what you need.",
        },
        {
          icon: ChartBar,
          title: "Risk Assessments",
          description: "We evaluate your family history, lifestyle, and lab results to identify risks for diabetes, heart disease, and stroke before symptoms appear.",
        },
        {
          icon: Heartbeat,
          title: "Heart Health Checks",
          description: "Blood pressure monitoring, cholesterol panels, EKG testing, and cardiovascular risk scoring. Protecting your heart starts with knowing where you stand.",
        },
      ],
    },
    alternatingBlock: {
      subtitle: "Why prevention matters",
      title: "Catching problems early saves lives and money.",
      description: "Most serious health conditions, including heart disease, diabetes, and many cancers, are far more treatable when caught early. Our preventive care program is designed to identify risks before they become emergencies. Patients who stay on schedule with their annual checkups and screenings have better outcomes, fewer hospitalizations, and lower healthcare costs over time. At Faithful Care, we make prevention easy, thorough, and personal.",
      imageSrc: "/images/services/checkups-prevention.webp",
      imageAlt: "Doctor conducting a thorough annual physical examination at Faithful Care Medical Services in Naples, Florida",
      ctaText: "Schedule your checkup",
      ctaHref: "/contact",
      reversed: false,
      variant: "primary",
    },
    visitSteps: {
      title: "What to expect at your annual physical in Naples.",
      subtitle: "Your first visit takes about 45 to 60 minutes. Here is what happens at each stage.",
      steps: [
        {
          icon: CalendarCheck,
          title: "Schedule and prepare",
          description: "Book your appointment online or by phone. We'll send you intake forms to complete before your visit so we can make the most of your time.",
          duration: "5 min",
        },
        {
          icon: Clipboard,
          title: "Health history review",
          description: "Dr. Reve reviews your medical history, current medications, family background, and any concerns you want to address.",
          duration: "10-15 min",
        },
        {
          icon: Stethoscope,
          title: "Physical examination",
          description: "A thorough head-to-toe exam including vitals, heart and lung check, abdominal assessment, and any age-appropriate screenings.",
          duration: "15-20 min",
        },
        {
          icon: TestTube,
          title: "Lab work and screenings",
          description: "Blood draws for cholesterol, glucose, thyroid, and other panels. Most results are available the same day or next business day.",
          duration: "5-10 min",
        },
        {
          icon: CheckCircle,
          title: "Review and care plan",
          description: "Dr. Reve sits down with you to discuss findings, answer questions, and create a written prevention plan with your follow-up schedule.",
          duration: "10-15 min",
        },
      ],
      ctaText: "Book your first visit",
      ctaHref: "/contact",
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "Questions patients ask about checkups and preventive care.",
      items: [
        {
          question: "How often should I get an annual physical?",
          answer: "Adults should have a comprehensive physical exam once every year. If you have chronic conditions or risk factors, Dr. Reve may recommend more frequent check-ins between annual visits.",
        },
        {
          question: "What does a Medicare Annual Wellness Visit include?",
          answer: "Medicare covers one free Annual Wellness Visit per year. It includes a health risk assessment, personalized prevention plan, depression screening, and a review of your current medications and vaccinations.",
        },
        {
          question: "At what age should I start getting cancer screenings?",
          answer: "Screening schedules vary by cancer type. Colon cancer screening typically starts at age 45. Breast cancer mammograms start at 40 or 50 depending on risk. We create a personalized screening timeline based on your age, gender, and family history.",
        },
        {
          question: "Do you accept Medicare for preventive care in Naples?",
          answer: "Yes. Faithful Care accepts Original Medicare, Florida Medicaid (through Sunshine Health), Humana, Aetna, and Cigna. Most preventive services, including annual physicals and cancer screenings, are covered at no cost through Medicare.",
        },
        {
          question: "What vaccinations do adults need in Florida?",
          answer: "Florida adults should stay current on flu shots, pneumonia vaccines (over 65), shingles vaccine (over 50), tetanus boosters, and COVID vaccines. We review your immunization history and recommend exactly what you need.",
        },
        {
          question: "Can I get lab work done at your Naples office?",
          answer: "Yes. We perform in-office blood draws for most routine lab panels including cholesterol, glucose, thyroid, and complete metabolic panels. Many results are available the same day or next business day.",
        },
      ],
    },
    dpc: {
      contextHeading: "Ask how preventive care fits the DPC membership.",
      contextDescription: "Faithful Care's written DPC agreement explains which annual visits, preventive services, follow-ups, and communication options are included in the monthly fee. Laboratory, vaccine, imaging, specialist, and other outside charges may vary, so review the current terms before enrolling.",
    },
    tealCta: {
      subtitle: "When was your last checkup?",
      title: "Book your annual physical at Faithful Care today.",
      description: "Whether you're overdue for a screening or just want peace of mind, we're here to help. One visit can make all the difference.",
      primaryCtaText: "Schedule a Visit",
      primaryCtaHref: "/contact",
      secondaryCtaText: "Call Now (239) 423-0205",
      secondaryCtaHref: "tel:2394230205",
    },
  },

  "/primary-care/chronic-disease": {
    detailGrid: {
      eyebrow: "Conditions we manage",
      eyebrowColor: "secondary",
      title: "Ongoing care for the conditions that need it most.",
      description: "Living with a chronic condition means you need a doctor who knows your history, adjusts your treatment, and keeps everything coordinated.",
      statNumber: "6",
      statLabel: "chronic conditions\nmanaged in-house",
      cards: [
        {
          icon: Drop,
          title: "Diabetes",
          description: "Blood sugar monitoring, A1C management, medication adjustments, and lifestyle coaching. We help you stay in control and avoid complications.",
        },
        {
          icon: Heartbeat,
          title: "High Blood Pressure",
          description: "Regular monitoring, medication optimization, and dietary guidance. We work with you to bring your numbers down and keep them there.",
        },
        {
          icon: Heart,
          title: "Heart Disease",
          description: "Comprehensive cardiac risk management, cholesterol control, and post-event follow-up. We coordinate with cardiologists when needed.",
        },
        {
          icon: Wind,
          title: "COPD",
          description: "Breathing assessments, inhaler management, pulmonary rehab referrals, and flare-up prevention. We help you breathe easier every day.",
        },
        {
          icon: Flask,
          title: "Kidney Disease",
          description: "Lab monitoring, medication review, dietary planning, and nephrology coordination. Protecting your kidneys starts with consistent follow-up.",
        },
        {
          icon: Atom,
          title: "Thyroid Conditions",
          description: "TSH monitoring, medication dosing, symptom tracking, and specialist referrals when needed. We keep your thyroid levels balanced.",
        },
      ],
    },
    alternatingBlock: {
      subtitle: "Our approach",
      title: "One doctor who manages all your conditions.",
      description: "Chronic diseases don't exist in isolation. Diabetes affects your heart, blood pressure impacts your kidneys, and medications for one condition can complicate another. At Faithful Care, you see the same doctor every visit. Dr. Reve knows your full medical picture, coordinates all your medications, and adjusts your treatment plan as your needs change. No more bouncing between specialists who don't talk to each other.",
      imageSrc: "/images/services/chronic-disease.webp",
      imageAlt: "Doctor reviewing chronic disease management plan with a patient at Faithful Care Medical Services",
      ctaText: "Start managing your conditions",
      ctaHref: "/contact",
      reversed: true,
      variant: "primary",
    },
    visitSteps: {
      title: "How we build your chronic disease management plan.",
      subtitle: "Your initial visit is a thorough evaluation. Follow-ups keep your conditions on track.",
      steps: [
        {
          icon: Notebook,
          title: "Bring your records",
          description: "Gather your medication list, recent lab results, and records from other providers. This gives Dr. Reve the full picture from day one.",
          duration: "Before visit",
        },
        {
          icon: Clipboard,
          title: "Full medical review",
          description: "We review your complete history, all active conditions, and every medication you take. Nothing gets overlooked.",
          duration: "15-20 min",
        },
        {
          icon: ListChecks,
          title: "Set your health goals",
          description: "Together, we define clear targets for your A1C, blood pressure, weight, or other key markers. Your goals guide every decision.",
          duration: "5-10 min",
        },
        {
          icon: Heartbeat,
          title: "Build your care plan",
          description: "Dr. Reve creates a written management plan covering medications, lifestyle changes, lab schedules, and specialist referrals.",
          duration: "10-15 min",
        },
        {
          icon: CalendarCheck,
          title: "Schedule follow-ups",
          description: "We set your next visits before you leave. Most chronic conditions need follow-up every 3 to 6 months to stay on track.",
          duration: "5 min",
        },
      ],
      ctaText: "Start your care plan",
      ctaHref: "/contact",
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "Questions patients ask about chronic disease management.",
      items: [
        {
          question: "Can one doctor manage multiple chronic conditions?",
          answer: "Yes. Primary care doctors are trained to manage multiple conditions simultaneously. Dr. Reve coordinates your diabetes, blood pressure, heart disease, and other conditions together, ensuring medications don't conflict and treatments are aligned.",
        },
        {
          question: "How often will I need to come in for chronic disease follow-ups?",
          answer: "Most chronic conditions require follow-up visits every 3 to 6 months, depending on how well controlled your condition is. Newly diagnosed patients or those adjusting medications may need monthly visits initially.",
        },
        {
          question: "Do you manage diabetes at your Naples office?",
          answer: "Yes. We provide comprehensive diabetes management including A1C monitoring, blood sugar tracking, medication management, insulin adjustments, and nutritional counseling. All coordinated right here in our Naples office.",
        },
        {
          question: "What is the difference between a primary care doctor and a specialist for chronic disease?",
          answer: "A primary care doctor manages your overall health and coordinates all your conditions. Specialists focus on one organ system. For most chronic conditions, your primary care doctor is your main point of contact, referring to specialists only when needed.",
        },
        {
          question: "Can you help me reduce the number of medications I take?",
          answer: "Absolutely. Medication review is a core part of chronic disease management. Dr. Reve regularly evaluates every prescription you take, removes unnecessary medications, and simplifies your regimen whenever safely possible.",
        },
        {
          question: "Do you accept insurance for chronic disease management in Naples?",
          answer: "Yes. We accept Original Medicare, Florida Medicaid (through Sunshine Health), Humana, Aetna, and Cigna. Chronic disease management visits, lab work, and follow-ups are covered under most plans with standard copays.",
        },
      ],
    },
    dpc: {
      contextHeading: "Manage chronic conditions with membership-based continuity.",
      contextDescription: "Chronic disease management works best with consistent follow-ups and a clear way to contact the practice. Faithful Care's DPC membership is designed to support ongoing primary care under a written membership agreement. Ask the office for current visit, communication, pricing, and service details before enrolling.",
    },
    tealCta: {
      subtitle: "Take control of your health",
      title: "Let's build a care plan that works for you.",
      description: "Living with a chronic condition is easier with a doctor who knows you. Schedule a visit and let's get your health on the right track.",
      primaryCtaText: "Schedule a Visit",
      primaryCtaHref: "/contact",
      secondaryCtaText: "Call Now (239) 423-0205",
      secondaryCtaHref: "tel:2394230205",
    },
  },

  "/primary-care/same-day-visits": {
    detailGrid: {
      eyebrow: "What we treat today",
      eyebrowColor: "secondary",
      title: "Common urgent concerns we handle without the ER.",
      description: "When you're sick or hurt, you shouldn't have to wait days to see a doctor. We reserve same-day slots every morning for urgent needs.",
      statNumber: "6",
      statLabel: "urgent conditions\nseen same day",
      cards: [
        {
          icon: Thermometer,
          title: "Infections & Flu",
          description: "Respiratory infections, urinary tract infections, sinus problems, and seasonal flu. We diagnose, treat, and get you feeling better fast.",
        },
        {
          icon: Warning,
          title: "Dizziness",
          description: "Sudden dizziness, vertigo, and balance problems. We evaluate the cause, rule out serious conditions, and start treatment the same day.",
        },
        {
          icon: Lightning,
          title: "Headaches",
          description: "New or severe headaches, migraines, and tension headaches. We assess, treat, and determine if further testing is needed.",
        },
        {
          icon: Bandaids,
          title: "Minor Injuries",
          description: "Cuts, sprains, minor burns, and bruises. We clean, treat, and bandage injuries right in our office without the ER wait.",
        },
        {
          icon: Pill,
          title: "Medication Side Effects",
          description: "Unexpected reactions to new prescriptions or dosage changes. We evaluate symptoms and adjust your medications safely.",
        },
        {
          icon: FirstAidKit,
          title: "Allergic Reactions",
          description: "Rashes, hives, swelling, and mild allergic responses. We identify triggers, provide immediate relief, and create a prevention plan.",
        },
      ],
    },
    alternatingBlock: {
      subtitle: "Skip the ER",
      title: "No emergency room needed. We see you today.",
      description: "Emergency rooms are for life-threatening situations. For everything else, there's Faithful Care. We keep same-day appointment slots open every morning so you can call when you're sick and be seen by afternoon. You'll see your own doctor in a calm, private setting instead of waiting hours in a crowded ER. And because we know your medical history, we can treat you faster and more effectively.",
      imageSrc: "/images/services/same-day-visits.webp",
      imageAlt: "Patient being seen for a same-day urgent visit at Faithful Care Medical Services in Naples",
      ctaText: "Call for a same-day visit",
      ctaHref: "/contact",
      reversed: false,
      variant: "primary",
    },
    visitSteps: {
      title: "Call in the morning, see your doctor by afternoon.",
      subtitle: "Same-day visits are simple and fast. Here is how the process works.",
      steps: [
        {
          icon: Phone,
          title: "Call our office",
          description: "Call before noon and let us know your symptoms. Our team will find a same-day slot that works for your schedule.",
          duration: "2-3 min",
        },
        {
          icon: House,
          title: "Arrive and check in",
          description: "When you arrive, we'll take your vitals and get you into an exam room quickly. No long waits in a crowded lobby.",
          duration: "5-10 min",
        },
        {
          icon: Stethoscope,
          title: "See your doctor",
          description: "Dr. Reve evaluates your symptoms, performs a focused exam, and runs any necessary tests right in the office.",
          duration: "15-20 min",
        },
        {
          icon: FirstAidKit,
          title: "Get treatment",
          description: "Prescriptions, in-office treatments, or specialist referrals. You leave with a clear plan and everything you need to feel better.",
          duration: "5-10 min",
        },
        {
          icon: CheckCircle,
          title: "Follow up",
          description: "We check in by phone if needed and schedule a follow-up visit to make sure you're recovering well.",
          duration: "Next day",
        },
      ],
      ctaText: "Call for today's appointment",
      ctaHref: "/contact",
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "Questions patients ask about same-day and urgent visits.",
      items: [
        {
          question: "Do I need to be an existing patient to get a same-day visit?",
          answer: "New patients are welcome for same-day visits, though we recommend calling early in the morning for the best availability. Existing patients with established records can often be seen faster because we already have your medical history.",
        },
        {
          question: "What is the difference between a same-day visit and the emergency room?",
          answer: "Same-day visits at a primary care office handle non-life-threatening concerns like infections, headaches, dizziness, and minor injuries. The ER is for emergencies like chest pain, difficulty breathing, severe bleeding, or stroke symptoms.",
        },
        {
          question: "How much does a same-day visit cost compared to the ER?",
          answer: "A same-day primary care visit typically costs a fraction of an ER visit. With insurance, you pay your standard office copay. ER visits often carry copays of $150 to $500 or more, plus facility fees.",
        },
        {
          question: "Can you treat infections and flu at your Naples office?",
          answer: "Yes. We treat respiratory infections, urinary tract infections, sinus infections, strep throat, influenza, and other common infections. We can prescribe antibiotics, antivirals, and supportive medications on the spot.",
        },
        {
          question: "What should I do if I feel sick after office hours?",
          answer: "If your concern is not life-threatening, call our office and leave a message. For Direct Primary Care members, you can reach Dr. Reve directly by phone or text. For true emergencies, always call 911 or go to the nearest ER.",
        },
        {
          question: "Do you do rapid COVID and flu tests in the office?",
          answer: "Yes. We offer rapid testing for COVID-19 and influenza with results in about 15 minutes. If the rapid test is inconclusive, we can send samples to the lab for confirmation testing.",
        },
      ],
    },
    dpc: {
      contextHeading: "Priority scheduling for DPC members.",
      contextDescription: "DPC members can request priority scheduling for time-sensitive primary care concerns, including same-day or next-day options when appointments are available. The membership is not emergency care or health insurance; call 911 or go to the nearest emergency department for a medical emergency. Ask the office for the current membership agreement and included services.",
    },
    tealCta: {
      subtitle: "Feeling sick today?",
      title: "Call us now for a same-day appointment.",
      description: "Don't wait days to see a doctor. We reserve slots every morning for patients who need care today. One call is all it takes.",
      primaryCtaText: "Schedule a Visit",
      primaryCtaHref: "/contact",
      secondaryCtaText: "Call Now (239) 423-0205",
      secondaryCtaHref: "tel:2394230205",
    },
  },

  "/primary-care/womens-health": {
    detailGrid: {
      eyebrow: "Services for women",
      eyebrowColor: "secondary",
      title: "Comprehensive care designed around your needs.",
      description: "From routine screenings to hormonal health, we provide women's healthcare with the privacy, compassion, and thoroughness you deserve.",
      statNumber: "6",
      statLabel: "women's health services\navailable in-office",
      cards: [
        {
          icon: FileText,
          title: "Pap Smears",
          description: "Routine cervical cancer screenings performed with care and sensitivity. We follow current guidelines to keep you on schedule and protected.",
        },
        {
          icon: ShieldCheck,
          title: "Breast Exams",
          description: "Clinical breast examinations and mammogram referrals. We coordinate with imaging centers and follow up on every result personally.",
        },
        {
          icon: ChatCircleDots,
          title: "Contraceptive Counseling",
          description: "Honest, judgment-free conversations about your options. We help you choose the method that fits your lifestyle, health, and plans.",
        },
        {
          icon: FlowerLotus,
          title: "Menopause Care",
          description: "Hot flashes, sleep disruption, mood changes, and bone health. We manage menopause symptoms with proven treatments tailored to you.",
        },
        {
          icon: TestTube,
          title: "STI Evaluation",
          description: "Confidential testing, treatment, and follow-up for sexually transmitted infections. We create a safe, private space for your care.",
        },
        {
          icon: Atom,
          title: "Hormone Health",
          description: "Thyroid screening, hormonal imbalance evaluation, and treatment. We investigate symptoms like fatigue, weight changes, and irregular cycles.",
        },
      ],
    },
    alternatingBlock: {
      subtitle: "Your health, your terms",
      title: "Private, compassionate care in a comfortable setting.",
      description: "Women's healthcare is personal. At Faithful Care, we take the time to listen to your concerns, explain your options clearly, and make every exam as comfortable as possible. Dr. Reve provides thorough evaluations in a private, unhurried environment where you're treated as a person, not a number. Whether you're due for a routine screening or managing a new symptom, you'll always feel heard and respected.",
      imageSrc: "/images/services/womens-health.webp",
      imageAlt: "Doctor providing compassionate women's health care at Faithful Care Medical Services in Naples",
      ctaText: "Book your appointment",
      ctaHref: "/contact",
      reversed: true,
      variant: "primary",
    },
    visitSteps: {
      title: "What to expect at your women's health visit.",
      subtitle: "Every visit is private, thorough, and designed around your comfort.",
      steps: [
        {
          icon: CalendarCheck,
          title: "Schedule your visit",
          description: "Book online or by phone. Let us know which services you need so we can prepare and allow enough time for your appointment.",
          duration: "5 min",
        },
        {
          icon: Ear,
          title: "Private consultation",
          description: "Dr. Reve begins by listening to your concerns, symptoms, and health goals in a private, comfortable setting.",
          duration: "10-15 min",
        },
        {
          icon: ShieldCheck,
          title: "Examination and screenings",
          description: "Depending on your needs, your visit may include a Pap smear, breast exam, hormonal evaluation, or other screenings.",
          duration: "10-15 min",
        },
        {
          icon: ChatCircleDots,
          title: "Results and discussion",
          description: "We explain every result in plain language, answer all your questions, and discuss treatment options together.",
          duration: "10 min",
        },
        {
          icon: CheckCircle,
          title: "Your personalized plan",
          description: "You leave with a clear care plan, any prescriptions you need, and a follow-up schedule tailored to your health.",
          duration: "5 min",
        },
      ],
      ctaText: "Schedule your visit",
      ctaHref: "/contact",
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "Questions women ask about health services in Naples.",
      items: [
        {
          question: "How often do I need a Pap smear?",
          answer: "Current guidelines recommend Pap smears every 3 years for women aged 21 to 65. Women 30 and older may choose co-testing with HPV every 5 years. Dr. Reve will recommend the right schedule based on your age and risk factors.",
        },
        {
          question: "Do you provide menopause treatment in Naples?",
          answer: "Yes. We offer comprehensive menopause management including hormone evaluation, symptom relief for hot flashes, sleep disruption, and mood changes. Treatment options include hormone therapy, lifestyle modifications, and non-hormonal medications.",
        },
        {
          question: "Can I get birth control at a primary care office?",
          answer: "Yes. Primary care doctors can prescribe all forms of hormonal contraception including pills, patches, rings, and injections. We discuss your options, health history, and preferences to help you choose the best method for you.",
        },
        {
          question: "Do you perform breast exams and mammogram referrals?",
          answer: "Yes. Dr. Reve performs clinical breast examinations during your visit and provides mammogram referrals to local imaging centers in Naples. We coordinate directly with the imaging facility and follow up on every result.",
        },
        {
          question: "Is STI testing confidential at your office?",
          answer: "Absolutely. All STI testing, results, and treatment at Faithful Care are completely confidential. We provide a private, judgment-free environment for testing, counseling, and follow-up care.",
        },
        {
          question: "Do you accept insurance for women's health services?",
          answer: "Yes. Most preventive women's health services, including Pap smears, breast exams, and contraceptive counseling, are covered at no cost under the Affordable Care Act. We accept Original Medicare, Florida Medicaid (Sunshine Health), Humana, Aetna, and Cigna.",
        },
      ],
    },
    dpc: {
      contextHeading: "Membership-based continuity for women's health.",
      contextDescription: "Women's health can require ongoing attention, including preventive visits, follow-ups, and care coordination. Faithful Care's DPC membership is designed to make routine primary care easier to plan. Included services, communication options, scheduling, and any outside laboratory or specialist charges are governed by the current written membership agreement.",
    },
    tealCta: {
      subtitle: "Your health deserves attention",
      title: "Schedule your women's health visit today.",
      description: "Routine screenings and preventive care are the foundation of long-term health. Let's make sure you're up to date.",
      primaryCtaText: "Schedule a Visit",
      primaryCtaHref: "/contact",
      secondaryCtaText: "Call Now (239) 423-0205",
      secondaryCtaHref: "tel:2394230205",
    },
  },

  "/primary-care/senior-care": {
    detailGrid: {
      eyebrow: "Senior-focused services",
      eyebrowColor: "secondary",
      title: "Specialized care to help you stay independent longer.",
      description: "Aging brings unique health challenges. We address each one with patience, expertise, and a plan that respects your independence.",
      statNumber: "6",
      statLabel: "senior care services\ncoordinated for you",
      cards: [
        {
          icon: ClipboardText,
          title: "Geriatric Assessments",
          description: "Comprehensive evaluations of your physical, cognitive, and functional health. We identify issues early and create a personalized care strategy.",
        },
        {
          icon: ShieldCheck,
          title: "Fall Prevention",
          description: "Balance testing, home safety recommendations, and medication review to reduce your fall risk. Falls are preventable with the right plan.",
        },
        {
          icon: Brain,
          title: "Memory Screening",
          description: "Early detection of cognitive changes using validated screening tools. If we find concerns, we connect you with the right specialists quickly.",
        },
        {
          icon: Pill,
          title: "Medication Review",
          description: "We review every medication you take, check for interactions, eliminate unnecessary prescriptions, and simplify your daily routine.",
        },
        {
          icon: UsersThree,
          title: "Caregiver Coordination",
          description: "We work with your family members and caregivers to keep everyone informed, aligned, and confident about your care plan.",
        },
        {
          icon: PersonSimpleWalk,
          title: "Mobility Support",
          description: "Physical therapy referrals, assistive device recommendations, and exercise guidance to help you maintain strength and independence.",
        },
      ],
    },
    alternatingBlock: {
      subtitle: "Built for seniors",
      title: "A practice designed around the needs of older adults.",
      description: "At Faithful Care, seniors are not an afterthought. Our office is designed for accessibility, our appointments are longer, and our approach is built around the unique needs of older adults. Dr. Reve spends 30 to 60 minutes with every patient, ensures medications aren't causing more harm than good, and coordinates with specialists and family members. The goal is always the same: help you live independently, safely, and with dignity for as long as possible.",
      imageSrc: "/images/services/senior-care.webp",
      imageAlt: "Doctor providing specialized geriatric care for a senior patient at Faithful Care in Naples",
      ctaText: "Schedule a senior care visit",
      ctaHref: "/contact",
      reversed: false,
      variant: "primary",
    },
    visitSteps: {
      title: "What to expect at a geriatric assessment.",
      subtitle: "A comprehensive evaluation that goes far beyond a standard physical.",
      steps: [
        {
          icon: Notebook,
          title: "Gather your information",
          description: "Bring your medication list, insurance cards, and any records from other doctors. Family members are welcome to attend.",
          duration: "Before visit",
        },
        {
          icon: Stethoscope,
          title: "Comprehensive assessment",
          description: "Dr. Reve evaluates your physical health, nutrition, vision, hearing, and daily living abilities in a thorough examination.",
          duration: "20-25 min",
        },
        {
          icon: Brain,
          title: "Cognitive and balance screening",
          description: "We use validated tools to check memory, thinking skills, and balance. Early detection makes a real difference in outcomes.",
          duration: "10-15 min",
        },
        {
          icon: Pill,
          title: "Medication review",
          description: "Every medication is reviewed for interactions, side effects, and necessity. We simplify your regimen whenever safely possible.",
          duration: "10 min",
        },
        {
          icon: UsersThree,
          title: "Family care plan meeting",
          description: "We sit down with you and your family to discuss findings, set goals, and create a care plan everyone understands.",
          duration: "10-15 min",
        },
      ],
      ctaText: "Book a geriatric assessment",
      ctaHref: "/contact",
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "Questions families ask about senior care in Naples.",
      items: [
        {
          question: "What is a geriatric assessment and who needs one?",
          answer: "A geriatric assessment is a comprehensive evaluation of an older adult's physical, mental, and functional health. It is recommended for adults over 65, especially those taking multiple medications, experiencing falls, or showing signs of memory changes.",
        },
        {
          question: "Does Medicare cover geriatric care and senior wellness visits?",
          answer: <>Yes. Medicare covers Annual Wellness Visits, depression screenings, cognitive assessments, and many preventive services for seniors. Most geriatric care visits at Faithful Care are covered with no out-of-pocket cost through Medicare. Learn more about <a href="/medicare">Medicare care at Faithful Care</a>.</>,
        },
        {
          question: "How do you help prevent falls in older adults?",
          answer: "We evaluate your balance, gait, vision, medications, and home environment to identify fall risks. Then we create a prevention plan that may include physical therapy referrals, medication adjustments, and home safety recommendations.",
        },
        {
          question: "Can family members attend the appointment?",
          answer: "Absolutely. We encourage family members and caregivers to participate in appointments. Having a second set of ears helps everyone stay informed and aligned on the care plan, medication schedules, and follow-up needs.",
        },
        {
          question: "When should I be concerned about memory loss in a parent?",
          answer: "Signs to watch for include repeating questions, difficulty with familiar tasks, getting lost in known places, and personality changes. Early screening is important because some causes of memory loss are treatable. We offer validated cognitive screening tools in our office.",
        },
        {
          question: "Do you coordinate care with specialists and home health agencies?",
          answer: "Yes. We coordinate with cardiologists, neurologists, physical therapists, home health agencies, and other providers. Dr. Reve serves as the central point of contact, ensuring all your specialists are working together.",
        },
      ],
    },
    dpc: {
      contextHeading: "Coordinated senior care through a membership model.",
      contextDescription: "Seniors managing multiple conditions may benefit from consistent follow-ups, medication review, and specialist coordination. Faithful Care's DPC membership supports ongoing primary care under a written agreement. It is not health insurance and does not replace Medicare or other coverage for hospital care, specialists, emergencies, or services outside the agreement.",
    },
    tealCta: {
      subtitle: "Care that keeps you independent",
      title: "Book a comprehensive senior care visit today.",
      description: "Whether it's a medication review, memory screening, or full geriatric assessment, we're here to help you stay healthy and independent.",
      primaryCtaText: "Schedule a Visit",
      primaryCtaHref: "/contact",
      secondaryCtaText: "Call Now (239) 423-0205",
      secondaryCtaHref: "tel:2394230205",
    },
  },

  "/primary-care/procedures-diagnostics": {
    detailGrid: {
      eyebrow: "In-office capabilities",
      eyebrowColor: "secondary",
      title: "Advanced procedures and diagnostics without a hospital visit.",
      description: "Skip the hospital. We perform common procedures and run diagnostic tests right here in our Naples office, with results the same day.",
      statNumber: "6",
      statLabel: "procedures performed\nin our office",
      cards: [
        {
          icon: Syringe,
          title: "Joint Injections",
          description: "Corticosteroid and hyaluronic acid injections for knee, shoulder, and other joint pain. Fast relief performed right in our office.",
        },
        {
          icon: Knife,
          title: "Skin Biopsies",
          description: "Suspicious moles, lesions, and skin growths evaluated and biopsied on-site. Results are sent to pathology with rapid turnaround.",
        },
        {
          icon: Bandaids,
          title: "Wound Care",
          description: "Laceration repair, wound cleaning, dressing changes, and infection monitoring. We handle minor wound care without the ER wait.",
        },
        {
          icon: Heartbeat,
          title: "EKG Testing",
          description: "On-site electrocardiogram testing to evaluate heart rhythm, detect irregularities, and screen for cardiac conditions during your visit.",
        },
        {
          icon: TestTube,
          title: "Rapid Lab Results",
          description: "In-office blood draws with rapid results for common panels. Glucose, cholesterol, thyroid, and more, often ready the same day.",
        },
        {
          icon: FirstAidKit,
          title: "Minor Surgical Procedures",
          description: "Cyst removal, ingrown toenail treatment, abscess drainage, and other minor procedures performed safely in our office.",
        },
      ],
    },
    alternatingBlock: {
      subtitle: "Everything in one place",
      title: "Get answers and treatment in a single visit.",
      description: "At Faithful Care, we've invested in the equipment and training to handle common procedures and diagnostics without sending you to a hospital or imaging center. That means fewer appointments, faster results, and less time away from your life. When you need a biopsy, an injection, or lab work, we do it here. When you need results, we get them fast. Our goal is to make your healthcare experience as efficient and convenient as possible.",
      imageSrc: "/images/services/in-office-procedures.webp",
      imageAlt: "Doctor performing an in-office diagnostic procedure at Faithful Care Medical Services in Naples",
      ctaText: "Ask about in-office procedures",
      ctaHref: "/contact",
      reversed: true,
      variant: "primary",
    },
    visitSteps: {
      title: "How in-office procedures work at Faithful Care.",
      subtitle: "Most procedures take 15 to 30 minutes and require little to no downtime.",
      steps: [
        {
          icon: Clipboard,
          title: "Consultation",
          description: "Dr. Reve explains the procedure, answers your questions, reviews risks, and makes sure you are comfortable before starting.",
          duration: "5-10 min",
        },
        {
          icon: ShieldCheck,
          title: "Preparation",
          description: "We prepare the area, apply local anesthesia if needed, and ensure all equipment is ready. You stay comfortable throughout.",
          duration: "5 min",
        },
        {
          icon: Syringe,
          title: "The procedure",
          description: "Whether it's a joint injection, skin biopsy, or wound care, Dr. Reve performs the procedure with precision and minimal discomfort.",
          duration: "10-15 min",
        },
        {
          icon: Heartbeat,
          title: "Recovery",
          description: "We monitor you briefly, provide aftercare instructions, and make sure you feel well before you leave the office.",
          duration: "5-10 min",
        },
        {
          icon: CheckCircle,
          title: "Results and follow-up",
          description: "Lab samples go to pathology with rapid turnaround. Dr. Reve contacts you personally as soon as results are available.",
          duration: "3-7 days",
        },
      ],
      ctaText: "Ask about your procedure",
      ctaHref: "/contact",
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "Questions patients ask about in-office procedures.",
      items: [
        {
          question: "Do joint injections hurt?",
          answer: "Most patients describe a brief pressure or mild sting during the injection. Dr. Reve uses local numbing agents and precise technique to minimize discomfort. Relief from joint pain often begins within 24 to 48 hours.",
        },
        {
          question: "How long does a skin biopsy take?",
          answer: "A skin biopsy takes about 10 to 15 minutes in our office. After numbing the area, Dr. Reve removes a small tissue sample and sends it to pathology. Results are typically available within 5 to 7 business days.",
        },
        {
          question: "Can I get an EKG without going to the hospital?",
          answer: "Yes. We perform EKG testing right in our Naples office. The test takes about 10 minutes, is completely painless, and results are available immediately. Dr. Reve reviews the results with you during your visit.",
        },
        {
          question: "How quickly will I get my lab results?",
          answer: "Most routine lab results are available the same day or next business day. Dr. Reve reviews every result personally and contacts you to discuss findings. For urgent results, we call you as soon as they are ready.",
        },
        {
          question: "Do I need a referral for in-office procedures?",
          answer: "No referral is needed for most in-office procedures at Faithful Care. If you are an existing patient, we can often schedule your procedure during the same visit. New patients can call to schedule a consultation first.",
        },
        {
          question: "Does insurance cover in-office procedures?",
          answer: "Most in-office procedures are covered by insurance with standard copays or coinsurance. We verify your coverage before the procedure and let you know about any out-of-pocket costs in advance. We accept Original Medicare, Florida Medicaid (Sunshine Health), Humana, Aetna, and Cigna.",
        },
      ],
    },
    dpc: {
      contextHeading: "Ask which procedures are included in membership care.",
      contextDescription: "Some in-office procedures or tests may be available through the DPC membership, while laboratory, medication, supply, or outside-service charges can vary. Review the current written membership agreement with the office before scheduling so you understand what is included and what may have a separate cost.",
    },
    tealCta: {
      subtitle: "Skip the hospital",
      title: "Get your procedure done at Faithful Care.",
      description: "Joint injections, skin biopsies, EKGs, and lab work. All performed in our comfortable Naples office. No hospital visit needed.",
      primaryCtaText: "Schedule a Visit",
      primaryCtaHref: "/contact",
      secondaryCtaText: "Call Now (239) 423-0205",
      secondaryCtaHref: "tel:2394230205",
    },
  },

  "/palliative-care/about-palliative-care": {
    detailGrid: {
      eyebrow: "What palliative care includes",
      eyebrowColor: "secondary",
      title: "Six ways palliative care helps patients and families in Naples.",
      description: "Palliative care is not hospice. It is an extra layer of medical support available at any stage of a serious illness, alongside your regular treatment. The goal is better quality of life for you and your family.",
      statNumber: "6",
      statLabel: "areas of support\nfor serious illness",
      cards: [
        {
          icon: Pulse,
          title: "Symptom Relief",
          description: "Expert management of pain, shortness of breath, nausea, fatigue, and other symptoms that interfere with your daily life and comfort.",
        },
        {
          icon: UsersThree,
          title: "Care Coordination",
          description: "We work with your oncologist, cardiologist, and other specialists to make sure all your treatments are aligned and nothing falls through the cracks.",
        },
        {
          icon: Handshake,
          title: "Goals of Care Conversations",
          description: "Honest, clear discussions about your treatment options, priorities, and what matters most to you, so every medical decision reflects your values.",
        },
        {
          icon: Heart,
          title: "Family Support",
          description: "Guidance and emotional support for the people caring for you. We include your family in every step and help them navigate the stress of serious illness.",
        },
        {
          icon: Pill,
          title: "Medication Management",
          description: "We review every medication you take, reduce side effects, eliminate unnecessary prescriptions, and make sure your pain and symptoms are properly controlled.",
        },
        {
          icon: Scroll,
          title: "Advance Planning",
          description: "Help creating advance directives, living wills, and healthcare proxy documents so your wishes are clear and legally protected.",
        },
      ],
    },
    alternatingBlock: {
      subtitle: "Not hospice, not giving up",
      title: "Palliative care works alongside your regular treatment.",
      description: "Many patients and families in Southwest Florida confuse palliative care with hospice. They are not the same thing. Hospice is for the final months of life when curative treatment has stopped. Palliative care can begin the day you receive a serious diagnosis, whether that is cancer, heart failure, COPD, kidney disease, or any other condition that impacts your quality of life. You can receive palliative care while still pursuing aggressive treatment. At Faithful Care in Naples, Dr. Reve provides palliative support that helps you feel better, stay stronger, and make informed decisions at every stage of your illness.",
      imageSrc: "/images/services/pain-comfort-management.webp",
      imageAlt: "Doctor providing compassionate palliative care consultation at Faithful Care Medical Services in Naples, Florida",
      ctaText: "Learn how we can help",
      ctaHref: "/contact",
      reversed: false,
      variant: "secondary",
    },
    visitSteps: {
      title: "How palliative care starts at Faithful Care in Naples.",
      subtitle: "Getting started is simple. No special referral is required. Here is what to expect.",
      steps: [
        {
          icon: Phone,
          title: "Call or request a consultation",
          description: "You, a family member, or your current doctor can contact us. No referral is needed. We schedule your first palliative care visit within days.",
          duration: "5 min",
        },
        {
          icon: Clipboard,
          title: "Comprehensive needs assessment",
          description: "Dr. Reve reviews your diagnosis, current treatments, symptoms, and personal goals. Family members are welcome and encouraged to attend.",
          duration: "30-45 min",
        },
        {
          icon: ListChecks,
          title: "Personalized comfort plan",
          description: "Together we build a plan to address your pain, symptoms, medication side effects, and emotional concerns. Every plan is tailored to your specific situation.",
          duration: "15-20 min",
        },
        {
          icon: TreeStructure,
          title: "Coordination with your care team",
          description: "We contact your oncologist, cardiologist, or other specialists to align your palliative support with your ongoing treatment plan.",
          duration: "Same week",
        },
        {
          icon: CalendarCheck,
          title: "Ongoing follow-up and adjustments",
          description: "Palliative care is not a one-time visit. We schedule regular follow-ups to adjust your plan as your condition or needs change.",
          duration: "Every 2-4 weeks",
        },
      ],
      ctaText: "Schedule your consultation",
      ctaHref: "/contact",
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "Questions patients and families ask about palliative care.",
      items: [
        {
          question: "Is palliative care the same as hospice?",
          answer: "No. Palliative care and hospice are different. Hospice is for patients in the final six months of life who have stopped curative treatment. Palliative care can start at any point after a serious diagnosis and works alongside your regular treatment. You do not have to stop fighting your illness to receive palliative care.",
        },
        {
          question: "Who qualifies for palliative care in Naples?",
          answer: "Any adult living with a serious illness qualifies for palliative care. This includes cancer, heart failure, COPD, kidney disease, Parkinson's, ALS, dementia, and other conditions that cause pain, symptoms, or stress. There is no age requirement and no minimum prognosis.",
        },
        {
          question: "Does Medicare cover palliative care in Florida?",
          answer: "Yes. Medicare Part B covers palliative care consultations and follow-up visits. Most commercial insurance plans and Medicaid also cover palliative care services. We verify your coverage before your first visit so there are no surprises.",
        },
        {
          question: "Can I continue seeing my specialists while receiving palliative care?",
          answer: "Absolutely. Palliative care is designed to work alongside your existing medical team. We coordinate with your oncologist, cardiologist, pulmonologist, and other specialists to make sure your symptom management complements your treatment plan.",
        },
        {
          question: "When is the right time to start palliative care?",
          answer: "The earlier the better. Research shows that patients who start palliative care soon after a serious diagnosis experience better symptom control, less anxiety, and often better treatment outcomes. You do not have to wait until symptoms become severe.",
        },
        {
          question: "Do you provide palliative care at home or only in your Naples office?",
          answer: "We provide palliative care consultations at our Naples office on Tamiami Trail North. For patients who have difficulty traveling, we can arrange phone and video consultations between in-person visits to keep your care on track.",
        },
      ],
    },
    dpc: {
      contextHeading: "Ask how membership care can support ongoing communication.",
      contextDescription: "When you or a loved one is facing a serious illness, clear communication and coordinated follow-up matter. The office can explain which primary-care and palliative-support services, communication channels, care-plan updates, and family meetings are included in the current DPC membership agreement.",
    },
    tealCta: {
      subtitle: "Facing a serious illness?",
      title: "You don't have to manage this alone.",
      description: "Palliative care at Faithful Care in Naples provides relief from pain, symptoms, and stress at any stage of serious illness. Call us today to learn how we can help.",
      primaryCtaText: "Schedule a Consultation",
      primaryCtaHref: "/contact",
      secondaryCtaText: "Call Now (239) 423-0205",
      secondaryCtaHref: "tel:2394230205",
    },
  },

  "/palliative-care/symptom-relief": {
    detailGrid: {
      eyebrow: "Symptoms we treat",
      eyebrowColor: "secondary",
      title: "Expert relief for the symptoms that steal your quality of life.",
      description: "Serious illness brings symptoms that go beyond the disease itself. We treat each one with targeted medical strategies so you can focus on living, not just surviving.",
      statNumber: "6",
      statLabel: "difficult symptoms\nwe treat daily",
      cards: [
        {
          icon: Lightning,
          title: "Chronic Pain",
          description: "Multimodal pain management using medication optimization, non-opioid alternatives, and interventional techniques. We find what works for your specific type of pain.",
        },
        {
          icon: Wind,
          title: "Breathing Difficulty",
          description: "Shortness of breath from COPD, heart failure, cancer, or lung disease. We use medications, positioning strategies, and breathing techniques to help you breathe easier.",
        },
        {
          icon: Timer,
          title: "Fatigue and Weakness",
          description: "Cancer-related fatigue, treatment side effects, and chronic exhaustion. We identify contributing factors and build an energy management plan that actually helps.",
        },
        {
          icon: Warning,
          title: "Nausea and Appetite Loss",
          description: "Medication-induced nausea, treatment side effects, and loss of appetite. We adjust medications, recommend nutritional strategies, and restore your ability to eat comfortably.",
        },
        {
          icon: Brain,
          title: "Anxiety and Depression",
          description: "The emotional toll of serious illness is real. We provide medical treatment for anxiety, depression, and the overwhelming stress that comes with a difficult diagnosis.",
        },
        {
          icon: Moon,
          title: "Sleep Problems",
          description: "Pain, anxiety, and medication side effects can destroy your sleep. We address the root causes and develop a plan to help you rest and recover each night.",
        },
      ],
    },
    alternatingBlock: {
      subtitle: "Beyond just prescriptions",
      title: "A complete approach to symptom control in Naples.",
      description: "At Faithful Care, symptom relief is not just about prescribing another medication. Dr. Reve takes time to understand what each symptom means for your daily life, identifies root causes, and builds a layered treatment plan. That might include medication adjustments, non-drug therapies, lifestyle modifications, and coordination with your specialists. Many patients in Collier County and Southwest Florida suffer with poorly managed symptoms because their doctors focus only on the disease, not on how the patient feels. We focus on both.",
      imageSrc: "/images/services/symptom-relief.webp",
      imageAlt: "Doctor managing pain and symptom relief for a palliative care patient at Faithful Care in Naples",
      ctaText: "Get help with your symptoms",
      ctaHref: "/contact",
      reversed: true,
      variant: "secondary",
    },
    visitSteps: {
      title: "How we build your symptom relief plan in Naples.",
      subtitle: "Every plan starts with listening. We need to understand your symptoms before we can treat them effectively.",
      steps: [
        {
          icon: Ear,
          title: "Describe what you're feeling",
          description: "We start by listening. Tell us about your pain levels, breathing, sleep, appetite, and emotional state. Every detail matters for building the right plan.",
          duration: "15-20 min",
        },
        {
          icon: Pill,
          title: "Full medication review",
          description: "We review every medication you take, including those from other doctors. Many symptoms are caused or worsened by drug interactions and side effects.",
          duration: "10-15 min",
        },
        {
          icon: ListChecks,
          title: "Targeted symptom plan",
          description: "Dr. Reve creates a specific plan for each symptom. Pain, nausea, fatigue, and anxiety often require different approaches working together.",
          duration: "15 min",
        },
        {
          icon: TreeStructure,
          title: "Specialist coordination",
          description: "We contact your oncologist, pulmonologist, or other specialists to align symptom treatment with your ongoing care. No conflicting plans.",
          duration: "Same week",
        },
        {
          icon: CalendarCheck,
          title: "Monitor and adjust",
          description: "Symptoms change over time. We schedule regular follow-ups to track what is working, what is not, and adjust your plan until you feel better.",
          duration: "Every 2-4 weeks",
        },
      ],
      ctaText: "Start feeling better today",
      ctaHref: "/contact",
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "Questions patients ask about symptom relief and pain management.",
      items: [
        {
          question: "Can you manage pain without relying heavily on opioids?",
          answer: "Yes. Our approach to pain management uses multiple strategies including non-opioid medications, nerve blocks, physical therapy referrals, and complementary techniques. When opioids are necessary, we prescribe the lowest effective dose and monitor closely. The goal is function and comfort, not sedation.",
        },
        {
          question: "I'm having side effects from chemotherapy. Can you help?",
          answer: "Yes. Nausea, fatigue, appetite loss, neuropathy, and other treatment side effects are among the most common reasons patients seek palliative care. We work alongside your oncologist to manage these symptoms so you can continue your cancer treatment more comfortably.",
        },
        {
          question: "How quickly can I be seen for symptom relief in Naples?",
          answer: "We schedule most palliative care symptom consultations within one week. For urgent symptom concerns, DPC members can reach Dr. Reve the same day by phone or text. We understand that when you are suffering, waiting weeks is not an option.",
        },
        {
          question: "Do you treat shortness of breath from heart failure or COPD?",
          answer: "Yes. Shortness of breath is one of the most distressing symptoms we manage. We use medication optimization, breathing techniques, activity pacing, and coordination with your pulmonologist or cardiologist to help you breathe more comfortably.",
        },
        {
          question: "Can you help with anxiety and depression from a serious diagnosis?",
          answer: "Absolutely. The emotional impact of serious illness is a core part of palliative care. We provide medical treatment for anxiety and depression, counseling referrals, stress management strategies, and ongoing emotional support for both patients and families.",
        },
        {
          question: "Does insurance cover palliative symptom management in Florida?",
          answer: "Yes. Palliative care symptom management visits are covered by Medicare Part B, Medicaid, and most commercial insurance plans. We verify your coverage before your first visit and explain any expected costs upfront.",
        },
      ],
    },
    dpc: {
      contextHeading: "Membership support for ongoing symptom-management follow-up.",
      contextDescription: "Patients living with serious illness may need timely follow-up when symptoms change. DPC members can use the communication and scheduling options described in their membership agreement. New or worsening symptoms still require clinical assessment, and emergency symptoms should be handled by calling 911 or visiting the nearest emergency department.",
    },
    tealCta: {
      subtitle: "Suffering with uncontrolled symptoms?",
      title: "Get expert symptom relief at Faithful Care in Naples.",
      description: "Pain, nausea, fatigue, and breathing problems don't have to define your days. We specialize in making you more comfortable so you can focus on what matters.",
      primaryCtaText: "Schedule a Visit",
      primaryCtaHref: "/contact",
      secondaryCtaText: "Call Now (239) 423-0205",
      secondaryCtaHref: "tel:2394230205",
    },
  },

  "/palliative-care/patient-family-support": {
    detailGrid: {
      eyebrow: "Support for everyone involved",
      eyebrowColor: "secondary",
      title: "Caring for the patient means caring for the whole family.",
      description: "Serious illness affects everyone around the patient. We provide structured support for caregivers, family members, and loved ones navigating this difficult journey together.",
      statNumber: "6",
      statLabel: "types of support\nfor patients & families",
      cards: [
        {
          icon: HandHeart,
          title: "Caregiver Guidance",
          description: "Practical coaching for family caregivers on medication management, symptom monitoring, daily care tasks, and how to take care of yourself while caring for someone else.",
        },
        {
          icon: UsersThree,
          title: "Family Meetings",
          description: "Structured family conversations with Dr. Reve to discuss the patient's condition, treatment options, and next steps. Everyone leaves on the same page.",
        },
        {
          icon: Chats,
          title: "What to Expect Conversations",
          description: "Honest, compassionate conversations about disease progression, treatment realities, and what changes to anticipate. Clarity reduces fear and helps families prepare.",
        },
        {
          icon: Brain,
          title: "Emotional and Stress Support",
          description: "Screening for caregiver burnout, anxiety, and depression. We connect families with counseling resources and provide strategies for managing emotional exhaustion.",
        },
        {
          icon: Lifebuoy,
          title: "Community Resources",
          description: "Connections to support groups, respite care, meal delivery, transportation assistance, and other services available in Collier County and Southwest Florida.",
        },
        {
          icon: Megaphone,
          title: "Medical Advocacy",
          description: "We help families communicate with hospitals, insurance companies, and other providers. When navigating the healthcare system feels overwhelming, we speak on your behalf.",
        },
      ],
    },
    alternatingBlock: {
      subtitle: "No one should face this alone",
      title: "Support that goes beyond the medical chart.",
      description: "When a loved one faces a serious illness, the family often carries as much weight as the patient. At Faithful Care in Naples, we recognize that caregivers need care too. Dr. Reve takes time to meet with families, explain what is happening in plain language, and help everyone prepare for what comes next. We connect families in Collier County with local support groups, respite care options, and community resources that can make a real difference in daily life. Our goal is to make sure no one in your family feels lost, overwhelmed, or alone in this process.",
      imageSrc: "/images/services/patient-family-support.webp",
      imageAlt: "Doctor meeting with patient and family members to discuss care plan at Faithful Care in Naples",
      ctaText: "Schedule a family consultation",
      ctaHref: "/contact",
      reversed: false,
      variant: "secondary",
    },
    visitSteps: {
      title: "How family support works at Faithful Care.",
      subtitle: "We involve your family from the very first visit. Here is what a typical support process looks like.",
      steps: [
        {
          icon: Phone,
          title: "Reach out to us",
          description: "The patient, a family member, or a referring doctor can contact us. Let us know your situation and we will schedule a time for everyone to meet.",
          duration: "5 min",
        },
        {
          icon: Ear,
          title: "Needs assessment for patient and family",
          description: "Dr. Reve meets with the patient and family together to understand the diagnosis, current challenges, emotional concerns, and what kind of support is needed most.",
          duration: "30-40 min",
        },
        {
          icon: ListChecks,
          title: "Support plan for everyone",
          description: "We create a plan that addresses the patient's symptoms and the family's needs: caregiver coaching, emotional support referrals, and practical resources.",
          duration: "15-20 min",
        },
        {
          icon: Handshake,
          title: "Family care meeting",
          description: "A structured meeting where Dr. Reve explains the medical situation, answers every question, and helps the family align on decisions and next steps.",
          duration: "20-30 min",
        },
        {
          icon: CalendarCheck,
          title: "Ongoing check-ins",
          description: "We schedule regular follow-ups to see how the patient and the family are doing. Needs change over time, and we adjust our support to match.",
          duration: "Every 2-4 weeks",
        },
      ],
      ctaText: "Schedule a family consultation",
      ctaHref: "/contact",
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "Questions families ask about patient and caregiver support.",
      items: [
        {
          question: "Can family members attend palliative care appointments?",
          answer: "Yes, and we strongly encourage it. Having family members present helps everyone understand the medical situation, ask questions, and stay aligned on care decisions. Dr. Reve welcomes family participation at every visit.",
        },
        {
          question: "What kind of support do you offer caregivers in Naples?",
          answer: "We provide practical caregiver coaching on medication management, symptom monitoring, and daily care tasks. We also screen for caregiver burnout and connect families with respite care, support groups, and counseling resources in Collier County.",
        },
        {
          question: "How do you help families make difficult medical decisions?",
          answer: "Dr. Reve facilitates structured family meetings where she explains the medical situation in plain language, outlines realistic options, and helps families weigh the benefits and risks of each choice. We never pressure families. We provide clarity so they can decide with confidence.",
        },
        {
          question: "Are there local support resources for families dealing with serious illness in Collier County?",
          answer: "Yes. We connect families with support groups, meal delivery services, transportation assistance, home health agencies, and other community resources available in Naples, Collier County, and Southwest Florida. We maintain an updated list of trusted local providers.",
        },
        {
          question: "Can you help if my loved one is in the hospital and we don't know what to do next?",
          answer: "Yes. We can help navigate hospital discharges, coordinate with hospital social workers, and create a plan for what happens after your loved one comes home. We serve as your medical advocate during transitions between hospital and home.",
        },
        {
          question: "Does insurance cover family meetings and caregiver support?",
          answer: "Coverage for family meetings depends on the service, medical necessity, and the patient's specific plan. We verify available benefits before scheduling and explain expected costs. DPC members should review the current membership agreement to confirm whether a family consultation is included.",
        },
      ],
    },
    dpc: {
      contextHeading: "Caregiver communication and support through DPC.",
      contextDescription: "When a family is navigating serious illness, questions can arise between scheduled visits. Faithful Care's current DPC membership agreement explains the available communication channels and whether family meetings or caregiver consultations are included. The office can review those terms with you before enrollment.",
    },
    tealCta: {
      subtitle: "Your family needs support too",
      title: "Let us help your whole family through this.",
      description: "Serious illness is a family experience. Faithful Care provides guidance, resources, and compassionate support for patients and everyone who loves them.",
      primaryCtaText: "Schedule a Family Meeting",
      primaryCtaHref: "/contact",
      secondaryCtaText: "Call Now (239) 423-0205",
      secondaryCtaHref: "tel:2394230205",
    },
  },

  "/palliative-care/planning-transitions": {
    detailGrid: {
      eyebrow: "Planning services",
      eyebrowColor: "secondary",
      title: "Make your wishes known and legally protected.",
      description: "Advance planning is one of the most important things you can do for yourself and your family. We help you document your wishes, prepare for transitions, and ensure your care always reflects what matters most to you.",
      statNumber: "6",
      statLabel: "planning services\nto protect your wishes",
      cards: [
        {
          icon: FileText,
          title: "Advance Directives",
          description: "Legal documents that tell your doctors and family what medical treatments you want or don't want if you become unable to speak for yourself.",
        },
        {
          icon: Scroll,
          title: "Living Wills",
          description: "A written declaration of your wishes regarding life-sustaining treatments like ventilators, feeding tubes, and resuscitation. We help you complete this with clarity.",
        },
        {
          icon: SealCheck,
          title: "POLST Forms",
          description: "Physician Orders for Life-Sustaining Treatment. A medical order signed by Dr. Reve that ensures your treatment preferences are followed by emergency responders and hospitals.",
        },
        {
          icon: Handshake,
          title: "Goals of Care Discussions",
          description: "Structured conversations about your values, priorities, and what quality of life means to you. These discussions guide every medical decision going forward.",
        },
        {
          icon: Path,
          title: "Hospice Evaluation and Coordination",
          description: "When the time is right, we help evaluate hospice options, coordinate the transition, and ensure continuity of care with trusted hospice providers in Collier County.",
        },
        {
          icon: HouseSimple,
          title: "Care Transitions",
          description: "Moving between hospital, home, rehab, or assisted living. We coordinate every transition to prevent gaps in care, medication errors, and unnecessary readmissions.",
        },
      ],
    },
    alternatingBlock: {
      subtitle: "Plan now, not in a crisis",
      title: "The best time to plan is before you need to.",
      description: "Most families in Southwest Florida wait until a crisis to discuss advance care planning. By then, decisions are made under pressure, without clarity, and often without the patient's input. At Faithful Care, Dr. Reve initiates these conversations early, when the patient can participate fully. We walk you through every document, explain your options in plain language, and make sure your wishes are legally documented and communicated to everyone who needs to know. Planning ahead gives your family peace of mind and ensures your care always reflects your values.",
      imageSrc: "/images/services/planning-transitions.webp",
      imageAlt: "Doctor helping a patient with advance care planning and living will documentation at Faithful Care in Naples",
      ctaText: "Start your advance plan",
      ctaHref: "/contact",
      reversed: true,
      variant: "secondary",
    },
    visitSteps: {
      title: "How advance care planning works at Faithful Care.",
      subtitle: "We guide you through every step. Most patients complete their planning in two to three visits.",
      steps: [
        {
          icon: Ear,
          title: "Values and priorities conversation",
          description: "We start by talking about what matters most to you: independence, comfort, time with family, and your definition of quality of life. This conversation guides everything that follows.",
          duration: "20-30 min",
        },
        {
          icon: FileText,
          title: "Review existing documents",
          description: "If you have existing advance directives, we review them together to make sure they still reflect your current wishes. If you don't have any, we start fresh.",
          duration: "10-15 min",
        },
        {
          icon: Scroll,
          title: "Complete your documents",
          description: "Dr. Reve helps you complete advance directives, living wills, and POLST forms. We explain every option in plain language so you make decisions with full understanding.",
          duration: "20-30 min",
        },
        {
          icon: UsersThree,
          title: "Share with your family and care team",
          description: "We help you communicate your wishes to family members and ensure copies are on file with your healthcare proxy, hospital, and primary care team.",
          duration: "10-15 min",
        },
        {
          icon: CalendarCheck,
          title: "Review and update as needed",
          description: "Your wishes may change as your health evolves. We revisit your plan at every palliative care visit and update documents whenever you want to make changes.",
          duration: "Ongoing",
        },
      ],
      ctaText: "Start planning today",
      ctaHref: "/contact",
    },
    faq: {
      eyebrow: "Frequently asked questions",
      title: "Questions patients and families ask about advance planning.",
      items: [
        {
          question: "What is an advance directive and why do I need one in Florida?",
          answer: "An advance directive is a legal document that tells your doctors and family what medical treatments you want if you become unable to communicate. In Florida, having an advance directive ensures your wishes are followed and prevents family members from having to make painful decisions without guidance.",
        },
        {
          question: "What is the difference between palliative care and hospice?",
          answer: "Palliative care can begin at any point after a serious diagnosis, alongside curative treatment. Hospice begins when curative treatment is no longer pursued and the focus shifts entirely to comfort. Dr. Reve can help you understand when the transition to hospice is appropriate and coordinate it smoothly.",
        },
        {
          question: "When should my family start talking about advance care planning?",
          answer: "The ideal time is while the patient is well enough to participate in the conversation. We recommend starting advance care planning after any serious diagnosis, before a major surgery, or simply as part of comprehensive senior care. Starting early avoids crisis decisions.",
        },
        {
          question: "Does Dr. Reve help with the actual paperwork for living wills?",
          answer: "Yes. Dr. Reve guides you through every document, explains the legal and medical implications of each option, and helps you complete the forms correctly. We also ensure copies are distributed to your healthcare proxy, family, and medical records.",
        },
        {
          question: "How do you coordinate hospice transitions in Collier County?",
          answer: "When the time is right, Dr. Reve evaluates hospice eligibility, discusses options with you and your family, and coordinates directly with trusted hospice agencies in Naples and Collier County. We ensure a smooth handoff so there is no gap in your care.",
        },
        {
          question: "Does Medicare cover advance care planning visits in Florida?",
          answer: "Yes. Medicare covers advance care planning visits as a separate billable service. You can have these conversations with Dr. Reve at no out-of-pocket cost through Medicare Part B. We handle the billing so you can focus on the planning.",
        },
      ],
    },
    dpc: {
      contextHeading: "Ask how advance planning fits the DPC membership.",
      contextDescription: "Advance care planning benefits from unhurried, thoughtful conversations. Faithful Care's current DPC agreement explains which planning visits, follow-up communication, document reviews, family discussions, and care-coordination services are included. Appointment time and coordination depend on clinical need, scheduling, and the services listed in that agreement.",
    },
    tealCta: {
      subtitle: "Protect your wishes",
      title: "Start your advance care plan at Faithful Care today.",
      description: "Advance directives, living wills, and goals of care conversations. We guide you through every step so your family never has to guess what you would want.",
      primaryCtaText: "Schedule a Planning Visit",
      primaryCtaHref: "/contact",
      secondaryCtaText: "Call Now (239) 423-0205",
      secondaryCtaHref: "tel:2394230205",
    },
  },
};
