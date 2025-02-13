import { useContext } from "react"
import { ThemeContext } from "../../../hooks/Context/ThemeContext"
import { BioContext } from "../../../hooks/Context/ContextProvider"

export default function ShopList({ shops, onView, onUpdate, onDelete }) {
  const { theme } = useContext(ThemeContext)
  const { selectedCategory, setSelectedCategory } = useContext(BioContext)

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  return (
    <div>
      {/* Category Filter */}
      {/* <div className="mb-4">
        {shops.length > 0 && (
          <select
            className={`p-2 cursor-pointer rounded outline-none ${
              theme === "dark"
                ? "bg-gray-800 text-white hover:bg-gray-700"
                : "bg-gray-100 text-gray-900 hover:bg-gray-200"
            }`}
            onChange={handleCategoryChange}
            value={selectedCategory}
          >
            <option value="All" className={theme === "dark" ? "bg-gray-800" : "bg-white"}>
              All Category
            </option>
            {[...new Set(shops.map((shop) => shop.category))].map((category) => (
              <option key={category} value={category} className={theme === "dark" ? "bg-gray-800" : "bg-white"}>
                {category}
              </option>
            ))}
          </select>
        )}
      </div> */}

      {/* Shop List Table */}
      <div
        className={`relative overflow-x-auto shadow-md sm:rounded-lg ${
          theme === "dark" ? "text-gray-100" : "text-gray-900"
        }`}
      >
        <table className="w-full text-sm text-left">
          <thead
            className={`text-xs uppercase ${
              theme === "dark" ? "bg-gray-600 text-gray-100" : "bg-gray-200 text-gray-700"
            }`}
          >
            <tr className="text-center">
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                SN.
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Shop ID
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Shop Name
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Categories
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Floor
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Owner
              </th>
              <th scope="col" className="px-6 py-3 whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {shops.map((shop, index) => (
              <tr
                key={shop.id}
                className={`border-b text-center ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-100"
                    : "bg-white border-gray-200 hover:bg-gray-50 text-gray-900"
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{shop.shopId}</td>
                <td className="px-6 py-4 whitespace-nowrap">{shop.shopName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{shop.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{shop.floor}</td>
                <td className="px-6 py-4 whitespace-nowrap">{shop.ownerDetails.ownerName}</td>
                <td className="px-6 py-4 whitespace-nowrap space-x-2">
                  <button
                    onClick={() => onView(shop)}
                    className={`font-medium hover:underline ${
                      theme === "dark" ? "text-blue-400 hover:text-blue-300" : "text-blue-600 hover:text-blue-700"
                    }`}
                  >
                    View
                  </button>
                  <button
                    onClick={() => onUpdate(shop)}
                    className={`font-medium hover:underline ${
                      theme === "dark"
                        ? "text-yellow-400 hover:text-yellow-300"
                        : "text-yellow-600 hover:text-yellow-700"
                    }`}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => onDelete(shop.id)}
                    className={`font-medium hover:underline ${
                      theme === "dark" ? "text-red-400 hover:text-red-300" : "text-red-600 hover:text-red-700"
                    }`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

