import Mock from 'mockjs';
// import flowData from './data/flowdata.json'
import flowData from './data/flowJson.json'


Mock.mock('/api/adzs/getFlowData', 'get', {
    code: 1, data: flowData
})

Mock.mock('/api/adzs/stat/io', 'get', {
    code: 1,
    data: {
        news: Math.floor(Math.random() * 1000),// Mock.Random.integer(0, 999999),
        zk: Mock.Random.integer(0, 999999),
        public: Mock.Random.integer(0, 999999),
        social: Mock.Random.integer(0, 999999),
        ts: Mock.Random.integer(0, 999999),
        kgzb: Mock.Random.integer(0, 999999),
    }
})
Mock.mock('/api/adzs/stat/im', 'get', {
    code: 1,
    data: {
        radio: Mock.Random.integer(0, 999999),
        camera: Mock.Random.integer(0, 999999),
    }
})
Mock.mock('/api/adzs/stat/ia', 'get', {
    code: 1,
    data: {
        ships: Mock.Random.integer(0, 999999),
        land: Mock.Random.integer(0, 999999),
    }
})
Mock.mock('/api/adzs/stat/jz', 'get', {
    code: 1,
    data: {
        hgw: Mock.Random.integer(0, 999999),
        ydwx: Mock.Random.integer(0, 999999),
        qs: Mock.Random.integer(0, 999999),
        db: Mock.Random.integer(0, 999999),
        cdb: Mock.Random.integer(0, 999999),
        dzzc: Mock.Random.integer(0, 999999),
    }
})

Mock.mock('/api/adzs/flow/flowimg', 'get', {
    code: 1,
    data: [
        {
            name: '话音数据',
            imgsrc: '话音数据.png'
        }, {
            name: '社交媒体数据',
            imgsrc: '社交媒体.png'
        }, {
            name: '态势数据',
            imgsrc: '态势数据.png'
        }, {
            name: '要闻数据',
            imgsrc: '要闻数据.png'
        }
    ]
})