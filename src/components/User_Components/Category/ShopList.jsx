import Link from "react-router-dom";

const shops = [
  {
    id: 1,
    name: "ElectroMart",
    category: "Electronics",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "FashionHub",
    category: "Fashion",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "HomeDecor",
    category: "Home & Living",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "BookWorm",
    category: "Books & Stationery",
    image: "/placeholder.svg?height=100&width=100",
  },
];

const ShopList = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {shops.map((shop) => (
        <Link key={shop.id} href={`/shop/${shop.id}`} className="block">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={shop.image || "/placeholder.svg"}
              alt={shop.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{shop.name}</h3>
              <p className="text-sm text-gray-600">{shop.category}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ShopList;
