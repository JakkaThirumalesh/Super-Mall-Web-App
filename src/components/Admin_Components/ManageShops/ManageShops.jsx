import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { BioContext } from "../../../hooks/Context/ContextProvider";
import ShopList from "./ShopList";
import UpdateShopForm from "./UpdateShopForm";
import AddShopButton from "../AddShopButton";
import { ThemeContext } from "../../../hooks/Context/ThemeContext";
import React from "react";

export default function ManageShops() {
  const navigate = useNavigate();
  const { shops, selectedCategory, fetchShops } = useContext(BioContext);
  const [currentShop, setCurrentShop] = useState(null);
  const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetchShops();
  }, []);

  // Filter shops based on selected category
  const filteredShops = selectedCategory === "All"
    ? shops
    : shops.filter(shop => shop.category === selectedCategory);

  const navigateToShopDetails = (shop) => {
    navigate(`/view_shops/${shop.shopId}`, { state: { shop } });
  };

  const openUpdateForm = (shop) => {
    setCurrentShop(shop);
    setIsUpdateFormOpen(true);
  };

  const closeUpdateForm = () => {
    setCurrentShop(null);
    setIsUpdateFormOpen(false);
  };

  const updateShopInFirestore = async (updatedShop) => {
    const shopDoc = doc(db, "shops", updatedShop.id);
    await updateDoc(shopDoc, updatedShop);
    fetchShops();
  };

  const deleteShop = async (shopId) => {
    const shopDoc = doc(db, "shops", shopId);
    await deleteDoc(shopDoc);
    fetchShops();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className={`text-3xl font-semibold ${theme === 'dark'
          ? 'text-gray-100'
          : 'text-gray-700'
          }`}>Shop Details</h1>
        <AddShopButton />
      </div>
      <ShopList
        shops={filteredShops}
        onView={navigateToShopDetails}
        onUpdate={openUpdateForm}
        onDelete={deleteShop}
      />
      {isUpdateFormOpen && (
        <UpdateShopForm
          shop={currentShop}
          onUpdate={updateShopInFirestore}
          onClose={closeUpdateForm}
        />
      )}
    </div>
  );
}
