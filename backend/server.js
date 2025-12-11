import express from "express"
import dotenv from "dotenv"
import cookiesParser from "cookie-parser"

dotenv.config()

const app = express()

app.use(express.json())
app.use(cookiesParser())

app.get("/", (req, res) => {
  res.send("Hello World!")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
