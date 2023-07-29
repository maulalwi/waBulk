# waBulk

Auto kirim massal chat wa.

# Cara menggunakan

Clone dulu dari repository github
```
git clone https://github.com/maulalwi/waBulk.git

cd waBulk
npm install
```

Ubah config.example.js ke config.js
```
# Default set true
const modeTest 		= true

# Nomor wa untuk admin
const superAdmin 	= '6282228882786@s.whatsapp.net'
# Jeda dalam mengirim chat
const autoSend		= 24000 // dalam ms. 1s = 1000ms

# URI database mongoDB
const dbUri 		= 'mongodb://'
# Database name
const dbName 		= ''
```

Lalu start, scan di wa yg mau digunakan untuk bulk sender.
```
npm run start
```

# Auto reload gunakan pm2

Install manual pm2, tutorial lengkapnya silakan cari di google.
```
npm install -g pm2
```

Aktifkan pm2
```
pm2 start waBulk.js
pm2 save
```

# Query in wa
```
Data :
cekchat
cekwa
cekstatus
start
stop
reset

Edit Chat :

chat
<chat>

Tambah Nomor WA :

wa
<number>
<number>
<number...>

Hapus Nomor WA :

delwa
<number>
<number>
<number...>

Reload waBulk :
rs
```
# Resiko

Menggunakan berarti tau resiko nya.
WA kebanned dll bukan tanggung jawab saya.

# Thanks to 

@whiskeysockets/baileys

And other...
