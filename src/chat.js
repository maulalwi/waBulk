// Bismillah...
// waBulk By MMMAlwi
// Created : 2023-07-29 04:26
// Updated : 2023-07-30 00:03

export default async (WA, app) => {
	try {
		// WA.debug.log(WA.senderID)
		// console.log(await WA.uri());

		if (
			WA.messageText.match(/^rs$/i) &&
			WA.senderID == WA.config.superAdmin
		) {
			WA.readChat()
			var log = `_#${app} Restart..._\n${WA.date.now()}`
			await WA.replyText(log)
			WA.debug.log(log)

			process.exit()
		}

		if (WA.messageText.match(/^uri$/i)) {
			WA.readChat()
			return await WA.replyText(
				`uri : ${await WA.uri()}\n${WA.date.dateTime()}`
			)
		}

		if (WA.messageText.match(/^cekchat$/i)) {
			WA.readChat()
			let chat = await WA.SETTING.findOne({ key: 'chat' })
			if (chat) {
				return await WA.replyText(
					`*Chat Default :*\n\n***\n${chat.value}\n***`
				)
			} else {
				await WA.SETTING.create({
					key: 'chat',
					value: '',
				})
				return await WA.replyText('_Balasan chat kosong_')
			}
		}

		if (WA.messageText.match(/^cekwa$/i)) {
			WA.readChat()
			let cekWa = await WA.BULK.find({})
			if (cekWa && cekWa.length != 0) {
				let text = `*List WA*\n\nTotal : ${cekWa.length}\n\n`
				let i = 1
				for (let key of cekWa) {
					text += `${i}. ${key.wa} ${key.done}\n`
					i += 1
				}
				return await WA.replyText(text)
			} else {
				return await WA.replyText('_WA masih kosong_')
			}
		}

		if (WA.messageText.match(/^cekstatus$/i)) {
			WA.readChat()
			let status = await WA.SETTING.findOne({ key: 'status' })
			if (status) {
				return await WA.replyText(`*Status : ${status.value}*`)
			} else {
				await WA.SETTING.create({
					key: 'status',
					value: 'stop',
				})
				return await WA.replyText('_Status Stop_')
			}
		}

		if (WA.messageText.match(/^start$/i)) {
			WA.readChat()
			let status = await WA.SETTING.findOne({ key: 'status' })
			status.value = 'start'
			await status.save()
			return await WA.replyText(`_Status diubah : ${status.value}_`)
		}

		if (WA.messageText.match(/^stop$/i)) {
			WA.readChat()
			let status = await WA.SETTING.findOne({ key: 'status' })
			status.value = 'stop'
			await status.save()
			return await WA.replyText(`_Status diubah : ${status.value}_`)
		}

		if (WA.messageText.match(/^reset$/i)) {
			WA.readChat()
			let reset = await WA.BULK.updateMany({}, { done: 'false' })
			if (reset) {
				return await WA.replyText(`_Berhasil reset status wa_`)
			} else {
				return await WA.replyText(`_Gagal reset status wa_`)
			}
		}
		
		if (WA.messageText.match(/^chat/i)) {
			WA.readChat()
			let chat = WA.messageText.replace(/chat\n/i, '')
			if (!chat || chat == '') {
				return await WA.replyText('_Format input chat salah_')
			}

			let cekChat = await WA.SETTING.findOne({ key: 'chat' })
			if (cekChat) {
				cekChat.value = chat
				await cekChat.save()
			} else {
				await WA.SETTING.create({
					key: 'chat',
					value: chat,
				})
			}
			return await WA.replyText('_Berhasil update chat_')
		}

		if (WA.messageText.match(/^wa/i)) {
			WA.readChat()
			let wa = WA.messageText
			wa = wa.split('\n')
			wa.shift()

			if (wa.length >= 1) {
				let text = ''
				let i = 1
				let d = 0
				for (let key of wa) {
					key = WA.toWA(key)
					let cek = key.length >= 8 ? key : 'false'
					cek = /^\d+$/.test(cek) ? 'true' : 'false'
					if (cek == 'true') {
						let cekDb = await WA.BULK.findOne({ wa: key })
						if (!cekDb) {
							await WA.BULK.create({
								wa: key,
								done: 'false',
							})
							d += 1
						} else {
							cek = 'on'
						}
					}
					text += `${i}. ${key} ${cek}\n`
					i += 1
				}
				text += '```'
				text = `*Input WA*\n\nTotal : ${wa.length}\nInput : ${d}\n\n\`\`\`${text}`
				return await WA.replyText(text)
			} else {
				return await WA.replyText('_Format input wa salah_')
			}
		}

		if (WA.messageText.match(/^delwa/i)) {
			WA.readChat()
			let wa = WA.messageText
			wa = wa.split('\n')
			wa.shift()

			if (wa.length >= 1) {
				let text = ''
				let i = 1
				let d = 0
				for (let key of wa) {
					key = WA.toWA(key)
					let cek = key.length >= 8 ? key : 'false'
					cek = /^\d+$/.test(cek) ? 'delete' : 'false'
					i += 1
					if (cek == 'delete') {
						let cekDb = await WA.BULK.findOne({ wa: key })
						if (cekDb) {
							await WA.BULK.deleteOne({ wa: key })
							d += 1
						} else {
							cek = 'no'
						}
					}
					text += `${i}. ${key} ${cek}\n`
				}
				text += '```'
				text = `*Delete WA*\n\nTotal : ${wa.length}\nDelete : ${d}\n\n\`\`\`${text}`
				return await WA.replyText(text)
			} else {
				return await WA.replyText('_Format input wa salah_')
			}
		}

		return await WA.replyText(`*WA Query*

*Data :*
\`\`\`cekchat
cekwa
cekstatus
start
stop
reset
\`\`\`
*Edit Chat :*
\`\`\`
chat
<chat>
\`\`\`
*Tambah Nomor WA :*
\`\`\`
wa
<number>
<number>
<number...>
\`\`\`
*Hapus Nomor WA :*
\`\`\`
delwa
<number>
<number>
<number...>
\`\`\`
`)
	} catch (err) {
		WA.debug.error(err)
	}
}
