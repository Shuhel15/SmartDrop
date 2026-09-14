import About from "@/components/About";
import CTA from "@/components/CTA";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import UseCase from "@/components/UseCase";
import WhySmartDrop from "@/components/WhySmartDrop";

export default async function Home() {
  return (
<>
<Hero/>
<About/>
<HowItWorks/>
<Features/>
<WhySmartDrop/>
<UseCase/>
<CTA/>
</>
  );
}
