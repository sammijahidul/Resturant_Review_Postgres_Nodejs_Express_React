import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantsContext';
import RestaurantFinder from '../apis/RestaurantFinder';

const RestaurantDetailsPage = () => {
  const { id } = useParams();
  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);
        setSelectedRestaurant(response.data.data.restaurant);
      } 
      catch (error) {
        console.log(error);
      }      
    };
    fetchData();

  }, [])
  return (
    <div>
      {selectedRestaurant && selectedRestaurant.name}
    </div>
  )
}

export default RestaurantDetailsPage;