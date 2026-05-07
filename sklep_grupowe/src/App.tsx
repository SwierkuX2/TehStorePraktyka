import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from "./pages/Home"
import { Store } from "./pages/Store"
import { About } from "./pages/About"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Admin from "./pages/Admin"
import { Navbar } from "./components/Navbar"
import { Footer } from "./components/Footer"
import { ShoppingCartProvider } from "./context/ShoppingCartContext"

function App() {
  return (
    <><ShoppingCartProvider>
      <Navbar />
      <Container className="mb-4 ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store  />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
    <div style={{ marginTop: "auto"}}>
    <Footer />
    </div>
    </>
  )
}

export default App
