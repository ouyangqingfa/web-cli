<!--水球图-->
<template>
  <div class="water-wave-warp">
    <div class="water_waves">
      <div class="water_wave1" :style="`top:${rippleTop - 1}%;`"></div>
      <div class="water_wave2" :style="`top:${rippleTop}%;`"></div>
      <div class="water_wave3" :style="`top:${rippleTop + 1}%;`"></div>
    </div>
    <div class="calc-result-rate">{{ innerPercent }}%</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, nextTick } from "vue";

export default defineComponent({
  name: "index",
  props: {
    percent: {
      type: Number,
      default: 0,
    },
    size: {
      type: Number,
      default: 200,
    },
  },
  setup(props) {
    const innerPercent = ref(0);
    const rippleTop = ref(100);

    watch(
      () => props.percent,
      () => {
        innerPercent.value =
          Math.ceil(Math.min(100, Math.max(0, props.percent)) * 100) / 100;
        rippleTop.value = 100 - innerPercent.value;
      }
    );

    function updateProgress() {}

    return { innerPercent, rippleTop };
  },
});
</script>

<style lang="less" scoped>
.water-wave-warp {
  width: 210px;
  height: 210px;
  border-radius: 50%;
  padding: 3px;
  border: 2px solid #57dfb9;
  position: relative;

  .water_waves {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    margin: auto;
    position: relative;
    overflow: hidden;
    animation: water-waves linear infinite;

    .water_wave1 {
      background-color: #11998b;
      position: absolute;
      width: 300%;
      height: 300%;
      top: 40%;
      left: -100%;
      opacity: 0.7;
      border-radius: 40%;
      animation: inherit;
      animation-duration: 20s;
      transition: top 0.5s;
    }
    .water_wave2 {
      position: absolute;
      width: 300%;
      height: 300%;
      background-color: #3fc7a9;
      top: 45%;
      left: -100%;
      border-radius: 43%;
      opacity: 0.5;
      animation: inherit;
      animation-duration: 40s;
      transition: top 0.5s;
    }
    .water_wave3 {
      position: absolute;
      width: 300%;
      height: 300%;
      top: 50%;
      left: -100%;
      opacity: 0.3;
      background-color: #5ee6bd;
      border-radius: 46%;
      animation: inherit;
      animation-duration: 60s;
      transition: top 0.5s;
    }
  }

  .calc-result-rate {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    font-weight: bold;
    color: white;
  }
}
@keyframes water-waves {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>