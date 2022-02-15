#!/usr/bin/env node

const minimist = require('minimist')
const { execSync } = require('child_process')
const opts = minimist(process.argv.splice(2))

if (opts.h) {
  console.log(` hyperspeaker
    -s <speaker> print available speakers on linux, just -s to list all available speakers
    -k <key>     key from host, to start in client mode
    -h <key>     print help
  `)
} else if (opts.k) {
  require('./client')(opts.k)
} else if (opts.s && opts.s === true) {
  console.log(execSync(`pacmd list-sinks | grep -e 'name:' -e 'index' -e 'Speakers' -e 'sample spec'`).toString())
} else if (typeof opts.s === 'string') {
  require('./server')(opts.s)
} else {
  console.log('hyperspeaker -h for help')
}
