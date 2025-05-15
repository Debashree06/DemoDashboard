import { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const Sidebar = ({ sidebarOpen, setSidebarOpen, menuItems }) => {
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const handleSubmenuClick = (id) => {
    setActiveSubmenu((prev) => (prev === id ? null : id));
  };

  const handleLogout = () => {
    logout(); 
  };

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-16"
      } bg-black text-white h-screen transition-all duration-300 ease-in-out overflow-y-auto`}
    >
      <div
        className={`p-4 flex items-center transition-all duration-300 ease-in-out ${
          sidebarOpen ? "justify-start" : "justify-center"
        }`}
      >
        
      </div>

      <ul className="mt-4 space-y-4 px-2">
        {menuItems.map((item) => (
          <li key={item.id} className="relative">
            <NavLink
              to={item.route || "#"}
              className={({ isActive }) =>
                `flex items-center p-3 rounded-md transition-all duration-300 ease-in-out ${
                  sidebarOpen ? "justify-start" : "justify-center"
                } ${
                  isActive ? "text-green-500 bg-white/10" : "hover:text-yellow-600"
                }`
              }
              onClick={() => {
                if (item.submenu && item.submenu.length > 0) {
                  handleSubmenuClick(item.id);
                }
                if (item.action) {
                  handleLogout();
                }
              }}
            >
              <span className="text-xl">{item.icon && <item.icon />}</span>
              {sidebarOpen && (
                <span className="ml-4 transition-opacity duration-300 ease-in-out">
                  {item.title}
                </span>
              )}
              {item.submenu && item.submenu.length > 0 && sidebarOpen && (
                <span className="ml-auto">
                  {activeSubmenu === item.id ? (
                    <IoIosArrowUp />
                  ) : (
                    <IoIosArrowDown />
                  )}
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;