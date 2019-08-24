<template>
  <div class="row justify-content-center">
    <flip-countdown deadline="2019/11/16 17:00:00"></flip-countdown>
  </div>
</template>
<script>
import FlipCountdown from "vue2-flip-countdown";

export default {
  components: { FlipCountdown },
  mounted() {
    $(".countdown-counter").countdown("2019/11/16", function(event) {
      var months =
        "<div class='col-auto'><div class='countdown-date'>" +
        event.strftime("%m") +
        "<div class='countdown-description'>month</div></div></div>";
      var days =
        "<div class='col-auto'><div class='countdown-date'>" +
        event.strftime("%d") +
        "<div class='countdown-description'>day</div></div></div>";
      var hours =
        "<div class='col-auto'><div class='countdown-date'>" +
        event.strftime("%H") +
        "<div class='countdown-description'>hours</div></div></div>";
      var minutes =
        "<div class='col-auto'><div class='countdown-date'>" +
        event.strftime("%M") +
        "<div class='countdown-description'>minutes</div></div></div>";
      var seconds =
        "<div class='col-auto'><div class='countdown-date'>" +
        event.strftime("%S") +
        "<div class='countdown-description'>seconds</div></div></div>";
      $(this).html(months + days + hours + minutes + seconds);
    });
  }
};
</script>