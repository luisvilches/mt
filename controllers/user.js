const mongoose = require("mongoose");
const codes = require('../utils/codes');
const { getCurrentTenantId } = require('../middlewares/storage');
const User = require('../models/User');

const createUser = async(req,res) => {
    const {rut, name, lastname, email, password, professional_id, licence, rol, address, phone} = req.body;
    User().create({
        rut: rut,
        name: name,
        lastname: lastname,
        email: email,
        professional_id: professional_id,
        rol: rol,
        licence:licence,
        address:address,
        phone: phone,
    })
    .then(response => {
        return res.status(codes.SUCCESSFUL_REQUEST).json({success: true, data: codes.DATA_CREATED})
    })
    .catch(err => {
        return res.status(codes.SERVER_ERROR).json({success: false, data: err.message})
    })
}

const getAllByTenant = async(req,res) => {
    const tenantId = getCurrentTenantId();
    try{
        User().find({}, function(err,users){
            if(err) return res.status(codes.SERVER_ERROR).json({status: false, data: err.message});
            else    return res.status(codes.SUCCESSFUL_REQUEST).json({status: true, data:users});
        })
    }
    catch(err){
        return res.status(codes.SERVER_ERROR).json({status: false, data: err.message})
    }
}

module.exports = {
    createUser,
    findUserByRut,
}