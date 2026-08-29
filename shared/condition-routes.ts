export type ConditionRouteGroup = "primary" | "palliative";

export interface ConditionRouteDefinition {
  title: string;
  h1: string;
  description: string;
  label: string;
  group: ConditionRouteGroup;
  serviceName: string;
  serviceType: string;
  category: "Primary Care" | "Palliative Care";
}

export const CONDITION_ROUTE_DATA = {
  "/primary-care/diabetes-care": {
    title: "Diabetes Care in Naples, FL | Faithful Care",
    h1: "Diabetes care that protects more than your blood sugar.",
    description: "Diabetes care for Naples adults with glucose trend review, medication management, complication screening coordination, and individualized follow-up.",
    label: "Diabetes Care",
    group: "primary",
    serviceName: "Diabetes Care and Ongoing Management",
    serviceType: "Diabetes care",
    category: "Primary Care",
  },
  "/primary-care/high-blood-pressure-care": {
    title: "High Blood Pressure Care in Naples, FL | Faithful Care",
    h1: "High blood pressure care built around the pattern, not one reading.",
    description: "Blood pressure care in Naples with home-reading review, medication management, risk assessment, lifestyle guidance, and individualized follow-up.",
    label: "High Blood Pressure",
    group: "primary",
    serviceName: "High Blood Pressure Care",
    serviceType: "Hypertension care",
    category: "Primary Care",
  },
  "/primary-care/copd-care": {
    title: "COPD Care in Naples, FL | Faithful Care",
    h1: "COPD care for breathing, flare-ups, and everyday life.",
    description: "COPD primary care in Naples with flare-up review, inhaler technique support, prevention planning, referrals, and specialist coordination.",
    label: "COPD Care",
    group: "primary",
    serviceName: "COPD Primary Care Support",
    serviceType: "COPD care",
    category: "Primary Care",
  },
  "/primary-care/thyroid-care": {
    title: "Thyroid Care in Naples, FL | Faithful Care",
    h1: "Thyroid care that connects symptoms, labs, and medication.",
    description: "Thyroid care in Naples for adults with possible or known thyroid disease, including symptom review, appropriate labs, follow-up, and referrals.",
    label: "Thyroid Care",
    group: "primary",
    serviceName: "Thyroid Condition Care",
    serviceType: "Thyroid care",
    category: "Primary Care",
  },
  "/primary-care/menopause-care": {
    title: "Menopause Care in Naples, FL | Faithful Care",
    h1: "Menopause care that starts with what is changing for you.",
    description: "Personalized menopause care for hot flashes, sleep changes, vaginal symptoms, treatment options, and bone-health planning in Naples.",
    label: "Menopause Care",
    group: "primary",
    serviceName: "Menopause Care",
    serviceType: "Menopause care",
    category: "Primary Care",
  },
  "/primary-care/fall-prevention": {
    title: "Fall Prevention for Seniors in Naples, FL | Faithful Care",
    h1: "Fall prevention starts with the reason you feel less steady.",
    description: "Had a fall or feel unsteady? Faithful Care reviews balance, medications, vision, footwear, and home risks to build a practical prevention plan.",
    label: "Fall Prevention",
    group: "primary",
    serviceName: "Fall Risk Assessment and Prevention",
    serviceType: "Fall risk assessment and prevention",
    category: "Primary Care",
  },
  "/primary-care/memory-screening": {
    title: "Memory Screening & Cognitive Assessment | Naples, FL",
    h1: "Memory concerns deserve a careful conversation, not a quick label.",
    description: "Concerned about memory or thinking changes? Get a primary-care evaluation, medication review, and clear next steps in Naples.",
    label: "Memory Screening",
    group: "primary",
    serviceName: "Memory Concern Evaluation and Cognitive Screening",
    serviceType: "Cognitive screening and evaluation",
    category: "Primary Care",
  },
  "/primary-care/medication-review-for-seniors": {
    title: "Medication Review for Seniors in Naples, FL | Faithful Care",
    h1: "A senior medication review that includes everything you actually take.",
    description: "Bring prescriptions, over-the-counter medicines, vitamins, and supplements for a safety-focused senior medication review in Naples.",
    label: "Senior Medication Review",
    group: "primary",
    serviceName: "Medication Review for Seniors",
    serviceType: "Geriatric medication review",
    category: "Primary Care",
  },
  "/palliative-care/for-cancer": {
    title: "Cancer Palliative Care in Naples, FL | Faithful Care",
    h1: "Cancer support that makes room for comfort, treatment, and the life around both.",
    description: "Palliative support for Naples adults with cancer, including symptom review, family communication, and coordination alongside oncology treatment.",
    label: "Support During Cancer",
    group: "palliative",
    serviceName: "Palliative Support During Cancer",
    serviceType: "Cancer palliative support",
    category: "Palliative Care",
  },
  "/palliative-care/for-heart-failure": {
    title: "Palliative Care for Heart Failure in Naples, FL",
    h1: "Heart failure support built around your baseline, your goals, and your cardiology plan.",
    description: "Support for adults with serious heart failure in Naples through symptom tracking, family communication, and coordination alongside cardiology care.",
    label: "Heart Failure Support",
    group: "palliative",
    serviceName: "Palliative Support for Heart Failure",
    serviceType: "Heart failure palliative support",
    category: "Palliative Care",
  },
  "/palliative-care/for-copd-and-lung-disease": {
    title: "Palliative Care for Advanced COPD in Naples, FL",
    h1: "Advanced COPD and lung-disease support for the space between breaths and appointments.",
    description: "Palliative support for advanced COPD and lung disease in Naples, focused on breathlessness, fatigue, anxiety, and caregiver planning.",
    label: "COPD & Lung Disease",
    group: "palliative",
    serviceName: "Palliative Support for COPD and Lung Disease",
    serviceType: "Pulmonary palliative support",
    category: "Palliative Care",
  },
  "/palliative-care/for-advanced-kidney-disease": {
    title: "Palliative Care for Advanced Kidney Disease | Naples",
    h1: "Advanced kidney-disease support for symptoms, decisions, and the life around treatment.",
    description: "Palliative support for advanced kidney disease in Naples with symptom review, treatment-choice conversations, and nephrology coordination.",
    label: "Advanced Kidney Disease",
    group: "palliative",
    serviceName: "Palliative Support for Advanced Kidney Disease",
    serviceType: "Kidney disease palliative support",
    category: "Palliative Care",
  },
  "/palliative-care/for-dementia": {
    title: "Palliative Care for Dementia in Naples, FL | Faithful Care",
    h1: "Comfort and clarity when dementia changes how your loved one communicates.",
    description: "Palliative support for people living with dementia and their families, including symptom review, caregiver guidance, and care planning in Naples.",
    label: "Dementia Support",
    group: "palliative",
    serviceName: "Palliative Support for Dementia",
    serviceType: "Dementia palliative support",
    category: "Palliative Care",
  },
  "/palliative-care/for-parkinsons": {
    title: "Palliative Care for Parkinson's in Naples, FL",
    h1: "Parkinson’s support for the life happening between neurology visits.",
    description: "Palliative support for Parkinson's disease in Naples, focused on daily symptoms, treatment burden, caregiver needs, and coordinated planning.",
    label: "Parkinson's Support",
    group: "palliative",
    serviceName: "Palliative Support for Parkinson's Disease",
    serviceType: "Parkinson's palliative support",
    category: "Palliative Care",
  },
  "/palliative-care/pain-management": {
    title: "Palliative Pain Management in Naples, FL | Faithful Care",
    h1: "Pain management starts with the story pain is changing.",
    description: "Whole-person palliative pain assessment in Naples for adults with serious illness, coordinated with the clinicians treating the underlying condition.",
    label: "Palliative Pain Management",
    group: "palliative",
    serviceName: "Palliative Pain Assessment and Management",
    serviceType: "Palliative pain management",
    category: "Palliative Care",
  },
  "/palliative-care/shortness-of-breath": {
    title: "Palliative Support for Shortness of Breath | Naples",
    h1: "Shortness-of-breath support starts with safety, then the cause and the distress.",
    description: "Palliative support for breathlessness related to serious illness, with symptom assessment, safety planning, and specialist coordination in Naples.",
    label: "Shortness of Breath",
    group: "palliative",
    serviceName: "Palliative Support for Shortness of Breath",
    serviceType: "Breathlessness palliative support",
    category: "Palliative Care",
  },
} as const satisfies Record<string, ConditionRouteDefinition>;

export type ConditionRoutePath = keyof typeof CONDITION_ROUTE_DATA;

export const CONDITION_ROUTE_PATHS = Object.keys(CONDITION_ROUTE_DATA) as ConditionRoutePath[];

export function isConditionRoute(path: string): path is ConditionRoutePath {
  return path in CONDITION_ROUTE_DATA;
}
