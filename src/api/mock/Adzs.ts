import Mock from 'mockjs';

/* 流程图数据 */
Mock.mock('/api/adzs/getTreeData?stage=0', 'get', {
    code: 1,
    msg: '流程图数据',
    data: [
        {
            id: "1",
            pid: "0",
            label: "保障人员",
            type: "selected",
            probability: "", //父节点与此节点连线被选中的概率
        },
        {
            id: "2",
            pid: "1",
            label: "出动",
            type: "selected",
            probability: "40%",
        },
        {
            id: "3",
            pid: "1",
            label: "不出动",
            type: "notSelected",
            probability: "",
        },
    ]
})

Mock.mock('/api/adzs/getTreeData?stage=1', 'get', {
    code: 1,
    msg: '流程图数据',
    data: [
        {
            id: "1",
            pid: "0",
            label: "保障人员",
            type: "selected",
            probability: "100%", //父节点与此节点连线被选中的概率
        },
        {
            id: "2",
            pid: "1",
            label: "Twitter",
            type: "selected",
            probability: "是",
        },
        {
            id: "3",
            pid: "1",
            label: "不出动",
            type: "notSelected",
            probability: "否",
        },
        {
            id: "4",
            pid: "2",
            label: "出动",
            type: "selected",
            probability: "55%",
        },
        {
            id: "5",
            pid: "2",
            label: "不出动",
            type: "notSelected",
            probability: "",
        },
    ]
})

Mock.mock('/api/adzs/getTreeData?stage=2', 'get', {
    code: 1,
    msg: '流程图数据',
    data: [
        {
            id: "1",
            pid: "0",
            label: "保障人员",
            type: "selected",
            probability: "100%", //父节点与此节点连线被选中的概率
        },
        {
            id: "2",
            pid: "1",
            label: "Twitter",
            type: "selected",
            probability: "是",
        },
        {
            id: "3",
            pid: "1",
            label: "不出动",
            type: "notSelected",
            probability: "否",
        },
        {
            id: "4",
            pid: "2",
            label: "GBQ",
            type: "selected",
            probability: "是",
        },
        {
            id: "5",
            pid: "2",
            label: "不出动",
            type: "notSelected",
            probability: "否",
        },
        {
            id: "6",
            pid: "4",
            label: "出动",
            type: "selected",
            probability: "80%",
        },
        {
            id: "7",
            pid: "4",
            label: "不出动",
            type: "notSelected",
            probability: "",
        },
    ]
})


Mock.mock('/api/adzs/getTreeData?stage=3', 'get', {
    code: 1,
    msg: '流程图数据',
    data: [
        {
            id: "1",
            pid: "0",
            label: "保障人员",
            type: "selected",
            probability: "100%", //父节点与此节点连线被选中的概率
        },
        {
            id: "2",
            pid: "1",
            label: "Twitter",
            type: "selected",
            probability: "是",
        },
        {
            id: "3",
            pid: "1",
            label: "不出动",
            type: "notSelected",
            probability: "否",
        },
        {
            id: "4",
            pid: "2",
            label: "GBQ",
            type: "selected",
            probability: "是",
        },
        {
            id: "5",
            pid: "2",
            label: "不出动",
            type: "notSelected",
            probability: "否",
        },
        {
            id: "6",
            pid: "4",
            label: "领航计划报",
            type: "selected",
            probability: "是",
        },
        {
            id: "7",
            pid: "4",
            label: "不出动",
            type: "notSelected",
            probability: "否",
        },
        {
            id: "8",
            pid: "6",
            label: "出动",
            type: "selected",
            probability: "95%",
        },
        {
            id: "9",
            pid: "6",
            label: "不出动",
            type: "notSelected",
            probability: "",
        },
    ]
})


const pathPoints = [{
    date: '07/02 08:01',
    longitude: -93.66277777777778,
    latitude: 32.50194444444445,
}, {
    date: '07/02 09:01',
    longitude: -121.44587695026196,
    latitude: 47.790522838591016
}, {
    date: '07/02 10:11',
    longitude: -125.44587695026196,
    latitude: 55.790522838591016,
    redPoint: true
}, {
    date: '07/02 11:21',
    longitude: -145.44587695026196,
    latitude: 60.790522838591016
}, {
    date: '07/02 12:11',
    longitude: -165.44587695026196,
    latitude: 62.790522838591016
}, {
    date: '07/02 13:01',
    longitude: -179.44587695026196,
    latitude: 60.790522838591016,
    redPoint: true
}, {
    date: '07/02 14:01',
    longitude: 167.44587695026196,
    latitude: 54.790522838591016
}, {
    date: '07/02 16:01',
    longitude: 149.44587695026196,
    latitude: 45.790522838591016
}, {
    date: '07/02 17:01',
    longitude: 129.44587695026196,
    latitude: 26.790522838591016,
    redPoint: true
}, {
    date: '07/02 19:01',
    longitude: 147.44587695026196,
    latitude: 29.790522838591016
}, {
    date: '07/02 19:53',
    longitude: -178.44587695026196,
    latitude: 43.790522838591016,
    redPoint: true
}, {
    date: '07/02 20:35',
    longitude: -160.44587695026196,
    latitude: 55.790522838591016
}, {
    date: '07/02 21:01',
    longitude: -131.44587695026196,
    latitude: 52.790522838591016
}, {
    date: '07/02 23:01',
    longitude: -121.44587695026196,
    latitude: 47.790522838591016
}, {
    date: '07/02 23:39',
    longitude: -93.66277777777778,
    latitude: 32.50194444444445,
}, {
    date: '07/03 01:02',
    longitude: 144.92444444444445,
    latitude: 13.581111111111111,
}]

/* 3.起飞准备阶段 */
Mock.mock('/api/adzs/getFlightLine?stage=3', 'get', {
    code: 1,
    msg: '飞行数据',
    data: pathPoints.slice(0, 1)
})
/* 4.离场爬升阶段 */
Mock.mock('/api/adzs/getFlightLine?stage=4', 'get', {
    code: 1,
    msg: '飞行数据',
    data: pathPoints.slice(0, 1)
})
/* 5.飞行前段 */
Mock.mock('/api/adzs/getFlightLine?stage=5', 'get', {
    code: 1,
    msg: '飞行数据',
    data: pathPoints.slice(0, 2)
})

Mock.mock('/api/adzs/getFlightLine?stage=6', 'get', {
    code: 1,
    msg: '飞行数据',
    data: pathPoints.slice(0, 5)
})

Mock.mock('/api/adzs/getFlightLine?stage=7', 'get', {
    code: 1,
    msg: '战术机动数据',
    data: pathPoints.slice(0, 9)
})

Mock.mock('/api/adzs/getFlightLine?stage=8', 'get', {
    code: 1,
    msg: '进场下降',
    data: pathPoints.slice(0, 9).concat(pathPoints.slice(15, 16))
})

Mock.mock('/api/adzs/getFlightLine?stage=9', 'get', {
    code: 1,
    msg: '降落停机',
    data: pathPoints.slice(15, 16)
})

//太平洋北线回归
Mock.mock('/api/adzs/getFlightLine?stage=11', 'get', {
    code: 1,
    msg: '航渡飞行',
    data: pathPoints.slice(0, 10)
})

Mock.mock('/api/adzs/getFlightLine?stage=12', 'get', {
    code: 1,
    msg: '空中加油',
    data: pathPoints.slice(0, 12)
})

Mock.mock('/api/adzs/getFlightLine?stage=13', 'get', {
    code: 1,
    msg: '进场下降',
    data: pathPoints.slice(0, 15)
})

Mock.mock('/api/adzs/getFlightLine?stage=14', 'get', {
    code: 1,
    msg: '降落停机',
    data: pathPoints.slice(0, 1)
})

Mock.mock('/api/adzs/getForecastPoint?stage=5', 'get', {
    code: 1,
    msg: '飞行预测数据',
    data: [{
        name: "预测路线1", accuracy: 0.8, coords: [
            {
                longitude: -121.44587695026196,
                latitude: 47.790522838591016
            },
            {
                longitude: -125.44587695026196,
                latitude: 55.790522838591016
            }
        ]
    }, {
        name: "预测路线2", accuracy: 0.5, coords: [
            {
                longitude: -121.44587695026196,
                latitude: 47.790522838591016
            },
            {
                longitude: -125.44587695026196,
                latitude: 43.790522838591016
            }
        ]
    }]
})


Mock.mock('/api/adzs/getForecastPoint?stage=6', 'get', {
    code: 1,
    msg: '飞行预测数据',
    data: [{
        name: "预测路线1", accuracy: 0.3, coords: [
            {
                longitude: -165.44587695026196,
                latitude: 62.790522838591016
            }, {
                longitude: -173.44587695026196,
                latitude: 52.790522838591016
            }
        ]
    }, {
        name: "预测路线2", accuracy: 0.9, coords: [
            {
                longitude: -165.44587695026196,
                latitude: 62.790522838591016
            }, {
                longitude: -179.44587695026196,
                latitude: 60.790522838591016
            }, {
                longitude: 167.44587695026196,
                latitude: 54.790522838591016
            }
        ]
    }]
})

Mock.mock('/api/adzs/getForecastPoint?stage=7', 'get', {
    code: 1,
    msg: '飞行预测数据',
    data: [{
        name: "预测路线1", accuracy: 1, coords: [
            {
                longitude: 167.44587695026196,
                latitude: 54.790522838591016
            }, {
                longitude: 149.44587695026196,
                latitude: 45.790522838591016
            }
        ]
    }]
})



Mock.mock('/api/adzs/getBaseAirports', 'get', {
    code: 1,
    msg: '基地数据',
    data: [{
        longitudeDeg: '-93.66277777777778',
        latitudeDeg: '32.50194444444445',
        zhName: '巴克斯代尔空军基地',
        enName: 'Barksdale Air Force Base',
        type: '美国空军基地',
        iata: 'BAD',
        icao: 'KBAD',
        weaponry: ' B-52 远程战略轰炸机群(900多枚可供B-52挂载使用的核弹)、A-10“雷电”攻击机、B-2 隐形轰炸机 ',
        desc: '基地主要驻有空战司令部下属的第2轰炸机联队（2 BW——2d Bomb Wing），也是第8航空队（8 AF——Eighth Air Force）的总部所在地以及最新组建的空军网络战司令部(AFCYBER——Air Force Cyber Command)的总部临时驻扎地。其他驻扎部门还有：第49试飞中队、第917联队、第307土木工程中队第1分队（红马分队）、第8航空队史馆等。基地于1933年2月2日建成，占地约89平方公里。拥有一条长3, 583米的跑道。以第一次世界大战时期的飞行员尤金H.巴克斯代尔中尉的名字命名（1926年8月巴克斯代尔在俄亥俄州赖特菲尔德附近坠机死亡）。'
    }, {
        longitudeDeg: '-103.07472222222222',
        latitudeDeg: '44.146388888888886',
        zhName: '埃尔斯沃思空军基地',
        enName: 'Ellsworth Air Force Base',
        type: '美国空军基地',
        iata: 'RCA',
        icao: 'KRCA',
        weaponry: 'B-1B战略轰炸机群',
        desc: '基地主要驻有美国全球打击司令部的第八空军的第28轰炸联队（28BW）。28BW是美国空军两个B-1B战略轰炸机联队中的一个，另一个是在得克萨斯州戴耶斯空军基地的第7轰炸机联队。'
    }, {
        longitudeDeg: '-93.94',
        latitudeDeg: '39.22638888888889',
        zhName: '怀特曼空军基地',
        enName: 'Whiteman Air Force Base',
        type: '美国空军基地',
        iata: 'SZL',
        icao: 'KSZL',
        weaponry: 'A-10"雷电"Ⅱ攻击机',
        desc: '该基地在二战期间于1942年美国遭受珍珠港袭击后所发起的全国总动员时期投入使用，称为锡代利亚滑翔机基地。1951年被转给战略空军司令部，改由中型或重型轰炸机使用——最早是 B-47。1955年，锡代利亚空军基地被更名为怀特曼空军基地，以纪念乔治·A·怀特曼少尉——一位锡代利亚居民和首位在二战中于1941年12月7日珍珠港袭击中丧生的美国飞行员之一。1961年6月 ，基地成为美国第四个民兵式战略导弹基地。民兵式战略导弹退役后，1993年，美军唯一配备B-2幽灵隐形战略轰炸机的第509轰炸机联队进驻怀特曼空军基地，使该基地再次成为美国战略核力量的重要据点之一。'
    }, {
        longitudeDeg: '-99.85472222222222',
        latitudeDeg: '32.420833333333334',
        zhName: '戴耶斯空军基地',
        enName: 'Dyess Air Force Base',
        type: '美国空军基地',
        iata: 'DYS',
        icao: 'KDYS',
        weaponry: 'B-1B战略轰炸机群',
        desc: '基地主要驻有美国全球打击司令部的第八空军的第7轰炸联队（7BW）。7BW是美国空军两个B-1B战略轰炸机联队中的一个，另一个是在南达科他州埃尔斯沃思空军基地的第28轰炸机联队。'
    }, {
        longitudeDeg: '-117.88105555555556',
        latitudeDeg: '34.905208333333334',
        zhName: '爱德华兹空军基地',
        enName: 'Edwards Air Force Base',
        type: '美国空军基地',
        iata: 'EDW',
        icao: 'KEDW',
        weaponry: 'SR-71侦察机',
        desc: ' 该基地基地作为NASA航天飞机第一备降机场，在NASA的111次航天飞机降落中，已有49次降落在此。同时，爱德华兹空军基地也是美国空军重要的试飞基地之一，包括美国最新的“X”系列飞机都在此试飞。美国空军第9侦察联队第2分队（隶属空中作战司令部，负责SR-71作战）也驻扎在这里。'
    }, {
        longitudeDeg: '-147.1013888888889',
        latitudeDeg: '64.66555555555556',
        zhName: '埃尔森空军基地',
        enName: 'Elson Air Force Base',
        type: '美国海外空军基地(阿拉斯加)',
        iata: 'EIL',
        icao: 'PEIL',
        weaponry: 'F-35战斗机',
        desc: '该基地主办单位是第354战斗机联队（354 FW），隶属第十一空军的太平洋空军部队。354 FW 的主要任务是支持RED FLAG-Alaska，这是一系列太平洋空军指挥官指导的美国军队野战训练演习、联合进攻反空、拦截、近距离空中支援和大型部队在模拟中的使用训练战斗环境。这些演习是在联合太平洋阿拉斯加靶场综合体 (JPARC) 上进行的，空中作战行动从艾尔森及其姊妹设施埃尔门多夫空军基地起飞。'
    }, {
        longitudeDeg: '144.92444444444445',
        latitudeDeg: '13.581111111111111',
        zhName: '安德森空军基地',
        enName: 'Elson Air Force Base',
        type: '美国海外空军基地(关岛)',
        iata: 'UAM',
        icao: 'PGUA',
        weaponry: 'B-1B、B-2和B-52轰炸机，F-16、F-22和F/A-18战斗机、KC-135R高空加油机、B-52运输机、E-2、E-3预警机、EA6B电子干扰机',
        desc: '安德森空军基地1945年启用，原名北方机场，1949年以1945年2月26日遭遇空难的詹姆斯·R·安德森准将命名，2009年开始隶属于马里亚纳军区联合司令部。目前，该基地是美空军第13空军司令部驻地，共有官兵1400名，是太平洋地区的力量投送中心和训练中心，是美军战略轰炸机亚太地区的主要前进基地和太平洋、印度洋地区美军的重要后勤支援基地，从关岛地区出发的战略轰炸机可在12小时内抵亚太地区任何目标。2000年以来，美军大力加强在关岛的军事部署，也将其作为战略轰炸机的前沿作战基地和弹药、航空燃油储存站，是美国空军第二大航空燃油储库（容量2.16亿升）。现驻有太平洋空军（Pacific Air Forces，简称PACAF）第36联队（36th Wing，36 WG），它包含一个行动大队，一个维修大队，一个任务支持大队，一个医疗大队和一个应急反应大队。'
    }, {
        longitudeDeg: '-157.85750',
        latitudeDeg: '21.30750',
        zhName: '夏威夷海军陆战队基地',
        enName: 'Marine Corps Base Hawaii',
        type: '美国海外军事基地',
        iata: '',
        icao: '',
        weaponry: '',
        desc: '夏威夷群岛基地群，是美军在太平洋地区的后勤和指挥中心。此基地群是连接美国本土和西太平洋各基地群的纽带，是美军太平洋战区的指挥中枢和战区战略预备队的配置地域，是太平洋中航线和南航线的海空运总枢纽。 夏威夷群岛基地群，是美国岛链战略的重要组成部分。海军陆战队基地夏威夷（MCBH）是第 3 海军陆战团、第 24 海军航空兵大队、第 3 战斗后勤营(CLB-3)第 3 无线电营和海军第2 巡逻和侦察联队的所在地。'
    }, {
        longitudeDeg: '130.87666666666667',
        latitudeDeg: '-12.414722222222222',
        zhName: '达尔文空军基地',
        enName: 'RAAF Base Darwin',
        type: '澳大利亚空军基地',
        iata: 'DRW',
        icao: 'YPDN',
        weaponry: 'AP-3C 猎户座、AN/FPS-117雷达',
        desc: ' 澳大利亚皇家空军（RAAF）基地位于澳大利亚北领地城市达尔文。该基地与达尔文国际机场共享跑道。'
    }, {
        longitudeDeg: '141.37194444444444',
        latitudeDeg: '40.70527777777778',
        zhName: '三泽空军基地',
        enName: 'Misawa Air Base',
        type: '美国驻日空军基地',
        iata: 'MSJ',
        icao: 'RJSM',
        weaponry: 'F-16战斗机、P3型反潜巡逻机',
        desc: '三泽基地是日本航空自卫队与美军共同使用的航空作战基地，驻扎有日本北部航空方面队，美空军第35战斗机联队和海军海上巡逻机中队，美国空军第6920电子保安团、海军的通信保安团、海军陆战队的支援团E连和陆军第500军事谍报团也部署在这里。'
    }, {
        longitudeDeg: '139.348611111111',
        latitudeDeg: '35.74861111111111',
        zhName: '横田空军基地',
        enName: 'Yokota Air Base',
        type: '美国驻日空军基地',
        iata: 'OKO',
        icao: 'RJTY',
        weaponry: 'C-130－13架、C-21－4架、UH-1直升机－4架 、V-22鱼鹰式倾斜旋翼机（V-22 Osprey）',
        desc: '1945年启用，是美空军在东北亚的指挥中心与主要作战基地和空运基地，隶属于美太平洋空军司令部，是驻日美空军主要基地之一。侵朝战争时，85%的B—29型机从此起飞。越南战争时，这里成为空运枢纽。1971年以后战斗部队转移往冲绳县的嘉手纳基地，现在作为运输中继基地和指挥基地使用。驻有驻日美军司令部、第5空军司令部、第374空输航空团司令部、第730航空机动中队、美国沿岸警备队极东支部、DFAS-J(会计业务队)、第10报道分遣队、空军音乐队、邮政中队。'
    }, {
        longitudeDeg: '127.7675',
        latitudeDeg: '26.355555555555554',
        zhName: '嘉手纳空军基地',
        enName: 'Kadena Air Force Base',
        type: '美国驻日空军基地(冲绳)',
        iata: 'DNA',
        icao: 'RODN',
        weaponry: 'F-15C/D、KC-135加油机、E-3预警机、HH-60直升机、爱国者”-3防空导弹',
        desc: ' 嘉手纳空军基地是美国在远东地区最大的战略空军基地，由美国太平洋空军第五航空队管辖，直线距离钓鱼台约430公里，距离台湾约600公里。部署在该基地的作战飞机有3个F-15战斗机中队、1个预警机中队和8架KC-135空中加油机。嘉手纳基地驻扎部队包括：太平洋空军第5航空联队第18航空大队(辖第12、44、67战斗机中队，装备F-15战斗机54架)，第5航空联队第909空中加油中队(装备KC-135加油机15架)，第961空中指挥中队(装备E-3预警机)，第33航空救援中队(装备HH-60飞机9架)。嘉手纳所处的战略位置异常重要，除作战部队外，美军还在该地区驻扎有空军6个单位的部队和其他军种的部队。嘉手纳空军基地是美军海外侦察机部队的重要驻扎点。以此基地为依托，美军的侦察机时常出没于西太平洋地区，成为美军窥视他国情报的重要前沿基地。'
    }, {
        longitudeDeg: '120.56027777777778',
        latitudeDeg: '15.185833333333333',
        zhName: '克拉克空军基地',
        enName: 'Clark Air Base',
        type: '菲律宾空军基地',
        iata: 'CRK',
        icao: 'RPLC',
        weaponry: '',
        desc: '克拉克空军基地是位于菲律宾吕宋岛的前美国空军基地，在1903年至1991年间属于美军，在第二次世界大战后期一直是美菲联军的重要据点。越南战争期间，克拉克空军基地是后勤补给的主要基地。随着美军于1991年撤离，基地被用作克拉克国际机场、克拉克自由港区和菲律宾空军驻地。'
    }, {
        longitudeDeg: '100.39111111111112',
        latitudeDeg: '5.466111111111111',
        zhName: '巴特沃斯空军基地',
        enName: 'RMAF Butterworth Air Base',
        type: '马来西亚空军基地',
        iata: 'BWH',
        icao: 'WMKB',
        weaponry: 'F/A-18D 大黄蜂、BAE Hawk 108/Hawk 208 和Aermacchi MB-339 AM、AP-3C 猎户座',
        desc: ' 该基地由马来西亚控制，但根据 FPDA 指挥权的条款，由澳大利亚空军副元帅指挥官综合区域防御系统 (CIADS) 管辖，而澳大利亚皇家空军仍然是共同租户，是唯一拥有该系统的外国势力。基地的永久存在。除了驻扎在基地的现役 RMAF 和 RAAF 中队外，巴特沃斯还定期支持来自 RAAF 空战、空运和航空航天作战支援小组的飞机的部署。'
    }, {
        longitudeDeg: '103.90944444444445',
        latitudeDeg: '1.3602777777777777',
        zhName: '巴耶利巴空军基地',
        enName: 'Paya Lebar Air Base',
        type: '新加坡空军基地',
        iata: 'QPG',
        icao: 'WSAP',
        weaponry: '',
        desc: '英国政府在1955年建造，在1955年8月20日开始运作，当时称新加坡国际机场。巴耶利峇机场自1981年新加坡樟宜机场启用后便转换成军事用途。一般情况下，此空军基地负责接待来访的外国空军。'
    }]
})

Mock.mock('/api/adzs/getAirTrafficControl', 'get', {
    code: 1,
    msg: '航管数据',
    data: [{
        longitudeDeg: '124.99486024413312',
        latitudeDeg: '10.473250881021897',
        name: '菲律宾航管'
    }, {
        longitudeDeg: '115.7376872479108',
        latitudeDeg: '2.8675352978942925',
        name: '印度尼西亚航管'
    }]
})

Mock.mock('/api/adzs/getTower', 'get', {
    code: 1,
    msg: '塔台数据',
    data: [{
        longitudeDeg: '142.7690545482',
        latitudeDeg: '43.3402367',
        name: '日本北海道塔台',
        area: 'Asia',
        type: 1
    }, {
        longitudeDeg: '140.0545845',
        latitudeDeg: '39.1270433177',
        name: '日本本州塔台',
        area: 'Asia',
        type: 1
    }, {
        longitudeDeg: '126.35124095',
        latitudeDeg: '38.259902158149',
        name: '朝鲜塔台',
        area: 'Asia',
        type: 1
    }, {
        longitudeDeg: '121.53178601',
        latitudeDeg: '17.77996377754',
        name: '菲律宾塔台',
        area: 'Asia',
        type: 1
    }, {
        longitudeDeg: '-105.44587695026196',
        latitudeDeg: '47.790522838591016',
        name: '美国塔台1',
        area: 'America',
        type: 2
    }, {
        longitudeDeg: '-103.50580657106617',
        latitudeDeg: '39.38013537340197',
        name: '美国塔台2',
        area: 'America',
        type: 2
    }]
})

