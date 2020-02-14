const router = require('express').Router();
const ctrl = require('../controllers');
const { getCurrentTenantId } = require('../middlewares/storage');

router.get('/', (req, res) => {
    console.log(getCurrentTenantId());
    res.status(200).json({ message: 'Hola Mundo' });
})

router.post('/test', ctrl.user.createUser);
router.get('/test', ctrl.user.getAllByTenant);

module.exports = router;
