<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col">
        <h2 class="section-heading cursive-header">Gallery</h2>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-auto text-center">
        <button
          v-for="category in categories"
          :key="category.type"
          @click="changecategory(category)"
          class="btn btn-sm ml-1 mt-1"
          :class="{ 'btn-outline-secondary': selection === category.type, 'btn-outline-primary': selection !== category.type }"
        >{{category.display}}</button>
      </div>
    </div>
    <div class="lightgallery gallery">
      <isotope ref="cpt" :list="getimages()" :options="options">
        <a
          v-for="image in getimages()"
          :key="image.image"
          :data-src="image.image"
          class="gallery-item"
        >
          {{image.i}}
          <img v-lazy="image.image" class="img-fluid" @load="loaded" />
        </a>
      </isotope>
    </div>
  </div>
</template>
<script>
import engagement from "../../images/gallery/engagement/*.jpg";
import bridegroom from "../../images/gallery/bridegroom/*.jpg";
import ceremony from "../../images/gallery/ceremony/*.jpg";
import family from "../../images/gallery/family/*.jpg";
import reception from "../../images/gallery/reception/*.jpg";
import isotope from "vueisotope";

export default {
  data() {
    return {
      itemtemplate: {
        props: []
      },
      selection: "bridegroom",
      options: {
        initLayout: false,
        // itemSelector: ".gallery-item",
        // percentPosition: true,
        // masonry: {
        //   columnWidth: 25
        // },
        layoutMode: "packery",
        sortBy: "image",
        getSortData: {
          image(item) {
            return item.image;
          }
        }
      },
      images: [],
      categories: [
        { type: "bridegroom", display: "Bride & Groom", images: bridegroom },
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
  created() {
    this.loadimages();
  },
  methods: {
    getimages() {
      return this._.filter(this.images, {
        category: this.selection
      });
    },
    loaded() {
      this.$refs.cpt.layout("masonry");
    },
    changecategory(category) {
      this.selection = category.type;
      // this.$refs.cpt.filter(category.type);
    },
    loadimages() {
      for (var category in this.categories) {
        for (var img in this.categories[category].images)
          this.images.push({
            category: this.categories[category].type,
            image: this.categories[category].images[img]
          });
      }
    }
  },
  mounted() {
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