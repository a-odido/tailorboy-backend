const express = require("express");
const Schedule = require("../models/Schedule");
const Customer = require("../models/Customer");
const Design = require("../models/Design");
const verifyToken = require("../middleware/auth");

const router = express.Router();

// GET schedule by date
router.get("/:date", verifyToken, async (req, res) => {
  const schedule = await Schedule.findOne({
    date: req.params.date,
    userId: req.user.id,
  });
  res.json(schedule || { date: req.params.date, deliveries: [] });
});

// POST to create or update schedule
router.post("/:date", verifyToken, async (req, res) => {
  const { customerId, comment, designId } = req.body;
  const date = req.params.date;

  try {
    // Validate customer ID
    const customer = await Customer.findOne({ _id: customerId, userId: req.user.id });
    if (!customer) {
      return res.status(400).json({ message: "Invalid or unauthorized customer ID" });
    }

    // Validate design ID
    const design = await Design.findOne({ _id: designId, userId: req.user.id });
    if (!design) {
      return res.status(400).json({ message: "Invalid or unauthorized design ID" });
    }

    let schedule = await Schedule.findOne({ date, userId: req.user.id });

    if (!schedule) {
      schedule = new Schedule({ date, userId: req.user.id, deliveries: [] });
    }

    const alreadyExists = schedule.deliveries.some((d) => d.customerId === customerId);

    if (!alreadyExists) {
      schedule.deliveries.push({ customerId, comment, designId });
      await schedule.save();
    }

    res.status(201).json(schedule);
  } catch (err) {
    res.status(500).json({ message: "Error saving schedule", error: err.message });
  }
});

// DELETE a scheduled delivery
router.delete("/:date/:customerId", verifyToken, async (req, res) => {
  const { date, customerId } = req.params;

  try {
    const schedule = await Schedule.findOne({ date, userId: req.user.id });

    if (!schedule) {
      return res.status(404).json({ message: "Schedule not found" });
    }

    const initialLength = schedule.deliveries.length;

    schedule.deliveries = schedule.deliveries.filter(
      (d) => d.customerId !== customerId
    );

    if (schedule.deliveries.length === initialLength) {
      return res.status(404).json({ message: "Customer delivery not found in schedule" });
    }

    await schedule.save();
    return res.json({ message: "Customer delivery removed from schedule" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting customer from schedule", error: error.message });
  }
});

module.exports = router;