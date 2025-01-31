import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App'
import { Toaster } from "sonner";
import { UserProvider } from './userContext'; // Importa o contexto criado

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <UserProvider>
      <App />
      <Toaster position="top-right" richColors />
    </UserProvider>
  </React.StrictMode>,
)
