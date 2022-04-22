<template>
    <div class="login-box">
        <div class="login-logo">
            <!--      <svg-icon name="logo" />-->
            <img src="@/assets/login-box-bg.svg" />
            <h1>APP NAME</h1>
        </div>
        <a-form layout="horizontal">
            <a-form-item>
                <a-input size="large" placeholder="用户名" v-model:value="loginState.uid">
                    <template #prefix>
                        <UserOutlined type="user" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-input size="large" type="password" autocomplete="off" placeholder="密码"
                    v-model:value="loginState.pwd">
                    <template #prefix>
                        <LockOutlined type="user" />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit" size="large" block @click="loginClick">登录</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script setup lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { ref } from "vue";
import { useUserStore } from "@/store/UserStore";
import router from "@/router";
import { message } from "ant-design-vue";

const userStore = useUserStore()
const loginState = ref({
    uid: "admin",
    pwd: "123456",
});

function loginClick() {
    if (loginState.value.uid && loginState.value.pwd) {
        userStore.login(loginState.value.uid, loginState.value.pwd).then(res => {
            if (res === true) {
                message.success("登录成功");
                router.push("/");
            }
        });
    }
}
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
