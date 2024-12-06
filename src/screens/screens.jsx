import HeroSection from "../components/heroSection/heroSection";
import CityOverview from "../components/cityOverview/cityOverview";
import FeaturesShowcase from "../components/featuresShowcase/featuresShowcase";
import StatisticsPanel from "../components/statisticsPanel/statisticsPanel";
import FooterSection from "../components/footerSection/footerSection";
export default function Screens() {
  return (
    <div>
      <HeroSection />
      <CityOverview />
      <FeaturesShowcase />
      <StatisticsPanel />
      <FooterSection />
    </div>
  );
}
