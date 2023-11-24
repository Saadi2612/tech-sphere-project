import React, { useEffect, useState } from "react";
import "./Header.css";
import { useAuth } from "./ContextAuth/Auth";
import logo from "../Assets/TechSphere.svg";
import { Link, NavLink } from "react-router-dom";
import { useSellerAuth } from "./ContextAuth/Sellerauthcontext";
import { useCartContext } from "./Cart_context";

import { BsChevronDown } from "react-icons/bs";
const navMenu = [
  {
    title: "Home",
    url: "/Home",
    cName: "nav-links",
  },
  {
    title: "About",
    url: "/About",
    cName: "nav-links",
  },
  {
    title: "Categories",
    url: "#",
    cName: "nav-links",
  },
];
const Header = () => {
  const [auth, setAuth] = useAuth();
  const { cart } = useCartContext();
  const [sellerauth, setsellerAuth] = useSellerAuth();
  const [menuClick, setMenuClick] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  //handlelogout

  const handlesellerLogout = () => {
    setsellerAuth({
      ...sellerauth,
      seller: null,
      token: "",
    });

    localStorage.removeItem("sellerauth");
  };

  useEffect(() => {
    let prevScrollPos = window.scrollY;

    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const threshold = 500; // Set your desired threshold value here (in pixels)

      if (currentScrollPos > prevScrollPos && currentScrollPos > threshold) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuClick = () => {
    setMenuClick(!menuClick);
  };

  return (
    <nav className={`navbar-items ${isVisible ? "visible" : "hidden"}`}>
      <div className="nav-icons-mobile">
        {/* <Link to="" className="nav-icons">
          <i
            className="fa-solid fa-magnifying-glass fa-xl"
            style={{ color: "#000000" }}
          ></i>
        </Link> */}
        <Link to="/CartPage" className="nav-icons">
          <span className="fa-stack has-badge" data-count={cart.length}>
            <i
              className="fa-solid fa-cart-shopping fa-xl"
              style={{ color: "#000000" }}
            ></i>
          </span>
        </Link>
      </div>

      <div className="menu-icon" onClick={handleMenuClick}>
        <i
          className={
            menuClick
              ? "fas fa-times fa-xl cursor-pointer"
              : "fas fa-bars fa-xl cursor-pointer"
          }
        ></i>
      </div>

      <ul className={menuClick ? "nav-menu active" : "nav-menu"}>
        {navMenu.map((item, index) => (
          <li key={index}>
            {/* <i className="fa-solid fa-house"></i> */} 
            <Link
              className={`${item.cName} ${
                item.title === "Categories" ? "group relative" : ""
              }`}
              to={item.url}
            >
              {item.title}
              <div className=" absolute top-10 -left-3 hidden group-hover:flex hover:flex  group-hover:flex-col items-center justify-center p-4 gap-2 bg-slate-200 shadow-lg rounded-lg">
                <Link
                  to="/LaptopPage"
                  className="text-lg text-gray-700 font-medium text-left"
                >
                  Laptops
                </Link>
                <Link
                  to="/HeadphonesPage"
                  className="text-lg text-gray-700 font-medium text-left"
                >
                  Headphones
                </Link>
              </div>
            </Link>
          </li>
        ))}

        {/* ***************** nav icons ************** */}
        <div className="nav-icons-parent">
          {/* <li>
            <a href="#" className="nav-icons-search-cart">
              <i
                className="fa-solid fa-magnifying-glass fa-xl"
                style={{ color: "#000000" }}
              ></i>
            </a>
          </li> */}

          <li>
            <Link to="/CartPage" className="nav-icons-search-cart">
              <span className="fa-stack has-badge" data-count={cart.length}>
                <i
                  className="fa-solid fa-cart-shopping fa-xl"
                  style={{ color: "#000000" }}
                ></i>
              </span>
            </Link>
          </li>

          <li>
            {!sellerauth?.seller ? (
              <>
                <li>
                  <NavLink to="/SellerLogin">Seller</NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/SellerHome" className="dropdown-item">
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    onClick={handlesellerLogout}
                    to="/SellerLogin"
                    className="dropdown-item"
                  >
                    Logout
                  </NavLink>
                </li>
              </>
            )}
          </li>

          {/*acountt */}
          <li>
            {!auth?.user ? (
              <>
                <li>
                  <NavLink to="/Login">Buyer</NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    to={
                      auth?.user.role === 1
                        ? "/adminHome/users"
                        : "/UserProfile"
                    }
                    className="dropdown-item"
                  >
                    Profile
                  </NavLink>
                </li>
              </>
            )}
          </li>
        </div>
      </ul>

      <div>
        <img src={logo} className="nav-logo" />
      </div>
    </nav>
  );
};

export default Header;
