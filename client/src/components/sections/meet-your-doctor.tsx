import { AlternatingBlock } from "./alternating-block";

interface MeetYourDoctorProps {
  ctaHref?: string;
}

export function MeetYourDoctor({ ctaHref = "/about" }: MeetYourDoctorProps) {
  return (
    <AlternatingBlock
      subtitle="Meet your doctor"
      title="Medical care with the time to listen."
      description="I founded Faithful Care because I believe every patient deserves more than a rushed appointment and a prescription. When you walk through our door, you'll find a doctor who knows your name, understands your history, and takes the time to explain everything clearly. I bring hospital-grade clinical precision with the warmth of the family doctor you remember growing up with. Your health, and your peace of mind, are personal to me."
      ctaText="Meet Dr. Addys Reve"
      ctaHref={ctaHref}
      imageSrc="/images/dr-addys-reve.webp"
      imageAlt="Dr. Addys Reve, MD - Founder of Faithful Care Medical Services and physician providing primary and palliative care in Naples, Florida"
      variant="primary"
    />
  );
}
