# ArguMate – AI-Powered Debate & Argument Generation Platform

ArguMate is an AI-powered debate platform that helps users generate, analyze, and refine arguments on various topics. The application leverages Google's Gemini API to create structured arguments, generate debate reports, and facilitate meaningful discussions through both text and voice interactions.

##  Features

###  AI-Powered Argument Generation

* Generate well-structured arguments for any debate topic.
* Create supporting and opposing viewpoints instantly.
* AI-assisted reasoning using Gemini API.

###  Automated Debate Reports

* Generate detailed debate summaries and analytical reports.
* Highlight key points, strengths, and weaknesses of arguments.
* AI-generated insights for improved critical thinking.

###  Voice-Based Interaction

* Voice input support for hands-free argument generation.
* Speech-to-text conversion for seamless user experience.
* Interactive debate participation using voice commands.

### Text-Based Interaction

* Real-time text input for debate discussions.
* Clean and intuitive chat-style interface.
* Dynamic response generation powered by AI.

###  Secure Authentication

* User authentication and session management using Clerk.
* Secure sign-up and login workflows.
* Protected routes and personalized user sessions.

###  Responsive User Interface

* Modern and responsive design built with React.js.
* Optimized for desktop and mobile devices.
* Smooth and interactive user experience.

---

##  System Architecture

Frontend (React.js)
↓
Clerk Authentication
↓
Spring Boot Backend
↓
Gemini API
↓
Argument & Report Generation

---

## 🛠️Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3

### Backend

* Spring Boot
* REST APIs
* Java

### Authentication

* Clerk API

### AI Services

* Google Gemini API

### Additional Features

* Web Speech API (Voice Input)
* JSON-based API Communication

---

##  Project Structure

```text
ArguMate/
│
├── backend/
│   └── src/main/java/
│       ├── config/
│       │   ├── ClerkJwtFilter.java
│       │   └── SecurityConfig.java
│       │
│       ├── controllers/
│       │   ├── AuthController.java
│       │   ├── ChatController.java
│       │   ├── DebateController.java
│       │   └── GeminiController.java
│       │
│       ├── models/
│       │   ├── Debate.java
│       │   ├── GeminiRequest.java
│       │   ├── Message.java
│       │   └── User.java
│       │
│       ├── services/
│       │   ├── DebateService.java
│       │   └── GeminiService.java
│       │
│       └── DemoApplication.java
│
├── frontend/
│   ├── public/
│   │
│   └── src/
│       ├── assets/
│       └── components/
│           ├── Navbar.jsx
│       │
│       └── pages/
│           ├── Home.jsx
│           ├── Dashboard.jsx
│           ├── ChatRoom.jsx
│           ├── Report.jsx
│           ├── SignInPage.jsx
│           └── SignUpPage.jsx
│
└── README.md
```


##  Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/argumate.git
cd argumate
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm start
```

### 3. Backend Setup

```bash
cd backend
mvn spring-boot:run
```

### 4. Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_API_URL=http://localhost:8080
```

Configure backend application properties:

```properties
GEMINI_API_KEY=your_gemini_api_key
```

---

##  Workflow

1. User authenticates through Clerk.
2. User enters a debate topic using text or voice input.
3. Frontend sends the request to the Spring Boot backend.
4. Backend communicates with Gemini API.
5. AI-generated arguments are returned to the frontend.
6. Users can generate reports summarizing the debate.
7. Results are displayed in a clean and interactive interface.

---

##  Use Cases

* Debate preparation
* Public speaking practice
* Critical thinking development
* Academic discussions
* Argument analysis and evaluation


---

## 🔮 Future Enhancements

* Multi-user live debate rooms
* AI argument scoring system
* Debate history and analytics
* Topic recommendation engine
* Real-time collaborative debates
* Export reports as PDF

---

## 📸 Screenshots

Home Page:
<img width="1900" height="863" alt="debate-home" src="https://github.com/user-attachments/assets/bd6bf988-bc2f-4da7-8cb4-a302c5c6b023" />
<img width="1897" height="867" alt="debate-home2" src="https://github.com/user-attachments/assets/890f4bed-714a-422e-a0a6-e76e14830997" />
<img width="1903" height="868" alt="debate-home3" src="https://github.com/user-attachments/assets/f04081d6-b3a6-4362-82fe-58e5c7f199c0" />

Login :
<img width="1898" height="863" alt="image" src="https://github.com/user-attachments/assets/017ae860-ad92-4279-b81e-dd5eddcb4f00" />


ChatRoom
<img width="1898" height="905" alt="chatroom1" src="https://github.com/user-attachments/assets/3c437d53-2065-471f-b673-ed47fb636f05" />
<img width="1919" height="968" alt="chatroom" src="https://github.com/user-attachments/assets/f13c2ba5-3a41-4d2b-8d44-c7133bc3c23c" />
<img width="1901" height="911" alt="chats" src="https://github.com/user-attachments/assets/b19b217e-d918-4a43-9f58-3ae6864b7986" />
