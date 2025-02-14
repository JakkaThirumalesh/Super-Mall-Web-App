import Link from "react-router-dom";

const floors = [
  {
    id: 1,
    name: "Ground Floor",
    shops: [
      { id: 1, name: "ElectroMart", category: "Electronics" },
      { id: 2, name: "FashionHub", category: "Fashion" },
    ],
  },
  {
    id: 2,
    name: "First Floor",
    shops: [
      { id: 3, name: "HomeDecor", category: "Home & Living" },
      { id: 4, name: "BookWorm", category: "Books & Stationery" },
    ],
  },
];

const FloorWiseShops = () => {
  return (
    <div>
      {floors.map((floor) => (
        <div key={floor.id} className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{floor.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {floor.shops.map((shop) => (
              <Link key={shop.id} href={`/shop/${shop.id}`} className="block">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="text-lg font-semibold">{shop.name}</h3>
                  <p className="text-sm text-gray-600">{shop.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FloorWiseShops;
