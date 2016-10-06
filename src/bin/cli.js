#!/usr/bin/env node

import * as fs from 'fs'
import path from 'path'
import bytes from 'bytes'
import random from '../index.js'

try { fs.statSync(`/dev/random`) }
catch (err) {
  console.error(`Error: could not find /dev/random`)
  process.exit(1)
}

const size = bytes.parse(process.argv[2])
const file = process.argv[3]

if (typeof(size) !== `number` || size < 1) {
  console.error(`Error: size must be larger than 0`)
  process.exit(1)
}

const rs = random(size)

if (file) {
  const ws = fs.createWriteStream(path.join(process.cwd(), file))
  rs.pipe(ws)
} else {
  rs.pipe(process.stdout)
}
