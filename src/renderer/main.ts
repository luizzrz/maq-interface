import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import { createWebHistory, createRouter } from "vue-router";

// styles
// import './style.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";

// layouts
import User from "./layouts/User.vue";
// import Auth from "./layouts/Auth.vue";

// views for Automatic Mode layout
import AllModbus from "./views/debug/AllModbus.vue";

// views for Auth layout
// import Login from "./views/auth/Login.vue";
// import Register from "./views/auth/Register.vue";

// views without layouts
// import Landing from "./views/Landing.vue";
// import Profile from "./views/Profile.vue";
// import Index from "./views/Index.vue";

// routes
const routes = [
  {
    path: "/debug",
    redirect: "/debug/view-all-modbus",
    component: User,
    children: [
      {
        path: "/debug/view-all-modbus",
        component: AllModbus,
      },
      // {
      //   path: "/admin/settings",
      //   component: Settings,
      // },
      // {
      //   path: "/admin/tables",
      //   component: Tables,
      // },
      // {
      //   path: "/admin/maps",
      //   component: Maps,
      // },
    ],
  },
  // {
  //   path: "/auth",
  //   redirect: "/auth/login",
  //   component: Auth,
  //   children: [
  //     {
  //       path: "/auth/login",
  //       component: Login,
  //     },
  //     {
  //       path: "/auth/register",
  //       component: Register,
  //     },
  //   ],
  // },
  // {
  //   path: "/landing",
  //   component: Landing,
  // },
  // {
  //   path: "/profile",
  //   component: Profile,
  // },
  // {
  //   path: "/",
  //   component: Index,
  // },
  { path: "/:pathMatch(.*)*", redirect: "/debug/view-all-modbus" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

createApp(App).use(router).mount("#app");
