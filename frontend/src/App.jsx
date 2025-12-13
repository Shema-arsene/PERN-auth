import { useEffect, useState } from "react"
import axios from "axios"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"

axios.defaults.withCredentials = true

const App = () => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/auth/me")
      setUser(response.data.user)
    } catch (error) {
      setUser(null)
      console.error("Error fetching user:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  if (loading) {
    return (
      <section className="h-screen w-full flex items-center justify-center">
        <h1 className="font-semibold">Loading...</h1>
      </section>
    )
  }

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        {/* Home route */}
        <Route path="/" element={<Home user={user} error={error} />} />

        {/* Auth route */}
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />

        {/* Not found route */}
        <Route path="*" element={<NotFound />} />

        {/* Option to redirect to home page once user access non existing route */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </Router>
  )
}

export default App
