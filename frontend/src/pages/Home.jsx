import React from "react"
import { Link } from "react-router-dom"

const Home = ({ user, error }) => {
  return (
    <main className="min-h-[80vh] flex items-center justify-center gap-5 p-5">
      <div className="bg-white p-5 rounded-lg shadow-md w-full max-w-lg text-center">
        {error && <p className="text-red-500">{error}</p>}
        {user ? (
          <div>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
              Welcome, {user.name}
            </h1>

            <p className="text-gray-600">Email: {user.email}</p>
          </div>
        ) : (
          <div>
            <h1 className="text-xl my-5 text-gray-800 font-bold text-center">
              Please Login or Register!
            </h1>
            <div className="flex flex-col gap-y-4">
              <Link
                to="/login"
                className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-700 font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md hover:bg-gray-300 font-medium"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default Home
