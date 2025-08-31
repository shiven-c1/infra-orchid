import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import OrchidCarousel from "./OrchidCarousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, MapPin, Bed, Bath, Square, Download } from "lucide-react";

interface PropertyCardProps {
  image: string;
  images?: string[];
  title: string;
  location: string;
  price: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  type: string;
  customInfo?: string[];
  amenities?: string[];
  profileImage?: string;
  onCall: () => void;
  onWhatsApp: (propertyTitle?: string) => void;
  onViewDetails: () => void;
}

const PropertyCard = ({
  image,
  images,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  type,
  customInfo,
  amenities,
  profileImage,
  onCall,
  onWhatsApp,
  onViewDetails,
}: PropertyCardProps) => {
  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-luxury transition-all duration-500 transform hover:-translate-y-2 overflow-hidden group">
      <div className="relative overflow-hidden h-48">
        {images && images.length > 0 ? (
          <div className="w-full h-48">
            <OrchidCarousel images={images} className="w-full h-48" interval={3500} fit="contain" alt={title} />
          </div>
        ) : (
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <Badge className="absolute top-4 left-4 bg-luxury text-luxury-foreground">
          {type}
        </Badge>
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
            <div className="flex items-center text-muted-foreground mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{location}</span>
            </div>
          </div>
          
          {/* Custom display for Property 1 (Orchid Infinity) */}
          {customInfo && customInfo.length > 0 ? (
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              {customInfo.map((info, idx) => (
                <div key={idx} className="flex items-center">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Property Profile" 
                      className="w-6 h-6 rounded-full mr-2 object-cover"
                    />
                  ) : (
                    <span>{info}</span>
                  )}
                </div>
              ))}
            </div>
          ) : title === "ORCHID INFINITY" ? (
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <div className="flex items-center">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Property Profile" 
                    className="w-6 h-6 rounded-full mr-2 object-cover"
                  />
                ) : (
                  <Bed className="w-4 h-4 mr-1" />
                )}
                <span>3/4 BHK</span>
              </div>
              <div className="flex items-center">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Property Profile" 
                    className="w-6 h-6 rounded-full mr-2 object-cover"
                  />
                ) : (
                  <Square className="w-4 h-4 mr-1" />
                )}
                <span>1778/3660 sq. ft.</span>
              </div>
            </div>
          ) : title === "ORCHID GOKUL" ? (
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <div className="flex items-center">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Property Profile" 
                    className="w-6 h-6 rounded-full mr-2 object-cover"
                  />
                ) : (
                  <Bed className="w-4 h-4 mr-1" />
                )}
                <span>3 and 4 BHK</span>
              </div>
              <div className="flex items-center">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Property Profile" 
                    className="w-6 h-6 rounded-full mr-2 object-cover"
                  />
                ) : (
                  <Square className="w-4 h-4 mr-1" />
                )}
                <span>1750 - 2550 sq. ft.</span>
              </div>
            </div>
          ) : title === "ORCHID IMPERIA" ? (
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <div className="flex items-center">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Property Profile" 
                    className="w-6 h-6 rounded-full mr-2 object-cover"
                  />
                ) : (
                  <Bed className="w-4 h-4 mr-1" />
                )}
                <span>3 BHK</span>
              </div>
              <div className="flex items-center">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Property Profile" 
                    className="w-6 h-6 rounded-full mr-2 object-cover"
                  />
                ) : (
                  <Square className="w-4 h-4 mr-1" />
                )}
                <span>1725 sq. ft.</span>
              </div>
            </div>
          ) : title === "ORCHID POORVA" ? (
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <div className="flex items-center">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Property Profile" 
                    className="w-6 h-6 rounded-full mr-2 object-cover"
                  />
                ) : (
                  <Bed className="w-4 h-4 mr-1" />
                )}
                <span>4 BHK</span>
              </div>
              <div className="flex items-center">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Property Profile" 
                    className="w-6 h-6 rounded-full mr-2 object-cover"
                  />
                ) : (
                  <Square className="w-4 h-4 mr-1" />
                )}
                <span>2550 sq. ft.</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              {customInfo && customInfo.length > 0 ? (
                <div className="flex flex-col gap-1">
                  {customInfo.map((info, idx) => (
                    <div key={idx} className="flex items-center">
                      {profileImage ? (
                        <img 
                          src={profileImage} 
                          alt="Property Profile" 
                          className="w-6 h-6 rounded-full mr-2 object-cover"
                        />
                      ) : (
                        <span>{info}</span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center">
                  {profileImage ? (
                    <img 
                      src={profileImage} 
                      alt="Property Profile" 
                      className="w-6 h-6 rounded-full mr-2 object-cover"
                    />
                  ) : (
                    <span>Property Details</span>
                  )}
                </div>
              )}
            </div>
          )}
          

          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-4">
              {customInfo && price.includes("Onwards") ? (
                <span className="text-2xl font-bold text-luxury">
                  {price.replace(/ Onwards.*/, "")} <span className="text-[#ffbe0b]">Onwards</span>
                </span>
              ) : title === "ORCHID INFINITY" ? (
                <span className="text-2xl font-bold text-luxury">
                  ₹195.58 Lakhs <span className="text-[#ffbe0b]">Onwards</span>
                </span>
              ) : (title === "ORCHID GOKUL" || title === "ORCHID IMPERIA" || title === "ORCHID POORVA") && price.includes("Onwards") ? (
                <span className="text-2xl font-bold text-luxury">
                  {price.replace(/ Onwards.*/, "")} <span className="text-[#ffbe0b]">Onwards</span>
                </span>
              ) : (
                <span className="text-2xl font-bold text-luxury">{price}</span>
              )}
            </div>
            
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full border-luxury text-luxury hover:bg-luxury hover:text-luxury-foreground"
                onClick={onViewDetails}
              >
                View Details
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="contact"
                  size="sm"
                  className="flex-1"
                  onClick={onCall}
                >
                  <Phone className="w-4 h-4" />
                  Call
                </Button>
                <Button
                  variant="whatsapp"
                  size="sm"
                  className="flex-1"
                  onClick={() => onWhatsApp(title)}
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
              </div>
              {/* Brochure link for certain properties */}
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
                const link = brochureLinks[title];
                if (!link) return null;
                return (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center justify-center gap-2 w-full px-3 py-2 border border-luxury text-luxury rounded-md hover:bg-luxury hover:text-luxury-foreground transition"
                  >
                    <Download className="w-4 h-4" />
                    <span className="font-semibold">Download Brochure</span>
                  </a>
                );
              })()}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;