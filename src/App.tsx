import { useState, useMemo } from 'react';
import type { FilterState, ContactedCompanies } from './types';
import { companies, AUSTRALIAN_STATES, getUniqueIndustries } from './data/companies';
import JobList from './components/JobList';
import JobMap from './components/JobMap';
import FilterPanel from './components/FilterPanel';

function App() {
  const [filters, setFilters] = useState<FilterState>({
    state: '',
    industry: ''
  });
  
  const [contactedCompanies, setContactedCompanies] = useState<ContactedCompanies>({});
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

  const filteredCompanies = useMemo(() => {
    return companies.filter(company => {
      const stateMatch = filters.state === 'all-states' || !filters.state || company.state === filters.state;
      const industryMatch = filters.industry === 'all-industries' || !filters.industry || company.industry === filters.industry;
      return stateMatch && industryMatch;
    });
  }, [filters]);

  const toggleContacted = (companyId: string) => {
    setContactedCompanies(prev => ({
      ...prev,
      [companyId]: !prev[companyId]
    }));
  };

  const handleJobSelect = (companyId: string) => {
    setSelectedCompanyId(companyId);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Modern Header */}
      <header className="bg-card border-b border-border shadow-soft sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-medium">
                  <span className="text-lg font-bold text-primary-foreground">W</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-foreground">
                    Work & Travel Jobs
                  </h1>
                  <p className="text-sm text-muted-foreground hidden sm:block">
                    Connect directly with employers hiring now
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2 px-3 py-1.5 bg-accent/50 rounded-full">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-accent-foreground font-medium">Australia Wide</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-foreground">{companies.length}</span>
                  <span>Opportunities</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Filter Section */}
      <FilterPanel 
        filters={filters}
        onFiltersChange={setFilters}
        states={AUSTRALIAN_STATES}
        industries={getUniqueIndustries()}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Job List */}
          <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
            <JobList 
              companies={filteredCompanies}
              contactedCompanies={contactedCompanies}
              onToggleContacted={toggleContacted}
              onJobSelect={handleJobSelect}
              selectedCompanyId={selectedCompanyId}
            />
          </div>

          {/* Map */}
          <div className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden">
            <JobMap 
              companies={filteredCompanies} 
              selectedCompanyId={selectedCompanyId}
              onCompanySelect={setSelectedCompanyId}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
