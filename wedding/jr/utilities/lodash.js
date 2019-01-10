import mixin from 'lodash/mixin';
import _ from 'lodash/wrapperLodash';

import orderBy from 'lodash/orderBy';
import groupBy from 'lodash/groupBy';
import some from 'lodash/some';

mixin(_, {
    groupBy,
    orderBy,
    some
});
Object.defineProperty(Vue.prototype, '_', {
    value: _,
});