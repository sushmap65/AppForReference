import * as _ from 'lodash';
import * as moment from 'moment';

export function revenueDataParser(data) {
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
_.forEach(data, ( val ) => {
                    const temp = {State: '', consumables: 0, listItems: 0,
                                parts: 0, wearItems: 0, total: 0};
                    temp.State = monthKey[val.forMonth];
                    temp.consumables = val.consumables;
                    temp.listItems = val.listItems;
                    temp.parts = val.parts;
                    temp.wearItems = val.wearItems;
                    temp.total = val.consumables + val.listItems + val.parts + val.wearItems;
                    result.push(temp);
                  });
return result;
}
