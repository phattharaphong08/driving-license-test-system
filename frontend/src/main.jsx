import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Modal from "react-modal";

import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '../configs/queryClient.js';

Modal.setAppElement("#root");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
