<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-auto">
        <h2 class="section-heading cursive-header">Gallery</h2>
      </div>
    </div>
    <hr />
    <div class="lightgallery gallery">
      <div class="mb-3" v-for="image in images" :key="image">
        <a :data-src="image" class="gallery-item">
          <img v-lazy="image" class="img-fluid" />
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import "lightgallery/dist/js/lightgallery.js";
import "lightgallery/dist/css/lightgallery.css";
import images from "../../images/engagement/*.jpg";

export default {
  data() {
    return {
      images: []
    };
  },
  created() {
    this.images = images;
  },
  mounted() {
    $(".lightgallery").lightGallery({
      selector: ".gallery-item"
    });
  }
};
</script>
<style>
.gallery {
  -webkit-column-count: 3;
  -moz-column-count: 3;
  column-count: 3;
  -webkit-column-width: 33%;
  -moz-column-width: 33%;
  column-width: 33%;
}

@media (max-width: 450px) {
  .gallery {
    -webkit-column-count: 1;
    -moz-column-count: 1;
    column-count: 1;
    -webkit-column-width: 100%;
    -moz-column-width: 100%;
    column-width: 100%;
  }
}
</style>