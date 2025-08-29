# Claude Development Guide for Framely Project

## Project Overview
Framely is a modern campaign frame creator website built with Next.js and JavaScript, similar to Twibbon/Twibbonize platforms. This is a comprehensive Twibbonize-like platform with advanced features for campaign creation, frame editing, and social sharing.

## Tech Stack
- **Framework**: Next.js 15 (latest)
- **Language**: JavaScript (ES2024+)
- **Styling**: Tailwind CSS v4 (latest)
- **Database**: Firebase Firestore (NoSQL)
- **Authentication**: Firebase Authentication
- **File Storage**: Firebase Storage
- **Hosting**: Firebase Hosting + Vercel (optional)
- **Image Processing**: HTML5 Canvas API
- **Build Tool**: Turbopack (Next.js 15 default)
- **Package Manager**: npm 10.x (latest)

## Development Commands
```bash
npm install     # Install dependencies (or pnpm install)
npm run dev     # Start development server with Turbopack on http://localhost:3000
npm run build   # Build for production
npm run lint    # Run ESLint 9.x (when configured)
npm run build   # Build and check for errors
```

## Project Structure
- `/app` - Next.js 15 app directory with routes
- `/components` - Reusable React components
- `/public` - Static assets
- `/styles` - Global styles and Tailwind CSS v4 configuration

## Key Routes
- `/` - Homepage with featured campaigns
- `/explore` - Browse and filter campaigns
- `/campaign/[id]` - Campaign details and frame editor
- `/create` - Campaign creation wizard
- `/admin` - Admin dashboard
- `/login`, `/signup` - Authentication pages

## Current Implementation Status

### ✅ Completed
- Responsive UI with Tailwind CSS
- Campaign browsing and filtering
- Frame editor with canvas-based image processing
- Admin panel interface
- Authentication page layouts
- Mobile-first responsive design

### 🚧 Pending Firebase Integration
- Firebase Firestore database setup and collections
- Firebase Authentication (Email/Google/Facebook)
- Firebase Storage for image and file uploads
- API endpoints with Next.js 15 route handlers
- Real-time data synchronization with Firestore
- Firebase Cloud Functions for backend logic
- Firebase Analytics for user tracking

## Development Guidelines

### Testing and Development Server Rules
**IMPORTANT**: Do NOT run `npm run dev` or `npm run build` commands during development unless explicitly requested by the user for testing purposes. The user will handle all testing themselves.

### Code Style
- Use functional React components with hooks
- Use modern JavaScript (ES2024+) with JSX
- Follow Next.js 15 app directory conventions
- Use Tailwind CSS v4 utility classes for styling
- Maintain responsive design principles
- Implement proper error boundaries and loading states

### Component Architecture
- Keep components modular and reusable
- Use client components ('use client') only when necessary
- Implement proper loading and error states
- Follow accessibility best practices

### Component Styling Rules ⭐ **UPDATED**
**CRITICAL**: Components must have separated structure with component and styling in different files.

#### **Component Directory Structure:**
```
/components/
  /Header/
    - Header.js          (Component logic)
    - Header.module.css  (Component styles)
    - index.js           (Export file)
```

#### **Styling Guidelines:**
- **✅ DO**: Use CSS Modules for component-specific styles
- **✅ DO**: Separate component logic and styling into different files
- **✅ DO**: Use semantic CSS class names (e.g., .header, .logo, .button)
- **✅ DO**: Include hover states and responsive design in CSS modules
- **✅ DO**: Use CSS custom properties for consistency
- **❌ DON'T**: Mix multiple styling approaches in one component
- **❌ DON'T**: Use inline styles (except for truly dynamic values)
- **❌ DON'T**: Create styles in globals.css for specific components

#### **Component Structure Example:**
```jsx
// ✅ CORRECT - Separated Structure
// Header/Header.js
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link className={styles.logo}>Logo</Link>
        <button className={styles.iconButton}>Menu</button>
      </div>
    </header>
  );
}
```

```css
/* ✅ CORRECT - Header/Header.module.css */
.header {
  background: transparent;
  position: sticky;
  top: 0;
  z-index: 50;
}

.iconButton {
  width: 5rem;
  height: 5rem;
  background-color: white;
  border-radius: 9999px;
}

.iconButton:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

**Globals.css Usage:**
- Only CSS custom properties (colors, spacing, shadows)
- Only base element styles (html, body, headings)
- NO component-specific classes

### Performance Considerations
- Implement lazy loading for images
- Use Next.js 15 Image component for optimization
- Minimize client-side JavaScript with Turbopack
- Implement proper caching strategies
- Leverage React 19 performance improvements
- Use Next.js 15 partial prerendering features

## Testing Approach (For Future Implementation)
- Unit tests with Vitest (latest) or Jest 29.x
- Component testing with React Testing Library v16
- E2E testing with Playwright v1.x (latest)
- Performance testing with Lighthouse v12
- JavaScript linting with ESLint 9.x

## Security Considerations
- Implement proper input validation
- Secure file upload handling
- Rate limiting for API endpoints
- CORS configuration
- Environment variable management

## Deployment
- Frontend: Vercel (optimized for Next.js) or Firebase Hosting
- Database: Firebase Firestore (managed NoSQL)
- Authentication: Firebase Authentication
- File Storage: Firebase Storage
- Functions: Firebase Cloud Functions (optional)
- Analytics: Firebase Analytics

## Environment Variables (Required for Production)
```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
FIREBASE_ADMIN_SERVICE_ACCOUNT_KEY= (server-side)
```

## Firebase Services Integration Plan

### Firebase Firestore Collections Structure
```javascript
// Users Collection
users: {
  userId: {
    email: string,
    displayName: string,
    photoURL: string,
    createdAt: timestamp,
    plan: 'free' | 'supporter' | 'creator',
    subscription: {
      plan: string,
      status: string,
      expiresAt: timestamp
    },
    stats: {
      campaignsCreated: number,
      totalDownloads: number
    }
  }
}

// Campaigns Collection
campaigns: {
  campaignId: {
    title: string,
    description: string,
    creatorId: string,
    frames: array,
    isPublic: boolean,
    status: 'draft' | 'published' | 'archived',
    category: string,
    tags: array,
    createdAt: timestamp,
    updatedAt: timestamp,
    stats: {
      views: number,
      downloads: number,
      likes: number
    },
    settings: {
      watermark: boolean,
      analytics: boolean
    }
  }
}

// Templates Collection (for premium users)
templates: {
  templateId: {
    name: string,
    category: string,
    frameUrl: string,
    previewUrl: string,
    isPremium: boolean,
    createdBy: string,
    downloads: number
  }
}
```

### Firebase Authentication Setup
- **Providers**: Email/Password, Google, Facebook
- **Security Rules**: Role-based access control
- **Custom Claims**: Premium plan status for feature gating

### Firebase Storage Structure
```
/campaigns/{campaignId}/
  - frames/
    - original_{frameId}.png
    - processed_{frameId}.png
  - exports/
    - {userId}_{timestamp}.png
    
/templates/
  - {templateId}/
    - frame.png
    - preview.jpg
    
/user-uploads/
  - {userId}/
    - profile-pics/
    - campaign-assets/
```

### Monetization with Firebase
- **Stripe Integration**: Payment processing via API routes
- **Subscription Management**: Firestore documents + Cloud Functions
- **Feature Gating**: Custom claims + client-side checks
- **Usage Tracking**: Analytics events for billing

## Development Phases

### Phase 1: Core Platform (Months 1-3)
- Firebase project setup and configuration
- User authentication with Firebase Auth
- Basic campaign CRUD with Firestore
- Image upload and storage with Firebase Storage
- Canvas-based frame editor implementation

### Phase 2: Advanced Features (Months 4-6)
- Premium subscription system with Stripe
- Advanced frame editor tools
- Social sharing integration
- Campaign analytics dashboard
- Template system for premium users

### Phase 3: Community & Discovery (Months 7-9)
- Public campaign discovery page
- User profiles and portfolios
- Campaign categorization and search
- Community features (likes, comments)
- Admin moderation tools

### Phase 4: Mobile & Scale (Months 10-12)
- Progressive Web App optimization
- Mobile-responsive editor improvements
- Performance optimization with Firebase caching
- Advanced analytics with Firebase Analytics
- API for third-party integrations

## Notes for AI Assistants
- Project uses Next.js 15 with JavaScript (not TypeScript)
- Firebase is the primary backend service (auth, database, storage)
- Frontend is fully implemented with mock data
- Firebase integration is the primary pending work
- Focus on maintaining clean, modular JavaScript code
- Prioritize user experience and performance optimizations
- Follow Next.js 15 best practices and Firebase best practices
- Implement proper Firebase security rules
- Use Firebase real-time features for live collaboration

## Task Management & Testing Protocol
- **Todo Management**: Break every command into small, specific todos using TodoWrite
- **Implementation**: Complete todos step by step, marking each as completed
- **Testing**: User handles all testing - do not write tests or run test commands
- **Focus**: Only implement requested features, no proactive testing or documentation