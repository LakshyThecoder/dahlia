import { Toaster } from "sonner";
import Navbar from "@/components/Navbar";
import AiChef from "@/components/AiChef";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import RatingsBand from "@/components/RatingsBand";
import PizzaShowcase from "@/components/PizzaShowcase";
import BarSection from "@/components/BarSection";
import EventsSection from "@/components/EventsSection";
import HostEvent from "@/components/HostEvent";
import SmallStory from "@/components/SmallStory";
import KitchenStatus from "@/components/KitchenStatus";
import SelfService from "@/components/SelfService";
import TableFeedback from "@/components/TableFeedback";
import StudentWelcome from "@/components/StudentWelcome";
import LoyaltyEngine from "@/components/LoyaltyEngine";
import SocialProof from "@/components/SocialProof";
import ReservationSection from "@/components/ReservationSection";
import Footer from "@/components/Footer";

export default function Oven() {
  return (
    <div className="bg-dahlia-bg text-dahlia-text font-body grain" data-testid="oven-page">
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip variant="solid" />
        <RatingsBand />
        <PizzaShowcase />
        <BarSection />
        <MarqueeStrip variant="outline" />
        <EventsSection />
        <HostEvent variant="dark" />
        <SmallStory />
        <KitchenStatus />
        <SelfService />
        <StudentWelcome />
        <LoyaltyEngine />
        <SocialProof />
        <ReservationSection />
      </main>
      <Footer />
      <TableFeedback />
      <AiChef />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#1A1918",
            border: "1px solid #2E2C2A",
            color: "#F4F0EA",
            fontFamily: "Outfit, sans-serif",
          },
        }}
      />
    </div>
  );
}
