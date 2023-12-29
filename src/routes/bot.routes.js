const { Router } = require('express');
const { botInstance } = require('../config/instance');
// const { isAuthorized } = require('../utils/auth');
const router = Router();

// ✅
router.get('/applications/@me',async (req, res) => {
    try {
        const { data: applications} = await botInstance.get('/applications/@me')
        return res.status(200).send(applications);
    } catch (error) {
        return res.status(409).send({ message: error });
    }
})

// ✅
// Observación: Obtengo toda la información de la aplicación (bot)
router.get('/applications/:idApplication',async (req, res) => {
    const { idApplication } = req.params;
    try {
        const { data: application } = await botInstance.get(`/applications/${idApplication}`)
        return res.status(200).send(application);
    } catch (error) {
        return res.status(409).send({ message: error });
    }
})

// ✅
// Observación: Obtengo lo servidores en donde la aplicación esta unida
router.get('/users/@me/guilds',async (req, res) => {
    try {
        const { data: guilds } = await botInstance.get(`/users/@me/guilds`)
        return res.status(200).send(guilds);
    } catch (error) {
        return res.status(409).send({ message: error });
    }
})

// ✅ Editar Canal o  Threads
router.patch('/channels/:channel_id', async (req, res) => {
    const { channel_id: idChannel } = req.params;
    const body = req.body
    try {
        const { data: messages } = await botInstance.patch(`/channels/${idChannel}`, body)
        return res.status(200).send(messages);
    } catch (error) {
        return res.status(409).send({ message: error });
    }
})
// {
//     "locked": false
// }

// ✅ Borrar mensajes
// Observación: tambien se pueden eliminar los mensajes que se obtienen de un threads
router.post('/channels/:channel_id/messages/bulk-delete', async (req, res) => {
    const { channel_id: idChannel } = req.params;
    const body = req.body
    try {
        const { data: messages } = await botInstance.post(`/channels/${idChannel}/messages/bulk-delete`, body)
        return res.status(200).send(messages);
    } catch (error) {
        return res.status(409).send({ message: error });
    }
})
// {
//     "messages": ["1189606661313269851", "1189606570162671798" ]
// }


// ✅ Los mensajes de un canal
// Observación: tambien se pueden obtener los mensajes que se obtienen de un threads
router.get('/channels/:channel_id/messages', async (req, res) => {
    const { channel_id: idChannel } = req.params;
    try {
        const { data: messages } = await botInstance.get(`/channels/${idChannel}/messages`)
        return res.status(200).send(messages);
    } catch (error) {
        return res.status(409).send({ message: error });
    }
})

// ✅ Con los canales de texto funciona bien!
// Observación: Creo un thread, importante el bot debe tener los roles del foro
router.post('/channels/:channel_id/threads', async (req, res) => {
    const { channel_id: idChannel } = req.params;
    const body = req.body;
    try {
        const { data: message } = await botInstance.post(`/channels/${idChannel}/threads`, body)
        return res.status(200).send(message);
    } catch (error) {
        return res.status(409).send({ message: error });
    }
})
// {
//     "name": "A",
//     "message": {
//         "content": "jeje"
//     }
// }

// ✅ Con los canales de texto funciona bien!
// Observación: Envio mensajes a un canal importante el bot debe tener acceso al canal, se pueden enviar mensaje a foros 🎉
router.post('/channels/:channel_id/messages', async (req, res) => {
    const { channel_id: idChannel } = req.params;
    const body = req.body;
    try {
        const { data: message } = await botInstance.post(`/channels/${idChannel}/messages`, body)
        return res.status(200).send(message);
    } catch (error) {
        return res.status(409).send({ message: error });
    }
})
// {
//     "content": "Prueba nº3"
// }
 
 // ✅
// Observación: Obtengo todos los canales de un servidor
router.get('/guilds/:guild_id/channels',async (req, res) => {
    const { guild_id: idGuild } = req.params;
    try {
        const { data: channels } = await botInstance.get(`/guilds/${idGuild}/channels`)
        return res.status(200).send(channels);
    } catch (error) {
        return res.status(409).send({ message: error });
    }
})

// ✅
// Observación: Obtengo los hilos activos de un sevidor
router.get('/guilds/:guild_id/threads/active',async (req, res) => {
    const { guild_id: idGuild } = req.params;
    try {
        const { data: channels } = await botInstance.get(`/guilds/${idGuild}/threads/active`)
        return res.status(200).send(channels);
    } catch (error) {
        return res.status(409).send({ message: error });
    }
})

// ✅
// Observación: Obtengo información de un solo canal, los canales que no son theards responde con un 409
router.get('/channels/:channel_id',async (req, res) => {
    const { channel_id: idChannel } = req.params;
    try {
        const { data: channel } = await botInstance.get(`/channels/${idChannel}`)
        return res.status(200).send(channel);
    } catch (error) {
        return res.status(409).send({ message: error });
    }
})


module.exports = router;