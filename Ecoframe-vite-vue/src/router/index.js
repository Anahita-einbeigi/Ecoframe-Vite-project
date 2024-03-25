import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import ShopView from "../views/ShopView.vue";
import CartView from "../views/CartView.vue";
import CustomerSupportView from "../views/CustomerSupportView.vue";
import SalesView from "../views/SalesView.vue";
import ProductPageView from "../views/ProductPageView.vue";
import CheckoutView from "@/views/CheckoutView.vue";
import OrderConfirmationView from "@/views/OrderConfirmationView.vue";
import CreateAccountView from "@/views/CreateAccountView.vue";
import MyAccountView from "@/views/MyAccountView.vue";
import LoginPageView from "@/views/LoginPageView.vue";
import FavoriteListView from "@/views/FavoriteListView.vue";
import AboutUsView from "@/views/AboutUsView.vue";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/customersupport",
      name: "CustomerSupport",
      component: CustomerSupportView,
    },
    {
      path: "/product/:productId",
      name: "ProductPage",
      component: ProductPageView,
    },
    {
      path: "/sales",
      name: "Sales",
      component: SalesView,
    },
    {
      path: "/shop",
      name: "Shop",
      component: ShopView,
    },
    {
      path: "/shop/:category?",
      name: "Shop",
      component: ShopView,
    },
    {
      path: "/cart",
      name: "Cart",
      component: CartView,
    },
    {
      path: "/checkout",
      name: "Checkout",
      component: CheckoutView,
    },
    {
      path: "/orderconfirmation",
      name: "OrderConfirmation",
      component: OrderConfirmationView,
    },
    {
      path: "/createaccount",
      name: "CreateAccount",
      component: CreateAccountView,
    },
    {
      path: "/loginpage",
      name: "LoginPage",
      component: LoginPageView,
    },
    {
      path: "/myaccount",
      name: "MyAccount",
      component: MyAccountView,
    },
    {
      path: "/favoritelist",
      name: "FavoriteList",
      component: FavoriteListView,
    },
    {
      path: "/about-us",
      name: "AboutUs",
      component: AboutUsView,
    },
  ],
});

export default router;
