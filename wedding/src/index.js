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


// delete old service worked information
navigator.serviceWorker.getRegistrations().then(function(registrations) {
  for (let registration of registrations) {
    registration.unregister();
  }
});

if ('caches' in window) {
    caches.keys()
      .then(function(keyList) {
          return Promise.all(keyList.map(function(key) {
              return caches.delete(key);
          }));
      })
}