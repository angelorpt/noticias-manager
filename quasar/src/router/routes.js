const MainLayout = () => import("layouts/MainLayout.vue");
const Home = () => import("pages/Index.vue");

const NoticiaIndex = () => import("pages/Noticia/Index.vue");
const NoticiaVisualizar = () => import("pages/Noticia/Visualizar.vue");

const routes = [
  {
    path: "/noticias",
    component: MainLayout,
    children: [
      { path: "/noticias", component: NoticiaIndex },
      {
        path: "/noticias/visualizar/:noticia_id",
        component: NoticiaVisualizar,
        props: true
      }
    ]
  },
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
