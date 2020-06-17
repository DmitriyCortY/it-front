<template>
  <div>
    <div class="b-loader-app" v-if="!output_loading_error">
      <div class="b-loader-app__circle"></div>
      <div class="b-loader-app__circle"></div>
      <div class="b-loader-app__circle"></div>
      <div class="b-loader-app__circle"></div>
      <div class="b-loader-app__circle"></div>
      <div class="b-loader-app__circle"></div>
      <div class="b-loader-app__circle"></div>
      <div class="b-loader-app__circle"></div>
      <div class="b-loader-app__circle"></div>
      <div class="b-loader-app__circle"></div>
      <div class="b-loader-app__circle"></div>
      <div class="b-loader-app__circle"></div>
      <div class="b-loader-app__circle"></div>
      <div class="b-loader-app__circle"></div>
      <div class="b-loader-app__circle"></div>
      <div class="b-loader-app__circle"></div>
    </div>

    <h3 style="color: #e33939; text-align: center" v-if="output_loading_error">
      Sorry, an error occurred while loading data.
    </h3>
  </div>
</template>
<script>
export default {
  data(){
    return {}
  },
  computed: {
    output_loading_error(){
      return this.$store.getters.output_loading_error
    }
  },
}
</script>
<style lang="scss">
$gray: #777777;
$black: #070707;
$green: #7ed386;
$red: #f32e46;
$aqua: #3fb6a8;
$white: #ffffff;
$onyx: #373449;
$orange: #ee7723;
$size: 400px;
$duration: 10s;
$ease: ease-in-out;

.b-loader-app {
  width: $size;
  height: $size;
  margin: 50px auto ;
  position: relative;
  @media screen and (max-width: 560px) {
      transform: scale(0.6);
  }
  .b-loader-app__circle {
    border-radius: 100% 100% 0 0;
    position: absolute;
    bottom: 50%;
    left: 50%;
    transform: translateX(-50%);
    transform-origin: bottom center;
  }
  @for $i from 1 through 22 {
    .b-loader-app__circle:nth-child(#{$i}) {
      $size: 0;
      $opac: (20-$i)/10;
      @if ($i > 1) {
        $size: 31px * ($i - 1);
        border: 13px solid rgba(rgba($red, 0.4), $opac);
      } @else {
        $size: 25px;
        background: $red;
      }
      border-bottom: none;
      border-radius: $size $size 0 0;
      width: $size;
      height: $size / 2;
      z-index: 16 - $i;
      animation: circle-#{$i} $duration infinite $ease;
    }
    @keyframes circle-#{$i} {
      0% {
        transform: translateX(-50%) rotate(0deg);
      }
      100% {
        transform: translateX(-50%) rotate(-($i * 360deg));
      }
    }
  }
}
</style>