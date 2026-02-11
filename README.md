# HeirsSure Clarity

> **WhatsApp-Integrated AI Assistant for Nigerian Insurance Claims**

HeirsSure Clarity is a comprehensive AI-powered platform designed to help Nigerian insurance consumers understand their claims, access their legal rights, and interact with insurance companies efficiently through WhatsApp.

![Demo Mode Badge](https://img.shields.io/badge/Status-Demo-amber)
![License](https://img.shields.io/badge/License-MIT-blue)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?logo=typescript)

---

## 🌟 Features

### 1. **WhatsApp Chat Simulator**
- Realistic WhatsApp UI with message timestamps and delivery status
- Quick reply buttons for common queries
- Typing indicators with animated dots
- Auto-scrolling messages

### 2. **Intelligent Intent Detection Engine**
- **Claim Status Queries**: Detects claim IDs (CLM-YYYY-NNN format)
- **Legal Rights Inquiries**: Identifies insurance rights questions
- **Document Requests**: Recognizes certificate/receipt requests
- **Escalation Detection**: Identifies frustrated sentiment and auto-escalates
- **Pattern Matching**: Robust NLP with multiple detection patterns

### 3. **Bilingual Support**
- **English & Nigerian Pidgin**: Automatic language detection
- Pidgin patterns: "wetin", "na", "dey", "abeg", "oga", "wahala"
- Culturally appropriate messaging
- Full response sets in both languages

### 4. **Claims Dashboard**
Real-time metrics and monitoring:
- Total claims, pending, under review
- Claims exceeding 90-day regulatory limit
- Escalations count, resolution rate
- Total claim value (₦)
- Responsive table with desktop and mobile views
- Dynamic claim highlighting with pulse animation
- Color-coded status badges

### 5. **Legal Reference System**
Comprehensive legal documents database:
- **Insurance Act 2003** (Sections 50-53, 64)
- **NAICOM Market Conduct Guidelines 2019**
- **NAICOM Circular on Digital Insurance 2022**
- Smart retrieval based on user intent
- Keyword-based search functionality

### 6. **AI Reasoning Transparency**
"Under the Hood" toggle reveals:
- **Patterns Matched**: What keywords/patterns triggered the response
- **Data Source**: Where information was retrieved from
- **Escalation Logic**: What triggers caused escalation

### 7. **Quick Test Scenarios**
Preset buttons for easy testing:
- **Check Claim Status** - Tests claim lookup
- **Ask Legal Questions** - Tests legal reference system
- **Trigger Escalation** - Tests escalation detection

### 8. **Compliance Features**
- 90-day settlement timeline enforcement (Insurance Act Section 50)
- Automatic flagging of compliance violations
- Legal section attribution in all responses
- NAICOM regulatory alignment

---

## 🎨 Design System

**Color Scheme:**
- **Base**: White and neutral gray
- **Alerts/Compliance**: Crimson (`hsl(348 83% 47%)`)
- Escalations, legal delays, and compliance risks use crimson
- Clean, professional aesthetic with dark mode support

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Frontend Framework** | React 18.3.1 with TypeScript |
| **Build Tool** | Vite 5.4.19 |
| **UI Library** | Shadcn UI (Radix UI primitives) |
| **Styling** | Tailwind CSS 3.4.17 |
| **Animations** | Framer Motion 12.31.0 |
| **Routing** | React Router DOM 6.30.1 |
| **Forms** | React Hook Form 7.61.1 + Zod 3.25.76 |
| **State Management** | React Context API + TanStack React Query |
| **Charts** | Recharts 2.15.4 |
| **Notifications** | Sonner Toast library |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── demo/
│   │   ├── WhatsAppChat.tsx       # WhatsApp simulator
│   │   └── IntentPanel.tsx        # AI analysis panel
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/                        # 60+ Shadcn components
├── context/
│   └── ClaimsContext.tsx          # Global state management
├── data/
│   ├── claims.ts                  # Sample claims database
│   └── legalDocuments.ts          # Legal reference data
├── lib/
│   └── chatEngine.ts              # Intent detection & NLP
├── pages/
│   ├── Demo.tsx                   # WhatsApp demo page
│   ├── Dashboard.tsx              # Claims dashboard
│   └── Legal.tsx                  # Legal reference page
└── index.css                      # Design system styles
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/MashobTechie/heirssure-clarity.git

# Navigate to project directory
cd heirssure-clarity

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

---

## 💡 Usage Examples

### Testing Claim Status
```
User: "Check claim CLM-2024-003"
Bot: Returns full claim details with status, amount, days open, and compliance warnings
```

### Testing Legal Inquiries
```
User: "What are my rights if my claim is delayed?"
Bot: Returns Insurance Act Section 50 with 90-day settlement timeline
```

### Testing Pidgin Support
```
User: "Wetin be my rights for insurance?"
Bot: Responds in Nigerian Pidgin with culturally appropriate language
```

### Testing Escalation
```
User: "I'm very frustrated with this process!"
Bot: Auto-escalates and flags for human review with priority status
```

---

## 📊 Sample Data

The project includes **8 simulated insurance claims**:
- Motor insurance claims
- Health insurance claims
- Life insurance claims
- Property insurance claims
- Travel insurance claims

Claim values range from **₦75,000 to ₦5,000,000**

---

## 🔧 Configuration

### Color Customization
Edit `src/index.css` to customize the design system:
```css
:root {
  --primary: 0 0% 20%;           /* Neutral gray */
  --destructive: 348 83% 47%;    /* Crimson for alerts */
  --success: 142 70% 40%;        /* Green for success */
}
```

### Adding Legal Documents
Add new legal references in `src/data/legalDocuments.ts`:
```typescript
{
  id: "new-section",
  number: "Section XX",
  title: "New Legal Section",
  content: "Legal content here...",
  keywords: ["keyword1", "keyword2"]
}
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎯 Roadmap

- [ ] Integration with real WhatsApp Business API
- [ ] Real claims database connection
- [ ] User authentication system
- [ ] Multi-language support (Yoruba, Igbo, Hausa)
- [ ] Voice message support
- [ ] Document upload functionality
- [ ] Admin portal for claims agents
- [ ] Analytics dashboard

---

## 🔗 Links

- **Repository**: [https://github.com/MashobTechie/heirssure-clarity](https://github.com/MashobTechie/heirssure-clarity)
- **Issues**: [Report a bug](https://github.com/MashobTechie/heirssure-clarity/issues)

---

## 👏 Acknowledgments

- NAICOM (National Insurance Commission) for regulatory guidelines
- Insurance Act 2003 (Federal Republic of Nigeria)
- Nigerian insurance consumers for inspiration
- Shadcn UI for the beautiful component library

---

**Built with ❤️ for Nigerian Insurance Consumers**
