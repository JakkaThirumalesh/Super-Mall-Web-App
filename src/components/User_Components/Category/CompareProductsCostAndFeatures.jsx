import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Smart TV A",
    price: 999,
    features: ["4K", "HDR", "Smart OS"],
  },
  {
    id: 2,
    name: "Smart TV B",
    price: 1099,
    features: ["4K", "HDR", "Smart OS", "Voice Control"],
  },
  { id: 3, name: "Smart TV C", price: 899, features: ["4K", "Smart OS"] },
];

const CompareProducts = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleProductSelect = (product) => {
    if (selectedProducts.length < 2) {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const handleRemoveProduct = (productId) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== productId));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Compare Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">Price: ${product.price}</p>
            <ul className="mt-2">
              {product.features.map((feature, index) => (
                <li key={index} className="text-sm">
                  {feature}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleRemoveProduct(product.id)}
              className="mt-2 text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      {selectedProducts.length < 2 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">
            Select products to compare:
          </h3>
          <ul>
            {products.map((product) => (
              <li key={product.id} className="mb-2">
                <button
                  onClick={() => handleProductSelect(product)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  {product.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CompareProducts;
