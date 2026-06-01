import HeroSection from "@/components/home/HeroSection";
import WorkflowSection from "@/components/home/WorkflowSection";
import CtaSection from "@/components/home/CtaSection";

const Home = () => {
  return (
    <div className="bg-slate-100">
      <HeroSection />
      <WorkflowSection />
      <CtaSection />
    </div>
  );
};

export default Home;
