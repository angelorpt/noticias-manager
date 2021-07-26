const MainLayout = () => import("layouts/MainLayout.vue");
const Home = () => import("pages/Index.vue");

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [{ path: "/", component: Home }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
