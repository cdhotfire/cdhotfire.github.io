<template>
  <div class="row justify-content-center">
    <flip-countdown deadline="2019/11/16 17:00:00"></flip-countdown>
  </div>
</template>
<script>
import FlipCountdown from "vue2-flip-countdown";

export default {
  components: { FlipCountdown }
};
</script>