import { MapCoordinatesProvider } from './context/CoordinatesContext';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <MapCoordinatesProvider>
    <StrictMode>
      <App />
    </StrictMode> 
  </MapCoordinatesProvider>,
)
