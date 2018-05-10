import * as _ from 'lodash';
import * as moment from 'moment';

export function historicalDataForLineChart(dataitems, itemName) {
    let result = [];
    const offset = new Date().getTimezoneOffset();
    // TODO: Change this once the bug is fixed on sever
    const data = dataitems.result || dataitems;
    _.forEach(data, (val, key) => {
        if (typeof val === 'object') {
            _.forEach(val, (item) => {
                if (item && item.data) {
                    const dataPool = item.data.asset || item.data.platform;
                    if (dataPool) {
                        const dataKey = dataPool.columns;
                        const values = dataPool.values;
                        if (dataKey && values) {
                            const ln = dataKey.length;
                            const multiTimeObj = _.countBy(dataKey);
                            // index of item
                            let timeIndex = dataKey.indexOf('time');
                            const itemIndex = dataKey.indexOf(itemName);
                            if ( multiTimeObj['time'] === ln / 2 ) {
                                timeIndex = itemIndex - 1;
                            }
                            _.forEach(values, (o) => {
                                let date = o[timeIndex];
                                date = new Date(date);
                                const value = o[itemIndex];
                                if (value !== null) {
                                    result.push({date, value});
                                }
                            });
                        }
                    }
                }
            });
        }
    });

    const finalData = _.sortBy(result, (o) => {
                            return o.date.getTime();
                        });
    return finalData;
}

export function AggregatedDataForLineChart(dataitems, itemName) {
    let result = [];
    const offset = new Date().getTimezoneOffset();
    // TODO: Change this once the bug is fixed on sever
    const data = dataitems.result || dataitems;
    _.forEach(data, (val, key) => {
   // console.log('Values..' + JSON.stringify(data));
    if (typeof val === 'object') {
        _.forEach(val, (item) => {
            if (item && item.data) {
                const dataPool = item.data.asset || item.data.platform;
                if (dataPool) {
                    const dataKey = dataPool.columns;
                    const values = dataPool.values;
                    if (dataKey && values) {
                        const ln = dataKey.length;
                        const multiTimeObj = _.countBy(dataKey);
                        // index of item
                        let timeIndex = dataKey.indexOf('time');
                        const itemIndex = dataKey.indexOf(itemName);
                        if ( multiTimeObj['time'] === ln / 2 ) {
                            timeIndex = itemIndex - 1;
                        }
                        _.forEach(values, (o) => {
                            let date = o[timeIndex];
                            date = new Date(date);
                            const value = o[itemIndex];
                            if (value !== null) {
                                result.push({date, value});
                            }
                        });
                    }
                }
            }
        });
    }
    });

    const finalData = _.sortBy(result, (o) => {
                            return o.date.getTime();
                        });
    return finalData;
}

