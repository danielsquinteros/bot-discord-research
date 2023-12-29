const { Router } = require('express');
// const { isAuthorized } = require('../utils/auth');
const router = Router();

router.get('/is-auth', (req, res) => {
    return res.status(200).send({ message: 'is auth' });
})
router.get('/', (req, res) => {
    return res.status(200).send({ message: 'home' });
})

module.exports = router;