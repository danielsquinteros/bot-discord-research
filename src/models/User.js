const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    discord_id: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    guilds: {
        type: Array,
        required: true,
    },
    metadata: {
        type: Object,
    }
}, {
    timestamps: true,
})

module.exports = model('User', userSchema);