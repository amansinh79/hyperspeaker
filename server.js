const dht = require('@hyperswarm/dht')

const node = new dht()

const server = node.createServer((socket) => {
  process.stdin.pipe(socket)
})

server.listen().then(() => {
  console.log('DHT Key:', server.address().publicKey.toString('hex'))
})
