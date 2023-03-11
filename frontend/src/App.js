import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import { useEffect, useState } from "react";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./components/layout/Header/UserOptions";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UserList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import NotFound from "./components/layout/NotFound/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.setStripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  return (
    <>
      <Elements stripe={loadStripe(stripeApiKey)}>
        <Router>
          <Header />
          {isAuthenticated && <UserOptions user={user} />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />
            <Route path="/search" element={<Search />} />

            <Route
              element={
                <ProtectedRoute
                  isAdmin={true}
                  isAuthenticated={isAuthenticated}
                  user={user}
                />
              }
            >
              <Route path="/account" element={<Profile />} />
              <Route path="/me/update" element={<UpdateProfile />} />
              <Route path="/password/update" element={<UpdatePassword />} />
              <Route path="/login/shipping" element={<Shipping />} />
              <Route path="/order/confirm" element={<ConfirmOrder />} />
              <Route path="/process/payment" element={<Payment />} />
              <Route path="/success" element={<OrderSuccess />} />
              <Route path="/orders" element={<MyOrders />} />
              <Route path="/order/:id" element={<OrderDetails />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/products" element={<ProductList />} />
              <Route path="/admin/product" element={<NewProduct />} />
              <Route path="/admin/product/:id" element={<UpdateProduct />} />
              <Route path="/admin/orders" element={<OrderList />} />
              <Route path="/admin/order/:id" element={<ProcessOrder />} />
              <Route path="/admin/users" element={<UserList />} />
              <Route path="/admin/user/:id" element={<UpdateUser />} />
              <Route path="/admin/reviews" element={<ProductReviews />} />
            </Route>

            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="/cart" element={<Cart />} />

            <Route
              path="*"
              element={
                window.location.pathname === "/process/payment" ? null : (
                  <NotFound />
                ) 
              }
            />
          </Routes>
          <Footer />
        </Router>
      </Elements>
    </>
  );
}

export default App;
