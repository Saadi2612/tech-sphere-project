import { useState, useEffect, useContext, createContext } from "react";

const AuthSellerContext = createContext();

//Auth provider for getting user data
const AuthSellerProvider = ({ children }) => {
  const [sellerauth, setsellerAuth] = useState({
    seller: null,
    token: "",
  });
  useEffect(() => {
    const data = localStorage.getItem("sellerauth");
    if (data) {
      const parseData = JSON.parse(data);
      setsellerAuth({
        ...sellerauth,
        seller: parseData.seller,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []);
  return (
    <AuthSellerContext.Provider value={[sellerauth, setsellerAuth]}>
      {children}
    </AuthSellerContext.Provider>
  );
};

const useSellerAuth = () => useContext(AuthSellerContext);
export { useSellerAuth, AuthSellerProvider };
