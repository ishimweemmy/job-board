export interface Company {
  companyId: string;
  companyName: string;
  industry: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  latitude: number;
  longitude: number;
  state: string;
}

export interface ContactedCompanies {
  [companyId: string]: boolean;
}

export interface FilterState {
  state: string;
  industry: string;
}

export interface JobListProps {
  companies: Company[];
  contactedCompanies: ContactedCompanies;
  onToggleContacted: (companyId: string) => void;
  onJobSelect: (companyId: string) => void;
  selectedCompanyId: string | null;
}

export interface JobMapProps {
  companies: Company[];
  selectedCompanyId: string | null;
  onCompanySelect: (companyId: string | null) => void;
}