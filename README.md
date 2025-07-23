# Work & Travel Job Finder

A modern React application for finding employment opportunities in Australia, specifically designed for work and travel visa holders. The application features an interactive map interface, advanced filtering capabilities, comprehensive company contact management, and seamless integration between job listings and map visualization.

## Features

### Core Functionality
- **Interactive Map Integration**: OpenStreetMap with custom industry-specific markers and real-time synchronization
- **Job Selection System**: Click any job card to automatically focus and open the corresponding map marker
- **Advanced Filtering**: Filter opportunities by Australian state and industry with real-time updates
- **Contact Management**: Track contacted employers with visual indicators and persistent state
- **Responsive Design**: Optimized for desktop and mobile devices with consistent user experience
- **Real-time Search**: Instant filtering and search capabilities across all job listings

### User Interface
- **Modern Design System**: Clean, professional interface inspired by **Work & Travel Guide** branding
- **Industry-Specific Theming**: Color-coded companies by industry type with consistent visual hierarchy
- **Premium Job Cards**: Enhanced visual presentation with company avatars and status indicators
- **Interactive Map Legend**: Adaptive legend based on current filter selection
- **Direct Contact Integration**: Email and phone functionality with copy-to-clipboard support
- **Bidirectional Selection**: Seamless communication between job list and map components

### Enhanced User Experience
- **Job-to-Map Synchronization**: Selecting a job automatically zooms to location and opens marker popup
- **Visual Selection States**: Clear highlighting and feedback for selected jobs and map markers
- **Smooth Animations**: Slide-in effects, hover states, and transition animations throughout
- **Sophisticated Button Design**: Modern gradient buttons with shine effects and enhanced interactions
- **Professional Typography**: Consistent font weights, spacing, and visual hierarchy
- **Status Indicators**: Visual feedback for contacted employers and selected jobs

### Technical Features
- **TypeScript**: Full type safety and enhanced developer experience
- **React 19**: Latest React features and performance optimizations
- **Tailwind CSS 4**: Utility-first styling with custom design system integration
- **Shadcn/UI**: Professional component library with custom theme integration
- **React Leaflet**: Interactive map components with programmatic control
- **Custom Design Tokens**: Consistent color palette and spacing throughout the application

## Technology Stack

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development environment
- **Vite** - Fast build tool and development server
- **Tailwind CSS 4** - Utility-first CSS framework with custom design system

### UI Components
- **Shadcn/UI** - Professional component library with custom theming
- **Radix UI** - Accessible primitive components
- **Lucide React** - Modern icon library
- **Class Variance Authority** - Component variant management with enhanced button system

### Mapping
- **React Leaflet** - React components for Leaflet maps with programmatic control
- **Leaflet** - Interactive mapping library
- **OpenStreetMap** - Open-source map tiles

### Development Tools
- **ESLint** - Code linting and quality enforcement
- **TypeScript ESLint** - TypeScript-specific linting rules
- **Vite Plugin React** - React support for Vite

## Project Structure

```
src/
├── components/
│   ├── ui/                 # Shadcn/UI components with custom theming
│   │   ├── button.tsx      # Enhanced button component with modern variants
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   └── select.tsx
│   ├── JobList.tsx         # Job opportunities list with selection functionality
│   ├── JobMap.tsx          # Interactive map with synchronized selection
│   └── FilterPanel.tsx     # Advanced filtering interface
├── data/
│   └── companies.ts        # Company data utilities
├── lib/
│   └── utils.ts           # Utility functions
├── types.ts               # TypeScript type definitions
├── index.css             # Custom design system and Tailwind configuration
└── App.tsx               # Main application component with state management
```

## Installation

### Prerequisites
- Node.js 18+ 
- Yarn package manager

### Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn dev
   ```

4. Build for production:
   ```bash
   yarn build
   ```

## Usage

### Job Selection and Map Integration
- Click any job card to automatically select it and focus on the map location
- Selected jobs are highlighted with visual indicators and color changes
- Map markers automatically open popups when jobs are selected from the list
- Click map markers to select corresponding jobs in the list

### Filtering Opportunities
- Use the state dropdown to filter by Australian states
- Select specific industries to narrow down results
- Filters update both the job list and map markers in real-time
- Clear filters to view all available opportunities

### Contact Management
- Click "Contact" button to mark employers as contacted with visual feedback
- Use "Email" button to open pre-filled email composition
- Use "Call" button to initiate phone calls and copy numbers to clipboard
- Contacted status persists during the session with clear visual indicators

### Map Interaction
- Click on map markers to view detailed company information
- Use the legend to identify different industry types
- Zoom and pan to explore different regions
- Markers automatically resize and animate based on selection state

### Company Information
Each job card displays:
- Company name and industry with color-coded badges
- Contact person details with formatted presentation
- Full address information with map integration
- Direct contact options with enhanced button design
- Selection state with visual feedback

## Data Structure

The application uses a JSON data format with the following company structure:

```typescript
interface Company {
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
```

## Supported Industries

- Hospitality
- Retail & Tourism  
- Agriculture
- Mining
- Technology
- Construction

Each industry features unique color coding and iconography throughout the application with consistent theming.

## Design System

### Color Palette
- **Primary**: Custom amber (#F59E0B) for actions and highlights
- **Background**: Light neutral (#FAFAFA) for optimal readability
- **Cards**: Pure white (#FFFFFF) for content areas
- **Text**: Dark slate (#0F172A) for optimal contrast
- **Borders**: Light gray (#E2E8F0) for subtle separation

### Typography
- **Modern font stack** with system fonts and proper antialiasing
- **Consistent hierarchy** with appropriate font weights and sizes
- **Optimal line heights** for readability across all text elements

### Interactive Elements
- **Enhanced button system** with gradient backgrounds and shine effects
- **Smooth hover states** with color transitions and micro-animations
- **Professional shadows** for depth and visual hierarchy
- **Consistent spacing** using Tailwind's design tokens

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Features

- Lazy loading for map components with optimized rendering
- Efficient state management with React hooks and memoization
- Optimized filtering with useMemo for large datasets
- CSS-based animations for smooth interactions
- Tree-shaking enabled for minimal bundle size

## Development

### Available Scripts
- `yarn dev` - Start development server with hot reload
- `yarn build` - Build optimized production bundle
- `yarn lint` - Run ESLint with TypeScript support
- `yarn preview` - Preview production build locally

### Code Quality
The project enforces code quality through:
- TypeScript strict mode with comprehensive type checking
- ESLint configuration with React and TypeScript rules
- Consistent formatting with Prettier integration
- Component composition patterns for maintainability
- Custom design system integration with Tailwind

## Contributing

1. Follow TypeScript best practices with proper type definitions
2. Maintain responsive design principles across all screen sizes
3. Test functionality across different browsers and devices
4. Ensure accessibility compliance with proper ARIA labels
5. Follow existing code patterns and component structure
6. Use the established design system for consistent styling