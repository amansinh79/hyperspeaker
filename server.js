const dht = require('@hyperswarm/dht')
const cp = require('child_process')
const node = new dht()
const os = require('os')

module.exports = (speaker) => {
  const sockets = []

  const proc =
    os.platform() === 'win32'
      ? cp.spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-f', 'dshow', '-i', 'audio=Stereo Mix (Realtek High Definition Audio)', '-f', 's16le', '-ac', '2', '-ar', '48000', '-bufsize', '512', 'pipe:1'])
      : cp.spawn('sox', `-q -t pulseaudio ${speaker}.monitor --buffer 512 -t raw -`.split(' '))

  proc.stdout.on('data', (chunk) => {
    sockets.forEach((s) => {
      s.write(chunk)
    })
  })

  function removeSocket(socket) {
    sockets.splice(
      sockets.findIndex((t) => t === socket),
      1
    )
  }

  const server = node.createServer((socket) => {
    socket.on('open', () => {
      sockets.push(socket)
    })
    socket.on('error', () => removeSocket(socket))
    socket.on('close', () => removeSocket(socket))
  })

  server.listen().then(() => {
    console.log('\nDHT Key:', server.address().publicKey.toString('hex'))
    console.log('\nCtrl + C to stop')
  })
}
