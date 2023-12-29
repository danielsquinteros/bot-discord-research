const { default: axios } = require("axios");

const botInstance = axios.create({
  headers: {
    'Authorization': `Bot ${process.env.DISCORD_TOKEN}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  baseURL: 'https://discord.com/api/v10'
  });


module.exports = {
    botInstance
}