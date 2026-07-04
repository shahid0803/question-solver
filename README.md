# Question Solver 🎓

A modern, premium **3D educational web application** for exam preparation with AI-powered PDF processing, inspired by Testbook but with a unique futuristic design.

## 🎯 Vision

Build a polished, scalable online exam platform that feels premium and smooth. Users can upload PDFs, have questions automatically categorized by AI, and practice them one-by-one with progress tracking, analytics, bookmarking, mock tests, and a visually immersive experience.

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Three.js + React Three Fiber** - 3D graphics
- **GSAP** - Advanced animations

### Backend & Database
- **Firebase** - Authentication, Firestore, Storage
- **Supabase** - PostgreSQL database (alternative)

### Additional Libraries
- **React Query** - Server state management
- **Zustand** - Client state management
- **React Hot Toast** - Notifications
- **pdf-parse** - PDF text extraction
- **Tesseract.js** - OCR for scanned PDFs
- **Recharts** - Analytics & charts

## 📁 Project Structure

```
question-solver/
├── src/
│   ├── app/                      # Next.js 15 app directory
│   │   ├── layout.tsx            # Root layout
│   │   ├── providers.tsx         # React providers wrapper
│   │   └── page.tsx              # Home page
│   ├── components/               # Reusable React components
│   │   ├── ui/                   # Base UI components
│   │   ├── auth/                 # Auth components
│   │   ├── dashboard/            # Dashboard components
│   │   └── 3d/                   # 3D components
│   ├── lib/
│   │   ├── firebase.ts           # Firebase config
│   │   ├── supabase.ts           # Supabase config
│   │   ├── auth/                 # Auth utilities & store
│   │   ├── api/                  # API utilities
│   │   └── db/                   # Database queries
│   ├── services/                 # Business logic
│   │   ├── auth/                 # Auth services
│   │   ├── questions/            # Question services
│   │   ├── pdf/                  # PDF processing
│   │   └── analytics/            # Analytics services
│   ├── hooks/                    # Custom React hooks
│   ├── types/                    # TypeScript types
│   ├── utils/                    # Utility functions
│   └── styles/
│       └── globals.css           # Global styles
├── public/                       # Static assets
├── database/                     # DB migrations & schemas
├── .env.local                    # Environment variables (local)
├── .env.local.example            # Environment template
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── .eslintrc.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/shahid0803/question-solver.git
   cd question-solver
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in your Firebase or Supabase credentials:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
   # ... other variables
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Features Roadmap

### Phase 1: Foundation & Setup ✅
- [x] Initialize Next.js 15 project
- [x] Set up TypeScript & Tailwind CSS
- [x] Configure Firebase/Supabase
- [x] Set up state management (Zustand)
- [ ] Create base UI components

### Phase 2: Core Features (In Progress)
- [ ] Email/Password authentication
- [ ] Google OAuth integration
- [ ] PDF upload with drag-drop
- [ ] PDF text extraction & OCR
- [ ] AI question classification
- [ ] Question display interface
- [ ] Answer saving & navigation
- [ ] Dashboard & analytics

### Phase 3: Premium UI & 3D Features
- [ ] Glassmorphism design
- [ ] Dark/Light mode toggle
- [ ] 3D animated elements
- [ ] Smooth page transitions
- [ ] Floating particles & effects

### Phase 4: Advanced Features
- [ ] Mock tests with timer
- [ ] Previous year papers
- [ ] Leaderboard & achievements
- [ ] Multi-language support
- [ ] Keyboard shortcuts
- [ ] Performance optimization

## 🎨 Design System

### Colors
- **Primary**: #0ea5e9 (Sky Blue)
- **Secondary**: #8b5cf6 (Purple)
- **Accent**: #14b8a6 (Teal)
- **Dark BG**: #0f0f1e
- **Neon Green**: #39ff14
- **Neon Pink**: #ff10f0

### Components
All components follow a consistent design pattern with glassmorphism effects, smooth transitions, and responsive layouts.

## 📊 Database Schema

### Core Tables
- **users** - User profiles & authentication
- **exams** - Exam types (UPSC, GATE, SSC, etc.)
- **categories** - Exam categories (Prelims, Mains, etc.)
- **subjects** - Subject-level organization
- **topics** - Topic-level organization
- **chapters** - Chapter-level organization
- **questions** - Question content
- **options** - MCQ options
- **user_responses** - User answers
- **results** - Test results & analytics
- **bookmarks** - Bookmarked questions
- **notes** - User notes on questions

See [database/schema.sql](database/schema.sql) for detailed schema.

## 🔐 Security Considerations

- Environment variables for sensitive data
- Firebase security rules for data access
- Supabase RLS (Row-Level Security) policies
- HTTPS enforcement in production
- Rate limiting on API endpoints
- Input validation & sanitization

## 🚄 Performance Optimizations

- Next.js Image optimization
- Code splitting & lazy loading
- Server-side rendering (SSR) where appropriate
- PDF caching strategies
- Efficient database queries
- Progressive Web App (PWA) support

## 📱 Responsive Design

- Mobile-first approach
- Tablet optimization
- Desktop enhanced experience
- Touch-friendly interfaces
- Adaptive layouts

## 🧪 Testing

(To be implemented)

```bash
npm run test
```

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit changes (`git commit -m 'Add amazing feature'`)
3. Push to branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Shahid Khan**
- GitHub: [@shahid0803](https://github.com/shahid0803)

## 🙏 Acknowledgments

- Inspired by Testbook's smooth UX
- Built with modern web technologies
- Community feedback and contributions

## 📞 Support

For support, email your-email@example.com or open an issue on GitHub.

---

**Last Updated**: July 4, 2026
