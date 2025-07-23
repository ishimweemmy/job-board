import companiesData from '../../companies.json';
import type { Company } from '../types';

export const companies: Company[] = companiesData;

export const AUSTRALIAN_STATES = [
  { code: 'all-states', name: 'All States' },
  { code: 'NSW', name: 'New South Wales' },
  { code: 'VIC', name: 'Victoria' },
  { code: 'QLD', name: 'Queensland' },
  { code: 'WA', name: 'Western Australia' },
  { code: 'SA', name: 'South Australia' },
  { code: 'TAS', name: 'Tasmania' },
  { code: 'NT', name: 'Northern Territory' },
  { code: 'ACT', name: 'Australian Capital Territory' }
];

export const getUniqueIndustries = (): string[] => {
  const industries = Array.from(new Set(companies.map(company => company.industry)));
  return ['all-industries', ...industries.sort()];
};