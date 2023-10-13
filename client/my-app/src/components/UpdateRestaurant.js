import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';

const UpdateRestaurant = () => {
    const { id } = useParams();
    const { restaurants } = useContext(RestaurantsContext);
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [priceRange, setPriceRange] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`);
                const restaurantData = response.data.data.restaurant;
                console.log(restaurantData);
                setName(restaurantData.name || '');
                setLocation(restaurantData.location || '');
                setPriceRange(restaurantData.price_range || '');
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, [id]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Add code to handle form submission, such as sending updated data to the server.
    }

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        id='name'
                        name='name'
                        className='form-control'
                        type='text'
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='location'>Location</label>
                    <input
                        value={location}
                        onChange={e => setLocation(e.target.value)}
                        id='location'
                        name='location'
                        className='form-control'
                        type='text'
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='price_range'>Price Range</label>
                    <input
                        value={priceRange}
                        onChange={e => setPriceRange(e.target.value)}
                        id='price_range'
                        name='price_range'
                        className='form-control'
                        type='number'
                    />
                </div>
                <button className='btn btn-primary' type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default UpdateRestaurant;
