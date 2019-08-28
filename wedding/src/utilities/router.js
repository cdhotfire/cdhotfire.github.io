import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

var router = new VueRouter({
  routes: [
    {
      path: "/",
      name: "",
      component: async () => await import("/components/index")
    }
  ]
});

router.beforeEach((to, from, next) => {
  Pace.start();
  next();
});

export default router;
