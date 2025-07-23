import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Mail, Phone, MapPin, Globe, Navigation, User } from 'lucide-react';
import L from 'leaflet';
import React, { useEffect, useRef } from 'react';
import type { Company } from '@/types';
import { Button } from './ui/button';

interface JobMapProps {
  companies: Company[];
  selectedCompanyId: string | null;
  onCompanySelect: (companyId: string | null) => void;
}

const MapController: React.FC<{ selectedCompany: Company | null }> = ({ selectedCompany }) => {
  const map = useMap();

  useEffect(() => {
    if (selectedCompany) {
      map.setView([selectedCompany.latitude, selectedCompany.longitude], 10, {
        animate: true,
        duration: 1
      });
    }
  }, [selectedCompany, map]);

  return null;
};

const createCustomIcon = (industry: string, companyName: string, isSelected: boolean = false) => {
  const configs = {
    'Hospitality': { color: '#F43F5E', bgColor: '#FDF2F8' },
    'Retail & Tourism': { color: '#3B82F6', bgColor: '#EFF6FF' },
    'Agriculture': { color: '#10B981', bgColor: '#ECFDF5' },
    'Mining': { color: '#F59E0B', bgColor: '#FFFBEB' },
    'Technology': { color: '#8B5CF6', bgColor: '#F5F3FF' },
    'Construction': { color: '#EF4444', bgColor: '#FEF2F2' },
  };
  
  const config = configs[industry as keyof typeof configs] || { 
    color: '#6B7280', 
    bgColor: '#F9FAFB'
  };
  
  const initial = companyName.charAt(0).toUpperCase();
  const size = isSelected ? 48 : 40;
  const strokeWidth = isSelected ? 4 : 3;
  
  const svgString = `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="rgba(15,23,42,0.12)"/>
      </filter>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${config.color};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${config.color};stop-opacity:0.85" />
      </linearGradient>
      ${isSelected ? `
        <animate attributeName="opacity" values="1;0.7;1" dur="1.5s" repeatCount="indefinite"/>
      ` : ''}
    </defs>
    
    <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 4}" fill="url(#grad)" stroke="#FFFFFF" stroke-width="${strokeWidth}" filter="url(#shadow)"/>
    <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 8}" fill="#FFFFFF" opacity="0.95"/>
    <text x="${size/2}" y="${size/2 + 4}" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="${size === 48 ? 14 : 12}" font-weight="700" fill="${config.color}">${initial}</text>
    
    <circle cx="${size - 12}" cy="12" r="6" fill="${config.color}" stroke="#FFFFFF" stroke-width="2"/>
    <circle cx="${size - 12}" cy="12" r="3" fill="#FFFFFF"/>
  </svg>`;
  
  return new L.Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(svgString)}`,
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
    popupAnchor: [0, -size/2],
  });
};

const getIndustryColor = (industry: string) => {
  const colors = {
    'Hospitality': 'bg-rose-50 text-rose-700 border-rose-200',
    'Retail & Tourism': 'bg-blue-50 text-blue-700 border-blue-200',
    'Agriculture': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'Mining': 'bg-amber-50 text-amber-700 border-amber-200',
    'Technology': 'bg-violet-50 text-violet-700 border-violet-200',
    'Construction': 'bg-orange-50 text-orange-700 border-orange-200',
  };
  return colors[industry as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200';
};

const JobMap: React.FC<JobMapProps> = ({ companies, selectedCompanyId, onCompanySelect }) => {
  const center: [number, number] = [-25.2744, 133.7751];
  const uniqueIndustries = Array.from(new Set(companies.map(c => c.industry)));
  const selectedCompany = companies.find(c => c.companyId === selectedCompanyId) || null;
  const markerRefs = useRef<{ [key: string]: L.Marker }>({});

  useEffect(() => {
    if (selectedCompanyId && markerRefs.current[selectedCompanyId]) {
      markerRefs.current[selectedCompanyId].openPopup();
    }
  }, [selectedCompanyId]);

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 border-b border-border bg-gradient-to-r from-card to-muted/30">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-medium">
            <Globe className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">
              Find Jobs Near You
            </h2>
            <p className="text-sm text-muted-foreground">
              Click markers to view company details and contact info
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex-1 relative">
        {uniqueIndustries.length > 0 && uniqueIndustries.length <= 6 && (
          <div className="absolute top-6 right-6 z-[1000] bg-card/95 backdrop-blur-sm rounded-2xl p-4 shadow-large border border-border">
            <div className="flex items-center space-x-2 mb-3">
              <Navigation className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Industries</span>
            </div>
            <div className="space-y-2">
              {uniqueIndustries.map(industry => {
                const colors = {
                  'Hospitality': '#F43F5E',
                  'Retail & Tourism': '#3B82F6',
                  'Agriculture': '#10B981',
                  'Mining': '#F59E0B',
                  'Technology': '#8B5CF6',
                  'Construction': '#EF4444',
                }[industry] || '#6B7280';
                
                return (
                  <div key={industry} className="flex items-center space-x-3">
                    <div 
                      className="w-3 h-3 rounded-full shadow-sm" 
                      style={{ backgroundColor: colors }}
                    />
                    <span className="text-xs text-foreground font-medium">{industry}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        <MapContainer
          center={center}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapController selectedCompany={selectedCompany} />
          
          {companies.map((company) => {
            const isSelected = selectedCompanyId === company.companyId;
            return (
              <Marker
                key={company.companyId}
                position={[company.latitude, company.longitude]}
                icon={createCustomIcon(company.industry, company.companyName, isSelected)}
                ref={(ref) => {
                  if (ref) {
                    markerRefs.current[company.companyId] = ref;
                  }
                }}
                eventHandlers={{
                  click: () => onCompanySelect(company.companyId),
                  popupclose: () => onCompanySelect(null),
                }}
              >
                <Popup className="custom-popup" maxWidth={300}>
                  <div className="p-3 space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        {company.companyName.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base font-bold text-foreground mb-1 truncate">
                          {company.companyName}
                        </h3>
                        <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getIndustryColor(company.industry)}`}>
                          {company.industry}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <User className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                        <span className="text-foreground font-medium">{company.firstName} {company.lastName}</span>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground text-xs leading-relaxed">{company.address}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 pt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex-1 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 hover:shadow-blue-200/50"
                      >
                        <a href={`mailto:${company.email}`} className="flex items-center justify-center space-x-1.5">
                          <Mail className="h-3.5 w-3.5" />
                          <span>Email</span>
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="flex-1 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-400 hover:shadow-emerald-200/50"
                      >
                        <a href={`tel:${company.phoneNumber}`} className="flex items-center justify-center space-x-1.5">
                          <Phone className="h-3.5 w-3.5" />
                          <span>Call</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
};

export default JobMap;