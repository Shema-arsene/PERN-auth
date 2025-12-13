import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Register = ({ setUser }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/register`,
        form
      )
      setUser(response.data)
      navigate("/")
    } catch (error) {
      setError("Registration failed")
      console.error("Error during registering:", error)
    }
  }

  return (
    <section className="p-5 min-h-screen flex items-center justify-center">
      <form
        className="bg-white p-6 rounded shadow-md min-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="font-semibold text-center my-5">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div>
          <label htmlFor="name">Name: </label>
          <br />
          <input
            type="text"
            placeholder="name"
            name="name"
            id="name"
            className="border border-gray-500 p-0.5 mb-2 w-full rounded"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="email">Email: </label>
          <br />
          <input
            type="email"
            placeholder="email"
            name="email"
            id="email"
            className="border border-gray-500 p-0.5 mb-2 w-full rounded"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <br />
          <input
            type="password"
            placeholder="password"
            name="password"
            id="password"
            className="border border-gray-500 p-0.5 mb-2 w-full rounded"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white font-medium mt-3 px-3 py-1 w-full rounded-md cursor-pointer hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </section>
  )
}

export default Register
