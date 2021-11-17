import { StorageEnum } from "@/enums/AppEnum";
import storage from "@/utils/Storage";
import Apis from "@/api";

export class UserStore {
    public id: number = -1;
    public uid: string = "";
    public uname: string = "";
    public company: string = "";
    public department: string = "";
    public job: string = "";
    public sno: string = "";
    public idNum: string = "";
    public email: string = "";
    public phone: string = "";
    public avatar: string = "";
    public sign: string = "";
    public regDate: string = "";
    public status: number = -1;
    public creator: string = "";
    public createTime: string = "";
    public remark: string = "";
    public token: string = "";

    constructor() {
        this.loadByStorage();
    }

    /**
     * loadByStorage
     */
    private loadByStorage() {
        let cache = storage.getStorage<UserStore>(StorageEnum.USER_ACCESS);
        if (cache) {
            Object.assign(this, cache);
        }
    }
    /**
     * saveUserInfo
     */
    public login(uid: string, pwd: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            Apis.system
                .login(uid, pwd)
                .then(res => {
                    if (res.data && res.data.token) {
                        Object.assign(this, res.data);
                        storage.set(StorageEnum.USER_ACCESS, this);
                        storage.set(StorageEnum.ACCESS_TOKEN, res.data.token);
                        resolve(true);
                    } else {
                        reject("登录失败");
                    }
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    /**
     * logout
     */
    public logout() {
        storage.remove(StorageEnum.USER_ACCESS);
        storage.remove(StorageEnum.ACCESS_TOKEN);
        Object.keys(this).forEach(key => {
            this[key] = undefined;
        });
    }
}

export default UserStore;
