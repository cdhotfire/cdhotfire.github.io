<template>
  <div class="container">
    <div class="row header">
      <div class="jarallax">
        <img class="header-image jarallax-img" src="../images/engagement/engagement10.jpg" />
        <div class="image-overlay"></div>
      </div>
      <div class="header-text">
        <div>Jocelyn</div>
        <div>Isidro</div>
      </div>
      <div class="flowers"></div>
    </div>
    <div class="row">123</div>
    <div>abc</div>
    <div>woww</div>
  </div>
</template>
<script>
import "../library/sakura/jquery-sakura.min.js";
import "../../node_modules/jarallax/dist/jarallax.js";

$(function() {
  $(".flowers").sakura("start", { className: "particles" });
  $(".jarallax").jarallax({ speed: 0.1 });
});
</script>