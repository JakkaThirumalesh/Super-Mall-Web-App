import { Link, Navigate } from "react-router-dom";

export const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 h-screen bg-gray-100 dark:bg-zinc-900">
      <div className="w-full max-w-sm p-4 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-zinc-900 dark:border-gray-700">
        <form className="space-y-4 md:space-y-6">
          <h5 className="text-xl font-medium text-gray-900 dark:text-white">
            Sign in for Admin
          </h5>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-800 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-800 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign In
          </button>
        </form>
      </div>
      <div className={`flex items-center my-4 gap-4 w-full max-w-96`}>
        <div className="h-[1px] bg-gray-300 flex-grow"></div>
        <span className="text-zinc-200 text-sm font-medium">OR</span>
        <div className="h-[1px] bg-gray-300 flex-grow"></div>
      </div>
      <Link to="/view_shops" className="bg-blue-600 px-4 py-2 rounded-lg">
        Back to View Shops
      </Link>
    </div>
  );
};
