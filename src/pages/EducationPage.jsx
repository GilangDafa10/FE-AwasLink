import Tactics from "../components/edukasi/Tactics";
import ModusDeepDive from "../components/edukasi/ModusDeepLive";
import SecurityAndCta from "../components/edukasi/SecurityAndCta";

const EducationPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 space-y-8">
      <Tactics />
      <ModusDeepDive />
      <SecurityAndCta />
    </div>
  );
};

export default EducationPage;