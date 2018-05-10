import * as _ from 'lodash';
import * as moment from 'moment';

export function UtilizationParse(dataitems) {
    const result = [];
    const first = dataitems[Object.keys(dataitems)[0]];
    _.forEach(first, (val, key) => {
        const dataPool = val.data.platform;
        if (dataPool) {
            const dataKey = dataPool.columns;
            const values = dataPool.values;
            if (dataKey && values) {
                const timeIndex = dataKey.indexOf('time');
                const engineRunning = dataKey.indexOf('EngineRunningHours_Current');
                _.forEach(values, (items) => {
                    const displayDate = moment
                                .utc(items[timeIndex], 'YYYY-MM-DD HH:mm:ss');
                    const month = displayDate.format('MMM');
                    const day   = displayDate.format('D');
                    const year  = displayDate.format('YY');
                    const timeStr = day + ' ' + month + ' ' + year;
                    const dataValue = parseInt(items[engineRunning]);
                    if (dataValue && dataValue > 0 && dataValue <20 ) {
                        const temp = [timeStr, dataValue];
                        result.push(temp);
                    }
                });
            }
        }
    });
    return result.reverse().slice(Math.max(result.length - 8, 0));

}
export function UtilizationBarParser(dataitems){
    let result = [];
    const first = dataitems[Object.keys(dataitems)[0]];
    const second = first[Object.keys(first)[0]];
    _.forEach(second, (val, key) => {
    const keys = key;
    const values = val;
   // console.log('values', keys, values);
    const displayDate = moment(Number(keys));
    const month = displayDate.format('MMM');
    const day   = displayDate.format('D');
    const year  = displayDate.format('YY');
    const timeStr = day + ' ' + month + ' ' + year;
    const dataValue = Number(values);
    const temp = {time:timeStr, value:dataValue, date: new Date(Number(keys))};
    result.push(temp);
    });
    var sortVal = _.sortBy(result, (o) => {
        return o.date.getTime();
    })
    result = [];
    _.forEach(sortVal, (o)=>{
        const myArray = [o.time,o.value];
        result.push(myArray);
    });
  //  console.log('result from bar parser', result);
    return result;
}