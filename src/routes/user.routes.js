const { Router } = require('express');
const { botInstance } = require('../config/instance');
const router = Router();

// ✅
// Observación: Listo los roles del servidor
router.get('/guilds/:guild_id/roles',async (req, res) => {
    const { guild_id: idGuild } = req.params;
    try {
        const { data: roles } = await botInstance.get(`/guilds/${idGuild}/roles`)
        return res.status(200).send(roles);
    } catch (error) {
        return res.status(409).send({ message: error });
    }

})

// ✅
// Observación: Listo los roles de un usuario con toda su información
router.get('/guilds/:guild_id/members/:user_id',async (req, res) => {
    const { guild_id: idGuild, user_id: idUser } = req.params;
    try {
        const { data: user } = await botInstance.get(`/guilds/${idGuild}/members/${idUser}`)
        return res.status(200).send(user);
    } catch (error) {
        return res.status(409).send({ message: error });
    }
})

// ✅
//Observación: Agrego a un usuario al servidor con los roles que quiero
router.put('/guilds/:guild_id/members/:user_id',async (req, res) => {
    const { guild_id: idGuild, user_id: idUser } = req.params;
    const body = req.body;
    // {
    //     "access_token": "TpbEA88TdBbzysJWhFKp3gHtdKWf9N",
    //     "roles": [
    //         "1184230496088100934"
    //     ]
    // }
    try {
        const { data: user } = await botInstance.put(`/guilds/${idGuild}/members/${idUser}`, body)
        return res.status(200).send(user);
    } catch (error) {
        return res.status(409).send({ message: error });
    }
})
// {
// 	"access_token": "TpbEA88TdBbzysJWhFKp3gHtdKWf9N",
// 	"roles": [
// 		"1184230496088100934"
// 	]
// }

// ✅
// Observación: Agrego directamente roles al usuario - responde con un 200
router.put('/guilds/:guild_id/members/:user_id/roles/:role_id',async (req, res) => {
    const { guild_id: idGuild, user_id: idUser, role_id: idRole } = req.params;
    const body = req.body;
    try {
        const { data: user } = await botInstance.put(`/guilds/${idGuild}/members/${idUser}/roles/${idRole}`)
        return res.status(200).send(user);
    } catch (error) {
        return res.status(409).send({ message: error });
    }
})

// ✅
// Observación: Elimino directamente roles al usuario - respode con un 200
router.delete('/guilds/:guild_id/members/:user_id/roles/:role_id',async (req, res) => {
    const { guild_id: idGuild, user_id: idUser, role_id: idRole } = req.params;
    const body = req.body;
    try {
        const { data: user } = await botInstance.delete(`/guilds/${idGuild}/members/${idUser}/roles/${idRole}`)
        return res.status(200).send(user);
    } catch (error) {
        return res.status(409).send({ message: error });
    }
})

module.exports = router;