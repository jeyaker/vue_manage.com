import Vue from 'vue';
import Vuex from 'vuex';

import shop from './shop';
import goods from './goods';
import user from './user';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        shop,
        goods,
        user
    }
});


export default store;