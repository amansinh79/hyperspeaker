const dht = require('@hyperswarm/dht')
const Speaker = require('speaker')

// Create the Speaker instance
const speaker = new Speaker({
  channels: 2, // 2 channels
  bitDepth: 16, // 16-bit samples
  sampleRate: 48000, // 48000 Hz sample rate
})

const node = new dht()

const buf = Buffer.from('f5a041429288fcf388f0301580b926f9729c11bc21f11c7b0c62d231a0667e1b', 'hex')

const socket = node.connect(buf)

socket.on('open', () => {
  socket.pipe(speaker)
})
