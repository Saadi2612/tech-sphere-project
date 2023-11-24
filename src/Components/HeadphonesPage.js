import React, { useEffect, useState, lazy, Suspense } from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import "./HeadphonesPage.css";
import { Pagination, CircularProgress } from "@mui/material";
import heroImg from "../Assets/laptopHeroImg.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

const FilterBar = lazy(() => import("./FilterBar"));
const CardSection = lazy(() => import("./CardSection"));

const HeadphonesPage = () => {
  const [sortBy, setSortBy] = useState("Default");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/laptops");
      const laptopsproduct = response.data.filter(
        (laptop) => laptop.category === "Headphones"
      );
      console.log(laptopsproduct);
      setProducts(laptopsproduct);
      setLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleSortByChange = (e) => {
    const { value } = e.target;
    setSortBy(value);
  };

  const showingResults = () => {
    let to = (page - 1) * 8 + 8;
    let total = products?.length;

    if (to > total) {
      return (page - 1) * 8 + 1 + "-" + products?.length;
    } else {
      return (page - 1) * 8 + 1 + "-" + ((page - 1) * 8 + 8);
    }
  };

  return (
    <div>
      <Header />
      <HeroSection image={heroImg} text="Shop for Headphones" />

      <Suspense fallback={<CircularProgress />}>
        <FilterBar
          data={products}
          sortBy={sortBy}
          sortByChange={handleSortByChange}
          currentPage={page}
        />
      </Suspense>

      {loading ? (
        <CircularProgress />
      ) : products?.length ? (
        <>
          <Suspense fallback={<CircularProgress />}>
            <CardSection data={products} page={page} />
          </Suspense>

          <div className="pagination">
            <Pagination
              count={(products?.length / 8).toFixed(0)}
              variant="outlined"
              shape="rounded"
              onChange={(_, value) => {
                setPage(value);
              }}
            />
          </div>
        </>
      ) : (
        "No products to show"
      )}

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HeadphonesPage;
