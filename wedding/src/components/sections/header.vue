<template>
  <div class="header">
    <div class="jarallax">
      <transition name="fade">
        <img :src="image" class="header-image jarallax-img" :loaded="imageLoaded" @load="loaded" />
      </transition>
      <div class="image-overlay"></div>
    </div>
    <div class="header-text">
      <div class="header-names display-3">
        <div>Isidro</div>
        <div>
          <img src="../../images/together.png" class="img-fluid together" />
        </div>
        <div>Jocelyn</div>
      </div>
      <div class="h6 mt-2">November 16, 2019</div>
    </div>
    <div class="flowers"></div>
  </div>
</template>
<script>
import "../../library/sakura/jquery-sakura.min.js";
import "jarallax/dist/jarallax.js";
import objectFitImages from "object-fit-images";
import images from "../../images/header/*.jpg";

export default {
  data: () => ({
    images: [],
    image: "",
    imageIndex: 1,
    imageLoaded: false
  }),
  created() {
    this.images = Object.values(images);
    this.image = this.images[0];
  },
  methods: {
    changeImage() {
      this.imageLoaded = false;
      this.image = this.images[this.imageIndex++];
      if (this.imageIndex == this.images.length) this.imageIndex = 0;
    },
    loaded() {
      this.imageLoaded = true;
    }
  },
  mounted() {
    objectFitImages();
    $(".jarallax").jarallax({ speed: 0 });

    setInterval(this.changeImage, 4000);

    $(".flowers").sakura("start", { className: "particles" });
  }
};
</script>