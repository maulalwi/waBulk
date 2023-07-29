// Bismillah...
// waBulk By MMMAlwi
// Created : 2023-07-29 03:24
// Updated : 2023-07-30 00:20

import date from './date.js'
import config from './../../config.js'
import chalk from 'chalk'
import tiny from 'tiny-json-http'

function log(data){
	if(!config.modeTest){
		return true
	}
	return console.log(chalk.green(`# ${date.now()} > `) + data)
}

async function errorPost(e){
// 	try {
// 		let text = `#waVNCCek
// Date : ${date.now()}

// Err : ${e}
// Msg : ${e.message}
// Stc : ${e.stack}`
// 		await tiny.post({
// 			url: config.hostApi',
// 			data: { error: text}
// 		})
// 	}catch(err){
// 		console.log('errDebugPush!', err)
// 	}
}

function error(data){
	if(config.errorPost){
		errorPost(data)
	}

	// if(!config.modeTest){
	// 	return true
	// }

	console.error(chalk.red(`# ${date.now()} > ERROR ${data.message}`))
	return console.error(data)
}

function print(data){
	if(!config.modeTest){
		return true
	}
	console.log(chalk.blue(`# ${date.now()} > PRINT`))
	return console.log(data)
}

export default {
	log,
	error,
	print
}

