const mongoose = require('mongoose');

const connect = require('./connect');
connect.init();


const {
    userSchema,
    shopSchema
} = require('./Schema/index');

const userModel = mongoose.model('users', userSchema);
const shopModel = mongoose.model('shops', shopSchema);

const db = {
    user: {
        add(data) {
            return new Promise((resolve, reject) => {
                userModel.find({
                    username: data.username
                }, (err, docs) => {
                    if (err) console.log(err);
                    if (!docs.length) {
                        const doc = new userModel(data);
                        doc.save(err => {
                            if (err) {
                                reject({
                                    status: 1,
                                    info: '注册失败'
                                });
                            } else {
                                resolve({
                                    status: 2,
                                    info: '注册成功'
                                });
                            }
                        });
                    } else {
                        reject({
                            status: 0,
                            info: '用户名已存在'
                        });
                    }
                });
            });
        },
        del(_id) {
            return new Promise((resolve, reject) => {
                userModel.findById(_id, (err, doc) => {
                    if (err) {
                        reject({
                            info: '数据不存在',
                            status: 0
                        });
                    } else {
                        // console.log(doc);
                        doc.remove(err => {
                            if (err) {
                                reject({
                                    info: "删除失败",
                                    status: 1
                                });
                            } else {
                                userModel.find({}, (err, docs) => {
                                    if (err) throw err;
                                    resolve({
                                        info: '删除成功',
                                        status: 2,
                                        data: docs
                                    })
                                })
                            }
                        });
                    }
                });
            });
        },
        update(data) {
            return new Promise((resolve, reject) => {
                userModel.find({
                    username: data.username
                }, (err, docs) => {
                    if (err) console.log(err);
                    if (docs.length) {
                        // console.log(docs);
                        const _id = docs[0]._id;
                        userModel.findById(_id, (err, doc) => {
                            if (err) console.log(err);
                            doc.password = data.newpass;
                            doc.save(err => {
                                if (err) {
                                    reject({
                                        status: 2,
                                        info: '修改失败'
                                    });
                                } else {
                                    resolve({
                                        status: 1,
                                        info: '修改成功'
                                    });
                                }
                            });
                        });
                    } else {
                        reject({
                            status: 0,
                            info: '用户名不存在'
                        });
                    }
                });
            });
        },
        query(data) {
            return new Promise((resolve, reject) => {
                if (!data) {
                    userModel.find({}, (err, doc) => {
                        if (err) throw err;
                        resolve({
                            info: '查询成功',
                            status: 2,
                            data: doc
                        });
                    })
                } else {
                    userModel.find({
                        username: data.username
                    }, (err, docs) => {
                        // console.log(docs);
                        if (err) throw err;
                        if (docs.length == 0) {
                            reject({
                                status: 0,
                                info: '用户名不存在'
                            });
                        } else {
                            const f = docs.some(item => item.username == data.username && item.password == data.password);

                            // console.log(f);
                            if (f) {
                                resolve({
                                    status: 2,
                                    info: '登录成功'
                                });
                            } else {
                                reject({
                                    status: 1,
                                    info: '用户名或密码错误'
                                });
                            }

                        }

                    });
                }

            });
        }
    },
    shop: {
        add(data) {
            return new Promise((resolve, reject) => {
                const shop = new shopModel(data);

                shopModel.find({}, (err, doc) => {
                    if (err) {
                        throw err;
                    } else {
                        const f = doc.some(item => item.id == data.id);

                        if (f) {
                            resolve({
                                info: '店铺已存在',
                                status: 0,
                            });
                        } else {
                            shop.save(err => {
                                if (err) {
                                    reject({
                                        info: '添加失败',
                                        status: 1,
                                    });
                                } else {
                                    shopModel.find({}, (err, docs) => {
                                        if (err) throw err
                                        resolve({
                                            info: '添加成功',
                                            status: 2,
                                            data: docs
                                        });
                                    });
                                }
                            });

                        }
                    }
                });
            });
        },
        del(_id) {
            return new Promise((resolve, reject) => {
                shopModel.findById(_id, (err, doc) => {
                    if (err) {
                        reject({
                            info: '数据不存在',
                            status: 0
                        });
                    } else {
                        doc.remove(err => {
                            if (err) {
                                reject({
                                    info: '删除失败',
                                    status: 1
                                });
                            } else {
                                shopModel.find({}, (err, docs) => {
                                    if (err) throw err
                                    resolve({
                                        info: '删除成功',
                                        status: 2,
                                        data: docs
                                    });
                                });
                            }
                        });
                    }

                });
            });
        },
        update(data) {
            return new Promise((resolve, reject) => {
                shopModel.findById(data._id, (err, doc) => {
                    if (err) throw err;
                    // console.log(doc);
                    // console.log(data);
                    for (let key in data) {
                        doc[key] = data[key]
                    }
                    // console.log(doc);

                    doc.save(err => {
                        if (err) {
                            reject({
                                info: "修改失败",
                                status: 0
                            });
                        } else {
                            shopModel.find({}, (err, docs) => {
                                if (err) throw err;
                                resolve({
                                    info: '修改成功',
                                    status: 2,
                                    data: docs
                                });
                            });
                        }
                    });
                })
            });
        },
        query() {
            return new Promise((resolve, reject) => {
                shopModel.find({}, (err, doc) => {
                    if (err) throw err
                    resolve({
                        info: '查询成功',
                        status: 2,
                        data: doc
                    });
                });
            });
        }
    }
}

module.exports = {
    user: db.user,
    shop: db.shop
};