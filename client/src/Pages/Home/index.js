import HomeBanner from "../../Components/HomeBanner";
import Button from "@mui/material/Button";
import { IoIosArrowRoundForward } from "react-icons/io";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ProductItem from "../../Components/ProductItem";
import HomeCat from "../../Components/HomeCat";

import { MyContext } from "../../App";
import { fetchDataFromApi } from "../../utils/api";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import CircularProgress from "@mui/material/CircularProgress";

import homeBannerPlaceholder from "../../assets/images/homeBannerPlaceholder.jpg";
import Banners from "../../Components/banners";
import { Link } from "react-router-dom";

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [selectedCat, setselectedCat] = useState();
  const [filterData, setFilterData] = useState([]);
  const [homeSlides, setHomeSlides] = useState([]);

  const [value, setValue] = React.useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [bannerList, setBannerList] = useState([]);
  const [randomCatProducts, setRandomCatProducts] = useState([]);
  const [homeSideBanners, setHomeSideBanners] = useState([]);

  const context = useContext(MyContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    context.setisHeaderFooterShow(true);
    // setselectedCat(context.categoryData[0]?.name);

    const location = localStorage.getItem("location");

    if (location !== null && location !== "" && location !== undefined) {
      fetchDataFromApi(`/api/products/featured?location=${location}`).then(
        (res) => {
          setFeaturedProducts(res);
        }
      );

      fetchDataFromApi(
        `/api/products?page=1&perPage=16&location=${location}`
      ).then((res) => {
        setProductsData(res);
      });
    }

    fetchDataFromApi("/api/homeBanner").then((res) => {
      setHomeSlides(res);
    });

    fetchDataFromApi("/api/banners").then((res) => {
      setBannerList(res);
    });

    fetchDataFromApi("/api/homeSideBanners").then((res) => {
      setHomeSideBanners(res);
    });

    // context.setEnableFilterTab(false);
    // context.setIsBottomShow(true);
  }, []);
  return (
    <>
      {homeSlides?.length !== 0 ? (
        <HomeBanner data={homeSlides} />
      ) : (
        <div className="container mt-3">
          <div className="homeBannerSection">
            <img src={homeBannerPlaceholder} className="w-100" />
          </div>
        </div>
      )}

      {context.categoryData?.length !== 0 && (
        <HomeCat catData={context.categoryData} />
      )}

      <section className="homeProducts pb-0">
        <div className="container">
          <div className="row homeProductsRơ">
            <div className="col-md-3">
              <div className="sticky">
                {homeSideBanners?.length !== 0 &&
                  homeSideBanners?.map((item, index) => {
                    return (
                      <div className="banner mb-3" key={index}>
                        {item?.subCatId !== null ? (
                          <Link
                            to={`/products/subCat/${item?.subCatId}`}
                            className="box"
                          >
                            <img
                              src={item?.images[0]}
                              className="w-100 transition"
                              alt="banner img"
                            />
                          </Link>
                        ) : (
                          <Link
                            to={`/products/category/${item?.catId}`}
                            className="box"
                          >
                            <img
                              src={item?.images[0]}
                              className="cursor w-100 transition"
                              alt="banner img"
                            />
                          </Link>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="col-md-9 productRow">
              <div className="d-flex align-items-center res-flex-column">
                <div className="info" style={{ width: "35%" }}>
                  <h3 className="mb-0 hd">BEST SELLERS</h3>
                  <p className="text-light text-sml mb-0">
                    Do not miss the current offers until the end of December.
                  </p>
                </div>

                <Button className="viewAllBtn ml-auto">
                  View All
                  <IoIosArrowRoundForward />
                </Button>
              </div>

              <div className="product_row productRow2 w-100 mt-4- d-flex">
                <ProductItem></ProductItem>
              </div>

              <div className="d-flex align-items-center mt-4">
                <div className="info w-75">
                  <h3 className="mb-0 hd">NEW PRODUCT</h3>
                  <p className="text-light text-sml mb-0">
                    New products with updated stocks.
                  </p>
                </div>

                <Button className="viewAllBtn ml-auto">
                  View All
                  <IoIosArrowRoundForward />
                </Button>
              </div>

              <div className="product_row productRow2 w-100 mt-4- d-flex">
                <ProductItem></ProductItem>
              </div>

              {bannerList?.length !== 0 && (
                <Banners data={bannerList} col={3} />
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;
