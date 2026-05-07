import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootswatch/dist/darkly/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom"
import { ProductProvider } from "./context/ProductContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
      <ProductProvider>
        <App />
      </ProductProvider>
    </div>
    </BrowserRouter>
  </StrictMode>
)
