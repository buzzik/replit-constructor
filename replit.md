# Electric Vehicle Configurator

## Overview

This is a full-stack electric vehicle configurator application built with React, TypeScript, and Express. The application allows users to select and customize electric vehicles by choosing from various options like colors, batteries, software packages, hardware configurations, interior designs, and wheels. Users can generate detailed PDF quotes for their configured vehicles with pricing breakdowns.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite for build tooling
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: React hooks for local state, TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: TSX for TypeScript execution in development
- **Build**: ESBuild for production bundling
- **Data Layer**: In-memory storage with interface for future database integration

### Data Storage Solutions
- **Current**: In-memory storage using Map data structures
- **Prepared**: Drizzle ORM configured for PostgreSQL with Neon Database
- **Schema**: Shared TypeScript types between client and server
- **Validation**: Zod schemas for runtime type checking

### Component Architecture
- **Design System**: Shadcn/ui component library with consistent theming
- **Structure**: Modular components for car selection, customization panels, and pricing
- **Accessibility**: Radix UI primitives ensure WCAG compliance
- **Responsive**: Mobile-first design with Tailwind breakpoints

### Development Workflow
- **Hot Reload**: Vite HMR for frontend, TSX watch mode for backend
- **Type Safety**: Strict TypeScript configuration across the stack
- **Code Organization**: Monorepo structure with shared types and utilities
- **Asset Handling**: Vite asset processing with CDN integration for images

## External Dependencies

### Core Framework Dependencies
- **React**: Frontend framework with hooks and context
- **Express**: Backend web application framework
- **TypeScript**: Type-safe JavaScript development
- **Vite**: Frontend build tool and development server

### UI and Styling
- **Shadcn/ui**: Component library built on Radix UI
- **Radix UI**: Headless UI primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography

### Data and Validation
- **Zod**: Runtime schema validation
- **TanStack Query**: Server state management and caching
- **React Hook Form**: Form state management and validation

### Database and ORM
- **Drizzle ORM**: Type-safe database toolkit
- **Neon Database**: Serverless PostgreSQL platform
- **PostgreSQL**: Relational database (configured but not active)

### Utilities and Tools
- **jsPDF**: Client-side PDF generation
- **date-fns**: Date manipulation utilities
- **clsx/cn**: Conditional className utility
- **Wouter**: Lightweight routing library

### Development Tools
- **TSX**: TypeScript execution for development
- **ESBuild**: Fast JavaScript bundler for production
- **PostCSS**: CSS processing with Tailwind integration
- **Replit Integration**: Development environment plugins and error handling