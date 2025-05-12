const express = require("express")
const Customer = require("../models/Customer")
const verifyToken = require("../middleware/auth")

const router = express.Router()

router.post("/", verifyToken, async (req, res) => {
  try {
    const customer = new Customer({
      ...req.body,
      userId: req.user.id
    })
    await customer.save()
    res.status(201).json(customer)
  } catch (err) {
    res.status(500).json({ message: "Error creating customer", error: err.message })
  }
})

router.get("/", verifyToken, async (req, res) => {
  const customers = await Customer.find({ userId: req.user.id }).sort({ name: 1 })
  res.json(customers)
})

router.get("/:id", verifyToken, async (req, res) => {
  const customer = await Customer.findOne({ _id: req.params.id, userId: req.user.id })
  if (!customer) return res.status(404).json({ message: "Customer not found" })
  res.json(customer)
})

router.put("/:id", verifyToken, async (req, res) => {
  const updated = await Customer.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { ...req.body, updatedAt: new Date() },
    { new: true }
  )
  if (!updated) return res.status(404).json({ message: "Customer not found or unauthorized" })
  res.json(updated)
})

router.delete("/:id", verifyToken, async (req, res) => {
  const deleted = await Customer.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id
  })
  if (!deleted) return res.status(404).json({ message: "Customer not found or unauthorized" })
  res.json({ message: "Customer deleted" })
  
})

module.exports = router