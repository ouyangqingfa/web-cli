import { StorageEnum } from "@/enums/AppEnum";
import storage from "@/utils/Storage";
import Apis from "@/api";
import { JSEncrypt } from "jsencrypt";
import router from "@/router";
import { defineStore } from "pinia";
import { store } from "@/plugins/Pinia";

export const useUserStore = defineStore("userStore", {
    state: () => {
        return {
            id: -1,
            uid: "",
            uname: "",
            company: "",
            department: "",
            job: "",
            sno: "",
            idNum: "",
            email: "",
            phone: "",
            avatar: "",
            sign: "",
            regDate: "",
            status: -1,
            creator: "",
            createTime: "",
            remark: "",
            token: "",
        };
    },
    getters: {},
    actions: {
        loadByStorage() {
            let cache = storage.get(StorageEnum.USER_ACCESS);
            if (cache) {
                Object.assign(this.$state, cache);
            }
        },
        login(uid: string, pwd: string): Promise<boolean> {
            return new Promise<boolean>((resolve, reject) => {
                Apis.system
                    .rsa()
                    .then((res) => {
                        const rsaPubKey = res.data;
                        let jsencrypt = new JSEncrypt();
                        jsencrypt.setPublicKey(rsaPubKey);
                        let encryptPwd = jsencrypt.encrypt(pwd);
                        if (encryptPwd) {
                            Apis.system
                                .login(uid, encryptPwd)
                                .then((res) => {
                                    if (res.data && res.data.token) {
                                        Object.assign(this.$state, res.data);
                                        storage.set(StorageEnum.USER_ACCESS, this);
                                        storage.set(StorageEnum.ACCESS_TOKEN, res.data.token);
                                        resolve(true);
                                    } else {
                                        reject("登录失败");
                                    }
                                })
                                .catch((err) => {
                                    reject(err);
                                });
                        } else {
                            console.error("pwd encrypt error");
                            reject("pwd encrypt error");
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
        logout(): Promise<boolean> {
            return new Promise<boolean>((resolve, reject) => {
                Apis.system
                    .logout(this.uid)
                    .then((res) => {
                        if (res.data) {
                            storage.remove(StorageEnum.USER_ACCESS);
                            storage.remove(StorageEnum.ACCESS_TOKEN);
                            Object.keys(this).forEach((key) => {
                                this.$state[key] = undefined;
                            });
                            resolve(true);
                            router.push("/login");
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    });
            });
        },
    },
});

export function useUserStoreWithOut() {
    return useUserStore(store);
}
