import React, { useEffect, useState } from 'react'
import { CSpinner } from '@coreui/react'

const ChatbotWidget = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const initializeChatbot = async () => {
      try {
        // Load Flowise script dynamically
        const script = document.createElement('script')
        script.type = 'module'
        
        // Add custom styles for the chatbot
        const style = document.createElement('style')
        style.textContent = `
          .flowise-embed {
            --chatbot-container-bg-color: rgba(26, 26, 44, 0.95) !important;
            --chatbot-input-bg-color: #1e1e2f !important;
            --chatbot-input-text-color: #fff !important;
            --chatbot-input-border-color: rgba(255, 255, 255, 0.1) !important;
            --chatbot-message-bg-color: #1e1e2f !important;
            --chatbot-message-text-color: #fff !important;
            --chatbot-button-bg-color: rgba(54, 162, 235, 0.8) !important;
            --chatbot-button-text-color: #fff !important;
            --chatbot-header-bg-color: rgba(26, 26, 44, 0.95) !important;
            --chatbot-header-text-color: #fff !important;
            z-index: 9999 !important;
          }
        `
        document.head.appendChild(style)

        script.innerHTML = `
          import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
          Chatbot.init({
            chatflowid: "eff567e5-eb02-4e50-9af1-ed98af76cb6b",
            apiHost: "https://flowise-dev.deriv.ai",
            theme: {
              button: {
                backgroundColor: "rgba(54, 162, 235, 0.8)",
                right: 20,
                bottom: 20,
                size: "medium",
              },
              chatWindow: {
                welcomeMessage: "Hello! How can I help you today?",
                backgroundColor: "rgba(26, 26, 44, 0.95)",
                height: 550,
                width: 400,
                fontSize: 14,
                poweredByTextColor: "#fff",
                botMessage: {
                  backgroundColor: "#1e1e2f",
                  textColor: "#fff",
                  showAvatar: true,
                  avatarSrc: "/d.png"
                },
                userMessage: {
                  backgroundColor: "rgba(54, 162, 235, 0.8)",
                  textColor: "#fff",
                  showAvatar: true,
                }
              }
            }
          })
        `
        document.body.appendChild(script)
        setIsLoading(false)
      } catch (err) {
        console.error('Error initializing chatbot:', err)
        setError(err)
        setIsLoading(false)
      }
    }

    initializeChatbot()

    // Cleanup
    return () => {
      const scripts = document.querySelectorAll('script[type="module"]')
      scripts.forEach(script => {
        if (script.innerHTML.includes('flowise-embed')) {
          document.body.removeChild(script)
        }
      })
      const styles = document.querySelectorAll('style')
      styles.forEach(style => {
        if (style.textContent.includes('flowise-embed')) {
          document.head.removeChild(style)
        }
      })
    }
  }, [])

  if (error) {
    console.error('Chatbot error:', error)
    return null // Silently fail if there's an error
  }

  return isLoading ? (
    <div style={{ 
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      zIndex: 9999,
      background: 'rgba(26, 26, 44, 0.95)',
      padding: '10px',
      borderRadius: '50%'
    }}>
      <CSpinner size="sm" color="light" />
    </div>
  ) : null
}

export default ChatbotWidget
