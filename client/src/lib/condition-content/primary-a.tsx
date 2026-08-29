import {
  ArrowsClockwise,
  CalendarCheck,
  ChartLineUp,
  ClipboardText,
  Drop,
  Eye,
  FirstAid,
  Footprints,
  Gauge,
  Heartbeat,
  ListChecks,
  Monitor,
  Notebook,
  Package,
  PersonSimpleWalk,
  Pill,
  Pulse,
  ShieldCheck,
  Stethoscope,
  TestTube,
  TrendUp,
  Warning,
  Wind,
} from "@phosphor-icons/react";
import heroChronicDisease from "@/assets/images/hero-chronic-disease.optimized.webp";
import heroChronicDiseaseMobile from "@/assets/images/hero-chronic-disease.mobile.webp";
import heroCheckups from "@/assets/images/hero-checkups-prevention.optimized.webp";
import heroCheckupsMobile from "@/assets/images/hero-checkups-prevention.mobile.webp";
import heroSameDayVisits from "@/assets/images/hero-same-day-visits.optimized.webp";
import heroSameDayVisitsMobile from "@/assets/images/hero-same-day-visits.mobile.webp";
import heroYoungWoman from "@/assets/images/hero-doctor-young-woman.optimized.webp";
import heroYoungWomanMobile from "@/assets/images/hero-doctor-young-woman.mobile.webp";
import naplesDiabetes from "@/assets/images/hero-naples-a1.optimized.webp";
import naplesBloodPressure from "@/assets/images/hero-naples-a2.optimized.webp";
import naplesCopd from "@/assets/images/hero-naples-a3.optimized.webp";
import naplesThyroid from "@/assets/images/hero-naples-a4.optimized.webp";
import { assetUrl } from "@/lib/asset-url";
import type { ConditionPageMap } from "@/lib/condition-page-types";

export const primaryConditionPagesA = {
  "/primary-care/diabetes-care": {
    path: "/primary-care/diabetes-care",
    category: "Primary Care",
    parentHub: { label: "Back to Primary Care", href: "/primary-care" },
    hero: {
      title: "Diabetes care that protects more than your blood sugar.",
      subtitleBold: "A plan built from patterns, not one number.",
      subtitle:
        "Faithful Care helps Naples adults connect A1C and glucose trends with medications, daily routines, and the screenings that protect the eyes, kidneys, feet, and heart.",
      marqueeItems: ["A1C trend review", "Medication follow-up", "Complication screening", "Naples, FL"],
      image: assetUrl(heroChronicDisease),
      imageMobile: assetUrl(heroChronicDiseaseMobile),
      imageAlt: "Primary care clinician reviewing a diabetes care plan with an adult patient",
      imagePosition: "78% top",
      imagePositionMobile: "100% 48%",
    },
    quickFacts: [
      { icon: ChartLineUp, label: "Care focus", value: "A1C, glucose patterns, and medication safety" },
      { icon: Eye, label: "Whole-person view", value: "Eyes, kidneys, feet, blood pressure, and heart risk" },
      { icon: Monitor, label: "Bring with you", value: "Meter or CGM reports, medication list, and recent labs" },
    ],
    sections: [
      {
        type: "detail-grid",
        eyebrow: "Your diabetes dashboard",
        eyebrowColor: "primary",
        title: "Good follow-up looks beyond a single glucose result.",
        description:
          "A useful visit connects the numbers with what happened between them. We review the pattern, the treatment burden, and the parts of health that diabetes can affect over time.",
        statNumber: "4",
        statLabel: "connected areas help turn a lab result into a practical care plan",
        cards: [
          {
            icon: Drop,
            title: "A1C and glucose trends",
            description:
              "A1C offers an approximate three-month view. Home readings or CGM reports can reveal lows, highs, and time-of-day patterns that an average may hide.",
          },
          {
            icon: Pill,
            title: "Medication fit and safety",
            description:
              "We discuss what you take, how consistently you can take it, side effects, affordability concerns, and any episodes of low blood sugar before a plan changes.",
          },
          {
            icon: ShieldCheck,
            title: "Complication prevention",
            description:
              "Kidney testing, dilated eye exams, foot checks, and cardiovascular risk review each answer a different question. We help keep those needs visible and coordinated.",
          },
          {
            icon: PersonSimpleWalk,
            title: "A plan that fits real life",
            description:
              "Meals, activity, sleep, other conditions, and the risk of hypoglycemia all matter. Targets and follow-up should reflect the person, not a universal template.",
          },
        ],
      },
      {
        type: "comparison",
        eyebrow: "Two useful views",
        title: "A1C and home readings answer different questions.",
        description:
          "Neither view replaces the other. Bringing both, when available, gives your clinician better context for a safe conversation about next steps.",
        leftHeading: "A1C result",
        rightHeading: "Home glucose or CGM pattern",
        rows: [
          {
            label: "Time window",
            left: "Estimates average glucose exposure over roughly the previous two to three months.",
            right: "Shows specific moments, daily patterns, and changes around meals, activity, sleep, or medication.",
          },
          {
            label: "Most useful for",
            left: "Following the overall direction of diabetes control over time.",
            right: "Spotting repeated lows, highs, or times when the current routine may not be working as intended.",
          },
          {
            label: "Important limit",
            left: "An average can look acceptable while meaningful highs and lows still occur.",
            right: "Individual readings can be misleading without technique, timing, meals, symptoms, and medication context.",
          },
          {
            label: "What to bring",
            left: "Recent laboratory results and the date they were collected.",
            right: "Your meter, written log, or a downloadable report, plus notes about symptoms and unusual days.",
          },
        ],
        note: "Your individual glucose and A1C goals should be set with a clinician who knows your age, medications, other conditions, and risk of hypoglycemia.",
      },
      {
        type: "split-panel",
        eyebrow: "Before a plan changes",
        title: "The details that make a diabetes visit more useful.",
        description:
          "A medication decision should follow a clear review of what the numbers mean, what is realistic for you, and what could make treatment unsafe.",
        tone: "navy",
        items: [
          {
            icon: ClipboardText,
            title: "Map the trend",
            description:
              "We look for repeated patterns and ask what was happening around low or high readings rather than reacting to one isolated value.",
          },
          {
            icon: Package,
            title: "Reconcile every medicine",
            description:
              "Bring prescriptions, over-the-counter products, vitamins, and supplements. Doses, timing, missed doses, and side effects can all change the picture.",
          },
          {
            icon: Footprints,
            title: "Check prevention gaps",
            description:
              "We review whether kidney, eye, foot, cholesterol, and blood pressure follow-up is due and coordinate outside care when needed.",
          },
          {
            icon: ArrowsClockwise,
            title: "Set the next checkpoint",
            description:
              "The plan should state what you will track, which symptoms should trigger a call, and when the results should be reviewed again.",
          },
        ],
      },
      {
        type: "visit-steps",
        eyebrow: "Prepare for the appointment",
        title: "Turn your diabetes history into a usable visit.",
        subtitle:
          "A little preparation helps the conversation focus on decisions instead of reconstructing the record from memory.",
        steps: [
          {
            icon: Monitor,
            title: "Collect the pattern",
            description:
              "Bring your meter, log, or CGM report if you already use one. Mark repeated lows, very high readings, and days that did not follow your usual routine.",
          },
          {
            icon: Pill,
            title: "Bring the complete medication picture",
            description:
              "List names, doses, timing, missed doses, side effects, cost barriers, and any nonprescription products you take.",
          },
          {
            icon: ListChecks,
            title: "Leave with clear next actions",
            description:
              "Confirm what stays the same, what changes, which screenings or referrals are due, and when to repeat labs or follow up.",
          },
        ],
        ctaText: "Request diabetes care",
        ctaHref: "/contact",
      },
      {
        type: "care-levels",
        eyebrow: "Know when to act",
        title: "A routine concern, a same-day call, or an emergency?",
        description:
          "Your personal instructions come first. These examples help separate regular follow-up from symptoms that should not wait.",
        items: [
          {
            tone: "emergency",
            label: "Call 911",
            title: "Severe hypoglycemia or possible DKA",
            description:
              "Loss of consciousness, a seizure, severe trouble breathing, marked confusion, or very high glucose with positive ketones, repeated vomiting, or inability to keep fluids down can signal a life-threatening emergency.",
            action: "Call 911 or seek emergency care according to your emergency plan. Do not drive yourself when severe symptoms are present.",
          },
          {
            tone: "today",
            label: "Call the care team today",
            title: "The pattern changed without emergency symptoms",
            description:
              "Repeated lows, persistent high readings, an early illness while you can still drink, or a medication problem deserve prompt guidance. If ketones are present, follow your written sick-day instructions immediately.",
            action: "Contact your clinician the same day. Escalate to emergency care for vomiting, trouble breathing, confusion, or inability to keep fluids down.",
          },
          {
            tone: "routine",
            label: "Schedule follow-up",
            title: "You are due for a structured review",
            description:
              "Book a visit when A1C or routine labs are due, medications need review, or eye, kidney, or foot screening may be missing.",
            action: "Bring your reports and questions so the next plan is specific and documented.",
          },
        ],
        note: "This guide is educational. A clinician who knows your diabetes type, medicines, and history should provide your exact thresholds and sick-day plan.",
      },
    ],
    related: {
      eyebrow: "Connected care",
      title: "Diabetes rarely travels alone.",
      description:
        "Primary care connects diabetes follow-up with prevention, cardiovascular risk, medication review, and the needs that can change with age.",
      featured: {
        title: "Chronic disease management",
        description:
          "Coordinate diabetes alongside blood pressure, cholesterol, kidney health, and other long-term conditions with one primary care team.",
        href: "/primary-care/chronic-disease",
        image: assetUrl(naplesDiabetes),
        imageAlt: "Aerial view of a Gulf beach and palm-lined neighborhood in Naples, Florida",
        imagePosition: "center 58%",
      },
      links: [
        {
          title: "Checkups and prevention",
          description: "Keep wellness visits, vaccines, and age-appropriate screenings connected to the diabetes plan.",
          href: "/primary-care/checkups-prevention",
        },
        {
          title: "Procedures and diagnostics",
          description: "Learn about in-office testing and diagnostic support available when clinically indicated.",
          href: "/primary-care/procedures-diagnostics",
        },
        {
          title: "Senior primary care",
          description: "Balance diabetes goals with fall risk, memory, medication burden, and other priorities in later life.",
          href: "/primary-care/senior-care",
        },
        {
          title: "High blood pressure care",
          description: "Review home readings, medication concerns, and cardiovascular risk as part of the same care picture.",
          href: "/primary-care/high-blood-pressure-care",
        },
      ],
    },
    faqs: [
      {
        question: "What should I bring to a diabetes care visit?",
        answer:
          "Bring your glucose meter, written log, or CGM report if you already use one; a complete medication and supplement list; recent laboratory results; and dates of your latest eye, kidney, and foot evaluations. Also note any low blood sugar episodes, unusual high readings, side effects, or cost concerns.",
      },
      {
        question: "Does A1C replace my home glucose readings?",
        answer:
          "No. A1C estimates an average over the previous two to three months, while home readings can show daily highs, lows, and timing patterns. A clinician may use one or both depending on your diabetes type, treatment, and risk of hypoglycemia.",
      },
      {
        question: "Why might my diabetes goal differ from someone else's?",
        answer:
          "Diabetes goals are individualized. Age, pregnancy, other medical conditions, medication risks, life expectancy, and prior severe hypoglycemia can all affect what is safe and useful. Do not change a target or medicine without discussing it with your clinician.",
      },
      {
        question: "Which diabetes complications need regular screening?",
        answer:
          "Follow-up commonly considers kidney health, dilated eye exams, foot and nerve checks, blood pressure, cholesterol, and cardiovascular risk. The exact schedule depends on your history and results, and some services may require an outside specialist.",
      },
      {
        question: "When should diabetes care involve an endocrinologist?",
        answer:
          "Referral may be appropriate when the diagnosis is uncertain, glucose remains difficult to control, severe lows recur, a complex insulin plan is needed, pregnancy is involved, or another endocrine condition complicates treatment. Primary care can continue coordinating the rest of your health.",
      },
      {
        question: "Which low or high blood sugar symptoms are emergencies?",
        answer:
          "Call 911 for loss of consciousness, a seizure, severe trouble breathing, or marked confusion. Very high glucose with ketones plus vomiting, fruity-smelling breath, trouble breathing, or inability to keep fluids down can signal diabetic ketoacidosis; go to the emergency department or call 911 according to the severity and your emergency plan.",
      },
    ],
    sources: [
      {
        label: "Managing Diabetes",
        href: "https://www.niddk.nih.gov/health-information/diabetes/overview/managing-diabetes",
        publisher: "National Institute of Diabetes and Digestive and Kidney Diseases",
      },
      {
        label: "Low Blood Glucose (Hypoglycemia)",
        href: "https://www.niddk.nih.gov/health-information/diabetes/overview/preventing-problems/low-blood-glucose-hypoglycemia",
        publisher: "National Institute of Diabetes and Digestive and Kidney Diseases",
      },
      {
        label: "Diabetic Ketoacidosis",
        href: "https://www.cdc.gov/diabetes/about/diabetic-ketoacidosis.html",
        publisher: "Centers for Disease Control and Prevention",
      },
      {
        label: "Standards of Care in Diabetes 2026: Diagnosis and Classification",
        href: "https://diabetesjournals.org/care/article/49/Supplement_1/S27/163926/2-Diagnosis-and-Classification-of-Diabetes",
        publisher: "American Diabetes Association",
      },
    ],
    cta: {
      subtitle: "Diabetes primary care in Naples",
      title: "Bring the pattern. Leave with clearer next steps.",
      description:
        "Call Faithful Care to request a diabetes follow-up visit and ask what records, meter reports, or recent laboratory results to bring.",
      primaryText: "Request diabetes care",
    },
  },

  "/primary-care/high-blood-pressure-care": {
    path: "/primary-care/high-blood-pressure-care",
    category: "Primary Care",
    parentHub: { label: "Back to Primary Care", href: "/primary-care" },
    hero: {
      title: "High blood pressure care built around the pattern, not one reading.",
      subtitleBold: "Make each measurement more useful.",
      subtitle:
        "Faithful Care helps Naples adults review office and home readings, medication concerns, related health risks, and the follow-up needed to build an individualized blood pressure plan.",
      marqueeItems: ["Home log review", "Medication follow-up", "Risk assessment", "Naples, FL"],
      image: assetUrl(heroCheckups),
      imageMobile: assetUrl(heroCheckupsMobile),
      imageAlt: "Primary care clinician checking an adult patient's blood pressure during a preventive visit",
      imagePosition: "80% 12%",
      imagePositionMobile: "100% 38%",
    },
    quickFacts: [
      { icon: TrendUp, label: "What matters", value: "A repeatable pattern, not an isolated number" },
      { icon: Gauge, label: "Bring with you", value: "Upper-arm monitor, home log, and medication list" },
      { icon: Warning, label: "Emergency clue", value: "Very high pressure plus chest, breathing, vision, speech, or weakness symptoms" },
    ],
    sections: [
      {
        type: "care-levels",
        eyebrow: "The 180/120 decision",
        title: "Know what to do with a severely high reading.",
        description:
          "A number alone is not the whole clinical picture. Symptoms determine whether a severely high reading may be a medical emergency.",
        items: [
          {
            tone: "emergency",
            label: "Call 911",
            title: "Above 180/120 with concerning symptoms",
            description:
              "Chest pain, shortness of breath, weakness, numbness, a change in vision, or difficulty speaking with a severely high reading can indicate a hypertensive emergency.",
            action: "Call 911. Do not wait for the pressure to come down on its own.",
          },
          {
            tone: "today",
            label: "Contact a clinician immediately",
            title: "Above 180/120 without those symptoms",
            description:
              "Wait at least one minute and measure again. If the repeat remains this high and you do not have emergency symptoms, contact a healthcare professional immediately for instructions.",
            action: "Do not take an extra dose or change medication unless a clinician has already told you to do so.",
          },
          {
            tone: "routine",
            label: "Schedule a review",
            title: "Readings are repeatedly above your plan",
            description:
              "A recurring pattern, new side effects, missed doses, or uncertainty about technique deserves a structured blood pressure review.",
            action: "Bring your monitor, log, medicines, and questions to the visit.",
          },
        ],
        note: "If you are pregnant or recently gave birth, follow your obstetric team's blood pressure instructions because urgent thresholds and risks can differ.",
      },
      {
        type: "comparison",
        eyebrow: "Two settings, one care plan",
        title: "Office and home readings can tell different parts of the story.",
        description:
          "Blood pressure varies. Consistent technique and a record across time help your clinician decide whether a difference is meaningful.",
        leftHeading: "Office reading",
        rightHeading: "Home reading pattern",
        rows: [
          {
            label: "What it captures",
            left: "A measurement in a clinical setting with the opportunity to verify symptoms and technique.",
            right: "Readings across ordinary days, taken in the environment where you live and take your medicines.",
          },
          {
            label: "Why it can differ",
            left: "Stress, pain, recent activity, conversation, cuff fit, or the clinical setting can affect a reading.",
            right: "Timing, posture, caffeine, exercise, a full bladder, cuff placement, and device accuracy can alter results.",
          },
          {
            label: "How it helps",
            left: "Supports an examination and review of cardiovascular, kidney, medication, and symptom context.",
            right: "Can help identify a persistent pattern, possible white-coat effect, or readings that are higher outside the office.",
          },
          {
            label: "Best next step",
            left: "Ask what the reading means in the context of prior measurements and your health history.",
            right: "Bring the actual monitor and written or digital log so technique and cuff fit can be reviewed.",
          },
        ],
        note: "Diagnosis normally depends on consistently high readings, not a single measurement. Your clinician decides how many readings and which setting are appropriate for you.",
      },
      {
        type: "detail-grid",
        eyebrow: "A useful home log",
        title: "Give each number enough context to guide a decision.",
        description:
          "A short, consistent record is often more helpful than a long list of readings taken under very different conditions.",
        statNumber: "4",
        statLabel: "details turn a home reading into information your care team can interpret",
        cards: [
          {
            icon: Monitor,
            title: "Use a validated upper-arm monitor",
            description:
              "A properly sized upper-arm cuff is generally preferred for home monitoring. Bring the device to a visit so the team can review fit and technique.",
          },
          {
            icon: CalendarCheck,
            title: "Measure on a consistent schedule",
            description:
              "Follow the timing and number of readings your clinician recommends. Sit quietly first and avoid talking during the measurement.",
          },
          {
            icon: Notebook,
            title: "Record the circumstances",
            description:
              "Note the date, time, reading, pulse, medication timing, symptoms, and anything unusual such as illness, pain, poor sleep, or a missed dose.",
          },
          {
            icon: Stethoscope,
            title: "Review the pattern together",
            description:
              "Do not stop or double medication because of a home number unless your clinician has given you a specific written plan.",
          },
        ],
      },
      {
        type: "split-panel",
        eyebrow: "Before medication changes",
        title: "Blood pressure is connected to more than the prescription bottle.",
        description:
          "The safest plan accounts for adherence, side effects, other products, and conditions that can raise pressure or change treatment choices.",
        tone: "plain",
        items: [
          {
            icon: Pill,
            title: "Doses, timing, and side effects",
            description:
              "We review what you take, when you take it, missed doses, dizziness, swelling, cough, or other concerns that may affect safe use.",
          },
          {
            icon: Package,
            title: "Other medicines and supplements",
            description:
              "Pain relievers, decongestants, stimulants, herbal products, and other medicines may affect pressure or interact with a treatment plan.",
          },
          {
            icon: Heartbeat,
            title: "Related health risks",
            description:
              "Diabetes, cholesterol, kidney health, tobacco exposure, sleep, weight, and cardiovascular history help determine the bigger risk picture.",
          },
          {
            icon: TestTube,
            title: "Testing when it is indicated",
            description:
              "Laboratory tests or an EKG may be appropriate depending on symptoms, history, medicines, and prior results. They are not an automatic package for every patient.",
          },
        ],
      },
      {
        type: "visit-steps",
        eyebrow: "Your review, step by step",
        title: "From scattered readings to a documented plan.",
        subtitle:
          "The goal is to leave knowing what the pattern means, what you should do next, and when the plan will be checked again.",
        steps: [
          {
            icon: Gauge,
            title: "Validate the measurement",
            description:
              "Review cuff size, body position, timing, monitor accuracy, and the circumstances around unusually high or low readings.",
          },
          {
            icon: ClipboardText,
            title: "Review risk and treatment barriers",
            description:
              "Discuss medicines, side effects, other medical conditions, diet, activity, sleep, tobacco, stress, and what is realistically sustainable.",
          },
          {
            icon: ListChecks,
            title: "Set targets and follow-up together",
            description:
              "Confirm your individual goal, how to monitor, which symptoms should trigger a call, and when to return or repeat testing.",
          },
        ],
        ctaText: "Review blood pressure",
        ctaHref: "/contact",
      },
    ],
    related: {
      eyebrow: "Connected care",
      title: "Protect the heart, kidneys, and daily independence together.",
      description:
        "Blood pressure follow-up is stronger when it stays connected to diabetes, preventive care, medication safety, and the tests your history actually supports.",
      featured: {
        title: "Chronic disease management",
        description:
          "Keep blood pressure, diabetes, cholesterol, kidney health, and medication decisions visible in one primary care plan.",
        href: "/primary-care/chronic-disease",
        image: assetUrl(naplesBloodPressure),
        imageAlt: "Sunlit aerial view of the Naples, Florida shoreline and palm-lined neighborhoods",
        imagePosition: "center 58%",
      },
      links: [
        {
          title: "Diabetes care",
          description: "Connect glucose, kidney, and cardiovascular risk review with the blood pressure plan.",
          href: "/primary-care/diabetes-care",
        },
        {
          title: "Checkups and prevention",
          description: "Use routine visits to keep screening, medication review, and risk reduction on schedule.",
          href: "/primary-care/checkups-prevention",
        },
        {
          title: "Procedures and diagnostics",
          description: "Explore in-office testing, including EKG and laboratory support when clinically indicated.",
          href: "/primary-care/procedures-diagnostics",
        },
        {
          title: "Contact Faithful Care",
          description: "Ask what readings, medicines, and records to bring to a blood pressure appointment.",
          href: "/contact",
        },
      ],
    },
    faqs: [
      {
        question: "Can one high reading mean I have hypertension?",
        answer:
          "One reading usually does not establish a diagnosis. Blood pressure changes with activity, stress, pain, technique, and other factors. Diagnosis generally uses consistently high readings, often from more than one occasion or setting, interpreted by a clinician.",
      },
      {
        question: "What kind of home blood pressure monitor should I use?",
        answer:
          "A validated automatic monitor with a correctly sized upper-arm cuff is generally preferred. Wrist and finger devices can be less reliable for many people. Bring your monitor to an appointment so the care team can compare it and review your technique.",
      },
      {
        question: "Why are my readings different at home and in the office?",
        answer:
          "Stress, pain, recent activity, cuff fit, posture, timing, caffeine, and the measurement setting can all affect a result. Some people have higher readings in the office, while others are higher at home. A consistent log helps your clinician interpret the difference.",
      },
      {
        question: "Can medicines or supplements affect blood pressure?",
        answer:
          "Yes. Some pain relievers, decongestants, stimulants, hormonal medicines, and herbal products can affect blood pressure or interact with treatment. Bring a complete list and do not stop a prescribed medicine without medical guidance.",
      },
      {
        question: "How often should my blood pressure plan be reviewed?",
        answer:
          "The interval depends on your readings, symptoms, medications, kidney and cardiovascular risk, recent treatment changes, and whether the pressure is stable. Your clinician should document when to monitor at home and when to return.",
      },
      {
        question: "Exactly when should I call 911 for high blood pressure?",
        answer:
          "If a reading is above 180/120 and you also have chest pain, shortness of breath, weakness, numbness, a vision change, or difficulty speaking, call 911. If it remains above 180/120 after repeating it at least one minute later but those symptoms are absent, contact a healthcare professional immediately for instructions.",
      },
    ],
    sources: [
      {
        label: "High Blood Pressure Diagnosis",
        href: "https://www.nhlbi.nih.gov/health/high-blood-pressure/diagnosis",
        publisher: "National Heart, Lung, and Blood Institute",
      },
      {
        label: "Home Blood Pressure Monitoring",
        href: "https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings/monitoring-your-blood-pressure-at-home",
        publisher: "American Heart Association",
      },
      {
        label: "When You Should Call 911 for a Hypertensive Crisis",
        href: "https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings/hypertensive-crisis-when-you-should-call-911",
        publisher: "American Heart Association",
      },
      {
        label: "2025 High Blood Pressure Guideline: Top Things to Know",
        href: "https://professional.heart.org/en/science-news/2025-high-blood-pressure-guideline/top-things-to-know",
        publisher: "American Heart Association and American College of Cardiology",
      },
    ],
    cta: {
      subtitle: "Blood pressure care in Naples",
      title: "Make the next reading part of a clearer plan.",
      description:
        "Call Faithful Care to request a blood pressure review and ask how many home readings, medicines, and prior results to bring.",
      primaryText: "Review blood pressure",
    },
  },

  "/primary-care/copd-care": {
    path: "/primary-care/copd-care",
    category: "Primary Care",
    parentHub: { label: "Back to Primary Care", href: "/primary-care" },
    hero: {
      title: "COPD care for breathing, flare-ups, and everyday life.",
      subtitleBold: "Know your baseline. Prepare for change.",
      subtitle:
        "Faithful Care helps Naples adults review COPD symptoms, inhaler use, prevention needs, and warning signs while coordinating pulmonary testing, rehabilitation, or specialist care when appropriate.",
      marqueeItems: ["Breathing baseline", "Inhaler review", "Flare-up planning", "Naples, FL"],
      image: assetUrl(heroSameDayVisits),
      imageMobile: assetUrl(heroSameDayVisitsMobile),
      imageAlt: "Primary care clinician speaking with an adult patient about chronic lung health",
      imagePosition: "82% top",
      imagePositionMobile: "100% 46%",
    },
    quickFacts: [
      { icon: Wind, label: "Care focus", value: "Breathing baseline, inhalers, and flare-up prevention" },
      { icon: Stethoscope, label: "Diagnosis", value: "COPD should be confirmed with spirometry" },
      { icon: FirstAid, label: "Plan ahead", value: "Know which changes need a call and which need 911" },
    ],
    sections: [
      {
        type: "comparison",
        eyebrow: "Start with the right question",
        title: "COPD should be confirmed, not assumed from shortness of breath.",
        description:
          "Symptoms and exposure history raise suspicion, but other heart and lung conditions can look similar. Spirometry is used to confirm persistent airflow obstruction.",
        leftHeading: "Clues that prompt evaluation",
        rightHeading: "What confirms and guides care",
        rows: [
          {
            label: "Symptoms",
            left: "Persistent cough, mucus, wheezing, chest tightness, or breathlessness with usual activity.",
            right: "A clinical history, examination, and spirometry interpreted in the context of symptoms and risk factors.",
          },
          {
            label: "Exposure history",
            left: "Current or prior tobacco use, secondhand smoke, workplace dust, fumes, air pollution, or biomass exposure.",
            right: "The exposure history helps estimate risk, but it does not prove COPD by itself.",
          },
          {
            label: "Similar conditions",
            left: "Asthma, heart disease, infection, anemia, deconditioning, and other problems can also affect breathing.",
            right: "Additional testing or referral may be needed when the history, examination, and breathing test do not tell one clear story.",
          },
          {
            label: "Faithful Care's role",
            left: "Review symptoms, prior records, exposures, medicines, and the effect on daily activity.",
            right: "Coordinate spirometry or pulmonary referral when confirmation or specialist input is needed.",
          },
        ],
        note: "Faithful Care does not present symptoms alone as a COPD diagnosis. Availability and location of spirometry should be confirmed when the visit is scheduled.",
        sources: [
          { label: "NHLBI COPD Diagnosis", href: "https://www.nhlbi.nih.gov/health/copd/diagnosis" },
          { label: "GOLD Spirometry Guide", href: "https://goldcopd.org/spirometry-quick-guide/" },
        ],
      },
      {
        type: "detail-grid",
        eyebrow: "Know your breathing baseline",
        title: "Recognize a real change before it becomes a crisis.",
        description:
          "Your usual activity, cough, mucus, and medicine use form a personal baseline. Writing it down makes a change easier to describe and act on.",
        statNumber: "4",
        statLabel: "baseline details help separate an ordinary day from a possible COPD flare-up",
        cards: [
          {
            icon: PersonSimpleWalk,
            title: "Usual activity",
            description:
              "Note the walking distance, stairs, chores, and rest breaks that are typical for you, plus any recent loss of stamina.",
          },
          {
            icon: Wind,
            title: "Usual breathing and cough",
            description:
              "Describe your normal breathlessness, cough, wheeze, chest tightness, and amount or color of mucus when you are stable.",
          },
          {
            icon: Pill,
            title: "Usual medicine use",
            description:
              "Track maintenance and rescue inhaler use, missed doses, technique problems, and whether relief is different from normal.",
          },
          {
            icon: ClipboardText,
            title: "Recent setbacks",
            description:
              "Bring dates of urgent visits, steroid or antibiotic courses, emergency care, hospital stays, and any follow-up recommendations.",
          },
        ],
      },
      {
        type: "split-panel",
        eyebrow: "Bring every inhaler",
        title: "The device matters as much as the name on the label.",
        description:
          "Inhalers differ in purpose and technique. A hands-on review can reveal confusion, missed maintenance doses, or a device that is difficult to use correctly.",
        tone: "navy",
        items: [
          {
            icon: Package,
            title: "Identify each device's job",
            description:
              "Confirm which inhaler is for regular control, which is for quick relief, and the exact instructions written for you.",
          },
          {
            icon: ArrowsClockwise,
            title: "Demonstrate your technique",
            description:
              "Show how you prepare, inhale, hold your breath, clean, and store each device. Technique varies by inhaler type.",
          },
          {
            icon: Monitor,
            title: "Track whether it helps",
            description:
              "Discuss rescue use, night symptoms, activity limits, side effects, and whether a medicine works differently than it used to.",
          },
          {
            icon: ShieldCheck,
            title: "Remove practical barriers",
            description:
              "Hand strength, coordination, vision, memory, cost, and refill access can all affect whether a prescribed device is usable.",
          },
        ],
      },
      {
        type: "care-levels",
        eyebrow: "Your flare-up action guide",
        title: "A breathing change, a same-day call, or an emergency?",
        description:
          "COPD action plans should be individualized. These warning signs help explain why some changes should not wait for a routine appointment.",
        items: [
          {
            tone: "emergency",
            label: "Call 911",
            title: "Breathing is severely impaired",
            description:
              "Severe trouble breathing or talking, blue or gray lips or nails, confusion, a very fast heartbeat, or rescue treatment that is not working can signal an emergency.",
            action: "Call 911 and use emergency medicines only as directed in your personal plan.",
          },
          {
            tone: "today",
            label: "Call the care team today",
            title: "Symptoms changed from your baseline",
            description:
              "More breathlessness, new chest tightness, fever, increased cough, or more or differently colored mucus can be signs of a flare-up or infection.",
            action: "Contact a clinician promptly. Do not start leftover antibiotics or steroids unless your written plan specifically directs it.",
          },
          {
            tone: "routine",
            label: "Schedule follow-up",
            title: "The plan needs maintenance",
            description:
              "Book a visit for inhaler technique, prevention, activity limits, smoking cessation support, vaccination review, or follow-up after urgent care or hospitalization.",
            action: "Bring every inhaler and all recent discharge or pulmonary records.",
          },
        ],
        note: "New or unexplained shortness of breath should not automatically be attributed to COPD. Heart, lung, blood, and other conditions may need evaluation.",
      },
      {
        type: "visit-steps",
        eyebrow: "A practical COPD review",
        title: "Build a plan you and your family can follow.",
        subtitle:
          "A good visit documents your baseline, simplifies device instructions, and states exactly what should happen when breathing changes.",
        steps: [
          {
            icon: ClipboardText,
            title: "Reconstruct the recent pattern",
            description:
              "Review symptoms, activity, exposures, smoking history, urgent visits, hospital stays, and any prior breathing tests or imaging.",
          },
          {
            icon: Pill,
            title: "Review medicines and technique",
            description:
              "Bring every inhaler, spacer, nebulizer medicine, prescription, and supplement so the full routine and barriers are visible.",
          },
          {
            icon: ListChecks,
            title: "Write the next-step plan",
            description:
              "Confirm prevention priorities, referrals, follow-up timing, early flare-up signs, and which severe symptoms require 911.",
          },
        ],
        ctaText: "Review COPD plan",
        ctaHref: "/contact",
      },
      {
        type: "split-panel",
        eyebrow: "Reduce the next setback",
        title: "COPD care continues between appointments.",
        description:
          "Prevention cannot remove every flare-up, but it can reduce avoidable risks and strengthen recovery when a setback occurs.",
        tone: "light",
        items: [
          {
            icon: ShieldCheck,
            title: "Address tobacco and irritants",
            description:
              "Stopping smoking is one of the most important steps for people who smoke. Also discuss dust, fumes, secondhand smoke, and local air-quality exposures.",
          },
          {
            icon: FirstAid,
            title: "Review applicable vaccines",
            description:
              "Respiratory infections can trigger COPD exacerbations. Your clinician can review which influenza, COVID-19, pneumococcal, or other vaccines apply to you.",
          },
          {
            icon: PersonSimpleWalk,
            title: "Ask about pulmonary rehabilitation",
            description:
              "A supervised pulmonary rehabilitation program can combine exercise, education, and breathing strategies. Faithful Care can help discuss whether referral is appropriate.",
          },
          {
            icon: Heartbeat,
            title: "Add support when illness advances",
            description:
              "Palliative care can help with symptoms, stress, and family support while COPD treatment continues. It is not the same as hospice.",
          },
        ],
      },
    ],
    related: {
      eyebrow: "Connected care",
      title: "Keep lungs, daily function, and serious-illness support connected.",
      description:
        "COPD may involve primary care, pulmonology, rehabilitation, urgent evaluation, and palliative support. Clear handoffs reduce fragmented instructions.",
      featured: {
        title: "Chronic disease management",
        description:
          "Coordinate COPD alongside heart health, diabetes, medications, prevention, and the other conditions that affect breathing and independence.",
        href: "/primary-care/chronic-disease",
        image: assetUrl(naplesCopd),
        imageAlt: "Aerial view of beachfront homes and the Gulf shoreline in Naples, Florida",
        imagePosition: "center 56%",
      },
      links: [
        {
          title: "Same-day sick visits",
          description: "Seek prompt evaluation for non-emergency respiratory changes when an appointment is appropriate.",
          href: "/primary-care/same-day-visits",
        },
        {
          title: "Palliative symptom relief",
          description: "Add support for breathlessness, fatigue, discomfort, and stress while COPD treatment continues.",
          href: "/palliative-care/symptom-relief",
        },
        {
          title: "About palliative care",
          description: "Understand how palliative care differs from hospice and when it can join an existing treatment plan.",
          href: "/palliative-care/about-palliative-care",
        },
        {
          title: "Contact Faithful Care",
          description: "Ask which inhalers, records, and breathing-test results to bring to a COPD review.",
          href: "/contact",
        },
      ],
    },
    faqs: [
      {
        question: "Do I need spirometry to confirm COPD?",
        answer:
          "Spirometry is used to confirm persistent airflow obstruction and is an important part of a COPD diagnosis. Symptoms and smoking or exposure history can raise suspicion, but they do not confirm COPD by themselves. Ask where and how your testing will be completed.",
      },
      {
        question: "Can primary care manage COPD between pulmonology visits?",
        answer:
          "Primary care can help review symptoms, inhaler use, prevention, related conditions, and follow-up after urgent care or hospitalization. Pulmonology may be needed for uncertain diagnosis, complex symptoms, advanced disease, oxygen questions, or specialized testing.",
      },
      {
        question: "Why should I bring all my inhalers to the appointment?",
        answer:
          "Different inhalers have different purposes and techniques. Bringing every device lets the care team confirm the instructions, watch how you use it, identify duplicates or empty devices, and discuss hand strength, coordination, side effects, or cost barriers.",
      },
      {
        question: "How is a COPD flare-up different from an emergency?",
        answer:
          "A flare-up may begin with more breathlessness, cough, chest tightness, fever, or a change in mucus and deserves prompt clinical guidance. Severe trouble breathing or talking, blue or gray lips or nails, confusion, or rescue treatment that is not working requires 911.",
      },
      {
        question: "Can pulmonary rehabilitation help?",
        answer:
          "Pulmonary rehabilitation can combine supervised exercise, education, and strategies for living with chronic lung disease. A clinician can determine whether it is appropriate and arrange a referral. It is not presented as an in-office Faithful Care service.",
      },
      {
        question: "Can palliative care help with advanced COPD?",
        answer:
          "Yes. Palliative care can address breathlessness, fatigue, discomfort, anxiety, family needs, and care coordination while COPD treatment continues. Receiving palliative care does not automatically mean stopping treatment or entering hospice.",
      },
    ],
    sources: [
      {
        label: "COPD Diagnosis",
        href: "https://www.nhlbi.nih.gov/health/copd/diagnosis",
        publisher: "National Heart, Lung, and Blood Institute",
      },
      {
        label: "COPD Symptoms and Emergency Signs",
        href: "https://www.nhlbi.nih.gov/health/copd/symptoms",
        publisher: "National Heart, Lung, and Blood Institute",
      },
      {
        label: "COPD Treatment",
        href: "https://www.nhlbi.nih.gov/health/copd/treatment",
        publisher: "National Heart, Lung, and Blood Institute",
      },
      {
        label: "Spirometry Quick Guide",
        href: "https://goldcopd.org/spirometry-quick-guide/",
        publisher: "Global Initiative for Chronic Obstructive Lung Disease",
      },
    ],
    cta: {
      subtitle: "COPD primary care in Naples",
      title: "Make your breathing baseline and flare-up plan easier to use.",
      description:
        "Call Faithful Care to request a COPD review and ask which inhalers, hospital records, and breathing-test results to bring.",
      primaryText: "Review COPD plan",
    },
  },

  "/primary-care/thyroid-care": {
    path: "/primary-care/thyroid-care",
    category: "Primary Care",
    parentHub: { label: "Back to Primary Care", href: "/primary-care" },
    hero: {
      title: "Thyroid care that connects symptoms, labs, and medication.",
      subtitleBold: "Symptoms are clues. Testing supplies the context.",
      subtitle:
        "Faithful Care helps Naples adults evaluate possible thyroid concerns, interpret appropriate laboratory results, review thyroid medication, and coordinate specialist care when the picture is complex.",
      marqueeItems: ["Symptom review", "Thyroid labs", "Medication follow-up", "Naples, FL"],
      image: assetUrl(heroYoungWoman),
      imageMobile: assetUrl(heroYoungWomanMobile),
      imageAlt: "Primary care clinician checking an adult patient's neck during a thyroid evaluation",
      imagePosition: "84% top",
      imagePositionMobile: "100% 42%",
    },
    quickFacts: [
      { icon: TestTube, label: "Common starting point", value: "TSH, with additional tests based on the result and history" },
      { icon: Pill, label: "Medication review", value: "Dose, timing, missed doses, symptoms, and interactions" },
      { icon: Stethoscope, label: "Care pathway", value: "Primary care follow-up with referral when findings are complex" },
    ],
    sections: [
      {
        type: "detail-grid",
        eyebrow: "Symptoms are clues",
        eyebrowColor: "secondary",
        title: "A thyroid evaluation starts by avoiding premature conclusions.",
        description:
          "Fatigue, weight change, temperature sensitivity, bowel changes, palpitations, mood, and sleep concerns can come from many conditions. The pattern and laboratory context matter.",
        statNumber: "4",
        statLabel: "parts of the history help decide whether thyroid testing is appropriate and what comes next",
        cards: [
          {
            icon: Notebook,
            title: "Build a symptom timeline",
            description:
              "Record when symptoms began, whether they are worsening, and what else changed around that time. A timeline is more useful than a list without dates.",
          },
          {
            icon: Heartbeat,
            title: "Look for connected signs",
            description:
              "Heart rate, bowel habits, menstrual changes, sleep, mood, skin or hair changes, neck symptoms, and temperature tolerance add important context.",
          },
          {
            icon: Package,
            title: "Review medicines and supplements",
            description:
              "Thyroid medicine timing and products such as biotin can affect treatment or test interpretation. Bring names, doses, and when you take them.",
          },
          {
            icon: TestTube,
            title: "Test according to the question",
            description:
              "TSH is often the starting test. Free T4, T3, antibodies, or imaging may be added when the history and initial results support them.",
          },
        ],
      },
      {
        type: "split-panel",
        eyebrow: "What thyroid tests can answer",
        title: "Not every patient needs every thyroid test.",
        description:
          "The most useful sequence starts with the clinical question, then adds tests only when they can clarify diagnosis or guide follow-up.",
        tone: "light",
        items: [
          {
            icon: Gauge,
            title: "TSH",
            description:
              "TSH is commonly the first blood test used to evaluate thyroid function. Its meaning depends on the laboratory range, symptoms, medicines, pregnancy, and other clinical context.",
          },
          {
            icon: TestTube,
            title: "Free T4",
            description:
              "Free T4 can help distinguish an underactive from an overactive thyroid and clarify an abnormal TSH result.",
          },
          {
            icon: Pulse,
            title: "T3",
            description:
              "T3 can be useful in selected evaluations, especially suspected hyperthyroidism, but it is not a universal add-on for every symptom or TSH result.",
          },
          {
            icon: ShieldCheck,
            title: "Antibodies or imaging",
            description:
              "Antibody testing, ultrasound, or other studies answer specific questions. They are ordered according to results, examination, pregnancy, or neck findings rather than as a routine package.",
          },
        ],
      },
      {
        type: "comparison",
        eyebrow: "From clue to decision",
        title: "Symptoms become actionable when the context supports them.",
        description:
          "A symptom can start the conversation, but the examination, medicine history, and targeted tests help determine whether the thyroid is actually involved.",
        leftHeading: "Possible clue",
        rightHeading: "What adds clinical meaning",
        rows: [
          {
            label: "Fatigue or weight change",
            left: "Can occur with thyroid disease, but also with sleep problems, anemia, mood conditions, medicines, nutrition, and many other causes.",
            right: "A timeline, examination, TSH and selected tests, medication review, and evaluation for other likely causes.",
          },
          {
            label: "Palpitations or heat intolerance",
            left: "May occur in hyperthyroidism but can also reflect heart rhythm, anxiety, infection, medicines, or other conditions.",
            right: "Heart rate and rhythm assessment, thyroid tests, medication and stimulant review, and urgent evaluation when symptoms are severe.",
          },
          {
            label: "Cold intolerance or constipation",
            left: "Can occur in hypothyroidism but does not confirm it without compatible laboratory findings.",
            right: "TSH and free T4 interpreted with age, health history, symptoms, and any current thyroid treatment.",
          },
          {
            label: "Neck lump or swallowing change",
            left: "May point to thyroid enlargement or a nodule but can have other causes.",
            right: "A neck examination and, when indicated, specialist assessment or imaging rather than routine thyroid-function tests alone.",
          },
        ],
        note: "Do not start thyroid supplements or change prescription thyroid medicine based only on symptoms or an online laboratory result.",
      },
      {
        type: "visit-steps",
        eyebrow: "When you take thyroid medicine",
        title: "Make dose follow-up easier to interpret.",
        subtitle:
          "Timing, consistency, interactions, and the interval between a dose change and repeat testing all affect what a laboratory result means.",
        steps: [
          {
            icon: Pill,
            title: "Document the exact routine",
            description:
              "Bring the bottle and record the dose, time of day, how you take it relative to food, missed doses, and any recent brand or formulation change.",
          },
          {
            icon: Package,
            title: "List products that may interfere",
            description:
              "Include vitamins and supplements, especially biotin, plus calcium, iron, antacids, and other medicines. Follow clinician and laboratory instructions before testing.",
          },
          {
            icon: CalendarCheck,
            title: "Retest at the right interval",
            description:
              "After starting or changing levothyroxine, clinicians often recheck thyroid function in about six to eight weeks, then individualize longer-term monitoring once stable.",
          },
        ],
        ctaText: "Review thyroid care",
        ctaHref: "/contact",
      },
      {
        type: "split-panel",
        eyebrow: "When care needs another layer",
        title: "Primary care can coordinate the next specialist or test.",
        description:
          "Some findings move beyond routine monitoring. The goal is a clear handoff, not duplicate tests or competing medication instructions.",
        tone: "navy",
        items: [
          {
            icon: Stethoscope,
            title: "A neck nodule or enlargement",
            description:
              "A lump, visible enlargement, or new swallowing or voice change may require imaging or specialist evaluation based on the examination.",
          },
          {
            icon: Heartbeat,
            title: "Complex hyperthyroidism",
            description:
              "Marked symptoms, eye involvement, rhythm concerns, or difficult-to-interpret results may require endocrinology and sometimes other specialists.",
          },
          {
            icon: ShieldCheck,
            title: "Pregnancy or plans for pregnancy",
            description:
              "Thyroid needs and medication monitoring can change before and during pregnancy. Contact the prescribing and obstetric teams promptly rather than waiting for routine follow-up.",
          },
          {
            icon: ArrowsClockwise,
            title: "Results that do not fit the pattern",
            description:
              "Discordant tests, concern about pituitary disease, or persistent symptoms despite stable thyroid results may require broader evaluation.",
          },
        ],
      },
      {
        type: "care-levels",
        eyebrow: "Know when to call",
        title: "Most thyroid follow-up is routine, but severe symptoms should not wait.",
        description:
          "Urgent symptoms can have many causes. Do not assume they are only the thyroid, especially when the heart, breathing, or mental status is affected.",
        items: [
          {
            tone: "emergency",
            label: "Call 911",
            title: "Severe heart, breathing, or mental-status symptoms",
            description:
              "Chest pain, fainting, severe trouble breathing, marked confusion, or a very fast or irregular heartbeat can be a medical emergency.",
            action: "Call 911. Do not wait for a thyroid laboratory result or drive yourself.",
          },
          {
            tone: "today",
            label: "Seek medical care immediately",
            title: "Fever or a severe sore throat on an antithyroid medicine",
            description:
              "Methimazole and propylthiouracil can rarely cause a dangerous drop in white blood cells. Fever or a severe sore throat while taking either medicine needs immediate medical evaluation and a complete blood count.",
            action: "Do not take another dose until the prescribing clinician has checked the result and cleared you to restart it.",
          },
          {
            tone: "routine",
            label: "Schedule follow-up",
            title: "Symptoms, labs, or medication need review",
            description:
              "Book a visit for an abnormal thyroid result, persistent compatible symptoms, a medication refill that needs monitoring, or follow-up after a dose change.",
            action: "Bring prior results, the medication bottle, supplements, and a dated symptom timeline.",
          },
        ],
        note: "Contact your clinician promptly if you become pregnant or are planning pregnancy while taking thyroid medicine. Do not stop treatment on your own.",
      },
    ],
    related: {
      eyebrow: "Connected care",
      title: "Keep thyroid questions connected to the rest of your health.",
      description:
        "Fatigue, weight change, palpitations, medication interactions, pregnancy, and aging may cross several areas of care. A coordinated record prevents tunnel vision.",
      featured: {
        title: "Procedures and diagnostics",
        description:
          "Learn how Faithful Care uses laboratory and in-office diagnostic support when the clinical question makes testing appropriate.",
        href: "/primary-care/procedures-diagnostics",
        image: assetUrl(naplesThyroid),
        imageAlt: "Aerial view of the Naples coastline between the Gulf of Mexico and mangrove waterways",
        imagePosition: "center 55%",
      },
      links: [
        {
          title: "Chronic disease management",
          description: "Coordinate thyroid follow-up with diabetes, blood pressure, cholesterol, and other ongoing conditions.",
          href: "/primary-care/chronic-disease",
        },
        {
          title: "Women's health",
          description: "Connect thyroid concerns with menstrual changes, pregnancy planning, menopause, and preventive care.",
          href: "/primary-care/womens-health",
        },
        {
          title: "Senior primary care",
          description: "Review thyroid medicine in the context of falls, heart rhythm, cognition, and multiple prescriptions.",
          href: "/primary-care/senior-care",
        },
        {
          title: "New patients",
          description: "See what records, medication bottles, and laboratory results help prepare for a first visit.",
          href: "/new-patients",
        },
      ],
    },
    faqs: [
      {
        question: "Can fatigue or weight gain diagnose a thyroid problem?",
        answer:
          "No. Fatigue and weight change can occur with thyroid disease, but they also have many other causes. A clinician combines your symptom timeline, examination, medicine history, and appropriate laboratory tests before attributing them to the thyroid.",
      },
      {
        question: "What is the difference between TSH, T4, and T3?",
        answer:
          "TSH is commonly the first test used to evaluate thyroid function. Free T4 helps clarify whether the thyroid may be underactive or overactive. T3 is useful in selected situations, especially suspected hyperthyroidism. The tests are interpreted together with symptoms and clinical context.",
      },
      {
        question: "Why is bloodwork repeated after a thyroid dose change?",
        answer:
          "The body needs time to reach a new steady level after a levothyroxine change. Clinicians often recheck thyroid function in about six to eight weeks, then adjust the schedule based on the result, symptoms, pregnancy status, and other health factors.",
      },
      {
        question: "Can biotin or other supplements affect thyroid results?",
        answer:
          "Yes. Biotin can interfere with some thyroid laboratory tests, and calcium, iron, antacids, and other products can affect absorption of thyroid medicine. Tell the clinician and laboratory exactly what you take and follow their instructions before testing.",
      },
      {
        question: "When does a thyroid concern need an endocrinologist?",
        answer:
          "Referral may be appropriate for complex hyperthyroidism, thyroid eye symptoms, pregnancy-related concerns, a thyroid nodule or enlarged gland, difficult-to-interpret tests, possible pituitary disease, or symptoms that remain unexplained despite appropriate evaluation.",
      },
      {
        question: "What should I do if I become pregnant while taking thyroid medicine?",
        answer:
          "Contact the clinician who prescribes the thyroid medicine and your obstetric team promptly. Thyroid hormone needs and monitoring can change early in pregnancy. Do not stop or change the dose on your own unless your clinician has given you a specific plan.",
      },
    ],
    sources: [
      {
        label: "Thyroid Tests",
        href: "https://www.niddk.nih.gov/health-information/diagnostic-tests/thyroid",
        publisher: "National Institute of Diabetes and Digestive and Kidney Diseases",
      },
      {
        label: "Hypothyroidism",
        href: "https://www.niddk.nih.gov/health-information/endocrine-diseases/hypothyroidism",
        publisher: "National Institute of Diabetes and Digestive and Kidney Diseases",
      },
      {
        label: "Hyperthyroidism",
        href: "https://www.niddk.nih.gov/health-information/endocrine-diseases/hyperthyroidism",
        publisher: "National Institute of Diabetes and Digestive and Kidney Diseases",
      },
      {
        label: "Thyroid Function Tests",
        href: "https://www.thyroid.org/thyroid-function-tests/",
        publisher: "American Thyroid Association",
      },
      {
        label: "Hyperthyroidism and Antithyroid Drug Safety",
        href: "https://www.thyroid.org/hyperthyroidism/",
        publisher: "American Thyroid Association",
      },
      {
        label: "Adult Hypothyroidism",
        href: "https://www.thyroid.org/hypothyroidism/",
        publisher: "American Thyroid Association",
      },
    ],
    cta: {
      subtitle: "Thyroid primary care in Naples",
      title: "Bring the symptoms, the lab history, and the exact medication routine together.",
      description:
        "Call Faithful Care to request a thyroid review and ask which previous results, medicines, and supplements to bring.",
      primaryText: "Review thyroid care",
    },
  },
} satisfies ConditionPageMap;
