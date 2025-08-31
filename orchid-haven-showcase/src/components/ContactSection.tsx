import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, MessageCircle, Mail, MapPin, Clock, Award } from "lucide-react";
import { externalProjects } from "@/data/externalProjects";
import { useEffect, useState } from "react";

interface ContactSectionProps {
  onCall: () => void;
  onWhatsApp: (propertyTitle?: string) => void;
}

const ContactSection = ({ onCall, onWhatsApp }: ContactSectionProps) => {
  // Quotation form state
  const [qName, setQName] = useState("");
  const [qEmail, setQEmail] = useState("");
  const [qPhone, setQPhone] = useState("");
  const [qBudget, setQBudget] = useState("");
  const [sending, setSending] = useState(false);

  const sendQuotation = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    // Basic validation
    if (!qName.trim() || !qEmail.trim() || !qPhone.trim() || !qBudget.trim()) {
      // could show inline error; for simplicity, focus first empty field
      return;
    }
    setSending(true);
  const businessNumber = "918830892682"; // WhatsApp number in international format without +
    const message = `Hello Landmark's Orchid Infra,%0A%0AI would like to request a quotation for properties.%0A%0AName: ${qName}%0AEmail: ${qEmail}%0APhone: ${qPhone}%0ABudget: ${qBudget}%0A%0AKindly share suitable options and next steps. Thank you.`;
    const url = `https://wa.me/${businessNumber}?text=${message}`;
    // Open WhatsApp in a new tab/window
    window.open(url, "_blank");
    setSending(false);
  };
  return (
  <section className="py-12 md:py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
  {/* Intro removed per request */}

  {/* Quotation Form - centered below intro */}
  <div className="max-w-3xl mx-auto mb-0">
          <Card className="border border-border shadow-lg bg-card/90">
            <CardContent className="p-8">
              <h4 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#2e1065] via-[#3b0764] to-[#4c1d95] bg-clip-text text-transparent text-center">Request a Professional Quotation</h4>
              <p className="text-sm text-muted-foreground mb-6">Fill the details below and send a pre-filled message to our WhatsApp. Our sales executive will get back to you shortly.</p>
              <form onSubmit={(e) => sendQuotation(e)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-1">
                  <label className="text-sm font-medium text-foreground block mb-2">Full Name</label>
                  <input value={qName} onChange={(e) => setQName(e.target.value)} className="w-full border border-border rounded-lg px-4 py-3 bg-background focus:ring-2 focus:ring-[#4c1d95] focus:border-transparent" placeholder="Your full name" required />
                </div>

                <div className="md:col-span-1">
                  <label className="text-sm font-medium text-foreground block mb-2">Email</label>
                  <input value={qEmail} onChange={(e) => setQEmail(e.target.value)} type="email" className="w-full border border-border rounded-lg px-4 py-3 bg-background focus:ring-2 focus:ring-[#4c1d95] focus:border-transparent" placeholder="you@example.com" required />
                </div>

                <div className="md:col-span-1">
                  <label className="text-sm font-medium text-foreground block mb-2">Phone</label>
                  <input value={qPhone} onChange={(e) => setQPhone(e.target.value)} className="w-full border border-border rounded-lg px-4 py-3 bg-background focus:ring-2 focus:ring-[#4c1d95] focus:border-transparent" placeholder="Mobile number with area code" required />
                </div>

                <div className="md:col-span-1">
                  <label className="text-sm font-medium text-foreground block mb-2">Budget</label>
                  <input value={qBudget} onChange={(e) => setQBudget(e.target.value)} className="w-full border border-border rounded-lg px-4 py-3 bg-background focus:ring-2 focus:ring-[#4c1d95] focus:border-transparent" placeholder="e.g. ₹80 - ₹120 Lakhs" required />
                </div>

                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  <Button type="submit" size="lg" className="w-full bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/95 flex items-center justify-center gap-2 py-4 btn-raise text-base font-semibold" disabled={sending}>
                    <MessageCircle className="w-5 h-5" />
                    {sending ? "Opening WhatsApp..." : "Send Quotation via WhatsApp"}
                  </Button>
                  <Button type="button" variant="outline" size="lg" className="w-full border-border" onClick={() => { setQName(""); setQEmail(""); setQPhone(""); setQBudget(""); }}>
                    Clear
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
                 {/* Map directly below Professional Quotation form */}
   <div className="max-w-3xl mx-auto mb-0 mt-12">
                       <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 text-center bg-gradient-to-r from-[#2e1065] via-[#3b0764] to-[#4c1d95] bg-clip-text text-transparent">Find Us</h3>
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

        {/* Projects Slideshow moved to home page below properties */}

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-12 items-center">
          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="bg-gradient-card shadow-card hover:shadow-luxury transition-all duration-300">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <Award className="w-8 h-8 text-luxury mr-3" />
                  <h3 className="text-2xl font-bold text-foreground">Landmark's Orchid Infra</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="w-5 h-5 mr-3 text-luxury" />
                    <span>Nagpur, Maharashtra, India</span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="w-5 h-5 mr-3 text-luxury" />
                    <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground">
                    <Mail className="w-5 h-5 mr-3 text-luxury" />
                    <span>landmarkproperties.nagpur@yahoo.com</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-primary text-primary-foreground shadow-card hover:shadow-[0_20px_50px_-10px_hsl(45_90%_50%/0.4)] transition-all duration-500 transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <Award className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">15+</div>
                  <div className="text-sm opacity-90">Years Experience</div>
                </CardContent>
              </Card>
              
              <Card className="bg-luxury text-luxury-foreground shadow-card hover:shadow-[0_20px_50px_-10px_hsl(45_90%_50%/0.4)] transition-all duration-500 transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm opacity-90">Properties Sold</div>
                </CardContent>
              </Card>
              
              <Card className="bg-accent text-accent-foreground shadow-card hover:shadow-[0_20px_50px_-10px_hsl(45_90%_50%/0.4)] transition-all duration-500 transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <Phone className="w-8 h-8 mx-auto mb-2" />
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm opacity-90">Support Available</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-8">
            <Card className="bg-gradient-luxury shadow-luxury hover:shadow-[0_20px_50px_-10px_hsl(45_90%_50%/0.4)] transition-all duration-500 transform hover:scale-105">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold text-luxury-foreground mb-4">
                  Book Your Site Visit Today
                </h3>
                <p className="text-luxury-foreground/80 mb-6">
                  Schedule a personalized tour of our premium properties with our expert consultants.
                </p>
                
                <div className="space-y-4">
                  <Button
                    variant="contact"
                    size="lg"
                    className="w-full text-lg py-4 bg-white text-luxury hover:bg-gray-100"
                    onClick={onCall}
                  >
                    <Phone className="w-5 h-5" />
                    Call Now: +91 98222 00770
                  </Button>
                  
                  <Button
                    variant="cta"
                    size="lg"
                    className="w-full text-lg py-4 bg-primary text-primary-foreground hover:bg-primary/90"
                    onClick={() => onWhatsApp()}
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp: +91 88308 92682
                  </Button>
                </div>
              </CardContent>
            </Card>

            

            <div className="text-center text-muted-foreground">
              <p className="text-sm">
                ✨ Instant response guaranteed • Professional consultation • No hidden charges
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;