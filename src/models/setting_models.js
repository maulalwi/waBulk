// Bismillah...
// waBulk By MMMAlwi
// Created : 2023-07-29 04:08
// Updated : 2023-07-29 04:52

import mongoose from 'mongoose'

function now(){
	let date = new Date()
	date.setHours(date.getHours()+7)
	return date.toISOString().slice(0, 19).replace('T', ' ')
}
const Schema = new mongoose.Schema({
	key: { type: String, unique: true },
	value: { type: String, default: '' },
	updated_at: { type: String,  default: _ => now() },
})

Schema.pre('save', function(next){
	this.updated_at = now()
	next()
})

export default mongoose.model('setting', Schema)
