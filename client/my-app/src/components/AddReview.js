import React, { useContext, useEffect, useState } from 'react';
import RestaurantFinder from '../apis/RestaurantFinder';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddReview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("1");
  const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const response = await RestaurantFinder.post(`/review/${id}`, {
      name,
      review: reviewText,
      rating
    });

    // Update the context with the new data
    const updatedResponse = await RestaurantFinder.get(`/${id}`);
    setSelectedRestaurant(updatedResponse.data.data);

    // Navigate to the current page
    navigate(location.pathname);
  };

  useEffect(() => {
    // Fetch data and update context when the pathname changes
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      setSelectedRestaurant(response.data.data);
    };
    fetchData();
  }, [location.pathname, id, setSelectedRestaurant]);

  return (
    <div className='mb-2'>
      <form action=''>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder='name'
            type='text'
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='rating'>Rating</label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            id='rating'
            className='custom-select'
          >
            <option disabled>Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='Review'>Review</label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            id='Review'
            className='form-control'
          >
          </textarea>
        </div>
        <button onClick={handleSubmitReview} className='btn btn-primary'>
          Submit
        </button>
      </form>
      {/* {selectedRestaurant && (
        <div>
          <h2>{selectedRestaurant.name}</h2>
          <p>Address: {selectedRestaurant.location}</p>
          <p>Reviews:</p>
          <ul>
            {selectedRestaurant.reviews.map((review) => (
              <li key={review.id}>
                <p>Name: {review.name}</p>
                <p>Rating: {review.rating}</p>
                <p>Review: {review.review}</p>
              </li>
            ))}
          </ul>
        </div>
      )} */}
    </div>
  );
};

export default AddReview;












// import React, { useContext, useEffect, useState } from 'react';
// import RestaurantFinder from '../apis/RestaurantFinder';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { RestaurantsContext } from '../context/RestaurantsContext';


// const AddReview = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { id } = useParams();
//   const [name, setName] = useState("");
//   const [reviewText, setReviewText] = useState("");
//   const [rating, setRating] = useState("");
//   const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext);

//   const handleSubmitReview = async (e) => {
//     e.preventDefault();
//     const response = await RestaurantFinder.post(`/review/${id}`, {
//       name, 
//       review: reviewText,
//       rating
//     });
//   };

//   useEffect (() => {
//     const fetchData = async () => {
//       const response = await RestaurantFinder.get(`/${id}`);
//       setSelectedRestaurant(response.data.data)

//     }
//     fetchData();

//   },[location.pathname])
//   return (
//     <div className='mb-2'>
//       <form action=''>
//         <div className='form-row'>
//           <div className='form-group col-8'>
//             <label htmlFor='name'>Name</label>
//             <input 
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               id="name" 
//               placeholder='name' 
//               type='text' 
//               className='form-control'
//             />
//           </div>
//           <div className='form-group col-4'>
//             <label htmlFor='rating'>Rating</label>
//             <select 
//               value={rating}
//               onChange={(e) => setRating(e.target.value)}
//               id='rating' 
//               className='custom-select'>
//               <option disabled>Rating</option>
//               <option value="1">1</option>
//               <option value="2">2</option>
//               <option value="3">3</option>
//               <option value="4">4</option>
//               <option value="5">5</option>
//             </select>
//           </div>
//         </div>
//         <div className='form-group'>
//           <label htmlFor='Review'>Review</label>
//           <textarea 
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//             id='Review' 
//             className='form-control'
//           >
//           </textarea>
//         </div>
//         <button 
//           onClick={handleSubmitReview}
//           className='btn btn-primary'
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   )
// }

// export default AddReview;
