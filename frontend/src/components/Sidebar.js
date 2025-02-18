import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import LoggedInUser from "./LoggedInUser";

const Sidebar = ({ setActivePage }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const path = location.pathname.replace("/", "") || "/";
    setActivePage(path);
  }, [location, setActivePage]);

  const getIconClass = (path, defaultClass, activeClass) => {
    return location.pathname === path ? activeClass : defaultClass;
  };
  const toggleSubmenu = (menuName) => {
    setOpenMenu((prevOpenMenu) =>
      prevOpenMenu === menuName ? null : menuName
    );
  };
  const closeAllMenus = () => {
    setOpenMenu(null);
  };

  return (
    <div className="bg-[#EDF1F1] h-full w-[250px] fixed font-customFont">
      <div className="flex items-center justify-start ms-3 mt-3">
        <img src="/images/Logo.jpeg" className="w-[30px]" alt="Logo" />
        <p className="text-black font-bold text-2xl ml-1">PakTex</p>
      </div>

      <div className="mt-2 ms-3 text-start text-md">
        <div
          className={`flex items-center p-2 pl-2 cursor-pointer ${
            location.pathname === "/dashboard"
              ? "bg-white text-black rounded-md shadow-sm"
              : "text-black"
          }`}
          onClick={() => {
            navigate("/dashboard");
            closeAllMenus();
          }}
        >
          <i
            className={`${getIconClass(
              "/dashboard",
              "fa-solid fa-table-columns text-gray-500",
              "fa-solid fa-table-columns text-themeColor"
            )} mr-3`}
          ></i>
          <span className="flex-1">Dashboard</span>
        </div>
        <div
          className={`flex items-center p-2 pl-2 cursor-pointer ${
            location.pathname === "/intimate"
              ? "bg-white text-black rounded-md shadow-sm"
              : "text-black"
          }`}
          onClick={() => {
            navigate("/intimate");
            closeAllMenus();
          }}
        >
          <i
            className={`${getIconClass(
              "/intimate",
              "fa-solid fa-money-check text-gray-500",
              "fa-solid fa-money-check text-themeColor"
            )} mr-3`}
          ></i>
          <span className="flex-1">Intimate</span>
        </div>
        <div
          className={`flex items-center p-2 pl-2 cursor-pointer ${
            location.pathname === "/limsFirst"
              ? "bg-white text-black rounded-md shadow-sm"
              : "text-black"
          }`}
          onClick={() => {
            navigate("/limsFirst");
            closeAllMenus();
          }}
        >
          <i
            className={`${getIconClass(
              "/limsFirst",
              "fa-solid fa-flask-vial text-gray-500",
              "fa-solid fa-flask-vial text-themeColor"
            )} mr-3`}
          ></i>
          <span className="flex-1">LIMS First</span>
        </div>
        <div
          className={`flex items-center p-2 pl-2 cursor-pointer ${
            location.pathname === "/batch"
              ? "bg-white text-black rounded-md shadow-sm"
              : "text-black"
          }`}
          onClick={() => {
            navigate("/batch");
            closeAllMenus();
          }}
        >
          <i
            className={`${getIconClass(
              "/batch",
              "fa-solid fa-boxes-stacked text-gray-500",
              "fa-solid fa-boxes-stacked text-themeColor"
            )} mr-3`}
          ></i>
          <span className="flex-1">Batch Management</span>
        </div>
        <div
          className={`flex items-center p-2 pl-2 cursor-pointer ${
            location.pathname === "/production"
              ? "bg-white text-black rounded-md shadow-sm"
              : "text-black"
          }`}
          onClick={() => {
            navigate("/production");
            closeAllMenus();
          }}
        >
          <i
            className={`${getIconClass(
              "/production",
              "fa-solid fa-industry text-gray-500",
              "fa-solid fa-industry text-themeColor"
            )} mr-3`}
          ></i>
          <span className="flex-1">Production</span>
        </div>
        <div
          className={`flex items-center p-2 pl-2 cursor-pointer ${
            location.pathname === "/limsSecond"
              ? "bg-white text-black rounded-md shadow-sm"
              : "text-black"
          }`}
          onClick={() => {
            navigate("/limsSecond");
            closeAllMenus();
          }}
        >
          <i
            className={`${getIconClass(
              "/limsSecond",
              "fa-solid fa-flask-vial text-gray-500",
              "fa-solid fa-flask-vial text-themeColor"
            )} mr-3`}
          ></i>
          <span className="flex-1">LIMS Second</span>
        </div>
        <div
          className={`flex items-center p-2 pl-2 cursor-pointer ${
            location.pathname === "/stores"
              ? "bg-white text-black rounded-md shadow-sm"
              : "text-black"
          }`}
          onClick={() => {
            navigate("/stores");
            closeAllMenus();
          }}
        >
          <i
            className={`${getIconClass(
              "/stores",
              "fa-solid fa-flask-vial text-gray-500",
              "fa-solid fa-flask-vial text-themeColor"
            )} mr-3`}
          ></i>
          <span className="flex-1">Stores</span>
        </div>
        <div
          className={`flex items-center p-2 pl-2 cursor-pointer ${
            location.pathname === "/dispatchBay"
              ? "bg-white text-black rounded-md shadow-sm"
              : "text-black"
          }`}
          onClick={() => {
            navigate("/dispatchBay");
            closeAllMenus();
          }}
        >
          <i
            className={`${getIconClass(
              "/dispatchBay",
              "fa-solid fa-cube text-gray-500",
              "fa-solid fa-cube text-themeColor"
            )} mr-3`}
          ></i>
          <span className="flex-1">Dispatch Bay</span>
        </div>
        <div
          className={`flex items-center p-2 pl-2 cursor-pointer ${
            location.pathname === "/glp"
              ? "bg-white text-black rounded-md shadow-sm"
              : "text-black"
          }`}
          onClick={() => {
            navigate("/glp");
            closeAllMenus();
          }}
        >
          <i
            className={`${getIconClass(
              "/glp",
              "fa-solid fa-file-shield text-gray-500",
              "fa-solid fa-file-shield text-themeColor"
            )} mr-3`}
          ></i>
          <span className="flex-1">GLP</span>
        </div>
        <div
          className={`flex items-center p-2 pl-2 cursor-pointer ${
            location.pathname === "/qms"
              ? "bg-white text-black rounded-md shadow-sm"
              : "text-black"
          }`}
          onClick={() => {
            navigate("/qms");
            closeAllMenus();
          }}
        >
          <i
            className={`${getIconClass(
              "/qms",
              "fa-solid fa-chart-bar text-gray-500",
              "fa-solid fa-chart-bar text-themeColor"
            )} mr-3`}
          ></i>
          <span className="flex-1">QMS</span>
        </div>
        <div
          className={`flex items-center p-2 pl-2 cursor-pointer ${
            location.pathname === "/users"
              ? "bg-white text-black rounded-md shadow-sm"
              : "text-black"
          }`}
          onClick={() => {
            navigate("/users");
            closeAllMenus();
          }}
        >
          <i
            className={`${getIconClass(
              "/users",
              "fa-solid fa-users text-gray-500",
              "fa-solid fa-users text-themeColor"
            )} mr-2`}
          ></i>
          <span className="flex-1">Users</span>
        </div>
        <div
          className={`flex flex-col rounded-lg px-1 ${
            openMenu === "settings"
              ? "bg-white border-2 shadow-xs"
              : ""
          }`}
        >
          <div
            className={`flex items-center p-1 cursor-pointer rounded-md`}
            onClick={() => toggleSubmenu("settings")}
          >
            <i
              className={`${
                openMenu === "settings"
                  ? "fa-solid fa-cogs text-themeColor"
                  : "fa-solid fa-cogs text-gray-500"
              } mr-2`}
            ></i>
            <span className="flex-1">Settings</span>
            <span className="text-gray-600">
              {openMenu === "settings" ? (
                <i className="fa-solid fa-angle-up"></i>
              ) : (
                <i className="fa-solid fa-angle-down"></i>
              )}
            </span>
          </div>

          {/* Submenu for Settings */}
          {openMenu === "settings" && (
            <div className="space-y-2 bg-white py-1">
              <div
                className={`py-1 px-2 mx-4 text-start rounded-lg cursor-pointer ${
                  location.pathname === "/products"
                    ? "bg-[#F9F9FA] rounded-md shadow-md border"
                    : "text-black"
                }`}
                onClick={() => navigate("/products")}
              >
                Products
              </div>
              <div
                className={`py-1 px-2 mx-4 text-start rounded-lg cursor-pointer ${
                  location.pathname === "/instruments"
                    ? "bg-[#F9F9FA] rounded-md shadow-md border"
                    : "text-black"
                }`}
                onClick={() => navigate("/instruments")}
              >
                Instruments
              </div>
              <div
                className={`py-1 px-2 mx-4 text-start rounded-lg cursor-pointer ${
                  location.pathname === "/medias"
                    ? "bg-[#F9F9FA] rounded-md shadow-md border"
                    : "text-black"
                }`}
                onClick={() => navigate("/medias")}
              >
                Media
              </div>
              <div
                className={`py-1 px-2 mx-4 text-start rounded-lg cursor-pointer ${
                  location.pathname === "/chemicals"
                    ? "bg-[#F9F9FA] rounded-md shadow-md border"
                    : "text-black"
                }`}
                onClick={() => navigate("/chemicals")}
              >
                Chemical
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full p-2 pl-3 flex items-center cursor-pointer text-gray-700">
        <LoggedInUser />
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  setActivePage: PropTypes.func.isRequired,
};

export default Sidebar;
