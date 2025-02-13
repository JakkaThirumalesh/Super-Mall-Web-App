import { Navigate } from "react-router-dom";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import CreateShop from "./components/Admin_Components/CreateShop/CreateShop";
import ManageShops from "./components/Admin_Components/ManageShops/ManageShops";
import ShopDetails from "./components/Admin_Components/ShopDetails/ShopDetails";
import { ManageOffers } from "./components/Admin_Components/ManageOffers/ManageOffers";
import { ManageAllOffers } from "./components/Admin_Components/ManageOffers/ManageAllOffers";
import { OfferDetails } from "./components/Admin_Components/OfferDetails/OfferDetails";
import ErrorPage from "./pages/ErrorPage";
import { Login } from "./pages/Login";
import { Categories } from "./components/User_Components/Category/Categories";
import { BioProvider } from "./hooks/Context/ContextProvider";
import { ThemeProvider } from "./hooks/Context/ThemeContext";
import ShopList from "./components/User_Components/Category/ShopList";
import ProductManager from "./components/Admin_Components/ProductManager/ProductManager";
import ProductDetail from "./components/Admin_Components/ProductManager/ProductDetail";

function App() {
  return (
    <ThemeProvider>
      <BioProvider>
        <div
          className="min-h-screen w-full transition-colors duration-200
          dark:bg-gray-900 dark:text-gray-100
          light:bg-gray-100 light:text-gray-900"
        >
          <Router>
            <Routes>
              {/* Protected Routes */}
              <Route path="/" element={<Dashboard />}>
                <Route path="/" element={<Navigate to="/view_shops" />} />
                <Route path="create_shop" element={<CreateShop />} />
                <Route path="view_shops" element={<ManageShops />} />
                <Route
                  path="view_shops/all_offers"
                  element={<ManageAllOffers />}
                />
                <Route path="view_shops/:shop_id" element={<ShopDetails />} />
                <Route
                  path="view_shops/:shop_id/offers"
                  element={<ManageOffers />}
                />
                <Route
                  path="view_shops/:shop_id/manage_products"
                  element={<ProductManager />}
                />
                <Route
                  path="view_shops/:shopId/manage_products/:productId"
                  element={<ProductDetail />}
                />
                <Route
                  path="view_shops/:shop_id/offers/:offer_id"
                  element={<OfferDetails />}
                />
                <Route path="*" element={<ErrorPage />} />
              </Route>

              {/* Public Routes */}
              <Route path="/" element={<Dashboard />}>
                <Route index element={<Navigate to="/category/All" />} />
                <Route
                  path="category/:category_name"
                  element={<Categories />}
                />
                <Route
                  path="/category/:category_name/shops"
                  element={<ShopList />}
                />
                <Route path="*" element={<ErrorPage />} />
              </Route>

              <Route path="admin_login" element={<Login />} />
            </Routes>
          </Router>
        </div>
      </BioProvider>
    </ThemeProvider>
  );
}

export default App;
