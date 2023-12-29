const { Router } = require('express');
const router = Router();

const passport = require('passport');
// const { isNotAuthorized } = require('../utils/auth');

router.get('/user', passport.authenticate('discord-user'));
router.get('/bot', passport.authenticate('discord-bot', { permissions: 70368744177655 }));


router.get('/redirect', passport.authenticate('discord-user',{
    successRedirect: '/is-auth',
    failureRedirect: '/'
}))

router.get('/redirect', passport.authenticate('discord-bot',{
    successRedirect: '/is-auth',
    failureRedirect: '/'
}))

module.exports = router;