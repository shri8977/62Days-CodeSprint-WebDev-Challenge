const Appointment = require("../models/Appointment");

// Book Appointment
exports.bookAppointment = async (req, res) => {
  try {
    const { doctor, patient, appointmentDate, timeSlot } = req.body;

    // Prevent double booking
    const existing = await Appointment.findOne({
      doctor,
      appointmentDate,
      timeSlot,
      status: "Booked",
    });

    if (existing) {
      return res.status(400).json({
        message: "Time slot already booked",
      });
    }

    const appointment = await Appointment.create(req.body);

    res.status(201).json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// My Appointments
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor")
      .populate("patient", "name email");

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cancel Appointment
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: "Cancelled" },
      { new: true }
    );

    res.json(appointment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};