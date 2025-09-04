# 🌤️ Weather Agent Chat Interface 

[Weather Agent Chat](https://weather-chat-delta.vercel.app/) here!  
[GitHub Repository](https://github.com/SidW111/weather-chat)


A responsive chat application that connects to the **Weather Agent API** and allows users to query weather information in a conversational format.  

This project was built as part of the **Frontend Engineer Assignment**.  

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
  - Message timestamps for better context  

- **Enhancements**
  - Dark/Light mode toggle 🌙☀️  
  - Typing indicator for agent responses ⌨️  
  - Smooth animations & transitions  

---

## 🛠️ Tech Stack  

- **Framework:** Next.js 15 (App Router)  
- **Styling:** Tailwind CSS  
- **API:** Weather Agent Streaming API  
- **State Management:** React Hooks (`useState`, `useEffect`, `useRef`)  

---

## 📡 API Specification  

**Endpoint:**  
```http
POST https://millions-screeching-vultur.mastra.cloud/api/agents/weatherAgent/stream
