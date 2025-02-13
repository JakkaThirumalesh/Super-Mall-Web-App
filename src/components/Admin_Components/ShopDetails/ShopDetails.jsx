import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  doc,
  getDoc,
  doc as firestoreDoc,
} from "firebase/firestore"
import { db } from "../../../config/firebase"
import leftArrow from "../../../assets/icons/left_arrow.svg";

export default function ShopDetails() {
  const location = useLocation()
  const navigate = useNavigate()
  const [shop, setShop] = useState(location.state.shop)

  useEffect(() => {
    const fetchShopDetails = async () => {
      const shopDoc = await getDoc(doc(db, "shops", shop.shopId))
      if (shopDoc.exists()) {
        setShop({ ...shopDoc.data(), shopId: shopDoc.id })
      }
    }
    fetchShopDetails()
  }, [shop.shopId])

  return (
    <div className="container mx-auto px-4 py-4">
       <button
        className="backButton flex items-center font-medium sticky top-5 gap-2 text-sm bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md mb-3"
        onClick={() => navigate(-1)}
      >
        <img
          className="-ml-2 w-5 fill-slate-200"
          src={leftArrow}
          alt="left-arrow"
        />
        View Shops
      </button>
      <h1 className="text-3xl font-bold mb-6">{shop.shopName}</h1>

      <div className="mb-8">
        <img
          src={
            shop.images.image1 ||
            "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
          }
          alt="Shop Header"
          className="w-full h-60 object-cover rounded-lg"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Shop Details</h2>
          <p>
            <strong>Shop ID:</strong> {shop.shopId}
          </p>
          <p>
            <strong>Shop Number:</strong> {shop.shopNumber}
          </p>
          <p>
            <strong>Floor:</strong> {shop.floor}
          </p>
          <p>
            <strong>Category:</strong> {shop.category}
          </p>
          <p>
            <strong>Owner:</strong> {shop.ownerDetails.ownerName}
          </p>
          <p>
            <strong>Occupation:</strong> {shop.ownerDetails.occupation}
          </p>
          <h3 className="text-xl font-semibold mt-4 mb-2">Contact Details</h3>
          <p>
            <strong>Mobile:</strong> {shop.contactDetails.mobileNumber}
          </p>
          <p>
            <strong>Email:</strong> {shop.contactDetails.email}
          </p>
          <p>
            <strong>Instagram:</strong> {shop.contactDetails.instagramId}
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Shop Interior</h2>
          <div className="grid grid-cols-2 gap-4">
            {[shop.images.image2, shop.images.image3].map((image, index) => (
              <img
                key={index}
                src={
                  image ||
                  "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                }
                alt={`Shop Interior ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => navigate(`/view_shops/${shop.shopId}/offers`, {state: shop})}
          className="bg-green-500 text-white font-medium px-4 py-2 rounded hover:bg-green-600"
        >
          View Offers
        </button>
        <button
          onClick={() => navigate(`/view_shops/${shop.shopId}/manage_products`, { state: { shop, category: shop.category } })}
          className="bg-blue-500 text-white font-medium px-4 py-2 rounded hover:bg-blue-600"
        >
          View Products
        </button>
      </div>
    </div>
  )
}

