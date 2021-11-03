<template>
    <div class="login-box">
        <div class="login-logo">
            <!--      <svg-icon name="logo" />-->
            <img src="@/assets/login-box-bg.svg" alt="" />
            <h1>APP NAME</h1>
        </div>
        <a-form layout="horizontal">
            <a-form-item>
                <a-input size="large" placeholder="admin">
                    <template #prefix><UserOutlined type="user" /></template>
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input size="large" type="password" placeholder="123456" autocomplete="new-password">
                    <template #prefix><LockOutlined type="user" /></template>
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit" size="large" block> 登录 </a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
</script>

<style lang="less" scoped>
.login-box {
    display: flex;
    width: 100vw;
    height: 100vh;
    padding-top: 240px;
    background: url("../../../assets/login.svg");
    background-size: 100%;
    flex-direction: column;
    align-items: center;

    .login-logo {
        display: flex;
        margin-bottom: 30px;
        align-items: center;

        .svg-icon {
            font-size: 48px;
        }

        img {
            height: 48px;
        }

        h1 {
            margin-bottom: 0;
            margin-left: 10px;
        }
    }

    ::v-deep(.ant-form) {
        width: 400px;

        .ant-col {
            width: 100%;
        }

        .ant-form-item-label {
            padding-right: 6px;
        }
    }
}
</style>
