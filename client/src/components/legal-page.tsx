import * as React from "react";
import { Link } from "@/lib/router";
import { Printer, ArrowLeft } from "@phosphor-icons/react";


export interface LegalPageProps {
  eyebrow: string;
  title: string;
  effectiveDate?: string;
  intro?: React.ReactNode;
  children: React.ReactNode;
  schemaUrl: string;
  schemaDescription: string;
}

export function LegalPage({
  eyebrow,
  title,
  effectiveDate,
  intro,
  children,
}: LegalPageProps) {
  const handlePrint = React.useCallback(() => {
    if (typeof window !== "undefined") window.print();
  }, []);

  return (
    <div className="bg-white text-[hsl(var(--foreground))]">
      <main id="main">
        <section className="legal-page-header">
          <div className="container-radical pt-28 md:pt-36 pb-10 md:pb-14">
            <div className="max-w-3xl">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-primary text-sm font-medium hover:underline mb-6 print:hidden"
                data-testid="link-legal-back-home"
              >
                <ArrowLeft className="w-4 h-4" weight="regular" />
                Back to home
              </Link>
              <p
                className="text-primary text-sm uppercase tracking-[0.18em] font-semibold mb-4"
                data-testid="text-legal-eyebrow"
              >
                {eyebrow}
              </p>
              <h1
                className="font-serif text-[clamp(36px,5vw,60px)] leading-[1.05] text-foreground"
                data-testid="text-legal-title"
              >
                {title}
              </h1>
              {effectiveDate && (
                <p
                  className="mt-6 text-base text-foreground/70"
                  data-testid="text-legal-effective"
                >
                  Effective date: <span className="font-semibold text-foreground">{effectiveDate}</span>
                </p>
              )}
              {intro && (
                <div
                  className="mt-6 text-[clamp(17px,1.4vw,19px)] leading-[1.65] text-foreground/85"
                  data-testid="text-legal-intro"
                >
                  {intro}
                </div>
              )}
              <button
                type="button"
                onClick={handlePrint}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary/30 px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary hover:text-white transition-colors print:hidden"
                data-testid="button-legal-print"
              >
                <Printer className="w-4 h-4" weight="regular" />
                Print this page
              </button>
            </div>
          </div>
        </section>

        <section className="pb-20 md:pb-28">
          <div className="container-radical">
            <article
              className="legal-prose max-w-3xl"
              data-testid="article-legal-content"
            >
              {children}
            </article>
          </div>
        </section>
      </main>

      <style>{`
        .legal-page-header {
          background: linear-gradient(180deg, hsl(var(--secondary) / 0.06) 0%, transparent 100%);
          border-bottom: 1px solid hsl(var(--primary) / 0.12);
        }
        .legal-prose {
          color: hsl(var(--foreground));
          font-size: clamp(16px, 1.2vw, 18px);
          line-height: 1.7;
        }
        .legal-prose h2 {
          font-family: var(--font-serif);
          font-size: clamp(24px, 2.4vw, 32px);
          line-height: 1.2;
          margin-top: clamp(40px, 5vw, 64px);
          margin-bottom: clamp(12px, 1.2vw, 18px);
          color: hsl(var(--foreground));
        }
        .legal-prose h3 {
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: clamp(18px, 1.5vw, 21px);
          margin-top: clamp(24px, 3vw, 36px);
          margin-bottom: clamp(8px, 1vw, 12px);
          color: hsl(var(--foreground));
        }
        .legal-prose p {
          margin-bottom: clamp(14px, 1.4vw, 20px);
        }
        .legal-prose ul, .legal-prose ol {
          margin-bottom: clamp(14px, 1.4vw, 20px);
          padding-left: 1.5rem;
        }
        .legal-prose li {
          margin-bottom: 0.4rem;
        }
        .legal-prose ul { list-style: disc; }
        .legal-prose ol { list-style: decimal; }
        .legal-prose a {
          color: hsl(var(--primary));
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .legal-prose a:hover { text-decoration-thickness: 2px; }
        .legal-prose strong { font-weight: 600; }
        .legal-prose .legal-callout {
          background: hsl(var(--secondary) / 0.08);
          border-left: 4px solid hsl(var(--primary));
          padding: clamp(16px, 2vw, 22px) clamp(18px, 2.2vw, 26px);
          border-radius: 8px;
          margin: clamp(20px, 2.4vw, 32px) 0;
        }
        .legal-prose .legal-mandatory {
          font-weight: 700;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          line-height: 1.4;
          font-size: clamp(15px, 1.2vw, 17px);
        }
        @media print {
          .legal-page-header {
            background: white !important;
            border-bottom: 1px solid #000;
          }
          .legal-prose { font-size: 11pt; line-height: 1.5; color: #000; }
          .legal-prose h2 { font-size: 16pt; margin-top: 18pt; }
          .legal-prose h3 { font-size: 13pt; }
          .legal-prose a { color: #000; text-decoration: underline; }
          .legal-prose .legal-callout { background: white; border-left: 2px solid #000; }
        }
      `}</style>
    </div>
  );
}
