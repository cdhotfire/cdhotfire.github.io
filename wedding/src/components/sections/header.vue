<template>
  <div class="header">
    <div class="jarallax">
      <img class="header-image jarallax-img" src="../../images/engagement/engagement4.jpg" />
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
export default {
  mounted() {
    objectFitImages();

    $(".flowers").sakura("start", { className: "particles" });
    $(".jarallax").jarallax({ speed: 0 });
  }
};
</script>