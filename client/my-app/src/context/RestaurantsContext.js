import React, { useState, createContext } from 'react';

export const RestaurantsContext = createContext();

export const RestaurantContextProvider = (props) => {
    const [restaurants, setRestaurants] = useState([]);
    const addRestaurants = (restaurent) => {
        setRestaurants([...restaurants, restaurent]);
    };

    return (
        <RestaurantsContext.Provider value={{ restaurants, setRestaurants, addRestaurants }}>
            {props.children}
        </RestaurantsContext.Provider>
    )
};