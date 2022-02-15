const dht = require('@hyperswarm/dht')
const Speaker = require('speaker')
const node = new dht()

// Create the Speaker instance
const speaker = new Speaker({
  channels: 2, // 2 channels
  bitDepth: 16, // 16-bit samples
  sampleRate: 48000, // 48000 Hz sample rate
})

module.exports = (key) => {
  const buf = Buffer.from(key, 'hex')
  const socket = node.connect(buf)
  socket.on('open', () => {
    console.log('Connected to host\n')
    console.log('Ctrl + C to stop')
    socket.pipe(speaker)
  })
}
