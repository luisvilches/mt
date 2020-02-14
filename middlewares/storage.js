const { createNamespace,getNamespace } = require('continuation-local-storage');
const ns = createNamespace('namespace');
const nameTenantid = 'tenantId';
exports.bindCurretNamespace = (req,res,next) => {
    ns.bindEmitter(req);
    ns.bindEmitter(res);
    ns.run(() => {
        ns.set(nameTenantid,nameTenantid);
        next();
    })
}

exports.setCurrentTenantId = tenantId => {
    return ns.set(nameTenantid, tenantId);
}

exports.getCurrentTenantId = () => {
    return ns.get(nameTenantid);
}

