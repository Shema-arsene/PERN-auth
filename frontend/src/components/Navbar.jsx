import React from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`)
    setUser(null)
    navigate("/login")
  }

  return (
    <header className="bg-gray-800 p-3 text-white flex items-center justify-between">
      <Link to="/" className="font-bold">
        PERN Auth
      </Link>
      {user ? (
        <div className="flex items-center gap-4">
          <p className="font-bold">{user.name}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <nav>
          <ul className="flex gap-4">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Navbar
