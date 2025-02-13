import { useLocation, useNavigate } from "react-router-dom";

export default function AddShopButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const createShopPath = "/create_shop";
  const viewShopPath = "/view_shops";

  const buttonText =
    location.pathname === createShopPath ? "View Shop" : "Create Shop";

  return (
    <button
      onClick={() => {
        if (location.pathname === createShopPath) {
          navigate(viewShopPath);
        } else {
          navigate(createShopPath);
        }
      }}
      className="px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
    >
      {buttonText}
    </button>
  );
}
