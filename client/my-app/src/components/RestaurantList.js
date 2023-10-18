import React, {useContext, useEffect} from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useNavigate } from 'react-router-dom';
import StarRating from './StarRating';

const RestaurantList = (props) => {
    let navigate = useNavigate();
    const {restaurants, setRestaurants} =useContext(RestaurantsContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/");
                console.log(response.data.data);
                setRestaurants(response.data.data.restaurants)            
            } 
            catch (error) {   
                console.error('Error while fetching data', error);        
            }
        }
        fetchData();
        
    }, [setRestaurants]);

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await RestaurantFinder.delete(`/${id}`)
            setRestaurants(
                restaurants.filter(value => {
                   return value.id !== id
            }))
        } 
        catch (error) {
            console.log('Error while deleting a restaurant', error)           
        }
    };

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        navigate(`/restaurant/update/${id}`);
    };

    const handleRestaurantSelect = (id) => {
        navigate(`/restaurant/${id}`)
    };

    const renderRating = (value) => {
        if(!value.count) {
            return <span className='text-warning'>0 reviews</span>
        }
        return (
            <>
                <StarRating rating={value.average_rating}/>
                <span className='text-warning ml-1'>({value.count})</span>
            </>            
    )}
  
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
                {restaurants && 
                  restaurants.map((value) => {
                    return (
                        <tr 
                            onClick={() => handleRestaurantSelect(value.id)}
                            key={value.id}
                        >
                            <td>{value.name}</td>
                            <td>{value.location}</td>
                            <td>${value.price_range}</td>
                            <td>{renderRating(value)}</td>
                            <td>
                                <button 
                                    onClick={(e) => 
                                        handleUpdate(e, value.id)
                                    }
                                    className='btn btn-warning'
                                >
                                    Update
                                </button>
                            </td>
                            <td>
                                <button 
                                    onClick={(e) => 
                                        handleDelete(e, value.id)
                                    } 
                                    className='btn btn-danger'
                                >
                                    Delete
                                </button>
                            </td> 
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default RestaurantList;