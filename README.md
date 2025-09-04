# 🌤️ Weather Agent Chat Interface 

[Weather Agent Chat](https://weather-chat-delta.vercel.app/)

[GitHub Repository](https://github.com/SidW111/weather-chat)


A responsive chat application that connects to the **Weather Agent API** and allows users to query weather information in a conversational format.

---

## My Approach

Step 1: Set up a basic Next.js app with Tailwind CSS.

Step 2: Integrated Weather Agent API using fetch with streaming response handling.

Step 3: Built a responsive chat layout with message bubbles.

Step 4: Managed chat state with useState and auto-scroll using useRef.

Step 5: Implemented Dark/Light mode and smooth animations for polish.

Step 6: Added UX improvements :- loading states, error handling, input disable during API calls.

Step 7: Implemented Export chat functionality.

Step 8: Implemented Responsiveness for all devices.


---


## 🚀 Features Implemented  

- **Chat Interface**
  - Message input field with send button  
  - Display conversation history with auto-scroll  
  - User messages on the right, agent responses on the left 

- **API Integration**
  - Integrated with Weather Agent streaming API  
  - Real-time response handling (streaming)  
  - Loading state indicators during API calls  
  - Proper error handling (network/API failures)  

- **UI/UX**
  - Responsive design (mobile-first, works on desktop/tablet/mobile)  
  - Clean, modern layout with Tailwind CSS  
  - Enter key support for sending messages  
  - Disabled input while waiting for API response
  - Disabled send button while waitinf for API response 
  - Message timestamps for better context

  
- **Enhancements**
  - Dark/Light mode toggle 🌙☀️  
  - Typing indicator for agent responses ⌨️  
  - Smooth animations & transitions
  - Export Chat Functionality
  - Limit of 150 character to input
  - Disabled send button when no input is present

 
---


### ✅ Code Quality  
- Clean, readable, and well-structured code  
- Proper component-based architecture  
- Meaningful variable and function names   

### ✅ Performance  
- Efficient re-rendering with React hooks  
- Proper state management using `useState` and `useEffect`  
- Optimized API calls with streaming support (avoiding unnecessary re-fetches)  

### ✅ Error Handling  
- Handled **network failures** with fallback error messages  
- Handled **API errors** (invalid/malformed responses)  
- User-friendly error states displayed in the chat window  
- Disabled input during API requests to prevent multiple accidental calls  


## 🛠️ Tech Stack Used

- **Framework:** Next.js 15 (App Router)  
- **Styling:** Tailwind CSS  
- **API:** Weather Agent Streaming API  
- **State Management:** Used React Hooks  (`useState`, `useEffect`, `useRef`)  

---

## ⚠️ Assumptions

- API always returns weather-related responses in English.

- Agent responses are text-based only (no media support).

- streaming responses are handled line by line until completion.

---

## 🚧 Known Limitations

No message search functionality yet.

Chat history resets on page reload (not persisted to local storage or DB).

---

## ✨ Built with ❤️ using Next.js, Tailwind, and Weather Agent API

---

## ⚙️ Setup Instructions  

Follow these steps to set up and run the project locally:  

### 1️⃣ Prerequisites  
- Install [Node.js](https://nodejs.org/) (version 18 or higher recommended)  
- Install [Git](https://git-scm.com/)  

### 2️⃣ Clone the repository  
```bash
git clone https://github.com/your-username/weather-agent-chat.git
cd weather-agent-chat
```

### 3️⃣ Install dependencies 
```bash
npm install
```

### 4️⃣ Start the development server
```bash
npm run dev
```
Now open https://localhost:3000 in your browser
