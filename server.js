const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/auth")
const uploadRoutes = require("./routes/upload")
const customerRoutes = require("./routes/customers")
const designRoutes = require("./routes/designs")
const scheduleRoutes = require("./routes/schedules")
const usersRoutes = require("./routes/users");


const app = express()

app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true,
}))
app.use(express.json({ limit: "5mb" }))
app.use(express.urlencoded({ extended: true, limit: "5mb" }))

app.use("/uploads", express.static("uploads"))
app.use("/api/customers", customerRoutes)
app.use("/api/designs", designRoutes)
app.use("/api/schedules", scheduleRoutes)
app.use("/api/users", usersRoutes);

//app.use(express.json({ limit: "5mb" }))
//app.use(express.urlencoded({ extended: true, limit: "5mb" }))



app.use("/api/auth", authRoutes)
app.use("/api/upload", uploadRoutes)

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("MongoDB connected")
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  )
})
.catch(err => console.error("MongoDB connection error:", err))