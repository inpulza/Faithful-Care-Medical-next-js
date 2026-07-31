"use client";

import * as React from "react";
import { useLocation } from "@/lib/router";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MegaMenu } from "@/components/mega-menu";
import { Footer } from "@/components/sections/footer";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { PageTransitionProvider } from "@/components/page-transition";
import { CookieBanner } from "@/components/cookie-banner";
import { toast } from "@/hooks/use-toast";


const Home = React.lazy(() => import("@/pages/home"));
const NotFound = React.lazy(() => import("@/pages/not-found"));

const Contact = React.lazy(() => import("@/pages/contact"));
const InsuranceAccepted = React.lazy(() => import("@/pages/insurance-accepted"));
const About = React.lazy(() => import("@/pages/about"));
const Reviews = React.lazy(() => import("@/pages/reviews"));
const NewPatients = React.lazy(() => import("@/pages/new-patients"));
const Medicare = React.lazy(() => import("@/pages/medicare"));

const PrimaryCareIndex = React.lazy(() => import("@/pages/primary-care/index"));
const CheckupsPrevention = React.lazy(() => import("@/pages/primary-care/checkups-prevention"));
const ChronicDisease = React.lazy(() => import("@/pages/primary-care/chronic-disease"));
const SameDayVisits = React.lazy(() => import("@/pages/primary-care/same-day-visits"));
const WomensHealth = React.lazy(() => import("@/pages/primary-care/womens-health"));
const SeniorCare = React.lazy(() => import("@/pages/primary-care/senior-care"));
const ProceduresDiagnostics = React.lazy(() => import("@/pages/primary-care/procedures-diagnostics"));

const PalliativeCareIndex = React.lazy(() => import("@/pages/palliative-care/index"));
const AboutPalliativeCare = React.lazy(() => import("@/pages/palliative-care/about-palliative-care"));
const SymptomRelief = React.lazy(() => import("@/pages/palliative-care/symptom-relief"));
const PatientFamilySupport = React.lazy(() => import("@/pages/palliative-care/patient-family-support"));
const PlanningTransitions = React.lazy(() => import("@/pages/palliative-care/planning-transitions"));

const PrivacyPolicy = React.lazy(() => import("@/pages/legal/privacy-policy"));
const NoticeOfPrivacyPractices = React.lazy(() => import("@/pages/legal/notice-of-privacy-practices"));
const TermsOfUse = React.lazy(() => import("@/pages/legal/terms-of-use"));
const MedicalDisclaimer = React.lazy(() => import("@/pages/legal/medical-disclaimer"));
const AccessibilityStatement = React.lazy(() => import("@/pages/legal/accessibility-statement"));

const NaplesLocation = React.lazy(() => import("@/pages/locations/naples"));
const MarcoIslandLocation = React.lazy(() => import("@/pages/locations/marco-island"));
const GoldenGateLocation = React.lazy(() => import("@/pages/locations/golden-gate"));
const ImmokaleeLocation = React.lazy(() => import("@/pages/locations/immokalee"));
const BonitaSpringsLocation = React.lazy(() => import("@/pages/locations/bonita-springs"));
const EsteroLocation = React.lazy(() => import("@/pages/locations/estero"));
const FortMyersLocation = React.lazy(() => import("@/pages/locations/fort-myers"));
const CapeCoralLocation = React.lazy(() => import("@/pages/locations/cape-coral"));

const EsHome = React.lazy(() => import("@/pages/es/home"));
const EsMedicoDeFamilia = React.lazy(() => import("@/pages/es/medico-de-familia"));
const EsCuidadosPaliativos = React.lazy(() => import("@/pages/es/cuidados-paliativos"));
const EsSegurosYMedicare = React.lazy(() => import("@/pages/es/seguros-y-medicare"));
const EsContacto = React.lazy(() => import("@/pages/es/contacto"));

const routeComponents: Record<string, React.LazyExoticComponent<React.ComponentType>> = {
  "/": Home,
  "/contact": Contact,
  "/insurance-accepted": InsuranceAccepted,
  "/about": About,
  "/reviews": Reviews,
  "/new-patients": NewPatients,
  "/medicare": Medicare,
  "/primary-care": PrimaryCareIndex,
  "/primary-care/checkups-prevention": CheckupsPrevention,
  "/primary-care/chronic-disease": ChronicDisease,
  "/primary-care/same-day-visits": SameDayVisits,
  "/primary-care/womens-health": WomensHealth,
  "/primary-care/senior-care": SeniorCare,
  "/primary-care/procedures-diagnostics": ProceduresDiagnostics,
  "/palliative-care": PalliativeCareIndex,
  "/palliative-care/about-palliative-care": AboutPalliativeCare,
  "/palliative-care/symptom-relief": SymptomRelief,
  "/palliative-care/patient-family-support": PatientFamilySupport,
  "/palliative-care/planning-transitions": PlanningTransitions,
  "/locations/naples": NaplesLocation,
  "/locations/marco-island": MarcoIslandLocation,
  "/locations/golden-gate": GoldenGateLocation,
  "/locations/immokalee": ImmokaleeLocation,
  "/locations/bonita-springs": BonitaSpringsLocation,
  "/locations/estero": EsteroLocation,
  "/locations/fort-myers": FortMyersLocation,
  "/locations/cape-coral": CapeCoralLocation,
  "/es": EsHome,
  "/es/medico-de-familia-naples": EsMedicoDeFamilia,
  "/es/cuidados-paliativos-naples": EsCuidadosPaliativos,
  "/es/seguros-y-medicare": EsSegurosYMedicare,
  "/es/contacto": EsContacto,
  "/privacy-policy": PrivacyPolicy,
  "/notice-of-privacy-practices": NoticeOfPrivacyPractices,
  "/terms-of-use": TermsOfUse,
  "/medical-disclaimer": MedicalDisclaimer,
  "/accessibility-statement": AccessibilityStatement,
};

function Router() {
  const [rawLocation] = useLocation();
  const location = rawLocation === "/es/" ? "/es" : rawLocation;
  const Component = routeComponents[location] ?? NotFound;

  return (
    <React.Suspense fallback={<div className="min-h-screen" aria-hidden="true" />}>
      <Component />
    </React.Suspense>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let lenisInstance: { destroy: () => void } | null = null;
    let rafId = 0;
    let cancelled = false;

    const start = () => {
      if (cancelled) return;
      import("lenis").then(({ default: Lenis }) => {
        if (cancelled) return;
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });
        lenisInstance = lenis;
        const loop = (time: number) => {
          lenis.raf(time);
          rafId = requestAnimationFrame(loop);
        };
        rafId = requestAnimationFrame(loop);
      });
    };

    const hasIdle = typeof window.requestIdleCallback === "function";
    const handle = hasIdle
      ? window.requestIdleCallback(start, { timeout: 2000 })
      : window.setTimeout(start, 1500);

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
      if (hasIdle) {
        window.cancelIdleCallback(handle);
      } else {
        clearTimeout(handle);
      }
      lenisInstance?.destroy();
    };
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[1000] focus:px-4 focus:py-3 focus:rounded-lg focus:bg-primary focus:text-white focus:font-semibold focus:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-white"
        data-testid="link-skip-to-main"
      >
        Skip to main content
      </a>
      <MegaMenu />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
      <div className="h-20 md:hidden" />
      <MobileActionBar />
      <CookieBanner />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AppToasts />
        <PageTransitionProvider>
          <Layout>
            <Router />
          </Layout>
        </PageTransitionProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

function AppToasts() {
  React.useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as
        | { title?: string; description?: string }
        | undefined;

      toast({
        title: detail?.title ?? "Done",
        description: detail?.description,
      });
    };

    window.addEventListener("luxe:toast", handler as any);
    return () => window.removeEventListener("luxe:toast", handler as any);
  }, []);

  return null;
}

export default App;
