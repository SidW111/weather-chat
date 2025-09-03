'use client'

import { useTheme } from "next-themes"

export default function ToggleButton(){
    const {theme,setTheme} = useTheme();
    return <div className="flex justify-end">
          <div
            className={`
             w-14 h-8 flex items-center rounded-full transition-colors duration-300
            ${
              theme === "dark"
                ? "justify-end bg-gray-700"
                : "justify-start bg-gray-200"
            }
          `}
          >
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle dark mode"
              className={`
              w-7 h-7 flex items-center justify-center rounded-full shadow-md
              transition-all duration-500
              ${theme === "dark" ? "bg-white" : "bg-gray-900"}
            `}
            >
              {theme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-800"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 11a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4-11a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM3 10a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zm14 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1zM6.586 4.707a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zm4.828 10.166a1 1 0 01-1.414 0l-.707-.707a1 1 0 011.414-1.414l.707.707a1 1 0 010 1.414zm-1.414-8.828a1 1 0 010-1.414l.707-.707a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707zm5.536 7.232a1 1 0 011.414 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
}