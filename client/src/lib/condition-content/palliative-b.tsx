import {
  Brain,
  CalendarCheck,
  ChartLineUp,
  ChatCircleDots,
  ClipboardText,
  Drop,
  Eye,
  FirstAid,
  Footprints,
  Gauge,
  HandHeart,
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
  UsersThree,
  Warning,
  Wind,
} from "@phosphor-icons/react";
import heroDoctorFaithfulCare from "@/assets/images/hero-doctor-faithful-care.optimized.webp";
import heroDoctorFaithfulCareMobile from "@/assets/images/hero-doctor-faithful-care.mobile.webp";
import heroSeniorWoman from "@/assets/images/hero-doctor-senior-woman.optimized.webp";
import heroSeniorWomanMobile from "@/assets/images/hero-doctor-senior-woman.mobile.webp";
import heroDoctorWoman from "@/assets/images/hero-doctor-woman.optimized.webp";
import heroDoctorWomanMobile from "@/assets/images/hero-doctor-woman.mobile.webp";
import heroSameDayVisits from "@/assets/images/hero-same-day-visits.optimized.webp";
import heroSameDayVisitsMobile from "@/assets/images/hero-same-day-visits.mobile.webp";
import naplesDementiaPlanning from "@/assets/images/hero-naples-a5.optimized.webp";
import naplesDementia from "@/assets/images/hero-naples-v9.optimized.webp";
import naplesParkinsons from "@/assets/images/hero-naples-v10.optimized.webp";
import naplesPain from "@/assets/images/hero-naples-v11.optimized.webp";
import naplesBreathing from "@/assets/images/hero-location-naples.optimized.webp";
import { assetUrl } from "@/lib/asset-url";
import type { ConditionPageMap } from "@/lib/condition-page-types";

const parkinsonsRelatedImage = "/images/services/senior-care.webp";
const painRelatedImage = "/images/services/planning-transitions.webp";
const breathingRelatedImage = "/images/dr-addys-reve.webp";

export const palliativeConditionPagesB = {
  "/palliative-care/for-dementia": {
    path: "/palliative-care/for-dementia",
    category: "Palliative Care",
    parentHub: { label: "Back to Palliative Care", href: "/palliative-care" },
    hero: {
      title: "Comfort and clarity when dementia changes how your loved one communicates.",
      subtitleBold: "Behavior can be a clue, not simply a problem.",
      subtitle:
        "Faithful Care helps Naples families look for pain, illness, medication effects, swallowing concerns, and caregiver strain while keeping the person’s values at the center of serious-illness care.",
      marqueeItems: ["Symptom clues", "Family guidance", "Care planning", "Naples, FL"],
      image: assetUrl(heroSeniorWoman),
      imageMobile: assetUrl(heroSeniorWomanMobile),
      imageAlt: "Clinician listening to an older adult and a family care partner during a dementia care conversation",
      imagePosition: "84% top",
      imagePositionMobile: "100% 42%",
    },
    quickFacts: [
      { icon: Brain, label: "Care focus", value: "Comfort, communication, safety, and daily function" },
      { icon: UsersThree, label: "Care partnership", value: "The person, family, proxy, and clinical teams" },
      { icon: Warning, label: "Call today", value: "Sudden confusion, new pain behavior, fever, or swallowing change" },
    ],
    sections: [
      {
        type: "editorial",
        eyebrow: "Read the change",
        title: "When behavior may be communication.",
        description:
          "A person living with dementia may not be able to describe pain, nausea, fear, constipation, thirst, or a medication side effect. A new grimace, guarded posture, repeated calling out, withdrawal, restlessness, or resistance to care can be a signal. The useful question is not only ‘How do we stop this behavior?’ but ‘What changed, and what might this person be trying to communicate?’",
        image: assetUrl(naplesDementia),
        imageAlt: "Quiet Gulf shoreline and neighborhood in Naples, Florida",
        imagePosition: "center 58%",
        bullets: [
          "Compare the change with the person’s usual pattern, not with another person who has dementia.",
          "Record when it began, what happened just before it, and what seemed to make it better or worse.",
          "Look for physical clues such as fever, a fall, reduced drinking, constipation, cough, a wound, or trouble swallowing.",
          "Bring the full medication list, including recent additions, dose changes, and nonprescription products.",
        ],
        callout:
          "A sudden change in attention, alertness, or behavior can reflect an acute illness or delirium. It should not automatically be attributed to dementia progression.",
      },
      {
        type: "care-levels",
        eyebrow: "Know when to act",
        title: "Separate an emergency from a same-day change and planned support.",
        description:
          "Dementia can make symptoms harder to report. A clear action guide helps families respond to the change instead of waiting for the person to describe it perfectly.",
        items: [
          {
            tone: "emergency",
            label: "Call 911",
            title: "Breathing, consciousness, choking, seizure, or stroke signs",
            description:
              "Call for emergency help if the person cannot breathe, is choking, becomes unresponsive, has a seizure, or develops sudden facial droop, arm weakness, speech difficulty, or another possible stroke sign.",
            action: "Call 911. Do not drive the person yourself when a life-threatening emergency may be occurring.",
          },
          {
            tone: "today",
            label: "Call the care team today",
            title: "A sudden decline or a new symptom appeared",
            description:
              "New confusion, agitation, sleepiness, fever, reduced fluids, new pain behavior, a fall, a medication problem, or coughing and difficulty during meals deserves prompt clinical guidance.",
            action: "Describe the person’s baseline, exactly what changed, when it began, and any recent illness or medication change.",
          },
          {
            tone: "routine",
            label: "Plan a structured review",
            title: "Comfort or caregiving needs are changing gradually",
            description:
              "Schedule a review for gradual changes in sleep, appetite, mobility, continence, communication, medication burden, caregiver capacity, or future-care questions.",
            action: "Bring the person’s proxy or care partner, medication list, symptom notes, and any existing advance-care documents.",
          },
        ],
        note:
          "If the person already has individualized emergency or goals-of-care instructions, keep them accessible and follow the plan provided by the treating team.",
      },
      {
        type: "detail-grid",
        eyebrow: "A whole-person comfort review",
        eyebrowColor: "primary",
        title: "Six places to look when words become less reliable.",
        description:
          "Palliative care does not reduce the person to a memory score. It looks at physical symptoms, the environment, daily function, medications, and the decisions the family is carrying.",
        statNumber: "6",
        statLabel: "connected areas can explain distress and make the next care conversation more specific",
        cards: [
          {
            icon: Eye,
            title: "Nonverbal pain clues",
            description:
              "Grimacing, guarding, moaning, tense posture, disrupted sleep, withdrawal, or agitation may be clues. Note where touch or movement seems to trigger discomfort.",
          },
          {
            icon: Brain,
            title: "Agitation and environment",
            description:
              "Noise, unfamiliar routines, fear, overstimulation, loneliness, or an unmet need can add distress. Record the setting and what calmed the person.",
          },
          {
            icon: Drop,
            title: "Eating and swallowing",
            description:
              "Coughing with food or drinks, pocketing food, a wet-sounding voice, choking, weight change, or repeated chest infections should be reported rather than managed by guesswork.",
          },
          {
            icon: PersonSimpleWalk,
            title: "Mobility, skin, and falls",
            description:
              "Less movement can affect comfort and skin. New weakness, a fall, redness, a wound, or a change in how the person transfers needs clinical context and a safer plan.",
          },
          {
            icon: Pill,
            title: "Medication effects",
            description:
              "Sedation, constipation, dizziness, urinary symptoms, appetite changes, and interactions can look like disease progression. Do not stop medicines without prescriber guidance.",
          },
          {
            icon: HandHeart,
            title: "Family decisions",
            description:
              "Care partners may be balancing safety, hospital transfers, tests, feeding decisions, comfort, and the person’s previously expressed wishes. Those tradeoffs deserve a documented conversation.",
          },
        ],
      },
      {
        type: "split-panel",
        eyebrow: "Bring a one-week snapshot",
        title: "What changed this week?",
        description:
          "A short dated record gives the care team a clearer starting point than ‘things are worse.’ Include what stayed normal as well as what changed.",
        tone: "plain",
        items: [
          {
            icon: Notebook,
            title: "Behavior and alertness",
            description:
              "Note new restlessness, withdrawal, fear, sleepiness, hallucinations, nighttime changes, or times when the person seems more or less engaged.",
          },
          {
            icon: Drop,
            title: "Food, fluids, and elimination",
            description:
              "Track meaningful changes in eating, drinking, coughing with meals, urination, bowel movements, nausea, or vomiting.",
          },
          {
            icon: PersonSimpleWalk,
            title: "Movement and safety",
            description:
              "Record falls, near-falls, new weakness, difficulty transferring, reduced walking, pressure areas, or new dependence with personal care.",
          },
          {
            icon: Package,
            title: "Medicines and recent events",
            description:
              "List new prescriptions, dose or schedule changes, missed doses, urgent visits, infections, injuries, and changes in the caregiving environment.",
          },
        ],
      },
      {
        type: "editorial",
        eyebrow: "Plan while preferences can still lead",
        title: "Earlier conversations can protect the person’s voice later.",
        description:
          "Dementia may eventually affect the ability to make or communicate complex medical decisions. Planning is not a prediction of when a crisis will happen. It is a way to identify a trusted decision-maker, share what quality of life means to the person, review existing documents, and decide how the family and clinicians will revisit choices as the illness changes.",
        image: assetUrl(naplesDementiaPlanning),
        imageAlt: "Calm Naples neighborhood setting representing advance care planning close to home",
        imagePosition: "center 50%",
        reversed: true,
        variant: "secondary",
        bullets: [
          "Name the health care proxy or decision-maker and make sure the clinical record contains current contact information.",
          "Discuss values and preferences before a hospital, feeding, infection, or treatment decision becomes urgent.",
          "Bring advance directives or medical orders to visits and ask how they apply in the current stage of illness.",
          "Revisit the plan after a major hospitalization, loss of function, new swallowing problem, or change in caregiving capacity.",
        ],
      },
      {
        type: "visit-steps",
        eyebrow: "Prepare for the conversation",
        title: "Turn many small observations into a clearer comfort plan.",
        subtitle:
          "A useful dementia palliative visit combines the person’s history with what the family sees between appointments.",
        steps: [
          {
            icon: ClipboardText,
            title: "Describe the baseline and the change",
            description:
              "Write down what the person could usually do or communicate, what is different now, when it began, and any pattern by time, activity, meal, or medication.",
          },
          {
            icon: Pill,
            title: "Bring the complete care picture",
            description:
              "Bring medicines, recent hospital or specialist records, known diagnoses, allergies, advance-care documents, and the contact information for the proxy and main care partners.",
          },
          {
            icon: ListChecks,
            title: "Leave with roles and next actions",
            description:
              "Confirm what symptoms to watch, whom to call, which clinician owns each follow-up item, and when the comfort and care plan should be reviewed again.",
          },
        ],
        ctaText: "Ask about dementia care",
        ctaHref: "/contact",
      },
    ],
    related: {
      eyebrow: "Connected support",
      title: "Dementia care works better when the family is part of the plan.",
      description:
        "Symptom support, medication review, fall prevention, and future-care conversations should connect instead of living in separate records.",
      featured: {
        title: "Patient and family support",
        description:
          "Prepare questions, clarify the family’s role, and keep the person’s values visible when care decisions become more complex.",
        href: "/palliative-care/patient-family-support",
        image: "/images/services/patient-family-support.webp",
        imageAlt: "Older patient and family discussing care priorities with a clinician",
      },
      links: [
        {
          title: "Memory screening",
          description: "Review a new memory concern and learn why a brief screen is not the same as a dementia diagnosis.",
          href: "/primary-care/memory-screening",
        },
        {
          title: "Fall prevention",
          description: "Connect balance, medicines, vision, home hazards, and recent falls in one prevention review.",
          href: "/primary-care/fall-prevention",
        },
        {
          title: "Medication review for seniors",
          description: "Reconcile prescriptions, nonprescription products, side effects, and practical barriers safely.",
          href: "/primary-care/medication-review-for-seniors",
        },
        {
          title: "Planning and transitions",
          description: "Prepare for changes in setting, function, goals, and decision-making before a crisis forces the conversation.",
          href: "/palliative-care/planning-transitions",
        },
      ],
    },
    faqTitle: "Dementia palliative care, explained without assumptions",
    faqDescription:
      "These answers help families understand the role of palliative care and prepare specific questions for the treating team.",
    faqs: [
      {
        question: "Does palliative care for dementia mean the person is in the final stage?",
        answer:
          "No. Palliative care focuses on comfort, quality of life, symptom relief, care coordination, and decisions that reflect the person’s values. It can be introduced alongside ongoing dementia and primary care and is not limited to the final days or months of life.",
      },
      {
        question: "Does palliative care replace the neurologist or primary care clinician?",
        answer:
          "No. The neurologist, primary care clinician, and other specialists continue diagnosing and treating medical conditions. Palliative care adds support for symptoms, communication, caregiver needs, and complex decisions and should coordinate with those clinicians.",
      },
      {
        question: "How can family members recognize pain when a person cannot explain it?",
        answer:
          "Look for a change from the person’s baseline, such as grimacing, guarding, moaning, tense posture, withdrawal, sleep disruption, agitation, or resistance during movement or personal care. These signs are not proof of a specific cause, so describe them to the clinical team for evaluation.",
      },
      {
        question: "What swallowing changes should be reported?",
        answer:
          "Report coughing or choking with food or drinks, food staying in the mouth, a wet or gurgly voice after swallowing, prolonged meals, weight loss, dehydration concerns, or repeated chest infections. Call 911 if the person is choking or cannot breathe. Do not change food texture or use swallowing techniques without individualized guidance.",
      },
      {
        question: "Can the family participate if the person has trouble communicating?",
        answer:
          "Yes. Family and care partners can describe the person’s baseline, symptoms, routines, prior values, and what has changed. The care team should still include the person as much as possible and follow the legally authorized decision-maker and valid advance-care documents when decisions exceed the person’s current capacity.",
      },
      {
        question: "How is hospice different from palliative care for dementia?",
        answer:
          "Both focus on comfort and quality of life, but hospice is a specific form of palliative care generally used near the end of life under eligibility and coverage rules. Palliative care can begin earlier and may occur alongside treatment directed at the illness. A clinician and the hospice organization can explain individual eligibility and services.",
      },
    ],
    sources: [
      {
        label: "What Are Palliative Care and Hospice Care?",
        href: "https://www.nia.nih.gov/health/hospice-and-palliative-care/what-are-palliative-care-and-hospice-care",
        publisher: "National Institute on Aging",
      },
      {
        label: "Care in the Last Stages of Alzheimer's Disease",
        href: "https://www.nia.nih.gov/health/alzheimers-caregiving/care-last-stages-alzheimers-disease",
        publisher: "National Institute on Aging",
      },
      {
        label: "Assessing Cognitive Impairment in Older Patients",
        href: "https://www.nia.nih.gov/health/health-care-professionals-information/assessing-cognitive-impairment-older-patients",
        publisher: "National Institute on Aging",
      },
      {
        label: "Advance Care Planning and Health Care Decisions",
        href: "https://www.nia.nih.gov/health/advance-care-planning/advance-care-planning-and-health-care-decisions-tips-caregivers-and",
        publisher: "National Institute on Aging",
      },
    ],
    cta: {
      subtitle: "Dementia palliative support in Naples",
      title: "Bring the change into focus before the next decision feels urgent.",
      description:
        "Call Faithful Care to request a dementia palliative care visit and ask which records, medicines, and care-planning documents to bring.",
      primaryText: "Ask about dementia care",
    },
  },

  "/palliative-care/for-parkinsons": {
    path: "/palliative-care/for-parkinsons",
    category: "Palliative Care",
    parentHub: { label: "Back to Palliative Care", href: "/palliative-care" },
    hero: {
      title: "Parkinson’s support for the life happening between neurology visits.",
      subtitleBold: "Movement is only part of the story.",
      subtitle:
        "Faithful Care helps Naples patients and families organize movement, swallowing, sleep, mood, constipation, medication timing, and future-care concerns around the goals that matter most.",
      marqueeItems: ["Symptom support", "Medication timeline", "Family planning", "Naples, FL"],
      image: assetUrl(heroDoctorFaithfulCare),
      imageMobile: assetUrl(heroDoctorFaithfulCareMobile),
      imageAlt: "Clinician discussing daily function and Parkinson's symptoms with an older adult",
      imagePosition: "84% top",
      imagePositionMobile: "100% 42%",
    },
    quickFacts: [
      { icon: Stethoscope, label: "Works alongside", value: "Neurology, primary care, rehabilitation, and family care" },
      { icon: CalendarCheck, label: "Bring with you", value: "An exact medication and symptom timeline" },
      { icon: HandHeart, label: "Care goal", value: "More comfort, safer function, and clearer decisions" },
    ],
    sections: [
      {
        type: "editorial",
        eyebrow: "Beyond tremor",
        title: "Parkinson’s can affect movement, body systems, and the entire household.",
        description:
          "Freezing, stiffness, and falls may be the visible part of Parkinson’s, while swallowing, constipation, urinary symptoms, sleep, fatigue, mood, hallucinations, and thinking changes create a different burden between appointments. Palliative care helps organize that burden and communicate priorities without replacing the neurologist’s disease-directed treatment.",
        image: assetUrl(naplesParkinsons),
        imageAlt: "Palm-lined residential waterway in Naples viewed from above",
        imagePosition: "center 56%",
        bullets: [
          "Track symptoms by time of day and by their relationship to the medication schedule.",
          "Include non-movement symptoms even when the neurology visit has focused mainly on gait or tremor.",
          "Name which activities have become harder, less safe, or more exhausting for the patient or care partner.",
          "Coordinate questions for neurology, primary care, therapy, and palliative care instead of changing treatment independently.",
        ],
      },
      {
        type: "detail-grid",
        eyebrow: "The complete symptom picture",
        eyebrowColor: "secondary",
        title: "Six areas can shape comfort and independence.",
        description:
          "A structured review helps the care team see what is connected, what changed recently, and which clinician or therapy should own the next action.",
        statNumber: "6",
        statLabel: "domains keep the visit from stopping at tremor, stiffness, or a medication refill",
        cards: [
          {
            icon: Footprints,
            title: "Movement, freezing, and falls",
            description:
              "Record falls, near-falls, freezing, difficulty turning, transfers, and when walking changes in relation to medication, fatigue, or the environment.",
          },
          {
            icon: ChatCircleDots,
            title: "Speech and swallowing",
            description:
              "A softer voice, coughing during meals, food collecting in the mouth, drooling, or weight loss can affect safety, nutrition, and communication.",
          },
          {
            icon: Drop,
            title: "Constipation and urinary symptoms",
            description:
              "Bowel and bladder changes can disrupt sleep, appetite, mobility, and medication routines. Report a new or marked change rather than treating it as inevitable.",
          },
          {
            icon: Gauge,
            title: "Sleep and fatigue",
            description:
              "Daytime sleepiness, fragmented nights, vivid dreams, and fatigue can affect falls, driving, medication timing, and caregiver workload.",
          },
          {
            icon: Brain,
            title: "Mood, hallucinations, and cognition",
            description:
              "Anxiety, depression, apathy, hallucinations, or thinking changes should be described with timing, safety impact, and recent medication or illness changes.",
          },
          {
            icon: UsersThree,
            title: "Caregiver and future planning",
            description:
              "Increasing hands-on help, nighttime supervision, driving questions, and uncertainty about future decisions are clinical parts of the care plan, not side issues.",
          },
        ],
      },
      {
        type: "stories",
        eyebrow: "Build the medication timeline",
        title: "Show what happens before, between, and after each dose.",
        description:
          "Parkinson’s symptoms and side effects can change across the day. An exact timeline gives neurology and the rest of the care team evidence they can use safely.",
        toneClass: "bg-[#eef5f8]",
        stories: [
          {
            icon: Pill,
            title: "Write the real schedule",
            description:
              "List the medicine name, dose, exact time it is actually taken, meals, delayed or missed doses, and any recent changes. Bring bottles or an updated medication list rather than relying on memory.",
            tags: ["Exact dose times", "Meals", "Missed doses", "Recent changes"],
            image: "/images/services/senior-care.webp",
            imageAlt: "Clinician reviewing a daily care routine with an older patient",
            note: "Do not add, stop, split, or move Parkinson’s doses without guidance from the prescribing clinician.",
          },
          {
            icon: ChartLineUp,
            title: "Mark ON, OFF, and adverse effects",
            description:
              "Note when movement is easier, when symptoms return before the next dose, and when dyskinesia, dizziness, sleepiness, nausea, confusion, or hallucinations occur. Include what activity you were trying to do.",
            tags: ["Mobility", "Freezing", "Dizziness", "Hallucinations"],
            image: "/images/services/planning-transitions.webp",
            imageAlt: "Patient and family member organizing health observations for a clinical visit",
            note: "A dated pattern is more useful than changing the schedule to test a theory at home.",
          },
          {
            icon: ListChecks,
            title: "Turn the pattern into coordinated questions",
            description:
              "Ask which concern belongs with neurology, primary care, rehabilitation, speech-language pathology, or palliative care and how each team will receive the updated plan.",
            tags: ["Neurology", "Primary care", "Therapy", "Palliative care"],
            image: "/images/services/patient-family-support.webp",
            imageAlt: "Care team discussion with a patient and family care partner",
            note: "Bring one shared timeline so different teams are not working from different medication histories.",
          },
        ],
      },
      {
        type: "comparison",
        eyebrow: "Different roles, one person",
        title: "Neurology and palliative care answer different but connected questions.",
        description:
          "The aim is coordinated care. Adding palliative support does not mean stopping Parkinson’s treatment or replacing the clinician managing the disease.",
        leftHeading: "Neurology focus",
        rightHeading: "Palliative-care focus",
        rows: [
          {
            label: "Treatment",
            left: "Diagnoses Parkinson’s and manages disease-directed medicines, device or procedure decisions, and neurologic follow-up.",
            right: "Clarifies the symptom burden, treatment tradeoffs, comfort priorities, and how the plan affects daily life and the family.",
          },
          {
            label: "Symptoms",
            left: "Evaluates movement and non-movement symptoms in relation to Parkinson’s and its treatment.",
            right: "Helps organize pain, breathlessness, sleep, mood, constipation, nausea, fatigue, and other distress across conditions.",
          },
          {
            label: "Function",
            left: "May coordinate physical, occupational, and speech-language therapies for movement, communication, and swallowing needs.",
            right: "Connects function with the person’s goals, caregiver capacity, safety, and acceptable treatment burden.",
          },
          {
            label: "Planning",
            left: "Explains the neurologic condition, expected changes, and treatment options within its specialty scope.",
            right: "Facilitates conversations about values, decision-makers, future crises, and how choices will be revisited as needs change.",
          },
        ],
        note:
          "Primary care remains important for infections, blood pressure, bone health, medication reconciliation, prevention, and other conditions that can change Parkinson’s symptoms or safety.",
      },
      {
        type: "care-levels",
        eyebrow: "Know when to act",
        title: "Do not assume every sudden change is ordinary Parkinson’s progression.",
        description:
          "A rapid change can reflect injury, infection, a medication problem, stroke, dehydration, or another urgent condition. Compare it with the person’s usual baseline.",
        items: [
          {
            tone: "emergency",
            label: "Call 911",
            title: "Choking, severe breathing trouble, stroke signs, or serious injury",
            description:
              "Call for emergency help if the person is choking or cannot breathe, becomes unresponsive, has possible stroke signs, or has a fall with serious injury, heavy bleeding, or inability to move safely.",
            action: "Call 911 and follow dispatcher instructions. Do not give food, drink, or pills to someone who cannot swallow safely.",
          },
          {
            tone: "today",
            label: "Call the care team today",
            title: "A meaningful decline appeared quickly",
            description:
              "A fall with injury, new coughing or choking with meals, sudden confusion or hallucinations, inability to take essential medicines, fever, or marked functional decline needs prompt guidance.",
            action: "Report the exact medication schedule, last known baseline, symptom onset, falls, swallowing changes, and any recent illness.",
          },
          {
            tone: "routine",
            label: "Plan a review",
            title: "Persistent symptoms or dependence are increasing",
            description:
              "Schedule a review for repeated falls or freezing, ongoing constipation, sleep or mood concerns, growing hands-on care needs, or future-care questions.",
            action: "Bring a dated symptom-and-dose timeline and identify the top two activities or concerns you want the plan to address.",
          },
        ],
      },
      {
        type: "visit-steps",
        eyebrow: "Prepare once, inform every team",
        title: "Build a Parkinson’s visit around the day the person actually lives.",
        subtitle:
          "The most useful record combines dose times, symptoms, function, safety, and the family’s priorities.",
        steps: [
          {
            icon: CalendarCheck,
            title: "Map one representative day",
            description:
              "Record waking, meals, exact dose times, movement changes, naps, bowel routine, falls or freezing, and the times when symptoms interfere most with essential activities.",
          },
          {
            icon: ClipboardText,
            title: "Name the burden and the goal",
            description:
              "Identify the symptom causing the most distress, the task the person wants to preserve, and the caregiving responsibility that has become hardest or least safe.",
          },
          {
            icon: UsersThree,
            title: "Agree on who owns each next step",
            description:
              "Confirm which questions go to neurology, primary care, therapy, or palliative care, and how medication or care-plan changes will be shared across teams.",
          },
        ],
        ctaText: "Ask about Parkinson’s",
        ctaHref: "/contact",
      },
    ],
    related: {
      eyebrow: "Connected care",
      title: "Keep movement, medicines, symptoms, and planning in one care story.",
      description:
        "Parkinson’s support becomes more useful when neurology treatment, primary care, fall prevention, and family guidance share the same baseline and priorities.",
      featured: {
        title: "Senior primary care",
        description:
          "Connect Parkinson’s with blood pressure, infections, bone health, prevention, other conditions, and the complete medication list.",
        href: "/primary-care/senior-care",
        image: parkinsonsRelatedImage,
        imageAlt: "Clinician supporting an older adult during a senior primary care visit",
      },
      links: [
        {
          title: "Fall prevention",
          description: "Review falls, near-falls, medicines, vision, footwear, and environmental risks as one safety pattern.",
          href: "/primary-care/fall-prevention",
        },
        {
          title: "Medication review for seniors",
          description: "Reconcile every prescription and nonprescription product without changing the neurologist’s plan independently.",
          href: "/primary-care/medication-review-for-seniors",
        },
        {
          title: "Patient and family support",
          description: "Bring caregiver observations and workload into the clinical plan before the family reaches a crisis.",
          href: "/palliative-care/patient-family-support",
        },
        {
          title: "Planning and transitions",
          description: "Prepare for changes in function, setting, decision-making, and care needs while the person can guide the conversation.",
          href: "/palliative-care/planning-transitions",
        },
      ],
    },
    faqTitle: "Practical questions about palliative care for Parkinson’s",
    faqDescription:
      "Use these answers to understand the care model and prepare a more specific conversation with neurology and the rest of the team.",
    faqs: [
      {
        question: "Can palliative care begin while Parkinson’s treatment continues?",
        answer:
          "Yes. Palliative care can be added alongside neurology and disease-directed treatment. It focuses on quality of life, symptom burden, family support, communication, and decisions. It does not require stopping Parkinson’s medicines or entering hospice.",
      },
      {
        question: "Which Parkinson’s symptoms belong in a palliative care visit?",
        answer:
          "Discuss any symptom affecting comfort, function, sleep, safety, or the family, including pain, fatigue, constipation, nausea, breathlessness, anxiety, depression, hallucinations, swallowing difficulty, and caregiver strain. Neurology and other specialists remain involved for diagnosis and disease-specific treatment.",
      },
      {
        question: "Why is an exact medication timeline important?",
        answer:
          "Parkinson’s symptoms and side effects can vary in relation to dose timing, meals, missed doses, and time of day. A dated timeline helps the prescribing clinician evaluate the pattern. Do not test a new schedule, add doses, or stop medicine without the prescriber’s guidance.",
      },
      {
        question: "When does swallowing trouble need attention?",
        answer:
          "Report coughing during meals, food or pills staying in the mouth, a wet-sounding voice after swallowing, drooling, prolonged meals, weight loss, dehydration concerns, or repeated chest infections. Call 911 if the person is choking or cannot breathe. Individualized assessment may involve a speech-language professional.",
      },
      {
        question: "Can palliative care help the family plan for future changes?",
        answer:
          "Yes. The conversation can identify the person’s priorities, decision-maker, acceptable treatment burden, caregiving limits, and questions to revisit after a major loss of function or hospitalization. Planning should occur while the person can participate as fully as possible.",
      },
      {
        question: "How is hospice different from palliative care in Parkinson’s?",
        answer:
          "Hospice is a specific form of palliative care generally used near the end of life under eligibility and coverage rules. Palliative care can begin much earlier and can accompany disease-directed treatment. A clinician and hospice organization can explain whether hospice is appropriate for an individual situation.",
      },
    ],
    sources: [
      {
        label: "Parkinson's Disease: Challenges, Progress, and Promise",
        href: "https://www.ninds.nih.gov/current-research/focus-disorders/parkinsons-disease-research/parkinsons-disease-challenges-progress-and-promise",
        publisher: "National Institute of Neurological Disorders and Stroke",
      },
      {
        label: "What Are Palliative Care and Hospice Care?",
        href: "https://www.nia.nih.gov/health/hospice-and-palliative-care/what-are-palliative-care-and-hospice-care",
        publisher: "National Institute on Aging",
      },
      {
        label: "Parkinson's Resources for Veterans and Families",
        href: "https://www.parkinsons.va.gov/patients.asp",
        publisher: "U.S. Department of Veterans Affairs",
      },
      {
        label: "Signs and Symptoms of Stroke",
        href: "https://www.cdc.gov/stroke/signs-symptoms/index.html",
        publisher: "Centers for Disease Control and Prevention",
      },
    ],
    cta: {
      subtitle: "Parkinson’s palliative support in Naples",
      title: "Bring the real day, not only the diagnosis, into the care plan.",
      description:
        "Call Faithful Care to request a Parkinson’s palliative visit and ask which medication records, specialist notes, and care-planning documents to bring.",
      primaryText: "Ask about Parkinson’s",
    },
  },

  "/palliative-care/pain-management": {
    path: "/palliative-care/pain-management",
    category: "Palliative Care",
    parentHub: { label: "Back to Palliative Care", href: "/palliative-care" },
    hero: {
      title: "Pain management starts with the story pain is changing.",
      subtitleBold: "A number is useful, but it is not the whole assessment.",
      subtitle:
        "Faithful Care helps Naples patients with serious illness describe the pattern, function, treatments tried, side effects, and goals needed for a safer, coordinated pain conversation.",
      marqueeItems: ["Pain pattern", "Daily function", "Medication safety", "Naples, FL"],
      image: assetUrl(heroDoctorWoman),
      imageMobile: assetUrl(heroDoctorWomanMobile),
      imageAlt: "Clinician listening to an adult describe pain and its effect on daily life",
      imagePosition: "84% top",
      imagePositionMobile: "100% 42%",
    },
    quickFacts: [
      { icon: Notebook, label: "Bring the story", value: "Location, quality, timing, triggers, relief, and function" },
      { icon: ShieldCheck, label: "Safety review", value: "Medicines, nonprescription products, side effects, and interactions" },
      { icon: HandHeart, label: "Care goal", value: "Less suffering and more ability to do what matters" },
    ],
    sections: [
      {
        type: "editorial",
        eyebrow: "More than a 0-to-10 score",
        title: "Pain becomes clearer when you describe what it does.",
        description:
          "A rating can show intensity, but it does not identify the cause or reveal how pain interrupts sleep, walking, breathing, eating, personal care, concentration, or time with family. A useful assessment combines the location and sensation with timing, triggers, treatments tried, side effects, and the function the person most wants to preserve.",
        image: assetUrl(naplesPain),
        imageAlt: "Coastal water, palms, and homes in Naples, Florida",
        imagePosition: "center 55%",
        bullets: [
          "Point to where the pain begins and whether it travels to another area.",
          "Use words such as aching, burning, pressure, cramping, stabbing, tingling, or electric when they fit.",
          "Note whether it is constant, comes in episodes, or breaks through an otherwise stable pattern.",
          "Describe the activity, sleep, appetite, breathing, mood, or relationships that pain is limiting.",
        ],
        callout:
          "The goal is an individualized plan that reduces suffering and supports function. No responsible pain plan can promise zero pain or guarantee one treatment will work.",
      },
      {
        type: "comparison",
        eyebrow: "Name the pattern",
        title: "Acute, persistent, and breakthrough pain need different context.",
        description:
          "These terms describe timing, not a diagnosis. A clinician still needs to evaluate the likely cause, severity, associated symptoms, and treatment risks.",
        leftHeading: "How the pattern may present",
        rightHeading: "What to document for the visit",
        rows: [
          {
            label: "Acute pain",
            left: "Begins suddenly or recently and may be linked to an injury, procedure, infection, or new medical problem.",
            right: "Exact onset, event or symptom that came with it, location, severity, and whether it is rapidly worsening or accompanied by emergency signs.",
          },
          {
            label: "Persistent pain",
            left: "Continues over time and may affect sleep, movement, appetite, mood, personal care, or participation in treatment.",
            right: "The daily pattern, functional limits, treatments tried, benefit, side effects, and the most important activity the person wants to regain or preserve.",
          },
          {
            label: "Breakthrough pain",
            left: "A temporary flare that rises above an otherwise more stable background pain pattern.",
            right: "Frequency, duration, triggers, relationship to activity or the current plan, and whether relief occurred when the prescribed instructions were followed.",
          },
          {
            label: "Pain with a new warning sign",
            left: "Pain occurs with chest pressure, breathing difficulty, fainting, stroke signs, a serious injury, fever, or another abrupt change.",
            right: "Treat the warning sign as urgent or emergent rather than waiting to discuss it at a routine pain follow-up.",
          },
        ],
        note:
          "Do not use someone else’s medicine, combine products without checking ingredients, or increase, stop, crush, or alter prescribed pain medicine without clinical guidance.",
      },
      {
        type: "detail-grid",
        eyebrow: "A safer pain review",
        eyebrowColor: "primary",
        title: "Six questions turn a pain complaint into a coordinated plan.",
        description:
          "Pain in serious illness may have more than one contributor. The assessment should connect the pattern, function, medicines, emotional strain, and the clinicians already involved.",
        statNumber: "6",
        statLabel: "parts of the assessment help reveal both the burden and the risks around treatment",
        cards: [
          {
            icon: Stethoscope,
            title: "Likely cause and pattern",
            description:
              "Where is the pain, what does it feel like, when did it begin, what triggers it, and are there new symptoms that require a separate evaluation?",
          },
          {
            icon: PersonSimpleWalk,
            title: "Function that matters",
            description:
              "Name what pain prevents: sleeping, walking, breathing deeply, eating, bathing, treatment participation, or time with people who matter.",
          },
          {
            icon: Pill,
            title: "Medication reconciliation",
            description:
              "Review prescriptions, over-the-counter products, patches, creams, supplements, allergies, kidney or liver concerns, alcohol, and the actual schedule used.",
          },
          {
            icon: ShieldCheck,
            title: "Side effects and safety",
            description:
              "Constipation, nausea, sleepiness, dizziness, confusion, falls, breathing changes, and difficulty swallowing can alter the balance of benefit and risk.",
          },
          {
            icon: Brain,
            title: "Emotional and social load",
            description:
              "Fear, isolation, depression, anxiety, poor sleep, caregiving stress, and financial barriers can intensify suffering and complicate a plan.",
          },
          {
            icon: UsersThree,
            title: "Coordination across teams",
            description:
              "Identify who is prescribing, which specialist is treating the underlying illness, what has already been tried, and who should respond if the plan stops working.",
          },
        ],
      },
      {
        type: "split-panel",
        eyebrow: "Bring your pain story",
        title: "Four notes can make the visit more useful.",
        description:
          "You do not need a perfect diary. A few dated examples can show the pattern and keep the conversation grounded in real function and safety.",
        tone: "plain",
        items: [
          {
            icon: Notebook,
            title: "Where and what it feels like",
            description:
              "Use a body outline or plain words. Mark whether pain travels and whether different areas feel different from one another.",
          },
          {
            icon: CalendarCheck,
            title: "When it happens",
            description:
              "Record onset, duration, time of day, triggers, breakthrough episodes, sleep interruption, and any relationship to activity or treatment.",
          },
          {
            icon: Package,
            title: "What you tried",
            description:
              "List prescribed and nonprescription treatments, exact use, benefit, side effects, and anything you stopped or avoided because of concern or cost.",
          },
          {
            icon: HandHeart,
            title: "What you want to do",
            description:
              "Choose one or two goals such as sleeping longer, walking to the kitchen, tolerating a treatment visit, eating with family, or completing personal care.",
          },
        ],
      },
      {
        type: "care-levels",
        eyebrow: "Pain can be a warning sign",
        title: "Know when not to wait for a routine pain visit.",
        description:
          "A new pain pattern may need urgent evaluation even when someone already lives with chronic or serious-illness pain.",
        items: [
          {
            tone: "emergency",
            label: "Call 911",
            title: "Pain with a life-threatening warning sign",
            description:
              "Chest pain or pressure, severe breathing difficulty, loss of consciousness, possible stroke signs, or pain after a serious injury can be emergencies.",
            action: "Call 911. Do not drive yourself or delay because you think the symptom may be part of the existing illness.",
          },
          {
            tone: "today",
            label: "Call the care team today",
            title: "Pain is new, rapidly increasing, or not responding as instructed",
            description:
              "Promptly report a major change, pain not relieved when the prescribed plan is followed, inability to take the medicine, or significant sleepiness, confusion, falls, vomiting, constipation, or breathing change.",
            action: "Use the contact instructions in your care plan. Do not take extra doses or combine products unless a clinician directs you.",
          },
          {
            tone: "routine",
            label: "Schedule a review",
            title: "Persistent pain is limiting daily life",
            description:
              "Book a structured review when pain repeatedly interferes with sleep, movement, eating, personal care, mood, activity, or treatment participation.",
            action: "Bring a short pain record and every medicine or product you use for relief.",
          },
        ],
      },
      {
        type: "visit-steps",
        eyebrow: "From symptom to shared plan",
        title: "Leave the pain visit knowing what happens next.",
        subtitle:
          "A coordinated plan states the goals, the safe instructions, the monitoring, and which clinician owns each follow-up decision.",
        steps: [
          {
            icon: ClipboardText,
            title: "Tell the pattern and function story",
            description:
              "Describe the pain, the timing, associated symptoms, treatments tried, and the specific daily activities it limits rather than relying on a number alone.",
          },
          {
            icon: ShieldCheck,
            title: "Review benefit, burden, and safety",
            description:
              "Discuss side effects, other conditions, all medicines and products, falls, alertness, bowel function, swallowing, and the person’s treatment preferences.",
          },
          {
            icon: ListChecks,
            title: "Confirm the follow-up rules",
            description:
              "Ask what to monitor, when to call, who manages each part of the plan, and when pain and function will be reassessed.",
          },
        ],
        ctaText: "Request a pain review",
        ctaHref: "/contact",
      },
    ],
    related: {
      eyebrow: "Connected symptom support",
      title: "Pain care should connect with the illness, medicines, and goals.",
      description:
        "Palliative support can organize pain alongside other symptoms and treatment decisions without separating it from the clinicians treating the underlying condition.",
      featured: {
        title: "Planning and transitions",
        description:
          "Clarify priorities, treatment burden, decision-makers, and how the plan should change after a hospitalization or major shift in function.",
        href: "/palliative-care/planning-transitions",
        image: painRelatedImage,
        imageAlt: "Patient and care partner discussing future care decisions with a clinician",
      },
      links: [
        {
          title: "Symptom relief",
          description: "Connect pain with nausea, fatigue, constipation, anxiety, sleep, appetite, and other sources of distress.",
          href: "/palliative-care/symptom-relief",
        },
        {
          title: "Palliative care for cancer",
          description: "Coordinate cancer-related symptoms and treatment burden with oncology and primary care.",
          href: "/palliative-care/for-cancer",
        },
        {
          title: "Medication review for seniors",
          description: "Reconcile prescriptions and nonprescription products and discuss side effects or interaction concerns.",
          href: "/primary-care/medication-review-for-seniors",
        },
        {
          title: "Patient and family support",
          description: "Give patients and care partners a shared place to ask questions and state what matters most.",
          href: "/palliative-care/patient-family-support",
        },
      ],
    },
    faqTitle: "Pain management questions worth asking out loud",
    faqDescription:
      "These answers explain what a palliative pain review can and cannot promise and how to prepare safely.",
    faqs: [
      {
        question: "Is a 0-to-10 pain score enough to choose treatment?",
        answer:
          "No. The score is one clue. The clinician also needs the location, quality, onset, pattern, triggers, associated symptoms, treatments tried, side effects, medical history, and the effect on sleep, movement, eating, breathing, mood, and daily function.",
      },
      {
        question: "Does palliative pain care mean stopping treatment for the illness?",
        answer:
          "No. Palliative care can work alongside oncology, cardiology, neurology, pulmonology, primary care, and other disease-directed treatment. Its role is to reduce suffering, support function, coordinate symptoms, and clarify goals and tradeoffs.",
      },
      {
        question: "Will the visit guarantee that all pain goes away?",
        answer:
          "No responsible clinician can guarantee zero pain or that one treatment will work. The plan is individualized and may aim to reduce pain, improve a specific function, limit side effects, and set clear rules for reassessment and escalation.",
      },
      {
        question: "Should I bring over-the-counter pain products and supplements?",
        answer:
          "Yes. Bring or list every prescription, over-the-counter medicine, cream, patch, vitamin, supplement, and alcohol or cannabis product used. Products can share ingredients, interact, or create added risks based on age, kidney or liver health, falls, swallowing, and other medicines.",
      },
      {
        question: "What is breakthrough pain?",
        answer:
          "Breakthrough pain is a temporary flare that rises above a more stable background pain pattern. Record its frequency, duration, triggers, functional impact, and response when the prescribed plan is followed. Do not take extra medicine unless the clinician has given explicit instructions.",
      },
      {
        question: "When should worsening pain be treated as an emergency?",
        answer:
          "Call 911 for pain with chest pressure, severe trouble breathing, loss of consciousness, possible stroke signs, or a serious injury. Contact the care team promptly for new or rapidly increasing pain, major side effects, or pain not relieved when the prescribed plan is followed.",
      },
    ],
    sources: [
      {
        label: "Pain: You Can Get Help",
        href: "https://www.nia.nih.gov/health/pain/pain-you-can-get-help",
        publisher: "National Institute on Aging",
      },
      {
        label: "Pain and Cancer Treatment",
        href: "https://www.cancer.gov/about-cancer/treatment/side-effects/pain",
        publisher: "National Cancer Institute",
      },
      {
        label: "Cancer Pain (Patient Version)",
        href: "https://www.cancer.gov/about-cancer/treatment/side-effects/pain/pain-pdq",
        publisher: "National Cancer Institute",
      },
      {
        label: "Palliative Care in Cancer",
        href: "https://www.cancer.gov/about-cancer/advanced-cancer/care-choices/palliative-care-fact-sheet",
        publisher: "National Cancer Institute",
      },
    ],
    cta: {
      subtitle: "Palliative pain support in Naples",
      title: "Bring the pain story into a safer, more useful care conversation.",
      description:
        "Call Faithful Care to request a pain review and ask which medicine bottles, specialist notes, and symptom records to bring.",
      primaryText: "Request a pain review",
    },
  },

  "/palliative-care/shortness-of-breath": {
    path: "/palliative-care/shortness-of-breath",
    category: "Palliative Care",
    parentHub: { label: "Back to Palliative Care", href: "/palliative-care" },
    hero: {
      title: "Shortness-of-breath support starts with safety, then the cause and the distress.",
      subtitleBold: "A breathing change deserves a clear next step.",
      subtitle:
        "Faithful Care helps Naples patients with serious illness describe the breathing pattern, coordinate evaluation of possible causes, and build symptom-support questions around the plan their treating clinicians provide.",
      marqueeItems: ["Emergency signs", "Breathing pattern", "Cause and comfort", "Naples, FL"],
      image: assetUrl(heroSameDayVisits),
      imageMobile: assetUrl(heroSameDayVisitsMobile),
      imageAlt: "Clinician discussing breathing symptoms and palliative support with an adult patient",
      imagePosition: "82% top",
      imagePositionMobile: "100% 46%",
    },
    urgentNotice: {
      title: "Severe or sudden trouble breathing can be an emergency",
      description:
        "Severe or sudden trouble breathing can be an emergency; call 911 for severe shortness of breath, blue lips or skin, chest pain or pressure, confusion, fainting, or inability to speak normally.",
      suppressHeroActions: true,
    },
    quickFacts: [
      { icon: Warning, label: "Emergency", value: "Severe or sudden trouble breathing can require 911" },
      { icon: Wind, label: "Assessment", value: "Onset, activity, position, related symptoms, and baseline" },
      { icon: Stethoscope, label: "Care goal", value: "Evaluate the cause and reduce breathing distress" },
    ],
    sections: [
      {
        type: "care-levels",
        eyebrow: "Safety comes first",
        title: "Severe or sudden trouble breathing can be an emergency.",
        description:
          "Shortness of breath has many possible causes, and some are life-threatening. Do not wait for a routine appointment when emergency signs are present.",
        items: [
          {
            tone: "emergency",
            label: "Call 911",
            title: "Breathing is severe, sudden, or paired with danger signs",
            description:
              "Call 911 for severe shortness of breath, blue or gray lips or skin, chest pain or pressure, new confusion, fainting, inability to speak normally because of breathing, or another rapidly worsening breathing emergency.",
            action: "Call 911 now. Follow dispatcher instructions and do not drive yourself to the emergency department.",
          },
          {
            tone: "today",
            label: "Call the care team today",
            title: "Breathing is new or worse than the usual baseline",
            description:
              "Promptly report new or increasing breathlessness, fever, new or changed mucus, coughing blood, needing to sit up to breathe, swelling, or a change despite following the prescribed inhaler or oxygen plan.",
            action: "Describe the onset, baseline, related symptoms, medicines or inhalers used, and any oxygen or saturation instructions already provided.",
          },
          {
            tone: "routine",
            label: "Plan a structured review",
            title: "Stable chronic breathlessness limits daily life",
            description:
              "Schedule a review when a stable pattern repeatedly limits walking, bathing, eating, sleep, conversation, or treatment participation, or creates ongoing anxiety and caregiver strain.",
            action: "Bring the medication and inhaler list, recent specialist or hospital records, and a short breathing-and-activity diary.",
          },
        ],
        note:
          "If you have an individualized action plan for heart or lung disease, inhalers, diuretics, or oxygen, follow that plan. Do not start oxygen or change flow settings without the prescribing team’s instructions.",
      },
      {
        type: "editorial",
        eyebrow: "One symptom, many possible causes",
        title: "Breathlessness should not be blamed on one diagnosis without assessment.",
        description:
          "Shortness of breath may relate to heart or lung disease, infection, anemia, a blood clot, fluid, cancer, treatment effects, deconditioning, anxiety, or more than one issue at the same time. Palliative care can help with the distress while the appropriate treating clinicians evaluate and manage the cause.",
        image: assetUrl(naplesBreathing),
        imageAlt: "Aerial view of the Naples shoreline and Gulf of Mexico",
        imagePosition: "center 48%",
        bullets: [
          "State whether the symptom began suddenly or gradually and how it compares with the usual baseline.",
          "Note whether it occurs at rest, with activity, when lying flat, during sleep, or after a meal or treatment.",
          "Report cough, fever, mucus, chest discomfort, palpitations, swelling, dizziness, fainting, bleeding, or a new medicine change.",
          "Bring inhalers, medicines, oxygen instructions, and recent heart, lung, hospital, imaging, or laboratory records when available.",
        ],
        callout:
          "Oxygen is not an automatic treatment for every feeling of breathlessness. Whether it is indicated and how it should be used depends on the cause, measurements, and an individualized prescription.",
      },
      {
        type: "detail-grid",
        eyebrow: "Build the breathing picture",
        eyebrowColor: "secondary",
        title: "Eight details help the team understand what changed.",
        description:
          "A short breathing diary can separate a stable chronic limitation from a new pattern and connect the symptom to the right clinical follow-up.",
        statNumber: "8",
        statLabel: "details turn ‘I cannot catch my breath’ into a pattern the care team can assess",
        cards: [
          {
            icon: CalendarCheck,
            title: "Onset and course",
            description:
              "Write when it began, whether onset was sudden or gradual, whether it is constant or episodic, and whether today differs from the usual baseline.",
          },
          {
            icon: PersonSimpleWalk,
            title: "Activity threshold",
            description:
              "Record what brings it on: walking a certain distance, dressing, bathing, eating, talking, climbing steps, or no activity at all.",
          },
          {
            icon: Gauge,
            title: "Position and time",
            description:
              "Note whether lying flat, nighttime, meals, heat, smoke, or another setting changes the symptom and whether sitting up helps.",
          },
          {
            icon: Pulse,
            title: "Related symptoms",
            description:
              "Report cough, fever, mucus change, chest pain, palpitations, swelling, dizziness, fainting, confusion, or coughing blood.",
          },
          {
            icon: Package,
            title: "Medicines and inhalers",
            description:
              "List exact names, schedules, missed doses, recent changes, technique concerns, benefit, and side effects without changing the plan yourself.",
          },
          {
            icon: Monitor,
            title: "Measurements only with a plan",
            description:
              "If your clinician instructed you to track oxygen saturation, weight, pulse, or another measure, record it with the symptom and activity. A device reading does not replace emergency assessment.",
          },
          {
            icon: HandHeart,
            title: "Impact and distress",
            description:
              "Describe how breathing affects sleep, eating, speech, mobility, treatment, fear, independence, and the care partner’s ability to help safely.",
          },
          {
            icon: ListChecks,
            title: "Existing action plan",
            description:
              "Bring the instructions already provided by cardiology, pulmonology, oncology, or primary care and say whether they were followed and what happened.",
          },
        ],
      },
      {
        type: "comparison",
        eyebrow: "Two jobs that happen together",
        title: "Treat the cause and relieve the distress.",
        description:
          "Palliative support is not a substitute for evaluating a new breathing problem. The safest plan keeps medical assessment and comfort-focused strategies connected.",
        leftHeading: "Evaluate and treat the cause",
        rightHeading: "Reduce breathing distress",
        rows: [
          {
            label: "Main question",
            left: "What heart, lung, blood, infection, medication, treatment, or other problem may be causing or worsening the symptom?",
            right: "What makes the sensation, fear, fatigue, and functional impact more manageable while appropriate treatment continues?",
          },
          {
            label: "Clinical inputs",
            left: "History, examination, medication review, measurements, and testing selected by the treating clinician.",
            right: "The person’s goals, symptom pattern, positioning, pacing, environment, caregiver support, and prescribed symptom plan.",
          },
          {
            label: "Specialist roles",
            left: "Primary care and specialists such as pulmonology, cardiology, oncology, or emergency clinicians address diagnosis and disease-directed treatment.",
            right: "Palliative care helps coordinate symptoms, treatment burden, communication, and quality-of-life priorities across those teams.",
          },
          {
            label: "Oxygen",
            left: "A clinician determines whether oxygen is indicated using the diagnosis, measurements, and prescribing criteria.",
            right: "Breathlessness may still require other individualized strategies; oxygen should not be started or adjusted automatically for the sensation alone.",
          },
        ],
        note:
          "A fan, positioning, pacing, breathing techniques, or other non-drug approaches should be chosen as part of an individualized plan, especially when falls, weakness, infection risk, or other medical issues are present.",
      },
      {
        type: "split-panel",
        eyebrow: "Use only the plan selected for you",
        title: "A breathing-support plan should be specific, not improvised.",
        description:
          "The care team can help select strategies that fit the cause, the person’s abilities, the environment, and the treatments already in use.",
        tone: "navy",
        items: [
          {
            icon: Wind,
            title: "Position and air movement",
            description:
              "Ask which upright or supported position is safest and whether cool air movement may help the sensation. Stop if a strategy causes dizziness, instability, or more distress.",
          },
          {
            icon: PersonSimpleWalk,
            title: "Pacing and task planning",
            description:
              "Break essential activities into smaller steps, plan rest, reduce unnecessary exertion, and ask which mobility support is appropriate rather than avoiding all activity automatically.",
          },
          {
            icon: Brain,
            title: "Reduce the fear spiral",
            description:
              "A calm cue, an agreed breathing approach, and knowing whom to call can reduce panic around a familiar stable symptom. New or severe symptoms still need medical assessment.",
          },
          {
            icon: ClipboardText,
            title: "Write the escalation rules",
            description:
              "The plan should state emergency signs, same-day triggers, whom to call, and exactly how prescribed inhalers, medicines, or oxygen are to be used.",
          },
        ],
      },
      {
        type: "visit-steps",
        eyebrow: "Prepare for a breathing review",
        title: "Bring the baseline, the change, and the existing plan together.",
        subtitle:
          "The goal is a clear handoff between symptom support and the clinicians treating the underlying heart, lung, cancer, or other condition.",
        steps: [
          {
            icon: Notebook,
            title: "Record three representative episodes",
            description:
              "Note the time, activity, position, related symptoms, medicine or inhaler used as prescribed, any instructed measurement, how long it lasted, and what happened next.",
          },
          {
            icon: Package,
            title: "Bring the complete treatment list",
            description:
              "Bring inhalers, medicines, oxygen prescription and settings if applicable, recent discharge instructions, and heart, lung, cancer, or primary care records.",
          },
          {
            icon: ListChecks,
            title: "Leave with written escalation rules",
            description:
              "Confirm what counts as an emergency, what requires a same-day call, how to follow the prescribed plan, and which clinician owns each next step.",
          },
        ],
        ctaText: "Ask about breathing",
        ctaHref: "/contact",
      },
    ],
    related: {
      eyebrow: "Connected symptom support",
      title: "Breathlessness often crosses more than one care team.",
      description:
        "Palliative care helps the symptom plan stay connected to the heart, lung, cancer, kidney, or other treatment that may be addressing the cause.",
      featured: {
        title: "Symptom relief",
        description:
          "Review breathlessness alongside fatigue, anxiety, nausea, sleep, appetite, pain, and the treatment burden affecting daily life.",
        href: "/palliative-care/symptom-relief",
        image: breathingRelatedImage,
        imageAlt: "Clinician supporting an adult with symptoms related to serious illness",
      },
      links: [
        {
          title: "Palliative care for COPD and lung disease",
          description: "Connect breathing symptoms with pulmonology treatment, inhaler use, function, and family support.",
          href: "/palliative-care/for-copd-and-lung-disease",
        },
        {
          title: "Palliative care for heart failure",
          description: "Track breathlessness, swelling, activity, and the individualized action plan alongside cardiology.",
          href: "/palliative-care/for-heart-failure",
        },
        {
          title: "Palliative care for cancer",
          description: "Coordinate breathlessness and other symptoms with oncology and the person’s treatment goals.",
          href: "/palliative-care/for-cancer",
        },
        {
          title: "Patient and family support",
          description: "Give care partners clear emergency signs, contact roles, and a shared way to describe a breathing change.",
          href: "/palliative-care/patient-family-support",
        },
      ],
    },
    faqTitle: "Shortness-of-breath questions that need clear boundaries",
    faqDescription:
      "These answers help separate emergency care, evaluation of the cause, and palliative relief of the symptom burden.",
    faqs: [
      {
        question: "When should shortness of breath be treated as an emergency?",
        answer:
          "Call 911 for severe or sudden trouble breathing, blue or gray lips or skin, chest pain or pressure, new confusion, fainting, inability to speak normally because of breathing, or another rapidly worsening breathing emergency. Do not drive yourself or wait for a routine callback.",
      },
      {
        question: "Can palliative care help while the cause is still being treated?",
        answer:
          "Yes. Palliative care can address the distress, function, communication, caregiver needs, and treatment burden while primary care and specialists evaluate and treat heart, lung, cancer, infection, anemia, or other possible causes.",
      },
      {
        question: "Does feeling short of breath mean I automatically need oxygen?",
        answer:
          "No. Oxygen is prescribed for specific indications based on the diagnosis, measurements, and clinical context. It is not an automatic treatment for every feeling of breathlessness. Do not start oxygen, borrow equipment, or change a prescribed flow setting without the treating team’s instructions.",
      },
      {
        question: "Should I use a pulse oximeter at home?",
        answer:
          "Use one if your clinician has recommended it and explained what number, trend, and symptoms should trigger action. Record the reading with activity, position, and symptoms. A normal-looking reading does not rule out a serious problem, and an emergency should not be delayed to repeat measurements.",
      },
      {
        question: "What information makes a breathing visit more useful?",
        answer:
          "Bring the onset and pattern, triggers, activity level, position, cough or fever, mucus, chest symptoms, swelling, medicines and inhalers, oxygen instructions if prescribed, recent records, and any measurements your clinician asked you to track.",
      },
      {
        question: "Can anxiety cause shortness of breath?",
        answer:
          "Anxiety can intensify the sensation and distress, but a new or worsening breathing problem should not be assumed to be anxiety until urgent and medical causes are considered. Severe or sudden symptoms and danger signs require emergency assessment.",
      },
    ],
    sources: [
      {
        label: "Cardiopulmonary Syndromes (PDQ): Dyspnea",
        href: "https://www.cancer.gov/about-cancer/treatment/side-effects/cardiopulmonary-pdq",
        publisher: "National Cancer Institute",
      },
      {
        label: "Acute Respiratory Distress Syndrome: Symptoms",
        href: "https://www.nhlbi.nih.gov/health/ards/symptoms",
        publisher: "National Heart, Lung, and Blood Institute",
      },
      {
        label: "Breathing Difficulties: First Aid",
        href: "https://www.medlineplus.gov/ency/article/000007.htm",
        publisher: "MedlinePlus, U.S. National Library of Medicine",
      },
      {
        label: "Heart Attack: Symptoms",
        href: "https://www.nhlbi.nih.gov/health/heart-attack/symptoms",
        publisher: "National Heart, Lung, and Blood Institute",
      },
    ],
    cta: {
      subtitle: "Breathing support in Naples",
      title: "Turn a frightening symptom into a clearer safety and support plan.",
      description:
        "Call Faithful Care to request a shortness-of-breath review. Call 911 instead if severe or sudden breathing trouble or another emergency sign is happening now.",
      primaryText: "Ask about breathing",
    },
  },
} satisfies ConditionPageMap;
