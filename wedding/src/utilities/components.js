import Vue from "vue";

import "bootstrap";
import jquery from "jquery";

window.jQuery = jquery;
window.$ = jquery;

// libraries
import "regenerator-runtime/runtime";

import VueLazyload from "vue-lazyload";
Vue.use(VueLazyload, {
  attempt: 2,
  preLoad: 1.3,
  throttleWait: 1000,
  observer: true,
  observerOptions: {
    rootMargin: "100px",
    threshold: 1
  }
});

import VueConfetti from "vue-confetti";
Vue.use(VueConfetti);

var VueScrollTo = require("vue-scrollto");
Vue.use(VueScrollTo);

import VueProgress from "vue-progress-path";

Vue.use(VueProgress, {
  // defaultShape: 'circle',
});

import VueLodash from "vue-lodash";
import { filter } from "lodash";

Vue.use(VueLodash, { lodash: { filter } });
