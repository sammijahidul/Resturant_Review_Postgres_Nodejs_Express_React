import React from 'react'
import Header from '../components/Header'
import AddRestaurants from '../components/AddRestaurants';
import RestaurantList from '../components/RestaurantList';

const HomePage = () => {
  return (
    <div>
      <Header />
      <AddRestaurants />
      <RestaurantList />
    </div>
  )
}

export default HomePage;