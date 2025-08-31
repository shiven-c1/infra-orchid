const Footer = () => {
  return (
    <footer className="mt-12 border-t border-border bg-gradient-to-r from-[#2e1065]/95 via-[#3b0764]/95 to-[#4c1d95]/95 text-white">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="text-2xl font-extrabold tracking-wide">Landmark's <span className="text-[#ffbe0b]">Orchid Infra</span></div>
          <p className="text-sm text-white/80 mt-3 leading-relaxed">
            Building trust with premium residential and commercial spaces across Nagpur.
          </p>
        </div>
        <div>
          <h4 className="font-bold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-white/90">
            <li><a href="/#home" className="hover:underline">Home</a></li>
            <li><a href="/#properties" className="hover:underline">On Going Projects</a></li>
            <li><a href="/the-group" className="hover:underline">The Group</a></li>
            <li><a href="/career" className="hover:underline">Career</a></li>
            <li><a href="/#contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-white/90">
            <li>Nagpur, Maharashtra, India</li>
            <li>Mon - Sat: 9:00 AM - 7:00 PM</li>
            <li>landmarkproperties.nagpur@yahoo.com</li>
            <li>Call: +91 98222 00770</li>
            <li>WhatsApp: +91 88308 92682</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Follow Us</h4>
          <div className="flex gap-3 text-sm text-white/90">
            <a href="#" className="hover:underline">Instagram</a>
            <a href="#" className="hover:underline">LinkedIn</a>
            <a href="#" className="hover:underline">Facebook</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-white/70 flex items-center justify-between">
          <span>© {new Date().getFullYear()} Landmark's Orchid Infra. All rights reserved.</span>
          <span>Made with care in Nagpur.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


