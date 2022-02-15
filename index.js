#!/usr/bin/env node

const minimist = require('minimist')
const opts = minimist(process.argv.splice(2))

if (opts.h) {
  console.log(` hyperspeaker
    -k <key>     key from host, to start in client mode
    -h <key>     print help
  `)
} else if (opts.k) {
  require('./client')(opts.k)
} else {
  require('./server')()
}
