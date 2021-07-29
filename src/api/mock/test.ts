import Mock from 'mockjs';
import IcaoData from './data/all_airport_ICAO.json'

Mock.mock('/api/test/geticaoList', 'get', {
    code: 1,
    msg: 'success',
    data: IcaoData
})