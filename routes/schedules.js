const express = require("express")
const Schedule = require("../models/Schedule")
const verifyToken = require("../middleware/auth")

const router = express.Router()


router.get("/:date", verifyToken, async (req, res) => {
  const schedule = await Schedule.findOne({ date: req.params.date, userId: req.user.id })
  res.json(schedule || { date: req.params.date, deliveries: [] })
})


router.post("/:date", verifyToken, async (req, res) => {
  const { customerId, comment, designId } = req.body
  const date = req.params.date

  let schedule = await Schedule.findOne({ date, userId: req.user.id })

  if (!schedule) {
    schedule = new Schedule({ date, userId: req.user.id, deliveries: [] })
  }

  const alreadyExists = schedule.deliveries.some(d => d.customerId === customerId)

  if (!alreadyExists) {
    schedule.deliveries.push({ customerId, comment, designId })
    await schedule.save()
  }

  res.status(201).json(schedule)
})


router.delete("/:date/:customerId", verifyToken, async (req, res) => {
  const { date, customerId } = req.params

  const schedule = await Schedule.findOne({ date, userId: req.user.id })

  if (!schedule) {
    return res.status(404).json({ message: "Schedule not found" })
  }

  schedule.deliveries = schedule.deliveries.filter(
    d => d.customerId !== customerId
  )

  await schedule.save()
  res.json(schedule)
})

module.exports = router