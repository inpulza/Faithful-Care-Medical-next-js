import * as React from "react";
import { 
  ArrowRight, 
  CheckCircle, 
  Warning, 
  Info, 
  X, 
  Heart, 
  House, 
  MagnifyingGlass, 
  CaretDown, 
  List, 
  Sparkle,
  Users,
  Stethoscope,
  Shield,
  Phone,
  Envelope,
  DeviceMobile,
  Desktop,
  Rows,
  SquaresFour
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/typography";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeader } from "@/components/ui/section-header";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

function Token({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-6 py-4" data-testid={`row-token-${name}`}>
      <div className="text-sm tracking-[0.14em] uppercase text-[hsl(var(--foreground)/0.70)]" data-testid={`text-token-name-${name}`}>
        {name}
      </div>
      <div className="font-semibold" data-testid={`text-token-value-${name}`}>
        {value}
      </div>
    </div>
  );
}

export default function DesignSystem() {
  return (
    <div className="bg-white text-[hsl(var(--foreground))]" data-testid="page-design-system">
      <header className="container-radical pt-16" data-testid="header-design-system">
        <div className="flex flex-col gap-10">
          <div className="flex items-end justify-between gap-8">
            <div>
              <div
                className="text-sm tracking-[0.18em] uppercase text-[hsl(var(--foreground)/0.70)]"
                data-testid="text-ds-eyebrow"
              >
                Design System
              </div>
              <Typography as="h1" variant="h1" className="mt-4" data-testid="text-ds-title">
                Radical Minimalist
              </Typography>
              <Typography variant="body-lg" className="mt-6 max-w-3xl" data-testid="text-ds-subtitle">
                Single-page reference with the core tokens and UI primitives. White surfaces, no-grays policy,
                senior-readable typography, and brand-color borders.
              </Typography>
            </div>

            <div className="hidden md:flex items-center gap-3" data-testid="ds-actions">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toast({ title: "Saved", description: "Tokens exported (mock)." })}
                data-testid="button-ds-export"
              >
                Export tokens
              </Button>
              <Button
                size="sm"
                onClick={() => toast({ title: "Preview", description: "This is a frontend-only prototype." })}
                data-testid="button-ds-preview"
              >
                Open preview
                <ArrowRight className="ml-1" weight="regular" size={20} />
              </Button>
            </div>
          </div>

          <div className="hairline" data-testid="divider-ds-hero" />
        </div>
      </header>

      <main id="main" className="container-radical section-gap" data-testid="main-design-system">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <section className="lg:col-span-5" data-testid="section-ds-tokens">
            <Typography as="h2" variant="h2" data-testid="text-ds-tokens-title">
              Tokens
            </Typography>
            <Typography variant="body-md" className="mt-5 max-w-lg" data-testid="text-ds-tokens-body">
              These are the canonical values used throughout the UI.
            </Typography>

            <div className="mt-10 grid gap-6" data-testid="grid-ds-token-cards">
              <Card data-testid="card-ds-colors">
                <CardHeader>
                  <CardTitle data-testid="text-card-colors-title">Colors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4" data-testid="list-ds-colors">
                    {["PRIMARY_ROYAL", "SECONDARY_TEAL", "DEEP_NAVY_TEXT", "ACCENT_SUCCESS", "ACCENT_URGENT", "BG_PURE"].map(
                      (k) => (
                        <div
                          key={k}
                          className="flex items-center justify-between gap-6"
                          data-testid={`row-color-${k}`}
                        >
                          <div className="text-sm tracking-[0.14em] uppercase text-[hsl(var(--foreground)/0.70)]">
                            {k}
                          </div>
                          <div className="flex items-center gap-3">
                            <div
                              className={
                                k === "PRIMARY_ROYAL"
                                  ? "h-8 w-8 rounded-xl bg-[hsl(var(--primary))] inner-glow-primary"
                                  : k === "SECONDARY_TEAL"
                                    ? "h-8 w-8 rounded-xl bg-[hsl(var(--secondary))] inner-glow-teal"
                                    : k === "DEEP_NAVY_TEXT"
                                      ? "h-8 w-8 rounded-xl bg-[hsl(var(--foreground))]"
                                      : k === "ACCENT_SUCCESS"
                                        ? "h-8 w-8 rounded-xl bg-[hsl(159_73%_40%)]"
                                        : k === "ACCENT_URGENT"
                                          ? "h-8 w-8 rounded-xl bg-[hsl(38_92%_52%)]"
                                          : "h-8 w-8 rounded-xl bg-white medical-border"
                              }
                              data-testid={`swatch-${k}`}
                            />
                            <div className="font-semibold" data-testid={`text-color-value-${k}`}>
                              {k === "PRIMARY_ROYAL"
                                ? "#0066FF"
                                : k === "SECONDARY_TEAL"
                                  ? "#00C2CB"
                                  : k === "DEEP_NAVY_TEXT"
                                    ? "#001A33"
                                    : k === "ACCENT_SUCCESS"
                                      ? "#10B981"
                                      : k === "ACCENT_URGENT"
                                        ? "#F59E0B"
                                        : "#FFFFFF"}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-ds-typography">
                <CardHeader>
                  <CardTitle data-testid="text-card-typography-title">Typography</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div data-testid="typography-samples">
                    <div className="h1" data-testid="text-sample-h1">
                      H1 — DM Serif Display
                    </div>
                    <div className="h2 mt-4" data-testid="text-sample-h2">
                      H2 — DM Serif Display
                    </div>
                    <div className="h3 mt-4" data-testid="text-sample-h3">
                      H3 — Inter Semibold
                    </div>
                    <div className="font-sans font-bold text-6xl text-primary mt-4" data-testid="text-sample-stat">
                      77% — Large Stats (Inter)
                    </div>
                    <div className="body-lg mt-4" data-testid="text-sample-bodylg">
                      Body LG — 22px Inter for comfortable reading.
                    </div>
                    <div className="body-md mt-3" data-testid="text-sample-bodymd">
                      Body MD — 18px Inter minimum standard.
                    </div>
                  </div>

                  <div className="hairline" data-testid="divider-typography" />

                  <div className="grid gap-2" data-testid="typography-spec">
                    <Token name="H1" value="64/40, Serif, LH 1.1" />
                    <Token name="H2" value="48, Serif, LH 1.2" />
                    <Token name="H3" value="32, Sans, 600, LH 1.3" />
                    <Token name="STATS" value="Large numbers → Sans" />
                    <Token name="BODY_LG" value="22, Sans, LH 1.6" />
                    <Token name="BODY_MD" value="18, Sans, LH 1.6" />
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-ds-spacing">
                <CardHeader>
                  <CardTitle data-testid="text-card-spacing-title">Spacing & Grid</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2" data-testid="spacing-spec">
                    <Token name="Soft-8" value="8px rhythm" />
                    <Token name="Container" value="1440px / 64px" />
                    <Token name="Section Gap" value="160px / 80px" />
                  </div>

                  <div className="mt-8 grid grid-cols-8 gap-2" data-testid="grid-soft-8">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-10 rounded-xl bg-[hsl(var(--primary)/0.06)] medical-border"
                        data-testid={`cell-soft8-${i}`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-ds-borders">
                <CardHeader>
                  <CardTitle data-testid="text-card-borders-title">Border System (Medical Border)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2" data-testid="borders-spec">
                    <Token name="medical-border" value="2px solid @ 10%" />
                    <Token name="inner-glow" value="1px inset @ 8%" />
                  </div>

                  <div className="mt-8 grid gap-4" data-testid="borders-samples">
                    <div className="p-4 rounded-xl bg-white medical-border" data-testid="border-medical-only">
                      <span className="font-semibold">medical-border</span> — Borde principal (2px)
                    </div>
                    <div className="p-4 rounded-xl bg-white inner-glow-primary" data-testid="border-glow-only">
                      <span className="font-semibold">inner-glow-primary</span> — Outline interno fino (1px)
                    </div>
                    <div className="p-4 rounded-xl bg-white medical-border inner-glow-primary" data-testid="border-combined">
                      <span className="font-semibold">Combinado</span> — medical-border + inner-glow (Cards)
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-ds-surfaces">
                <CardHeader>
                  <CardTitle data-testid="text-card-surfaces-title">Surface & Contrast</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4" data-testid="surfaces-samples">
                    <div className="p-4 rounded-xl bg-white text-deep-navy border border-primary/30" data-testid="surface-white">
                      <span className="font-semibold">White surface</span> — Navy text on white
                    </div>
                    <div className="p-4 rounded-xl navy-surface" data-testid="surface-navy">
                      <span className="font-semibold">Navy surface</span> — White text on navy
                    </div>
                    <div className="p-4 rounded-xl teal-surface" data-testid="surface-teal">
                      <span className="font-semibold">Teal surface</span> — White text on teal
                    </div>
                    <div className="p-4 rounded-xl primary-surface" data-testid="surface-primary">
                      <span className="font-semibold">Primary surface</span> — White text on blue
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="lg:col-span-7" data-testid="section-ds-components">
            <Typography as="h2" variant="h2" data-testid="text-ds-components-title">
              Components
            </Typography>
            <Typography variant="body-md" className="mt-5 max-w-xl" data-testid="text-ds-components-body">
              Reference implementations styled with the no-grays rule.
            </Typography>

            <div className="mt-10 grid gap-6" data-testid="grid-ds-components">
              <Card data-testid="card-ds-buttons">
                <CardHeader>
                  <CardTitle data-testid="text-card-buttons-title">Buttons</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4" data-testid="stack-buttons">
                    <div className="flex flex-wrap items-center gap-4" data-testid="row-buttons-variants">
                      <Button onClick={() => toast({ title: "Primary", description: "Action confirmed." })} data-testid="button-primary">
                        Primary
                        <ArrowRight className="ml-1" weight="regular" size={20} />
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => toast({ title: "Secondary", description: "Healing action." })}
                        data-testid="button-secondary"
                      >
                        Secondary
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => toast({ title: "Outline", description: "Border-led action." })}
                        data-testid="button-outline"
                      >
                        Outline
                      </Button>
                      <Button
                        variant="ghost"
                        onClick={() => toast({ title: "Ghost", description: "Minimal action." })}
                        data-testid="button-ghost"
                      >
                        Ghost
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => toast({ title: "Link", description: "Text action." })}
                        data-testid="button-link"
                      >
                        Link
                      </Button>
                    </div>

                    <div className="flex flex-wrap items-center gap-4" data-testid="row-buttons-sizes">
                      <Button size="sm" data-testid="button-size-sm">
                        Small
                      </Button>
                      <Button size="default" data-testid="button-size-default">
                        Default
                      </Button>
                      <Button size="lg" data-testid="button-size-lg">
                        Large
                      </Button>
                      <Button size="icon" aria-label="Close" data-testid="button-icon">
                        <X weight="regular" size={20} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-ds-icons">
                <CardHeader>
                  <CardTitle data-testid="text-card-icons-title">Iconography (Phosphor Icons)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="body-md mb-6" data-testid="text-icons-description">
                    Usamos Phosphor Icons por su estética suave y redondeada. Disponible en 6 pesos: thin, light, regular, bold, fill, duotone.
                  </div>

                  <div className="grid gap-6" data-testid="icons-samples">
                    <div data-testid="icons-weights">
                      <div className="text-sm tracking-[0.14em] uppercase text-[hsl(var(--foreground)/0.70)] mb-4">Pesos disponibles</div>
                      <div className="flex flex-wrap items-center gap-6">
                        <div className="flex flex-col items-center gap-2">
                          <Heart weight="thin" size={28} className="text-primary" />
                          <span className="text-xs">thin</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <Heart weight="light" size={28} className="text-primary" />
                          <span className="text-xs">light</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <Heart weight="regular" size={28} className="text-primary" />
                          <span className="text-xs">regular</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <Heart weight="bold" size={28} className="text-primary" />
                          <span className="text-xs">bold</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <Heart weight="fill" size={28} className="text-primary" />
                          <span className="text-xs">fill</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <Heart weight="duotone" size={28} className="text-primary" />
                          <span className="text-xs">duotone</span>
                        </div>
                      </div>
                    </div>

                    <div className="hairline" />

                    <div data-testid="icons-common">
                      <div className="text-sm tracking-[0.14em] uppercase text-[hsl(var(--foreground)/0.70)] mb-4">Iconos comunes</div>
                      <div className="flex flex-wrap items-center gap-4">
                        {[
                          { Icon: Heart, name: "Heart" },
                          { Icon: House, name: "House" },
                          { Icon: Users, name: "Users" },
                          { Icon: Stethoscope, name: "Stethoscope" },
                          { Icon: Shield, name: "Shield" },
                          { Icon: Phone, name: "Phone" },
                          { Icon: Envelope, name: "Envelope" },
                          { Icon: MagnifyingGlass, name: "MagnifyingGlass" },
                          { Icon: ArrowRight, name: "ArrowRight" },
                          { Icon: CaretDown, name: "CaretDown" },
                          { Icon: List, name: "List" },
                          { Icon: Sparkle, name: "Sparkle" },
                          { Icon: CheckCircle, name: "CheckCircle" },
                          { Icon: Warning, name: "Warning" },
                          { Icon: Info, name: "Info" },
                          { Icon: X, name: "X" },
                        ].map(({ Icon, name }) => (
                          <div key={name} className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-primary/5 transition-colors">
                            <Icon weight="regular" size={24} className="text-deep-navy" />
                            <span className="text-xs text-[hsl(var(--foreground)/0.60)]">{name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card data-testid="card-ds-dialog">
                <CardHeader>
                  <CardTitle data-testid="text-card-dialog-title">Dialog</CardTitle>
                </CardHeader>
                <CardContent>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" data-testid="button-open-dialog">
                        Open dialog
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-3xl medical-border bg-white inner-glow-primary" data-testid="dialog-content">
                      <DialogHeader>
                        <DialogTitle data-testid="text-dialog-title">Care coordinator</DialogTitle>
                        <DialogDescription data-testid="text-dialog-description">
                          This dialog demonstrates Radix + our border/typography rules.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-6 grid gap-4" data-testid="dialog-body">
                        <div className="body-md" data-testid="text-dialog-body">
                          We keep surfaces pure white and use brand-color borders at controlled opacity.
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3" data-testid="dialog-actions">
                          <Button onClick={() => toast({ title: "Confirmed", description: "Dialog action done." })} data-testid="button-dialog-confirm">
                            Confirm
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => toast({ title: "Alternative", description: "Secondary path." })}
                            data-testid="button-dialog-secondary"
                          >
                            Secondary
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>

              <Card data-testid="card-ds-toasts">
                <CardHeader>
                  <CardTitle data-testid="text-card-toasts-title">Toasts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3" data-testid="stack-toasts">
                    <Button
                      onClick={() => toast({ title: "Success", description: "Everything saved." })}
                      data-testid="button-toast-success"
                    >
                      <CheckCircle className="mr-1" weight="regular" size={20} />
                      Success toast
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => toast({ title: "Info", description: "A helpful message." })}
                      data-testid="button-toast-info"
                    >
                      <Info className="mr-1" weight="regular" size={20} />
                      Info toast
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => toast({ title: "Warning", description: "Please review details." })}
                      data-testid="button-toast-warning"
                    >
                      <Warning className="mr-1" weight="regular" size={20} />
                      Warning toast
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>

        <div className="hairline mt-16" />

        <section className="mt-16" data-testid="section-ds-reusable">
          <Typography as="h2" variant="h2" data-testid="text-ds-reusable-title">
            Componentes Reutilizables
          </Typography>
          <Typography variant="body-md" className="mt-5 max-w-xl" data-testid="text-ds-reusable-body">
            Estos componentes deben usarse en TODAS las páginas. Nunca reinventar.
          </Typography>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="grid-ds-reusable">
            <Card data-testid="card-ds-eyebrow">
              <CardHeader>
                <CardTitle data-testid="text-card-eyebrow-title">Eyebrow (Etiqueta de sección)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="body-md mb-4" data-testid="text-eyebrow-description">
                  Usado encima de títulos de sección para dar contexto.
                </div>
                <div className="p-6 rounded-xl bg-white medical-border" data-testid="eyebrow-demo">
                  <Eyebrow>Nuestros Servicios</Eyebrow>
                  <Typography variant="h2" className="mt-3">Título de Sección</Typography>
                </div>
                <div className="mt-4 p-4 rounded-xl bg-primary/5 font-mono text-sm" data-testid="eyebrow-code">
                  {'<Eyebrow>Label</Eyebrow>'}
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-ds-section-header">
              <CardHeader>
                <CardTitle data-testid="text-card-section-header-title">SectionHeader (Cabecera de sección)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="body-md mb-4" data-testid="text-section-header-description">
                  Combina Eyebrow + Título + Subtítulo con animación automática.
                </div>
                <div className="p-6 rounded-xl bg-white medical-border" data-testid="section-header-demo">
                  <SectionHeader
                    eyebrow="Faithful Care"
                    title="Por Qué Elegirnos"
                    subtitle="Descripción breve de la sección."
                    align="left"
                    className="mb-0"
                  />
                </div>
                <div className="mt-4 p-4 rounded-xl bg-primary/5 font-mono text-xs overflow-x-auto" data-testid="section-header-code">
                  {'<SectionHeader eyebrow="Label" title="Título" subtitle="Desc" />'}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="hairline mt-16" />

        <section className="mt-16" data-testid="section-ds-responsive">
          <Typography as="h2" variant="h2" data-testid="text-ds-responsive-title">
            Responsive / Mobile-First
          </Typography>
          <Typography variant="body-md" className="mt-5 max-w-xl" data-testid="text-ds-responsive-body">
            Reglas de adaptación para móvil. Diseñamos mobile-first y mejoramos para desktop.
          </Typography>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6" data-testid="grid-ds-responsive">
            <Card data-testid="card-ds-breakpoints">
              <CardHeader>
                <CardTitle data-testid="text-card-breakpoints-title">Breakpoints</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2" data-testid="breakpoints-spec">
                  <Token name="Default" value="< 640px (Mobile)" />
                  <Token name="sm:" value="≥ 640px" />
                  <Token name="md:" value="≥ 768px (Tablet)" />
                  <Token name="lg:" value="≥ 1024px (Laptop)" />
                  <Token name="xl:" value="≥ 1280px (Desktop)" />
                  <Token name="2xl:" value="≥ 1536px" />
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-ds-mobile-patterns">
              <CardHeader>
                <CardTitle data-testid="text-card-mobile-patterns-title">Patrones Mobile-First</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4" data-testid="mobile-patterns">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Rows weight="regular" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Stacking</div>
                      <div className="text-sm text-[hsl(var(--foreground)/0.60)]">Grids colapsan a 1 columna</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <ArrowRight weight="regular" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Carrusel Horizontal</div>
                      <div className="text-sm text-[hsl(var(--foreground)/0.60)]">3+ cards → scroll horizontal</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <SquaresFour weight="regular" size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold">Full-Width Buttons</div>
                      <div className="text-sm text-[hsl(var(--foreground)/0.60)]">w-full sm:w-auto</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-ds-spacing-responsive">
              <CardHeader>
                <CardTitle data-testid="text-card-spacing-responsive-title">Spacing Responsive</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2" data-testid="spacing-responsive-spec">
                  <Token name="Section Gap" value="80px → 160px" />
                  <Token name="Container Px" value="24px → 64px" />
                  <Token name="Gap" value="gap-6 → gap-8 lg:gap-12" />
                  <Token name="Padding" value="py-12 → py-20 lg:py-32" />
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-ds-responsive-demo">
              <CardHeader>
                <CardTitle data-testid="text-card-responsive-demo-title">Demo: Grid Responsive</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="body-md mb-4">
                  Este grid cambia de 1 → 2 → 4 columnas según el viewport.
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3" data-testid="responsive-grid-demo">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="h-16 rounded-xl bg-primary/10 flex items-center justify-center font-semibold text-primary">
                      {n}
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <DeviceMobile weight="regular" size={20} className="text-[hsl(var(--foreground)/0.60)]" />
                    <span className="text-sm">1 col</span>
                  </div>
                  <span className="text-[hsl(var(--foreground)/0.30)]">→</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">md: 2 col</span>
                  </div>
                  <span className="text-[hsl(var(--foreground)/0.30)]">→</span>
                  <div className="flex items-center gap-2">
                    <Desktop weight="regular" size={20} className="text-[hsl(var(--foreground)/0.60)]" />
                    <span className="text-sm">lg: 4 col</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="hairline mt-16" />

        <section className="mt-16 mb-16" data-testid="section-ds-accessibility">
          <Typography as="h2" variant="h2" data-testid="text-ds-accessibility-title">
            Accesibilidad
          </Typography>
          <Typography variant="body-md" className="mt-5 max-w-xl" data-testid="text-ds-accessibility-body">
            Reglas obligatorias para personas mayores y usuarios con discapacidad.
          </Typography>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6" data-testid="grid-ds-accessibility">
            <Card data-testid="card-ds-touch">
              <CardHeader>
                <CardTitle data-testid="text-card-touch-title">Touch Targets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary mb-2">64px</div>
                <div className="body-md">Altura mínima de botones para dedos grandes.</div>
                <div className="mt-4">
                  <Button size="lg" className="w-full">Botón Accesible</Button>
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-ds-contrast">
              <CardHeader>
                <CardTitle data-testid="text-card-contrast-title">Contraste</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary mb-2">4.5:1</div>
                <div className="body-md">Ratio mínimo texto/fondo para legibilidad.</div>
                <div className="mt-4 p-3 rounded-xl navy-surface text-center">
                  Texto blanco sobre navy
                </div>
              </CardContent>
            </Card>

            <Card data-testid="card-ds-font-min">
              <CardHeader>
                <CardTitle data-testid="text-card-font-min-title">Fuente Mínima</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-primary mb-2">18px</div>
                <div className="body-md">Tamaño mínimo de texto para legibilidad senior.</div>
                <div className="mt-4 text-lg">
                  Este texto tiene 18px mínimo.
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
