const dht = require('@hyperswarm/dht')
const cp = require('child_process')
const sockets = []
const node = new dht()
const proc = cp.spawn('sox', '-q -t pulseaudio alsa_output.pci-0000_00_1f.3.analog-stereo.monitor --buffer 512 -t raw -'.split(' '))

proc.stdout.on('data', (chunk) => {
  sockets.forEach((s) => {
    s.write(chunk)
  })
})

const server = node.createServer((socket) => {
  socket.on('open', () => {
    sockets.push(socket)
  })
  socket.on('error', () => removeSocket(socket))
  socket.on('close', () => removeSocket(socket))
})

function removeSocket(socket) {
  sockets.splice(
    sockets.findIndex((t) => t === socket),
    1
  )
}

server.listen().then(() => {
  console.log('DHT Key:', server.address().publicKey.toString('hex'))
})
