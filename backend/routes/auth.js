import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import pool from "../config/db.js"
import protect from "../middleware/authMiddleware.js"

const router = express.Router()

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
}

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}

// Register User
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" })
  }

  const existingUser = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  )

  if (existingUser.rows.length > 0) {
    return res.status(400).json({ message: "User already exists" })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const newUser = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
    [name, email, hashedPassword]
  )

  const token = generateToken(newUser.rows[0].id)

  // Storing the token in the cookie
  res
    .cookie("token", token, cookieOptions)
    .status(201)
    .json({ user: newUser.rows[0], token })

  return res.status(201).json({ user: newUser.rows[0], token })
})

// Login User
router.post("/login", async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide your email and password" })
  }

  const user = await pool.query("SELECT * FROM users WHERE email = $1", [email])

  if (user.rows.length === 0) {
    return res.status(400).json({ message: "Invalid credentials" })
  }

  const userData = user.rows[0]

  const isMatch = await bcrypt.compare(password, user.rows[0].password)

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" })
  }

  const token = generateToken(userData.id)

  // Storing the token in the cookie
  res.cookie("token", token, cookieOptions)

  res.json({
    user: {
      id: userData.id,
      name: userData.name,
      email: userData.email,
    },
    token,
  })
})

// Me: to get the data for logged in user
router.get("/me", protect, async (req, res) => {
  res.json(req.user)
  //   Return the information about the logged in user from 'protected' middleware
})

// Logout

// Option 1

// router.post("/logout", (req, res) => {
//   res.clearCookie("token", cookieOptions)
//   res.json({ message: "Logged out successfully" })
// })

// Option 2

router.post("/logout", (req, res) => {
  res.cookie("token", "", { ...cookieOptions, maxAge: 0 })
  res.json({ message: "User logged out successfully" })
})

export default router
