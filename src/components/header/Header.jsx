import { Link } from "react-router-dom";
import { FiSettings, FiLogOut } from "react-icons/fi";
import { IoMdMenu } from "react-icons/io";

const Header = ({ sidebarOpen, setSidebarOpen, userName = "John Doe" }) => {
  const handleSidebarToggle = (e) => {
    e.stopPropagation();
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <header className="sticky top-0 z-999 w-full bg-teal-700 text-white shadow-md">
      <div className="flex items-center justify-between px-4 py-3 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 2xl:hidden">
          {" "}
          <button
            aria-controls="sidebar"
            onClick={handleSidebarToggle}
            className="z-99999 block rounded-sm border border-teal-800 bg-teal-600 p-1.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <IoMdMenu className="h-6 w-6 text-white" />
          </button>
        </div>

        <div className="flex gap-5">
          <div className="hidden 2xl:block">
            {" "}
            <button
              aria-controls="sidebar"
              onClick={handleSidebarToggle}
              className="z-99999 block rounded-sm border border-teal-800 bg-teal-600 p-1.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <IoMdMenu className="h-6 w-6 text-white" />
            </button>
          </div>

          <div className="hidden sm:block">
            <Link className="block flex-shrink-0 " to={`/user-dashboard`}>
              <h2 className="lg:text-xl text-md font-semibold text-white">
               Demo Dashboard
              </h2>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3 2xsm:gap-7">
          <div className="flex items-center gap-2">
            <span className="hidden sm:block text-white font-semibold">
              {userName}
            </span>
            <Link to="/settings" className="text-white hover:text-gray-300">
              <FiSettings className="h-4 w-4" />
            </Link>
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              <FiLogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
