const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { getCurrentTenantId } = require('../middlewares/storage');

exports.tenantModel = (name, schema) => {
    return (props = {}) => {
        schema.add({ tenantId: String });
        const Model = mongoose.model(name, schema);
        const { skipTenant, tenant } = props;
        if (skipTenant) return Model;

        Model.schema.set('discriminatorKey', 'tenantId');

        const tenantId = getCurrentTenantId();
        const discriminatorName = `${Model.modelName}-${tenantId}`;
        const existingDiscriminator = (Model.discriminators || {})[discriminatorName];
        return existingDiscriminator || Model.discriminator(discriminatorName, new Schema({}));
    }
}

exports.tenantlessModel = (name, schema) => {
    return () => mongoose.model(name, schema);
}