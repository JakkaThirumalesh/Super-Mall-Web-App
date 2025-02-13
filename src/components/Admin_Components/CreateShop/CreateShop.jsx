import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { toast } from "react-hot-toast";
import AddShopButton from "../AddShopButton";
import ShopForm from "./ShopForm";
import ImageUpload from "./ImageUpload";

export default function CreateShop() {
  const navigate = useNavigate();
  const [shopData, setShopData] = useState({
    shopId: "",
    shopName: "",
    shopNumber: "",
    floor: "",
    category: "",
    ownerDetails: {
      ownerName: "",
      occupation: "",
    },
    contactDetails: {
      mobileNumber: "",
      email: "",
      instagramId: "",
    },
    images: {
      image1: null,
      image2: null,
      image3: null,
    },
    offers: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setShopData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setShopData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (imageBase64, imageNumber) => {
    setShopData((prev) => ({
      ...prev,
      images: {
        ...prev.images,
        [`image${imageNumber}`]: imageBase64,
      },
    }));
  };

  const createShop = async (e) => {
    e.preventDefault();
    try {
      const shopRef = collection(db, "shops");
      console.log(shopRef);
      await addDoc(shopRef, shopData);
      toast.success("Shop created successfully!");
      navigate("/view_shops");
    } catch (error) {
      console.error("Error creating shop:", error);
      toast.error("Failed to create shop. Please try again.");
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">Shop Details</h1>
          <AddShopButton />
        </div>
      </div>
      <div className="container relative bg-gray-700 h-fit rounded-md mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Create New Shop</h1>
        <div className="bg-gray-800 rounded-lg shadow-md p-6">
          <form onSubmit={createShop}>
            <ShopForm
              shopData={shopData}
              handleInputChange={handleInputChange}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ImageUpload
                onImageUpload={(image) => handleImageUpload(image, 1)}
                label="Shop Banner"
                imageNumber={1}
                preview={shopData.images.image1}
              />
              <ImageUpload
                onImageUpload={(image) => handleImageUpload(image, 2)}
                label="Interior Image 1"
                imageNumber={2}
                preview={shopData.images.image2}
              />
              <ImageUpload
                onImageUpload={(image) => handleImageUpload(image, 3)}
                label="Interior Image 2"
                imageNumber={3}
                preview={shopData.images.image3}
              />
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/view_shops")}
                className="px-4 py-2 text-gray-400 hover:text-gray-100 border border-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Create Shop
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
