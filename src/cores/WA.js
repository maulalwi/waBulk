// Bismillah...
// waBulk By MMMAlwi
// Created : 2023-07-29 04:12
// Updated : 2023-07-29 09:59

import load from './load.js'

export default class WA {
	constructor(sock = false, msg = false) {
		if (sock) {
			this.sock = sock
			this.msg = msg

			if (this.msg) {
				this.sID = this.msg.key.remoteJid

				this.isMe = true ? this.msg.key.fromMe : false
				this.isChat = this.senderID.endsWith('@s.whatsapp.net')
				this.isGrup = this.senderID.endsWith('@g.us')
				this.isStatus = this.senderID.endsWith('status@broadcast')

				this.isChatOnly = true ? this.msg.message?.conversation : false

				this.messageText =
					this.msg.message?.conversation ||
					this.msg.message?.extendedTextMessage?.text ||
					''

				this.chatID = this.msg?.key.id
				this.memberID = this.isGrup ? this.msg.key?.participant : ''

				this.react = this.msg.message?.reactionMessage
				this.isReact = this.react ? true : false

				this.name = this.msg.pushName
			}
		}

		this.config = load.config
		this.date = load.date
		this.helper = load.helper
		this.debug = load.debug

		this.BULK = load.BULK
		this.SETTING = load.SETTING
	}

	//     async logChat(){
	//         if(!this.isMe){
	//             let user = await this.user
	//             this.debug.print(`#newChat
	// CGS      : C:${this.isChat}|G:${this.isGrup}|S:${this.isStatus}
	// uri      : ${await this.uri}
	// isMe     : ${await this.isMe}
	// senderID : ${this.senderID}
	// userID   : ${user._id}
	// text     : ${this.messageText}`)
	//         }
	//     }

	set senderID(newSID) {
		this.sID = newSID
		return newSID
	}

	get senderID() {
		return this.sID
	}

	readChat() {
		// send read chat
		this.sock.readMessages([this.msg.key])
	}

	uri(num = false) {
		let ch = this.messageText.toLowerCase().split(' ')
		if (num) {
			if (ch[num]) {
				return ch[num]
			} else {
				return false
			}
		} else {
			return ch
		}
	}

	toWA(wa) {
		wa = String(wa)
		wa = wa.replaceAll('+', '')
		wa = wa.replaceAll('-', '')
		wa = wa.replaceAll(' ', '')
		return wa
	}

	async reply(template) {
		return await this.sock.sendMessage(this.senderID, template, {
			quoted: this.msg,
		})
	}

	async replyText(messageText = '~TextKosong~') {
		return await this.reply({ text: String(messageText) })
	}

	async replyImage(img, messageText = '') {
		return await this.reply({
			image: img,
			caption: messageText,
			gifPlayback: true,
		})
	}
}
