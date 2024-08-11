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

// POST: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async (req, res) => {
    const newTrip = new Trip({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    try {
        const q = await newTrip.save();
        return res
            .status(201)
            .json(q);
    } catch (err) {
        return res
            .status(400)
            .json({ message: "Failed to add trip", error: err });
    }
}

// PUT: /trips/:tripCode - Updates an existing Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
    // Uncomment for debugging
    console.log(req.params);
    console.log(req.body);

    const q = await Trip.findOneAndUpdate(
        { 'code': req.params.tripCode },  // Find document where 'code' matches the provided tripCode
        {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        },
    )
    .exec();

    if (!q) {
        // If no document is found or updated
        return res
            .status(400)
            .json({ message: "Failed to update trip" });
    } else {
        // If the document is successfully updated
        return res
            .status(201) // Status code 200 indicates successful update
            .json(q);
    }

    // Uncomment the following line to show results of the operation on the console
    // console.log(q);
};


module.exports = {
    tripsList, // Ensure the exported function name matches the declared function name
    tripsFindByCode, // Add tripsFindByCode to the module exports
    tripsAddTrip,
    tripsUpdateTrip
};
