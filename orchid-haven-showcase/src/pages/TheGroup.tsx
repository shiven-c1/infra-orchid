import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Phone, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "@/config/api";

interface ExecutiveTeam {
  id: number;
  name: string;
  position: string;
  image: string | null;
  bio: string;
}

const TheGroup = () => {
  const { toast } = useToast();
  const [executiveTeam, setExecutiveTeam] = useState<ExecutiveTeam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExecutiveTeam();
  }, []);

  const fetchExecutiveTeam = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.EXECUTIVE_TEAM);
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setExecutiveTeam(result.data);
        } else {
          console.error('Invalid data format received');
          setExecutiveTeam([]);
        }
      } else {
        console.error('Failed to fetch executive team');
        setExecutiveTeam([]);
      }
    } catch (error) {
      console.error('Failed to fetch executive team:', error);
      setExecutiveTeam([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCall = () => {
    window.open("tel:+919822200770", "_self");
    toast({ title: "Calling...", description: "Redirecting to phone app" });
  };

  const handleWhatsApp = () => {
    const raw =
      "Hi! I'm interested in Landmarks Orchid Infra. Please share project details.";
    const message = encodeURIComponent(raw);
    window.open(`https://wa.me/918830892682?text=${message}`, "_blank");
    toast({ title: "WhatsApp", description: "Opening WhatsApp chat" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation onCall={handleCall} onWhatsApp={handleWhatsApp} />

      <section className="bg-gradient-to-b from-black to-zinc-900 text-white py-16 md:py-24 border-b border-border">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Landmarks <span className="text-[#ffbe0b]">Orchid Infra</span>
          </h1>
          <p className="mt-4 text-lg md:text-2xl text-gray-200 font-semibold">
            Building Trust, Creating Landmarks
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button
              onClick={handleCall}
              variant="outline"
              className="border-luxury text-luxury hover:bg-luxury hover:text-luxury-foreground"
            >
              <Phone className="w-4 h-4 mr-2" /> Call
            </Button>
            <Button
              onClick={handleWhatsApp}
              className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
            >
              <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <Card className="bg-card/90 backdrop-blur border-border shadow-lg">
            <CardContent className="p-6 md:p-10 space-y-6 text-lg md:text-xl leading-relaxed text-foreground">
              <p>
                With over 15 years of experience and more than 50 successfully
                completed projects, Landmarks Orchid Infra has established itself
                as one of Nagpur’s most trusted and progressive real estate
                companies. The company has consistently delivered premium
                residential and commercial spaces, thoughtfully designed to meet
                modern lifestyles and diverse budgets.
              </p>
              <p>
                Under the visionary leadership of <span className="text-foreground font-bold">Vinod Nalamwar</span>,
                Landmarks Orchid Infra continues to set new benchmarks in
                quality, transparency, and innovation. Every project is a
                testament to the company’s commitment to excellence and timely
                delivery, ensuring that clients not only find a property but also
                a space to truly call their own.
              </p>
              <p>
                Renowned for trust, reliability, and customer satisfaction,
                Landmarks Orchid Infra has built lasting relationships with
                homeowners, investors, and partners alike.
              </p>
              <p>
                Whether you are a first-time homebuyer, a growing family, or an
                investor, Landmarks Orchid Infra offers the expertise, proven
                experience, and personalized solutions to help you achieve your
                real estate aspirations.
              </p>

              <div className="mt-6 p-4 md:p-6 rounded-lg border border-border bg-muted/30">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <p className="text-foreground font-bold">
                      Connect with us today
                    </p>
                    <p className="text-base text-muted-foreground">
                      Explore projects that bring your dreams to life and secure a brighter future.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={handleCall}
                      variant="outline"
                      className="border-luxury text-luxury hover:bg-luxury hover:text-luxury-foreground"
                    >
                      <Phone className="w-4 h-4 mr-2" /> Call Now
                    </Button>
                    <Button
                      onClick={handleWhatsApp}
                      className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-8 md:py-14 bg-muted/20 border-t border-border">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-extrabold text-center text-foreground">
            Executive Team
          </h2>
          <p className="text-center text-muted-foreground mt-2 mb-8 text-lg">
            The leadership behind Landmarks Orchid Infra
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              <p>Loading executive team...</p>
            ) : executiveTeam.length === 0 ? (
              <p>No executive team members found.</p>
            ) : (
              executiveTeam.map((member) => (
                <Card key={member.id} className="bg-card/80 border-border overflow-hidden">
                  <div className="aspect-[4/3] bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          console.error('Image failed to load:', member.image);
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const nextSibling = target.nextSibling as HTMLElement;
                          if (nextSibling) {
                            nextSibling.style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    <div className="aspect-[4/3] bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center" style={{display: member.image ? 'none' : 'flex'}}>
                      <span className="text-6xl">👷‍♂️</span>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                    <p className="text-base text-muted-foreground">{member.position}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-10 md:py-16 border-t border-border bg-background">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-center text-foreground">
            Find Us
          </h2>
          <p className="text-center text-muted-foreground mt-2 mb-6">
            Landmark's Orchid Infra location on Google Maps
          </p>
          <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4084.482466999611!2d79.0324746!3d21.148643300000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c1551b527a1b%3A0x89f9b6c871fd4308!2sLandmark%3B&#39;s%20orchid%20infra!5e1!3m2!1sen!2sin!4v1756122872978!5m2!1sen!2sin"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TheGroup;



