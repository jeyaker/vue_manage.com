const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
    id: String,
    name: String,
    address: String,
    tel: String,
    info: String,
    slogan: String,
    feature: String,
    category: String,
    delivery: String,
    price: String,
    startTime: String,
    endTime: String,
    logoUrl: String,
    businessUrl: String,
    cateringUrl: String,
});

module.exports = shopSchema;