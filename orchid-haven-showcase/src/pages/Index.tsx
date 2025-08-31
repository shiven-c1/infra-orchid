import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import PropertiesSection from "@/components/PropertiesSection";
import ContactSection from "@/components/ContactSection";
import PastProjects from "@/components/PastProjects";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  const handleCall = () => {
  window.open("tel:+919822200770", "_self");
    toast({
      title: "Calling...",
      description: "Redirecting to phone app",
    });
  };

  const handleWhatsApp = (propertyTitle?: string) => {
    const raw = propertyTitle
      ? `Hi, I am interested in ${propertyTitle} property. Please share details and next steps.`
      : "Hi! I'm interested in your premium properties. Please provide more details.";
    const message = encodeURIComponent(raw);
    window.open(`https://wa.me/918830892682?text=${message}`, "_blank");
    toast({
      title: "WhatsApp",
      description: "Opening WhatsApp chat",
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation onCall={handleCall} onWhatsApp={handleWhatsApp} />
      <div id="home">
        <Hero onCall={handleCall} onWhatsApp={handleWhatsApp} />
      </div>
      <div id="properties">
        <PropertiesSection onCall={handleCall} onWhatsApp={handleWhatsApp} />
      </div>
      <PastProjects />
      <div id="contact">
        <ContactSection onCall={handleCall} onWhatsApp={handleWhatsApp} />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
