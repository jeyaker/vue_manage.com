import request from 'utils/request';

const USER_ADD = 'USER_ADD';
const USER_DEL = 'USER_DEL';
const USER_UPDATE = 'USER_UPDATE';
const USER_QUERY = 'USER_QUERY';


export default {
    state: {
        data: null
    },
    actions: {
        async user_add({
            commit
        }, data) {
            const res = await request({
                url: '/reg',
                method: 'POST',
                data
            });

            // console.log(res);
            commit({
                type: USER_ADD,
                payload: res
            });

            return new Promise((resolve, reject) => {
                resolve({
                    data: res
                })
            });
        },
        async user_del({
            commit
        }, _id) {
            // console.log(_id);
            const res = await request({
                url: '/users',
                method: 'DELETE',
                params: {
                    _id
                }
            });

            commit({
                type: USER_DEL,
                payload: res.data.result
            });
            // console.log(res);
            return new Promise((resolve, reject) => {
                resolve({
                    data: res
                });
            });
        },
        user_update({
            commit
        }) {},
        async user_query({
            commit
        }, data) {
            if (data) {
                const res = await request({
                    url: '/login',
                    method: "POST",
                    data
                });

                commit({
                    type: USER_QUERY,
                    payload: res
                });

                // console.log(res);
                return new Promise((resolve, reject) => {
                    resolve({
                        data: res
                    });
                });
            } else {
                const res = await request({
                    url: '/users',
                    method: "POST",
                });

                commit({
                    type: USER_QUERY,
                    payload: res.data.result
                });

                // console.log(res);
                return new Promise((resolve, reject) => {
                    resolve({
                        data: res
                    });
                });
            }



        }
    },
    mutations: {
        USER_ADD(state, action) {
            state.data = action.payload;
        },
        USER_DEL(state, action) {
            state.data = action.payload;
        },
        USER_UPDATE(state, action) {
            state.data = action.payload;
        },
        USER_QUERY(state, action) {
            state.data = action.payload;
        }
    }
};