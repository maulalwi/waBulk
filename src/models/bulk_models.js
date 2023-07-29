// Bismillah...
// waBulk By MMMAlwi
// Created : 2023-07-29 04:07
// Updated : 2023-07-29 08:22

import mongoose from 'mongoose'

function now(){
	let date = new Date()
	date.setHours(date.getHours()+7)
	return date.toISOString().slice(0, 19).replace('T', ' ')
}
const Schema = new mongoose.Schema({
	wa: { type: String, unique: true },
	done: { type: String, default: 'false' }, // true, false
	created_at: { type: String, default: _ => now() },
	updated_at: { type: String,  default: _ => now() },
})

Schema.pre('save', function(next){
	this.updated_at = now()
	next()
})

Schema.pre('updateMany', function(next){
	this.updated_at = now()
	next()
})

export default mongoose.model('bulk', Schema)
