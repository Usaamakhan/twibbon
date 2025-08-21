# Twibbon - Campaign Frame Creator

A modern, responsive website for creating and sharing campaign frames, similar to Twibbon or Twibbonize.

## 🚀 Features

### ✅ Completed Features

- **Homepage & Landing Page**
  - Hero section with call-to-action
  - Featured and trending campaigns
  - Responsive grid layout
  - Search functionality

- **Campaign Management**
  - Create new campaigns with step-by-step wizard
  - Campaign detail pages with statistics
  - Category filtering and sorting
  - Campaign approval system (admin)

- **Frame Editor**
  - Upload and position user images
  - Apply transparent PNG frames
  - Zoom, rotate, and adjust positioning
  - Download final images
  - Direct social media sharing

- **User Interface**
  - Responsive design (mobile, tablet, desktop)
  - Modern gradient backgrounds
  - Smooth animations and transitions
  - Clean card-based layout

- **Authentication Pages**
  - User signup/login forms
  - Social login placeholders (Google, Facebook)
  - Form validation

- **Admin Panel**
  - Dashboard with analytics
  - Campaign approval system
  - User management interface

### 🚧 To Be Implemented

- **Backend Integration**
  - Database setup (PostgreSQL with Prisma)
  - User authentication (NextAuth.js)
  - File upload and storage
  - API endpoints

- **Advanced Features**
  - Real-time campaign statistics
  - Email notifications
  - Advanced image editing tools
  - Multi-language support

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 19
- **Styling**: Tailwind CSS
- **Planned Backend**: Prisma ORM, PostgreSQL
- **Planned Auth**: NextAuth.js
- **Image Processing**: HTML5 Canvas (for frame application)

## 📋 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📱 Pages Available

- `/` - Homepage with featured campaigns
- `/explore` - Browse all campaigns with filtering
- `/campaign/[id]` - Individual campaign details and frame editor
- `/create` - Create new campaign (step-by-step wizard)
- `/login` - User login page
- `/signup` - User registration page
- `/admin` - Admin dashboard

## 🎨 Design Features

- **Mobile-First Responsive Design**
- **Gradient Backgrounds and Modern UI**
- **Card-Based Layout**
- **Interactive Components**
- **Smooth Animations**

## 🖼️ Frame Editor Features

- Drag and drop image positioning
- Scale adjustment with slider
- Real-time preview
- Canvas-based rendering
- PNG/JPEG download options
- Social media sharing integration

## 📊 Admin Features

- Campaign approval/rejection
- User management
- Analytics dashboard
- Site statistics

## 🔧 Development

The project is built with modern React patterns and includes:

- Client-side state management
- Responsive design utilities
- Component-based architecture
- Mock data for development

## 📄 License

This project is for demonstration purposes. Please ensure you have proper licensing for production use.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**Note**: This is a frontend implementation with mock data. Backend integration with database, authentication, and file storage needs to be implemented for production use.