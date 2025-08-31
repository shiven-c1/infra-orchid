import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface NavigationProps {
  onCall: () => void;
  onWhatsApp: () => void;
}

const Navigation = ({ onCall, onWhatsApp }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
  <nav className="bg-gradient-to-r from-[#2e1065]/95 via-[#3b0764]/95 to-[#4c1d95]/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-extrabold text-white tracking-wide drop-shadow-sm">
              Landmark's <span className="text-[#ffbe0b]">Orchid Infra</span>
            </div>
            <div className="hidden md:block text-sm text-gray-300 font-semibold">
              15+ Years Experience
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/#home" className="text-white/95 font-medium hover:text-white relative transition-colors duration-200 after:content-[''] after:block after:h-0.5 after:bg-white/70 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left">Home</Link>
            <Link to="/#properties" className="text-white/95 font-medium hover:text-white relative transition-colors duration-200 after:content-[''] after:block after:h-0.5 after:bg-white/70 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left">Properties</Link>
            <Link to="/#contact" className="text-white/95 font-medium hover:text-white relative transition-colors duration-200 after:content-[''] after:block after:h-0.5 after:bg-white/70 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left">Contact</Link>
            <Link to="/the-group" className="text-white/95 font-medium hover:text-white relative transition-colors duration-200 after:content-[''] after:block after:h-0.5 after:bg-white/70 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left">The Group</Link>
            <Link to="/career" className="text-white/95 font-medium hover:text-white relative transition-colors duration-200 after:content-[''] after:block after:h-0.5 after:bg-white/70 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left">Career</Link>
            
            <div className="flex items-center space-x-2 ml-6">
              <Button
                variant="outline"
                size="sm"
                onClick={onCall}
                className="border-luxury text-luxury hover:bg-luxury hover:text-luxury-foreground"
              >
                <Phone className="w-4 h-4" />
                Call
              </Button>
              <Button
                size="sm"
                onClick={() => onWhatsApp()}
                className="bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-7 h-7 text-white" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link to="/#home" className="text-white/95 font-medium px-2 relative transition-colors duration-200 after:content-[''] after:block after:h-0.5 after:bg-white/70 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/#properties" className="text-white/95 font-medium px-2 relative transition-colors duration-200 after:content-[''] after:block after:h-0.5 after:bg-white/70 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left" onClick={() => setIsMenuOpen(false)}>Properties</Link>
              <Link to="/#contact" className="text-white/95 font-medium px-2 relative transition-colors duration-200 after:content-[''] after:block after:h-0.5 after:bg-white/70 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <Link to="/the-group" className="text-white/95 font-medium px-2 relative transition-colors duration-200 after:content-[''] after:block after:h-0.5 after:bg-white/70 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left" onClick={() => setIsMenuOpen(false)}>The Group</Link>
              <Link to="/career" className="text-white/95 font-medium px-2 relative transition-colors duration-200 after:content-[''] after:block after:h-0.5 after:bg-white/70 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-200 after:origin-left" onClick={() => setIsMenuOpen(false)}>Career</Link>
              <div className="flex space-x-2 px-2 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { setIsMenuOpen(false); onCall(); }}
                  className="flex-1 border-luxury text-luxury hover:bg-luxury hover:text-luxury-foreground"
                >
                  <Phone className="w-4 h-4" />
                  Call
                </Button>
                <Button
                  size="sm"
                  onClick={() => { setIsMenuOpen(false); onWhatsApp(); }}
                  className="flex-1 bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>      
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;