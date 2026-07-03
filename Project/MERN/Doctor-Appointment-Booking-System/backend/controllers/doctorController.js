const Doctor = require("../models/Doctor");

// GET all doctors
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate("user", "name email");
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET doctor by ID
exports.getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!doctor)
      return res.status(404).json({ message: "Doctor not found" });

    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE doctor
exports.createDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE doctor
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(doctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE doctor
exports.deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};