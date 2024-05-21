import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ReduxProvider from './provider/redux-provider.tsx'
import ClerkReactProvider from './provider/clerk-provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider>
      <ClerkReactProvider>
        <App />
      </ClerkReactProvider>
    </ReduxProvider>
  </React.StrictMode>,
)
