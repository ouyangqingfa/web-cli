export interface FlowItemModel {
    key: string;
    name: string;

    events?: Array<FlowItemMenu>;
    datas?: Array<FlowItemMenu>;

}

export interface FlowItemMenu {
    key: string;
    name: string;
    link?: { url: string, params?: { [key: string]: string } };
    childDatas?: Array<FlowItemChildMenu>
}

export interface FlowItemChildMenu {
    key: string;
    name: string;
    link?: { url: string, params?: { [key: string]: string } };
}

// export interface FlowItemDataModel {
//     key: string;
//     name: string;
//     link?: { url: string, params?: { [key: string]: string } };
// }


//#region 系统状态统计
export interface IStatIOModel {
    news: number;
    zk: number;
    public: number;
    social: number;
    ts: number;
    kgzb: number;
}
export class StatIOModel implements IStatIOModel {
    public news = 0;
    public zk = 0;
    public public = 0;
    public social = 0;
    public ts = 0;
    public kgzb = 0;

    constructor(model: IStatIOModel | null) {
        if (model) {
            Object.assign(this, model);
        }
    }

    public toArray() {
        return [
            { name: "新闻媒体", value: this.news },
            { name: "智库", value: this.zk },
            { name: "公开数据库", value: this.public },
            { name: "社交媒体", value: this.social },
            { name: "态势数据", value: this.ts },
            { name: "空管直播", value: this.kgzb }
        ]
    }
}


export interface IStatIMModel {
    radio: number;
    camera: number;
}
export class StatIMModel implements IStatIMModel {
    public radio = 0;
    public camera = 0;
    constructor(model: IStatIMModel | null) {
        if (model) {
            Object.assign(this, model)
        }
    }
    public toArray() {
        return [
            { name: "无线电接收机数据", value: this.radio },
            { name: "摄像头数据", value: this.camera },
        ];
    }
}


export interface IStatIAModel {
    ships: number;
    land: number;
}
export class StatIAModel implements IStatIAModel {
    public ships = 0;
    public land = 0;
    constructor(model: IStatIAModel | null) {
        if (model) {
            Object.assign(this, model);
        }
    }
    public toArray() {
        return [
            { name: "JZ传感器数据", value: this.ships },
            { name: "陆上传感器数据", value: this.land },
        ];
    }
}

export interface IStatJZModel {
    hgw: number;
    ydwx: number;
    qs: number;
    db: number;
    cdb: number;
    dzzc: number;
}
export class StatJZModel implements IStatJZModel {
    public hgw = 0;
    public ydwx = 0;
    public qs = 0;
    public db = 0;
    public cdb = 0;
    public dzzc = 0;
    constructor(model: IStatJZModel | null) {
        if (model) {
            Object.assign(this, model)
        }
    }
    public toArray() {
        return [
            { name: "HGW", value: this.hgw },
            { name: "国际移动WX", value: this.ydwx },
            { name: "前哨", value: this.qs },
            { name: "DB", value: this.db },
            { name: "CDB", value: this.cdb },
            { name: "电子ZC", value: this.dzzc },
        ];
    }
}

//#endregion


export interface FlowImageModel {
    name: string,
    imgsrc: string
}