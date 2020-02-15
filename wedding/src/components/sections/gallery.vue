<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col">
        <h2 class="section-heading cursive-header">Gallery</h2>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col">
        <button
          @click="setbridegroom"
          class="btn"
          :class="{ 'btn-secondary': bridegroom(), 'btn-primary': !bridegroom() }"
        >Bride & Groom</button>
      </div>
      <div class="col">
        <button
          @click="setceremony"
          class="btn"
          :class="{ 'btn-secondary': ceremony(), 'btn-primary': !ceremony() }"
        >Ceremony</button>
      </div>
      <div class="col">
        <button
          @click="setfamily"
          class="btn"
          :class="{ 'btn-secondary': family(), 'btn-primary': !family() }"
        >Family</button>
      </div>
      <div class="col">
        <button
          @click="setreception"
          class="btn"
          :class="{ 'btn-secondary': reception(), 'btn-primary': !reception() }"
        >Receiption</button>
      </div>
      <div class="col">
        <button
          @click="setengagement"
          class="btn"
          :class="{ 'btn-secondary': engagement(), 'btn-primary': !engagement() }"
        >Engagement</button>
      </div>
    </div>
    <div class="lightgallery gallery">
      <a
        v-for="image in getimages()"
        :key="image.name"
        :data-src="image.image"
        class="gallery-item"
      >
        <img v-lazy="image.image" class="img-fluid" @load="loaded" />
      </a>
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
import Isotope from "isotope-layout";

export default {
  data() {
    return {
      images: [],
      selection: "bridegroom",
      isotope: null
    };
  },
  created() {
    this.addimages("bridegroom", bridegroom);
    this.addimages("ceremony", ceremony);
    this.addimages("family", family);
    this.addimages("reception", reception);
    this.addimages("engagement", engagement);
  },
  watch: {
    selection() {
      this.reloadGallery();
    }
  },
  methods: {
    getimages() {
      var images = [];
      for (var i in this.images) {
        if (this.images[i].name.indexOf(this.selection) >= 0)
          images.push(this.images[i]);
      }

      return images;
    },
    addimages(name, images) {
      for (var i in images)
        this.images.push({ name: name + i, image: images[i] });
    },
    loaded() {
      this.isotope.layout();
    },
    reloadGallery(destroy) {
      var lightGallery = $(".lightgallery");
      if (destroy) lightGallery.data("lightGallery").destroy(true);
      
      lightGallery.lightGallery({
        selector: ".gallery-item"
      });

      this.isotope = new Isotope(".gallery", {
        itemSelector: ".gallery-item",
        percentPosition: true,
        masonry: {
          columnWidth: ".gallery-item"
        }
      });
    },
    bridegroom() {
      return this.selection == "bridegroom";
    },
    ceremony() {
      return this.selection == "ceremony";
    },
    engagement() {
      return this.selection == "engagement";
    },
    family() {
      return this.selection == "family";
    },
    reception() {
      return this.selection == "reception";
    },
    setbridegroom() {
      this.selection = "bridegroom";
    },
    setceremony() {
      this.selection = "ceremony";
    },
    setengagement() {
      this.selection = "engagement";
    },
    setfamily() {
      this.selection = "family";
    },
    setreception() {
      this.selection = "reception";
    }
  },
  mounted() {
    this.reloadGallery();
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