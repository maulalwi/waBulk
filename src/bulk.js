// Bismillah...
// waBulk By MMMAlwi
// Created : 2023-07-29 08:53
// Updated : 2023-08-12 12:26

export default async (WA) => {
	try {
		let cekStatus = await WA.SETTING.findOne({ key: 'status' })
		// WA.debug.log(WA.date.now())
		if(cekStatus && cekStatus.value == 'start'){
			let bulk = await WA.BULK.findOne({ done: 'false' }).sort('wa')
			if(bulk.wa.match(/^0/i)){
				bulk.done = 'true'
				await bulk.save()
				
				WA.debug.log('Error 0 ' + bulk.wa)
			}else if(bulk){
				let chat = await WA.SETTING.findOne({ key: 'chat' })
				WA.senderID = `${bulk.wa}@@s.whatsapp.net`
				let reply = await WA.replyText(chat.value)

				bulk.done = 'true'
				await bulk.save()
				
				WA.debug.log('Done ' + bulk.wa)
			}
		}
		return true
	} catch (err) {
		WA.debug.error(err)
	}
}
