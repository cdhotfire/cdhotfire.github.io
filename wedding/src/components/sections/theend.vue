<template>
  <div class="container the-end">
    <div class="row">
      <div class="col-12 col-md-11 col-lg-8">
        <div class="chat-bubble thank-you">
          <!-- <div class="h1 text-light mb-2">Thank you for visiting our site.</div>
          <div class="h4 text-light">Hope to see you on November 16!</div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ScrollMagic from "scrollmagic";
import "scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap";
import { TimelineMax } from "gsap/TweenMax";
export default {
  mounted() {
    var controller = new ScrollMagic.Controller();
    var tween = new TimelineMax()
      .from(".thank-you", 0.5, { opacity: 0 })
      .to(".thank-you", 0.5, {
        opacity: 1
      });

    var scene = new ScrollMagic.Scene({
      triggerElement: "#theend",
      triggerHook: 1
    })
      .setTween(tween)
      .addTo(controller);
  }
};
</script>
<style>
.the-end {
  position: absolute;
  left: 100%;
  bottom: 0;
}
</style>