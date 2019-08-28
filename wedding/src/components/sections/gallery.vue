<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-auto">
        <h2 class="section-heading cursive-header">Gallery</h2>
      </div>
    </div>
    <hr />
    <div class="lightgallery gallery">
      <a v-for="image in images" :key="image" :data-src="image" class="gallery-item">
        <img v-lazy="image" class="img-fluid" @load="loaded" />
      </a>
    </div>
  </div>
</template>
<script>
import "lightgallery/dist/js/lightgallery.js";
import "lightgallery/dist/css/lightgallery.css";
import images from "../../images/engagement/*.jpg";
import Isotope from "isotope-layout";

export default {
  data() {
    return {
      images: [],
      isotope: null
    };
  },
  created() {
    this.images = images;
  },
  methods: {
    loaded() {
      this.isotope.layout();
    }
  },
  mounted() {
    $(".lightgallery").lightGallery({
      selector: ".gallery-item"
    });

    this.isotope = new Isotope(".gallery", {
      itemSelector: ".gallery-item",
      percentPosition: true,
      masonry: {
        columnWidth: ".gallery-item"
      }
    });
  }
};
</script>
<style>
.gallery-item {
  width: 33%;
  padding: 7px;
}

@media (min-width: 576px) and (max-width: 768px) {
  .gallery-item {
    width: 100%;
    padding: 7px;
  }
}

@media (min-width: 768px) and (max-width: 992px) {
  .gallery-item {
    width: 49%;
    padding: 7px;
  }
}
</style>