import * as _ from 'lodash';
import * as moment from 'moment';

export function MttrParser(mttrData) {
const result = [];
const monthKey = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
                ];
_.forEach(mttrData.data, ( val ) => {
                    const temp = [monthKey[val.month - 1], val.value];
                    result.push(temp);
                });
return result;
}
