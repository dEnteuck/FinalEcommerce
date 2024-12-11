import { Link } from "react-router-dom";
import Logo from "../../assets/images/lgogo.jpeg";
import CountryDropdown from "../CountryDropdown";
import Button from "@mui/material/Button";
import { FiUser } from "react-icons/fi";
import { IoBagOutline } from "react-icons/io5";
import SearchBox from "./SearchBox";
import Navigation from "./Navigation";
import { MyContext } from "../../App";
import { useContext } from "react";

const Header = () => {
  const context = useContext(MyContext);

  // Tính tổng số sản phẩm và tổng tiền trong giỏ hàng
  const totalItems = context.cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const totalPrice = context.cartItems
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <>
      <div className="headerWrapper">
        <div className="top-strip bg-blue">
          <div className="container">
            <p className="mb-0 mt-0 text-center">
              Due to the <b>Yagi Strom</b>, orders may be processed with a
              slight delay
            </p>
          </div>
        </div>

        <header className="header">
          <div className="container">
            <div className="row">
              <div className="logoWrapper d-flex align-items-center col-sm-2">
                <Link to={"/"}>
                  <img src={Logo} alt="Logo" />
                </Link>
              </div>
              <div className="col-sm-10 d-flex align-items-center part2">
                <SearchBox />
                <div className="part3 d-flex align-items-center ml-auto">
                  {context.isLogin !== true && context.windowWidth > 992 && (
                    <Link to="/signIn">
                      <Button className="btn-blue btn-round mr-3">
                        Sign In
                      </Button>
                    </Link>
                  )}
                  <div className="ml-auto cartTab d-flex align-items-center">
                    <span className="price">${totalPrice}</span>{" "}
                    {/* Hiển thị tổng giá */}
                    <Link to="/cart">
                      <div className="position-relative ml-2">
                        <Button className="circle ">
                          <IoBagOutline />
                        </Button>
                        <span className="count d-flex align-items-center justify-content-center">
                          {totalItems} {/* Hiển thị số sản phẩm */}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <Navigation />
      </div>
    </>
  );
};

export default Header;
