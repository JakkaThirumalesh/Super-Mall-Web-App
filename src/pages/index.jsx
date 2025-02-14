import Layout from "../components/Layout";
import CategoryWiseShops from "../components/CategoryWiseShops";
import ShopList from "../components/ShopList";
import OfferProducts from "../components/OfferProducts";

export default function Home() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">Welcome to Urban Styles Mall</h1>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
        <CategoryWiseShops />
      </section>
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Featured Shops</h2>
        <ShopList />
      </section>
      <section>
        <h2 className="text-2xl font-bold mb-4">Current Offers</h2>
        <OfferProducts />
      </section>
    </Layout>
  );
}
