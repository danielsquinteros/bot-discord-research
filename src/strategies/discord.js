const passport = require('passport')

const User = require('../models/User');
const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } = process.env;


const { Strategy } = require('passport-discord');

passport.serializeUser((user, done) => {
    // Setea la información guardandolo en el objeto request
    // La información del objeto request lo guarda en la memoria del servidor
    // console.log('---->', 'serializeUser', user)
    done(null, user.id) 
})

passport.deserializeUser(async (id, done) => {
    // Buscar la información en el objeto request, por ejemplo, consultar los posts
    // console.log('---->', 'deserializeUser', id)
   const user = await User.findById(id)
   if(user){
       done(null, user)
   }
})

passport.use('discord-user', new Strategy({
    clientID: DISCORD_CLIENT_ID,
    clientSecret: DISCORD_CLIENT_SECRET,
    callbackURL: '/auth/redirect',
    scope: ['connections', 'email', 'identify', 'guilds', 'guilds.join', 'gdm.join', 'role_connections.write'],
},
async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('--->, access token', profile)
        console.log('--->, access token', accessToken)
        const user = await User.findOne({ discord_id: profile.id })
        if(user){
            return done(null, user)
        }
        const newUser = new User({
            discord_id: profile.id,
            username: profile.username,
            guilds: profile.guilds,
            metadata: profile
        })
        const savedUser = await newUser.save();
        done(null, savedUser)
    } catch (error) {
        console.log(error)
        return done(error, null)
    }
}))

passport.use('discord-bot', new Strategy({
    clientID: DISCORD_CLIENT_ID,
    clientSecret: DISCORD_CLIENT_SECRET,
    callbackURL: '/auth/redirect',
    scope: ['bot'],
},
async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('--->, access token', profile)
        console.log('--->, access token', accessToken)
        console.log('--->, access token', refreshToken)
    } catch (error) {
        console.log(error)
        return done(error, null)
    }
}))
