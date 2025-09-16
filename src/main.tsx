import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Products from './pages/Products.tsx'
import Balance from './pages/Balance.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
          <Route path="/products" element={<Products />} />
          <Route path="/balance" element={<Balance />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
