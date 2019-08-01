// stylesheets
import "./scss/default.scss";

// libraries
import "@babel/polyfill";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

import Vue from "vue";
import router from "./utilities/router";
import app from "./components/app.vue";

new Vue({
  el: "#app",
  router,
  created() {
    AOS.init({
      duration: 1000
    });
  },
  render: h => h(app)
});

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/sw.js")
//       .then(registration => {
//         console.log("SW registered: ", registration);
//       })
//       .catch(registrationError => {
//         console.log("SW registration failed: ", registrationError);
//       });
//   });
// }
