import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useTheme } from '../../../hooks/Context/ThemeContext';

const ShopList = () => {
  const { category_name } = useParams();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const [shops, setShops] = useState([]);
  const [sortOption, setSortOption] = useState('floorNumber');
  const [isAscending, setIsAscending] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Access the passed shop data
  const shopData = location.state?.shop;

  useEffect(() => {
    if (shopData) {
      console.log('Received shop data:', shopData);
      setShops([shopData]); // Set the shop data to display
    } else {
      // Fetch shops by category if no specific shop data is passed
      const fetchShops = async () => {
        try {
          const response = await fetch(`/api/shops?category=${category_name}`);
          const data = await response.json();
          setShops(data);
        } catch (error) {
          console.error('Error fetching shops:', error);
        }
      };

      fetchShops();
    }
  }, [category_name, shopData]);

  const handleSortChange = (option) => {
    setSortOption(option);
    setIsAscending(!isAscending);
  };

  const sortedShops = [...shops]
    .filter(shop => shop.shopNumber.includes(searchTerm))
    .sort((a, b) => {
      if (isAscending) {
        return a[sortOption] > b[sortOption] ? 1 : -1;
      } else {
        return a[sortOption] < b[sortOption] ? 1 : -1;
      }
    });

  const handleShopClick = (shopId) => {
    navigate(`/shop/${shopId}`);
  };

  return (
    <div className="shop-list container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Category: {category_name} Shops</h1>
      <div className="filters mb-6">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Floor Number:</label>
            <select 
              onChange={(e) => handleSortChange('floorNumber')}
              className="px-3 py-2 text-zinc-100 border-0 bg-zinc-800 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">Shop Number:</label>
            <input
              type="text"
              placeholder="Search by Shop Number"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 text-zinc-100 border-0 bg-zinc-800 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      <ul className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`}>
        {sortedShops.length > 0 ? (
          sortedShops.map(shop => (
            <li key={shop.id} className={`shop-item ${!isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} p-4 rounded-lg shadow-md`}>
              <h2 className="text-xl font-semibold">{shop.name}</h2>
              <p>Shop Number: {shop.shopNumber}</p>
              <p>Floor: {shop.floor}</p>
              <p>Category: {shop.category}</p>
              <p>Owner: {shop.ownerDetails.ownerName}</p>
              <p>Rating: ⭐⭐⭐⭐ (4.5/5)</p>
              <p>Current Offer: 20% Off on Laptops</p>
              <button
                onClick={() => handleShopClick(shop.id)}
                className="mt-2 text-blue-600 hover:underline"
              >
                View Details
              </button>
            </li>
          ))
        ) : (
          <p>No shops found in this category. Please try a different search or filter.</p>
        )}
      </ul>
      {/* Pagination or Infinite Scroll logic can be added here */}
    </div>
  );
};

export default ShopList;