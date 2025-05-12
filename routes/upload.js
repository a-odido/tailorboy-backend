const express = require("express")
const upload = require("../middleware/upload")
const verifyToken = require("../middleware/auth")

const router = express.Router()

router.post("/image", verifyToken, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No image uploaded" })
  }

  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`

  res.status(200).json({ imageUrl: fileUrl })
})

module.exports = router
