import React, { createContext, useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

export const BioContext = createContext();

export const BioProvider = ({ children }) => {
  const [shops, setShops] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState([]);

  const fetchShops = async () => {
    try {
      const shopsCollectionRef = collection(db, "shops");
      const data = await getDocs(shopsCollectionRef);
      const shopList = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setShops(shopList);
    } catch (error) {
      console.error("Error fetching shops:", error);
    }
  };

  // Function to derive unique categories
  const deriveCategories = () => {
    const uniqueCategories = [...new Set(shops.map(shop => shop.category))];
    setCategories(uniqueCategories);
  };

  useEffect(() => {
    fetchShops();
  }, []);

  // Update categories whenever shops change
  useEffect(() => {
    deriveCategories();
  }, [shops]);

  const filterShops = () => {
    if (!selectedCategory || selectedCategory === "All Category") {
      return shops;
    }
    return shops.filter((shop) => shop.category === selectedCategory);
  };

  return (
    <BioContext.Provider
      value={{
        shops,
        fetchShops,
        filterShops,
        selectedCategory,
        setSelectedCategory,
        categories,
      }}
    >
      {children}
    </BioContext.Provider>
  );
};
