<template>
  <div class="header">
    <parallax :fixed="true">
      <transition name="fade">
        <img :src="image" class="header-image" :loaded="imageLoaded" @load="loaded" />
      </transition>
      <div class="image-overlay"></div>
    </parallax>
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
import Parallax from "vue-parallaxy";
import images from "../../images/header/*.jpg";

export default {
  data: () => ({
    images: [],
    image: "",
    imageIndex: 1,
    imageLoaded: false
  }),
  components: {
    Parallax
  },
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
    setInterval(this.changeImage, 4000);

    $(".flowers").sakura("start", { className: "particles" });
  }
};
</script>