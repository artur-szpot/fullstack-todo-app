import { BrowserRouter, Route, Routes } from "react-router"

import { Footer } from "./components/Footer"
import { Navbar } from "./components/Navbar"
import { AdminPanel } from "./routes/AdminPanel"
import { Dashboard } from "./routes/Dashboard"
import { Signin } from "./routes/Signin"
import { Signup } from "./routes/Signup"

import "./css/index.scss"

export const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin">
            <Route
              path="permissions"
              element={<AdminPanel content="permissions" />}
            />
            <Route path="roles" element={<AdminPanel content="roles" />} />
            <Route path="users" element={<AdminPanel content="users" />} />
          </Route>
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}
