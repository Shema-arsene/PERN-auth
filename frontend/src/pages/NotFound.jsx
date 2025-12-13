import React from "react"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <main className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-2xl">
      <h1>404 Page Not Found</h1>
      <Link
        to="/"
        className="bg-blue-500 text-white font-medium mt-3 px-3 py-1 w-fit rounded-md cursor-pointer hover:bg-blue-600"
      >
        Back Home
      </Link>
    </main>
  )
}

export default NotFound
