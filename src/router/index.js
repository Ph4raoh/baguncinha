import { createWebHistory, createRouter } from "vue-router";
import Home from "../pages/home.vue";
import Batata from "../pages/batata.vue";
import Combo from "../pages/combo.vue";
import Calabresa from "../pages/calabresa.vue";
import Burger from "../pages/burger.vue";
import Bebida from "../pages/bebidas.vue";
import Checkout from "../pages/checkout.vue";
import Entrega from "../pages/entrega.vue";

const routes = [
  {
    path: "/",
    name: "app",
    component: Home,
  },
  {
    path: "/batata",
    name: "batata",
    component: Batata,
  },
  {
    path: "/combo",
    name: "combo",
    component: Combo,
  },
  {
    path: "/calabresa",
    name: "calabresa",
    component: Calabresa,
  },
  {
    path: "/burger",
    name: "burger",
    component: Burger,
  },
  {
    path: "/bebida",
    name: "bebida",
    component: Bebida,
  },
  {
    path: "/checkout",
    name: "checkout",
    component: Checkout,
  },
  {
    path: "/entrega",
    name: "entrega",
    component: Entrega,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
