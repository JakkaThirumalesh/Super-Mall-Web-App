import { useEffect, useState } from "react";
import { collection, onSnapshot, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import Card from "./Card";
import { toast } from "react-hot-toast";
import ProductForm from "./ProductForm";
import { useLocation, useNavigate } from "react-router-dom";
import leftArrow from "../../../assets/icons/left_arrow.svg"

export default function ProductManager() {
  const location = useLocation();
  const navigate = useNavigate()
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  // Use optional chaining to avoid errors
  const shopId = location.state?.shop?.shopId;
  const category = location.state?.category;

  // Check if shopId or category is undefined
  if (!shopId || !category) {
    return <div>Error: Shop or category not found.</div>;
  }

  useEffect(() => {
    const productsQuery = collection(db, "products");
    const unsubscribe = onSnapshot(
      productsQuery,
      (snapshot) => {
        const productsList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsList);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleAddProduct = async (newProduct) => {
    try {
      await addDoc(collection(db, "products"), { ...newProduct });
      toast.success("Product added successfully!");
      setShowAddProductForm(false);
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");
    }
  };

  const handleCancel = () => {
    setShowAddProductForm(false);
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="buttons flex items-center justify-between z-20 sticky top-5 mb-3">
        <button
          className="flex items-center gap-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md"
          onClick={() => navigate(-1)}
        >
          <img className="-ml-2 w-5" src={leftArrow} alt="left-arrow" />
          Shop Details
        </button>
        <button
        onClick={() => setShowAddProductForm(true)}
          className="bg-green-500 text-white text-sm font-medium px-3 py-2 rounded hover:bg-green-600"
        >
          Add Product
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-6">Product Manager</h1>
      {/* Product Form */}
      {showAddProductForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <ProductForm onSubmit={handleAddProduct} onCancel={handleCancel} category={category} />
          </div>
        </div>
      )}

      {/* Card */}
      <div className="grid md:grid-cols-2 grid-cols-1 lg:grid-cols-3 gap-3 relative">
        {
          products.filter(product => product.category === category).length > 0 ?
            products.filter(product => product.category === category).map((product, index) => (
              <Card
                key={index}
                productId={product.productId}
                title={product.name}
                description={product.description}
                image={product.image}
                category={category}
                shopId={shopId}
                location={location}
                products={products}
              />
            ))
            :
            <div className="text-red-600 text-center w-fit absolute left-1/2 -translate-x-1/2 translate-y-1/2"> <span className="text-4xl font-bold">Temporarily</span> <br /> <span className="text-xl font-bold">Out of stock</span></div>
        }
      </div>
    </div>
  );
}