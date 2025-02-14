const offerProducts = [
  {
    id: 1,
    name: "Smart TV",
    shop: "ElectroMart",
    originalPrice: 999,
    discountedPrice: 799,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Designer Dress",
    shop: "FashionHub",
    originalPrice: 199,
    discountedPrice: 149,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Coffee Table",
    shop: "HomeDecor",
    originalPrice: 299,
    discountedPrice: 249,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Bestseller Novel",
    shop: "BookWorm",
    originalPrice: 29,
    discountedPrice: 24,
    image: "/placeholder.svg?height=100&width=100",
  },
];

const OfferProducts = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {offerProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-40 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.shop}</p>
            <div className="mt-2">
              <span className="text-red-600 font-bold">
                ${product.discountedPrice}
              </span>
              <span className="ml-2 text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OfferProducts;
