import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./responsive.css";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import React, { createContext, useEffect, useState, useRef } from "react";
import Products from "./pages/Products";
import Category from "./pages/Category/categoryList";
import ProductDetails from "./pages/ProductDetails";
import ProductUpload from "./pages/Products/addProduct";
import EditProduct from "./pages/Products/editProduct";
import CategoryAdd from "./pages/Category/addCategory";
import EditCategory from "./pages/Category/editCategory";
import SubCatAdd from "./pages/Category/addSubCat";
import SubCatList from "./pages/Category/subCategoryList";
import AddProductRAMS from "./pages/Products/addProductRAMS";
import ProductWeight from "./pages/Products/addProductWeight";
import ProductSize from "./pages/Products/addProductSize";

import { SnackbarProvider, useSnackbar } from "notistack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import LoadingBar from "react-top-loading-bar";
import { fetchDataFromApi } from "./utils/api";

import axios from "axios";
import AddHomeBannerSlide from "./pages/HomeBanner/addHomeSlide";
import HomeBannerSlideList from "./pages/HomeBanner/homeSlideList";
import EditHomeBannerSlide from "./pages/HomeBanner/editSlide";

import BannersList from "./pages/Banners/bannerList";
import AddBanner from "./pages/Banners/addHomeBanner";
import EditBanner from "./pages/Banners/editHomeBanner";

import HomeSideBannersList from "./pages/HomeSideBanners/bannerList";
import AddHomeSideBanner from "./pages/HomeSideBanners/addHomeSideBanner";
import EditHomeSideBanner from "./pages/HomeSideBanners/editHomeSideBanner";

const MyContext = createContext();

function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isHideSidebarAndHeader, setisHideSidebarAndHeader] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [progress, setProgress] = useState(0);
  const [catData, setCatData] = useState([]);
  const [baseUrl, setBaseUrl] = useState("http://localhost:4002");
  const [alertBox, setAlertBox] = useState({
    msg: "",
    error: false,
    open: false,
  });

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openNav = () => {
    setIsOpenNav(true);
  };

  const handleClickVariant = (variant) => () => {
    // variant could be success, error, warning, info, or default
    enqueueSnackbar("This is a success message!", { variant });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertBox({
      open: false,
    });
  };

  useEffect(() => {
    setProgress(20);
    fetchCategory();
  }, []);

  const fetchCategory = () => {
    fetchDataFromApi("/api/category").then((res) => {
      setCatData(res);
      setProgress(100);
    });
  };

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebarAndHeader,
    setisHideSidebarAndHeader,
    theme,
    setTheme,
    windowWidth,
    openNav,
    isOpenNav,
    setIsOpenNav,
    handleClickVariant,
    alertBox,
    setAlertBox,
    setProgress,
    baseUrl,
    setBaseUrl,
    catData,
    fetchCategory,
  };

  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          className="topLoadingBar"
        />

        <Snackbar
          open={alertBox.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={alertBox.error === false ? "success" : "error"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {alertBox.msg}
          </Alert>
        </Snackbar>
        {isHideSidebarAndHeader !== true && <Header />}

        <div className="main d-flex">
          {isHideSidebarAndHeader !== true && (
            <>
              <div
                className={`sidebarOverlay d-none ${
                  isOpenNav === true && "show"
                }`}
                onClick={() => setIsOpenNav(false)}
              ></div>
              <div
                className={`sidebarWrapper ${
                  isToggleSidebar === true ? "toggle" : ""
                } ${isOpenNav === true ? "open" : ""}`}
              >
                <Sidebar />
              </div>
            </>
          )}

          <div
            className={`content ${isHideSidebarAndHeader === true && "full"} ${
              isToggleSidebar === true ? "toggle" : ""
            }`}
          >
            <Routes>
              <Route path="/" exact={true} element={<Dashboard />} />
              <Route path="/dashboard" exact={true} element={<Dashboard />} />
              <Route path="/products" exact={true} element={<Products />} />
              <Route
                path="/product/details/:id"
                exact={true}
                element={<ProductDetails />}
              />
              <Route
                path="/product/upload"
                exact={true}
                element={<ProductUpload />}
              />
              <Route
                path="/product/edit/:id"
                exact={true}
                element={<EditProduct />}
              />
              <Route path="/category" exact={true} element={<Category />} />
              <Route
                path="/category/add"
                exact={true}
                element={<CategoryAdd />}
              />
              <Route
                path="/category/edit/:id"
                exact={true}
                element={<EditCategory />}
              />
              <Route
                path="/subCategory/"
                exact={true}
                element={<SubCatList />}
              />
              <Route
                path="/subCategory/add"
                exact={true}
                element={<SubCatAdd />}
              />
              <Route
                path="/productRAMS/add"
                exact={true}
                element={<AddProductRAMS />}
              />
              <Route
                path="/productWEIGHT/add"
                exact={true}
                element={<ProductWeight />}
              />
              <Route
                path="/productSIZE/add"
                exact={true}
                element={<ProductSize />}
              />
              <Route path="/banners" exact={true} element={<BannersList />} />
              <Route path="/banners/add" exact={true} element={<AddBanner />} />
              <Route
                path="/banners/edit/:id"
                exact={true}
                element={<EditBanner />}
              />
              <Route
                path="/homeBannerSlide/add"
                exact={true}
                element={<AddHomeBannerSlide />}
              />
              <Route
                path="/homeBannerSlide/list"
                exact={true}
                element={<HomeBannerSlideList />}
              />
              <Route
                path="/homeBannerSlide/edit/:id"
                exact={true}
                element={<EditHomeBannerSlide />}
              />
              <Route
                path="/homeSideBanners"
                exact={true}
                element={<HomeSideBannersList />}
              />
              <Route
                path="/homeSideBanners/add"
                exact={true}
                element={<AddHomeSideBanner />}
              />
              <Route
                path="/homeSideBanners/edit/:id"
                exact={true}
                element={<EditHomeSideBanner />}
              />
            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
