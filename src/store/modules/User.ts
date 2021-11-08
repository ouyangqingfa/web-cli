import { StorageEnum } from "@/enums/AppEnum";
import storage from "@/utils/Storage";

export class UserStore {
    public static readonly SKEY = "UserStore";

    public token: string = "";
    public id: string = "";
    public name: string = "";
    public email: string = "";
    public password: string = "";
    public role: string = "";

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
    public async login() {
        storage.set(StorageEnum.USER_ACCESS, this);
        storage.set(StorageEnum.ACCESS_TOKEN, this.token);
    }

    /**
     * logout
     */
    public logout() {
        storage.remove(StorageEnum.USER_ACCESS);
        storage.remove(StorageEnum.ACCESS_TOKEN);
        this.token = "";
        this.name = "";
        this.role = "";
    }
}

export default UserStore;
