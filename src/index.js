import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import CartPage from "./Components/CartPage";
import CartItem from "./Components/CartItem";
import LaptopPage from "./Components/LaptopPage";
import LaptopDetailPage from "./Components/LaptopDetailPage";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { CartProvider } from "./Components/Cart_context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cartcontext from "./Components/Cart_context";
import CartReducer from "./Components/CartReducer";
import CheckoutPage from "./Components/CheckoutPage";
import AdminHome from "./admin/AdminHome";
import Spinner from "./Components/Routes/Spinner";
import Footer from "./Components/Footer";
import Register from "./Components/Auth/Register";
import { AuthProvider } from "./Components/ContextAuth/Auth";
import Login from "./Components/Auth/Login";
import UserProfile from "./Components/User/UserProfile";
import PrivateRoute from "./Components/Routes/Private";
import ForgotPassword from "./Components/Auth/ForgotPassword";
import Adminroute from "./Components/Routes/Adminroute";
import CartCheckout from "./Components/CartCheckout";
import SellerRegister from "./Components/Auth/SellerRegister";
import SellerLogin from "./Components/Auth/SellerLogin";
import AdminProducts from "./admin/AdminProducts";
import Star from "./Components/Star";
import SellerPrivateroute from "./Components/Routes/SellerPrivateroute";
import SellerHome from "./Seller/SellerHome";
import { AuthSellerProvider } from "./Components/ContextAuth/Sellerauthcontext";
import AdminUsers from "./admin/AdminUsers";
import AdminSellers from "./admin/AdminSellers";
import AdminOrders from "./admin/AdminOrders";
import About from "./Components/About/About";
import SellerProducts from "./Seller/SellerProducts";
import HeadphonesPage from "./Components/HeadphonesPage";
import Chatbot from "./Components/Chatbot";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/Star",
    element: <Star />,
  },
  {
    path: "/About",
    element: <About />,
  },
  {
    path: "/Chatbot",
    element: <Chatbot />,
  },
  {
    path: "/AdminHome/products",
    element: <AdminProducts />,
  },
  {
    path: "/AdminHome/orders",
    element: <AdminOrders />,
  },
  {
    path: "/AdminHome/sellers",
    element: <AdminSellers />,
  },
  {
    path: "/AdminHome/users",
    element: <AdminUsers />,
  },
  {
    path: "/App",
    element: <App />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/SellerRegister",
    element: <SellerRegister />,
  },

  {
    path: "/UserProfile",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <UserProfile />,
      },
    ],
  },
  {
    path: "/AdminHome",
    element: <Adminroute />,
    children: [
      {
        path: "",
        element: <AdminHome />,
      },
      {
        path: "AdminHome/products",
        element: <AdminProducts />,
      },
      {
        path: "AdminHome/users",
        element: <AdminUsers />,
      },
      {
        path: "AdminHome/sellers",
        element: <AdminSellers />,
      },
      {
        path: "AdminHome/orders",
        element: <AdminOrders />,
      },
    ],
  },

  {
    path: "/SellerHome",
    element: <SellerPrivateroute />,
    children: [
      {
        path: "",
        element: <SellerHome />,
      },
      {
        path: "/SellerHome/my-products",
        element: <SellerProducts />,
      },
    ],
  },

  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/HeadphonesPage",
    element: <HeadphonesPage />,
  },
  {
    path: "/SellerLogin",
    element: <SellerLogin />,
  },

  {
    path: "/Spinner",
    element: <Spinner />,
  },
  {
    path: "/ForgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/Header",
    element: <Header />,
  },
  {
    path: "/CartItem",
    element: <CartItem />,
  },

  {
    path: "/LaptopdetailPage/:_id",
    element: <LaptopDetailPage />,
  },

  {
    path: "/LaptopPage",
    element: <LaptopPage />,
  },
  {
    path: "/CartPage",
    element: <CartPage />,
  },
  {
    path: "/CheckoutPage",
    element: <CheckoutPage />,
  },

  {
    path: "/CartReducer",
    element: <CartReducer />,
  },
  {
    path: "/Footer",
    element: <Footer />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
      <AuthProvider>
        <AuthSellerProvider>
          <RouterProvider router={router}></RouterProvider>
        </AuthSellerProvider>
      </AuthProvider>
    </CartProvider>
  </React.StrictMode>
);
