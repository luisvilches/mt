const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;
const { validateRut } = require("../controllers/validators");
const { tenantModel, tenantlessModel } = require('../utils/multiTenant');

let User = new Schema({
    rut: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    password: {
        type: String,
    },

    professional_id: {
        type: String,
        default: ''
    },

    rol:{
        type: String,
        required: true
    },

    licence: {
        type: String,
    },

    is_available: {
        type: Boolean,
        default: true
    }

});

User.plugin(timestamps, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = tenantModel("User", User);