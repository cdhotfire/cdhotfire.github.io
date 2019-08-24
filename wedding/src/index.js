// stylesheets
import "./scss/default.scss";
import "./scss/theme/agency.scss";

import jquery from "jquery";

window.jQuery = jquery;
window.$ = jquery;

import "./library/sakura/jquery-sakura.min.css";

// libraries
import "core-js/stable";
import "regenerator-runtime/runtime";

import Vue from "vue";
import router from "./utilities/router";
import app from "./components/app.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMapMarkedAlt,
  faClipboardCheck,
  faImages
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faMapMarkedAlt, faImages, faClipboardCheck);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;

import vueSmoothScroll from "vue2-smooth-scroll";
Vue.use(vueSmoothScroll);

import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload);

import VueConfetti from 'vue-confetti'
Vue.use(VueConfetti)

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
