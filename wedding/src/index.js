import Vue from "vue";
import router from "./utilities/router";
import "./utilities/styles";
import "./utilities/icons";
import "./utilities/components";
import app from "./components/app.vue";

new Vue({
  el: "#app",
  router,
  render: h => h(app)
});

navigator.serviceWorker.getRegistrations().then(function(registrations) {
  for (let registration of registrations) {
    registration.unregister();
  }
});
