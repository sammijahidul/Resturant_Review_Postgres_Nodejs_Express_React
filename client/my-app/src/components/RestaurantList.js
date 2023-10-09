import React, {useContext, useEffect} from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantList = () => {
    const {restaurants, setRestaurants} =useContext(RestaurantsContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/");
                setRestaurants(response.data.data.restaurants)            
            } 
            catch (error) {   
                console.error('Error while fetching data', error);        
            }
        }
        fetchData();
        
    }, [setRestaurants]);

    const handleDelete = async (id) => {
        try {
            const response = await RestaurantFinder.delete(`/${id}`)
            console.log(response);
        } 
        catch (error) {
            console.log('Error while deleting a restaurant', error)
            
        }
    }
  
  return (
    <div className='list-group'>
        <table className='table table-hover table-dark'>
            <thead>
                <tr className='bg-primary'>
                    <th scope='col'>Restaurant</th>
                    <th scope='col'>Location</th>
                    <th scope='col'>Price range</th>
                    <th scope='col'>Ratings</th>
                    <th scope='col'>Edit</th>
                    <th scope='col'>Delete</th>
                </tr>              
            </thead>
            <tbody>
                {restaurants && restaurants.map((value, index) => {
                    return (
                        <tr key={value.id}>
                            <td>{value.name}</td>
                            <td>{value.location}</td>
                            <td>${value.price_range}</td>
                            <td>reviews</td>
                            <td><button className='btn btn-warning'>Update</button></td>
                            <td>
                                <button 
                                    onClick={() => 
                                        handleDelete(value.id)
                                    } 
                                    className='btn btn-danger'
                                >
                                    Delete
                                </button>
                            </td> 
                        </tr>
                    )
                })}
                {/* <tr>
                    <td>mcdonalds</td>
                    <td>New York</td>
                    <td>$3</td>
                    <td>Rating</td>
                    <td><button className='btn btn-warning'>Update</button></td>
                    <td><button className='btn btn-danger'>Delete</button></td>
                </tr> */}
            </tbody>
        </table>
    </div>
  )
}

export default RestaurantList;