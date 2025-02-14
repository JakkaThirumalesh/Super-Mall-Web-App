import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState, useContext } from "react";
import { db } from "../../../config/firebase";
import closeSvg from "../../../assets/icons/close_x.svg";
import { BioContext } from "../../../hooks/Context/ContextProvider";
import { useParams, useNavigate } from "react-router-dom";

export const Categories = () => {
  const { category_name } = useParams();
  const navigate = useNavigate();
  const { shops } = useContext(BioContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(
    category_name || "All"
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenOfferProducts, setIsOpenOfferProducts] = useState(false);

  useEffect(() => {
    // Fetch unique categories from shops
    const uniqueCategories = [
      "All",
      ...new Set(shops.map((shop) => shop.category)),
    ];
    setCategories(uniqueCategories);
  }, [shops]);

  const getShops = async () => {
    const shopsCollectionRef = collection(db, "shops");
    const data = await getDocs(shopsCollectionRef);
    const filteredData = data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    // setShops(filteredData);

    // Extract unique categories
    const uniqueCategories = [
      ...new Set(filteredData.map((shop) => shop.category)),
    ];
    // setCategories(['All', ...uniqueCategories]);
  };

  useEffect(() => {
    getShops();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate(`/category/${category}`);
  };
  const navigateToShopDetails = (shop) => {
    navigate(`/category/${shop.category}/shops`, { state: { shop } });
  };

  // Filter shops based on selected category
  const filteredShops =
    selectedCategory === "All"
      ? shops
      : shops.filter((shop) => shop.category === selectedCategory);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Shop Categories</h1>

          <div className="w-fit relative">
            <button
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
            >
              More Options
              <svg
                className={`w-2.5 h-2.5 ms-3 ${
                  isOpen ? "rotate-180" : "rotate-0"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdown"
              className={`z-10 ${
                isOpen ? "" : "hidden"
              } bg-zinc-700 divide-y absolute top-11 divide-gray-600 text-center rounded-lg overflow-hidden shadow-sm w-fit dark:bg-gray-700`}
            >
              <div
                className=""
                onClick={() => {
                  setIsOpen(false);
                  setIsOpenOfferProducts(true);
                }}
              >
                <span className="block px-2 cursor-pointer py-3 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  List of offer products
                </span>
              </div>
              <div className="" onClick={() => setIsOpen(false)}>
                <span className="block px-2 py-3 cursor-pointer text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                  Compare Products cost & Features
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-700 text-gray-200 hover:bg-gray-600 hover:shadow-lg"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-center">
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  SN.
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Shop ID
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Shop Name
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Category
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Owner
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredShops.map((shop, index) => (
                <tr
                  key={shop.id}
                  className="border-b dark:bg-gray-800 text-center dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="py-4 px-6 whitespace-nowrap">{index + 1}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{shop.shopId}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {shop.shopName}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {shop.category}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {shop.ownerDetails.ownerName}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap space-x-2">
                    <button
                      onClick={() => navigateToShopDetails(shop)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isOpenOfferProducts && (
        <OfferProducts
          shops={filteredShops}
          closeSvg={closeSvg}
          setIsOpenOfferProducts={setIsOpenOfferProducts}
        />
      )}
    </>
  );
};

export const OfferProducts = ({ shops, closeSvg, setIsOpenOfferProducts }) => {
  return (
    <div className="w-full h-screen fixed inset-0 backdrop-blur-sm">
      <img
        onClick={() => setIsOpenOfferProducts(false)}
        className="cursor-pointer w-10 h-10 relative z-20 top-20 left-[88%]"
        src={closeSvg}
        alt="closeMenu"
      />
      <div className="container mx-auto h-full px-4 py-8">
        <div className="overflow-x-auto relative h-full flex items-center justify-center shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-700 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-center">
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  SN.
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Shop ID
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Shop Name
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Category
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Owner
                </th>
                <th scope="col" className="py-3 px-6 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {shops.map((shop, index) => (
                <tr
                  key={shop.id}
                  className="border-b dark:bg-gray-800 text-center dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="py-4 px-6 whitespace-nowrap">{index + 1}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{shop.shopId}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {shop.shopName}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {shop.category}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {shop.ownerDetails.ownerName}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap space-x-2">
                    <button
                      // onClick={() => onView(shop)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const Comparison = () => {
  return (
    <>
      <div className="w-full h-screen fixed inset-0 backdrop-blur-sm">
        <div className="container mx-auto h-full px-4 py-8"></div>
      </div>
    </>
  );
};
