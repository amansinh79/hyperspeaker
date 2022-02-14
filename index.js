const Speaker = require('speaker')
const fs = require('fs')

const speaker = new Speaker({
  channels: 2, // 2 channels
  bitDepth: 16, // 16-bit samples
  sampleRate: 48000, // 48,000 Hz sample rate
})

// process.stdin.pipe(speaker)
fs.createReadStream('./new.pcm').pipe(speaker)
// sox -t pulseaudio alsa_output.pci-0000_00_1f.3.analog-stereo.monitor -t raw new.pcm
// pacmd list-sinks | grep -e 'name:' -e 'index' -e 'Speakers'
