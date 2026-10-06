import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

function StandaloneApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  if (isAuthenticated) {
    return <h2>Login successful</h2>
  }

  return <App onLoginSuccess={() => setIsAuthenticated(true)} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <StandaloneApp />
  </StrictMode>,
)
