import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { toast } from "react-hot-toast";
import leftArrow from "../../../assets/icons/left_arrow.svg";

export const OfferDetails = () => {
  // const { shop_id, offer_id } = useParams();
  const { offer_id } = useParams();
  const navigate = useNavigate();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedOffer, setEditedOffer] = useState(null);

  useEffect(() => {
    const offerRef = doc(db, "offers", offer_id);

    const unsubscribe = onSnapshot(
      offerRef,
      (doc) => {
        if (doc.exists()) {
          const offerData = { id: doc.id, ...doc.data() };
          setOffer(offerData);
          setEditedOffer(offerData);
          setLoading(false);
          setError(null);
        } else {
          setError("Offer not found");
          setLoading(false);
        }
      },
      (err) => {
        console.error("Error fetching offer:", err);
        setError("Error fetching offer data");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [offer_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedOffer((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const offerRef = doc(db, "offers", offer_id);
      await updateDoc(offerRef, editedOffer);
      setIsEditing(false);
      toast.success("Offer updated successfully!");
    } catch (err) {
      console.error("Error updating offer:", err);
      toast.error("Failed to update offer");
    }
  };

  const isExpired = offer && new Date(offer.end_date) < new Date();

  if (loading) {
    return <div className="text-center mt-8">Loading offer details...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        className="backButton flex items-center sticky top-5 gap-2 text-sm bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md mb-3"
        onClick={() => navigate(-1)}
      >
        <img className="-ml-2 w-6" src={leftArrow} alt="left-arrow" />
        Offers
      </button>
      <h1 className="text-3xl font-bold mb-6">Offer Details</h1>
      {isExpired && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          This offer has expired
        </div>
      )}
      {!isEditing ? (
        <div className="bg-zinc-700 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="mb-2 capitalize">
            <strong>Name:</strong> {offer.title}
          </p>
          <p className="mb-2 capitalize">
            <strong>Product ID:</strong> {offer.productId}
          </p>
          <p className="mb-2 capitalize">
            <strong>Start Date:</strong> {offer.start_date}
          </p>
          <p className="mb-2 capitalize">
            <strong>End Date:</strong> {offer.end_date}
          </p>
          <p className="mb-2 capitalize">
            <strong>Discount:</strong> {offer.discount}%
          </p>
          <p className="mb-2 capitalize">
            <strong>Stock:</strong> {offer.stock ? offer.stock : "Not available Stock"}
          </p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Update Offer
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleUpdate}
          className="bg-zinc-700 shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-zinc-100 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={editedOffer.title || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-zinc-100 text-sm font-bold mb-2"
              htmlFor="start_date"
            >
              Start Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="start_date"
              type="date"
              name="start_date"
              value={editedOffer.start_date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-zinc-100 text-sm font-bold mb-2"
              htmlFor="end_date"
            >
              End Date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="end_date"
              type="date"
              name="end_date"
              value={editedOffer.end_date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-zinc-100 text-sm font-bold mb-2"
              htmlFor="discount"
            >
              Discount (%)
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="discount"
              type="number"
              name="discount"
              value={editedOffer.discount || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-zinc-100 text-sm font-bold mb-2"
              htmlFor="stock"
            >
              Stock
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="stock"
              type="number"
              name="stock"
              value={editedOffer.stock || ""}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save Changes
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
