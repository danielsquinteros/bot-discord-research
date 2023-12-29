const mongoose = require('mongoose');

const db = async (MONGODB_CONNECT) => {
  try {
    // Connect to the MongoDB cluster
    await mongoose.connect(
      MONGODB_CONNECT
    );
    console.log('Database is online');
  } catch (error) {
    console.log('Could not connect', error);
    throw new Error('Could not connect to database');
  }
};

module.exports = db;
