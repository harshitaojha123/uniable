# UniAble ♿

### Accessibility Support Platform for Students

[🌐 Live Demo](https://uniable.vercel.app/) •
[💻 GitHub](https://github.com/harshitaojha123/uniable)

UniAble is a web-based accessibility support platform designed to help
differently-abled students navigate campus life more independently.  

## 🌐 Live Demo

🚀 **Live Application:** https://uniable.vercel.app/

💻 **Source Code:** https://github.com/harshitaojha123/uniable  


# UniAble ♿

### Accessibility Support Platform for Students

UniAble is a web-based accessibility support platform designed to help differently-abled students navigate campus life more independently and access support whenever they need it.

The platform brings accessibility customization, campus accessibility reporting, AI assistance, help requests, and emergency SOS support into a single application.

---

## 🌐 Live Demo

**Live Application:**  
https://uniable.vercel.app/

**GitHub Repository:**  
https://github.com/harshitaojha123/uniable

---

## 🎯 Problem Statement

Students with accessibility needs may have to depend on multiple departments or individuals for assistance with campus navigation, accessibility issues, and emergency support.

UniAble aims to provide a centralized platform where students can:

- Personalize their accessibility experience
- Request academic or physical assistance
- Report accessibility issues on campus
- Find accessibility-related locations
- Get quick assistance through an AI Assistant
- Send emergency SOS alerts to administrators

---

## ✨ Key Features

### ♿ Personalized Accessibility

Students can select their accessibility requirement and access tools relevant to their needs.

Supported categories include:

- Visual Impairment
- Hearing Impairment
- Mobility Impairment
- Learning Disability
- Prefer not to say

---

### 👁️ Visual Accessibility

The platform provides visual customization features such as:

- High Contrast Mode
- Dyslexia-Friendly Font
- Highlight Interactive Elements
- Adjustable Text Size
- Text-to-Speech

---

### 🎤 Speech Accessibility

UniAble provides browser-based speech features:

- Speech-to-Text
- Text-to-Speech
- Voice-based interaction

These features can make digital information easier to access for users with different accessibility requirements.

---

### 🚨 Emergency SOS

Students can send an emergency accessibility request to the administration.

The SOS system records:

- Student email
- Accessibility requirement
- Reason for emergency
- Time of request
- Request status

Administrators can:

- View SOS alerts
- Mark alerts as resolved
- Remove resolved/unwanted alerts

---

### 🆘 Help & Support

Students can submit support requests by providing:

- Request title
- Description
- Student email

Administrators can view requests and mark them as resolved.

---

### 🗺️ Campus Accessibility Map

Students can report accessibility issues at specific campus locations.

Reports contain:

- Location
- Accessibility category
- Description
- Map coordinates
- Reporter information
- Resolution status

Supported categories include:

- Wheelchair Access
- Visual Assistance
- Hearing Assistance
- General Accessibility

Students can also filter reported locations according to accessibility type.

---

### 🤖 AI Assistant

UniAble includes an AI-powered assistant that can answer user questions and provide quick guidance.

The assistant uses the **Google Gemini API** to generate responses.

---

### 👨‍💼 Admin Dashboard

Administrators have a separate dashboard to manage:

- Student support requests
- Emergency SOS alerts
- Campus accessibility reports

Administrators can update the status of requests and monitor submitted issues.

---

## 🛠️ Tech Stack

### Frontend

- React.js
- JavaScript
- React Router
- Tailwind CSS
- Framer Motion
- Lucide React

### APIs & Browser Features

- Google Gemini API
- Web Speech API
- Speech Synthesis API

### Backend

- Node.js
- Express.js

### Development Tools

- Git
- GitHub
- Vite
- VS Code

### Deployment

- Vercel

---

## 🏗️ Project Structure

```text
UniAble/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── accessibility/
│   │   │   ├── campus/
│   │   │   └── map/
│   │   │
│   │   ├── context/
│   │   │   ├── AccessibilityContext.jsx
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Accessibility.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Help.jsx
│   │   │   ├── Ai.jsx
│   │   │   ├── CampusAccessibility.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── SOSAlerts.jsx
│   │   │   └── AdminCampus.jsx
│   │   │
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server/
│   └── ...
│
└── README.md



                    ┌──────────────────┐
                    │     Student      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │  React Frontend  │
                    └────────┬─────────┘
                             │
             ┌───────────────┼───────────────┐
             │               │               │
             ▼               ▼               ▼
       Accessibility      AI Assistant    Campus Map
             │               │               │
             ▼               ▼               ▼
       Accessibility       Gemini API      Reports
          Tools
             │
             ▼
        Help / SOS
             │
             ▼
      ┌───────────────┐
      │     Admin     │
      │   Dashboard   │
      └───────────────┘





```bash
git add README.md
git commit -m "Add project README"
git push origin main
