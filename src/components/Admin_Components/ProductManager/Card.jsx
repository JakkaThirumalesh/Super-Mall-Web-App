import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ title, description, image, category, shopId, productId, products }) => {
  const navigate = useNavigate();
  
  const handleReadMore = () => {
    navigate(`/view_shops/${shopId}/manage_products/${productId}`, { state: { products, shopId, category, productId } });
  };
  return (

    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-gray-300 mt-2">{description}</p>
        <p className="text-gray-300 mt-2">{category}</p>
        <button
          onClick={handleReadMore}
          className="inline-block mt-4 text-blue-400 hover:text-blue-300"
        >
          Read more &rarr;
        </button>
      </div>
    </div>
  );
};

export default Card;