import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc as firestoreDoc,
} from "firebase/firestore"
import { db } from "../../../config/firebase";
import { toast } from "react-hot-toast";
import leftArrow from "../../../assets/icons/left_arrow.svg";

export const ManageOffers = () => {
  const { shop_id } = useParams();
  const navigate = useNavigate();
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingOffer, setEditingOffer] = useState(null);
  const [showAddOfferForm, setShowAddOfferForm] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    isOpen: false,
    offerId: null,
  });
  const [newOffer, setNewOffer] = useState({
    title: "",
    productId: "",
    discount: "",
    start_date: "",
    end_date: "",
    stock: ""
  })

  useEffect(() => {
    const offersQuery = query(
      collection(db, "offers"),
      where("shopId", "==", shop_id)
    );
    const unsubscribe = onSnapshot(
      offersQuery,
      (snapshot) => {
        const offerList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOffers(offerList);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching offers:", err);
        setError("Failed to load offers. Please try again.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [shop_id]);

  const handleAddOffer = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "offers"), {
        ...newOffer,
        shopId: shop_id,
      })
      toast.success("Offer added successfully!")
      setNewOffer({ title: "", productId: "", discount: "", start_date: "", end_date: "", stock: "" })
      setShowAddOfferForm(false)
    } catch (error) {
      console.error("Error adding offer:", error)
      toast.error("Failed to add offer. Please try again.")
    }
  }

  const handleDelete = (offerId) => {
    setDeleteConfirmation({ isOpen: true, offerId });
  };

  const confirmDelete = async () => {
    if (deleteConfirmation.offerId) {
      try {
        await deleteDoc(doc(db, "offers", deleteConfirmation.offerId));
        toast.success("Offer deleted successfully");
      } catch (err) {
        console.error("Error deleting offer:", err);
        toast.error("Failed to delete offer");
      }
    }
    setDeleteConfirmation({ isOpen: false, offerId: null });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingOffer) return;

    try {
      const { id, ...offerData } = editingOffer;
      await updateDoc(doc(db, "offers", id), offerData);
      setEditingOffer(null);
      toast.success("Offer updated successfully");
    } catch (err) {
      console.error("Error updating offer:", err);
      toast.error("Failed to update offer");
    }
  };

  const validateOffer = (offer) => {
    if (offer.discount < 0 || offer.discount > 100) {
      toast.error("Discount must be between 0 and 100");
      return false;
    }
    if (new Date(offer.start_date) > new Date(offer.end_date)) {
      toast.error("Start date cannot be after end date");
      return false;
    }
    return true;
  };

  if (loading) return <div className="text-center mt-8">Loading offers...</div>;
  if (error)
    return <div className="text-red-500 text-center mt-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-4">
      <div className="buttons flex items-center justify-between sticky top-5 mb-3">
        <button
          className="flex items-center gap-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded-md"
          onClick={() => navigate(-1)}
        >
          <img className="-ml-2 w-5" src={leftArrow} alt="left-arrow" />
          Shop Details
        </button>
        <button
          onClick={() => setShowAddOfferForm(true)}
          className="bg-green-500 text-white text-sm font-medium px-3 py-2 rounded hover:bg-green-600"
        >
          Add Offer
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-6">Manage Offers</h1>
      {offers.length === 0 ? (
        <p>No offers available for this shop.</p>
      ) : (
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-4">
          {offers.map((offer, index) => (
            <div
              key={index + 1}
              className="bg-zinc-800 border-1 capitalize border-zinc-600 shadow-md rounded px-4 pt-6 pb-8 mb-4"
            >
              <h2 className="text-2xl text-blue-200 font-bold mb-2">{offer.title}</h2>
              <p className="capitalize">
                <strong>Discount:</strong> {offer.discount}%
              </p>
              <p className="capitalize">
                <strong>Valid from:</strong> {offer.start_date} to{" "}
                {offer.end_date}
              </p>
              <div className="mt-4 flex justify-center sm:justify-normal flex-wrap gap-2">
                <button
                  onClick={() =>
                    navigate(`/view_shops/${shop_id}/offers/${offer.id}`)
                  }
                  className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded"
                >
                  View
                </button>
                <button
                  onClick={() => setEditingOffer(offer)}
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-semibold py-2 px-3 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(offer.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {showAddOfferForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-gray-800 text-zinc-100 p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl text-center font-bold mb-4">Add New Offer</h2>
            <form onSubmit={handleAddOffer}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={newOffer.title}
                  onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                  className="shadow appearance-none border-1 border-gray-400 bg-gray-600 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="productId">
                  Product Id
                </label>
                <input
                  type="text"
                  id="productId"
                  value={newOffer.productId}
                  onChange={(e) => setNewOffer({ ...newOffer, productId: e.target.value })}
                  className="shadow appearance-none border-1 border-gray-400 bg-gray-600 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="discount">
                  Discount
                </label>
                <input
                  type="number"
                  id="discount"
                  value={newOffer.discount}
                  onChange={(e) => setNewOffer({ ...newOffer, discount: e.target.value })}
                  className="shadow appearance-none border-1 border-gray-400 bg-gray-600 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block  text-sm font-bold mb-2" htmlFor="start_date">
                  Start Date
                </label>
                <input
                  type="date"
                  id="start_date"
                  value={newOffer.start_date}
                  onChange={(e) => setNewOffer({ ...newOffer, start_date: e.target.value })}
                  className="shadow appearance-none border-1 border-gray-400 bg-gray-600 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block  text-sm font-bold mb-2" htmlFor="end_date">
                  End Date
                </label>
                <input
                  type="date"
                  id="end_date"
                  value={newOffer.end_date}
                  onChange={(e) => setNewOffer({ ...newOffer, end_date: e.target.value })}
                  className="shadow appearance-none border-1 border-gray-400 bg-gray-600 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block  text-sm font-bold mb-2" htmlFor="stock">
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  value={newOffer.stock}
                  onChange={(e) => setNewOffer({ ...newOffer, stock: e.target.value })}
                  className="shadow appearance-none border-1 border-gray-400 bg-gray-600 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add Offer
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddOfferForm(false)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {editingOffer && (
        <div className="fixed inset-0 backdrop-blur-[2px] overflow-y-auto h-full w-full flex items-center justify-center">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl text- font-bold mb-4">Update Offer</h2>
            <form onSubmit={handleUpdate} className="text-zinc-100">
              <div className="mb-4">
                <label
                  className="block text-gray-100 text-sm font-bold mb-2"
                  htmlFor="title"
                >
                  Title
                </label>
                <input
                  className="shadow appearance-none border-1 text-zinc-100 border-gray-400 bg-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  value={editingOffer.title}
                  onChange={(e) =>
                    setEditingOffer({ ...editingOffer, title: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-100 text-sm font-bold mb-2"
                  htmlFor="discount"
                >
                  Discount (%)
                </label>
                <input
                  className="shadow appearance-none border-1 text-zinc-100 border-gray-400 bg-gray-600 rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  id="discount"
                  type="number"
                  value={editingOffer.discount}
                  onChange={(e) =>
                    setEditingOffer({
                      ...editingOffer,
                      discount: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-100 text-sm font-bold mb-2"
                  htmlFor="start_date"
                >
                  Start Date
                </label>
                <input
                  className="shadow appearance-none border-1 text-zinc-100 border-gray-400 bg-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="start_date"
                  type="date"
                  value={editingOffer.start_date}
                  onChange={(e) =>
                    setEditingOffer({
                      ...editingOffer,
                      start_date: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-100 text-sm font-bold mb-2"
                  htmlFor="end_date"
                >
                  End Date
                </label>
                <input
                  className="shadow appearance-none border-1 text-zinc-100 border-gray-400 bg-gray-600 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="end_date"
                  type="date"
                  value={editingOffer.end_date}
                  onChange={(e) =>
                    setEditingOffer({
                      ...editingOffer,
                      end_date: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    if (validateOffer(editingOffer)) {
                      handleUpdate(e);
                    }
                  }}
                >
                  Update Offer
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => setEditingOffer(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteConfirmation.isOpen && (
        <div className="fixed inset-0 backdrop-blur-[2px] overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-3">Delete Offer</h2>
            <p className="mb-6">
              Are you sure you want to delete this offer?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() =>
                  setDeleteConfirmation({ isOpen: false, offerId: null })
                }
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
