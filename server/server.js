import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import query from './db/index.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Get all restaurants available in database
app.get("/api/v1/restaurants", async (req, res) => {
    try {
        const results = await query(
            "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id=reviews.restaurant_id;");
        if(results.rows.length === 0) {
            res.status(404).json({
                status: 'failed',
                message: 'No restaurant information found'
            })
        } else {
            res.status(200).json({
                status: 'success',
                results: results.rows.length,
                data: {
                    restaurants: results.rows,
                }
            })
        }      
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'failed',
            error: "Error while getting resturants data"
        })
    }
});

// Get a restaurant information
app.get("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const {id}= req.params;
        const restaurant = await query(
            "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id=reviews.restaurant_id where id = $1;", 
            [id]
        // `select * from restaurants where id = ${id}`
        // It's a bad practice to use `..... ` this query here, can get attack by sequel injection
        );
        const reviews = await query(
            "select * from reviews where restaurant_id = $1",
            [id]
        );
        
        if(restaurant.rows.length === 0) {
            res.status(404).json({
                status: 'failed',
                data: 'Not found any restaurant by this id'
            })
        } else {
            res.status(200).json({
                status: 'success',
                data: {
                    restaurant: restaurant.rows[0],
                    reviews: reviews.rows,
                }
            })
        }
    } 
    catch (error) {
        res.status(500).json({
            status: 'failed',
            error: "Error while getting a resturant data"
        })    
    }
});

// Create a resturant information
app.post("/api/v1/restaurants/create", async (req, res) => {
    try {
        const {name, location, price_range} = req.body;
        if (!name || !location || !price_range) {
            return res.status(400).json({
                status: 'failed',
                error: "All fields (name, location, price_range) are required."
            });
        }
        const result = await query(
            "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *", 
            [name, location, price_range]
        ); 
        res.status(201).json({
            status: 'success',
            data: {
                restaurant: result.rows[0],
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
app.patch("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, location, price_range } = req.body;
        const result = await query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *",
            [name, location, price_range, id]
        );
        if (result.rows.length === 0) { // Check if the restaurant with the given ID exists
            return res.status(404).json({
                status: 'failed',
                error: 'Restaurant not found'
            });
        } else {
            res.status(200).json({
                status: 'success',
                data: {
                    restaurant: result.rows[0]
                }
            })
        }      
    } 
    catch (error) {
         res.status(500).json({
            status: 'failed',
            error: "Error while updating resturant information"
        })       
    }
});

// Delete a resturant information
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    try {
        const { id } = req.params;

        await query(
            "DELETE FROM reviews WHERE restaurant_id = $1", [id]
        );

        const result = await query (
            "DELETE FROM restaurants WHERE id= $1", [id]
        );
        if(result.rowCount === 0) {
            res.status(404).json({
                status: 'failed',
                message: "Not found any record by this id"
            })
        } else {
            res.status(200).json({
                status: 'success',
                message: "Restaurant information deleted"
            })       
        }       
    } 
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'failed',
            error: "Error while deleting a resturant info"
        })
    }
});

// Create A Review on Restaurant
app.post("/api/v1/restaurants/review/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {restaurant_id, name, review, rating} = req.body;
        const newReview = await query(
            "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;", 
            [id, name, review, rating]
        );
        res.status(201).json({
            status: "success",
            data: {
                review: newReview.rows[0],
            }
        })       
    } 
    catch (error) {
        res.status(500).json({
            status: 'failed',
            message: "Error while creating a review"
        })       
    }
})
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
})