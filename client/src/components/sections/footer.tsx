import { Link } from "@/lib/router";
import { navigationData } from "@/lib/navigation-data";
import { cn } from "@/lib/utils";
import { openCookiePreferences } from "@/hooks/use-consent";
import { 
  Phone, 
  Envelope, 
  MapPin, 
  FacebookLogo, 
  TiktokLogo, 
  InstagramLogo 
} from "@phosphor-icons/react";
import { PROVIDER_NAME, PROVIDER_CREDENTIALS } from "@/lib/provider-info";

interface FooterProps {
  className?: string;
}

export function Footer({ className }: FooterProps) {
  const serviceCategories = navigationData.filter(c => c.id !== "locations" && c.id !== "insurance");
  const locationCategory = navigationData.find(c => c.id === "locations");

  return (
    <footer 
      className={cn("navy-surface", className)}
      data-testid="footer"
    >
      <div className="container-radical py-16 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-8">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" aria-label="Faithful Care Medical Services home" data-testid="footer-logo">
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                Faithful Care
              </span>
            </Link>
            <p className="mt-4 text-white/60 leading-relaxed max-w-sm">
              Your complete medical home in Naples. Primary care and palliative 
              care under one roof, for every stage of life.
            </p>
          </div>

          {serviceCategories.map((category) => (
            <div key={category.id} data-testid={`footer-column-${category.id}`}>
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                {category.title}
              </h3>
              <ul className="space-y-3">
                {category.subPages.map((subPage, index) => (
                  <li key={index}>
                    <Link 
                      href={subPage.href}
                      className="text-white/60 hover:text-secondary transition-colors text-sm"
                      data-testid={`footer-link-${category.id}-${index}`}
                    >
                      {subPage.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {locationCategory && (
            <div data-testid="footer-column-locations">
              <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                Locations
              </h3>
              <ul className="space-y-3">
                {locationCategory.subPages.slice(0, 6).map((subPage, index) => (
                  <li key={index}>
                    <Link 
                      href={subPage.href}
                      className="text-white/60 hover:text-secondary transition-colors text-sm"
                      data-testid={`footer-link-locations-${index}`}
                    >
                      {subPage.title}
                    </Link>
                  </li>
                ))}
                {locationCategory.subPages.length > 6 && (
                  <li>
                    <Link
                      href={locationCategory.subPages[6]?.href || "/"}
                      className="text-secondary hover:text-secondary/80 transition-colors text-sm font-medium"
                      data-testid="footer-link-locations-more"
                    >
                      + {locationCategory.subPages.length - 6} more areas
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}

          <div data-testid="footer-column-quick-links">
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/about"
                  className="text-white/60 hover:text-secondary transition-colors text-sm"
                  data-testid="footer-link-about"
                >
                  About Dr. Reve
                </Link>
              </li>
              <li>
                <Link 
                  href="/reviews"
                  className="text-white/60 hover:text-secondary transition-colors text-sm"
                  data-testid="footer-link-reviews"
                >
                  Patient Reviews
                </Link>
              </li>
              <li>
                <Link 
                  href="/palliative-care/patient-family-support"
                  className="text-white/60 hover:text-secondary transition-colors text-sm"
                  data-testid="footer-link-family-support"
                >
                  Family Support
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact"
                  className="text-white/60 hover:text-secondary transition-colors text-sm"
                  data-testid="footer-link-contact"
                >
                  Contact & Appointments
                </Link>
              </li>
              <li>
                <Link 
                  href="/new-patients"
                  className="text-white/60 hover:text-secondary transition-colors text-sm"
                  data-testid="footer-link-new-patients"
                >
                  New Patients
                </Link>
              </li>
              <li>
                <Link 
                  href="/medicare"
                  className="text-white/60 hover:text-secondary transition-colors text-sm"
                  data-testid="footer-link-medicare"
                >
                  Medicare
                </Link>
              </li>
              <li>
                <Link 
                  href="/insurance-accepted"
                  className="text-white/60 hover:text-secondary transition-colors text-sm"
                  data-testid="footer-link-insurance"
                >
                  Insurance Plans
                </Link>
              </li>
              <li>
                <Link 
                  href="/es"
                  className="text-white/60 hover:text-secondary transition-colors text-sm"
                  data-testid="footer-link-espanol"
                >
                  Español
                </Link>
              </li>
            </ul>
          </div>

          <div data-testid="footer-column-legal">
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-white/60 hover:text-secondary transition-colors text-sm"
                  data-testid="footer-link-privacy-policy"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/notice-of-privacy-practices"
                  className="text-white/60 hover:text-secondary transition-colors text-sm"
                  data-testid="footer-link-npp"
                >
                  HIPAA Notice
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-use"
                  className="text-white/60 hover:text-secondary transition-colors text-sm"
                  data-testid="footer-link-terms"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/medical-disclaimer"
                  className="text-white/60 hover:text-secondary transition-colors text-sm"
                  data-testid="footer-link-medical-disclaimer"
                >
                  Medical Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/accessibility-statement"
                  className="text-white/60 hover:text-secondary transition-colors text-sm"
                  data-testid="footer-link-accessibility"
                >
                  Accessibility
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openCookiePreferences}
                  className="text-white/60 hover:text-secondary transition-colors text-sm text-left"
                  data-testid="footer-link-cookie-preferences"
                >
                  Cookie Preferences
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 md:mt-16 pt-6 md:pt-8 border-t border-white/10">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-white/50 mb-6">
            <a 
              href="tel:+1-239-423-0205" 
              className="inline-flex items-center gap-1.5 hover:text-secondary transition-colors whitespace-nowrap"
              data-testid="footer-phone"
            >
              <Phone className="w-3.5 h-3.5" weight="regular" />
              <span>(239) 423-0205</span>
            </a>
            <span className="text-white/20" aria-hidden="true">|</span>
            <a 
              href="mailto:info@faithfulcaremedical.com" 
              className="inline-flex items-center gap-1.5 hover:text-secondary transition-colors whitespace-nowrap"
              data-testid="footer-email"
            >
              <Envelope className="w-3.5 h-3.5" weight="regular" />
              <span>info@faithfulcaremedical.com</span>
            </a>
            <span className="text-white/20" aria-hidden="true">|</span>
            <span 
              className="inline-flex items-center gap-1.5 whitespace-nowrap"
              data-testid="footer-address"
            >
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" weight="regular" />
              <span>9955 Tamiami Trail N. Suite 2, Naples, FL 34108</span>
            </span>
          </div>

          <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} Faithful Care Medical Services. All rights reserved.
            </p>

            <div className="flex items-center gap-4">
              <SocialLink href="https://www.facebook.com/addysrevemd/" icon={FacebookLogo} label="Visit Faithful Care Medical Services on Facebook" testIdLabel="facebook" />
              <SocialLink href="https://www.instagram.com/addysreve/" icon={InstagramLogo} label="Visit Faithful Care Medical Services on Instagram" testIdLabel="instagram" />
              <SocialLink href="https://www.tiktok.com/@addysrevemd" icon={TiktokLogo} label="Visit Faithful Care Medical Services on TikTok" testIdLabel="tiktok" />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm">
              <Link
                href="/notice-of-privacy-practices"
                className="text-white/40 hover:text-secondary transition-colors underline-offset-4 hover:underline"
                data-testid="footer-link-hipaa-badge"
              >
                HIPAA Compliant
              </Link>
            </div>
          </div>

          <div
            className="mt-6 md:mt-8 pt-6 border-t border-white/10 flex flex-col items-center text-center gap-2 text-sm text-white/50"
            data-testid="footer-provider-credentials"
          >
            <p className="text-white/70 font-semibold">{PROVIDER_NAME}</p>
            <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
              {PROVIDER_CREDENTIALS.map((credential, index) => (
                <span
                  key={credential.type}
                  className="inline-flex items-center gap-2"
                >
                  {index > 0 && (
                    <span className="text-white/20" aria-hidden="true">|</span>
                  )}
                  <span data-testid={`footer-credential-${credential.type.toLowerCase()}`}>
                    {credential.label}: {credential.value}
                  </span>
                </span>
              ))}
            </p>
            <p className="text-white/40">
              <a
                href={PROVIDER_CREDENTIALS[1].verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:underline hover:text-secondary transition-colors"
                data-testid="footer-link-mqa-verify"
              >
                Verify on Florida MQA Search
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ 
  href, 
  icon: Icon, 
  label,
  testIdLabel,
}: { 
  href: string; 
  icon: typeof FacebookLogo; 
  label: string;
  testIdLabel: string;
}) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full bg-white/10 hover:bg-secondary flex items-center justify-center transition-colors"
      aria-label={label}
      data-testid={`footer-social-${testIdLabel}`}
    >
      <Icon className="w-5 h-5" weight="regular" aria-hidden="true" />
    </a>
  );
}
