# 🌤️ Weather Agent Chat Interface 

[Weather Agent Chat](https://weather-chat-delta.vercel.app/)

[GitHub Repository](https://github.com/SidW111/weather-chat)


A responsive chat application that connects to the **Weather Agent API** and allows users to query weather information in a conversational format.  


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

## 📡 API Specification  

**Endpoint:**  
```http
POST https://millions-screeching-vultur.mastra.cloud/api/agents/weatherAgent/stream
