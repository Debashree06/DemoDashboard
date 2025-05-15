import { AiOutlineDashboard } from "react-icons/ai";

import { LuCalendarDays } from "react-icons/lu";

import { IoMdPaper } from "react-icons/io";

import { MdOutlineQuiz } from "react-icons/md";
import { FiBook } from "react-icons/fi";



export const useMenuItems = () => {


  const menuItemsUser = [
    {
      id: "dashboard",
      title: "Dashboard",
      icon: AiOutlineDashboard,
      route: "/user-dashboard",
      submenu: [],
    },
 
    {
      id: "broker",
      title: "Broker",
      icon: LuCalendarDays,
      route: "/calendar",
    },
     {
      id: "lead",
      title: "Leads",
      icon: LuCalendarDays,
      route: "/lead",
    },
    {
      id: "leadObject",
      title: "Lead Object",
      icon: IoMdPaper,
      route: "/leadsTable",
      submenu: [],
    },
   
    {
      id: "tickets",
      title: "Tickets",
      icon: FiBook,
      route: "/tickets",
      submenu: [],
    },
    {
      id: "postalCodes",
      title: "Postal Codes",
      icon: MdOutlineQuiz,
      route: "/postalCodes",
      submenu: [],
    },

  
   
  ];
  return {  menuItemsUser };
};
