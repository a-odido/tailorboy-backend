const express = require("express")
const Design = require("../models/Design")
const verifyToken = require("../middleware/auth")
const upload = require("../middleware/upload")

const router = express.Router()

router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body
    const imageUrl = req.file
      ? `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
      : ""

    const design = new Design({
      title,
      description,
      imageUrl,
      userId: req.user.id
    })

    await design.save()
    res.status(201).json(design)
  } catch (err) {
    res.status(500).json({ message: "Error creating design", error: err.message })
  }
})


router.get("/", verifyToken, async (req, res) => {
  const designs = await Design.find({ userId: req.user.id }).sort({ createdAt: -1 })
  res.json(designs)
})


router.get("/:id", verifyToken, async (req, res) => {
  const design = await Design.findOne({ _id: req.params.id, userId: req.user.id })
  if (!design) return res.status(404).json({ message: "Design not found" })
  res.json(design)
})


router.delete("/:id", verifyToken, async (req, res) => {
  const deleted = await Design.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id
  })

  if (!deleted) {
    return res.status(404).json({ message: "Design not found or unauthorized" })
  }

  res.json({ message: "Design deleted" })
})

module.exports = router