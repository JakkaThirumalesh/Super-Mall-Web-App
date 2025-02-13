import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { BioContext } from "../hooks/Context/ContextProvider";
import ThemeToggleButton from '../hooks/Context/ThemeToggleButton';
import { ThemeContext } from "../hooks/Context/ThemeContext";

export const Header = () => {
  const { theme } = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const { shops, selectedCategory, setSelectedCategory } = useContext(BioContext);
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };


  return (
    <nav
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={`border-b ${theme === 'dark'
        ? 'bg-gray-900 border-gray-700'
        : 'bg-white border-gray-200'
        } relative z-20`}
    >
      <div className="container h-fit flex flex-wrap items-center justify-between mx-auto px-4">
        <NavLink to="/view_shops" className="flex items-center py-3 space-x-3 rtl:space-x-reverse">
          <span className={`self-center text-2xl font-semibold whitespace-nowrap ${theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
            Super Mall
          </span>
        </NavLink>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-gray-100 focus:outline-none ${theme === 'dark'
            ? 'text-gray-400 hover:bg-gray-700'
            : 'text-gray-500 hover:bg-gray-100'
            }`}
          aria-controls="navbar-dropdown"
          aria-expanded="true"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${isOpen ? "" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-dropdown"
        >
          <ul className={`flex flex-col text-lg md:text-base font-medium p-2 md:p-0 rounded-lg md:space-x-8 md:flex-row md:mt-0 md:border-0 ${theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
            <NavLink to="/view_shops">
              <li className={`block py-1 px-2 rounded hover:text-blue-500 md:p-0`}>
                Home
              </li>
            </NavLink>
            <NavLink to="/view_shops/all_offers">
              <li className={`block py-1 px-2 rounded hover:text-blue-500 md:p-0`}>
                Offers
              </li>
            </NavLink>
            <div className={`${isOpen ? "" : "hidden"} w-full border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}></div>
            {shops.length > 0 && (
              <li>
                <select
                  className={`p-2 cursor-pointer rounded outline-none ${theme === 'dark'
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  onChange={handleCategoryChange}
                  value={selectedCategory}
                >
                  <option value="All" className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}>
                    All Category
                  </option>
                  {[...new Set(shops.map((shop) => shop.category))].map(
                    (category) => (
                      <option
                        key={category}
                        value={category}
                        className={theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
                      >
                        {category}
                      </option>
                    )
                  )}
                </select>
              </li>
            )}
            <div className={`${isOpen ? "" : "hidden"} w-full border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              }`}></div>
            <NavLink to="/admin_login">
              <li className={`block py-1 px-2 rounded hover:text-blue-500 md:p-0`}>
                Admin Login
              </li>
            </NavLink>
            <div className="flex items-center gap-4">
              <ThemeToggleButton />
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};
