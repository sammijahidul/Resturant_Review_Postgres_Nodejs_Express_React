import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import RestaurantDetailsPage from './pages/RestaurantDetailsPage';
import UpdatePage from './pages/UpdatePage';
import { RestaurantContextProvider } from './context/RestaurantsContext';

function App() {
  return (
    <RestaurantContextProvider>
      <div className="container">
        <Router>
          <Routes>
            <Route path="/" exact  Component={HomePage} />
            <Route path="/restaurant/:id" exact  Component={RestaurantDetailsPage} />
            <Route path="/restaurant/update/:id" exact  Component={UpdatePage} />
          </Routes>
        </Router>
      </div>
    </RestaurantContextProvider>
  );
}

export default App;
