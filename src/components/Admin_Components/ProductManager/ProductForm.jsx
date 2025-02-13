import React, { useState } from 'react';

const ProductForm = ({ onSubmit, onCancel, category }) => {

  const [newProduct, setNewProduct] = useState({
    productId:'',
    name: '',
    description: '',
    price: '',
    features: '',
    category: category,
    image: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'features') {
      setNewProduct({ ...newProduct, features: value });
    } else if (name === 'image1') {
      setNewProduct({ ...newProduct, image: value });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(newProduct);
    setNewProduct({
      productId:'',
      name: '',
      description: '',
      price: '',
      features: '',
      category: category,
      image: '',
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Add New Product</h2>
        
        <div className="mb-4">
          <label className="block text-gray-300 mb-1" htmlFor="productId">Product Id</label>
          <input
            type="text"
            id="productId"
            name="productId"
            value={newProduct.productId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-1" htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-1" htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-1" htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-300 mb-1" htmlFor="features">Features (comma separated)</label>
          <input
            type="text"
            id="features"
            name="features"
            value={newProduct.features}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            required
          />
        </div>
       

        <div className="mb-4">
          <label className="block text-gray-300 mb-1" htmlFor="image1">Image 1 URL</label>
          <input
            type="text"
            id="image1"
            name="image1"
            value={newProduct.image || ''}
            onChange={handleChange}
            className="w-full p-2 border border-gray-600 rounded bg-gray-700 text-white"
            required
          />
        </div>
        <h1 className='text-lg my-3 font-bold px-3 py-2 text-center rounded-md border-1 bg-slate-700'>Category: <span>{category}</span></h1>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold px-4 py-2 rounded"
          >
            Add
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductForm;