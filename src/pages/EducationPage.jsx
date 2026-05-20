import Tactics from "../components/edukasi/Tactics";
import ModusDeepDive from "../components/edukasi/ModusDeepLive";
import SecurityAndCta from "../components/edukasi/SecurityAndCta";

const EducationPage = () => {
  return (
      <div className="py-6 px-14">
        <Tactics />
        <ModusDeepDive />
        <SecurityAndCta />
      </div>
  );
}

export default EducationPage