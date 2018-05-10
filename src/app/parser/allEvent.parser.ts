import * as _ from 'lodash';
import * as moment from 'moment';

export function AllEventParser(dataItem) {
    const result = [];
    const mapKeys = {
        100: 'Safety',
        101: 'Battery',
        102: 'Security',
        103: 'Health'
    };
    let o;
    for ( o in dataItem ) {
        if ( dataItem[o] && mapKeys[o] ) {
            const key = mapKeys[o];
            const val = dataItem[o];
            result.push([key, parseInt(val, 10)]);
        }
    }
    return result;
}
