const multer = require("multer")
const path = require("path")

// Set up storage destination and filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext
    cb(null, uniqueName)
  },
})

const fileFilter = (req, file, cb) => {
  // Accept only images
  if (file.mimetype.startsWith("image/")) {
    cb(null, true)
  } else {
    cb(new Error("Only image files are allowed!"), false)
  }
}

const upload = multer({ storage, fileFilter })

module.exports = upload
