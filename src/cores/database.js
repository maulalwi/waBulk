// Bismillah...
// waBulk By MMMAlwi
// Created : 2023-07-29 03:23
// Updated : 2023-07-29 03:36

import mongoose from 'mongoose'
import config from './../../config.js'
import debug from './debug.js'

function connect(){
  // Connecting to the database

  // Fix error
  mongoose.set('strictQuery', true)

  mongoose
    .connect(config.dbUri, {
      dbName: config.dbName,
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false,
    })
    .then(() => {
      debug.log('DB     : Connected to database.')
    })
    .catch((error) => {
      debug.log('DB     : Connection failed. Exiting now...')
      debug.error(error)
      process.exit()
    })
}

export default connect
