export default class UserConfig {
    /** 程序标题 */
    public APP_TITLE?: string = "APPNAME";
    /** 是否使用伪装页面 */
    public APP_GUISE?: boolean = false;
    public MAP_SOURCE?: string = "http://192.168.4.223:8089/{z}/{x}/{y}.png"

    private static _instance: UserConfig | null = null;
    private constructor() { }
    public static get Instance() {
        if (this._instance == null) {
            this._instance = new UserConfig();
        }
        return this._instance;
    }

}