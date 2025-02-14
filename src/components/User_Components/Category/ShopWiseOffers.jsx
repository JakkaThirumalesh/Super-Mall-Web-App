const shopOffers = [
  {
    id: 1,
    shopName: "ElectroMart",
    offers: [
      { id: 1, title: "20% off on all smartphones", validUntil: "2023-12-31" },
      {
        id: 2,
        title: "Buy a laptop, get a free mouse",
        validUntil: "2023-11-30",
      },
    ],
  },
  {
    id: 2,
    shopName: "FashionHub",
    offers: [
      {
        id: 3,
        title: "Buy 2 Get 1 Free on all t-shirts",
        validUntil: "2023-10-15",
      },
      {
        id: 4,
        title: "50% off on winter collection",
        validUntil: "2023-12-31",
      },
    ],
  },
];

const ShopOffers = ({ shopId }) => {
  const shop = shopOffers.find((s) => s.id === shopId);

  if (!shop) {
    return <div>Shop not found</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Offers for {shop.shopName}</h2>
      <div className="space-y-4">
        {shop.offers.map((offer) => (
          <div key={offer.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold">{offer.title}</h3>
            <p className="text-sm text-gray-600">
              Valid until: {offer.validUntil}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopOffers;
