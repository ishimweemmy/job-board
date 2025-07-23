import { 
  Mail, 
  Phone, 
  MapPin, 
  Search, 
  Check, 
  Building2, 
  User, 
  Hotel,
  ShoppingBag,
  Wheat,
  Pickaxe,
  Monitor,
  HardHat,
  Star,
  Clock,
} from 'lucide-react';
import type { Company, ContactedCompanies } from '../types';
import { Button } from './ui/button';

interface JobListProps {
  companies: Company[];
  contactedCompanies: ContactedCompanies;
  onToggleContacted: (companyId: string) => void;
  onJobSelect: (companyId: string) => void;
  selectedCompanyId: string | null;
}

const getIndustryConfig = (industry: string) => {
  const configs = {
    'Hospitality': {
      color: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: Hotel,
      bgColor: 'bg-gradient-to-br from-rose-500 to-pink-600',
      lightBg: 'bg-rose-50/50'
    },
    'Retail & Tourism': {
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: ShoppingBag,
      bgColor: 'bg-gradient-to-br from-blue-500 to-indigo-600',
      lightBg: 'bg-blue-50/50'
    },
    'Agriculture': {
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: Wheat,
      bgColor: 'bg-gradient-to-br from-emerald-500 to-green-600',
      lightBg: 'bg-emerald-50/50'
    },
    'Mining': {
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: Pickaxe,
      bgColor: 'bg-gradient-to-br from-amber-500 to-orange-600',
      lightBg: 'bg-amber-50/50'
    },
    'Technology': {
      color: 'bg-violet-50 text-violet-700 border-violet-200',
      icon: Monitor,
      bgColor: 'bg-gradient-to-br from-violet-500 to-purple-600',
      lightBg: 'bg-violet-50/50'
    },
    'Construction': {
      color: 'bg-orange-50 text-orange-700 border-orange-200',
      icon: HardHat,
      bgColor: 'bg-gradient-to-br from-orange-500 to-red-600',
      lightBg: 'bg-orange-50/50'
    },
  };
  return configs[industry as keyof typeof configs] || {
    color: 'bg-gray-50 text-gray-700 border-gray-200',
    icon: Building2,
    bgColor: 'bg-gradient-to-br from-gray-500 to-slate-600',
    lightBg: 'bg-gray-50/50'
  };
};

const JobList: React.FC<JobListProps> = ({
  companies,
  contactedCompanies,
  onToggleContacted,
  onJobSelect,
  selectedCompanyId
}) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-card to-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-medium">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Available Positions
              </h2>
              <p className="text-sm text-muted-foreground">
                {companies.length} employer{companies.length !== 1 ? 's' : ''} ready to hire • Contact directly
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 bg-accent/30 px-4 py-2 rounded-full">
            <Star className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-accent-foreground">Premium</span>
          </div>
        </div>
      </div>
      
      {/* Job Cards */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {companies.map((company, index) => {
          const isContacted = contactedCompanies[company.companyId];
          const isSelected = selectedCompanyId === company.companyId;
          const industryConfig = getIndustryConfig(company.industry);
          const IndustryIcon = industryConfig.icon;
          
          return (
            <div 
              key={company.companyId}
              onClick={() => onJobSelect(company.companyId)}
              className={`group relative animate-slide-in cursor-pointer ${
                isSelected
                  ? 'bg-gradient-to-r from-primary/10 to-primary/5 border-primary shadow-lg ring-1 ring-primary/30'
                  : isContacted 
                    ? 'bg-gradient-to-r from-emerald-50 to-green-50 border-emerald-200' 
                    : 'bg-card border-border hover:border-primary/30 hover:shadow-medium'
              } border rounded-2xl p-6 transition-all duration-300 shadow-soft`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Status Indicator */}
              {isContacted && (
                <div className="absolute top-4 right-4 w-3 h-3 bg-emerald-500 rounded-full shadow-sm"></div>
              )}
              {isSelected && !isContacted && (
                <div className="absolute top-4 right-4 w-3 h-3 bg-primary rounded-full shadow-sm animate-pulse"></div>
              )}
              
              {/* Company Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className={`relative w-14 h-14 ${industryConfig.bgColor} rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-medium group-hover:scale-105 transition-transform duration-300`}>
                    {company.companyName.charAt(0)}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-card rounded-full flex items-center justify-center shadow-sm border-2 border-card">
                      <IndustryIcon className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className={`text-lg font-bold transition-colors ${
                      isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'
                    }`}>
                      {company.companyName}
                    </h3>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${industryConfig.color}`}>
                      <IndustryIcon className="h-3 w-3 mr-1.5" />
                      {company.industry}
                    </div>
                  </div>
                </div>
                
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleContacted(company.companyId);
                  }}
                  variant={isContacted ? "success" : "outline"}
                  size="sm"
                  className={isContacted 
                    ? 'shadow-emerald-200/50' 
                    : 'hover:shadow-primary/20'
                  }
                >
                  {isContacted ? (
                    <>
                      <Check className="h-4 w-4" />
                      Contacted
                    </>
                  ) : (
                    <>
                      <Clock className="h-4 w-4" />
                      Contact
                    </>
                  )}
                </Button>
              </div>
              
              {/* Contact Information */}
              <div className="space-y-4 mb-6">
                <div className={`flex items-center space-x-3 p-3 rounded-xl ${industryConfig.lightBg} border border-border/50`}>
                  <div className="w-8 h-8 bg-card rounded-lg flex items-center justify-center shadow-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Contact Person</p>
                    <p className="text-sm font-semibold text-foreground">{company.firstName} {company.lastName}</p>
                  </div>
                </div>
                
                <div className={`flex items-start space-x-3 p-3 rounded-xl ${industryConfig.lightBg} border border-border/50`}>
                  <div className="w-8 h-8 bg-card rounded-lg flex items-center justify-center shadow-sm mt-0.5">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-medium">Location</p>
                    <p className="text-sm text-foreground leading-relaxed">{company.address}</p>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(`mailto:${company.email}?subject=Job Opportunity Inquiry - ${company.companyName}&body=Hi ${company.firstName},\n\nI am interested in job opportunities at ${company.companyName}.\n\nBest regards`);
                  }}
                  className="flex-1 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 hover:shadow-blue-200/50 group/btn"
                >
                  <Mail className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-200" />
                  Send Email
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(company.phoneNumber);
                    }
                    window.open(`tel:${company.phoneNumber}`);
                  }}
                  className="flex-1 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-400 hover:shadow-emerald-200/50 group/btn"
                >
                  <Phone className="h-4 w-4 group-hover/btn:scale-110 transition-transform duration-200" />
                  Call Now
                </Button>
              </div>
            </div>
          );
        })}
        
        {companies.length === 0 && (
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <div className="w-20 h-20 bg-muted rounded-2xl flex items-center justify-center mb-6 shadow-soft">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">No opportunities found</h3>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Try adjusting your filters to discover more job opportunities across Australia
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobList;