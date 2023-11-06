import { useState, useEffect } from "react";
import { useSellerAuth } from "../ContextAuth/Sellerauthcontext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";
export default function SellerPrivateroute() {
  const [ok, setOk] = useState(false);
  const [sellerauth, setsellerAuth] = useSellerAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get("http://localhost:5000/api/seller-auth", {
        headers: {
          Authorization: sellerauth?.token,
        },
      });
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (sellerauth?.token) authCheck();
  }, [sellerauth?.token]);
  return ok ? <Outlet /> : <Spinner path="" />;
}