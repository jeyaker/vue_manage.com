import request from 'utils/request';

import {
    SHOP_ADD,
    SHOP_DEL,
    SHOP_UPDATE,
    SHOP_QUERY
} from 'store/action_type';

export default {
    state: {
        data: null,
        count: 0
    },
    actions: {
        async add({
            commit
        }, payload) {
            const res = await request({
                url: '/shop',
                method: 'POST',
                data: payload
            });

            commit({
                type: SHOP_ADD,
                payload: res.data
            });

            return new Promise((resolve, reject) => {
                resolve({
                    data: res.data
                });
            });
        },
        async del({
            commit
        }, _id) {
            const res = await request({
                url: '/shop',
                method: 'DELETE',
                params: {
                    _id
                }
            });
            // console.log(res);
            commit({
                type: SHOP_DEL,
                payload: res.data.result
            });

            return new Promise((resolve, reject) => {
                resolve({
                    data: res.data
                });
            });
        },
        async update({
            commit
        }, data) {
            const res = await request({
                url: '/shop',
                method: 'PUT',
                params: data
            });

            commit({
                type: SHOP_UPDATE,
                payload: res.data.result
            });

            return new Promise((resolve, reject) => {
                resolve({
                    data: res.data
                });
            });
        },
        async query({
            commit
        }) {
            const res = await request({
                url: '/shop',
                method: 'GET'
            });

            commit({
                type: SHOP_QUERY,
                payload: res.data.result
            });

            return new Promise((resolve, reject) => {
                resolve({
                    data: res.data
                });
            });
        }
    },
    mutations: {
        SHOP_ADD(state, action) {
            state.data = action.payload;
        },
        SHOP_DEL(state, action) {
            state.data = action.payload;
        },
        SHOP_QUERY(state, action) {
            state.data = action.payload;
        },
        SHOP_UPDATE(state, action) {
            state.data = action.payload;
        }
    }
};