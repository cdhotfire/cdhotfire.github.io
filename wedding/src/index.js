// stylesheets
import "./scss/default.scss";

// libraries
import "core-js/stable";
import "regenerator-runtime/runtime";

import Vue from "vue";
import router from "./utilities/router";
import app from "./components/app.vue";

new Vue({
  el: "#app",
  router,
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
