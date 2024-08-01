const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code and JSON message to the requesting client
const tripsList = async (req, res) => {
    const q = await Trip.find().exec();

    if (!q) {
        return res
            .status(404)
            .json({ message: "No trips found" });
    } else {
        return res
            .status(200)
            .json(q);
    }
}

// Define the tripsFindByCode function
const tripsFindByCode = async (req, res) => {
    const q = await Trip.findOne({ 'code': req.params.tripCode }).exec(); // Return single record

    if (!q) {
        return res
            .status(404)
            .json({ message: "Trip not found" });
    } else {
        return res
            .status(200)
            .json(q);
    }
}

module.exports = {
    tripsList, // Ensure the exported function name matches the declared function name
    tripsFindByCode // Add tripsFindByCode to the module exports
};
