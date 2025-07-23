import { Filter, MapPin, Building2 } from 'lucide-react';
import type { FilterState } from '../types';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  states: { code: string; name: string }[];
  industries: string[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFiltersChange,
  states,
  industries
}) => {
  const handleStateChange = (state: string) => {
    const actualState = state === "all-states" ? "" : state;
    onFiltersChange({ ...filters, state: actualState });
  };

  const handleIndustryChange = (industry: string) => {
    const actualIndustry = industry === "all-industries" ? "" : industry;
    onFiltersChange({ ...filters, industry: actualIndustry });
  };

  return (
    <div className="bg-card border-b border-border shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Filter className="h-4 w-4 text-primary" />
            </div>
            <span className="text-sm font-semibold text-foreground">Find Jobs By</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">State:</span>
              </div>
              <Select value={filters.state || undefined} onValueChange={handleStateChange}>
                <SelectTrigger className="w-[180px] bg-card border-border shadow-soft hover:border-primary/30 focus:border-primary transition-colors">
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border shadow-large">
                  {states.map((state) => (
                    <SelectItem key={state.code} value={state.code} className="focus:bg-primary/10">
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4" />
                <span className="font-medium">Industry:</span>
              </div>
              <Select value={filters.industry || undefined} onValueChange={handleIndustryChange}>
                <SelectTrigger className="w-[180px] bg-card border-border shadow-soft hover:border-primary/30 focus:border-primary transition-colors">
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border shadow-large">
                  {industries.map((industry, index) => (
                    <SelectItem key={industry} value={industry} className="focus:bg-primary/10">
                      {index === 0 ? 'All Industries' : industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;