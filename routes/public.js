const router = require('express').Router();
const ctrl = require('../controllers');
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Hola Mundo' });
})

// LOGIN
router.post('/login', ctrl.auth.auth);

module.exports = router;
