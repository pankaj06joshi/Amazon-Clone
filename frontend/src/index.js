import Header from "./components/Header";
import CartScreen from "./screens/CartScreen";
import Error404Screen from "./screens/Error404Screen";
import HomeScreen from "./screens/HomeScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import ProductScreen from "./screens/ProductScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen ";
import ShippingScreen from "./screens/shippingScreen";
import SigninScreen from "./screens/SigninScreen";
import OrderScreen from "./screens/OrderScreen";
import { hideLoading, parseRequestUrl, showLoading } from "./utils";

const routes = {
  "/": HomeScreen,
  "/product/:id": ProductScreen,
  "/order/:id": OrderScreen,
  "/cart/:id": CartScreen,
  "/cart": CartScreen,
  "/signin": SigninScreen,
  "/register": RegisterScreen,
  "/profile": ProfileScreen,
  "/shipping": ShippingScreen,
  "/payment": PaymentScreen,
  "/placeorder": PlaceOrderScreen,
};

const router = async () => {
  showLoading();
  const request = parseRequestUrl();
  const parseUrl =
    (request.resource ? `/${request.resource}` : "/") +
    (request.id ? "/:id" : "") +
    (request.verb ? `/${request.verb}` : "");
  const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
  const header = document.getElementById("header-container");
  header.innerHTML = await Header.render();
  await Header.after_render();
  const main = document.getElementById("main-container");
  main.innerHTML = await screen.render();
  if (screen.after_render) await screen.after_render();
  hideLoading();
};

window.addEventListener("load", router);
window.addEventListener("hashchange", router);
