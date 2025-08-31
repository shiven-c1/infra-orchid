import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import OrchidCarousel from "./OrchidCarousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, MapPin, Bed, Bath, Square, Car, Zap, Wifi, Shield } from "lucide-react";
import { Leaf, Camera, Sun, Flame, IdCard, Phone as DoorPhone, ArrowUpDown, Battery, CloudRain, Droplets, AlignJustify } from "lucide-react";
import { Download } from "lucide-react";

interface PropertyDetailsProps {
  property: {
    id: number;
    image: string;
    images?: string[];
    title: string;
    location: string;
    price: string;
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    customInfo?: string[];
    type: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onCall: () => void;
  onWhatsApp: (propertyTitle?: string) => void;
}

const PropertyDetails = ({ property, isOpen, onClose, onCall, onWhatsApp }: PropertyDetailsProps) => {
  if (!property) return null;

  // Custom amenities for ORCHID INFINITY
  // Amenities from screenshot for ORCHID INFINITY
  const orchidInfinityAmenities = [
    { icon: Leaf, label: "Terrace Garden" },
    { icon: Car, label: "EV Charging on Demand" }, // Car icon as alternative
    { icon: Camera, label: "CCTV Surveillance" },
    { icon: Sun, label: "Solar Power For Common Area" },
    { icon: Flame, label: "Fire fighting system" },
    { icon: IdCard, label: "Name plate on each flat" },
    { icon: DoorPhone, label: "Video Door Phone" },
    { icon: ArrowUpDown, label: "Automatic Elevators" },
    { icon: Battery, label: "Battery Backup for lift" },
    { icon: CloudRain, label: "Rain Water Harvesting" },
    { icon: AlignJustify, label: "Senior citizen's sit-outs on Terrace" }, // AlignJustify as alternative for bench
    { icon: Droplets, label: "24 hr. water supply" },
  ];
  // Explicit amenities for ORCHID IMPERIA (from provided image)
  const imperiaAmenities = [
    { icon: Leaf, label: "Terrace Garden" },
    { icon: Car, label: "EV Charging on Demand" },
    { icon: Camera, label: "CCTV Surveillance" },
    { icon: DoorPhone, label: "Video Door Phone" },
    { icon: IdCard, label: "Name plate on each flat" },
    { icon: ArrowUpDown, label: "Automatic Elevators" },
    { icon: Battery, label: "Battery Backup for lift" },
    { icon: CloudRain, label: "Rain Water Harvesting" },
    { icon: AlignJustify, label: "Senior citizen's sit-outs on Terrace" },
    { icon: Droplets, label: "24 hr. water supply" },
  ];
  // Amenities for ORCHID POORVA (user provided)
  const poorvaAmenities = [
    { icon: IdCard, label: "Prime location" },
    { icon: Sun, label: "Open kitchen" },
    { icon: Camera, label: "CCTV surveillance" },
    { icon: DoorPhone, label: "Video door phone" },
    { icon: Leaf, label: "Modular kitchen pop-up in all room" },
    { icon: Leaf, label: "Terrace Garden" },
    { icon: AlignJustify, label: "Everything is nearby - mall, hospital" },
    { icon: AlignJustify, label: "Senior citizen sit out area" },
  ];
  // Amenities for ORCHID SUNSHINE (user requested)
  const sunshineAmenities = [
    { icon: Camera, label: "CCTV Surveillance" },
    { icon: Car, label: "EV Charging on Demand" },
    { icon: Square, label: "POP in All Room" },
    { icon: IdCard, label: "Modular Kitchen" },
    { icon: Leaf, label: "Vastu compliant" },
    { icon: AlignJustify, label: "Everything is nearby - malls, hospital" },
  ];
  const defaultAmenities = [
    { icon: Car, label: "Parking" },
    { icon: Zap, label: "Power Backup" },
    { icon: Wifi, label: "Wi-Fi Ready" },
    { icon: Shield, label: "24/7 Security" },
  ];
  // Amenities for ORCHID SHIVNERI copied from provided screenshot
  const shivneriAmenities = [
    { icon: Leaf, label: "Terrace Garden" },
    { icon: AlignJustify, label: "Multipurpose Hall" },
    { icon: ArrowUpDown, label: "Walking Track" },
    { icon: Camera, label: "CCTV Surveillance" },
    { icon: IdCard, label: "Club House" },
    { icon: Zap, label: "GYM" },
    { icon: Car, label: "EV Charging on Demand" },
    { icon: Sun, label: "Solar Power For Common Area" },
    { icon: DoorPhone, label: "Video Door Phone" },
    { icon: Square, label: "POP in All Room" },
    { icon: Flame, label: "Fire fighting system" },
    { icon: AlignJustify, label: "Senior citizen's sit-outs on Terrace" },
    { icon: IdCard, label: "Modular Kitchen" },
    { icon: ArrowUpDown, label: "Automatic Elevators With Power Backup" },
    { icon: CloudRain, label: "Rain Water Harvesting" },
    { icon: Droplets, label: "24 hr. water supply" },
  ];

  // Amenities for ORCHID MADHUDATTA (from attachment)
  const madhudattaAmenities = [
    { icon: Leaf, label: "Terrace Garden" },
    { icon: Car, label: "EV Charging on Demand" },
    { icon: Camera, label: "CCTV Surveillance" },
    { icon: Flame, label: "fire fighting system" },
    { icon: IdCard, label: "Name plate on each flat" },
    { icon: DoorPhone, label: "Video Door Phone" },
    { icon: ArrowUpDown, label: "Automatic Elevators" },
    { icon: Battery, label: "Battery Backup for lift" },
    { icon: CloudRain, label: "Rain Water Harvesting" },
    { icon: AlignJustify, label: "Senior citizen's sit-outs on Terrace" },
    { icon: Droplets, label: "24 hr. water supply" },
  ];

  // Custom amenities for ORCHID Meadows (with icons)
  const orchidMeadowsAmenities = [
    { icon: Camera, label: "CCTV surveillance" },
    { icon: Car, label: "EV charging" },
    { icon: Square, label: "Pop up in all room" },
    { icon: IdCard, label: "Modular kitchen" },
    { icon: Leaf, label: "Vastu complaint" },
    { icon: AlignJustify, label: "Everything is nearby: malls, hospital, prime location" },
    { icon: Leaf, label: "Terrace garden" },
    { icon: DoorPhone, label: "Video door phone" },
    { icon: AlignJustify, label: "Senior citizen sit" },
  ];

  const amenities = property.title === "ORCHID Meadows"
    ? orchidMeadowsAmenities
    : property.title === "ORCHID IMPERIA"
    ? imperiaAmenities
    : property.title === "ORCHID GOKUL"
    ? orchidInfinityAmenities.filter(a => a.label !== "EV Charging on Demand")
    : property.title === "ORCHID POORVA"
    ? poorvaAmenities
    : property.title === "ORCHID SUNSHINE"
    ? sunshineAmenities
    : property.title === "ORCHID MADHUDATTA"
    ? madhudattaAmenities
    : property.title === "ORCHID INFINITY"
    ? orchidInfinityAmenities
    : property.title === "ORCHID SHIVNERI"
    ? shivneriAmenities
    : defaultAmenities;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            {property.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Property Image */}
          <div className="relative overflow-hidden rounded-lg h-64 md:h-80">
            {property.images && property.images.length > 0 ? (
              <OrchidCarousel images={property.images} className="w-full h-64 md:h-80" interval={3500} fit="contain" alt={property.title} />
            ) : (
              <img
                src={property.image}
                alt={property.title}
                className={`w-full h-64 md:h-80 ${(property.title === 'ORCHID INFINITY' || property.title === 'ORCHID GOKUL' || property.title === 'ORCHID IMPERIA' || property.title === 'ORCHID MADHUDATTA') ? 'object-contain bg-black' : 'object-cover'}`}
                style={(property.title === 'ORCHID INFINITY' || property.title === 'ORCHID GOKUL' || property.title === 'ORCHID IMPERIA' || property.title === 'ORCHID MADHUDATTA') ? { objectPosition: 'center', backgroundColor: '#000' } : {}}
              />
            )}
            <Badge className="absolute top-4 left-4 bg-luxury text-luxury-foreground">
              {property.type}
            </Badge>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left column: property details and map for ORCHID INFINITY */}
            <div className="space-y-4 flex flex-col">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Property Details</h3>
                <div className="flex items-center text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{property.location}</span>
                </div>
                <div className="text-3xl font-bold text-luxury">
                  {((property.title === 'ORCHID INFINITY' || property.title === 'ORCHID GOKUL' || property.title === 'ORCHID IMPERIA' || property.title === 'ORCHID MADHUDATTA') && property.price.includes('Onwards')) ? (
                    <>
                      {property.price.replace(/ Onwards.*/, '')} <span className="text-[#ffbe0b]">Onwards</span>
                    </>
                  ) : (
                    property.price
                  )}
                </div>
              </div>
              {/* If property.customInfo is present (e.g., ORCHID SHIVNERI), render it instead of Bedrooms/Bathrooms/Area */}
              {property.customInfo && property.customInfo.length > 0 ? (
                <div className="flex flex-col gap-2 p-4 bg-secondary rounded-lg">
                  <div className="flex flex-col gap-2">
                    {property.customInfo.map((info, idx) => (
                      <span key={idx} className="text-lg font-bold text-foreground">{info}</span>
                    ))}
                  </div>
                  {/* Price with colored 'Onwards' for ORCHID Meadows */}
                  {property.title === 'ORCHID Meadows' && property.price.includes('Onwards') && (
                    <div className="text-3xl font-bold text-luxury mt-2">
                      {property.price.replace(/ Onwards.*/, '')} <span className="text-[#ffbe0b]">Onwards</span>
                    </div>
                  )}
                </div>
              ) : property.title === "ORCHID INFINITY" ? (
                <div className="flex flex-col gap-2 p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-foreground">3/4 BHK</span>
                    <span className="text-lg font-bold text-foreground">1778/3660 sq. ft.</span>
                  </div>
                </div>
              ) : property.title === "ORCHID GOKUL" ? (
                <div className="flex flex-col gap-2 p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-foreground">3 and 4 BHK</span>
                    <span className="text-lg font-bold text-foreground">1750 - 2550 sq. ft.</span>
                  </div>
                </div>
              ) : property.title === "ORCHID IMPERIA" ? (
                <div className="flex flex-col gap-2 p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-foreground">3 BHK</span>
                    <span className="text-lg font-bold text-foreground">1725 sq. ft.</span>
                  </div>
                </div>
              ) : property.title === "ORCHID POORVA" ? (
                <div className="flex flex-col gap-2 p-4 bg-secondary rounded-lg">
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-foreground">4 BHK</span>
                    <span className="text-lg font-bold text-foreground">2550 sq. ft.</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="flex flex-col items-center p-3 bg-secondary rounded-lg">
                    <Bed className="w-5 h-5 mb-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Bedrooms</span>
                    <span className="font-semibold text-foreground">{property.bedrooms}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-secondary rounded-lg">
                    <Bath className="w-5 h-5 mb-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Bathrooms</span>
                    <span className="font-semibold text-foreground">{property.bathrooms}</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-secondary rounded-lg">
                    <Square className="w-5 h-5 mb-2 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Area</span>
                    <span className="font-semibold text-foreground">{property.area} sq ft</span>
                  </div>
                </div>
              )}
              {/* Map for ORCHID INFINITY below details in desktop */}
              {property.title === "ORCHID INFINITY" && (
                <div className="hidden md:block">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Location Map</h3>
                  <div className="w-full h-64 md:h-72 rounded-lg overflow-hidden border border-border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.353482943791!2d79.0543007!3d21.138326499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c06615dd1323%3A0x336821adb8def935!2s50%2C%20Hill%20Rd%2C%20Shivaji%20Nagar%2C%20Nagpur%2C%20Maharashtra%20440010!5e0!3m2!1sen!2sin!4v1755663654122!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Orchid Infinity Location"
                    ></iframe>
                  </div>
                </div>
              )}
              {property.title === "ORCHID GOKUL" && (
                <div className="hidden md:block">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Location Map</h3>
                  <div className="w-full h-64 md:h-72 rounded-lg overflow-hidden border border-border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.361378099841!2d79.0652338!3d21.138012099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c08a1cb3304b%3A0x3948e1ce10ff468a!2s328%2C%20Late%20Krishna%20Khonde%20Marg%2C%20Khare%20Town%2C%20Dharampeth%2C%20Nagpur%2C%20Maharashtra%20440010!5e0!3m2!1sen!2sin!4v1755673041546!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Orchid Gokul Location"
                    ></iframe>
                  </div>
                </div>
              )}
              {property.title === "ORCHID Meadows" && (
                <div className="hidden md:block">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Location Map</h3>
                  <div className="w-full h-64 md:h-72 rounded-lg overflow-hidden border border-border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.361378099841!2d79.0652338!3d21.138012099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c08a1cb3304b%3A0x3948e1ce10ff468a!2s328%2C%20Late%20Krishna%20Khonde%20Marg%2C%20Khare%20Town%2C%20Dharampeth%2C%20Nagpur%2C%20Maharashtra%20440010!5e0!3m2!1sen!2sin!4v1755673041546!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Orchid Meadows Location"
                    ></iframe>
                  </div>
                </div>
              )}
              {property.title === "ORCHID SUNSHINE" && (
                <div className="hidden md:block">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Location Map</h3>
                  <div className="w-full h-64 md:h-72 rounded-lg overflow-hidden border border-border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4085.952937226349!2d79.07430699999999!3d21.095257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDA1JzQyLjkiTiA3OcKwMDQnMjcuNSJF!5e1!3m2!1sen!2sin!4v1755782692634!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Orchid Sunshine Location"
                    ></iframe>
                  </div>
                </div>
              )}
              {property.title === "ORCHID SHIVNERI" && (
                <div className="hidden md:block">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Location Map</h3>
                  <div className="w-full h-64 md:h-72 rounded-lg overflow-hidden border border-border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d16342.34135625197!2d79.0504608!3d21.10861495!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e1!3m2!1sen!2sin!4v1755782906477!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Orchid Shivneri Location"
                    ></iframe>
                  </div>
                </div>
              )}
              {property.title === "ORCHID POORVA" && (
                <div className="hidden md:block">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Location Map</h3>
                  <div className="w-full h-64 md:h-72 rounded-lg overflow-hidden border border-border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!4v1755675964675!6m8!1m7!1swBpXoYEC1VAQRffSMzu5JQ!2m2!1d21.12331007855995!2d79.06595615381062!3f179.77!4f-6.219999999999999!5f0.4000000000000002"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Orchid Poorva Location"
                    ></iframe>
                  </div>
                </div>
              )}
              {property.title === "ORCHID IMPERIA" && (
                <div className="hidden md:block">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Location Map</h3>
                  <div className="w-full h-64 md:h-72 rounded-lg overflow-hidden border border-border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3721.8281436024927!2d79.05161947525913!3d21.119416680552607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDA3JzA5LjkiTiA3OcKwMDMnMTUuMSJF!5e0!3m2!1sen!2sin!4v1755675005342!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Orchid Imperia Location"
                    ></iframe>
                  </div>
                </div>
              )}
              {property.title === "ORCHID MADHUDATTA" && (
                <div className="hidden md:block">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Location Map</h3>
                  <div className="w-full h-64 md:h-72 rounded-lg overflow-hidden border border-border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4084.5719489277885!2d79.0568533752598!3d21.145398280533303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDA4JzQzLjQiTiA3OcKwMDMnMzMuOSJF!5e1!3m2!1sen!2sin!4v1755785547405!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Orchid Madhudatta Location"
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
            {/* Right column: amenities and description */}
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-secondary rounded-lg">
                      {amenity.icon && <amenity.icon className="w-4 h-4" style={{ color: '#ffbe0b' }} />}
                      <span className="text-sm font-bold" style={{ color: '#ffbe0b' }}>{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Description</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  At Orchid Infinity, every moment spent is as perfect as the dreams you dreamt.
                  The perfect combination of luxury and convenience for your loved ones to live
                  in forever.
                </p>
              </div>
              {/* Map for ORCHID INFINITY in mobile view (stacked) */}
              {property.title === "ORCHID INFINITY" && (
                <div className="block md:hidden mt-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Location Map</h3>
                  <div className="w-full h-64 rounded-lg overflow-hidden border border-border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.353482943791!2d79.0543007!3d21.138326499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c06615dd1323%3A0x336821adb8def935!2s50%2C%20Hill%20Rd%2C%20Shivaji%20Nagar%2C%20Nagpur%2C%20Maharashtra%20440010!5e0!3m2!1sen!2sin!4v1755663654122!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Orchid Infinity Location"
                    ></iframe>
                  </div>
                </div>
              )}
              {property.title === "ORCHID GOKUL" && (
                <div className="block md:hidden mt-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Location Map</h3>
                  <div className="w-full h-64 rounded-lg overflow-hidden border border-border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.361378099841!2d79.0652338!3d21.138012099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c08a1cb3304b%3A0x3948e1ce10ff468a!2s328%2C%20Late%20Krishna%20Khonde%20Marg%2C%20Khare%20Town%2C%20Dharampeth%2C%20Nagpur%2C%20Maharashtra%20440010!5e0!3m2!1sen!2sin!4v1755673041546!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Orchid Gokul Location"
                    ></iframe>
                  </div>
                </div>
              )}
              {property.title === "ORCHID MADHUDATTA" && (
                <div className="block md:hidden mt-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Location Map</h3>
                  <div className="w-full h-64 rounded-lg overflow-hidden border border-border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d4084.5719489277885!2d79.0568533752598!3d21.145398280533303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDA4JzQzLjQiTiA3OcKwMDMnMzMuOSJF!5e1!3m2!1sen!2sin!4v1755785547405!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Orchid Madhudatta Location"
                    ></iframe>
                  </div>
                </div>
              )}
              {property.title === "ORCHID Meadows" && (
                <div className="block md:hidden mt-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Location Map</h3>
                  <div className="w-full h-64 rounded-lg overflow-hidden border border-border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.361378099841!2d79.0652338!3d21.138012099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c08a1cb3304b%3A0x3948e1ce10ff468a!2s328%2C%20Late%20Krishna%20Khonde%20Marg%2C%20Khare%20Town%2C%20Dharampeth%2C%20Nagpur%2C%20Maharashtra%20440010!5e0!3m2!1sen!2sin!4v1755673041546!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Orchid Meadows Location"
                    ></iframe>
                  </div>
                </div>
              )}
              {property.title === "ORCHID POORVA" && (
                <div className="block md:hidden mt-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Location Map</h3>
                  <div className="w-full h-64 rounded-lg overflow-hidden border border-border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!4v1755675964675!6m8!1m7!1swBpXoYEC1VAQRffSMzu5JQ!2m2!1d21.12331007855995!2d79.06595615381062!3f179.77!4f-6.219999999999999!5f0.4000000000000002"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Orchid Poorva Location"
                    ></iframe>
                  </div>
                </div>
              )}
              {property.title === "ORCHID IMPERIA" && (
                <div className="block md:hidden mt-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Location Map</h3>
                  <div className="w-full h-64 rounded-lg overflow-hidden border border-border">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3721.8281436024927!2d79.05161947525913!3d21.119416680552607!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjHCsDA3JzA5LjkiTiA3OcKwMDMnMTUuMSJF!5e0!3m2!1sen!2sin!4v1755675005342!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Orchid Imperia Location"
                    ></iframe>
                  </div>
                </div>
              )}
              {property.title === "ORCHID IMPERIA" && (
                <div className="block md:hidden mt-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2">Location Map</h3>
                  <div className="w-full h-64 rounded-lg overflow-hidden border border-border">
                    {/* Placeholder embed used; replace src with the exact iframe URL if you have a different one */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.361378099841!2d79.0652338!3d21.138012099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c08a1cb3304b%3A0x3948e1ce10ff468a!2s328%2C%20Late%20Krishna%20Khonde%20Marg%2C%20Khare%20Town%2C%20Dharampeth%2C%20Nagpur%2C%20Maharashtra%20440010!5e0!3m2!1sen!2sin!4v1755673041546!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Orchid Imperia Location"
                    ></iframe>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            {/* Brochure link (if available) */}
            {(() => {
              const brochureLinks: Record<string, string> = {
                "ORCHID GOKUL": "https://drive.google.com/file/d/18UUPHQMze654jHAdnYBUpW-WMpW27hGe/view?usp=drive_link",
                "ORCHID INFINITY": "https://drive.google.com/file/d/1J2mHRnGZ_fROLL2gMFWkzZWO600Y5s4B/view?usp=drive_link",
                "ORCHID IMPERIA": "https://drive.google.com/file/d/1EmT8ocG3TLWK96KgDD0ZcYsWkq8Py_3M/view?usp=drive_link",
                "ORCHID POORVA": "https://drive.google.com/file/d/10fgrxRTAja1-K1yjBk0GIcZ7ygrCUsjZ/view?usp=drive_link",
                "ORCHID SHIVNERI": "https://drive.google.com/file/d/1ZVeAqAx0bkoINzrlcJ63vXMpFvUA5JW6/view?usp=drive_link",
                "ORCHID SUNSHINE": "https://drive.google.com/file/d/1oP4zafLTBX91muwk4dK58-s7dkob10OC/view?usp=drive_link",
                "ORCHID Meadows": "https://drive.google.com/file/d/1Duti8C8lPPLVPFWuR4DMJAHeJBlvqv39/view?usp=drive_link",
                "ORCHID MADHUDATTA": "https://drive.google.com/file/d/1h3puJcBYr7E8g6OhL2MZAl2dnUvPMo5Q/view?usp=drive_link",
              };
              const link = brochureLinks[property.title];
              if (!link) return null;
              return (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 border border-luxury text-luxury rounded-md hover:bg-luxury hover:text-luxury-foreground transition"
                >
                  <Download className="w-4 h-4" />
                  <span className="font-semibold">Download Brochure</span>
                </a>
              );
            })()}
            <Button
              variant="outline" 
              className="flex-1 border-luxury text-luxury hover:bg-luxury hover:text-luxury-foreground"
              onClick={onCall}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
              <Button
                className="flex-1 bg-whatsapp text-whatsapp-foreground hover:bg-whatsapp/90"
                onClick={() => onWhatsApp(property.title)}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDetails;