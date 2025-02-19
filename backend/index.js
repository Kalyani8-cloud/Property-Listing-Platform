// Importing Dependencies
const express = require('express'); // Express framework for creating the server
const cors = require('cors'); // CORS middleware to allow cross-origin requests

const app = express(); // Initializing Express app
const port = 5000; // Defining the server port

app.use(cors()); // Enabling CORS for handling cross-origin requests

// Defining a sample property schema (for reference, not enforced in the code)
const propertySchema = {
    name: String,
    description: String,
    numberOfRooms: Number,
    washroom: Number,
    kitchen: Boolean,
    hall: Boolean,
    amenities: [String]
};

// Temporary storage for properties (simulating a database)
let properties = [
    {
        id: 1,
        name: "Luxury Beachfront Villa",
        location: "Malibu, California",
        room: 7,
        img: "https://cdn-icons-png.flaticon.com/512/48/48770.png",
        price: 1500000,
        amenities: ["Private Beach Access", "Infinity Pool", "Home Theater"]
    },
    {
        id: 2,
        name: "Charming Cottage",
        location: "Cotswolds, England",
        room: 3,
        img: "https://cdn-icons-png.flaticon.com/512/48/48775.png",
        price: 400000,
        amenities: ["Fireplace", "Garden", "Country Views"]
    },
    {
        id: 3,
        name: "Modern Downtown Loft",
        location: "New York City, New York",
        room: 2,
        img: "https://cdn-icons-png.flaticon.com/512/47/47636.png",
        price: 800000,
        amenities: ["City Views", "Gym", "Concierge Service"]
    },
    {
        id: 4,
        name: "Rustic Mountain Cabin",
        location: "Aspen, Colorado",
        room: 4,
        img: "https://cdn-icons-png.flaticon.com/512/209/209357.png",
        price: 600000,
        amenities: ["Hot Tub", "Ski-In/Ski-Out Access", "Wood-Burning Fireplace"]
    },
    {
        id: 5,
        name: "Paris Apartment",
        location: "Paris, France",
        room: 6,
        img: "https://cdn-icons-png.flaticon.com/256/509/509790.png",
        price: 2500000,
        amenities: ["Terrace", "Panoramic City Views", "24/7 Security"]
    },
    {
        id: 6,
        name: "Secluded Lakeside Retreat",
        location: "Lake District, England",
        room: 5,
        img: "https://cdn-icons-png.flaticon.com/512/58/58167.png",
        price: 1000000,
        amenities: ["Private Dock", "Boathouse", "Tranquil Surroundings"]
    }
];

// Route to list all properties
app.get('/properties', (req, res) => {
    res.json(properties); // Responds with the list of properties in JSON format
});

// Route to create a new property
app.post('/properties', (req, res) => {
    const newProperty = req.body; // Retrieves the new property data from the request body
    properties.push(newProperty); // Adds the new property to the temporary array
    res.status(201).json({ // Sends a success response with the created property
        message: 'Property created successfully',
        property: newProperty
    });
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`); // Logs that the server is running
});
