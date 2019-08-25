import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons/faMapMarkedAlt";
import { faImages } from "@fortawesome/free-solid-svg-icons/faImages";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons/faClipboardCheck";
import { faHome } from "@fortawesome/free-solid-svg-icons/faHome";
import { faGift } from "@fortawesome/free-solid-svg-icons/faGift";
import { faCompass } from "@fortawesome/free-solid-svg-icons/faCompass";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faMapMarkedAlt,
  faImages,
  faClipboardCheck,
  faHome,
  faGift,
  faCompass
);
Vue.component("font-awesome-icon", FontAwesomeIcon);
