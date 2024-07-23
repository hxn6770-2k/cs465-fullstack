// Bring in the DB connection and the Trip schema
const Mongoose = require('./db');
const Trip = require('./travlr');

// Read seed data from JSON file
const fs = require('fs');
const trips = JSON.parse(fs.readFileSync('./data/trips.json', 'utf8'));

// Delete any existing records, then insert seed data
const seedDB = async () => {
    try {
        await Trip.deleteMany({});
        await Trip.insertMany(trips);
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

// Close the MongoDB connection and exit
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
}).catch(error => {
    console.error("Error during seed process:", error);
    process.exit(1);
});
