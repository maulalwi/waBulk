// Bismillah...
// waBulk By MMMAlwi
// Created : 2023-07-29 03:21
// Updated : 2023-07-29 03:21

// nodemon waBulk.js -w src/

import startSock from './src/app.js'
import connect from './src/cores/database.js' 

// start connect databased
connect()

// starting startSock()
startSock()

