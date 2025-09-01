import PropertyCard from "./PropertyCard";
import PropertyDetails from "./PropertyDetails";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { API_ENDPOINTS } from "@/config/api";

interface PropertiesSectionProps {
  onCall: () => void;
  onWhatsApp: (propertyTitle?: string) => void;
  searchFilters?: { location: string; bhk: string };
}

const PropertiesSection = ({ onCall, onWhatsApp, searchFilters }: PropertiesSectionProps) => {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.PROPERTIES);
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data) {
          setProperties(result.data);
        } else {
          console.error("Invalid data format received");
          setProperties([]);
        }
      } else {
        console.error("Failed to fetch properties");
        setProperties([]);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  // Apply search filters and category filter
  const getFilteredProperties = () => {
    let filtered = properties;

    // Apply search filters from SearchBar
    if (searchFilters) {
      if (searchFilters.location) {
        filtered = filtered.filter(property => 
          property.location.toLowerCase().includes(searchFilters.location.toLowerCase())
        );
      }
      if (searchFilters.bhk) {
        filtered = filtered.filter(property => 
          property.filterCategory === searchFilters.bhk
        );
      }
    }

    // Apply BHK category filter
    if (activeFilter !== "All") {
      filtered = filtered.filter(property => property.filterCategory === activeFilter);
    }

    // Apply location filter
    if (locationFilter !== "All") {
      filtered = filtered.filter(property => {
        const location = property.location.toLowerCase();
        return location.includes(locationFilter.toLowerCase());
      });
    }

    return filtered;
  };

  const filteredProperties = getFilteredProperties() || [];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  const handleViewDetails = (property: typeof properties[0]) => {
    setSelectedProperty(property);
    setIsDetailsOpen(true);
  };

  const openWhatsAppForIndex = (index: number, propertyTitle?: string) => {
    const number = index <= 3 ? "918459018078" : "918830892682"; // +91 removed for wa.me format
    const raw = propertyTitle
      ? `Hi, I am interested in ${propertyTitle} property. Please share details and next steps.`
      : "Hi! I am interested in your premium properties. Please provide more details.";
    const message = encodeURIComponent(raw);
    window.open(`https://wa.me/${number}?text=${message}`, "_blank");
  };

  return (
    <section id="properties" className="pt-12 pb-20 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        {/* Search Results Summary */}
        {(searchFilters?.location || searchFilters?.bhk) && (
          <div className="text-center mb-8">
            <p className="text-lg text-gray-700">
              Showing {filteredProperties.length} properties
              {searchFilters?.location && ` in ${searchFilters.location}`}
              {searchFilters?.bhk && ` with ${searchFilters.bhk}`}
            </p>
            {filteredProperties.length === 0 && (
              <p className="text-red-600 mt-2">No properties found matching your criteria. Try adjusting your search filters.</p>
            )}
          </div>
        )}

        {/* Filter Dropdowns */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 px-4">
          {/* BHK Filter */}
          <div className="relative w-full sm:w-auto">
            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="appearance-none bg-white border-2 border-[#4c1d95] rounded-lg px-4 sm:px-6 py-3 text-base sm:text-lg font-semibold text-[#4c1d95] focus:outline-none focus:ring-2 focus:ring-[#4c1d95] focus:border-transparent cursor-pointer w-full sm:min-w-[250px] shadow-lg hover:shadow-xl transition-all duration-300 text-center sm:text-center"
              style={{ 
                textAlign: 'center',
                textAlignLast: 'center'
              } as React.CSSProperties}
            >
              <option value="All" style={{ textAlign: 'center' }}>Filter by BHK - All Properties</option>
              <option value="4BHK" style={{ textAlign: 'center' }}>Filter by BHK - 4BHK</option>
              <option value="3BHK" style={{ textAlign: 'center' }}>Filter by BHK - 3BHK</option>
              <option value="Ready Possession" style={{ textAlign: 'center' }}>Filter by BHK - Ready Possession</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#4c1d95]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Location Filter */}
          <div className="relative w-full sm:w-auto">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="appearance-none bg-white border-2 border-[#4c1d95] rounded-lg px-4 sm:px-6 py-3 text-base sm:text-lg font-semibold text-[#4c1d95] focus:outline-none focus:ring-2 focus:ring-[#4c1d95] focus:border-transparent cursor-pointer w-full sm:min-w-[250px] shadow-lg hover:shadow-xl transition-all duration-300 text-center sm:text-center"
              style={{ 
                textAlign: 'center',
                textAlignLast: 'center'
              } as React.CSSProperties}
            >
              <option value="All" style={{ textAlign: 'center' }}>All Locations</option>
              <option value="Shivaji Nagar" style={{ textAlign: 'center' }}>Shivaji Nagar</option>
              <option value="Dharampeth" style={{ textAlign: 'center' }}>Dharampeth</option>
              <option value="Laxmi Nagar" style={{ textAlign: 'center' }}>Laxmi Nagar</option>
              <option value="Hingna Naka" style={{ textAlign: 'center' }}>Hingna Naka</option>
              <option value="Manish Nagar" style={{ textAlign: 'center' }}>Manish Nagar</option>
              <option value="Abhayankar Nagar" style={{ textAlign: 'center' }}>Abhayankar Nagar</option>
              <option value="Tilak Nagar" style={{ textAlign: 'center' }}>Tilak Nagar</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#4c1d95]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* On Going Projects Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6">
            <span className="bg-gradient-to-r from-[#2e1065] via-[#3b0764] to-[#4c1d95] bg-clip-text text-transparent">On Going Projects</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property, index) => (
            <div key={property.id}>
              <PropertyCard
                {...property}
                onCall={onCall}
                onWhatsApp={() => openWhatsAppForIndex(index, property.title)}
                onViewDetails={() => handleViewDetails(property)}
              />
            </div>
          ))}
        </div>
      </div>

      <PropertyDetails
        property={selectedProperty}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onCall={onCall}
        onWhatsApp={onWhatsApp}
      />
    </section>
  );
};

export default PropertiesSection;
