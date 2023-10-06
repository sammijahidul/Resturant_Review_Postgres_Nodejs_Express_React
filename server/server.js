require("dotenv").config();
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

// Get all resturants available in database
app.get("/api/v1/resturants", (req, res) => {
    try {
        res.status(200).json({
            status: 'success',
            data: {
                resturants: ['mcdonalds', 'kfc', 'starbucks']
            }
        })
    } 
    catch (error) {
        res.status(500).json({
            status: 'failed',
            error: "Error while getting resturants data"
        })
    }
});

// Get a resturant 
app.get("/api/v1/resturant/:id", (req, res) => {
    try {
        res.status(200).json({
            status: 'success',
            data: {
                resturant: 'mcdhonalds'
            }
        })
    } 
    catch (error) {
        res.status(500).json({
            status: 'failed',
            error: "Error while getting a resturant data"
        })    
    }
});

// Create a resturant information
app.post("/api/v1/resturant/create", (req, res) => {
    try {
        const {} = req.body;
        res.status(200).json({
            status: 'success',
            data: {
            }
        })       
    } 
    catch (error) {
        res.status(500).json({
            status: 'failed',
            error: "Error while creating a resturant data"
        })    
    }
});

// Update a resturant information
app.patch("/api/v1/resturant/:updateId", (req, res) => {
    try {
        const {} = req.params.id;
        res.status(200).json({
            status: 'success',
            data: {
                resturant: 'Information'
            }
        })
    } 
    catch (error) {
        res.status(500).json({
            status: 'failed',
            error: "Error while updating resturant information"
        })       
    }
});

// Delete a resturant information
app.delete("/api/v1/resturant/:deleteId", (req, res) => {
    try {
        const {} = req.params.id;
        res.json(200).json({
            status: 'success'
        })       
    } 
    catch (error) {
        res.status(500).json({
            status: 'failed',
            error: "Error while deleting a resturant info"
        })
    }
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
})