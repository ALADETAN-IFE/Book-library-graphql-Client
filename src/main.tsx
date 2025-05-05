import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ApolloProvider from "./context/ApolloProvider";

createRoot(document.getElementById('root')!).render(
<ApolloProvider>
  <StrictMode>
    <App />
  </StrictMode>,
  </ApolloProvider>
)
