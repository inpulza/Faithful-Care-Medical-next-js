import {
  ArrowsClockwise,
  Brain,
  CalendarCheck,
  ClipboardText,
  Eye,
  FirstAidKit,
  Footprints,
  Heartbeat,
  HouseLine,
  ListChecks,
  MagnifyingGlass,
  Moon,
  Package,
  PersonSimpleWalk,
  Pill,
  ShieldCheck,
  Stethoscope,
  UsersThree,
  Warning,
} from "@phosphor-icons/react";
import heroWomensHealth from "@/assets/images/hero-womens-health.optimized.webp";
import heroWomensHealthMobile from "@/assets/images/hero-womens-health.mobile.webp";
import heroSeniorWoman from "@/assets/images/hero-doctor-senior-woman.optimized.webp";
import heroSeniorWomanMobile from "@/assets/images/hero-doctor-senior-woman.mobile.webp";
import heroFaithfulCare from "@/assets/images/hero-doctor-faithful-care.optimized.webp";
import heroFaithfulCareMobile from "@/assets/images/hero-doctor-faithful-care.mobile.webp";
import heroSeniorMan from "@/assets/images/hero-doctor-senior-man.optimized.webp";
import heroSeniorManMobile from "@/assets/images/hero-doctor-senior-man.mobile.webp";
import naplesMenopause from "@/assets/images/hero-naples-v1.optimized.webp";
import naplesFalls from "@/assets/images/hero-naples-v2.optimized.webp";
import naplesMemory from "@/assets/images/hero-naples-v3.optimized.webp";
import naplesMedication from "@/assets/images/hero-naples-v4.optimized.webp";
import { assetUrl } from "@/lib/asset-url";
import type { ConditionPageMap } from "@/lib/condition-page-types";

export const primaryConditionPagesB = {
  "/primary-care/menopause-care": {
    path: "/primary-care/menopause-care",
    category: "Primary Care",
    parentHub: { label: "Back to Primary Care", href: "/primary-care" },
    hero: {
      title: "Menopause care that starts with what is changing for you.",
      subtitleBold: "Your symptoms, health history, and priorities shape the plan.",
      subtitle:
        "Faithful Care helps Naples women make sense of cycle changes, hot flashes, sleep disruption, vaginal or urinary symptoms, mood concerns, and long-term health needs without treating menopause as a one-size-fits-all experience.",
      marqueeItems: ["Symptom review", "Treatment choices", "Bone and heart health", "Naples, FL"],
      image: assetUrl(heroWomensHealth),
      imageMobile: assetUrl(heroWomensHealthMobile),
      imageAlt: "Primary care clinician discussing menopause symptoms and health priorities with an adult woman",
      imagePosition: "82% top",
      imagePositionMobile: "100% 40%",
    },
    quickFacts: [
      { icon: ClipboardText, label: "Start with", value: "Your timeline, symptoms, bleeding pattern, and goals" },
      { icon: Stethoscope, label: "Testing", value: "Chosen for the clinical question, not ordered routinely for everyone" },
      { icon: ShieldCheck, label: "Safety", value: "Treatment decisions consider your personal and family health history" },
    ],
    sections: [
      {
        type: "detail-grid",
        eyebrow: "Build the whole picture",
        eyebrowColor: "primary",
        title: "Menopause can affect more than periods and hot flashes.",
        description:
          "A useful visit identifies which changes are most disruptive, checks for other possible causes, and connects symptom relief with preventive care for the years ahead.",
        statNumber: "4",
        statLabel: "parts of the conversation help turn a broad life stage into an individual care plan",
        cards: [
          {
            icon: Heartbeat,
            title: "Hot flashes and night sweats",
            description:
              "Frequency, intensity, triggers, and sleep impact matter. A dated symptom record can show whether practical changes or treatment are helping.",
          },
          {
            icon: Moon,
            title: "Sleep, mood, and concentration",
            description:
              "Sleep loss, stress, anxiety, depression, medicines, and other health conditions can overlap with the menopausal transition and deserve their own review.",
          },
          {
            icon: Stethoscope,
            title: "Vaginal and urinary health",
            description:
              "Dryness, pain with sex, urinary urgency, leakage, or repeated urinary symptoms are common concerns that patients do not have to dismiss or manage alone.",
          },
          {
            icon: ShieldCheck,
            title: "Health after the transition",
            description:
              "Blood pressure, cholesterol, bone health, strength, activity, cancer screening, and tobacco use remain important whether or not symptoms need medication.",
          },
        ],
      },
      {
        type: "comparison",
        eyebrow: "Name the stage",
        title: "Perimenopause and postmenopause are related, but not interchangeable.",
        description:
          "The timing of a symptom or bleeding change affects the questions a clinician asks and the evaluation that may be appropriate.",
        leftHeading: "Menopausal transition",
        rightHeading: "After menopause",
        rows: [
          {
            label: "Periods",
            left: "Cycles may become shorter, longer, lighter, heavier, or less predictable as ovulation changes.",
            right: "Menopause is reached after 12 consecutive months without a menstrual period, when no other cause explains the absence.",
          },
          {
            label: "Symptoms",
            left: "Hot flashes, night sweats, sleep changes, mood symptoms, and vaginal discomfort can begin before periods stop.",
            right: "Some symptoms improve while others continue or appear later, including vaginal dryness and urinary concerns.",
          },
          {
            label: "Bleeding",
            left: "Changes are common, but very heavy bleeding, bleeding between periods, after sex, or unusually prolonged bleeding should be discussed.",
            right: "Any bleeding or spotting after 12 months without a period needs medical evaluation, even if it happens only once.",
          },
          {
            label: "Visit focus",
            left: "Clarify the pattern, rule out pregnancy when relevant, review symptoms, and decide whether another cause needs evaluation.",
            right: "Address current symptoms while keeping bone, cardiovascular, sexual, urinary, and preventive health in view.",
          },
        ],
        note:
          "A blood hormone test is not automatically needed to identify a typical menopausal transition. Testing may be appropriate when the timing, symptoms, or medical history raise a different question.",
      },
      {
        type: "split-panel",
        eyebrow: "Choose care deliberately",
        title: "The best option is the one that fits both your goal and your risk profile.",
        description:
          "Treatment is a shared decision. What is reasonable for one person may not be appropriate for another, and the plan can change as symptoms and health needs change.",
        tone: "plain",
        items: [
          {
            icon: ListChecks,
            title: "Define the symptom target",
            description:
              "Choose the problem you most want to improve, such as night sweats, sleep disruption, vaginal discomfort, or urinary symptoms, so progress can be measured.",
          },
          {
            icon: ClipboardText,
            title: "Review health history",
            description:
              "Age, time since menopause, bleeding history, migraines, blood clots, stroke, heart disease, breast or uterine conditions, and current medicines can affect the discussion.",
          },
          {
            icon: ArrowsClockwise,
            title: "Compare approaches",
            description:
              "Depending on the concern, options may include lifestyle changes, nonhormonal medicines, local vaginal therapy, or systemic hormone therapy after an individualized review.",
          },
          {
            icon: CalendarCheck,
            title: "Plan a checkpoint",
            description:
              "Agree on what to monitor, which side effects or bleeding changes should prompt a call, and when benefits and risks will be reviewed again.",
          },
        ],
      },
      {
        type: "care-levels",
        eyebrow: "Do not explain every symptom away",
        title: "Know which changes need emergency, prompt, or routine care.",
        description:
          "Menopause can overlap with other medical problems. New severe symptoms should be assessed on their own merits rather than assumed to be hormonal.",
        items: [
          {
            tone: "emergency",
            label: "Call 911",
            title: "Possible stroke, heart attack, or pulmonary embolism",
            description:
              "Sudden one-sided weakness, trouble speaking, severe chest pressure, severe trouble breathing, coughing blood, lightheadedness, or fainting can be emergencies.",
            action: "Call 911. Do not wait for a menopause appointment or drive yourself.",
          },
          {
            tone: "today",
            label: "Seek prompt medical care",
            title: "Possible DVT or concerning bleeding",
            description:
              "New swelling, pain, warmth, redness, or discoloration in one leg can be a deep vein thrombosis and should be assessed as soon as possible. Any bleeding after 12 months without a period also needs evaluation.",
            action: "Seek care promptly. Call 911 if leg symptoms occur with trouble breathing, chest pain, coughing blood, severe lightheadedness, or fainting.",
          },
          {
            tone: "routine",
            label: "Schedule a visit",
            title: "Symptoms are affecting daily life",
            description:
              "Book a review when hot flashes, sleep, mood, concentration, vaginal dryness, pain with sex, urinary symptoms, or cycle changes are difficult to manage.",
            action: "Bring a symptom and bleeding timeline, your medication list, and the goals you want the visit to address.",
          },
        ],
        note:
          "If you use hormone treatment, follow the prescribing clinician's instructions and report unexpected bleeding or new concerning symptoms. Do not change treatment on your own.",
      },
      {
        type: "visit-steps",
        eyebrow: "Prepare a focused visit",
        title: "Turn a long list of changes into clear clinical questions.",
        subtitle:
          "A short timeline and a complete health history make it easier to separate menopause-related concerns from conditions that may need different care.",
        steps: [
          {
            icon: ClipboardText,
            title: "Track what changed",
            description:
              "Note your last period, recent bleeding pattern, hot flashes, sleep, mood, vaginal or urinary symptoms, and what makes them better or worse.",
          },
          {
            icon: Package,
            title: "Bring medicines and history",
            description:
              "Include prescriptions, over-the-counter products, vitamins, supplements, prior hormone use, major diagnoses, surgeries, and relevant family history.",
          },
          {
            icon: ListChecks,
            title: "Choose the next checkpoint",
            description:
              "Confirm the symptom target, options considered, screening or referral needs, warning signs, and when to assess whether the plan is helping.",
          },
        ],
        ctaText: "Request menopause care",
        ctaHref: "/contact",
      },
    ],
    related: {
      eyebrow: "Connected women's health",
      title: "Keep symptom relief connected to long-term health.",
      description:
        "Menopause care can sit alongside preventive visits, bone-health planning, chronic-disease follow-up, and an evaluation of any memory or medication concern.",
      featured: {
        title: "Women's health primary care",
        description:
          "Connect menopause questions with cervical and breast screening, sexual and urinary health, and the rest of your preventive care.",
        href: "/primary-care/womens-health",
        image: assetUrl(naplesMenopause),
        imageAlt: "Aerial view of a quiet Naples coastal neighborhood beside the Gulf",
        imagePosition: "center 56%",
      },
      links: [
        {
          title: "Checkups and prevention",
          description: "Keep blood pressure, cholesterol, cancer screening, vaccines, and other preventive needs on one plan.",
          href: "/primary-care/checkups-prevention",
        },
        {
          title: "Chronic disease management",
          description: "Coordinate menopause care with diabetes, thyroid disease, hypertension, and other ongoing conditions.",
          href: "/primary-care/chronic-disease",
        },
        {
          title: "Memory screening",
          description: "Discuss a specific change in memory or thinking instead of assuming it is caused by menopause or aging.",
          href: "/primary-care/memory-screening",
        },
        {
          title: "Senior medication review",
          description: "Review prescriptions, nonprescription medicines, vitamins, and supplements for interactions or unwanted effects.",
          href: "/primary-care/medication-review-for-seniors",
        },
      ],
    },
    faqs: [
      {
        question: "Do I need a hormone test to know whether I am in menopause?",
        answer:
          "Not routinely. Age, menstrual history, symptoms, and the clinical context are often more useful during a typical menopausal transition because hormone levels can fluctuate. A clinician may order tests when periods stop unusually early, the pattern is atypical, pregnancy is possible, or another condition needs evaluation.",
      },
      {
        question: "Which menopause symptoms can primary care help evaluate?",
        answer:
          "Primary care can review cycle changes, hot flashes, night sweats, sleep disruption, mood or concentration concerns, vaginal dryness, pain with sex, urinary symptoms, and related preventive needs. Some findings may require gynecology or another specialist.",
      },
      {
        question: "Is hormone therapy the only treatment for menopause symptoms?",
        answer:
          "No. The appropriate options depend on the symptom and your health history. Lifestyle strategies, nonhormonal medicines, local vaginal treatments, and systemic hormone therapy may be considered in different situations after a discussion of benefits, risks, and preferences.",
      },
      {
        question: "Is bleeding normal after menopause?",
        answer:
          "Any bleeding or spotting after 12 consecutive months without a period needs evaluation. Many causes are not cancer, but the cause cannot be determined safely from the amount or color alone. Contact a clinician even if it happens only once.",
      },
      {
        question: "What should I bring to a menopause appointment?",
        answer:
          "Bring the date of your last period, a recent bleeding and symptom timeline, all medicines and supplements, prior hormone use, major diagnoses and surgeries, and relevant family history. Note which symptom matters most to you and what you have already tried.",
      },
      {
        question: "Why does menopause care include bone and heart health?",
        answer:
          "Midlife is an important time to review bone strength and cardiovascular risk. Age, activity, tobacco use, blood pressure, cholesterol, diabetes risk, family history, and other factors help determine which preventive steps or tests are appropriate.",
      },
    ],
    sources: [
      {
        label: "What Is Menopause?",
        href: "https://www.nia.nih.gov/health/menopause/what-menopause",
        publisher: "National Institute on Aging",
      },
      {
        label: "Perimenopausal Bleeding and Bleeding After Menopause",
        href: "https://www.acog.org/womens-health/faqs/perimenopausal-bleeding-and-bleeding-after-menopause",
        publisher: "American College of Obstetricians and Gynecologists",
      },
      {
        label: "The Menopause Years",
        href: "https://www.acog.org/womens-health/faqs/the-menopause-years",
        publisher: "American College of Obstetricians and Gynecologists",
      },
      {
        label: "Menopause Basics",
        href: "https://womenshealth.gov/menopause/menopause-basics",
        publisher: "Office on Women's Health, U.S. Department of Health and Human Services",
      },
      {
        label: "About Venous Thromboembolism",
        href: "https://www.cdc.gov/blood-clots/about/",
        publisher: "Centers for Disease Control and Prevention",
      },
    ],
    cta: {
      subtitle: "Menopause care in Naples",
      title: "Make the next visit about the changes that matter most to you.",
      description:
        "Call Faithful Care to request a menopause visit and ask which records, symptom notes, and medication information to bring.",
      primaryText: "Request menopause care",
    },
  },

  "/primary-care/fall-prevention": {
    path: "/primary-care/fall-prevention",
    category: "Primary Care",
    parentHub: { label: "Back to Primary Care", href: "/primary-care" },
    hero: {
      title: "Fall prevention starts with the reason you feel less steady.",
      subtitleBold: "A fall is a health clue, not a personal failure.",
      subtitle:
        "Faithful Care helps Naples older adults and families review recent falls, dizziness, balance, strength, medicines, vision, footwear, and home hazards to identify practical ways to reduce risk.",
      marqueeItems: ["Fall history", "Balance and strength", "Medication review", "Home safety"],
      image: assetUrl(heroFaithfulCare),
      imageMobile: assetUrl(heroFaithfulCareMobile),
      imageAlt: "Primary care clinician helping an older adult review mobility and fall risk",
      imagePosition: "84% top",
      imagePositionMobile: "100% 42%",
    },
    quickFacts: [
      { icon: Footprints, label: "Tell us about", value: "Falls, near-falls, unsteadiness, and fear of falling" },
      { icon: Pill, label: "Bring with you", value: "Every prescription, OTC medicine, vitamin, and supplement" },
      { icon: HouseLine, label: "Look beyond the clinic", value: "Lighting, stairs, rugs, bathrooms, and walking routes at home" },
    ],
    sections: [
      {
        type: "care-levels",
        eyebrow: "After a fall",
        title: "First decide whether an injury may need urgent care.",
        description:
          "Some symptoms appear immediately and others develop over hours. Head impact, blood-thinning medicine, loss of consciousness, and inability to bear weight are important details to report.",
        items: [
          {
            tone: "emergency",
            label: "Call 911",
            title: "Head-injury danger signs or a serious injury",
            description:
              "Call for worsening headache, repeated vomiting, seizure, slurred speech, new weakness or numbness, unequal pupils, increasing confusion, inability to wake, severe bleeding, or an obvious major injury.",
            action: "Call 911 and keep the person still and safe while help is coming. Do not drive if symptoms could worsen.",
          },
          {
            tone: "today",
            label: "Seek prompt medical advice",
            title: "A fall caused pain, head impact, or a sudden change",
            description:
              "Contact a clinician promptly for a head impact without emergency signs, new pain or swelling, a new walking problem, dizziness, fainting, or a fall while taking a blood thinner.",
            action: "Describe how the fall happened, where you hurt, whether you hit your head, and which medicines you take.",
          },
          {
            tone: "routine",
            label: "Schedule a fall review",
            title: "You fell, nearly fell, or feel less steady",
            description:
              "Even without an injury, a fall, repeated near-falls, holding furniture to walk, or limiting activity from fear can reveal modifiable risks.",
            action: "Book a focused review before the next fall. Bring footwear, mobility aids, and a complete medication list when practical.",
          },
        ],
        note:
          "This is a general safety guide, not a diagnosis. When in doubt after a head injury or sudden medical event, seek urgent evaluation.",
      },
      {
        type: "detail-grid",
        eyebrow: "Find the contributors",
        title: "Falls usually have more than one possible cause.",
        description:
          "A strong review looks for a pattern instead of blaming age alone. The plan should match the risks that actually appear in your history, examination, medicines, and daily environment.",
        statNumber: "6",
        statLabel: "risk areas can be reviewed together without assuming every person needs the same intervention",
        cards: [
          {
            icon: PersonSimpleWalk,
            title: "Walking, strength, and balance",
            description:
              "Trouble rising from a chair, slower walking, weak legs, foot pain, or difficulty turning can help guide exercise, therapy, or mobility-aid decisions.",
          },
          {
            icon: Heartbeat,
            title: "Dizziness and medical causes",
            description:
              "Lightheadedness, fainting, infection, dehydration, blood pressure changes, low blood sugar, heart rhythm concerns, and neurologic symptoms require different responses.",
          },
          {
            icon: Pill,
            title: "Medicines and alcohol",
            description:
              "Sleep medicines, sedating products, some blood pressure medicines, and medicine combinations may contribute to dizziness, drowsiness, or slower reactions.",
          },
          {
            icon: Eye,
            title: "Vision, feet, and footwear",
            description:
              "Vision changes, bifocals, reduced sensation, painful feet, loose slippers, or worn soles can change how safely you judge and contact the ground.",
          },
          {
            icon: HouseLine,
            title: "Home and routine",
            description:
              "Poor lighting, clutter, loose rugs, pets underfoot, bathroom transfers, steps, and rushing to the toilet are useful details, not minor housekeeping issues.",
          },
          {
            icon: Brain,
            title: "Memory and confidence",
            description:
              "Cognitive changes can affect judgment or safe device use, while fear after a fall can reduce activity and strength. Both deserve a respectful plan.",
          },
        ],
      },
      {
        type: "visit-steps",
        eyebrow: "A practical fall review",
        title: "Reconstruct the event, then work outward.",
        subtitle:
          "The goal is to understand what happened before, during, and after the fall and choose the few changes most likely to help you.",
        steps: [
          {
            icon: MagnifyingGlass,
            title: "Map the fall or near-fall",
            description:
              "Note the time, location, activity, footwear, symptoms before the event, head impact, injuries, and whether you could stand without help.",
          },
          {
            icon: Stethoscope,
            title: "Review body and medicines",
            description:
              "The visit may consider walking, balance, strength, blood pressure changes, vision, feet, cognition, relevant conditions, and every product you take.",
          },
          {
            icon: ListChecks,
            title: "Leave with prioritized actions",
            description:
              "Agree on home changes, safe activity, medicine questions, vision or foot care, therapy or specialist referrals, and when progress will be reassessed.",
          },
        ],
        ctaText: "Plan a fall review",
        ctaHref: "/contact",
      },
      {
        type: "split-panel",
        eyebrow: "Make prevention usable",
        title: "A safer plan should preserve movement and independence.",
        description:
          "Avoiding all activity after a fall can lead to more weakness. Changes should be realistic, matched to ability, and introduced with the right clinical or therapy guidance.",
        tone: "navy",
        items: [
          {
            icon: PersonSimpleWalk,
            title: "Strength and balance support",
            description:
              "A clinician may recommend an appropriate exercise plan or physical therapy after considering pain, endurance, neurologic symptoms, and current ability.",
          },
          {
            icon: HouseLine,
            title: "A room-by-room safety pass",
            description:
              "Improve lighting, clear walking paths, secure or remove loose rugs, add stable supports when advised, and keep commonly used items within safe reach.",
          },
          {
            icon: Footprints,
            title: "Footwear and mobility aids",
            description:
              "Supportive shoes and a correctly fitted cane or walker can help when appropriate. A device that is the wrong height or used incorrectly can create new risk.",
          },
          {
            icon: ArrowsClockwise,
            title: "Recheck after changes",
            description:
              "Report another fall, near-fall, new dizziness, weakness, or difficulty using the plan so the care team can reassess rather than simply add more restrictions.",
          },
        ],
      },
    ],
    related: {
      eyebrow: "Stay steady, stay connected",
      title: "Fall risk touches several parts of senior health.",
      description:
        "Medication burden, memory changes, chronic conditions, vision, strength, and preventive care can all affect safety. These needs work better as one coordinated plan.",
      featured: {
        title: "Senior primary care",
        description:
          "Connect mobility and fall concerns with chronic disease follow-up, preventive care, memory, medicines, and the priorities that support independence.",
        href: "/primary-care/senior-care",
        image: assetUrl(naplesFalls),
        imageAlt: "Coastal road and palm trees in Naples, Florida",
        imagePosition: "center 54%",
      },
      links: [
        {
          title: "Senior medication review",
          description: "Bring every prescription and nonprescription product for a safety-focused reconciliation.",
          href: "/primary-care/medication-review-for-seniors",
        },
        {
          title: "Memory screening",
          description: "Evaluate a specific change in memory, judgment, navigation, or daily function that may affect safety.",
          href: "/primary-care/memory-screening",
        },
        {
          title: "Checkups and prevention",
          description: "Keep vision, bone health, vaccines, and other age-appropriate preventive needs visible.",
          href: "/primary-care/checkups-prevention",
        },
        {
          title: "Procedures and diagnostics",
          description: "Learn how testing and diagnostic support may help when the history or examination identifies a clinical question.",
          href: "/primary-care/procedures-diagnostics",
        },
      ],
    },
    faqs: [
      {
        question: "Should I tell my clinician about a fall if I was not injured?",
        answer:
          "Yes. A fall or repeated near-fall can be an early clue about balance, strength, vision, feet, blood pressure, medicines, cognition, or the home environment. Reviewing it before an injury occurs may identify risks that can be reduced.",
      },
      {
        question: "What information helps explain why I fell?",
        answer:
          "Write down where and when it happened, what you were doing, symptoms beforehand, footwear, lighting, obstacles, whether you hit your head, injuries, and whether you could stand. Include recent illnesses and all medicines, vitamins, and supplements.",
      },
      {
        question: "Can medicines increase fall risk?",
        answer:
          "Some medicines and combinations can contribute to sleepiness, dizziness, blood pressure changes, confusion, or slower reactions. Do not stop a medicine yourself. Bring everything you take so a clinician or pharmacist can review benefits, risks, and possible next steps.",
      },
      {
        question: "Does preventing falls mean I should avoid exercise?",
        answer:
          "Usually not. Avoiding movement can reduce strength and confidence. The safer approach is to choose activity that matches your current ability and medical needs, sometimes with physical therapy or another professional's guidance.",
      },
      {
        question: "Which head-injury signs after a fall are emergencies?",
        answer:
          "Call 911 for a worsening headache, repeated vomiting, seizure, slurred speech, new weakness or numbness, unequal pupils, increasing confusion or agitation, loss of consciousness, or inability to wake. Symptoms can appear hours after the event.",
      },
      {
        question: "Can every fall be prevented?",
        answer:
          "No plan can guarantee that every fall will be prevented. The aim is to identify modifiable contributors, reduce avoidable hazards, improve safe movement, and create a clear response plan if another fall or near-fall occurs.",
      },
    ],
    sources: [
      {
        label: "STEADI: Older Adult Fall Prevention",
        href: "https://www.cdc.gov/steadi/index.html",
        publisher: "Centers for Disease Control and Prevention",
      },
      {
        label: "About Older Adult Fall Prevention",
        href: "https://www.cdc.gov/falls/about/index.html",
        publisher: "Centers for Disease Control and Prevention",
      },
      {
        label: "Symptoms of Mild TBI and Concussion",
        href: "https://www.cdc.gov/traumatic-brain-injury/signs-symptoms/index.html",
        publisher: "Centers for Disease Control and Prevention",
      },
      {
        label: "Prevent Falls and Fractures",
        href: "https://www.nia.nih.gov/health/falls-and-falls-prevention/falls-and-fractures-older-adults-causes-and-prevention",
        publisher: "National Institute on Aging",
      },
    ],
    cta: {
      subtitle: "Fall-risk review in Naples",
      title: "Use the first fall or near-fall as a reason to look closer.",
      description:
        "Call Faithful Care to request a focused fall-risk visit and ask what medicines, footwear, devices, and event details to bring.",
      primaryText: "Plan a fall review",
    },
  },

  "/primary-care/memory-screening": {
    path: "/primary-care/memory-screening",
    category: "Primary Care",
    parentHub: { label: "Back to Primary Care", href: "/primary-care" },
    hero: {
      title: "Memory concerns deserve a careful conversation, not a quick label.",
      subtitleBold: "Start with the change you or your family actually noticed.",
      subtitle:
        "Faithful Care evaluates changes in memory, language, judgment, attention, and daily function for Naples adults, including medicines and medical conditions that can affect thinking, then helps coordinate the next step when more evaluation is needed.",
      marqueeItems: ["Concern-based evaluation", "Medication review", "Daily-function check", "Clear next steps"],
      image: assetUrl(heroSeniorWoman),
      imageMobile: assetUrl(heroSeniorWomanMobile),
      imageAlt: "Primary care clinician listening to an older woman describe a change in memory",
      imagePosition: "84% top",
      imagePositionMobile: "100% 42%",
    },
    quickFacts: [
      { icon: Brain, label: "A brief screen", value: "Can identify a concern but cannot diagnose dementia by itself" },
      { icon: UsersThree, label: "Useful context", value: "Specific examples from the patient and a trusted person" },
      { icon: Warning, label: "Emergency", value: "Sudden confusion or stroke signs require immediate care" },
    ],
    sections: [
      {
        type: "comparison",
        eyebrow: "Look at function, not one forgotten word",
        title: "Occasional forgetfulness and a concerning pattern are different questions.",
        description:
          "A single lapse does not diagnose a disorder. Repeated changes that interfere with familiar tasks, safety, or independence deserve a clinical evaluation.",
        leftHeading: "Can happen with normal aging",
        rightHeading: "Worth discussing with a clinician",
        rows: [
          {
            label: "Appointments and bills",
            left: "Forgetting an appointment or payment occasionally, then remembering or correcting it.",
            right: "Repeated missed bills, unsafe financial decisions, or inability to manage a previously familiar system.",
          },
          {
            label: "Time and place",
            left: "Forgetting the day briefly and working it out later.",
            right: "Becoming lost in a familiar place or repeatedly confused about the season, date, or location.",
          },
          {
            label: "Words and conversation",
            left: "Sometimes needing more time to recall a word or name.",
            right: "Frequent difficulty following a conversation, repeating the same question, or losing the ability to express a familiar idea.",
          },
          {
            label: "Daily tasks",
            left: "Needing a reminder for a new device or an unfamiliar routine.",
            right: "Difficulty using a familiar appliance, following a known recipe, taking medicines safely, driving, or caring for personal needs.",
          },
        ],
        note:
          "The U.S. Preventive Services Task Force finds insufficient evidence to recommend universal cognitive screening for older adults without signs or symptoms. That does not mean a specific memory or thinking concern should be ignored.",
        sources: [
          {
            label: "NIA memory guidance",
            href: "https://www.nia.nih.gov/health/alzheimers-symptoms-and-diagnosis/do-memory-problems-always-mean-alzheimers-disease",
          },
          {
            label: "USPSTF recommendation",
            href: "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/cognitive-impairment-in-older-adults-screening",
          },
        ],
      },
      {
        type: "care-levels",
        eyebrow: "Timing changes the response",
        title: "Sudden confusion is not the same as a gradual memory concern.",
        description:
          "A new change over minutes or hours can signal stroke, infection, a medication problem, or another emergency. A slower pattern still deserves evaluation, but usually follows a different path.",
        items: [
          {
            tone: "emergency",
            label: "Call 911",
            title: "Sudden confusion or possible stroke signs",
            description:
              "Call for sudden trouble speaking or understanding, face droop, one-sided weakness or numbness, sudden severe headache, new loss of balance, fainting, seizure, or abrupt severe confusion.",
            action: "Call 911 and note when the person was last known to be at their usual baseline. Do not drive them yourself.",
          },
          {
            tone: "today",
            label: "Contact a clinician today",
            title: "A rapid change without obvious stroke signs",
            description:
              "New confusion, unusual sleepiness, hallucinations, a major behavior change, fever, pain, dehydration, or a recent medicine change can require prompt assessment.",
            action: "Describe the person's usual baseline, when the change started, current medicines, and any recent illness, injury, or substance use.",
          },
          {
            tone: "routine",
            label: "Schedule an evaluation",
            title: "A pattern is affecting daily life",
            description:
              "Book a visit for repeated questions, getting lost, difficulty with finances or medicines, language changes, unsafe decisions, or concern expressed by the patient or family.",
            action: "Bring specific dated examples and, with the patient's permission, someone who has observed the change.",
          },
        ],
        note:
          "Do not wait for a routine memory appointment when a change is sudden. Emergency teams need the time of onset and the person's usual level of thinking and function.",
      },
      {
        type: "split-panel",
        eyebrow: "What a brief screen can and cannot do",
        title: "One score is a starting point, not a diagnosis.",
        description:
          "Performance can be influenced by hearing, vision, language, education, anxiety, sleep, pain, illness, and medicines. Results must be interpreted with the history and daily function.",
        tone: "plain",
        items: [
          {
            icon: MagnifyingGlass,
            title: "It can flag a concern",
            description:
              "A brief validated tool may show that memory, attention, language, or another thinking skill needs a closer look.",
          },
          {
            icon: Warning,
            title: "It cannot name the cause",
            description:
              "A short test alone cannot distinguish Alzheimer's disease from medication effects, depression, sleep problems, thyroid disease, vitamin deficiency, stroke, or other causes.",
          },
          {
            icon: UsersThree,
            title: "Function adds meaning",
            description:
              "Changes in driving, finances, cooking, appointments, medicines, navigation, and self-care help show whether thinking changes are affecting independence or safety.",
          },
          {
            icon: ArrowsClockwise,
            title: "Follow-up completes the process",
            description:
              "The next step may include laboratory testing, medicine changes, mood or sleep evaluation, imaging, safety planning, or referral to neurology or another specialist.",
          },
        ],
      },
      {
        type: "detail-grid",
        eyebrow: "A primary-care memory evaluation",
        eyebrowColor: "primary",
        title: "The goal is to explain the change, not simply document it.",
        description:
          "Several reversible or treatable issues can affect memory. The visit brings the timeline, daily impact, medical history, and objective findings into one care plan.",
        statNumber: "4",
        statLabel: "evidence streams help decide whether the concern needs monitoring, treatment, testing, or specialist input",
        cards: [
          {
            icon: ClipboardText,
            title: "Timeline and examples",
            description:
              "When the change began, whether it is worsening, and specific examples are more useful than a general statement that someone is forgetful.",
          },
          {
            icon: Pill,
            title: "Medicines and substances",
            description:
              "Prescription and OTC sleep aids, antihistamines, pain medicines, supplements, alcohol, and medicine combinations can affect alertness or memory.",
          },
          {
            icon: Stethoscope,
            title: "Health, mood, and sleep",
            description:
              "Depression, anxiety, poor sleep, hearing or vision loss, head injury, infection, thyroid problems, vitamin deficiency, and other conditions may contribute.",
          },
          {
            icon: ShieldCheck,
            title: "Function and safety",
            description:
              "Driving, falls, cooking, firearms, finances, medicine management, wandering risk, and caregiver strain may need a plan before a final diagnosis is known.",
          },
        ],
      },
      {
        type: "visit-steps",
        eyebrow: "Prepare useful evidence",
        title: "Bring examples that show what changed in real life.",
        subtitle:
          "A respectful evaluation includes the patient's own concerns and, when permitted, observations from someone who knows the person's usual abilities.",
        steps: [
          {
            icon: ClipboardText,
            title: "Write down the pattern",
            description:
              "List specific incidents, dates, progression, changes in language or judgment, and any impact on work, driving, bills, cooking, medicines, or self-care.",
          },
          {
            icon: Package,
            title: "Collect health context",
            description:
              "Bring prescription bottles, OTC products, vitamins, supplements, prior test results, hearing or vision information, and a history of sleep, mood, illness, or head injury.",
          },
          {
            icon: ListChecks,
            title: "Clarify the next decision",
            description:
              "Ask what the screen means, which causes are being considered, what safety steps matter now, whether more testing or referral is needed, and when to follow up.",
          },
        ],
        ctaText: "Discuss memory changes",
        ctaHref: "/contact",
      },
    ],
    related: {
      eyebrow: "Connected senior care",
      title: "Memory changes can intersect with medicines, falls, and family support.",
      description:
        "A coordinated primary-care record helps connect thinking and function with medical conditions, medication burden, mobility, and the support needed at home.",
      featured: {
        title: "Senior primary care",
        description:
          "Bring cognitive concerns into a broader plan for chronic conditions, prevention, mobility, medicines, and day-to-day independence.",
        href: "/primary-care/senior-care",
        image: assetUrl(naplesMemory),
        imageAlt: "Waterfront homes and green landscape in Naples, Florida",
        imagePosition: "center 50%",
      },
      links: [
        {
          title: "Senior medication review",
          description: "Check prescriptions, OTC products, vitamins, and supplements that may affect alertness, sleep, or thinking.",
          href: "/primary-care/medication-review-for-seniors",
        },
        {
          title: "Fall prevention",
          description: "Connect cognition, balance, medicines, vision, home safety, and mobility after a fall or near-fall.",
          href: "/primary-care/fall-prevention",
        },
        {
          title: "Chronic disease management",
          description: "Coordinate blood pressure, diabetes, thyroid disease, sleep, and other conditions that may affect brain health.",
          href: "/primary-care/chronic-disease",
        },
        {
          title: "Palliative support for dementia",
          description: "Explore symptom support, caregiver guidance, and care planning for a person living with established dementia and serious needs.",
          href: "/palliative-care/for-dementia",
        },
      ],
    },
    faqs: [
      {
        question: "Does a brief memory screen diagnose dementia?",
        answer:
          "No. A brief screen can identify an area that may need more evaluation, but it does not determine the cause or establish a dementia diagnosis by itself. Results need to be interpreted with medical history, medicines, daily function, examination, and sometimes additional testing.",
      },
      {
        question: "When should I make an appointment about memory?",
        answer:
          "Schedule an evaluation for repeated questions, getting lost in familiar places, difficulty managing medicines or bills, language or judgment changes, unsafe behavior, or any change that worries the patient or family. Sudden confusion requires urgent or emergency care instead.",
      },
      {
        question: "Can medicines or health conditions affect memory?",
        answer:
          "Yes. Medicines, alcohol, sleep problems, depression, anxiety, hearing or vision loss, thyroid disease, vitamin deficiency, infection, head injury, and other conditions can affect thinking. That is why a clinical evaluation looks beyond a test score.",
      },
      {
        question: "Should a family member come to the visit?",
        answer:
          "A trusted person can provide specific examples and help remember the plan when the patient agrees. The patient's voice, privacy, and preferences remain central, and the clinician may speak with the patient alone for part of the visit.",
      },
      {
        question: "Why does the USPSTF say evidence is insufficient for universal screening?",
        answer:
          "The statement applies to routine screening of older adults who have no recognized signs or symptoms. It means the balance of benefits and harms of screening everyone is not established. It does not advise ignoring a specific concern or functional change.",
      },
      {
        question: "What happens if the evaluation finds a cognitive concern?",
        answer:
          "Next steps depend on the pattern. They may include reviewing or adjusting medicines, laboratory tests, addressing mood, sleep, hearing, or vision, safety planning, repeat assessment, imaging, or referral to neurology, geriatrics, or another specialist.",
      },
    ],
    sources: [
      {
        label: "Memory Problems, Forgetfulness, and Aging",
        href: "https://www.nia.nih.gov/health/alzheimers-symptoms-and-diagnosis/do-memory-problems-always-mean-alzheimers-disease",
        publisher: "National Institute on Aging",
      },
      {
        label: "Cognitive Impairment in Older Adults: Screening",
        href: "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/cognitive-impairment-in-older-adults-screening",
        publisher: "U.S. Preventive Services Task Force",
      },
      {
        label: "Signs and Symptoms of Stroke",
        href: "https://www.cdc.gov/stroke/signs-symptoms/index.html",
        publisher: "Centers for Disease Control and Prevention",
      },
      {
        label: "Dementias",
        href: "https://www.ninds.nih.gov/health-information/disorders/dementias",
        publisher: "National Institute of Neurological Disorders and Stroke",
      },
    ],
    cta: {
      subtitle: "Memory evaluation in Naples",
      title: "Bring the real-life changes into a calm, structured review.",
      description:
        "Call Faithful Care to request an evaluation and ask what examples, medicines, records, and support person may be helpful to bring.",
      primaryText: "Discuss memory changes",
    },
  },

  "/primary-care/medication-review-for-seniors": {
    path: "/primary-care/medication-review-for-seniors",
    category: "Primary Care",
    parentHub: { label: "Back to Primary Care", href: "/primary-care" },
    hero: {
      title: "A senior medication review that includes everything you actually take.",
      subtitleBold: "Prescription bottles are only part of the story.",
      subtitle:
        "Faithful Care helps Naples older adults and caregivers reconcile prescriptions, over-the-counter medicines, vitamins, supplements, schedules, side effects, and prescribers so the medication list reflects real life and supports safer decisions.",
      marqueeItems: ["Brown-bag review", "Interaction check", "Schedule clarity", "Care coordination"],
      image: assetUrl(heroSeniorMan),
      imageMobile: assetUrl(heroSeniorManMobile),
      imageAlt: "Clinician and older adult reviewing medicines and a written care plan together",
      imagePosition: "82% top",
      imagePositionMobile: "100% 46%",
    },
    quickFacts: [
      { icon: Package, label: "Bring", value: "Every bottle, inhaler, drop, cream, vitamin, and supplement" },
      { icon: ClipboardText, label: "Include", value: "Dose, timing, reason, prescriber, and how you actually take it" },
      { icon: Warning, label: "Do not", value: "Stop, double, split, or combine medicines without professional guidance" },
    ],
    sections: [
      {
        type: "visit-steps",
        eyebrow: "The brown-bag method",
        title: "Put the complete medication story on the table.",
        subtitle:
          "Bringing the actual containers can uncover differences between the medical record, the pharmacy list, and what happens at home.",
        steps: [
          {
            icon: Package,
            title: "Gather every product",
            description:
              "Include prescriptions from every clinician, OTC pain and cold products, sleep aids, antacids, eye or ear drops, creams, inhalers, vitamins, herbals, and other supplements.",
          },
          {
            icon: ClipboardText,
            title: "Explain how you use each one",
            description:
              "Share the dose, time, reason, missed doses, products taken only as needed, side effects, cost barriers, and who prescribed or recommended each item.",
          },
          {
            icon: ListChecks,
            title: "Leave with one reconciled list",
            description:
              "Confirm what to take, when and why to take it, which questions require another prescriber or pharmacist, and how future changes will be recorded.",
          },
        ],
        ctaText: "Review my medicines",
        ctaHref: "/contact",
      },
      {
        type: "split-panel",
        eyebrow: "Why the list changes with age",
        title: "A familiar medicine can deserve a fresh review.",
        description:
          "A medicine that was useful years ago may still be right, but changes in the body, health conditions, other prescriptions, and daily routines can change its benefits or risks.",
        tone: "plain",
        items: [
          {
            icon: Stethoscope,
            title: "Kidney and liver function",
            description:
              "These organs help process or remove many medicines. Changes in function can affect how long a drug stays in the body or which dose is appropriate.",
          },
          {
            icon: ArrowsClockwise,
            title: "More interactions to consider",
            description:
              "Prescription medicines, OTC products, supplements, food, and alcohol can change one another's effects or add to drowsiness, bleeding, blood pressure changes, or other risks.",
          },
          {
            icon: Brain,
            title: "Different side-effect patterns",
            description:
              "Dizziness, confusion, sleepiness, constipation, urinary difficulty, or poor appetite can be mistaken for aging or a new illness unless medicines are reviewed.",
          },
          {
            icon: UsersThree,
            title: "Several prescribers, one person",
            description:
              "Primary care can help reconcile instructions across specialists and pharmacies, while involving the original prescriber when a treatment decision belongs with that clinician.",
          },
        ],
      },
      {
        type: "comparison",
        eyebrow: "Turn a list into a care tool",
        title: "A medication name alone is not enough information.",
        description:
          "Each item should answer practical questions that help patients, caregivers, clinicians, pharmacists, and emergency teams understand the current plan.",
        leftHeading: "What to record",
        rightHeading: "Why it matters",
        rows: [
          {
            label: "Identity",
            left: "Product name, strength, form, and whether it is prescription, OTC, vitamin, herbal, or another supplement.",
            right: "Products with similar names or ingredients can be confused, and combination products can unintentionally duplicate an ingredient.",
          },
          {
            label: "Instructions",
            left: "How much you take, what time, with or without food, and whether it is scheduled or used only as needed.",
            right: "The written prescription and the real routine may differ. Timing, food, missed doses, and as-needed use can change effects and safety.",
          },
          {
            label: "Purpose and source",
            left: "Why you take it, who prescribed or recommended it, and which condition or symptom it is intended to address.",
            right: "A clear purpose helps the care team assess whether the medicine is still meeting a current need and who should answer change-related questions.",
          },
          {
            label: "Experience",
            left: "Benefits noticed, side effects, falls, confusion, swallowing difficulty, cost concerns, and doses you skip or alter.",
            right: "A plan that cannot be followed safely, afforded, swallowed, or remembered needs discussion rather than silent workarounds.",
          },
        ],
        note:
          "Keep the reconciled list with you, share it with each health professional and a trusted person, and update it whenever a product or dose changes.",
      },
      {
        type: "detail-grid",
        eyebrow: "Questions for each medicine",
        eyebrowColor: "primary",
        title: "A review should connect benefit, risk, and daily use.",
        description:
          "The purpose is not to remove medicines automatically. It is to identify discrepancies, interactions, unwanted effects, monitoring needs, and questions that deserve a shared decision.",
        statNumber: "4",
        statLabel: "questions keep the review focused without assuming that a long list is automatically the wrong list",
        cards: [
          {
            icon: ShieldCheck,
            title: "Is it helping the intended problem?",
            description:
              "Clarify the original reason, current benefit, and whether the condition, treatment goal, or available evidence has changed.",
          },
          {
            icon: Warning,
            title: "Could it be causing a problem?",
            description:
              "Look for side effects, duplicate ingredients, interactions, allergy concerns, falls, confusion, bleeding, constipation, or other new symptoms.",
          },
          {
            icon: CalendarCheck,
            title: "Is monitoring up to date?",
            description:
              "Some medicines need laboratory tests, blood pressure or glucose checks, symptom review, or another follow-up to confirm benefit and safety.",
          },
          {
            icon: Pill,
            title: "Can the plan be followed correctly?",
            description:
              "Complex timing, unreadable labels, swallowing problems, cost, memory, dexterity, or multiple pharmacies may require practical support or prescriber input.",
          },
        ],
      },
      {
        type: "care-levels",
        eyebrow: "Medication safety",
        title: "Know when a medicine question cannot wait for a routine review.",
        description:
          "If you think the wrong product or dose was taken, do not guess at a home remedy. Get immediate guidance and keep the container available.",
        items: [
          {
            tone: "emergency",
            label: "Call 911",
            title: "Severe reaction, overdose symptoms, or loss of consciousness",
            description:
              "Call for severe trouble breathing, swelling of the face or throat, seizure, collapse, inability to wake, severe chest pain, stroke signs, or another life-threatening reaction.",
            action: "Call 911. Keep the medicine containers nearby for responders and do not make the person vomit unless a professional directs you.",
          },
          {
            tone: "today",
            label: "Get immediate expert guidance",
            title: "A wrong medicine, double dose, or possible interaction",
            description:
              "For a suspected poisoning or dosing error without life-threatening symptoms, contact Poison Control at 1-800-222-1222 and the relevant clinician or pharmacist for instructions.",
            action: "Have the product name, strength, amount, time taken, age, symptoms, and other medicines ready. Do not wait for symptoms to appear.",
          },
          {
            tone: "routine",
            label: "Schedule a review",
            title: "The list is confusing or a new problem appeared",
            description:
              "Book a review for dizziness, falls, memory or sleep changes, side effects, duplicate bottles, several prescribers, recent hospital care, or uncertainty about what to take.",
            action: "Keep taking prescribed medicines as directed unless a qualified professional gives you a different instruction.",
          },
        ],
        note:
          "Never stop, restart, double, split, crush, or share a medicine based only on general website information. Some abrupt changes can cause serious harm.",
      },
    ],
    related: {
      eyebrow: "One medication list, connected care",
      title: "Medication safety supports memory, mobility, and chronic-disease care.",
      description:
        "A reconciled list becomes more useful when it travels with the patient and stays connected to falls, thinking changes, laboratory monitoring, and every treating clinician.",
      featured: {
        title: "Senior primary care",
        description:
          "Coordinate medicine questions with prevention, chronic conditions, memory, mobility, and the daily priorities that matter in later life.",
        href: "/primary-care/senior-care",
        image: assetUrl(naplesMedication),
        imageAlt: "Coastal neighborhood and waterways in Naples, Florida",
        imagePosition: "center 52%",
      },
      links: [
        {
          title: "Fall prevention",
          description: "Review dizziness, drowsiness, blood pressure changes, balance, vision, footwear, and other contributors after a fall.",
          href: "/primary-care/fall-prevention",
        },
        {
          title: "Memory screening",
          description: "Evaluate a specific change in memory or daily function, including medicines and health conditions that may contribute.",
          href: "/primary-care/memory-screening",
        },
        {
          title: "Chronic disease management",
          description: "Keep medicine monitoring connected to diabetes, blood pressure, thyroid disease, COPD, and other ongoing care.",
          href: "/primary-care/chronic-disease",
        },
        {
          title: "New patients",
          description: "See which records, bottles, pharmacy details, and specialist information can make a first visit more productive.",
          href: "/new-patients",
        },
      ],
    },
    faqs: [
      {
        question: "What should I bring to a senior medication review?",
        answer:
          "Bring every prescription bottle, OTC medicine, vitamin, herbal, supplement, inhaler, drop, cream, and injectable product you use. Include items taken only as needed, products from other clinicians, your pharmacy information, allergies, recent laboratory results, and any written medication lists.",
      },
      {
        question: "Why bring the bottles if the medicines are in my chart?",
        answer:
          "The chart, pharmacy record, specialist list, and home routine may not match. Bottles can reveal the exact strength, old or duplicate prescriptions, directions, prescribers, and products missing from the record. Explain how you actually take each item.",
      },
      {
        question: "Do vitamins and supplements count as medicines for the review?",
        answer:
          "Yes. Vitamins, herbals, and dietary supplements can interact with prescription or OTC medicines, affect laboratory tests, or add unwanted effects. Bring the container or a clear photo of its label and dose.",
      },
      {
        question: "Will the clinician automatically stop medicines because I am older?",
        answer:
          "No. Age or the number of medicines alone does not determine the plan. A review considers the reason for each product, current benefit, side effects, interactions, kidney and liver function, treatment goals, and which prescriber should be involved in any change.",
      },
      {
        question: "Can I stop a medicine if I think it is causing dizziness or confusion?",
        answer:
          "Do not stop or change a prescribed medicine on your own. Some medicines can cause harm if stopped abruptly. Contact the prescribing clinician or pharmacist promptly, describe the symptoms and timing, and ask for specific instructions. Call 911 for severe or life-threatening symptoms.",
      },
      {
        question: "When is the best time to update my medication list?",
        answer:
          "Update it whenever a medicine, dose, schedule, or supplement changes and after a hospital, emergency, specialist, or pharmacy transition. Review it periodically and carry a current copy that includes allergies, the purpose of each medicine, and prescriber information.",
      },
    ],
    sources: [
      {
        label: "5 Medication Safety Tips for Older Adults",
        href: "https://www.fda.gov/consumers/consumer-updates/5-medication-safety-tips-older-adults",
        publisher: "U.S. Food and Drug Administration",
      },
      {
        label: "Create and Keep a Medication List for Your Health",
        href: "https://www.fda.gov/consumers/consumer-updates/create-and-keep-medication-list-your-health",
        publisher: "U.S. Food and Drug Administration",
      },
      {
        label: "As You Age: You and Your Medicines",
        href: "https://www.fda.gov/drugs/information-consumers-and-patients-drugs/you-age-you-and-your-medicines",
        publisher: "U.S. Food and Drug Administration",
      },
      {
        label: "Taking Medicines Safely as You Age",
        href: "https://www.nia.nih.gov/health/medicines-and-medication-management/taking-medicines-safely-you-age",
        publisher: "National Institute on Aging",
      },
      {
        label: "Poison Help and the National Poison Center Line",
        href: "https://poisonhelp.hrsa.gov/about-us",
        publisher: "Health Resources and Services Administration",
      },
    ],
    cta: {
      subtitle: "Senior medication review in Naples",
      title: "Bring the bottles. Build one list everyone can use.",
      description:
        "Call Faithful Care to request a medication review and ask how to prepare prescription, OTC, vitamin, supplement, pharmacy, and prescriber information.",
      primaryText: "Review my medicines",
    },
  },
} satisfies ConditionPageMap;
