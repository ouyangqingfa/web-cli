<!--登录页面-->
<template>
  <div class="login-page">
    <div class="login-warp">
      <div class="login-warp-l">
        <div class="l-warp">
          <img src="@/assets/svg/login-box-bg.svg" class="l-img" />
          <div class="l-apptitle">XXX系统</div>
        </div>
      </div>
      <div class="login-warp-r">2</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Login",
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.login-page {
  width: 100vw;
  height: 100vh;
  //   background: #ccc;
  // background-image: linear-gradient(to right, #7ea1ec, #235dbb);
  background-color: #293146;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    top: 0;
    left: 0;
    background-image: url("@/assets/svg/login-bg.svg");
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
  }

  .login-warp {
    // width: 400px;
    // height: 500px;
    // background-color: rgba(210, 210, 210, 0.6);
    // border-radius: 8px;
    // box-shadow: 5px 5px 5px #666666;
    width: 70vw;
    height: 80vh;
    display: flex;
    position: relative;

    .login-warp-l {
      width: 50%;
      height: 100%;

      .l-warp {
        min-width: 300px;
        width: 60%;
        margin-top: 25%;
        text-align: center;

        .l-img {
          width: 100%;
        }

        .l-apptitle {
          color: #fff;
          font-size: 28px;
          font-weight: bold;
          margin-top: 50px;
        }
      }
    }

    .login-warp-r {
      width: 50%;
      height: 100%;
    }
  }
}
</style>