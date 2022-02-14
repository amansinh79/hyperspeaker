const dht = require('@hyperswarm/dht')
const Speaker = require('speaker')
const fs = require('fs')

const node = new dht()

const buf = Buffer.from('', 'hex')

const socket = node.connect(buf)

socket.pipe(fs.createWriteStream('./new.pcm'))
