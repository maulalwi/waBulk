// Bismillah...
// waBulk By MMMAlwi
// Created : 2023-07-29 04:23
// Updated : 2023-08-06 12:04

import baileys from '@whiskeysockets/baileys'
const makeWASocket = baileys.default
const {
	// makeInMemoryStore,
	fetchLatestBaileysVersion,
	makeCacheableSignalKeyStore,
	// proto,
	DisconnectReason,
	useMultiFileAuthState,
} = baileys
import P from 'pino'
// import NodeCache from 'node-cache'

import debug from './cores/debug.js'
import date from './cores/date.js'
import config from './../config.js'

import WA from './cores/WA.js'
import chat from './chat.js'
import bulk from './bulk.js'

const app = 'waBulk'

debug.log(date.dateTime())

const logger = P({
	level: 'silent', // debug, trace, silent
	timestamp: () => `,"time":"${new Date().toJSON()}"`,
}).child({})

// const msgRetryCounterCache = new NodeCache()
// const store = makeInMemoryStore({ logger })
// store?.readFromFile(`./auth/${app}/store.json`)
// setInterval(() => {
// 	store?.writeToFile(`./auth/${app}/store.json`)
// }, 10_000)

// startSock
async function startSock() {
	try {
		const { state, saveCreds } = await useMultiFileAuthState(
			`./auth/${app}/`
		)

		const { version, isLatest } = await fetchLatestBaileysVersion()
		debug.log(`WA     : v${version.join('.')}`)
		debug.log(`WA     : isLates ${isLatest}`)

		const sock = makeWASocket({
			defaultQueryTimeoutMs: undefined,
			version,
			logger,
			printQRInTerminal: true,
			auth: {
				creds: state.creds,
				/** caching makes the store faster to send/recv messages */
				keys: makeCacheableSignalKeyStore(state.keys, logger),
			},
			// msgRetryCounterCache,
			generateHighQualityLinkPreview: true,
			browser: [app, 'Chrome', '100'],
			// getMessage,
		})

		// store?.bind(sock.ev)

		sock.ev.process(
			// events is a map for event name => event data
			async (events) => {
				// received a new message
				if (events['messages.upsert']) {
					const m = events['messages.upsert']

					if (m.type === 'notify' || m?.type == 'append') {
						for (const msg of m.messages) {
							if (
								!msg.key.fromMe &&
								msg.key.remoteJid === config.superAdmin
							) {
								const dChat = new WA(sock, msg)
								// debug.print(msg)
								if (!dChat.isReact) {
									// dChat.logChat()
									if (dChat.isChat) {
										debug.print(dChat.uri())
										return await chat(dChat, app)
									}
								}
							}
						}
					}
				}

				// something about the connection changed
				// maybe it closed, or we received all offline message or connection opened
				if (events['connection.update']) {
					const update = events['connection.update']
					const { connection, lastDisconnect } = update

					if (connection == 'connecting') {
						debug.log('WA     : Connecting...')
					} else if (connection == 'open') {
						debug.log('WA     : Connection conected')
						await sock.sendMessage(config.superAdmin, {
							text: `_#${app} Running!_\n${date.dateTime()}`,
						})
						await sock.sendPresenceUpdate(
							'unavailable',
							config.superAdmin
						)
					} else if (connection === 'close') {
						// reconnect if not logged out
						if (
							lastDisconnect.error?.output?.statusCode !==
							DisconnectReason.loggedOut
						) {
							debug.log(
								'WA     : Connection closed. Reconnect'
							)
							// await startSock()
							process.exit()
						} else {
							debug.log(
								'WA     : Connection closed. You are logged out.'
							)
						}
					} else if (update?.receivedPendingNotifications == true) {
						debug.log('WA     : receivedPendingNotifications')
					} else if (update?.isOnline == true) {
						debug.log('WA     : Online') // , update)
					} else {
						debug.log('WA     : Connection update') // , update)
					}
				}

				// credentials updated -- save them
				if (events['creds.update']) {
					await saveCreds()
				}
			}
		)

		async function funcBulk() {
			return await bulk(new WA(sock))
		}

		setInterval(
			await funcBulk,
			config.autoDelay ? config.autoDelay : 24000
		)

		return sock

		// implement to handle retries
		// async function getMessage(key) {
		// 	if (store) {
		// 		const msg = await store.loadMessage(key.remoteJid, key.id)
		// 		return msg?.message || undefined
		// 	}

		// 	// only if store is present
		// 	return proto.Message.fromObject({})
		// }
	} catch (err) {
		debug.error(err)
	}
}
// /startSock

// run in main file
export default startSock
