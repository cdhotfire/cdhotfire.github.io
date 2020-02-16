<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col">
        <h2 class="section-heading cursive-header">Gallery</h2>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-auto">
        <button
          v-for="category in categories"
          :key="category.type"
          @click="selection = category"
          class="btn btn-sm ml-1"
          :class="{ 'btn-outline-secondary': selection === category, 'btn-outline-primary': selection !== category }"
        >{{category.display}}</button>
      </div>
    </div>
    <div class="lightgallery gallery">
      <isotope :list="selection.images">
        <a v-for="image in selection.images" :key="image" :data-src="image" class="gallery-item">
          <img v-lazy="image" class="img-fluid" @load="loaded" />
        </a>
      </isotope>
    </div>
  </div>
</template>
<script>
import "lightgallery/dist/js/lightgallery.js";
import "lightgallery/dist/css/lightgallery.css";
import engagement from "../../images/gallery/engagement/*.jpg";
import bridegroom from "../../images/gallery/bridegroom/*.jpg";
import ceremony from "../../images/gallery/ceremony/*.jpg";
import family from "../../images/gallery/family/*.jpg";
import reception from "../../images/gallery/reception/*.jpg";
import isotope from "vueisotope";

export default {
  data() {
    return {
      selection: {},
      itemtemplate: {
        props: []
      },
      isotope: null,
      categories: [
        { type: "bridgegroom", display: "Bride & Groom", images: bridegroom.values() },
        { type: "ceremony", display: "Ceremony", images: ceremony },
        { type: "family", display: "Family", images: family },
        { type: "reception", display: "Reception", images: reception },
        { type: "engagement", display: "Engagement", images: engagement }
      ]
    };
  },
  components: {
    isotope
  },
  created() {},
  watch: {
    selection() {
      // this.reloadGallery();
      // this.isotope;
    }
  },
  methods: {
    loaded() {
      // this.isotope.layout();
    },
    reloadGallery(destroy) {
      // var lightGallery = $(".lightgallery");
      // if (destroy) lightGallery.data("lightGallery").destroy(true);

      // lightGallery.lightGallery({
      //   selector: ".gallery-item"
      // });

      // this.isotope = new Isotope(".gallery", {
      //   itemSelector: ".gallery-item",
      //   percentPosition: true,
      //   masonry: {
      //     columnWidth: ".gallery-item"
      //   }
      // });
    }
  },
  mounted() {
    this.selection = this.categories[0];
  }
};
</script>
<style>
.gallery-item {
  width: 33%;
  padding: 7px;
}

@media (max-width: 768px) {
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