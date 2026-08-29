import {
  ArrowsClockwise,
  ChatCircleDots,
  ClipboardText,
  Drop,
  ForkKnife,
  Gauge,
  HandHeart,
  Heartbeat,
  ListChecks,
  Moon,
  Notebook,
  Package,
  PersonSimpleWalk,
  Pill,
  Pulse,
  ShieldCheck,
  Stethoscope,
  UsersThree,
  Warning,
  Waves,
  Wind,
} from "@phosphor-icons/react";
import heroWoman from "@/assets/images/hero-doctor-woman.optimized.webp";
import heroWomanMobile from "@/assets/images/hero-doctor-woman.mobile.webp";
import heroSeniorMan from "@/assets/images/hero-doctor-senior-man.optimized.webp";
import heroSeniorManMobile from "@/assets/images/hero-doctor-senior-man.mobile.webp";
import heroYoungWoman from "@/assets/images/hero-doctor-young-woman.optimized.webp";
import heroSameDayVisits from "@/assets/images/hero-same-day-visits.optimized.webp";
import heroSameDayVisitsMobile from "@/assets/images/hero-same-day-visits.mobile.webp";
import heroYoungMan from "@/assets/images/hero-doctor-young-man.optimized.webp";
import heroYoungManMobile from "@/assets/images/hero-doctor-young-man.mobile.webp";
import naplesCancer from "@/assets/images/hero-naples-v5.optimized.webp";
import naplesHeartFailure from "@/assets/images/hero-naples-v6.optimized.webp";
import naplesCopd from "@/assets/images/hero-naples-v7.optimized.webp";
import naplesKidney from "@/assets/images/hero-naples-v8.optimized.webp";
import { assetUrl } from "@/lib/asset-url";
import type { ConditionPageMap } from "@/lib/condition-page-types";

export const palliativeConditionPagesA = {
  "/palliative-care/for-cancer": {
    path: "/palliative-care/for-cancer",
    category: "Palliative Care",
    parentHub: { label: "Back to Palliative Care", href: "/palliative-care" },
    hero: {
      title: "Cancer support that makes room for comfort, treatment, and the life around both.",
      subtitleBold: "Palliative care can begin while oncology treatment continues.",
      subtitle:
        "Faithful Care helps Naples patients and families organize symptoms, treatment side effects, priorities, and questions so the oncology team receives a clearer picture of what is happening between visits.",
      marqueeItems: ["Alongside oncology", "Symptom timeline", "Family communication", "Naples, FL"],
      image: assetUrl(heroWoman),
      imageMobile: assetUrl(heroWomanMobile),
      imageAlt: "Clinician listening to an adult patient during a cancer symptom and care-planning visit",
      imagePosition: "84% top",
      imagePositionMobile: "100% 42%",
    },
    urgentNotice: {
      title: "Chemotherapy and fever need a specific plan",
      description:
        "The CDC advises that a temperature of 100.4°F (38°C) or higher during chemotherapy is a medical emergency. Call the oncology number you were given immediately and follow its emergency instructions; do not wait for a routine appointment.",
    },
    quickFacts: [
      { icon: Stethoscope, label: "Works alongside", value: "Oncology and the rest of your treating team" },
      { icon: Notebook, label: "Bring with you", value: "A dated symptom and treatment timeline" },
      { icon: HandHeart, label: "Care focus", value: "Comfort, function, communication, and personal goals" },
    ],
    sections: [
      {
        type: "detail-grid",
        eyebrow: "See the whole treatment week",
        eyebrowColor: "secondary",
        title: "Six details can turn ‘I feel worse’ into a useful clinical conversation.",
        description:
          "Cancer and its treatments affect people differently. Recording the pattern, timing, and impact of a symptom helps the treating teams decide what needs urgent attention and what may need a more durable support plan.",
        statNumber: "6",
        statLabel: "connected details give the team a more complete picture than a symptom name alone",
        cards: [
          {
            icon: ClipboardText,
            title: "Timing and treatment",
            description:
              "Note when the symptom began, which treatment or procedure came before it, whether it follows a cycle, and whether it is improving, stable, or getting worse.",
          },
          {
            icon: Gauge,
            title: "Intensity and interference",
            description:
              "Describe what the symptom prevents: eating, sleeping, walking, working, thinking, or completing basic personal care. Function often makes severity easier to understand.",
          },
          {
            icon: ForkKnife,
            title: "Food, fluids, and weight",
            description:
              "Report persistent nausea, vomiting, mouth or throat problems, taste changes, reduced intake, dehydration concerns, or meaningful weight change to the oncology team.",
          },
          {
            icon: Moon,
            title: "Sleep, fatigue, and mood",
            description:
              "Fatigue, insomnia, anxiety, sadness, and fear can reinforce one another. Include emotional distress rather than treating it as separate from physical care.",
          },
          {
            icon: Pill,
            title: "Medicines and side effects",
            description:
              "Bring every prescription, supplement, and nonprescription product. Record what was taken, when, what helped, and any constipation, sedation, dizziness, or other concern.",
          },
          {
            icon: UsersThree,
            title: "Patient and family priorities",
            description:
              "Name the next decision, the patient’s main goal, and the practical burden the family is carrying so support can be connected to what matters now.",
          },
        ],
      },
      {
        type: "editorial",
        eyebrow: "Build a treatment-and-symptom timeline",
        title: "Patterns between oncology visits can change the next conversation.",
        description:
          "A symptom diary does not need to become a second job. A short dated entry can connect an infusion, medication change, procedure, meal, or activity with pain, nausea, breathlessness, bowel changes, sleep, and energy. Include the response to any plan already prescribed. The goal is not to diagnose the cause at home; it is to give oncology and palliative care enough context to act safely.",
        image: assetUrl(naplesCancer),
        imageAlt: "Peaceful waterfront and palm-lined neighborhood in Naples, Florida",
        imagePosition: "center 56%",
        bullets: [
          "Write the date, treatment day, symptom, severity, and effect on normal activity.",
          "Record temperature when you feel warm, flushed, chilled, or unwell during chemotherapy.",
          "List medicines or supportive steps exactly as prescribed and what happened afterward.",
          "Bring oncology contact instructions and clarify which number to use during and outside office hours.",
        ],
        callout:
          "Do not wait for the next palliative or primary-care visit to report a new treatment reaction, a fever during chemotherapy, or a symptom the oncology team told you to call about.",
      },
      {
        type: "care-levels",
        eyebrow: "Know the next call",
        title: "Use the oncology plan first, and escalate when symptoms become dangerous.",
        description:
          "Cancer type, treatment, blood counts, and individual risks matter. Keep the oncology team’s written instructions available and use this general guide only to organize the next action.",
        items: [
          {
            tone: "emergency",
            label: "Emergency help",
            title: "Severe breathing, consciousness, bleeding, or treatment emergency",
            description:
              "Call 911 for severe trouble breathing, blue or gray lips, new unresponsiveness, a seizure, possible stroke signs, uncontrolled bleeding, or another life-threatening change. During chemotherapy, a fever of 100.4°F (38°C) or higher requires immediate oncology guidance and may require emergency evaluation.",
            action: "Call 911 for life-threatening symptoms. Tell emergency staff about the cancer diagnosis, active treatment, and last treatment date.",
          },
          {
            tone: "today",
            label: "Call oncology today",
            title: "A new symptom or side effect is not controlled",
            description:
              "Call promptly for repeated vomiting, inability to keep fluids down, new confusion, worsening pain, new shortness of breath, unusual bruising or bleeding, infection concerns, or any threshold in the oncology plan.",
            action: "Use the oncology number and instructions provided to you. Do not delay that call while waiting for a routine visit elsewhere.",
          },
          {
            tone: "routine",
            label: "Plan a supportive visit",
            title: "The burden is persistent or decisions are becoming harder",
            description:
              "Schedule a palliative review for ongoing pain, fatigue, appetite changes, sleep problems, emotional distress, family strain, or questions about goals and treatment tradeoffs.",
            action: "Bring the timeline, medication list, oncology plan, recent records, and the questions the patient and family want answered together.",
          },
        ],
        note:
          "Your oncology team may give different thresholds based on treatment and blood counts. Follow those individualized instructions whenever they are more specific.",
      },
      {
        type: "split-panel",
        eyebrow: "One plan, different responsibilities",
        title: "Palliative care adds support without taking over cancer treatment.",
        description:
          "Clear roles reduce mixed messages. Each team should know what it owns, what needs coordination, and which clinician the patient should call first for a new problem.",
        tone: "plain",
        items: [
          {
            icon: Pulse,
            title: "Oncology directs cancer treatment",
            description:
              "The oncology team diagnoses and treats the cancer, monitors treatment response and blood counts, and gives treatment-specific safety instructions.",
          },
          {
            icon: HandHeart,
            title: "Palliative care focuses on burden and goals",
            description:
              "Support can address symptoms, coping, communication, family needs, and how treatment choices fit the patient’s values and daily life.",
          },
          {
            icon: ChatCircleDots,
            title: "The patient sets the priorities",
            description:
              "The most important outcome may be better sleep, enough energy for a family event, less nausea, clearer information, or confidence about the next decision.",
          },
          {
            icon: ArrowsClockwise,
            title: "The plan changes with the illness",
            description:
              "Revisit the plan after a new treatment, hospitalization, major symptom change, functional decline, or shift in what the patient considers an acceptable burden.",
          },
        ],
      },
      {
        type: "visit-steps",
        eyebrow: "Prepare a focused visit",
        title: "Bring the treatment week, not just the appointment day.",
        subtitle:
          "A short preparation list helps the visit start with the patient’s real priorities and gives each team a clearer follow-up role.",
        steps: [
          {
            icon: Notebook,
            title: "Build the timeline",
            description:
              "List recent treatments, symptom onset, daily impact, temperature concerns, what the oncology team advised, and what did or did not help.",
          },
          {
            icon: Package,
            title: "Bring the complete record",
            description:
              "Bring the medication and supplement list, oncology contact instructions, recent records, allergies, advance-care documents, and key family contacts.",
          },
          {
            icon: ListChecks,
            title: "Leave with named next actions",
            description:
              "Confirm what to monitor, which team to call for each concern, what follow-up is needed, and how the patient’s main goal will be reviewed.",
          },
        ],
        ctaText: "Request cancer support",
        ctaHref: "/contact",
      },
    ],
    related: {
      eyebrow: "Connected cancer support",
      title: "Build a support plan around the symptoms and decisions in front of you.",
      description:
        "Cancer care can involve several teams. These pages help patients and families organize the concern before the next conversation.",
      featured: {
        title: "Pain management",
        description:
          "Describe the pattern, type, triggers, and daily impact of pain so the treating team can build an individualized plan.",
        href: "/palliative-care/pain-management",
        image: assetUrl(heroYoungWoman),
        imageAlt: "Clinician discussing a personalized pain and comfort plan with an adult patient",
        imagePosition: "74% center",
      },
      links: [
        {
          title: "Symptom relief",
          description: "Connect nausea, fatigue, sleep, appetite, bowel changes, and other symptoms in one whole-person review.",
          href: "/palliative-care/symptom-relief",
        },
        {
          title: "Shortness of breath",
          description: "Prepare a breathing baseline, red-flag plan, and focused questions for the treating teams.",
          href: "/palliative-care/shortness-of-breath",
        },
        {
          title: "Patient and family support",
          description: "Clarify roles, priorities, communication, and the practical burden cancer creates for the household.",
          href: "/palliative-care/patient-family-support",
        },
        {
          title: "Planning and transitions",
          description: "Prepare for changes in treatment, function, care setting, or goals before the next transition feels urgent.",
          href: "/palliative-care/planning-transitions",
        },
      ],
    },
    faqTitle: "Cancer palliative care, explained clearly",
    faqDescription:
      "Use these answers to understand the role of palliative care and prepare questions for oncology and the rest of the treating team.",
    faqs: [
      {
        question: "Can palliative care be used while I am receiving chemotherapy, radiation, surgery, or another cancer treatment?",
        answer:
          "Yes. Palliative care can be provided alongside treatment directed at the cancer. It focuses on quality of life, symptoms, treatment side effects, coping, communication, and family needs. The oncology team continues to direct cancer treatment.",
      },
      {
        question: "Does asking for palliative care mean I am stopping treatment or entering hospice?",
        answer:
          "No. Palliative care is not the same as stopping cancer treatment and is not limited to hospice. Hospice is a specific form of care generally used near the end of life under eligibility and coverage rules. Palliative care may begin much earlier and can accompany active treatment.",
      },
      {
        question: "What should I do about a fever during chemotherapy?",
        answer:
          "The CDC states that a temperature of 100.4°F (38°C) or higher during chemotherapy is a medical emergency because fever may be the only sign of an infection. Call your oncology team immediately and follow its instructions. If you go to an emergency department, tell staff that you are receiving chemotherapy.",
      },
      {
        question: "Which cancer symptoms should I record before a palliative visit?",
        answer:
          "Record pain, nausea or vomiting, appetite and weight changes, bowel symptoms, fatigue, sleep, breathlessness, mood, confusion, and how each concern affects daily activity. Include dates, treatment timing, medicines used as prescribed, and what helped or worsened the symptom.",
      },
      {
        question: "Will Faithful Care replace my oncologist?",
        answer:
          "No. Cancer diagnosis, treatment decisions, treatment monitoring, and treatment-specific emergencies remain with oncology. Faithful Care’s palliative role is to add symptom, communication, care-planning, and family support while coordinating with the treating teams.",
      },
      {
        question: "Can a family member join the visit?",
        answer:
          "Yes, when the patient wants them involved. A family member can help describe the treatment week, remember questions, explain practical needs, and understand follow-up roles. The patient’s preferences and privacy remain central to the conversation.",
      },
    ],
    sources: [
      {
        label: "Palliative Care in Cancer",
        href: "https://www.cancer.gov/about-cancer/advanced-cancer/care-choices/palliative-care-fact-sheet",
        publisher: "National Cancer Institute",
      },
      {
        label: "Side Effects of Cancer Treatment",
        href: "https://www.cancer.gov/about-cancer/treatment/side-effects",
        publisher: "National Cancer Institute",
      },
      {
        label: "Pain and Cancer",
        href: "https://www.cancer.gov/about-cancer/treatment/side-effects/pain",
        publisher: "National Cancer Institute",
      },
      {
        label: "Watch Out for Fever During Chemotherapy",
        href: "https://www.cdc.gov/cancer-preventing-infections/patients/fever.html",
        publisher: "Centers for Disease Control and Prevention",
      },
    ],
    cta: {
      subtitle: "Cancer palliative support in Naples",
      title: "Bring the symptom pattern and the next decision into one conversation.",
      description:
        "Call Faithful Care to request a cancer palliative care visit and ask which oncology records, medicines, and care-planning documents to bring.",
      primaryText: "Request cancer support",
    },
  },

  "/palliative-care/for-heart-failure": {
    path: "/palliative-care/for-heart-failure",
    category: "Palliative Care",
    parentHub: { label: "Back to Palliative Care", href: "/palliative-care" },
    hero: {
      title: "Heart failure support built around your baseline, your goals, and your cardiology plan.",
      subtitleBold: "Small changes are easier to act on when normal is written down.",
      subtitle:
        "Faithful Care helps Naples patients and families track breathing, swelling, energy, sleep, appetite, and daily function while keeping cardiology instructions and personal priorities connected.",
      marqueeItems: ["Know your baseline", "Personal action plan", "Alongside cardiology", "Naples, FL"],
      image: assetUrl(heroSeniorMan),
      imageMobile: assetUrl(heroSeniorManMobile),
      imageAlt: "Clinician reviewing a heart failure symptom and goals-of-care plan with an older adult",
      imagePosition: "82% top",
      imagePositionMobile: "100% 46%",
    },
    quickFacts: [
      { icon: Heartbeat, label: "Works alongside", value: "Cardiology, primary care, and your treating teams" },
      { icon: Gauge, label: "Track the pattern", value: "Breathing, swelling, energy, sleep, and function" },
      { icon: ShieldCheck, label: "Safety tool", value: "A personalized green, yellow, and red action plan" },
    ],
    sections: [
      {
        type: "editorial",
        eyebrow: "Start with your usual day",
        title: "A baseline makes gradual change easier to see.",
        description:
          "Heart failure symptoms can shift slowly enough that a new limitation starts to feel normal. Write down what a typical day looks like when you are stable: how far you can walk, how many pillows you use, whether you wake short of breath, where swelling usually appears, how clothes or shoes fit, and which activities leave you unusually tired. The useful comparison is with your own baseline, not another patient’s.",
        image: assetUrl(naplesHeartFailure),
        imageAlt: "Calm Naples shoreline representing a personal heart failure baseline",
        imagePosition: "center 52%",
        bullets: [
          "Use the same simple symptom questions at roughly the same time each day when your cardiology team recommends tracking.",
          "Record a trend and its effect on function rather than relying on one isolated observation.",
          "Include dizziness, confusion, reduced appetite, cough, sleep disruption, and the ability to complete daily activities.",
          "Keep cardiology’s individualized call thresholds with the record and update them after a hospitalization or treatment change.",
        ],
        callout:
          "There is no single weight, swelling, or breathing threshold that is right for every person. Ask cardiology to write down the thresholds and actions that apply to you.",
      },
      {
        type: "care-levels",
        eyebrow: "Personalize the traffic-light plan",
        title: "Green, yellow, and red should describe your next action, not replace clinical judgment.",
        description:
          "A written action plan helps patients and families compare today with the usual baseline. The cardiology team should define individual thresholds, contact numbers, and treatment instructions.",
        items: [
          {
            tone: "emergency",
            label: "Red: call 911",
            title: "Severe breathing trouble or another life-threatening change",
            description:
              "Call 911 for severe or sudden trouble breathing, blue or gray lips, fainting or unresponsiveness, severe chest pressure, possible stroke signs, or another emergency. Do not wait for a routine callback.",
            action: "Call 911 and bring the medication list, cardiology plan, and advance-care documents if they are readily available.",
          },
          {
            tone: "today",
            label: "Yellow: call today",
            title: "A new or worsening change from baseline",
            description:
              "Contact the cardiology or treating team promptly for increasing breathlessness, new or worsening swelling, needing more upright sleep, reduced activity, new dizziness or confusion, or another change named in the personal plan.",
            action: "Report the trend, when it began, the functional impact, recent readings if requested, and any missed or changed medicines.",
          },
          {
            tone: "routine",
            label: "Green: keep the plan current",
            title: "Symptoms are at the agreed baseline",
            description:
              "Continue the care and monitoring plan given by cardiology. Use planned visits to review symptom burden, medication questions, family needs, goals, and what would trigger the next call.",
            action: "Do not change a diuretic, heart medicine, fluid plan, or salt plan unless the prescribing team gives individualized instructions.",
          },
        ],
        note:
          "If cardiology has already provided a zone plan, its exact thresholds and actions take priority. Bring it to every palliative and primary-care visit.",
      },
      {
        type: "split-panel",
        eyebrow: "Build a useful daily snapshot",
        title: "Four questions help reveal whether heart failure is changing daily life.",
        description:
          "Tracking should serve the patient, not overwhelm the household. Choose the measures the treating team actually wants and connect each one to how the person feels and functions.",
        tone: "plain",
        items: [
          {
            icon: Wind,
            title: "How is breathing different?",
            description:
              "Note breathlessness at rest or with usual activity, nighttime waking, cough, the number of pillows normally used, and any sudden change.",
          },
          {
            icon: Waves,
            title: "Where is swelling changing?",
            description:
              "Observe changes in feet, ankles, legs, abdomen, shoes, clothing, or comfort. Follow the team’s instructions if daily weight is part of your plan.",
          },
          {
            icon: PersonSimpleWalk,
            title: "What can you do today?",
            description:
              "Record meaningful changes in walking, bathing, dressing, cooking, leaving home, concentrating, or recovering after ordinary activity.",
          },
          {
            icon: Moon,
            title: "How are sleep and energy?",
            description:
              "Note unusual fatigue, more daytime sleep, difficulty lying flat, nighttime symptoms, anxiety, or a reduced appetite that changes the day’s routine.",
          },
        ],
      },
      {
        type: "detail-grid",
        eyebrow: "Palliative support alongside cardiology",
        eyebrowColor: "primary",
        title: "Six conversations can make a complex plan easier to live with.",
        description:
          "Palliative care does not prescribe a universal heart-failure formula. It helps the patient, family, and treating teams make the existing plan clearer and more responsive to quality of life.",
        statNumber: "6",
        statLabel: "care conversations connect symptom control with the patient’s priorities",
        cards: [
          {
            icon: Heartbeat,
            title: "Symptom burden",
            description:
              "Describe breathlessness, swelling, fatigue, pain, sleep, appetite, mood, and how symptoms interact rather than addressing each in isolation.",
          },
          {
            icon: Pill,
            title: "Medication experience",
            description:
              "Review the complete list, timing, side effects, practical barriers, and patient questions. Medication changes remain with the prescribing team.",
          },
          {
            icon: ChatCircleDots,
            title: "What matters now",
            description:
              "Name the activity, event, relationship, or level of independence the patient most wants the care plan to protect.",
          },
          {
            icon: UsersThree,
            title: "Family roles",
            description:
              "Clarify who tracks symptoms, who has permission to receive information, who helps with appointments, and where the household needs more support.",
          },
          {
            icon: ArrowsClockwise,
            title: "Transitions",
            description:
              "Review the plan after hospitalization, rehabilitation, a new functional limit, a major treatment change, or repeated urgent-care use.",
          },
          {
            icon: ClipboardText,
            title: "Future decisions",
            description:
              "Discuss the health-care proxy, existing directives, acceptable treatment burdens, and how the patient wants clinicians and family to approach future choices.",
          },
        ],
      },
      {
        type: "visit-steps",
        eyebrow: "Prepare the heart-failure review",
        title: "Bring your baseline, the change, and the cardiology instructions.",
        subtitle:
          "The clearest visit distinguishes what is stable, what changed, and which team owns each next step.",
        steps: [
          {
            icon: Gauge,
            title: "Summarize the trend",
            description:
              "Bring the requested readings and a short record of breathing, swelling, sleep, energy, appetite, dizziness, and daily function compared with baseline.",
          },
          {
            icon: Package,
            title: "Bring the treatment plan",
            description:
              "Bring all medicines, cardiology’s zone or call plan, recent discharge paperwork, allergies, specialist contacts, and advance-care documents.",
          },
          {
            icon: ListChecks,
            title: "Confirm who to call",
            description:
              "Write down the specific cardiology contact, individualized thresholds, emergency instructions, follow-up owner, and when the palliative plan should be reviewed.",
          },
        ],
        ctaText: "Request heart support",
        ctaHref: "/contact",
      },
    ],
    related: {
      eyebrow: "Connected heart-failure care",
      title: "Support the symptom pattern, the family, and the next transition.",
      description:
        "These related services help organize concerns that often overlap with heart failure while cardiology continues to direct heart treatment.",
      featured: {
        title: "Symptom relief",
        description:
          "Review fatigue, sleep, appetite, swelling, discomfort, mood, and daily function as one connected experience.",
        href: "/palliative-care/symptom-relief",
        image: "/images/services/symptom-relief.webp",
        imageAlt: "Clinician and patient discussing relief for several connected symptoms",
      },
      links: [
        {
          title: "Shortness of breath",
          description: "Build a breathing baseline, clarify emergency signs, and prepare focused questions for the treating teams.",
          href: "/palliative-care/shortness-of-breath",
        },
        {
          title: "High blood pressure care",
          description: "Organize home readings and medication questions for primary care without replacing cardiology guidance.",
          href: "/primary-care/high-blood-pressure-care",
        },
        {
          title: "Planning and transitions",
          description: "Prepare for discharge, changing function, new care needs, or a shift in goals before the next transition.",
          href: "/palliative-care/planning-transitions",
        },
        {
          title: "Patient and family support",
          description: "Clarify roles, communication, priorities, and the practical load carried by the household.",
          href: "/palliative-care/patient-family-support",
        },
      ],
    },
    faqTitle: "Heart failure palliative care, without one-size-fits-all rules",
    faqDescription:
      "These answers explain how palliative support fits with cardiology and why a personal baseline matters.",
    faqs: [
      {
        question: "Does palliative care replace my cardiologist or heart-failure treatment?",
        answer:
          "No. Cardiology continues to diagnose and treat heart failure, prescribe medicines, and set individualized monitoring instructions. Palliative care adds support for symptoms, quality of life, communication, family needs, and decisions that should remain coordinated with cardiology.",
      },
      {
        question: "Can palliative care begin before the final stage of heart failure?",
        answer:
          "Yes. Palliative care is based on need rather than a requirement to stop treatment. It can be introduced alongside heart-failure care when symptoms, treatment burden, family strain, or complex decisions are affecting quality of life.",
      },
      {
        question: "How much weight gain should make me call?",
        answer:
          "There is no universal number that is safe and appropriate for everyone. Ask your cardiology team to give you a written threshold and action based on your condition and plan. Contact the treating team for a meaningful change from baseline even if you are unsure whether a number reaches the threshold.",
      },
      {
        question: "Should I take an extra diuretic when swelling or breathlessness increases?",
        answer:
          "Only if the prescribing team has given you a specific written instruction for that situation. Do not change a diuretic or another heart medicine on general website advice. Call the cardiology or treating team and describe the symptom trend and current medicines.",
      },
      {
        question: "What should I track between visits?",
        answer:
          "Follow the measures requested by your treating team. Useful context may include breathing at rest and with normal activity, swelling, sleep position, nighttime symptoms, fatigue, appetite, dizziness, confusion, daily function, and requested readings such as weight, blood pressure, or pulse.",
      },
      {
        question: "How is palliative care different from hospice for heart failure?",
        answer:
          "Palliative care can be provided at any stage alongside heart-failure treatment. Hospice is a specific form of care generally used near the end of life under eligibility and coverage rules. A clinician and hospice organization can explain whether hospice is appropriate for an individual situation.",
      },
    ],
    sources: [
      {
        label: "Managing Heart Failure Symptoms",
        href: "https://www.heart.org/en/health-topics/heart-failure/warning-signs-of-heart-failure/managing-heart-failure-symptoms",
        publisher: "American Heart Association",
      },
      {
        label: "Warning Signs of Heart Failure",
        href: "https://www.heart.org/en/health-topics/heart-failure/warning-signs-of-heart-failure",
        publisher: "American Heart Association",
      },
      {
        label: "Living With Heart Failure",
        href: "https://www.nhlbi.nih.gov/health/heart-failure/living-with",
        publisher: "National Heart, Lung, and Blood Institute",
      },
      {
        label: "What Is Palliative Care?",
        href: "https://www.nia.nih.gov/health/hospice-and-palliative-care/what-are-palliative-care-and-hospice-care",
        publisher: "National Institute on Aging",
      },
    ],
    cta: {
      subtitle: "Heart failure palliative support in Naples",
      title: "Turn a changing day into a clearer plan for the next call.",
      description:
        "Call Faithful Care to request a heart-failure palliative care visit and ask which cardiology records, symptom logs, and medicines to bring.",
      primaryText: "Request heart support",
    },
  },

  "/palliative-care/for-copd-and-lung-disease": {
    path: "/palliative-care/for-copd-and-lung-disease",
    category: "Palliative Care",
    parentHub: { label: "Back to Palliative Care", href: "/palliative-care" },
    hero: {
      title: "Advanced COPD and lung-disease support for the space between breaths and appointments.",
      subtitleBold: "Palliative care can accompany pulmonology treatment.",
      subtitle:
        "Faithful Care helps Naples patients and families describe the breathing baseline, medication routine, energy limits, anxiety, and daily goals so symptom support stays connected to the pulmonary plan.",
      marqueeItems: ["Breathing baseline", "Energy planning", "Anxiety support", "Naples, FL"],
      image: assetUrl(heroSameDayVisits),
      imageMobile: assetUrl(heroSameDayVisitsMobile),
      imageAlt: "Clinician listening to an adult with advanced COPD describe breathlessness and daily limits",
      imagePosition: "82% top",
      imagePositionMobile: "100% 46%",
    },
    quickFacts: [
      { icon: Wind, label: "Care focus", value: "Breathing comfort, function, sleep, and confidence" },
      { icon: Stethoscope, label: "Works alongside", value: "Pulmonology, primary care, and other treating teams" },
      { icon: Notebook, label: "Bring with you", value: "A breathing baseline, inhaler list, and action plan" },
    ],
    sections: [
      {
        type: "care-levels",
        eyebrow: "Breathing changes need a clear response",
        title: "Know when breathlessness is an emergency, a same-day change, or a planned discussion.",
        description:
          "People with advanced lung disease may live with daily shortness of breath, so the key comparison is with the person’s usual baseline and individualized pulmonary action plan.",
        items: [
          {
            tone: "emergency",
            label: "Call 911",
            title: "Severe or sudden breathing danger",
            description:
              "Call for emergency help if the person is struggling to breathe at rest, cannot speak in usual phrases, has blue or gray lips, becomes confused or hard to wake, faints, has severe chest pain, or has another life-threatening change.",
            action: "Call 911. Use prescribed rescue treatment only as directed in the individual action plan while emergency help is on the way.",
          },
          {
            tone: "today",
            label: "Call the treating team today",
            title: "Breathing is worse than the usual baseline",
            description:
              "Call promptly for increasing breathlessness, a meaningful change in cough or mucus, fever, new wheezing, reduced ability to complete normal activities, poor sleep from breathing, or rescue medicine being less effective than expected.",
            action: "Follow the pulmonary action plan and report when the change began, possible triggers, current medicines, and the effect on function.",
          },
          {
            tone: "routine",
            label: "Plan a support review",
            title: "The ongoing burden is shrinking daily life",
            description:
              "Schedule a palliative review when breathlessness, fatigue, anxiety, sleep, appetite, isolation, or caregiving strain persists even when there is no acute emergency.",
            action: "Bring the pulmonary action plan, inhalers and devices, medication list, recent records, and the activities the patient most wants to preserve.",
          },
        ],
        note:
          "If pulmonology has given a more specific COPD or lung-disease action plan, follow those individualized thresholds and treatment instructions.",
      },
      {
        type: "editorial",
        eyebrow: "Define the breathing baseline",
        title: "‘Short of breath’ becomes more useful when it is tied to an activity.",
        description:
          "Describe what the person can usually do on a stable day and where they pause: walking from one room to another, bathing, dressing, eating, speaking, climbing steps, or lying down to sleep. Then describe what changed. Include cough, mucus, wheezing, fever, chest discomfort, sleep, appetite, anxiety, and the response to treatment already prescribed.",
        image: assetUrl(naplesCopd),
        imageAlt: "Naples waterway and open sky representing a personal breathing baseline",
        imagePosition: "center 54%",
        bullets: [
          "Compare today with the person’s own stable day rather than with a generic activity target.",
          "Record triggers such as exertion, position, heat, smoke, strong odors, respiratory illness, or missed treatment.",
          "Note what the prescribed rescue plan changed and how long the effect lasted.",
          "Bring the inhalers, spacers, nebulized medicines, and oxygen instructions actually used so the team can reconcile the routine.",
        ],
        callout:
          "Faithful Care does not replace pulmonary testing, oxygen qualification, pulmonary rehabilitation, or specialist management. Those services remain with the appropriate treating team.",
      },
      {
        type: "stories",
        eyebrow: "Protect energy for what matters",
        title: "Breathing support can be built into the rhythm of an ordinary day.",
        description:
          "The goal is not to promise that breathlessness disappears. It is to reduce avoidable strain, prepare for changes, and help the patient spend limited energy more intentionally.",
        toneClass: "bg-[#00c2cc]",
        stories: [
          {
            icon: PersonSimpleWalk,
            title: "Plan effort before exhaustion",
            description:
              "Notice which tasks consume the most energy. Sitting for personal care, gathering supplies first, pacing one step at a time, and resting before severe breathlessness may make the routine more manageable. Ask the treating team which activity strategies are safe for you.",
            tags: ["Pacing", "Daily function", "Recovery time"],
            image: "/images/services/senior-care.webp",
            imageAlt: "Clinician helping an older adult plan safer daily activity",
            note: "Activity guidance must match the individual pulmonary and safety plan.",
          },
          {
            icon: Wind,
            title: "Use a calm response to the sensation",
            description:
              "Breathlessness can trigger fear, and fear can intensify the sensation. A familiar plan, supported position, calm communication, and breathing techniques taught by the clinical team can help the patient respond without guessing.",
            tags: ["Calm cue", "Position", "Individual plan"],
            image: "/images/services/same-day-visits.webp",
            imageAlt: "Patient and clinician discussing a calm response plan for distressing symptoms",
            note: "A calming strategy never replaces emergency care for severe or sudden breathing danger.",
          },
          {
            icon: UsersThree,
            title: "Give family a defined role",
            description:
              "Care partners should know the baseline, emergency signs, action-plan steps, medicine list, specialist contacts, and the patient’s preferences. That preparation can reduce panic and mixed messages during a change.",
            tags: ["Care partner", "Action plan", "Communication"],
            image: "/images/services/patient-family-support.webp",
            imageAlt: "Patient and family meeting with a clinician to clarify a lung-disease support plan",
            note: "Keep emergency numbers and the most recent pulmonary plan in one accessible place.",
          },
        ],
      },
      {
        type: "split-panel",
        eyebrow: "Four connected burdens",
        title: "Breathlessness rarely travels alone.",
        description:
          "A whole-person review looks at the sensation of breathing and the consequences around it. Treating one concern may require coordination across more than one clinician.",
        tone: "plain",
        items: [
          {
            icon: Wind,
            title: "Breathing and cough",
            description:
              "Describe breathlessness, cough, mucus, wheeze, chest discomfort, triggers, position, and response to the prescribed pulmonary plan.",
          },
          {
            icon: Moon,
            title: "Sleep and fatigue",
            description:
              "Report nighttime symptoms, poor sleep, daytime exhaustion, morning headaches, and how fatigue changes safety and concentration.",
          },
          {
            icon: ChatCircleDots,
            title: "Anxiety and isolation",
            description:
              "Fear of breathlessness can limit activity and connection. Name anxiety, panic, low mood, and activities the person has stopped doing.",
          },
          {
            icon: ForkKnife,
            title: "Eating and strength",
            description:
              "Breathlessness can make meals tiring. Report appetite, weight change, swallowing concerns, dehydration, and the effort required to shop, cook, or eat.",
          },
        ],
      },
      {
        type: "visit-steps",
        eyebrow: "Prepare a lung-disease support visit",
        title: "Bring the stable-day picture and the change from it.",
        subtitle:
          "The visit is more useful when the pulmonary plan, medicine technique, symptoms, and patient priorities are visible together.",
        steps: [
          {
            icon: ClipboardText,
            title: "Describe the baseline",
            description:
              "Write what the person can usually do, when breathlessness appears, usual cough or mucus, sleep pattern, oxygen instructions if prescribed, and what is different now.",
          },
          {
            icon: Package,
            title: "Bring the actual treatment routine",
            description:
              "Bring inhalers, spacers, nebulized medicines, the medication list, pulmonary action plan, specialist records, allergies, and any prescribed oxygen instructions.",
          },
          {
            icon: ListChecks,
            title: "Leave with one coordinated plan",
            description:
              "Confirm emergency signs, whom to call for a change, which questions return to pulmonology, what palliative support addresses, and when to review the plan.",
          },
        ],
        ctaText: "Request breathing support",
        ctaHref: "/contact",
      },
    ],
    related: {
      eyebrow: "Connected lung-disease support",
      title: "Pair the pulmonary plan with support for daily breathlessness and its wider effects.",
      description:
        "These resources help organize related concerns without replacing pulmonology, emergency care, or services Faithful Care does not provide.",
      featured: {
        title: "Shortness of breath",
        description:
          "Build a personal breathing baseline, recognize urgent changes, and prepare useful questions for every treating team.",
        href: "/palliative-care/shortness-of-breath",
        image: "/images/insurance-lp/humana-palliative.webp",
        imageAlt: "Clinician and adult patient discussing a breathing comfort and safety plan",
      },
      links: [
        {
          title: "COPD primary care",
          description: "Coordinate routine COPD follow-up and prevention with primary care while pulmonology manages specialist needs.",
          href: "/primary-care/copd-care",
        },
        {
          title: "Symptom relief",
          description: "Review fatigue, sleep, appetite, discomfort, mood, and other symptoms that interact with breathing.",
          href: "/palliative-care/symptom-relief",
        },
        {
          title: "Patient and family support",
          description: "Give care partners a clear role in tracking, communication, emergency preparation, and daily support.",
          href: "/palliative-care/patient-family-support",
        },
        {
          title: "Planning and transitions",
          description: "Prepare for hospitalization, discharge, changing function, or future treatment decisions before a crisis.",
          href: "/palliative-care/planning-transitions",
        },
      ],
    },
    faqTitle: "Advanced COPD and palliative care, without false promises",
    faqDescription:
      "These answers clarify how palliative support fits with pulmonology and what information makes a breathing review more useful.",
    faqs: [
      {
        question: "Can palliative care be used while I continue COPD or lung-disease treatment?",
        answer:
          "Yes. Palliative care can be provided alongside disease-directed treatment. Pulmonology and the other treating clinicians continue to manage the lung disease, testing, inhalers, oxygen decisions, and specialist treatment. Palliative care adds symptom, communication, family, and goals-of-care support.",
      },
      {
        question: "Does palliative care for COPD mean hospice?",
        answer:
          "No. Palliative care can begin at any stage of a serious illness based on need and may accompany ongoing treatment. Hospice is a specific form of care generally used near the end of life under eligibility and coverage rules.",
      },
      {
        question: "What is a breathing baseline?",
        answer:
          "It is a practical description of breathing on a stable day: breathlessness at rest and with usual activity, cough and mucus, sleep position, nighttime symptoms, normal recovery time, and how much help daily activities require. It lets the team compare a new change with what is usual for that person.",
      },
      {
        question: "Should I change an inhaler or oxygen setting when breathing gets worse?",
        answer:
          "Only follow the individualized action plan provided by the prescribing clinician. Do not change an inhaler schedule, start leftover medicine, or adjust prescribed oxygen based on general website advice. Call the treating team for a change from baseline and call 911 for severe symptoms.",
      },
      {
        question: "Can anxiety make breathlessness feel worse?",
        answer:
          "Anxiety and breathlessness can reinforce each other, but a new or severe breathing change should never be assumed to be anxiety. Follow the pulmonary safety plan first. Palliative care can help patients and families discuss calm-response strategies that complement, not replace, medical evaluation and treatment.",
      },
      {
        question: "Does Faithful Care provide pulmonary rehabilitation, oxygen equipment, or in-home respiratory care?",
        answer:
          "This page does not claim those services. Faithful Care provides office-based medical and palliative support within its verified scope and coordinates questions with the appropriate treating teams. Ask directly which services are available and where specialist or equipment referrals belong.",
      },
    ],
    sources: [
      {
        label: "COPD: Living With",
        href: "https://www.nhlbi.nih.gov/health/copd/living-with",
        publisher: "National Heart, Lung, and Blood Institute",
      },
      {
        label: "COPD Symptoms",
        href: "https://www.nhlbi.nih.gov/health/copd/symptoms",
        publisher: "National Heart, Lung, and Blood Institute",
      },
      {
        label: "COPD Treatment",
        href: "https://www.nhlbi.nih.gov/health/copd/treatment",
        publisher: "National Heart, Lung, and Blood Institute",
      },
      {
        label: "What Are Palliative Care and Hospice Care?",
        href: "https://www.nia.nih.gov/health/hospice-and-palliative-care/what-are-palliative-care-and-hospice-care",
        publisher: "National Institute on Aging",
      },
    ],
    cta: {
      subtitle: "Advanced COPD and lung-disease support in Naples",
      title: "Make the breathing baseline, action plan, and daily priorities easier to share.",
      description:
        "Call Faithful Care to request a palliative support visit and ask which pulmonary records, inhalers, action plans, and symptom notes to bring.",
      primaryText: "Request breathing support",
    },
  },

  "/palliative-care/for-advanced-kidney-disease": {
    path: "/palliative-care/for-advanced-kidney-disease",
    category: "Palliative Care",
    parentHub: { label: "Back to Palliative Care", href: "/palliative-care" },
    hero: {
      title: "Advanced kidney-disease support for symptoms, decisions, and the life around treatment.",
      subtitleBold: "Palliative care can be added whether or not dialysis continues.",
      subtitle:
        "Faithful Care helps Naples patients and families organize symptom burden, treatment experience, values, and questions while nephrology and the kidney-care team continue to direct kidney treatment.",
      marqueeItems: ["Alongside kidney care", "Symptom support", "Decision clarity", "Naples, FL"],
      image: assetUrl(heroYoungMan),
      imageMobile: assetUrl(heroYoungManMobile),
      imageAlt: "Clinician meeting with an adult patient and family about advanced kidney-disease support",
      imagePosition: "84% top",
      imagePositionMobile: "100% 42%",
    },
    quickFacts: [
      { icon: Drop, label: "Care context", value: "With dialysis, before dialysis, or during treatment decisions" },
      { icon: Stethoscope, label: "Works alongside", value: "Nephrology and the rest of the kidney-care team" },
      { icon: HandHeart, label: "Care focus", value: "Symptoms, quality of life, communication, and goals" },
    ],
    sections: [
      {
        type: "comparison",
        eyebrow: "Use the terms accurately",
        title: "Palliative care and conservative kidney management overlap, but they are not interchangeable.",
        description:
          "Clear language protects informed decisions. Palliative care is an added layer of support for a serious illness and may accompany dialysis. Conservative kidney management is a treatment pathway for kidney failure that does not use dialysis or transplant. Hospice is different from both.",
        leftHeading: "Palliative care",
        rightHeading: "Conservative kidney management",
        rows: [
          {
            label: "Main role",
            left: "Addresses symptoms, quality of life, communication, family needs, and goals alongside the kidney treatment plan.",
            right: "Provides active medical care for kidney failure focused on quality of life and symptom control without dialysis or transplant.",
          },
          {
            label: "Dialysis",
            left: "Can be provided while a person starts, continues, changes, or considers dialysis.",
            right: "By definition, follows a nondialysis and nontransplant pathway for kidney failure.",
          },
          {
            label: "Decision timing",
            left: "May begin at any stage of serious kidney disease based on need.",
            right: "Requires an informed treatment decision with the kidney-care team about managing kidney failure without dialysis or transplant.",
          },
          {
            label: "Clinical team",
            left: "Adds support and coordinates with nephrology, primary care, and other treating clinicians.",
            right: "Uses an interdisciplinary kidney-care plan that may include nephrology, primary care, nursing, dietetics, pharmacy, social work, and palliative expertise.",
          },
          {
            label: "What it is not",
            left: "It is not automatically hospice and does not require stopping kidney treatment.",
            right: "It is not ‘no care.’ It is active care with different treatment goals and burdens.",
          },
        ],
        note:
          "Hospice is a separate program of care generally used near the end of life under eligibility and coverage rules. Choosing or stopping dialysis requires individualized discussion with nephrology; do not make that decision from a website.",
        sources: [
          {
            label: "NIDDK: Conservative Management for Kidney Failure",
            href: "https://www.niddk.nih.gov/health-information/kidney-disease/kidney-failure/conservative-management",
          },
          {
            label: "NIA: Palliative Care and Hospice Care",
            href: "https://www.nia.nih.gov/health/hospice-and-palliative-care/what-are-palliative-care-and-hospice-care",
          },
        ],
      },
      {
        type: "editorial",
        eyebrow: "Build the symptom-and-treatment picture",
        title: "How the person feels between lab results matters.",
        description:
          "Kidney numbers guide important medical decisions, but they do not fully describe fatigue, nausea, itching, sleep, appetite, swelling, pain, restless legs, concentration, mood, or the burden of appointments and dialysis. A dated record can connect symptoms with treatment days, medicine changes, eating and drinking, activity, and sleep without asking the patient to diagnose the cause.",
        image: assetUrl(naplesKidney),
        imageAlt: "Naples waterfront and open sky representing space for kidney-care reflection",
        imagePosition: "center 50%",
        bullets: [
          "Record what happens on treatment days and nontreatment days if dialysis is part of the plan.",
          "Describe the symptom, timing, severity, and effect on sleep, eating, movement, concentration, or personal care.",
          "List all prescriptions, nonprescription products, supplements, recent medicine changes, and any missed doses.",
          "Bring the exact food, fluid, blood-pressure, and medication instructions given by the kidney-care team rather than applying a generic rule.",
        ],
        callout:
          "Diet, fluid, potassium, phosphorus, blood-pressure, and medicine needs vary with kidney function, laboratory results, urine output, treatment, and other conditions. Follow individualized nephrology and renal-dietitian guidance.",
      },
      {
        type: "detail-grid",
        eyebrow: "A whole-person kidney review",
        eyebrowColor: "secondary",
        title: "Six burdens deserve a place in the kidney-care conversation.",
        description:
          "Palliative support connects physical symptoms with treatment burden, daily function, family capacity, and the decisions ahead. It does not replace nephrology or prescribe a universal kidney regimen.",
        statNumber: "6",
        statLabel: "connected areas help the patient and kidney-care team see more than laboratory values",
        cards: [
          {
            icon: Gauge,
            title: "Fatigue and function",
            description:
              "Describe energy on treatment and nontreatment days, recovery time, dizziness, falls, and which daily activities now require help or are no longer possible.",
          },
          {
            icon: ForkKnife,
            title: "Nausea and appetite",
            description:
              "Report nausea, vomiting, taste change, poor appetite, weight change, swallowing concerns, and whether eating has become an exhausting or stressful task.",
          },
          {
            icon: Waves,
            title: "Swelling and breathing",
            description:
              "Record changes from baseline in swelling, breathlessness, cough, sleep position, or chest symptoms and follow the kidney-care team’s call plan promptly.",
          },
          {
            icon: Moon,
            title: "Itching, sleep, and restlessness",
            description:
              "Persistent itching, poor sleep, restless legs, pain, and daytime sleepiness can compound fatigue. Note the pattern and what has already been tried.",
          },
          {
            icon: Pill,
            title: "Medication burden",
            description:
              "Kidney function can affect medication choices and dosing. Bring every product and side effect concern; do not stop or adjust treatment without prescriber guidance.",
          },
          {
            icon: UsersThree,
            title: "Treatment and family load",
            description:
              "Transportation, appointment time, dialysis recovery, work, caregiving, finances, and uncertainty can affect the plan’s real-world fit and deserve explicit discussion.",
          },
        ],
      },
      {
        type: "care-levels",
        eyebrow: "Know which change cannot wait",
        title: "Use the nephrology plan and act on dangerous symptoms.",
        description:
          "Advanced kidney disease and dialysis create individual risks. Keep nephrology and dialysis-unit instructions accessible and use them whenever they are more specific than this general guide.",
        items: [
          {
            tone: "emergency",
            label: "Call 911",
            title: "Severe breathing, chest, consciousness, or access bleeding emergency",
            description:
              "Call 911 for severe trouble breathing, severe chest pressure, fainting or unresponsiveness, a seizure, possible stroke signs, uncontrolled bleeding, or another life-threatening change. Follow emergency instructions for dialysis access bleeding if the kidney-care team has provided them.",
            action: "Call 911. Tell emergency staff about advanced kidney disease, dialysis status, access type if applicable, and the last treatment date.",
          },
          {
            tone: "today",
            label: "Call the kidney-care team today",
            title: "A new symptom, treatment problem, or rapid decline appeared",
            description:
              "Call promptly for worsening swelling or breathlessness, repeated vomiting, new confusion, fever or infection concern, a dialysis-access concern, missed or shortened dialysis, very low urine compared with the person’s usual pattern, or another threshold in the personal plan.",
            action: "Use the nephrology or dialysis contact instructions and report the symptom timeline, recent treatments, medicines, and current readings requested by the team.",
          },
          {
            tone: "routine",
            label: "Plan a support review",
            title: "Symptoms or treatment burden are persistently affecting quality of life",
            description:
              "Schedule a palliative discussion for ongoing fatigue, itching, nausea, pain, sleep problems, emotional distress, family strain, dialysis burden, or questions about future treatment choices.",
            action: "Bring recent kidney records, the medicine list, treatment schedule, symptom notes, advance-care documents, and the decisions the patient wants help understanding.",
          },
        ],
        note:
          "Never skip dialysis, stop dialysis, change a fluid plan, or alter kidney-related medicines based on general web content. Contact the kidney-care team for individualized instructions.",
      },
      {
        type: "visit-steps",
        eyebrow: "Prepare a kidney palliative visit",
        title: "Bring the treatment experience and the decision in front of you.",
        subtitle:
          "A useful visit combines kidney-care records with the symptoms, burdens, values, and family questions that may not appear in a laboratory report.",
        steps: [
          {
            icon: Notebook,
            title: "Map symptoms to the week",
            description:
              "Record treatment and nontreatment days, fatigue, nausea, itching, pain, sleep, appetite, breathing, swelling, mood, and the effect on daily function.",
          },
          {
            icon: Package,
            title: "Bring the complete kidney plan",
            description:
              "Bring medicines and supplements, dialysis and nephrology instructions, recent records, allergies, food and fluid guidance, specialist contacts, and advance-care documents.",
          },
          {
            icon: ListChecks,
            title: "Name the next decision and roles",
            description:
              "Write the decision that needs clarity, what matters most to the patient, which questions belong to nephrology, and how the palliative plan will be coordinated and reviewed.",
          },
        ],
        ctaText: "Request kidney support",
        ctaHref: "/contact",
      },
    ],
    related: {
      eyebrow: "Connected kidney-disease support",
      title: "Connect symptom relief, medication safety, family communication, and future planning.",
      description:
        "These resources can help patients and families prepare the questions that belong in a coordinated kidney-care conversation.",
      featured: {
        title: "Symptom relief",
        description:
          "Organize fatigue, nausea, itching, sleep, appetite, discomfort, mood, and daily function into one whole-person review.",
        href: "/palliative-care/symptom-relief",
        image: "/images/services/chronic-disease.webp",
        imageAlt: "Clinician and patient discussing a coordinated symptom-relief plan",
      },
      links: [
        {
          title: "Medication review for seniors",
          description: "Reconcile prescriptions, supplements, side effects, and practical barriers without changing kidney treatment independently.",
          href: "/primary-care/medication-review-for-seniors",
        },
        {
          title: "Patient and family support",
          description: "Clarify roles, communication, treatment burden, and what the patient wants family members to understand.",
          href: "/palliative-care/patient-family-support",
        },
        {
          title: "Planning and transitions",
          description: "Prepare for hospitalization, dialysis decisions, changing function, or a new care setting before the next transition.",
          href: "/palliative-care/planning-transitions",
        },
        {
          title: "Pain management",
          description: "Describe pain type, pattern, triggers, and impact so the treating team can consider kidney function in an individualized plan.",
          href: "/palliative-care/pain-management",
        },
      ],
    },
    faqTitle: "Advanced kidney-disease support, with the terms kept clear",
    faqDescription:
      "These answers distinguish palliative care, conservative kidney management, dialysis, and hospice so patients can ask informed questions.",
    faqs: [
      {
        question: "Can I receive palliative care while I am on dialysis?",
        answer:
          "Yes. Palliative care can be added while dialysis continues. It can address symptoms, treatment burden, quality of life, communication, family needs, and future decisions while nephrology and the dialysis team continue to direct kidney treatment.",
      },
      {
        question: "Is palliative care the same as conservative kidney management?",
        answer:
          "No. Palliative care is an added layer of support that can accompany dialysis or another kidney-treatment plan. Conservative kidney management is an active treatment pathway for kidney failure that focuses on quality of life and symptom control without dialysis or transplant.",
      },
      {
        question: "Is conservative kidney management the same as hospice?",
        answer:
          "No. Conservative management is ongoing kidney care without dialysis or transplant. Hospice is a separate program generally used near the end of life under eligibility and coverage rules. Some people using conservative management may choose hospice later, but the terms are not interchangeable.",
      },
      {
        question: "Can Faithful Care tell me whether to start, continue, or stop dialysis?",
        answer:
          "Faithful Care can help clarify values, symptoms, treatment burden, questions, and communication, but a dialysis decision requires individualized medical information and shared decision-making with nephrology and the kidney-care team. Do not start, skip, or stop dialysis based on website content.",
      },
      {
        question: "Should every person with advanced kidney disease follow the same fluid and food limits?",
        answer:
          "No. Food, fluid, sodium, potassium, phosphorus, protein, and other recommendations vary with kidney function, laboratory results, urine output, dialysis plan, medicines, nutrition, and other conditions. Follow individualized guidance from the kidney-care team and renal dietitian.",
      },
      {
        question: "What should I bring to a palliative kidney-care visit?",
        answer:
          "Bring recent nephrology and dialysis records, all medicines and supplements, the treatment schedule, individualized food and fluid instructions, a symptom timeline, allergies, advance-care documents, specialist contacts, and the decisions the patient and family want help discussing.",
      },
    ],
    sources: [
      {
        label: "Conservative Management for Kidney Failure",
        href: "https://www.niddk.nih.gov/health-information/kidney-disease/kidney-failure/conservative-management",
        publisher: "National Institute of Diabetes and Digestive and Kidney Diseases",
      },
      {
        label: "Choosing a Treatment for Kidney Failure",
        href: "https://www.niddk.nih.gov/health-information/kidney-disease/kidney-failure/choosing-treatment",
        publisher: "National Institute of Diabetes and Digestive and Kidney Diseases",
      },
      {
        label: "Kidney Failure",
        href: "https://www.niddk.nih.gov/health-information/kidney-disease/kidney-failure",
        publisher: "National Institute of Diabetes and Digestive and Kidney Diseases",
      },
      {
        label: "Supportive Care in Chronic Kidney Disease: Key Takeaways",
        href: "https://kdigo.org/conferences/supportivecare/",
        publisher: "Kidney Disease: Improving Global Outcomes",
      },
      {
        label: "What Are Palliative Care and Hospice Care?",
        href: "https://www.nia.nih.gov/health/hospice-and-palliative-care/what-are-palliative-care-and-hospice-care",
        publisher: "National Institute on Aging",
      },
    ],
    cta: {
      subtitle: "Advanced kidney-disease support in Naples",
      title: "Give symptoms, treatment burden, and the next decision one coordinated place to be heard.",
      description:
        "Call Faithful Care to request a kidney-disease palliative care visit and ask which nephrology records, treatment plans, medicines, and care-planning documents to bring.",
      primaryText: "Request kidney support",
    },
  },
} satisfies ConditionPageMap;
